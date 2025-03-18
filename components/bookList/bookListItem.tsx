'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import Icon from '@/components/icon';
import { tw } from '@/utils';
import Image from 'next/image';
import { numberToCurrency, decodeText } from '@/utils';
import { Book } from '@/hooks/book/useSearchBooks';

type Props = {
  book: Book;
  isLiked?: boolean;
  onToggleLike: () => void;
};

export function BookListItem({ book, isLiked, onToggleLike: onClickLike }: Props) {
  const [isExpanded, toggleExpand] = useState(false);
  const hasDiscount = book.sale_price < book.price;

  const handleExpandScroll = (element: HTMLButtonElement) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    const hiddenHeight = elementBottom - viewportHeight;

    if (hiddenHeight > 0) {
      window.scrollBy({
        behavior: 'smooth',
        top: hiddenHeight + 100,
      });
    }
  };

  return (
    <li
      className={tw(
        'flex items-center justify-between border-b border-b-gray ',
        isExpanded
          ? 'pt-[2.4rem] pr-[1.6rem] pb-[4rem] pl-[5.4rem] gap-[4.8rem]'
          : 'p-[1.6rem] pl-[4.8rem] gap-[2.2rem]',
      )}
    >
      {/* 책 정보 (이미지, 제목, 저자, 설명) */}
      <div className={tw('flex items-stretch flex-1 ', isExpanded ? 'gap-[3.2rem]' : 'gap-[4.8rem]')}>
        {/* 이미지 & 좋아요 버튼 */}
        <div
          className={tw(
            'relative flex items-center justify-center shrink-0 bg-gray',
            isExpanded ? 'w-[21rem] h-[28rem]' : 'w-[4.8rem] h-[6.8rem]',
          )}
        >
          <Image
            src={book.thumbnail || '/no-image.png'}
            alt={book.title}
            fill
            sizes="48rem"
            className="object-cover"
            decoding="async"
          />
          <button
            onClick={onClickLike}
            className={tw('absolute', isExpanded ? 'top-[0.8rem] right-[0.8rem]' : 'top-0 right-0')}
          >
            <Icon
              name={isLiked ? 'likeFill' : 'likeLine'}
              size={isExpanded ? '2.4rem' : '1.6rem'}
              className={isLiked ? 'text-red' : 'text-white'}
            />
          </button>
        </div>

        {/* 제목, 저자, 설명 */}
        <div className={tw('flex flex-col gap-[1.6rem] flex-1', isExpanded ? 'pt-[2rem]' : 'justify-center')}>
          {/* 제목 & 저자 */}
          <div className="flex items-center gap-[1.6rem]">
            <h3 className="text-text-primary text-title3 leading-[2.6rem] break-keep break-words line-clamp-2">
              {book.title}
            </h3>
            <p className="text-text-subtitle text-body2 leading-[2.2rem] break-words shrink-0 break-keep">
              {book.authors.join(', ')}
            </p>
          </div>

          {/* 설명 */}
          <div className={tw(' flex-col gap-[1.2rem] text-text-primary hidden', { flex: isExpanded })}>
            <p className="text-body2Bold leading-[2.6rem]">책 소개</p>
            <p className="text-small leading-[1.6rem] break-keep whitespace-pre-line break-words">
              {decodeText(book.contents)}
            </p>
          </div>
        </div>
      </div>

      {/* 버튼 & 가격 */}
      <div
        className={tw(
          'flex flex-col gap-[2.8rem] shrink-0',
          isExpanded ? 'w-[24rem] h-full pt-[0.2rem]' : 'min-w-[37rem]',
        )}
      >
        <div
          className={tw(
            'flex',
            isExpanded ? 'flex-col-reverse flex-1 items-end justify-between' : 'gap-[5.6rem] items-center justify-end',
          )}
        >
          {/* 가격 정보 */}
          <div
            className={tw({
              'grid grid-rows-2 grid-cols-[auto_1fr] gap-[0.8rem] justify-items-end items-center': isExpanded,
            })}
          >
            <p className={tw('hidden text-text-subtitle text-small', { block: isExpanded })}>원가</p>
            <p
              className={tw('text-text-primary text-title3', {
                'line-through font-[350]': hasDiscount,
                hidden: !isExpanded && hasDiscount,
              })}
            >
              {numberToCurrency(book.price)}원
            </p>
            {hasDiscount && (
              <>
                <p className={tw('text-text-subtitle text-small', { hidden: !isExpanded })}>할인가</p>
                <p className="text-text-primary text-title3">{numberToCurrency(book.sale_price)}원</p>
              </>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-[0.8rem]">
            {!isExpanded && (
              <a href={book.url} target="_blank" rel="noreferrer">
                <Button className="w-[11.5rem] pointer-events-none">구매하기</Button>
              </a>
            )}
            <Button
              color="secondary"
              onClick={() => toggleExpand((prev) => !prev)}
              className="w-[11.5rem]"
              icon={isExpanded ? 'arrowUp' : 'arrowDown'}
            >
              상세보기
            </Button>
          </div>
        </div>

        {isExpanded && (
          <a href={book.url} target="_blank" rel="noreferrer">
            <Button className="pointer-events-none w-full" ref={handleExpandScroll}>
              구매하기
            </Button>
          </a>
        )}
      </div>
    </li>
  );
}
