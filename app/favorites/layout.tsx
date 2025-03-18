import DefaultLayout from '@/components/layout/defaultLayout';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
