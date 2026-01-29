import { Router } from "express";
import type { ItemRepository } from "../repo/ItemRepository";
import {
    validateCreateItem,
    validateUpdateItem,
} from "../validators/item.validators";

export function itemsRouter(repo: ItemRepository) {
    const router = Router();

    // ✅ LIST (THIS IS WHAT IS FAILING)
    router.get("/", async (_req, res) => {
        const items = await repo.list();
        res.json(items);
    });

    router.post(
        "/",
        validateCreateItem,
        async (req, res) => {
            const item = await repo.create(req.body);
            res.status(201).json(item);
        }
    );



    router.get("/:id", async (req, res) => {
        const item = await repo.get(req.params.id);
        if (!item) return res.sendStatus(404);
        res.json(item);
    });

    router.put("/:id", validateUpdateItem, async (req, res) => {
        const item = await repo.update(req.params.id, req.body);
        if (!item) return res.sendStatus(404);
        res.json(item);
    });

    router.delete("/:id", async (req, res) => {
        const ok = await repo.delete(req.params.id);
        if (!ok) return res.sendStatus(404);
        res.sendStatus(204);
    });

    // 🚨 THIS MUST EXIST
    return router;
}


