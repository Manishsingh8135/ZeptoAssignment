'use client'
import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent, useRef, useEffect } from 'react';
import Chip from './Chip';
import { Item } from '../data/dummyData';

interface AutocompleteChipInputProps {
  items: Item[];
}

const PickUser: React.FC<AutocompleteChipInputProps> = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const suggestionListRef = useRef<HTMLUListElement | null>(null);

  const filteredItems = filter
    ? items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) &&
        !selectedItems.includes(item)
    )
    : items.filter((item) => !selectedItems.includes(item));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setHighlightedIndex(null);
  };

  const selectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setFilter('');
    setHighlightedIndex(null);
  };

  const removeChip = () => {
    if (selectedItems.length > 0) {
      const lastSelected = selectedItems[selectedItems.length - 1];
      setSelectedItems(selectedItems.filter((si) => si.id !== lastSelected.id));
      setHighlightedIndex(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && filter === '') {
      removeChip();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const newIndex =
        highlightedIndex === null
          ? direction === 1
            ? 0
            : filteredItems.length - 1
          : (highlightedIndex + direction + filteredItems.length) % filteredItems.length;
      setHighlightedIndex(newIndex);

      // Ensure the highlighted item is in the view
      if (suggestionListRef.current) {
        const itemElement = suggestionListRef.current.children[newIndex] as HTMLElement;
        itemElement.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
    } else if (event.key === 'Enter' && highlightedIndex !== null) {
      selectItem(filteredItems[highlightedIndex]);
    }
  };

  const handleItemClick = (item: Item) => {
    selectItem(item);
  };

  const handleItemMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  // Scroll to the highlighted item when the list changes
  useEffect(() => {
    if (highlightedIndex !== null && suggestionListRef.current && suggestionListRef.current.children.length > 0) {
      const itemElement = suggestionListRef.current.children[highlightedIndex] as HTMLElement;
      if (itemElement) {
        itemElement.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }, [highlightedIndex]);


  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-2  bg-gray-700 border-b-2 border-white w-full">
        {selectedItems.map((item) => (
          <Chip key={item.id} label={item.name} onRemove={removeChip} />
        ))}
        <input
          type="text"
          value={filter}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="outline-none text-white  bg-gray-700 px-4 w-full flex-1 "
          placeholder="Start typing..."
        />
      </div>
      <ul
        ref={suggestionListRef}
        className="list-none m-2 py-2 max-h-60 overflow-auto bg-slate-500 rounded-lg"
      >
        {filteredItems.length === 0 ? (
          <li className="text-white p-3">No more users!</li>
        ) : (
          filteredItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => handleItemMouseEnter(index)}
              className={`cursor-pointer bg-slate-500 ${index === highlightedIndex ? 'bg-gray-900 p-3 px-5' : 'hover:bg-gray-700 '
                } text-white p-3 flex items-center gap-4`}
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex gap-5">
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm text-gray-300">{item.email}</span>
              </div>
            </li>
          ))
        )}
      </ul>

    </div>
  );
};

export default PickUser;

