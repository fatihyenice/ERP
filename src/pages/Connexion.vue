<template>
  <Header />
  <div class="inscription--container">
    <h1>Connexion</h1>

    <div class="hero--container-button">
      <router-link to="/inscription">
        <BouttonPrimary text="Me créer un compte" id="btn-mg" />
      </router-link>
    </div>
  </div>

  <div class="inscription-box" ref="inscription">
    <form method="POST">
      <label> Votre adresse mail: </label>
      <input
        type="text"
        v-model="nom"
        :class="{ success: nom }"
        placeholder="Yenice"
      />
      <label> Votre mot de passe </label>
      <input
        type="password"
        v-model="mdp"
        :class="{ success: mdp }"
        placeholder="*********"
      />

      <input type="submit" class="btn-submit" :disabled="!allFullField" />
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Header from "../templates/Header.vue";

const inscription = ref(null);

onMounted(() => {
  if (inscription.value) {
    inscription.value.classList.add("animate__animated", "animate__fadeInDown");
  }
});

const nom = ref("");
const mdp = ref("");

const allFullField = computed(() => {
  return nom.value && mdp.value;
});
</script>