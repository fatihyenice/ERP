<template>
  <div
    class="inscription--container"
    id="teste"
    v-if="!clientStore.autorization"
  >
    <h1>Ajouter un client</h1>
    <div class="adduser-box">
      <div v-if="clientStore.alertError" ref="alertError">
        <div class="message error">
          {{ clientStore.alertError }}
        </div>
      </div>

      <div v-if="clientStore.alertSuccess">
        <div class="message success">
          {{ clientStore.alertSuccess }}
        </div>
      </div>

      <form action="#" method="POST">
        <div class="paire-form">
          <div class="paire-inside">
            <label for="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              v-model="clientStore.nom"
              placeholder="Entrez le nom du client"
              required
              minlength="2"
              maxlength="50"
            />
          </div>

          <div class="paire-inside">
            <label for="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              v-model="clientStore.prenom"
              placeholder="Entrez le prénom du client"
              required
              minlength="2"
              maxlength="50"
            />
          </div>
        </div>

        <div class="paire-form">
          <div class="paire-inside">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="clientStore.email"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div class="paire-inside">
            <label for="telephone">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              v-model="clientStore.telephone"
              placeholder="06 12 34 56 78"
              pattern="^(\+33|0)[1-9](\d{2}){4}$"
              maxlength="14"
            />
          </div>
        </div>

        <div class="paire-form">
          <div class="paire-inside">
            <label for="naissance">Date de naissance</label>
            <input
              type="date"
              id="naissance"
              name="naissance"
              v-model="clientStore.naissance"
              max="2007-12-31"
              required
            />
          </div>

          <div class="paire-inside">
            <label for="adresse">Adresse (Rue)</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              v-model="clientStore.adresse"
              placeholder="Entrez l'adresse complète"
              minlength="5"
              maxlength="100"
            />
          </div>
        </div>

        <div class="paire-form">
          <div class="paire-inside">
            <label for="codepostal">Code postal</label>
            <input
              type="text"
              id="codepostal"
              name="codepostal"
              v-model="clientStore.codepostal"
              placeholder="Code postal du client"
              pattern="^\d{5}$"
              maxlength="5"
              required
            />
          </div>

          <div class="paire-inside">
            <label for="pays">Pays</label>
            <input
              type="text"
              id="pays"
              name="pays"
              v-model="clientStore.pays"
              placeholder="Pays du client"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          @click="clientStore.addClientBtn"
          class="btn-submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>

  <div v-else>
    <div class="message error">
      {{ clientStore.autorization }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { client } from "../../../stores/clientStore";

const clientStore = client();

onMounted(() => {
  clientStore.hassCheck();
});
</script>
