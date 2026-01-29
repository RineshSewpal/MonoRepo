type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function ItemsSearch({ value, onChange }: Props) {
    return (
        <input
            placeholder="Search items…"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
}
