import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import { Jura } from 'next/font/google';
import Loading from '../components/Loading';
import WorkWithUs from '../components/workWithUs/WorkWithUs';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'finetooth.dev',
  description: 'web design + development',
  openGraph: {
    images: [
      {
        url: '/images/ogimage.webp',
        alt: 'Finetooth Open Graph Image',
      },
    ],
  },
};

const jura = Jura({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <html
        lang="en"
        className={`${jura.className} overscroll-none bg-neutral-50`}
      >
        <body className="flex sans-serif h-svh overscroll-none text-neutral-400">
          {/* Header */}
          <Header />

          <Suspense fallback={<Loading />}>{children}</Suspense>

          {/* Footer */}
          <div className="absolute flex flex-row bottom-0 right-0 z-20 w-full px-3 py-2">
            <p>c {currentYear}</p>
          </div>
          {/* <WorkWithUs /> */}
        </body>
      </html>
    </>
  );
}
