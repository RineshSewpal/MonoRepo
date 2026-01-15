export function diffByKey<T, K extends keyof T>(
    prev: readonly T[],
    next: readonly T[],
    key: K
): {
    added: T[];
    removed: T[];
    updated: T[];
} {
    const prevMap = new Map<T[K], T>();
    const nextMap = new Map<T[K], T>();

    for (const item of prev) {
        prevMap.set(item[key], item);
    }

    for (const item of next) {
        nextMap.set(item[key], item);
    }

    const added: T[] = [];
    const removed: T[] = [];
    const updated: T[] = [];

    for (const [id, nextItem] of nextMap) {
        const prevItem = prevMap.get(id);

        if (!prevItem) {
            added.push(nextItem);
        } else if (!shallowEqual(prevItem, nextItem)) {
            updated.push(nextItem);
        }
    }

    for (const [id, prevItem] of prevMap) {
        if (!nextMap.has(id)) {
            removed.push(prevItem);
        }
    }

    return { added, removed, updated };
}

function shallowEqual<T>(a: T, b: T): boolean {
    if (a === b) return true;

    const aKeys = Object.keys(a as object);
    const bKeys = Object.keys(b as object);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if ((a as any)[key] !== (b as any)[key]) {
            return false;
        }
    }

    return true;
}
