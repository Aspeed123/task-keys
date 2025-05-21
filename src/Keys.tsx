import React, { useMemo, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const { initialData, sorting } = props;

    const [items, setItems] = useState<IItem[]>(initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState<string>('');

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) =>
            sorting === 'ASC' ? a.id - b.id : b.id - a.id,
        );
    }, [items, sorting]);

    const handleClick = (item: IItem) => {
        setEditingId(item.id);
        setEditingValue(item.name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && editingId !== null) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? { ...item, name: editingValue }
                        : item,
                ),
            );
            setEditingId(null);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            value={editingValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleClick(item)}>
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
