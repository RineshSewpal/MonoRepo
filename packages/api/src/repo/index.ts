import type { ItemRepository } from "./ItemRepository";
import { SqliteItemRepo } from "./sqliteItemRepo";

export async function createItemRepo(): Promise<ItemRepository> {
    if (process.env.NODE_ENV === "test") {
        const { default: MemoryItemRepo } = await import("./memoryItemRepo");
        return new MemoryItemRepo();
    }

    return new SqliteItemRepo();
}
