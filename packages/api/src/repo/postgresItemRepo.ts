import { Pool } from "pg";
import { Item } from "@my-monorepo/shared/api/item";
import { ItemRepository } from "./ItemRepository";

export class PostgresItemRepository implements ItemRepository {
    constructor(private readonly pool: Pool) { }

    async findAll(): Promise<Item[]> {
        const result = await this.pool.query(
            `SELECT id, value FROM items ORDER BY id`
        );

        return result.rows;
    }

    async findById(id: string): Promise<Item | null> {
        const result = await this.pool.query(
            `SELECT id, value FROM items WHERE id = $1`,
            [id]
        );

        return result.rows[0] ?? null;
    }

    async create(item: Item): Promise<Item> {
        await this.pool.query(
            `INSERT INTO items (id, value) VALUES ($1, $2)`,
            [item.id, item.value]
        );

        return item;
    }

    async update(id: string, item: Item): Promise<Item> {
        await this.pool.query(
            `UPDATE items SET value = $2 WHERE id = $1`,
            [id, item.value]
        );

        return item;
    }

    async delete(id: string): Promise<void> {
        await this.pool.query(
            `DELETE FROM items WHERE id = $1`,
            [id]
        );
    }
}
