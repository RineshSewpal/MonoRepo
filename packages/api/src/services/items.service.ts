import { InMemoryItemRepository } from "../repo/ItemRepository";
import { prisma } from "../db/prisma";
import { PrismaItemRepository } from "../repo/prismaItemRepo";

const repo = new InMemoryItemRepository();

export async function listItems() {
    return repo.findAll();
}

export const itemRepo = new PrismaItemRepository(prisma);