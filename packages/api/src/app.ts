// packages/api/src/app.ts
import express from "express";
import type { Express } from "express";

import { createItemRepo } from "./repo";
import { itemsRouter } from "./routes/items.routes"; // ✅ named import


export async function createApp(): Promise<Express> {
    const app = express();

    app.use(express.json());

    const repo = await createItemRepo();

    app.use("/items", itemsRouter(repo));

    return app;
}
