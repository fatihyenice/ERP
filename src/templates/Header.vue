<template>
  <div class="header">
    <div class="header--content">
      <div class="header--logo">
        <span>ERP</span> Tous vos process, en un seul endroit
      </div>
      <nav>
        <LinkHeader texte="Accueil" url="/" />
        <LinkHeader
          texte="Connexion"
          v-if="!isLoading && logginStores.isAuthed == false"
          url="/connexion"
        />

        <LinkHeader
          texte="Dashboard"
          v-if="!isLoading && logginStores.isAuthed == true"
          url="/dashboard"
        />

        <LinkHeader
          texte="Déconnexion"
          @click="logginStores.logout"
          v-if="!isLoading && logginStores.isAuthed == true"
        />
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LinkHeader from "../components/LinkHeader.vue";
import { logginStore } from "../stores/connexionStore";

const logginStores = logginStore();
const isLoading = ref(true);

onMounted(async () => {
  await logginStores.isAuthedTry();
  isLoading.value = false;
});
</script>