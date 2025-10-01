<template>
  <HeaderTopAdmin />
  <div class="container--dashboard" v-if="logginStores.isAuthed">
    <HeaderLatteralClient v-if="logginStores.isAuthed" />

    <div class="contenue--dashboard">
      <router-view></router-view>
    </div>
  </div>

  <div v-else>
    <div class="message error">
      <router-link to="/connexion">
        Vous n’êtes pas connectés. Cliquez ici pour vous connecter.
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import HeaderLatteralClient from "../../components/HeaderLatteralClient.vue";
import HeaderTopAdmin from "../../components/HeaderTopAdmin.vue";
import { logginStore } from "../../stores/connexionStore";

const logginStores = logginStore();

onMounted(async () => {
  await logginStores.isAuthedTry();
});
</script>