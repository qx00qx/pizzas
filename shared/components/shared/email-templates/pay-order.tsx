import * as React from 'react';

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ № {orderId}</h1>

    <p>Оплатите заказ на сумму: {totalAmount} ₽</p>
    <p>
      Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты
    </p>
  </div>
);
