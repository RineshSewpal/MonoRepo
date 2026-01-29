// packages/api/src/validators/item.validators.ts
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

/* =========================
   Schemas
   ========================= */

const createItemSchema = z.object({
    name: z.string().min(1, "name is required"),
    value: z.number()
});

const updateItemSchema = z.object({
    name: z.string().min(1).optional(),
    value: z.number().optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "at least one field must be provided" }
);

/* =========================
   Middleware
   ========================= */

export function validateCreateItem(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = createItemSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Invalid request body"
        });
    }

    req.body = result.data;
    next();
}

export function validateUpdateItem(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = updateItemSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Invalid request body"
        });
    }

    req.body = result.data;
    next();
}
