<script setup lang="ts">
import type { CartResponseDto } from '@/api/model';
import { ProductCard } from '@/components/product';
import { productQueries } from '@/infrostruct/service';

defineProps<{
  cartData: CartResponseDto;
}>();

const { data: products } = productQueries.getProductList();
</script>

<template>
  <ul v-if="products" class="grid grid-rows-1 gap-2 grid-cols-4">
    <li v-for="product in products.products" :key="product.id">
      <ProductCard :product="product" :cartData="cartData" />
    </li>
  </ul>
</template>
