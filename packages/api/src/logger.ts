// src/logger.ts
const isTest = process.env.NODE_ENV === "test";

export const logger = {
    info: (...args: unknown[]) => {
        if (!isTest) console.log(...args);
    },
    error: (...args: unknown[]) => {
        if (!isTest) console.error(...args);
    }
};
