import { PaymentCallbackData } from '@/@types/youkassa';
import { prisma } from '@/prisma/prisma';
import { SucceededPaymentTemplate } from '@/shared/components/shared/email-templates/succeeded-payment';
import { sendEmail } from '@/shared/lib/sentEmail';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        `Pizza's | Ваш заказ успешно оформлен`,
        SucceededPaymentTemplate({ orderId: order.id, items })
      );
    } else {
      /* TODO: Письмо о неуспешной оплате с кодом ошибки */
    }
  } catch (error) {
    console.error('[CHeckout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
