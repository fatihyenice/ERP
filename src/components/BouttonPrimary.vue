<template>
  <button type="button" class="btn">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>