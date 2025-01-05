import { Prisma } from '@prisma/client';
import { ingredients, categories, products } from './constants';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

const randomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateproductVariants = ({
  productId,
  doughType,
  size,
}: {
  productId: number;
  doughType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomPrice(190, 600),
    doughType,
    size,
  } as Prisma.productVariantsUncheckedCreateInput;
};

async function add() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: bcrypt.hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: bcrypt.hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пицца Кола-барбекю',
      imageUrl:
        'https://media.dodostatic.net/image/r:1875x1875/11EF9050501F3FA690A64053F5F07626.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:1875x1875/11EE7D610D91679BB519F38C3F45880F.png',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productVariants.createMany({
    data: [
      // Пицца "Кола-барбекю"
      generateproductVariants({ productId: pizza1.id, doughType: 1, size: 20 }),
      generateproductVariants({ productId: pizza1.id, doughType: 2, size: 30 }),
      generateproductVariants({ productId: pizza1.id, doughType: 2, size: 40 }),

      // Пицца "Сырная"
      generateproductVariants({ productId: pizza2.id, doughType: 1, size: 20 }),
      generateproductVariants({ productId: pizza2.id, doughType: 1, size: 30 }),
      generateproductVariants({ productId: pizza2.id, doughType: 1, size: 40 }),
      generateproductVariants({ productId: pizza2.id, doughType: 2, size: 20 }),
      generateproductVariants({ productId: pizza2.id, doughType: 2, size: 30 }),
      generateproductVariants({ productId: pizza2.id, doughType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateproductVariants({ productId: pizza3.id, doughType: 1, size: 20 }),
      generateproductVariants({ productId: pizza3.id, doughType: 2, size: 30 }),
      generateproductVariants({ productId: pizza3.id, doughType: 2, size: 40 }),

      // Остальные продукты
      generateproductVariants({ productId: 1 }),
      generateproductVariants({ productId: 2 }),
      generateproductVariants({ productId: 3 }),
      generateproductVariants({ productId: 4 }),
      generateproductVariants({ productId: 5 }),
      generateproductVariants({ productId: 6 }),
      generateproductVariants({ productId: 7 }),
      generateproductVariants({ productId: 8 }),
      generateproductVariants({ productId: 9 }),
      generateproductVariants({ productId: 10 }),
      generateproductVariants({ productId: 11 }),
      generateproductVariants({ productId: 12 }),
      generateproductVariants({ productId: 13 }),
      generateproductVariants({ productId: 14 }),
      generateproductVariants({ productId: 15 }),
      generateproductVariants({ productId: 16 }),
      generateproductVariants({ productId: 17 }),
    ],
  });
  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });
  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });
}
async function clear() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "productVariants" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await clear();
    await add();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
