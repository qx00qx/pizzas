'use client';

import { Container, Title } from '@/shared/components/shared';
import { CheckoutSidebar } from '@/shared/components/shared/checkout-sidebar';
import { useCart } from '@/shared/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCart } from '@/shared/checkout/checkout-cart';
import { CheckoutPersonalInfo } from '@/shared/checkout/checkout-personal-info';
import CheckoutAddress from '@/shared/checkout/checkout-address';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-from-schema';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/shared/services/api-client';

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success('Заказ оформлен успешно! Переход на оплату...', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Title text="Оформление заказа" className="font-extrabold text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                loading={loading}
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalInfo
                className={cn({ 'opacity-40 pointer-events-none': loading })}
              />
              <CheckoutAddress
                className={cn({ 'opacity-40 pointer-events-none': loading })}
              />
            </div>

            {/* Правая часть */}
            <CheckoutSidebar
              loading={loading || submitting}
              totalAmount={totalAmount}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
