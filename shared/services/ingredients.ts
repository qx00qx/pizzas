import { Ingredient } from '@prisma/client';
import { axiosInstance } from './axios-instance';
import { routes } from './constants';

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(routes.INGREDIENTS)).data;
};
