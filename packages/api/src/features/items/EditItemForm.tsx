const [isSaving, setIsSaving] = useState(false);

async function onSave(data: UpdateItemRequest) {
    setIsSaving(true);
    try {
        await updateItem(id, data);
    } finally {
        setIsSaving(false);
    }
}
{ error && <InlineError message={error.message} /> }
