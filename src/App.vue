<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import { ProductCreateDialog } from '@/components/ui/dialog';
import { Toaster } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { ProductList } from '@/components/product';
import { APP_CONFIG } from '@/config';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { cartQueries } from '@/infrostruct/service';

const USER_ID = APP_CONFIG.USER_ID;
const { data: cartData } = cartQueries.getCart({ userId: USER_ID });
</script>

<template>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-4">
      <h1>Товары</h1>
      <ProductCreateDialog />
      <Badge v-if="cartData" class="h-6 rounded-2xl">
        <ShoppingCart />
        {{ cartData.items?.reduce((acc, item) => (acc += item.quantity), 0) }}
      </Badge>
    </div>
    <ProductList v-if="cartData" :cart-data="cartData" />
  </div>
  <Toaster />
  <VueQueryDevtools />
</template>
