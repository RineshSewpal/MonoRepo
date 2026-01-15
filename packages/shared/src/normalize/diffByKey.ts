export function diffByKey<T, K>(
    prev: readonly T[],
    next: readonly T[],
    keyFn: (item: T) => K
): {
    added: T[];
    removed: T[];
    unchanged: T[];
    updated: Array<{ before: T; after: T }>;
} {
    // last-write-wins maps
    const prevMap = new Map<K, T>();
    const nextMap = new Map<K, T>();

    for (const item of prev) {
        prevMap.set(keyFn(item), item);
    }

    for (const item of next) {
        nextMap.set(keyFn(item), item);
    }

    const added: T[] = [];
    const removed: T[] = [];
    const unchanged: T[] = [];
    const updated: Array<{ before: T; after: T }> = [];

    // keys present in prev
    for (const [key, prevItem] of prevMap) {
        const nextItem = nextMap.get(key);

        if (!nextItem) {
            removed.push(prevItem);
            continue;
        }

        if (Object.is(prevItem, nextItem) || deepEqual(prevItem, nextItem)) {
            unchanged.push(nextItem);
        } else {
            updated.push({ before: prevItem, after: nextItem });
        }
    }

    // keys only in next
    for (const [key, nextItem] of nextMap) {
        if (!prevMap.has(key)) {
            added.push(nextItem);
        }
    }

    return { added, removed, unchanged, updated };
}

// simple deep equality for test expectations
function deepEqual(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) return true;
    if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;

    return JSON.stringify(a) === JSON.stringify(b);
}
