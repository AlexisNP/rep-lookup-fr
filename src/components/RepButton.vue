<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  href?: string;
  target?: string;
  rel?: string;
  style?:
    | "btn-red"
    | "btn-twitter"
    | "btn-facebook"
    | "btn-instagram"
    | "btn-linkedin";
}>();

const elementTag = computed(() => (props.href ? "a" : "button"));
</script>

<template>
  <component
    :is="elementTag"
    v-bind="props"
    class="w-full md:w-max py-[10px] px-4 flex md:inline-flex text-white justify-center items-center gap-2 rounded-md font-semibold tracking-wide outline-2 outline-offset-4 focus-visible:outline transition-colors"
    :class="props.style"
  >
    <slot />
  </component>
</template>
