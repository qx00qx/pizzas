'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import 'react-dadata/dist/react-dadata.css';
import { AddressSuggestions } from 'react-dadata';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <AddressSuggestions
          token={process.env.NEXT_PUBLIC_TOKEN_DADATA!}
          onChange={(data) => onChange?.(data?.value)}
        />
      )}
    </>
  );
};
