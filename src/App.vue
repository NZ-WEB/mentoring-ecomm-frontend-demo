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
import { ShoppingCart } from 'lucide-vue-next';
import { ProductCreateDialog } from '@/components/ui/dialog';
import { Toaster } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { ProductList } from '@/components/product';
import { APP_CONFIG } from '@/config';
import { useCartControllerGetCart } from '@/api/cart/cart.ts';

const USER_ID = APP_CONFIG.USER_ID;
const { data: cartData } = useCartControllerGetCart({ userId: USER_ID });
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
</template>
