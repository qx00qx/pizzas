import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  productVariants,
} from '@prisma/client';

/* DTO - Типизация для данных взаимодействующих с бекендом  */

export type CartItemDTO = CartItem & {
  productVariants: productVariants & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValue {
  productVariantsId: number;
  ingredients?: number[];
}
