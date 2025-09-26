<template>
  <nav class="header-latteral">
    <router-link v-for="trie in filter" :key="trie.nom" :to="trie.path"
      >{{ trie.nom }} <i class="ri-arrow-right-circle-line"></i
    ></router-link>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { routes } from "../routes/routes";

const filter = computed(() => routes.filter((p) => p.connected && p.admin));
</script>