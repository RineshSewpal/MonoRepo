export function buildKey(parts: Array<string | null | undefined>): string {
    return parts
        .map(part => {
            if (!part) return "";

            return part
                .trim()
                .toLowerCase()
                // collapse whitespace, underscores, and dashes into single dash
                .replace(/[\s_-]+/g, "-")
                // remove leading/trailing dashes
                .replace(/^-+|-+$/g, "");
        })
        // drop parts that normalized to empty
        .filter(part => part.length > 0)
        // join with dot
        .join(".");
}
