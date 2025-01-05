import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemPrice } from './calcCartItemPrice';

export interface CartStateItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  size?: number | null;
  dough?: number | null;
  ingredients: Array<{ name: string; price: number }>;
}

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariants.product.name,
    imageUrl: item.productVariants.product.imageUrl,
    price: calcCartItemPrice(item),
    pizzaSize: item.productVariants.size,
    pizzaType: item.productVariants.doughType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
