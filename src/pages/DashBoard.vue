<template>
  <HeaderTopAdmin />

  <div class="container--card-dashboard">
    <p v-if="themeStores.loading" class="message warning">
      Chargement des thèmes...
    </p>
    <p v-if="themeStores.error" class="message error">
      {{ themeStores.error }}
    </p>

    <CardDashboard
      v-for="theme in themeStores.allThemes"
      :key="theme.id"
      :nomcard="theme.nom"
      :contexte="theme.description"
      :remixiconne="theme.icone"
      @click="themeStores.openTheme(theme.nomroute)"
      v-else
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import CardDashboard from "../components/CardDashboard.vue";
import HeaderTopAdmin from "../components/HeaderTopAdmin.vue";
import { themestore } from "../stores/themesStore";

const themeStores = themestore();

onMounted(() => {
  themeStores.fetchThemes();
});
</script>
