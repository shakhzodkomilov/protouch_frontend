export const normalizeError = (e: unknown, fallback: string): string => {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object" && "message" in e)
    return String((e as { message: unknown }).message);
  return fallback;
};
