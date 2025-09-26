<template>
  <img
    :src="srcOriginal"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :loading="loading"
    decoding="async"
    :class="className"
  />
</template>

<script setup lang="ts">
    import { computed } from "vue";

    interface Props {
        name: string;
        alt: string;
        sizes?: string;
        loading?: "lazy" | "eager";
        className?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px",
        loading: "lazy",
    });

    const widths = [480, 768, 1024, 1280, 1680, 1920];

    const base = import.meta.env.BASE_URL; // => '/ValentinEnkel/'

    const srcset = computed(() =>
        widths.map((w) => `${base}images/${props.name}-${w}.webp ${w}w`).join(", ")
    );

    const srcOriginal = computed(
        () => `${base}images/${props.name}-original.webp`
    );
</script>

