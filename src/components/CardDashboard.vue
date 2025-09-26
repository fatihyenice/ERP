<template>
  <div class="card--dashboard">
    <span><i :class="remixiconne"></i></span>
    <h3>{{ nomcard }}</h3>
    <p>{{ contexte }}</p>
  </div>
</template>

<script setup>
defineProps({
  nomcard: String,
  contexte: String,
  remixiconne: String,
});
</script>