<template>
  <header class="header--top-admin">
    <h2>FatihSolution</h2>
    <input
      type="text"
      @input="themestores.searchThemes()"
      v-model="themestores.inputSearch"
      placeholder="Rechercher ici..."
    />

    <div class="action" v-if="logginStores.isAuthed">
      <div @click="openNotif()"><i class="ri-notification-3-line"></i></div>
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

const themestores = themestore();
const logginStores = logginStore();
</script>