<?php
declare(strict_types=1);

/**
 * Appends a Thermal Energy Networks 101 search to a private log.
 *
 * Preferred path (one level above the document root, so deploys do not wipe it
 * and the web server will not serve it):
 *   ../greyedge-private/faq-search.log
 *
 * Fallback, if that folder cannot be created:
 *   .faq-logs/faq-search.log
 * Apache refuses requests for that folder. See public/.htaccess.
 *
 * Each line: UTC time, match count, phrase. No IP address or visitor id.
 *
 * Lines from before the 2nd of the current month (US Pacific) are removed on
 * the next write, and by `php faq-search.php --purge`. The monthly report
 * reads the file on the 1st, while the full previous span is still there.
 */

const FAQ_TZ = 'America/Los_Angeles';

function faq_log_paths(): array {
  return [
    dirname(__DIR__) . DIRECTORY_SEPARATOR . 'greyedge-private' . DIRECTORY_SEPARATOR . 'faq-search.log',
    __DIR__ . DIRECTORY_SEPARATOR . '.faq-logs' . DIRECTORY_SEPARATOR . 'faq-search.log',
  ];
}

/** Midnight Pacific on the 2nd, or null while it is still the 1st. */
function faq_purge_cutoff(): ?DateTimeImmutable {
  $zone = new DateTimeZone(FAQ_TZ);
  $now = new DateTimeImmutable('now', $zone);
  if ((int) $now->format('j') < 2) {
    return null;
  }
  return new DateTimeImmutable($now->format('Y-m') . '-02 00:00:00', $zone);
}

function faq_line_kept(string $line, DateTimeImmutable $cutoff): bool {
  if (!preg_match('/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})Z/', $line, $m)) {
    return true;
  }
  $when = DateTimeImmutable::createFromFormat('Y-m-d\TH:i:s', $m[1], new DateTimeZone('UTC'));
  if ($when === false) {
    return true;
  }
  return $when >= $cutoff;
}

function faq_filter_log(string $raw, DateTimeImmutable $cutoff): string {
  $keep = [];
  foreach (preg_split("/\r\n|\n|\r/", $raw) as $line) {
    if ($line === '') {
      continue;
    }
    if (faq_line_kept($line, $cutoff)) {
      $keep[] = $line;
    }
  }
  return $keep === [] ? '' : implode("\n", $keep) . "\n";
}

function faq_ensure_dir(string $path): bool {
  $dir = dirname($path);
  if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
    return false;
  }
  $htaccess = $dir . DIRECTORY_SEPARATOR . '.htaccess';
  if (!is_file($htaccess)) {
    file_put_contents($htaccess, "Require all denied\n");
  }
  return true;
}

/** Drop lines from before the 2nd. Returns false when the file cannot be locked. */
function faq_purge_file(string $path): bool {
  $cutoff = faq_purge_cutoff();
  if ($cutoff === null || !is_file($path)) {
    return true;
  }

  $fh = fopen($path, 'c+b');
  if ($fh === false) {
    return false;
  }

  $ok = false;
  if (flock($fh, LOCK_EX)) {
    $raw = stream_get_contents($fh);
    $body = faq_filter_log(is_string($raw) ? $raw : '', $cutoff);
    if ($body !== $raw) {
      rewind($fh);
      ftruncate($fh, 0);
      $ok = fwrite($fh, $body) !== false;
      fflush($fh);
    } else {
      $ok = true;
    }
    flock($fh, LOCK_UN);
  }
  fclose($fh);
  return $ok;
}

function faq_purge_logs(): bool {
  $ok = true;
  foreach (faq_log_paths() as $path) {
    if (!faq_purge_file($path)) {
      $ok = false;
    }
  }
  return $ok;
}

function faq_append(string $path, string $line): bool {
  if (!faq_ensure_dir($path)) {
    return false;
  }

  $fh = fopen($path, 'c+b');
  if ($fh === false) {
    return false;
  }

  $ok = false;
  if (flock($fh, LOCK_EX)) {
    $raw = stream_get_contents($fh);
    $body = is_string($raw) ? $raw : '';
    $cutoff = faq_purge_cutoff();
    if ($cutoff !== null) {
      $body = faq_filter_log($body, $cutoff);
    }
    if ($body !== '' && !str_ends_with($body, "\n")) {
      $body .= "\n";
    }
    $body .= $line;
    rewind($fh);
    ftruncate($fh, 0);
    $ok = fwrite($fh, $body) !== false;
    fflush($fh);
    flock($fh, LOCK_UN);
  }
  fclose($fh);

  if ($ok) {
    @chmod($path, 0600);
  }
  return $ok;
}

if (PHP_SAPI === 'cli') {
  if (($argv[1] ?? '') !== '--purge') {
    fwrite(STDERR, "usage: php faq-search.php --purge\n");
    exit(1);
  }
  exit(faq_purge_logs() ? 0 : 1);
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false]);
  exit;
}

$q = isset($_POST['q']) ? trim((string) $_POST['q']) : '';
$q = preg_replace('/\s+/u', ' ', $q) ?? '';
$q = str_replace(["\r", "\n", "\t"], ' ', $q);
if (function_exists('mb_strlen') && function_exists('mb_substr')) {
  if (mb_strlen($q, 'UTF-8') < 2) {
    echo json_encode(['ok' => true]);
    exit;
  }
  if (mb_strlen($q, 'UTF-8') > 200) {
    $q = mb_substr($q, 0, 200, 'UTF-8');
  }
} else {
  if (strlen($q) < 2) {
    echo json_encode(['ok' => true]);
    exit;
  }
  if (strlen($q) > 200) {
    $q = substr($q, 0, 200);
  }
}

$matches = isset($_POST['matches']) ? (int) $_POST['matches'] : 0;
if ($matches < 0) {
  $matches = 0;
}
if ($matches > 999) {
  $matches = 999;
}

$line = gmdate('Y-m-d\TH:i:s\Z') . "\t" . $matches . "\t" . $q . "\n";
$paths = faq_log_paths();

if (!faq_append($paths[0], $line) && !faq_append($paths[1], $line)) {
  http_response_code(500);
  echo json_encode(['ok' => false]);
  exit;
}

echo json_encode(['ok' => true]);
