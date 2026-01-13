import { normalizeTrim } from "./normalizeTrim";

export function normalizeKey(input: unknown): string {
    const trimmed = normalizeTrim(input);
    if (trimmed === "") return "";

    return trimmed
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
}
