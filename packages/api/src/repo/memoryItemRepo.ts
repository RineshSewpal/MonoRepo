import { randomUUID } from "crypto";
import type { ItemRepository, Item } from "./ItemRepository";

export default class MemoryItemRepo implements ItemRepository {
    private items = new Map<string, Item>();

    async create(data: Omit<Item, "id">): Promise<Item> {
        const item = { id: randomUUID(), ...data };
        this.items.set(item.id, item);
        return item;
    }

    async list(): Promise<Item[]> {
        return [...this.items.values()];
    }

    async get(id: string): Promise<Item | null> {
        return this.items.get(id) ?? null;
    }

    async update(
        id: string,
        data: Partial<Omit<Item, "id">>
    ): Promise<Item | null> {
        const existing = this.items.get(id);
        if (!existing) return null;

        const updated = { ...existing, ...data };
        this.items.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        return this.items.delete(id);
    }
}
