<template>
  <header class="header--top-admin">
    <h2 @click="returnDashBoard()">FatihSolution</h2>
    <input
      type="text"
      @input="themestores.searchThemes()"
      v-model="themestores.inputSearch"
      placeholder="Rechercher ici..."
    />

    <div class="action" v-if="logginStores.isAuthed">
      <router-link to="/dashboard">
        <div><i class="ri-layout-grid-2-fill"></i></div>
      </router-link>
      <div>
        <i class="ri-logout-box-r-line" @click="logginStores.logout"></i>
      </div>
    </div>

    <div class="header--admin-notification">
      <div class="notification">ddd <i class="ri-notification-2-fill"></i></div>
      <div class="notification">ddd <i class="ri-notification-2-fill"></i></div>
    </div>
  </header>
</template>

<script setup>
import { themestore } from "../stores/themesStore";
import { logginStore } from "../stores/connexionStore";
import { useRouter } from "vue-router";

const themestores = themestore();
const logginStores = logginStore();
const router = useRouter();

const returnDashBoard = () => {
  router.push("/dashboard");
};
</script>