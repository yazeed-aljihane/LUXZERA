/**
 * Product-grade error message formatter.
 * Technical details, network errors, and stack traces are logged strictly to console.error.
 * User-facing UI messages are kept friendly, polished, and user-appropriate.
 */
export function formatErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  if (!err) return fallback;

  // Always log full technical error details to browser console for developer inspection
  console.error("🔴 [Technical Error Details]:", err);

  const rawMessage = typeof err === "string"
    ? err
    : err.message || err.error || err.data?.message || "";

  // Filter out technical network/server failure strings from user-facing UI
  const isTechnicalError =
    !rawMessage ||
    rawMessage.includes("Network Error") ||
    rawMessage.includes("ERR_") ||
    rawMessage.includes("AxiosError") ||
    rawMessage.includes("Failed to fetch") ||
    rawMessage.includes("500") ||
    rawMessage.includes("Internal Server Error") ||
    rawMessage.includes("ECONNREFUSED") ||
    rawMessage.includes("HTTP 5");

  if (isTechnicalError) {
    return "Unable to connect right now. Please try again in a moment.";
  }

  return rawMessage;
}
