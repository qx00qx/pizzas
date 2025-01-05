import { PizzaSize, DoughType } from '@/shared/constants/pizza';
import React, { useEffect, useState } from 'react';
import { Variant } from '../components/shared/group-variants';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from './../lib/getAvailablePizzaSizes';
import { productVariants } from '@prisma/client';

interface ReturnProps {
  size: PizzaSize;
  type: DoughType;
  selectedIngredients: Set<number>;
  pizzaAvailableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: DoughType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: productVariants[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<DoughType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const pizzaAvailableSizes = getAvailablePizzaSizes(variants, type);

  const currentItemId = variants.find(
    (variant) => variant.doughType === type && variant.size === size
  )?.id;

  useEffect(() => {
    const isAvailableSize = pizzaAvailableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const firstAvailableSize = pizzaAvailableSizes.find(
      (item) => !item.disabled
    );

    if (!isAvailableSize && firstAvailableSize) {
      setSize(Number(firstAvailableSize.value) as PizzaSize);
    }
  }, [pizzaAvailableSizes, size, type]);

  return {
    size,
    type,
    selectedIngredients,
    pizzaAvailableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
