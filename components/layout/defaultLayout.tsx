import { Header } from './header';

export default function DefaultLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center items-stretch min-h-safe mx-auto">
      <Header />
      <main className="flex flex-col row-start-2 max-w-[100rem] w-full">{children}</main>
    </div>
  );
}
