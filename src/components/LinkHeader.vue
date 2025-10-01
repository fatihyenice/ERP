<template>
  <router-link :to="url || '#'">{{ texte }}</router-link>
</template>

<script setup>
defineProps({
  texte: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
});
</script>