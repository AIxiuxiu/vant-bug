<template>
  <svg
    class="svg-icon"
    :title="title"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color
    }"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
/**
 * svg组件
 */
defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: Number,
    default: 32
  },
  color: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: currentColor;
}
</style>
