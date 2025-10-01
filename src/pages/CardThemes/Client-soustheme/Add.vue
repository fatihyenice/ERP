<template>
  <div class="inscription--container">
    <h1>Ajouter un client</h1>
    <div class="inscription-box">
      <form action="#" method="post">
        <!-- Nom -->
        <label for="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          placeholder="Entrez le nom du client"
          required
        />

        <!-- Prénom -->
        <label for="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Entrez le prénom du client"
          required
        />

        <!-- Email -->
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="exemple@email.com"
          required
        />

        <!-- Téléphone -->
        <label for="telephone">Téléphone</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          placeholder="Entrez le numéro de téléphone"
        />

        <!-- Adresse -->
        <label for="adresse">Adresse</label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          placeholder="Entrez l'adresse complète"
        />

        <!-- Ville -->
        <label for="ville">Ville</label>
        <input
          type="text"
          id="ville"
          name="ville"
          placeholder="Ville du client"
        />

        <!-- Pays -->
        <label for="pays">Pays</label>
        <input type="text" id="pays" name="pays" placeholder="Pays du client" />

        <!-- Bouton -->
        <button type="submit" class="btn-submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>