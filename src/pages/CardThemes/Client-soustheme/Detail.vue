<template>
  <div class="contenue--dashboard">
    <div class="hero--container-detail" v-if="clientStore.loading">
      <h1>Chargement...</h1>
    </div>
    <div class="hero--container-detail" v-if="clientStore.introuvable">
      <h1>Le client est introuvable</h1>
    </div>
    <div class="hero--container-detail" v-else>
      <h1>
        {{ clientStore.DetailClient.nom }} {{ clientStore.DetailClient.prenom }}
      </h1>
    </div>

    <!-- Informations Client -->
    <div
      class="card--container"
      v-if="clientStore.DetailClient && !clientStore.introuvable"
    >
      <!-- Informations personnelles -->
      <div class="card">
        <div class="card--title">
          <h2>Informations personnelles</h2>
        </div>
        <p><strong>Nom :</strong> {{ clientStore.DetailClient.nom }}</p>
        <p>
          <strong>Prénom :</strong>
          {{ clientStore.DetailClient.prenom }}
        </p>
        <p><strong>Email :</strong> {{ clientStore.DetailClient.email }}</p>
        <p><strong>Téléphone :</strong> {{ clientStore.DetailClient.tel }}</p>
        <p>
          <strong>Date de naissance :</strong>
          {{
            new Date(clientStore.DetailClient.datenaissance).toLocaleDateString(
              "fr-FR"
            )
          }}
        </p>
      </div>

      <!-- Adresse -->
      <div class="card">
        <div class="card--title">
          <h2>Adresse</h2>
        </div>
        <p>
          <strong>Rue :</strong>
          {{ clientStore.DetailClient.rue || "Non renseigne" }}
        </p>
        <p>
          <strong>Code postal :</strong>
          {{ clientStore.DetailClient.codepostal }}
        </p>
        <p><strong>Pays :</strong> {{ clientStore.DetailClient.pays }}</p>
      </div>

      <div class="card">
        <div class="card--title">
          <h2>Historique des commandes</h2>
        </div>
        <ul>
          <li v-for="order in clientData?.orders || []" :key="order.id">
            {{ order.date }} - {{ order.product }} - {{ order.amount }} €
          </li>
        </ul>
        <p v-if="!clientData?.orders?.length">
          Aucune commande pour le moment.
        </p>
      </div>

      <!-- Notes / Informations complémentaires -->
      <div class="card">
        <div class="card--title">
          <h2>Notes</h2>
        </div>
        <p>{{ clientData?.notes || "Aucune note disponible." }}</p>
      </div>
    </div>

    <div v-else-if="clientStore.autorization">
      <div class="message error">
        {{ clientStore.autorization }}
      </div>
    </div>

    <div v-else>
      <div class="message error">Le client est introuvable</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { client } from "../../../stores/clientStore";
import { useRoute } from "vue-router";

const clientStore = client();
const route = useRoute();

onMounted(async () => {
  clientStore.getDetailClient(route.params.id);
});
</script>
