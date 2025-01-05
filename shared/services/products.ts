import { Product } from '@prisma/client';
import { axiosInstance } from './axios-instance';
import { routes } from './constants';

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(routes.SEARCH_PRODUCTS, {
    params: { query },
  });
  return data;
};
