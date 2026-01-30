function ItemRow({ item }: { item: Item }) {
    const [error, setError] = useState<ApiError | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    async function onDelete() {
        setIsDeleting(true);
        setError(null);
        try {
            await deleteItem(item.id);
        } catch (e) {
            setError(e as ApiError);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div>
            <button onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting…" : "Delete"}
            </button>

            {error && <InlineError message={error.message} />}
        </div>
    );
}
