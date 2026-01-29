type Props = {
    item: Item | null;
    onClose: () => void;
    onEdit: () => void;
};

export function ItemDetailsDrawer({ item, onClose, onEdit }: Props) {
    if (!item) return null;

    return (
        <Drawer open onClose={onClose}>
            <h2>{item.name}</h2>
            <p>Value: {item.value}</p>

            <button onClick={onEdit}>Edit</button>
        </Drawer>
    );
}
