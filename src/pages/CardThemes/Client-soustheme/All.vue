<template>
  <div>
    <div v-if="clients.autorization === 'loading'">Chargement...</div>
    <div v-else-if="clients.autorization">
      <div class="message error">
        {{ clients.autorization }}
      </div>
    </div>
    <div class="card--container" v-else>
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
  </div>
</template>


<script setup>
import { onMounted } from "vue";
import { client } from "../../../stores/clientStore";

const clients = client();

onMounted(async () => {
  await clients.hassCheck();
  if (!clients.autorization) {
    clients.getAllClients();
  }
});
</script>
