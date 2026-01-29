// packages/api/src/services/items.service.ts
import type { ItemRepository } from "../repo/ItemRepository";
import type { CreateItemInput, UpdateItemInput } from "@my-monorepo/shared";

export function createItemsService(repo: ItemRepository) {
    return {
        create: (input: CreateItemInput) => repo.createItem(input),
        list: () => repo.listItems(),
        get: (id: string) => repo.getItem(id),
        update: (id: string, input: UpdateItemInput) =>
            repo.updateItem(id, input),
        remove: (id: string) => repo.deleteItem(id),
    };
}
