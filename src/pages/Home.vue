<template>
  <Header />
  <div class="hero--container">
    <h1>
      Gérez vos marchandises, clients et factures depuis une seule plateforme.
    </h1>

    <div class="hero--container-button">
      <router-link to="/dashboard">
        <BouttonPrimary text="Me connecter" id="btn-mg" />
      </router-link>
    </div>
  </div>

  <div class="card--container">
    <CardAccueil
      title="Suivi intelligent des stocks"
      text="Gardez un œil sur vos inventaires en temps réel et évitez les ruptures ou les surstocks."
    />
    <CardAccueil
      title="Finances maîtrisées"
      text="Automatisez vos factures, suivez vos dépenses et gagnez du temps sur la gestion comptable."
    />
    <CardAccueil
      title="Décisions basées sur les données"
      text="Accédez à des rapports clairs et personnalisés pour piloter votre entreprise efficacement."
    />
  </div>
</template> 

<script setup>
import Header from "../templates/Header.vue";
import BouttonPrimary from "../components/BouttonPrimary.vue";
import CardAccueil from "../components/CardAccueil.vue";
</script>