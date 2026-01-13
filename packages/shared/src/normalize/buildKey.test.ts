import { describe, it, expect } from "vitest";
import { buildKey } from "./buildKey";

describe("buildKey", () => {
    it("returns empty string for empty input", () => {
        expect(buildKey([])).toBe("");
    });

    it("returns empty string when all parts normalize to empty", () => {
        expect(buildKey(["", "   ", "###"])).toBe("");
    });

    it("normalizes and joins parts with underscores", () => {
        expect(buildKey(["User", "Email"])).toBe("user_email");
        expect(buildKey(["Order", "Line", "Item"])).toBe("order_line_item");
    });

    it("trims, lowercases, and removes punctuation via normalizeKey", () => {
        expect(buildKey([" User ", "Email!"])).toBe("user_email");
        expect(buildKey(["Hello,", "World!"])).toBe("hello_world");
    });

    it("filters out parts that normalize to empty", () => {
        expect(buildKey(["User", "", "ID"])).toBe("user_id");
        expect(buildKey(["User", "###", "ID"])).toBe("user_id");
    });

    it("handles numbers encoded as strings", () => {
        expect(buildKey(["Order", "2024"])).toBe("order_2024");
    });

    it("handles multiple and mixed whitespace correctly", () => {
        expect(buildKey(["  hello   world  ", " test "]))

            .toBe("hello_world_test");
    });

    it("handles unicode and punctuation safely", () => {
        expect(buildKey(["café", "résumé"])).toBe("caf_rsum");
        expect(buildKey(["你好", "world"])).toBe("world");
    });

    it("is deterministic", () => {
        const parts = [" User ", "Email!"];
        expect(buildKey(parts)).toBe(buildKey(parts));
    });

    it("does not mutate the input array", () => {
        const parts = ["User", "Email"];
        const copy = [...parts];

        buildKey(parts);

        expect(parts).toEqual(copy);
    });
});
