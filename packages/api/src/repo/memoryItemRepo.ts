import { Item } from "@my-monorepo/shared/api/item";
import { ItemRepository } from "./ItemRepository";

export class MemoryItemRepository implements ItemRepository {
    private items = new Map<string, Item>();

    async findAll(): Promise<Item[]> {
        return Array.from(this.items.values());
    }

    async findById(id: string): Promise<Item | undefined> {
        return this.items.get(id);
    }

    async create(item: Item): Promise<Item> {
        this.items.set(item.id, item);
        return item;
    }

    async update(id: string, item: Item): Promise<Item> {
        this.items.set(id, item);
        return item;
    }

    async delete(id: string): Promise<void> {
        this.items.delete(id);
    }
}
