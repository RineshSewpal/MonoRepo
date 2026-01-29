export function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [selected, setSelected] = useState<Item | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchItems().then(setItems);
    }, []);

    return (
        <>
            <ItemsSearch value={search} onChange={setSearch} />

            <ItemsList
                items={items.filter(i =>
                    i.name.toLowerCase().includes(search.toLowerCase())
                )}
                onSelect={setSelected}
            />

            <ItemDetailsDrawer
                item={selected}
                onClose={() => setSelected(null)}
                onEdit={() => {/* open form */ }}
            />
        </>
    );
}
