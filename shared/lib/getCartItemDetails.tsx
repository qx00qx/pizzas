import { DoughType, mapDoughType, PizzaSize } from '../constants/pizza';
import { CartStateItem } from './getCartDetails';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  dough?: DoughType,
  size?: PizzaSize
) => {
  const details = [];

  if (size && dough) {
    const typeName = mapDoughType[dough];
    details.push(`${typeName} ${size} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
