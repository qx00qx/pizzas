import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemPrice = (item: CartItemDTO): number => {
  const ingredientsTotalPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (ingredientsTotalPrice + item.productVariants.price) * item.quantity;
};
