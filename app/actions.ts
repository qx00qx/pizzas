'use server';

import { prisma } from '@/prisma/prisma';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates/pay-order';
import { VerifycateTemplate } from '@/shared/components/shared/email-templates/verifycate';
import { CheckoutFormValues } from '@/shared/constants/checkout-from-schema';
import { createPayment } from '@/shared/lib/createPayment';
import { getUserSession } from '@/shared/lib/getUserSession';
import { sendEmail } from '@/shared/lib/sentEmail';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';
import toast from 'react-hot-toast';

/* Создание заказа */
export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token is not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariants: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart is not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    /* Создание ссылки оплаты */

    const paymentData = await createPayment({
      amount: order.totalAmount,
      description: `Заказ № ${order.id}`,
      orderId: order.id,
    });

    if (!paymentData) {
      throw new Error('Платеж не создан');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      `Pizza's | Оплатите заказ № ${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}

/* Обновление данных профиля */
export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error('Пользователь не авторизован');
    }
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });
    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.error('Error [UPDATE_USER]', error);
    throw error;
  }
}

/* Регистрация пользователя */
export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }
      toast.error('Пользователь с таким email уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });

    const code = Math.floor(10000 + Math.random() * 90000).toString();
    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      `Pizza's | Подтверждение email`,
      VerifycateTemplate({
        code,
      })
    );
  } catch (error) {
    console.error('Error [REGISTER_USER]', error);
    throw error;
  }
}
