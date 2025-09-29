import Home from "../pages/Home.vue" 
import Connexion from "../pages/Connexion.vue" 
import DashBoard from "../pages/DashBoard.vue"
import Client from "../pages/CardThemes/Client.vue"  

 export const routes = [
  { path: '/', component: Home, nom: "Accueil", connected: false }, 
  { path: '/connexion', component: Connexion, nom: "Connexion", connected: false }, 
  { path: '/dashboard', component: DashBoard, connected: true }, 

  // Clients admin
  { path: "/client", nom: "Gestion des clients", component: Client, connected: true, admin: true  }
]