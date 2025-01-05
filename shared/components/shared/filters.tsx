'use client';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Input } from '../ui';
import { RangeSlider, Title } from './index';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients, useFilters, useQueryFilters } from '@/shared/hooks';

interface Prop {
  className?: string;
}

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceRangeProps {
  doughType: string;
  ingredients: string;
  sizes: string;
}
export const Filters: React.FC<Prop> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrice('priceFrom', prices[0]);
    filters.setPrice('priceTo', prices[1]);
  };

  return (
    <div className={cn('', className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Чекбокс Верхние */}
      <CheckboxFiltersGroup
        name="doughType"
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
        selectedIds={filters.doughTypes}
        onClickCheckbox={filters.setDoughType}
        loading={loading}
        title="Тесто"
        className="mb-5"
      />

      <CheckboxFiltersGroup
        selectedIds={filters.sizes}
        name="sizes"
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
        onClickCheckbox={filters.setSizes}
        loading={loading}
        title="Размеры"
        className="mb-5"
      />

      {/* Фильтрация по цене */}

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1500}
            value={String(filters.price.priceFrom)}
            onChange={(e) =>
              filters.setPrice('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1500}
            placeholder="1500"
            value={String(filters.price.priceTo)}
            onChange={(e) =>
              filters.setPrice('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1500}
          step={10}
          value={[filters.price.priceFrom || 0, filters.price.priceTo || 1500]}
          onValueChange={([priceFrom, priceTo]) => {
            updatePrices([priceFrom, priceTo]);
          }}
        />
      </div>
      {/* Фильтрация ингредиентов */}
      <CheckboxFiltersGroup
        name="ingredients"
        selectedIds={filters.selectedIngredients}
        onClickCheckbox={filters.setSelectedIngredients}
        loading={loading}
        title="Ингредиенты"
        items={items}
        defaultItems={items.slice(0, 4)}
        className="mt-5"
        limit={4}
      />
    </div>
  );
};
