<template>
  <div class="header">
    <div class="header--content">
      <div class="header--logo">
        <span>ERP</span> Tous vos process, en un seul endroit
      </div>
      <nav>
        <LinkHeader
          v-for="route in routesNotConnected"
          :key="route.path"
          :texte="route.nom"
          :url="route.path"
        />
      </nav>
    </div>
  </div>
</template>

<script setup>
import LinkHeader from "../components/LinkHeader.vue";
import { routes } from "../routes/routes";

const routesNotConnected = routes.filter((p) => !p.connected);
</script>