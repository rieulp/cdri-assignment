import ActiveLink from '@/components/common/activeLink';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full px-8 bg-white">
      <div className="h-32 max-w-[1600px] w-full mx-auto grid grid-cols-[20.7rem_minmax(max-content,1fr)_minmax(0,20.7rem)] items-center space-x-[5.6rem]">
        {/* 로고 */}
        <Link href="/">
          <div className="text-title1 text-text-primary select-none">CERTICOS BOOKS</div>
        </Link>
        <nav className="flex items-center flex-1 justify-center gap-[5.6rem] text-text-primary text-body1">
          <ActiveLink href="/" className="h-[3.2rem] pt-[0.3rem]" activeClassName="border-b-primary border-b">
            도서 검색
          </ActiveLink>
          <ActiveLink href="/favorites" className="h-[3.2rem] pt-[0.3rem]" activeClassName="border-b-primary border-b">
            내가 찜한 책
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
