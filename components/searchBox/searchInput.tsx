'use client';

import { ComponentProps, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import Icon from '@/components/icon';
import Input from '@/components/input';
import { withPreventDefault, tw } from '@/utils';

type Props = {
  placeholder?: string;
  query?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;

  /** 지난 검색 기록 */
  searchHistories?: string[];
  onHistoryRemove?: (index: number) => void;
};

export function SearchInputContainer({
  placeholder = '검색어를 입력하세요',
  query = '',
  searchHistories = [],
  onChange,
  onSearch,
  onHistoryRemove,
  className,
}: Props & { className?: string }) {
  const [isFocused, setFocus] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useClickOutside(formRef, () => setFocus(false));

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;
    onSearch?.(value.trim());
    formRef.current?.querySelector('input')?.blur();
    setFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const showHistories = isFocused && searchHistories.length > 0;

  return (
    <form
      ref={formRef}
      className={tw(
        'flex flex-col bg-lightGray gap-[1.6rem] text-caption relative',
        showHistories ? 'rounded-t-[2.4rem] rounded-b-none' : 'rounded-full',
        className,
      )}
      onSubmit={withPreventDefault(handleSubmit, query)}
      tabIndex={0}
      onBlur={(e) => {
        if (formRef.current?.contains(e.relatedTarget as Node)) return;
        setFocus(false);
      }}
    >
      <SearchInput
        onFocus={() => setFocus(true)}
        name="query"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {showHistories && (
        <HistoryList histories={searchHistories} onRemoveHistory={onHistoryRemove} onSelectHistory={handleSubmit} />
      )}
    </form>
  );
}

function SearchInput(props: Omit<ComponentProps<typeof Input>, 'autoComplete' | 'className'>) {
  {
    return (
      <div className="p-4 flex  text-text-primary h-[5rem]">
        <Icon name="search" size="3rem" />
        <Input autoComplete="off" className="h-[3rem] flex-1 text-caption" {...props} />
      </div>
    );
  }
}

function HistoryList({
  histories,
  onSelectHistory,
  onRemoveHistory,
}: {
  histories: string[];
  onSelectHistory: (value: string) => void;
  onRemoveHistory?: (index: number) => void;
}) {
  return (
    <ul className="text-text-subtitle flex flex-col py-[0.5rem] pl-[5.1rem] bg-lightGray rounded-b-[2.4rem] right-0 left-0 pb-[1.8rem] pr-[0.8rem] absolute top-full z-10">
      {histories.map((history, index) => (
        <li key={history} className="flex items-center justify-between py-[0.8rem] pr-[1.8rem]">
          <button
            className="w-full text-left h-full"
            type="button"
            onClick={withPreventDefault(() => onSelectHistory(history))}
          >
            {history}
          </button>
          {onRemoveHistory && (
            <button onClick={withPreventDefault(() => onRemoveHistory(index))} type="button">
              <Icon name="close" size="2.4rem" className="text-black" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
