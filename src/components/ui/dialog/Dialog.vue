<script setup lang="ts">
import { watch, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useCreateProductWithProviders } from '@/infrostruct/service';
import { Gap } from '@/components/ui/Gap';
import { Textarea } from '@/components/ui/textarea';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import {
  DialogRoot,
  type DialogRootEmits,
  type DialogRootProps,
  useForwardPropsEmits,
} from 'reka-ui';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const isCreateModalOpen = ref(false);
const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(2000),
    price: z.number().positive(),
    imageUrl: z.string(),
    stock: z.number(),
    category: z.string(),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((data) => {
  createProduct({
    data,
  });
});

const { create: createProduct, response: createProductResponse } =
  useCreateProductWithProviders();

watch(createProductResponse, () => {
  isCreateModalOpen.value = false;
});
</script>

<template>
  <DialogRoot data-slot="dialog" v-bind="forwarded">
    <DialogTrigger as-child>
      <Button variant="outline"> Добавить товар </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление товара</DialogTitle>
        <DialogDescription>
          Введите данные для добавления товара и сохраните результат
        </DialogDescription>
      </DialogHeader>
      <form class="max-h-[70vh] overflow-scroll" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="name"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Название товара</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <FormField
          v-slot="{ componentField }"
          name="description"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Описание товара</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <FormField
          v-slot="{ componentField }"
          name="price"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Цена</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <FormField
          v-slot="{ componentField }"
          name="imageUrl"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Изображение</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <FormField
          v-slot="{ componentField }"
          name="stock"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Осталось товаров</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <FormField
          v-slot="{ componentField }"
          name="category"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>Категория</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Gap size="sm" />

        <DialogFooter>
          <Button class="w-full" type="submit"> Добавить </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </DialogRoot>
</template>
