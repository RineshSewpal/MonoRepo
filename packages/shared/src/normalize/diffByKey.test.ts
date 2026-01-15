import { describe, it, expect } from "vitest";
import { diffByKey } from "./diffByKey";

type Item = {
    id: string;
    value: number;
};

const key = (i: Item) => i.id;

describe("diffByKey", () => {
    it("detects added, removed, and unchanged items", () => {
        const prev: Item[] = [
            { id: "a", value: 1 },
            { id: "b", value: 2 },
        ];

        const next: Item[] = [
            { id: "b", value: 2 }, // unchanged
            { id: "c", value: 3 }, // added
        ];

        const result = diffByKey(prev, next, key);

        expect(result.added).toEqual([{ id: "c", value: 3 }]);
        expect(result.removed).toEqual([{ id: "a", value: 1 }]);
        expect(result.unchanged).toEqual([{ id: "b", value: 2 }]);
        expect(result.updated).toEqual([]);
    });

    it("detects updated items (same key, different value)", () => {
        const prev: Item[] = [{ id: "a", value: 1 }];
        const next: Item[] = [{ id: "a", value: 2 }];

        const result = diffByKey(prev, next, key);

        expect(result.updated).toEqual([
            {
                before: { id: "a", value: 1 },
                after: { id: "a", value: 2 },
            },
        ]);

        expect(result.added).toEqual([]);
        expect(result.removed).toEqual([]);
        expect(result.unchanged).toEqual([]);
    });

    it("treats identical items as unchanged, not updated", () => {
        const prev: Item[] = [{ id: "a", value: 1 }];
        const next: Item[] = [{ id: "a", value: 1 }];

        const result = diffByKey(prev, next, key);

        expect(result.unchanged).toEqual([{ id: "a", value: 1 }]);
        expect(result.updated).toEqual([]);
    });

    describe("duplicate key behavior", () => {
        it("uses last occurrence when duplicate keys exist in prev", () => {
            const prev: Item[] = [
                { id: "a", value: 1 },
                { id: "a", value: 2 }, // duplicate
            ];

            const next: Item[] = [{ id: "a", value: 3 }];

            const result = diffByKey(prev, next, key);

            expect(result.updated).toEqual([
                {
                    before: { id: "a", value: 2 },
                    after: { id: "a", value: 3 },
                },
            ]);
        });

        it("uses last occurrence when duplicate keys exist in next", () => {
            const prev: Item[] = [{ id: "a", value: 1 }];

            const next: Item[] = [
                { id: "a", value: 2 },
                { id: "a", value: 3 }, // duplicate
            ];

            const result = diffByKey(prev, next, key);

            expect(result.updated).toEqual([
                {
                    before: { id: "a", value: 1 },
                    after: { id: "a", value: 3 },
                },
            ]);
        });

        it("does not double-count duplicates as added or removed", () => {
            const prev: Item[] = [{ id: "a", value: 1 }];

            const next: Item[] = [
                { id: "a", value: 1 },
                { id: "a", value: 1 },
            ];

            const result = diffByKey(prev, next, key);

            expect(result.added).toEqual([]);
            expect(result.removed).toEqual([]);
            expect(result.updated).toEqual([]);
            expect(result.unchanged).toEqual([{ id: "a", value: 1 }]);
        });
    });
});
