export function buildStableId(input: { a: string; b: string }): string {
    const normalize = (value: string): string => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-") // normalize punctuation & whitespace
            .replace(/^-+|-+$/g, "");    // trim hyphens
    };

    const parts = [normalize(input.a), normalize(input.b)]
        .filter(Boolean)              // drop empty results
        .sort();                      // order-independent stability

    return parts.join(".");
}
