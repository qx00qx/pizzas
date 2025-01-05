import React from 'react';
import { prisma } from '@/../../prisma/prisma';
import { ProductModal } from '@/shared/components/shared';

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) {
    return <p>not found!</p>;
  }

  return <ProductModal product={product} />;
}
