'use client';

import { useState, useRef, useId } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { tw } from '@/utils';
import Icon from '@/components/icon';

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  hideSelectedOption?: boolean;
};

export default function Select({ onChange, options, value, className, hideSelectedOption, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selectedOption = options.find((option) => option.value === value);

  useClickOutside(containerRef, () => setOpen(false));

  const isSkipOption = (option: Option) => options.length >= 2 && hideSelectedOption && option.value === value;

  const focusNextOption = (currentIndex: number, direction: 'up' | 'down') => {
    const step = direction === 'down' ? 1 : -1;
    let nextIndex = (currentIndex + step + options.length) % options.length;

    while (isSkipOption(options[nextIndex])) {
      nextIndex = (nextIndex + step + options.length) % options.length;
    }

    (listRef.current?.children[nextIndex] as HTMLElement)?.focus();
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  const handleKeyDownButton = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      focusNextOption(-1, 'down');
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleKeyDownOption = (index: number) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSelect(options[index].value);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNextOption(index, 'down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusNextOption(index, 'up');
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        onKeyDown={handleKeyDownButton}
        className={tw(
          'flex items-center justify-between px-[0.8rem] py-[0.9rem] w-full border-b border-gray text-text-primary text-body2Bold',
          { 'opacity-50 cursor-not-allowed': disabled === true },
          className,
        )}
      >
        <p>{selectedOption?.label}</p>
        <Icon name={open ? 'arrowUp' : 'arrowDown'} size="1.6rem" className="text-gray" />
      </button>

      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="absolute bg-white top-full mt-[0.6rem] left-0 w-full border-gray shadow-[0px_0px_4px_#0000003f]"
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              tabIndex={0}
              role="option"
              aria-selected={option.value === value}
              className={tw('p-[0.8rem] cursor-pointer text-text-subtitle text-body2 hover:text-body2Bold', {
                'text-body2Bold': option.value === value,
                hidden: isSkipOption(option),
              })}
              onClick={() => handleSelect(option.value)}
              onKeyDown={handleKeyDownOption(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
