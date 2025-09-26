<template>
  <div class="card">
    <div class="card--title">
      <h2>{{ title }}</h2>
    </div>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
});
</script>