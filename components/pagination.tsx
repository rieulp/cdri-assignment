import { tw } from '@/utils';

type Props = {
  className?: string;
  totalPage: number;
  page: number;
  onPrev: () => void;
  onNext: () => void;
  pageUnit?: number;
  movePage: (page: number) => void;
};

export default function Pagination({ page = 1, pageUnit = 5, movePage, onNext, onPrev, totalPage, className }: Props) {
  const minPage = Math.max(1, Math.floor((page - 1) / pageUnit) * pageUnit + 1);
  const maxPage = Math.min(totalPage, minPage + pageUnit - 1);
  const pages = Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);

  return (
    <div className={tw('flex items-center gap-4 text-text-primary text-body2', className)}>
      <PageButton onClick={onPrev} disabled={page === 1}>
        이전
      </PageButton>
      <ul className="flex gap-2 items-center">
        {pages.map((p) => (
          <li key={p}>
            <PageButton onClick={() => movePage(p)} active={p === page}>
              {p}
            </PageButton>
          </li>
        ))}
      </ul>
      <PageButton onClick={onNext} disabled={page === totalPage}>
        다음
      </PageButton>
    </div>
  );
}

type PageButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

function PageButton({ children, onClick, active, disabled }: PageButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={tw(
        'border-gray min-w-[2.4rem] h-[2.4rem] flex items-center justify-center rounded',
        disabled ? 'text-text-subtitle cursor-not-allowed' : 'hover:text-primary',
        active && 'text-primary border-primary font-bold',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
