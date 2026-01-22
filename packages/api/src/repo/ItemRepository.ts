import { Item } from "@my-monorepo/shared/api/item";

/**
 * Repository interface
 * (allows swapping implementations later)
 */
export interface ItemRepository {
    findAll(): Promise<Item[]>;
    findById(id: string): Promise<Item | undefined>;
    create(item: Item): Promise<Item>;
    update(id: string, item: Item): Promise<Item>;
    delete(id: string): Promise<void>;
}
