import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '../globals.css';
import { Header } from '@/shared/components/shared';
import { Suspense } from 'react';

const inter = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Pizza's | Главная",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
    </>
  );
}
