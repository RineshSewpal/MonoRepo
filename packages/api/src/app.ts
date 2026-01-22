import express from "express";
import cors from "cors";

import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
    const app = express();

    // ---- global middleware ----
    app.use(cors());
    app.use(express.json());

    // ---- routes ----
    registerRoutes(app);

    // ---- error handling (last) ----
    app.use(errorHandler);

    return app;
}
