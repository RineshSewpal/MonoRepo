import { Item } from "@my-monorepo/shared/api/item";

/**
 * Repository interface
 * (allows swapping implementations later)
 */
// repo/ItemRepository.ts
export interface ItemRepository {
    create(input: CreateItemRequest): Promise<ItemResponse>;
    list(): Promise<ItemResponse[]>;
    get(id: string): Promise<ItemResponse | null>;
    update(id: string, input: CreateItemRequest): Promise<ItemResponse | null>;
    delete(id: string): Promise<boolean>;
}
