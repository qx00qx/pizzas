import { Ingredient, Product, productVariants } from '@prisma/client';

export type ProductWithRelations = Product & {
  variants: productVariants[];
  ingredients: Ingredient[];
};
