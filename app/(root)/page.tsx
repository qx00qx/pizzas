import { Container, Filters, Title, TopBar } from '@/shared/components/shared';
import { ProductsGroupList } from '@/shared/components/shared/products-group-list';
import { prisma } from '@/prisma/prisma';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/shared/lib/findPizzas';
import { Stories } from '@/shared/components/shared/stories';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <Stories />

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container className="pb-14">
        <div className="flex gap-[60px] mt-4">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16 p-3">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      products={category.products}
                      categoryID={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
