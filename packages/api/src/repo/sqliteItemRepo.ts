import type { ItemRepository } from "./ItemRepository";
import type { Item } from "@my-monorepo/shared";

export class SqliteItemRepo implements ItemRepository {
    private db: any;

    constructor() {
        const { db } = require("../db/sqlite");
        this.db = db;
    }

    // methods...
}
