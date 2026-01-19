// packages/shared/src/api/inputs.ts
import type { Item } from "./item";

export type CreateItemInput = {
    name: string;
    value: number;
};

export type UpdateItemInput = {
    id: Item["id"];
} & Partial<Omit<CreateItemInput, never>>;
