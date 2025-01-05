import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface SucceededPaymentProps {
  orderId: number;
  items: CartItemDTO[];
}

export const SucceededPaymentTemplate: React.FC<SucceededPaymentProps> = ({
  orderId,
  items,
}) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>
    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productVariants.product.name} | {item.productVariants.price} ₽ x{' '}
          {item.quantity} шт. = {item.productVariants.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
