import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createSchema = z.object({
    name: z.string().min(1),
    value: z.number(),
});

const updateSchema = createSchema.partial();

export function validateCreateItem(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = createSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Invalid body" });
    }
    req.body = result.data;
    next();
}

export function validateUpdateItem(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = updateSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Invalid body" });
    }
    req.body = result.data;
    next();
}
