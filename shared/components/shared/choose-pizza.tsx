'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { Ingredient, productVariants } from '@prisma/client';
import { GroupVariants } from './group-variants';
import { doughTypes, DoughType, PizzaSize } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '@/shared/lib/getAvailablePizzaSizes';
import { getPizzaDetails } from '@/shared/lib/getPizzaDetails';
import { usePizzaOptions } from '@/shared/hooks/usePizzaOptions';

interface Props {
  imageUrl: string;
  name: string;
  variants: productVariants[];
  ingredients: Ingredient[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizza: React.FC<Props> = ({
  name,
  imageUrl,
  variants,
  onSubmit,
  ingredients,
  className,
  loading,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    pizzaAvailableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variants);

  const { totalPrice, pizzaDetails } = getPizzaDetails(
    type,
    size,
    variants,
    ingredients,
    selectedIngredients
  );

  const onClickAddCart = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };
  return (
    /* TODO: исправить размер модального окна на более маленький */
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage size={size} imageUrl={imageUrl} />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{pizzaDetails}</p>

        <div className="flex flex-col gap-4">
          <GroupVariants
            items={pizzaAvailableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={doughTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as DoughType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={() => onClickAddCart()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
