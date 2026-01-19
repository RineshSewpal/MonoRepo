// packages/shared/src/api/item.ts

export interface Item {
    id: string;          // stable identifier
    name: string;
    value: number;

    createdAt: string;   // ISO 8601
    updatedAt: string;   // ISO 8601
}
