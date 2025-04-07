<script setup lang="ts">
/**
 * Бизнес экшны (то, что должно быть покрыто тестами)
 *
 * - Создание товара
 * - Удаление товара
 * - Добавление товара в корзину
 * - Удаление товара из корзины
 * - Обновление количества товара в корзине
 */

/**
 * Проблемы текущего кода
 *
 * - При выполнении экшнов выполняются лишние запросы
 * Например: после изменения количества товара в корзине обновляется запрос корзины,
 * хотя мы могли установить новое количество и не выполнять запрос
 * - Код сложно тестировать
 * - Код сложно читать
 * - Константы и статический текст не вынесен
 */

/**
 * Разбиваем на компоненты
 *
 * Форма создания товара
 */

import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { OpenProductDialog } from '@/components/ui/dialog';

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

import {
  getProductControllerFindAllQueryKey,
  useProductControllerFindAll,
  useProductControllerRemove,
} from './api/products/products.ts';

import { watch } from 'vue';

import { Toaster } from 'vue-sonner';

import { useQueryClient } from '@tanstack/vue-query';
import type { CartResponseDto, ProductListResponseDto } from '@/api/model';
import {
  getCartControllerGetCartQueryKey,
  useCartControllerAddToCart,
  useCartControllerGetCart,
  useCartControllerRemoveFromCart,
  useCartControllerUpdateCartItem,
} from '@/api/cart/cart.ts';
import { Badge } from '@/components/ui/badge';
import { APP_CONFIG } from '@/config';

const USER_ID = APP_CONFIG.USER_ID;
const { data: products } = useProductControllerFindAll();
const queryClient = useQueryClient();

const { mutate: deleteProduct, data: removeResponse } =
  useProductControllerRemove();
const handleDeleteProduct = (productId: number) => {
  deleteProduct({
    id: productId,
  });
};

const { data: cartData } = useCartControllerGetCart({ userId: USER_ID });

watch(removeResponse, () => {
  invalidateProductFindAll();
});
const { mutate: addToCard, data: addToCardResponse } =
  useCartControllerAddToCart();
const handleAddToCart = (productId: number) => {
  addToCard({
    data: {
      userId: USER_ID,
      productId,
      quantity: 1,
    },
  });
};

const { mutate: removeFromCart, data: removeFromCartResponse } =
  useCartControllerRemoveFromCart();
const { mutate: updateCartQuantity, data: updateCartQuantityResponse } =
  useCartControllerUpdateCartItem();

watch(
  [removeFromCartResponse, updateCartQuantityResponse, addToCardResponse],
  () => {
    invalidateCart();
  },
);

const handleRemoveFromCart = (productId: number) => {
  if (!cartData.value) throw new Error('Cart does not exist');

  const itemId = cartData.value.items.find(
    (item) => item.productId === productId,
  );

  if (!itemId)
    throw new Error(
      `Cart item with product with id ${productId} does not exist`,
    );

  removeFromCart({
    itemId: itemId.id,
    params: {
      cartId: cartData.value.id,
    },
  });
};

const handleUpdateCartQuantity = (productId: number, quantity: number) => {
  if (!cartData.value) throw new Error('Cart does not exist');

  const itemId = cartData.value.items.find(
    (item) => item.productId === productId,
  );

  if (!itemId)
    throw new Error(
      `Cart item with product with id ${productId} does not exist`,
    );

  updateCartQuantity({
    data: {
      itemId: itemId.id,
      cartId: cartData.value.id,
      quantity: quantity,
    },
  });
};

const handleUpdateCount = (productId: number, quantity: number) => {
  if (quantity < 1) {
    handleRemoveFromCart(productId);
  } else {
    handleUpdateCartQuantity(productId, quantity);
  }
};

function invalidateProductFindAll() {
  queryClient.invalidateQueries<ProductListResponseDto>({
    queryKey: getProductControllerFindAllQueryKey(),
  });
}

function invalidateCart() {
  queryClient.invalidateQueries<CartResponseDto>({
    queryKey: getCartControllerGetCartQueryKey({ userId: USER_ID }),
  });
}
</script>

<template>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-4">
      <h1>Товары</h1>
      <OpenProductDialog />
      <Badge v-if="cartData" class="h-6 rounded-2xl">
        <ShoppingCart />
        {{ cartData.items?.reduce((acc, item) => (acc += item.quantity), 0) }}
      </Badge>
    </div>

    <ul v-if="products" class="grid grid-rows-1 gap-2 grid-cols-4">
      <li v-for="product in products.products" :key="product.id">
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

            <template v-if="cartData">
              <Button
                v-if="
                  !cartData.items.find((i) => i.productId === product.id)
                    ?.quantity
                "
                class="mb-0 mt-auto"
                @click="handleAddToCart(product.id)"
              >
                Добавить в корзину
              </Button>
              <NumberField
                v-else
                :model-value="
                  cartData.items.find((i) => i.productId === product.id)
                    ?.quantity || 1
                "
                :min="0"
                @update:model-value="handleUpdateCount(product.id, $event)"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </template>

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
      </li>
    </ul>
  </div>
  <Toaster />
</template>
