// pages/ItemsPage.tsx
export function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        fetchItems()
            .then(setItems)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <ItemsSkeleton />;
    if (error) return <ErrorState message={error.message} />;

    return <ItemsList items={items} />;
}
