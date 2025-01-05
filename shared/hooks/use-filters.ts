import { useRouter, useSearchParams } from 'next/navigation';
import useSet from 'react-use/lib/useSet';
import { useMemo, useState } from 'react';

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  doughType: string;
  ingredients: string;
  sizes: string;
}

export interface Filters {
  sizes: Set<string>;
  doughTypes: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceRangeProps, value: number) => void;
  setDoughType: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setSizes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();

  /* Фильтр Ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  /* Фильтр Размера */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  /* Фильтр Тесто */
  const [doughTypes, { toggle: toggleDoughTypes }] = useSet(
    new Set<string>(
      new Set<string>(
        searchParams.has('doughType')
          ? searchParams.get('doughType')?.split(',')
          : []
      )
    )
  );

  /* Фильтр Стоимости */
  const [price, setPrice] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const onChangedPrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      doughTypes,
      selectedIngredients,
      price,
      setPrice: onChangedPrice,
      setDoughType: toggleDoughTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, doughTypes, selectedIngredients, price]
  );
};
