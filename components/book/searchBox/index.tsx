'use client';

import { useState } from 'react';
import Popup from '@/components/common/popup';
import { Button } from '@/components/common/button';
import Select from '@/components/common/select';
import Input from '@/components/common/input';
import { SearchInput } from './searchInput';
import { withPreventDefault } from '@/utils';
import { SearchBooksQuery, useSearchHistory } from '@/hooks/book';
import { SearchTarget } from '@/api/book';

const detailSearchOptions: { label: string; value: SearchTarget }[] = [
  { label: '제목', value: 'title' },
  { label: '저자', value: 'person' },
  { label: '출판사', value: 'publisher' },
];

type Props = {
  onSearch: (query: SearchBooksQuery) => void;
  searchBooksQuery: SearchBooksQuery;
};

export default function SearchBox({ onSearch, searchBooksQuery }: Props) {
  const [query, setQuery] = useState('');
  const [detailQuery, setDetailQuery] = useState<Pick<SearchBooksQuery, 'target' | 'targetQuery'>>({
    target: searchBooksQuery.target,
    targetQuery: searchBooksQuery.target ? searchBooksQuery.query : '',
  });

  const { searchHistory, addHistory, removeHistory } = useSearchHistory();

  const handleGlobalSearch = (value: string) => {
    setQuery('');
    setDetailQuery((prev) => ({ ...prev, targetQuery: '' }));
    addHistory(value);
    onSearch({ searchType: 'all', query: value.trim() });
  };

  const handleDetailSearch = () => {
    setQuery('');
    onSearch({ searchType: 'target', target: detailQuery.target, targetQuery: detailQuery.targetQuery?.trim() });
  };

  return (
    <div className="flex flex-col gap-[1.6rem] max-w-[56.8rem]">
      <h2 className="text-title2 text-text-primary">도서 검색</h2>
      <div className="flex gap-[1.6rem] items-center">
        <SearchInput
          className="flex-1"
          onChange={setQuery}
          onHistoryRemove={removeHistory}
          onSearch={handleGlobalSearch}
          query={query}
          searchHistories={searchHistory}
        />
        <Popup.Container className="shrink-0">
          <Popup.Trigger as={Button} color="secondary" variant="outline" size="sm">
            상세검색
          </Popup.Trigger>
          <Popup.Content
            closeButton
            className="w-[36rem] top-full mt-[0.8rem] left-1/2 -translate-x-[50%] bg-white shadow-[0px_4px_14px_6px_#97979726] rounded-[0.8rem]"
          >
            {(close) => (
              <form
                className="flex flex-col gap-[1.6rem]"
                onSubmit={withPreventDefault(() => {
                  handleDetailSearch();
                  close();
                })}
              >
                <div className="flex gap-[0.4rem] items-end">
                  <Select
                    className="w-[10rem]"
                    onChange={(value) => {
                      setDetailQuery((prev) => ({ ...prev, target: value }));
                    }}
                    options={detailSearchOptions}
                    value={detailQuery.target ?? 'title'}
                    hideSelectedOption
                  />
                  <Input
                    placeholder="검색어 입력"
                    className="border-b border-b-primary flex-1"
                    value={detailQuery.targetQuery}
                    onChange={(e) => setDetailQuery((prev) => ({ ...prev, targetQuery: e.target.value }))}
                  />
                </div>
                <Button
                  type="submit"
                  color="primary"
                  size="sm"
                  disabled={!detailQuery.targetQuery}
                  onClick={() => {
                    handleDetailSearch();
                    close();
                  }}
                >
                  검색하기
                </Button>
              </form>
            )}
          </Popup.Content>
        </Popup.Container>
      </div>
    </div>
  );
}
