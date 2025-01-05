import { prisma } from '@/prisma/prisma';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  doughTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const doughTypes = params.doughTypes?.split(',').map(Number);
  const ingredientsArray = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsArray
            ? {
                some: {
                  id: {
                    in: ingredientsArray,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              doughType: {
                in: doughTypes,
              },
              price: {
                gte: minPrice /* больше или равно мин. стоимости */,
                lte: maxPrice /* меньше или равна стоимости */,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });
  return categories;
};
