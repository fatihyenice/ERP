<template>
  <div v-if="clients.autorisations">
    <div class="card--container" v-if="clients.allClients?.length">
      <div
        class="card"
        v-for="client in clients.allClients"
        @click="clients.detailClient(client.id)"
        :key="client.id"
      >
        <div class="card--title">
          <h2>{{ client.nom }} {{ client.prenom }}</h2>
        </div>
        <p><strong>Email:</strong> {{ client.email }}</p>
        <p><strong>Téléphone:</strong> {{ client.tel }}</p>
        <p><strong>Entreprise:</strong> Dupont SARL</p>
      </div>
    </div>
    <div v-else>
      <div class="message">Aucun client trouvé.</div>
    </div>
  </div>

  <div v-else>
    <div class="message error">
      {{
        clients.alert ||
        "Vous n'avez pas l'autorisation d'accéder à la gestion des clients !"
      }}
    </div>
  </div>
</template>


<script setup>
import { onMounted } from "vue";
import { client } from "../../../stores/clientStore";

const clients = client();

onMounted(() => {
  clients.getAllClients();
});
</script>
