import { Container } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma';
import { ProductForm } from '@/shared/components/shared/product-form';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  });

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <span className="text-9xl">o(TヘTo)</span>
        <p className="mt-4 text-3xl">Такого товара нет</p>
      </div>
    );

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
