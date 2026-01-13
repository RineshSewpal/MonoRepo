import { describe, it, expect } from "vitest";
import { normalizeTrim } from "./normalizeTrim";

describe("normalizeTrim", () => {
    it("returns empty string for null and undefined", () => {
        expect(normalizeTrim(null)).toBe("");
        expect(normalizeTrim(undefined)).toBe("");
    });

    it("trims strings", () => {
        expect(normalizeTrim("  hello  ")).toBe("hello");
        expect(normalizeTrim("\n\t hi \t")).toBe("hi");
        expect(normalizeTrim("")).toBe("");
    });

    it("handles numbers and booleans", () => {
        expect(normalizeTrim(42)).toBe("42");
        expect(normalizeTrim(true)).toBe("true");
        expect(normalizeTrim(false)).toBe("false");
    });

    it("handles bigint", () => {
        expect(normalizeTrim(10n)).toBe("10");
    });

    it("handles Date by converting to ISO string", () => {
        const date = new Date("2024-01-01T00:00:00.000Z");
        expect(normalizeTrim(date)).toBe(date.toISOString());
    });

    it("handles objects by stringifying via String()", () => {
        expect(normalizeTrim({})).toBe("[object Object]");
        expect(normalizeTrim({ a: 1 })).toBe("[object Object]");
    });

    it("never throws and always returns a string", () => {
        const weird = Object.create(null);
        expect(() => normalizeTrim(weird)).not.toThrow();
        expect(typeof normalizeTrim(weird)).toBe("string");
    });
});
