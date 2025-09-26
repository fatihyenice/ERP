<template>
  <header class="header--top-admin">
    <h2>FatihSolution</h2>
    <form method="POST">
      <input
        type="text"
        @input="themestores.searchThemes()"
        v-model="themestores.inputSearch"
        placeholder="Rechercher ici..."
      />
    </form>

    <div class="action">
      <div @click="openNotif()"><i class="ri-notification-3-line"></i></div>
      <div><i class="ri-logout-box-r-line"></i></div>
    </div>

    <div class="header--admin-notification">
      <div class="notification">ddd <i class="ri-notification-2-fill"></i></div>
      <div class="notification">ddd <i class="ri-notification-2-fill"></i></div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { themestore } from "../stores/themesStore";

const themestores = themestore();
</script>