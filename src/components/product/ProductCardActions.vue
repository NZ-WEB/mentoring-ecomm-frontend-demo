<script setup lang="ts">
import { watch } from 'vue';
import type { CartData } from '@/domain/models';
import { getCartControllerGetCartQueryKey } from '@/api/cart/cart.ts';
import { Button } from '@/components/ui/button';
import type { Ref } from 'vue';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

import { useCartControllerRemoveFromCart } from '@/api/cart/cart.ts';

import { APP_CONFIG } from '@/config';
import { useQueryClient } from '@tanstack/vue-query';
import { useCartControllerGetCart } from '@/api/cart/cart.ts';
import {
  useUpdateCartQuantityAdapter,
  useAddProductToCartAdapter,
} from '@/infrostruct/service';

const queryClient = useQueryClient();
const USER_ID = APP_CONFIG.USER_ID;

const { data: cartData } = useCartControllerGetCart({
  userId: USER_ID,
}) as { data: Ref<CartData> };

defineProps<{
  productId: number;
}>();

const { add: addToCard } = useAddProductToCartAdapter();
const { mutate: removeFromCart, data: removeFromCartResponse } =
  useCartControllerRemoveFromCart();
const { update: updateCartQuantity } = useUpdateCartQuantityAdapter();

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
  if (!cartData) throw new Error('Cart does not exist');

  const itemId = cartData.value.items?.find(
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
  if (!cartData) throw new Error('Cart does not exist');

  const itemId = cartData.value.items?.find(
    (item) => item.productId === productId,
  );

  if (!itemId)
    throw new Error(
      `Cart item with product with id ${productId} does not exist`,
    );

  updateCartQuantity({
    itemId: itemId.id,
    cartId: cartData.value.id,
    quantity: quantity,
  });
};

function invalidateCart() {
  queryClient.invalidateQueries<CartData>({
    queryKey: getCartControllerGetCartQueryKey({ userId: USER_ID }),
  });
}

watch([removeFromCartResponse], () => {
  invalidateCart();
});
</script>
<template>
  <Button
    v-if="!cartData.items?.find((i) => i.productId === productId)?.quantity"
    class="mb-0 mt-auto"
    @click="handleAddToCart(productId)"
  >
    Добавить в корзину
  </Button>
  <NumberField
    v-else
    :model-value="
      cartData.items?.find((i) => i.productId === productId)?.quantity || 1
    "
    :min="0"
    @update:model-value="handleUpdateCount(productId, $event)"
  >
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
