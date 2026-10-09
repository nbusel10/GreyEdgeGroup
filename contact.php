<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false]);
  exit;
}

function field(string $key, int $max): string {
  $value = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
  if (strlen($value) > $max) {
    $value = substr($value, 0, $max);
  }
  return str_replace(["\r", "\n"], ' ', $value);
}

// Honeypot: real people leave this empty. Pretend success for bots.
if (field('company-website', 200) !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

$name = field('name', 120);
$email = field('email', 200);
$organization = field('organization', 160);
$phone = field('phone', 40);
$location = field('location', 160);
$help = field('help', 120);
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';
if (strlen($message) > 5000) {
  $message = substr($message, 0, 5000);
}

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false]);
  exit;
}

$to = 'info@greyedgegroup.com';
$subject = 'Website inquiry from ' . $name;
$body = implode("\n", [
  "Name: $name",
  "Email: $email",
  "Organization: $organization",
  "Phone: $phone",
  "Location: $location",
  "Help: $help",
  '',
  $message,
]);
$headers = implode("\r\n", [
  'From: GreyEdge Website <noreply@thegreyedge.buselmeier.com>',
  'Reply-To: ' . str_replace(["\r", "\n"], '', $email),
  'Content-Type: text/plain; charset=utf-8',
]);

if (!mail($to, $subject, $body, $headers)) {
  http_response_code(500);
  echo json_encode(['ok' => false]);
  exit;
}

echo json_encode(['ok' => true]);
