import { productVariants } from '@prisma/client';
import { DoughType, pizzaSizes } from '../constants/pizza';

export const getAvailablePizzaSizes = (
  variants: productVariants[],
  type: DoughType
) => {
  const filteredPizzasByType = variants.filter(
    (variant) => variant.doughType === type
  );
  return pizzaSizes.map((variant) => ({
    name: variant.name,
    value: variant.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(variant.value)
    ),
  }));
};
