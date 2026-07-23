/**
 * Product-grade error message formatter.
 * Technical details, network errors, SMTP logs, and backend exceptions are logged strictly to console.error.
 * User-facing UI messages are kept friendly, polished, and free of developer/infrastructure jargon.
 */
export function formatErrorMessage(err, fallback = "Our servers are busy right now. Please try a few minutes later.") {
  if (!err) return fallback;

  // Always log full technical error details strictly to browser console for developer debugging
  console.error("🔴 [Technical Error Details]:", err);

  const rawMessage = typeof err === "string"
    ? err
    : err.response?.data?.message || err.data?.message || err.message || err.error || "";

  // Filter out technical network/SMTP/server failure strings from user-facing UI
  const technicalKeywords = [
    "network error",
    "err_",
    "axioserror",
    "failed to fetch",
    "500",
    "internal server error",
    "econnrefused",
    "http 5",
    "smtp",
    "mail",
    "failed to send",
    "messagingexception",
    "smtpexception",
    "java.",
    "org.springframework",
    "nullpointer",
    "sql",
    "database",
    "exception",
    "connection refused",
    "socket",
    "timeout"
  ];

  const lowerRaw = rawMessage.toLowerCase();
  const isTechnicalError = !rawMessage || technicalKeywords.some(kw => lowerRaw.includes(kw));

  if (isTechnicalError) {
    return "Our servers are busy right now. Please try a few minutes later.";
  }

  return rawMessage;
}
