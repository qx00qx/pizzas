'use client';

import { ProductWithRelations } from '@/@types/product';
import { useCartStore } from '@/shared/store/cart';
import { ChoosePizza } from './choose-pizza';
import { ChooseProduct } from './choose-product';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const { addCartItem, loading } = useCartStore();

  const firstItem = product.variants[0];
  const isPizzaForm = Boolean(firstItem.doughType);

  const onSubmit = async (
    productVariantsId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productVariantsId ?? firstItem.id;

      await addCartItem({
        productVariantsId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлен в корзину');

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizza
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProduct
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
