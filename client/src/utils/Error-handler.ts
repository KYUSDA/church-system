
type UnknownRecord = Record<string, any> | undefined | null;

export function getApiErrorMessage(
  err: any,
  defaultMessage = "Something went wrong"
): string {
  try {
    // RTK Query style: { status, data: { message, errors } }
    const data: UnknownRecord = err?.data ?? err?.response?.data;
    const arrayMessages =
      (Array.isArray(data?.errors) &&
        data?.errors.map((e: any) => e?.message || e).filter(Boolean)) ||
      (Array.isArray(data?.error) &&
        data?.error.map((e: any) => e?.message || e).filter(Boolean));

    if (arrayMessages && arrayMessages.length) {
      return arrayMessages.join("\n");
    }

    const specific =
      data?.message || data?.error || data?.detail || data?.title;
    if (typeof specific === "string" && specific.trim()) return specific.trim();

    // Some backends nest validation under data.errors.field: message
    if (data?.errors && typeof data.errors === "object") {
      const collected = Object.values(data.errors as Record<string, any>)
        .map((v) => (typeof v === "string" ? v : v?.message))
        .filter(Boolean) as string[];
      if (collected.length) return collected.join("\n");
    }

    // Generic Error instance
    if (typeof err?.message === "string" && err.message.trim())
      return err.message.trim();

    // String fallback
    if (typeof err === "string" && err.trim()) return err.trim();

    return defaultMessage;
  } catch {
    return defaultMessage;
  }
}

