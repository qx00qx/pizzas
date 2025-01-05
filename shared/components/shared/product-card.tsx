import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
import { ingredients } from '@/prisma/constants';

interface Prop {
  className?: string;
  name: string;
  id: number;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<Prop> = ({
  id,
  price,
  imageUrl,
  className,
  name,
}) => {
  return (
    <div className={cn('', className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 rounded-lg h-[260px]">
          <img
            className="w-[215px] h-[215px] object-contain"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price}</b> руб.
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
