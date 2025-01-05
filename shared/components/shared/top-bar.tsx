import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Categories, Container, SortPopup } from '.';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories }) => {
  return (
    <div
      className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10')}
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
