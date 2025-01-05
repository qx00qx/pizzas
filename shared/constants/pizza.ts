export const mapSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapDoughType = {
  1: 'традиционное',
  2: 'тонкое',
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
  name,
  value,
}));

export const doughTypes = Object.entries(mapDoughType).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof mapSize;
export type DoughType = keyof typeof mapDoughType;
