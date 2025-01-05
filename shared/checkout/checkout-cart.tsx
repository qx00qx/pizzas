import React from 'react';
import { WhiteBlock } from '../components/shared';
import { CheckoutItem } from '../components/shared/checkout-item';
import { getCartItemDetails } from '../lib/getCartItemDetails';
import { CartStateItem } from '../lib/getCartDetails';
import { DoughType, PizzaSize } from '../constants/pizza';
import { CheckoutItemSkeleton } from '../components/shared/checkout-item-skeleton';

interface Props {
  items: CartStateItem[];
  loading?: Boolean;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className="flex flex-col gap-5">
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, index) => (
            <CheckoutItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            disabled={item.disabled}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients,
              item.dough as DoughType,
              item.size as PizzaSize
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onClickRemove={() => removeCartItem(item.id)}
            onClickCountButton={(type) =>
              onClickCountButton(item.id, item.quantity, type)
            }
          />
        ))
      )}
    </WhiteBlock>
  );
};
