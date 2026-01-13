import { normalizeKey } from "./normalizeKey";

export function buildKey(parts: readonly string[]): string {
    if (!Array.isArray(parts) || parts.length === 0) {
        return "";
    }

    const normalizedParts = parts
        .map((part) => normalizeKey(part))
        .filter((part) => part !== "");

    if (normalizedParts.length === 0) {
        return "";
    }

    return normalizedParts.join("_");
}
