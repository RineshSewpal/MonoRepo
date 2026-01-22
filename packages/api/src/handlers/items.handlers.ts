import { Request, Response, NextFunction } from "express";
import * as itemsService from "../services/items.service";
import {
    CreateItemInput,
    UpdateItemInput,
} from "@my-monorepo/shared/api/item";

/**
 * GET /items
 */
export async function listItems(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const items = await itemsService.listItems();
        res.json(items);
    } catch (err) {
        next(err);
    }
}

/**
 * GET /items/:id
 */
export async function getItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const item = await itemsService.getItemById(req.params.id);
        res.json(item);
    } catch (err) {
        next(err);
    }
}

/**
 * POST /items
 */
export async function createItem(
    req: Request<unknown, unknown, CreateItemInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const item = await itemsService.createItem(req.body);
        res.status(201).json(item);
    } catch (err) {
        next(err);
    }
}

/**
 * PUT /items/:id
 */
export async function updateItem(
    req: Request<{ id: string }, unknown, UpdateItemInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const item = await itemsService.updateItem(req.params.id, req.body);
        res.json(item);
    } catch (err) {
        next(err);
    }
}

/**
 * DELETE /items/:id
 */
export async function deleteItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        await itemsService.deleteItem(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
