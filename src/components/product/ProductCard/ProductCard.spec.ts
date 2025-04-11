import ProductCard from './ProductCard.vue';
import { describe, vi, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { VueQueryPlugin } from '@tanstack/vue-query';
import type { Product } from '@/domain/models';
import { cartDataMock } from '@/domain/models/mocks/cart';

vi.mock('@/infrostruct/service/query', () => {
  return {
    cartQueries: {
      getCart: vi.fn(() => ({ data: cartDataMock })),
    },
  };
});

describe('ProductCard', () => {
  it('should render correct product card data with when product was passed', () => {
    const product: Product = {
      category: 'фрукты',
      createdAt: '12.24.24',
      description: 'desc',
      id: 1,
      imageUrl: '1',
      name: 'Яблоко',
      price: 1,
      stock: 1,
      updatedAt: '1',
    };

    const wrapper = mount(ProductCard, {
      props: {
        product: product,
      },
      global: {
        plugins: [VueQueryPlugin],
      },
    });

    expect(wrapper.html()).toContain(product.name);
    expect(wrapper.html()).toContain(product.description);
    expect(wrapper.html()).toContain(product.price);
    expect(wrapper.html()).toContain(product.name);
  });
});
