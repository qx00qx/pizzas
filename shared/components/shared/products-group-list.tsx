'use client';

import React from 'react';
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/product';
interface Props {
  title: string;
  className?: string;
  products: ProductWithRelations[];
  listClassName?: string;
  categoryID: number;
}
export const ProductsGroupList: React.FC<Props> = ({
  title,
  className,
  products,
  listClassName,
  categoryID,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryID);
    }
  }, [categoryID, intersection?.isIntersecting, title]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
          />
        ))}
      </div>
    </div>
  );
};
