import { Router } from "express";
import type {
    Item,
    CreateItemInput,
    UpdateItemInput,
} from "@myorg/shared";

import {
    listItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
} from "../services/items.service";

import { validateCreateItem, validateUpdateItem } from "../validators/item.validators";

const router = Router();

/**
 * GET /items
 */
router.get("/", async (_req, res) => {
    const items: Item[] = await listItems();
    res.json(items);
});

/**
 * GET /items/:id
 */
router.get("/:id", async (req, res) => {
    const item = await getItemById(req.params.id);

    if (!item) {
        return res.status(404).json({
            code: "NOT_FOUND",
            message: "Item not found",
        });
    }

    res.json(item);
});

/**
 * POST /items
 */
router.post("/", async (req, res) => {
    const input: CreateItemInput = validateCreateItem(req.body);

    const item = await createItem(input);
    res.status(201).json(item);
});

/**
 * PUT /items/:id
 */
router.put("/:id", async (req, res) => {
    const input: UpdateItemInput = validateUpdateItem(req.body);

    const item = await updateItem(req.params.id, input);

    if (!item) {
        return res.status(404).json({
            code: "NOT_FOUND",
            message: "Item not found",
        });
    }

    res.json(item);
});

/**
 * DELETE /items/:id
 */
router.delete("/:id", async (req, res) => {
    const deleted = await deleteItem(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            code: "NOT_FOUND",
            message: "Item not found",
        });
    }

    res.status(204).send();
});

export default router;
