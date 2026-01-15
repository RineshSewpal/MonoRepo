import { describe, it, expect } from "vitest";
import { diffByKey } from "./diffByKey";

type Item = {
    id: string;
    name: string;
    value: number;
};

describe("diffByKey", () => {
    it("detects added items", () => {
        const prev: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const next: Item[] = [
            { id: "a", name: "A", value: 1 },
            { id: "b", name: "B", value: 2 },
        ];

        const result = diffByKey(prev, next, "id");

        expect(result.added).toEqual([
            { id: "b", name: "B", value: 2 },
        ]);
        expect(result.removed).toEqual([]);
        expect(result.updated).toEqual([]);
    });

    it("detects removed items", () => {
        const prev: Item[] = [
            { id: "a", name: "A", value: 1 },
            { id: "b", name: "B", value: 2 },
        ];

        const next: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const result = diffByKey(prev, next, "id");

        expect(result.added).toEqual([]);
        expect(result.removed).toEqual([
            { id: "b", name: "B", value: 2 },
        ]);
        expect(result.updated).toEqual([]);
    });

    it("detects updated items (shallow compare)", () => {
        const prev: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const next: Item[] = [
            { id: "a", name: "A", value: 2 },
        ];

        const result = diffByKey(prev, next, "id");

        expect(result.added).toEqual([]);
        expect(result.removed).toEqual([]);
        expect(result.updated).toEqual([
            { id: "a", name: "A", value: 2 },
        ]);
    });

    it("does not mark unchanged items as updated", () => {
        const prev: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const next: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const result = diffByKey(prev, next, "id");

        expect(result).toEqual({
            added: [],
            removed: [],
            updated: [],
        });
    });

    it("handles empty inputs", () => {
        const result = diffByKey([], [], "id");

        expect(result).toEqual({
            added: [],
            removed: [],
            updated: [],
        });
    });

    it("handles all items replaced", () => {
        const prev: Item[] = [
            { id: "a", name: "A", value: 1 },
        ];

        const next: Item[] = [
            { id: "b", name: "B", value: 2 },
        ];

        const result = diffByKey(prev, next, "id");

        expect(result.added).toEqual([
            { id: "b", name: "B", value: 2 },
        ]);
        expect(result.removed).toEqual([
            { id: "a", name: "A", value: 1 },
        ]);
        expect(result.updated).toEqual([]);
    });
});
