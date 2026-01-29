type Props = {
    initial?: Partial<Item>;
    onSubmit: (data: CreateItemInput | UpdateItemInput) => void;
};

export function ItemForm({ initial = {}, onSubmit }: Props) {
    const [name, setName] = useState(initial.name ?? "");
    const [value, setValue] = useState(initial.value ?? 0);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({ name, value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
            />

            <input
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
            />

            <button type="submit">Save</button>
        </form>
    );
}
