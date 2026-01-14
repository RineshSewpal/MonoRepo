import { describe, it, expect } from "vitest";
import { buildKey } from "./buildKey";

describe("buildKey – edge cases", () => {
    it("returns empty string for empty array", () => {
        expect(buildKey([])).toBe("");
    });

    it("ignores empty strings", () => {
        expect(buildKey(["", ""])).toBe("");
        expect(buildKey(["user", "", "id"])).toBe("user.id");
    });

    it("trims whitespace in parts", () => {
        expect(buildKey([" user ", " profile "])).toBe("user.profile");
    });

    it("collapses internal whitespace in parts", () => {
        expect(buildKey(["user   name", "profile"])).toBe("user-name.profile");
    });

    it("normalizes weird formatting", () => {
        expect(buildKey(["  USER__NAME  ", "__PROFILE__"])).toBe("user-name.profile");
    });

    it("ignores parts that normalize to empty", () => {
        expect(buildKey(["   ", "---", "__"])).toBe("");
    });

    it("handles mixed valid and invalid parts", () => {
        expect(buildKey([" user ", "", "   ", "profile__name "])).toBe(
            "user.profile-name"
        );
    });
});
