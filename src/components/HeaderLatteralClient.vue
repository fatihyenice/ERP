<template>
  <nav class="header-latteral">
    <div v-if="route.path.startsWith('/client')">
      <router-link to="/client/all">Tous les clients</router-link>
      <router-link to="/client/add">Ajouter un nouveau client</router-link>
      <router-link to="/client/del">Supprimer un client</router-link>
    </div>
  </nav>
</template> 

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>