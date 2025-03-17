import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { tw } from '@/utils';
import '@/styles/globals.css';
import { ReactQueryProvider } from '@/context/queryProvider';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '박라영 Frontend Engineer',
  description: 'CDRI FE 사전과제',
};

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  minimumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={tw(notoSansKR.className, 'antialiased')}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
