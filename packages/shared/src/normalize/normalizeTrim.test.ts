import { describe, it, expect } from "vitest";
import { normalizeTrim } from "./normalizeTrim";

describe("normalizeTrim", () => {
    it("returns empty string for null and undefined", () => {
        expect(normalizeTrim(null)).toBe("");
        expect(normalizeTrim(undefined)).toBe("");
    });

    it("handles numbers by stringifying", () => {
        expect(normalizeTrim(0)).toBe("0");
        expect(normalizeTrim(42)).toBe("42");
        expect(normalizeTrim(3.14)).toBe("3.14");
    });

    it("handles booleans by stringifying", () => {
        expect(normalizeTrim(true)).toBe("true");
        expect(normalizeTrim(false)).toBe("false");
    });

    it("returns empty string for objects and arrays", () => {
        expect(normalizeTrim({})).toBe("");
        expect(normalizeTrim({ a: 1 })).toBe("");
        expect(normalizeTrim([])).toBe("");
        expect(normalizeTrim([1, 2, 3])).toBe("");
    });

    it("trims leading and trailing whitespace", () => {
        expect(normalizeTrim("  hello  ")).toBe("hello");
    });

    it("collapses internal whitespace to a single space", () => {
        expect(normalizeTrim("hello   world")).toBe("hello world");
        expect(normalizeTrim("hello\t\tworld")).toBe("hello world");
        expect(normalizeTrim("hello\nworld")).toBe("hello world");
    });

    it("returns empty string for whitespace-only input", () => {
        expect(normalizeTrim("   ")).toBe("");
        expect(normalizeTrim("\n\t")).toBe("");
    });

    it("is deterministic", () => {
        const input = "  hello   world  ";
        expect(normalizeTrim(input)).toBe(normalizeTrim(input));
    });
});
