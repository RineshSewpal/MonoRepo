export function normalizeTrim(input: unknown): string {
    if (input == null) {
        return "";
    }

    if (typeof input === "string") {
        return input.trim();
    }

    if (typeof input === "number" || typeof input === "boolean" || typeof input === "bigint") {
        return String(input).trim();
    }

    if (input instanceof Date) {
        return input.toISOString().trim();
    }

    try {
        return String(input).trim();
    } catch {
        return "";
    }
}
