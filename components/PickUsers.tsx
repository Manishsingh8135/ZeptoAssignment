// 'use client' is not a recognized directive, you might want to check if it's necessary
'use client'
import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
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

  const removeChip = (item: Item) => {
    setSelectedItems(selectedItems.filter((si) => si.id !== item.id));
    setHighlightedIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && filter === '') {
      if (selectedItems.length > 0) {
        const lastSelected = selectedItems[selectedItems.length - 1];
        removeChip(lastSelected);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (highlightedIndex === null || highlightedIndex === filteredItems.length - 1) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (highlightedIndex === null || highlightedIndex === 0) {
        setHighlightedIndex(filteredItems.length - 1);
      } else {
        setHighlightedIndex((prevIndex) => (prevIndex === null ? filteredItems.length - 1 : prevIndex - 1));
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
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-700 border-b-2 border-white w-full">
        {selectedItems.map((item) => (
          <Chip key={item.id} label={item.name} onRemove={() => removeChip(item)} />
        ))}
        <input
          type="text"
          value={filter}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="outline-none text-white bg-gray-700 px-4 w-full flex-1"
          placeholder="Start typing..."
        />
      </div>
      <ul
        ref={suggestionListRef}
        className="list-none my-2 py-2 max-h-60 overflow-auto bg-slate-500 rounded-lg"
      >
        {filteredItems.length === 0 ? (
          <li className="text-white p-3">No more users!</li>
        ) : (
          filteredItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => handleItemMouseEnter(index)}
              className={`cursor-pointer bg-slate-500 ${
                index === highlightedIndex
                  ? 'bg-gray-900 '
                  : 'bg-slate-500  hover:bg-gray-900'
              } text-white p-0 md:p-3 flex items-center gap-4`}
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-10 h-10 rounded-full p-1"
              />
              <div className="flex gap-4 md:gap-5">
                <span className="text-xs md:text-sm font-normal md:font-semibold pr-2">{item.name}</span>
                <span className="text-xs md:text-sm text-gray-300 pr-2">{item.email}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PickUser;
