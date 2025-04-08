<script setup lang="ts">
import { watch } from 'vue';
import type { CartResponseDto, ProductResponseDto } from '@/api/model';
import { getCartControllerGetCartQueryKey } from '@/api/cart/cart.ts';
import { Button } from '@/components/ui/button';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

import {
  useCartControllerAddToCart,
  useCartControllerRemoveFromCart,
  useCartControllerUpdateCartItem,
} from '@/api/cart/cart.ts';

import { APP_CONFIG } from '@/config';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();
const USER_ID = APP_CONFIG.USER_ID;
const props = defineProps<{
  cartData: CartResponseDto;
  product: ProductResponseDto;
}>();

const { mutate: addToCard, data: addToCardResponse } =
  useCartControllerAddToCart();

const { mutate: removeFromCart, data: removeFromCartResponse } =
  useCartControllerRemoveFromCart();
const { mutate: updateCartQuantity, data: updateCartQuantityResponse } =
  useCartControllerUpdateCartItem();

const handleAddToCart = (productId: number) => {
  addToCard({
    data: {
      userId: USER_ID,
      productId,
      quantity: 1,
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

function invalidateCart() {
  queryClient.invalidateQueries<CartResponseDto>({
    queryKey: getCartControllerGetCartQueryKey({ userId: USER_ID }),
  });
}

watch(
  [removeFromCartResponse, updateCartQuantityResponse, addToCardResponse],
  () => {
    invalidateCart();
  },
);
</script>
<template>
  <Button
    v-if="
      !props.cartData.items.find((i) => i.productId === product.id)?.quantity
    "
    class="mb-0 mt-auto"
    @click="handleAddToCart(product.id)"
  >
    Добавить в корзину
  </Button>
  <NumberField
    v-else
    :model-value="
      props.cartData.items.find((i) => i.productId === product.id)?.quantity ||
      1
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
