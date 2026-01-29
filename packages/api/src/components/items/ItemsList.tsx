// components/items/ItemsList.tsx
type Props = {
    items: Item[];
    onSelect: (item: Item) => void;
};

export function ItemsList({ items, onSelect }: Props) {
    if (!items.length) {
        return <div>No items found</div>;
    }

    return (
        <ul>
            {items.map(item => (
                <ItemRow
                    key={item.id}
                    item={item}
                    onClick={() => onSelect(item)}
                />
            ))}
        </ul>
    );
}
