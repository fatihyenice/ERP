<template>
  <Header />
  <div class="inscription--container" v-if="!logginStores.isAuthed">
    <h1>Connexion</h1>

    <div class="hero--container-button">
      <router-link to="/inscription">
        <BouttonPrimary text="Me créer un compte" id="btn-mg" />
      </router-link>
    </div>
  </div>

  <div class="inscription-box" ref="connexion" v-if="!logginStores.isAuthed">
    <div
      class="animate__animated animate__headShake message error"
      v-if="logginStores.errormsg"
    >
      {{ logginStores.errormsg }}
    </div>

    <form method="POST">
      <label> Votre adresse mail:</label>
      <input
        type="email"
        v-model="logginStores.email"
        :class="{ success: logginStores.email }"
        placeholder="azerty@exemple.com"
      />
      <label> Votre mot de passe </label>
      <input
        type="password"
        v-model="logginStores.mdp"
        :class="{ success: logginStore.mdp }"
        placeholder="*********"
      />

      <input
        type="submit"
        class="btn-submit"
        value="Me connecter"
        @click="logginStores.loggin"
        :disabled="!logginStores.allFullField"
      />
    </form>
  </div>

  <div v-else>
    <div class="message error">
      Vous êtes déjà connecté !
      <router-link to="/dashboard"
        >Cliquez ici pour retourner sur vos dashboard.</router-link
      >
    </div>
  </div>
</template>

<script setup>
import Header from "../templates/Header.vue";
import { logginStore } from "../stores/connexionStore";
import BouttonPrimary from "../components/BouttonPrimary.vue";
import { onMounted } from "vue";

const logginStores = logginStore();

onMounted(() => {
  logginStores.isAuthedTry();

  logginStores.email = "";
  logginStores.mdp = "";
  logginStores.errormsg = false;
});
</script>