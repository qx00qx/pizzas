import { Ingredient, productVariants } from '@prisma/client';
import { DoughType, mapDoughType, PizzaSize } from '../constants/pizza';
import { calcTotalPizzaPrice } from './calcTotalPizzaPrice';

export const getPizzaDetails = (
  type: DoughType,
  size: PizzaSize,
  variants: productVariants[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    variants,
    ingredients,
    selectedIngredients
  );
  const pizzaDetails = `${size} см, ${mapDoughType[type]} тесто`;

  return { totalPrice, pizzaDetails };
};
