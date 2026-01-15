import { describe, it, expect } from "vitest";
import { buildStableId } from "./buildStableId";

describe("buildStableId", () => {
    it("builds a stable id from a and b", () => {
        expect(buildStableId({ a: "user", b: "profile" }))
            .toBe(buildStableId({ a: "profile", b: "user" }));
    });


    it("is order-independent (stable)", () => {
        expect(buildStableId({ a: "user", b: "profile" })).toBe(
            buildStableId({ a: "profile", b: "user" })
        );
    });

    it("normalizes casing and whitespace", () => {
        expect(buildStableId({ a: " USER ", b: " Profile " })).toBe(
            "profile.user"
        );
    });

    it("normalizes punctuation and internal whitespace", () => {
        expect(buildStableId({ a: "user   name", b: "profile__id" })).toBe(
            "profile-id.user-name"
        );
    });

    it("ignores values that normalize to empty", () => {
        expect(buildStableId({ a: "   ", b: "__" })).toBe("");
    });

    it("handles mixed valid and invalid values", () => {
        expect(
            buildStableId({
                a: " user ",
                b: "profile__name ",
            })
        ).toBe("profile-name.user");
    });

    it("produces identical output for equivalent inputs", () => {
        const id1 = buildStableId({ a: "USER__NAME", b: "PROFILE" });
        const id2 = buildStableId({ a: "user name", b: "profile" });

        expect(id1).toBe(id2);
    });
});
