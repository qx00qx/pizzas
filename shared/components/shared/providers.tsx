'use client';

import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader />
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
