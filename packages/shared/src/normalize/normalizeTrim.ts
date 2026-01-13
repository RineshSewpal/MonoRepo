export function normalizeTrim(input: unknown): string {
    if (input == null) return "";

    if (typeof input === "string") {
        return input
            .trim()
            .replace(/\s+/g, " ");
    }

    if (typeof input === "number" || typeof input === "boolean") {
        return String(input).trim();
    }

    // objects, arrays, functions, symbols, etc.
    return "";
}
