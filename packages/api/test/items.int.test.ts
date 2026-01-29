import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import type { Express } from "express";

import { createApp } from "../src/app";

describe("Items API – integration", () => {
    let app: Express;

    beforeAll(async () => {
        app = await createApp();
    });

    it("Create → list → get → update → delete", async () => {
        /* CREATE */
        const createRes = await request(app)
            .post("/items")
            .send({ name: "Item A", value: 1 })
            .expect(201);

        expect(createRes.body).toHaveProperty("id");
        const id = createRes.body.id;

        /* LIST */
        const listRes = await request(app)
            .get("/items")
            .expect(200);

        expect(listRes.body.length).toBe(1);

        /* GET */
        const getRes = await request(app)
            .get(`/items/${id}`)
            .expect(200);

        expect(getRes.body.name).toBe("Item A");

        /* UPDATE */
        const updateRes = await request(app)
            .put(`/items/${id}`)
            .send({ name: "Item A+", value: 2 })
            .expect(200);

        expect(updateRes.body.value).toBe(2);

        /* DELETE */
        await request(app)
            .delete(`/items/${id}`)
            .expect(204);

        /* VERIFY DELETE */
        await request(app)
            .get(`/items/${id}`)
            .expect(404);
    });

    it("Invalid create body returns 400", async () => {
        await request(app)
            .post("/items")
            .send({ value: "not-a-number" })
            .expect(400);
    });

    it("Invalid update body returns 400", async () => {
        const createRes = await request(app)
            .post("/items")
            .send({ name: "Item B", value: 10 })
            .expect(201);

        const id = createRes.body.id;

        await request(app)
            .put(`/items/${id}`)
            .send({ value: "bad" })
            .expect(400);
    });

    it("Missing item id returns 404", async () => {
        await request(app)
            .get("/items/does-not-exist")
            .expect(404);
    });
});
