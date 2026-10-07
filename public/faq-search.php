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
 */

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

function append_faq_log(string $path, string $line): bool {
  $dir = dirname($path);
  if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
    return false;
  }

  $htaccess = $dir . DIRECTORY_SEPARATOR . '.htaccess';
  if (!is_file($htaccess)) {
    file_put_contents($htaccess, "Require all denied\n");
  }

  $fh = fopen($path, 'ab');
  if ($fh === false) {
    return false;
  }

  $ok = false;
  if (flock($fh, LOCK_EX)) {
    $size = filesize($path);
    if ($size !== false && $size > 2000000) {
      $ok = true;
    } else {
      $ok = fwrite($fh, $line) !== false;
      fflush($fh);
    }
    flock($fh, LOCK_UN);
  }
  fclose($fh);

  if ($ok) {
    @chmod($path, 0600);
  }
  return $ok;
}

$outside = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'greyedge-private' . DIRECTORY_SEPARATOR . 'faq-search.log';
$inside = __DIR__ . DIRECTORY_SEPARATOR . '.faq-logs' . DIRECTORY_SEPARATOR . 'faq-search.log';

if (!append_faq_log($outside, $line) && !append_faq_log($inside, $line)) {
  http_response_code(500);
  echo json_encode(['ok' => false]);
  exit;
}

echo json_encode(['ok' => true]);
