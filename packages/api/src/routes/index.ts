import { Router } from "express";
import { Express } from "express";
import itemsRouter from "./items.routes";

const router = Router();

// mount feature routers
router.use("/items", itemsRouter);

export default router;

export function registerRoutes(app: Express) {
    app.use("/items", itemsRouter);
}