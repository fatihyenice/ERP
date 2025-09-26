<template>
  <div class="actions">{{ tache }}</div>
</template>

<script setup>
defineProps({
  tache: String,
});
</script>