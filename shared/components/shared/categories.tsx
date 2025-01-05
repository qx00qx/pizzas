'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { styleGenerated } from '@/shared/utils/mapsStyles';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {categories.map(({ name, id }) => (
        <a
          href={`/#${name}`}
          key={id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && styleGenerated('shadow-hover')
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
