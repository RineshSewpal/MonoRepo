const [error, setError] = useState<ApiError | null>(null);

async function onSubmit(data: CreateItemRequest) {
    try {
        await createItem(data);
    } catch (e) {
        setError(e as ApiError);
    }
}

{ error && <InlineError message={error.message} /> }
