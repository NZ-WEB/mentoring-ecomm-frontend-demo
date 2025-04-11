<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { X } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { watch } from 'vue';
import { ProductCardActions } from '@/components/product';

import {
  getProductControllerFindAllQueryKey,
  useProductControllerRemove,
} from '@/api/products/products.ts';

import { useQueryClient } from '@tanstack/vue-query';
import type { ProductListResponseDto } from '@/api/model';
import type { Product } from '@/domain/models';

defineProps<{
  product: Product;
}>();

const queryClient = useQueryClient();
const { mutate: deleteProduct, data: removeResponse } = useProductControllerRemove();

const handleDeleteProduct = (productId: number) => {
  deleteProduct({
    id: productId,
  });
};

function invalidateProductFindAll() {
  queryClient.invalidateQueries<ProductListResponseDto>({
    queryKey: getProductControllerFindAllQueryKey(),
  });
}

watch(removeResponse, () => {
  invalidateProductFindAll();
});
</script>

<template>
  <Card class="h-full relative">
    <CardHeader class="h-full">
      <CardTitle>
        {{ product.name }}
      </CardTitle>
      <p>
        {{ product.description }}
      </p>
      <div>
        <span class="font-bold text-lg"> {{ product.price }}₽ </span>
      </div>
      <ProductCardActions :productId="product.id" />
      <Button
        variant="outline"
        size="sm"
        class="absolute top-6 right-6 w-6 h-6 rounded-[50%]"
        @click="handleDeleteProduct(product.id)"
      >
        <X />
      </Button>
    </CardHeader>
  </Card>
</template>
