import { PrismaClient } from "@prisma/client";
import { Item } from "@my-monorepo/shared/api/item";
import { ItemRepository } from "./ItemRepository";

export class PrismaItemRepository implements ItemRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<Item[]> {
        return this.prisma.item.findMany();
    }

    async findById(id: string): Promise<Item | undefined> {
        const item = await this.prisma.item.findUnique({
            where: { id },
        });

        return item ?? undefined;
    }

    async create(item: Item): Promise<Item> {
        return this.prisma.item.create({
            data: item,
        });
    }

    async update(id: string, item: Item): Promise<Item> {
        return this.prisma.item.update({
            where: { id },
            data: item,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.item.delete({
            where: { id },
        });
    }
}
