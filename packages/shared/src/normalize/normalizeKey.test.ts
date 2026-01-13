import { describe, it, expect } from "vitest";
import { normalizeKey } from "./normalizeKey";

describe("normalizeKey", () => {
    it("returns empty string for null and undefined", () => {
        expect(normalizeKey(null)).toBe("");
        expect(normalizeKey(undefined)).toBe("");
    });

    it("handles numbers by stringifying", () => {
        expect(normalizeKey(0)).toBe("0");
        expect(normalizeKey(42)).toBe("42");
        expect(normalizeKey(3.14)).toBe("314");
    });

    it("handles booleans by stringifying", () => {
        expect(normalizeKey(true)).toBe("true");
        expect(normalizeKey(false)).toBe("false");
    });

    it("returns empty string for objects and arrays", () => {
        expect(normalizeKey({})).toBe("");
        expect(normalizeKey({ a: 1 })).toBe("");
        expect(normalizeKey([])).toBe("");
        expect(normalizeKey([1, 2, 3])).toBe("");
    });

    it("trims leading and trailing whitespace", () => {
        expect(normalizeKey("  hello  ")).toBe("hello");
    });

    it("lowercases input", () => {
        expect(normalizeKey("HeLLo")).toBe("hello");
    });

    it("replaces internal whitespace with underscores", () => {
        expect(normalizeKey("hello world")).toBe("hello_world");
        expect(normalizeKey("hello   world")).toBe("hello_world");
        expect(normalizeKey("hello\tworld")).toBe("hello_world");
        expect(normalizeKey("hello\nworld")).toBe("hello_world");
    });

    it("removes non-alphanumeric characters except underscores", () => {
        expect(normalizeKey("hello-world")).toBe("helloworld");
        expect(normalizeKey("a@b#c")).toBe("abc");
        expect(normalizeKey("user_id!")).toBe("user_id");
    });

    it("collapses multiple underscores implicitly via whitespace normalization", () => {
        expect(normalizeKey("hello    world")).toBe("hello_world");
    });

    it("returns empty string for whitespace-only input", () => {
        expect(normalizeKey("   ")).toBe("");
        expect(normalizeKey("\n\t")).toBe("");
    });

    it("is deterministic", () => {
        const input = "  Hello   World!  ";
        expect(normalizeKey(input)).toBe(normalizeKey(input));
    });
});
