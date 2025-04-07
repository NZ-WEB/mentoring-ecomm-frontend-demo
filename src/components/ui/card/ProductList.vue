<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { X } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { watch } from 'vue';

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
} from '@/api/products/products.ts';

import {
  getCartControllerGetCartQueryKey,
  useCartControllerAddToCart,
  useCartControllerRemoveFromCart,
  useCartControllerUpdateCartItem,
} from '@/api/cart/cart.ts';

import { useQueryClient } from '@tanstack/vue-query';
import type { CartResponseDto, ProductListResponseDto } from '@/api/model';
import { APP_CONFIG } from '@/config';

const props = defineProps<{
  cartData: CartResponseDto;
}>();

const USER_ID = APP_CONFIG.USER_ID;
const queryClient = useQueryClient();
const { data: products } = useProductControllerFindAll();

const { mutate: deleteProduct, data: removeResponse } =
  useProductControllerRemove();

const handleDeleteProduct = (productId: number) => {
  deleteProduct({
    id: productId,
  });
};

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

const handleRemoveFromCart = (productId: number) => {
  if (!props.cartData) throw new Error('Cart does not exist');

  const itemId = props.cartData.items.find(
    (item) => item.productId === productId,
  );

  if (!itemId)
    throw new Error(
      `Cart item with product with id ${productId} does not exist`,
    );

  removeFromCart({
    itemId: itemId.id,
    params: {
      cartId: props.cartData.id,
    },
  });
};

const handleUpdateCartQuantity = (productId: number, quantity: number) => {
  if (!props.cartData) throw new Error('Cart does not exist');

  const itemId = props.cartData.items.find(
    (item) => item.productId === productId,
  );

  if (!itemId)
    throw new Error(
      `Cart item with product with id ${productId} does not exist`,
    );

  updateCartQuantity({
    data: {
      itemId: itemId.id,
      cartId: props.cartData.id,
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

watch(removeResponse, () => {
  invalidateProductFindAll();
});

watch(
  [removeFromCartResponse, updateCartQuantityResponse, addToCardResponse],
  () => {
    invalidateCart();
  },
);
</script>

<template>
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

          <template v-if="props.cartData">
            <Button
              v-if="
                !props.cartData.items.find((i) => i.productId === product.id)
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
                props.cartData.items.find((i) => i.productId === product.id)
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
</template>
