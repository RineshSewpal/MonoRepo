import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error(err);

    res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Unexpected server error",
    });
}

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
