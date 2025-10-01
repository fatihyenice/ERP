<template>
  <HeaderTopAdmin />

  <div
    class="container--card-dashboard"
    v-if="!Loading && logginStores.isAuthed"
  >
    <p v-if="themeStores.loading" class="message warning">
      Chargement des thèmes...
    </p>
    <p v-if="themeStores.error" class="message error">
      {{ themeStores.error }}
    </p>

    <CardDashboard
      v-for="theme in themeStores.allThemes"
      :key="theme.Id_themes"
      :nomcard="theme.nom"
      :contexte="theme.description"
      :remixiconne="theme.icone"
      @click="themeStores.openTheme(theme.nomroute)"
      v-else
    />
  </div>

  <div v-else>
    <div class="message error">
      Vous n'êtes pas autorisé à accéder à cette page, vous devez être connecté
      !
      <router-link to="/connexion"
        >Cliquez ici pour vous connectez.</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import CardDashboard from "../components/CardDashboard.vue";
import HeaderTopAdmin from "../components/HeaderTopAdmin.vue";
import { themestore } from "../stores/themesStore";
import { logginStore } from "../stores/connexionStore";

const logginStores = logginStore();
const themeStores = themestore();
const Loading = ref(true);

onMounted(async () => {
  await logginStores.isAuthedTry();
  themeStores.fetchThemes();

  Loading.value = false;
});
</script>
