<script setup lang="ts">
const gapClass = {
  xs: 'pt-2',
  sm: 'pt-4',
  md: 'pt-8',
  lg: 'pt-12',
  xl: 'pt-24',
};
type GapSize = keyof typeof gapClass;

defineProps<{
  size: GapSize;
}>();
</script>

<template>
  <div :class="gapClass[size]"></div>
</template>
