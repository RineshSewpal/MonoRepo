// The canonical Item shape used across API + clients
export interface Item {
    id: string;
    name: string;
    value: number;
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
}

// Input for POST /items
export interface CreateItemInput {
    name: string;
    value: number;
}

// Input for PUT /items/:id
export interface UpdateItemInput {
    name?: string;
    value?: number;
}
