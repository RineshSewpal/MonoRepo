// src/types/item.ts
export interface CreateItemRequest {
    name: string;
    value: number;
}

export interface ItemResponse {
    id: string;
    name: string;
    value: number;
}
