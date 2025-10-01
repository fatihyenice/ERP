import Home from "../pages/Home.vue" 
import Connexion from "../pages/Connexion.vue" 
import DashBoard from "../pages/DashBoard.vue"
import Client from "../pages/CardThemes/Client.vue"
import Add from "../pages/CardThemes/Client-soustheme/Add.vue"
import Del from "../pages/CardThemes/Client-soustheme/Del.vue"
import All from "../pages/CardThemes/Client-soustheme/All.vue"
import Detail from "../pages/CardThemes/Client-soustheme/Detail.vue"

 export const routes = [
  { path: '/', component: Home, nom: "Accueil" }, 
  { path: '/connexion', component: Connexion }, 
  { path: '/dashboard', component: DashBoard}, 

  // Clients admin
  { path: "/client", nom: "Gestion des clients", component: Client, children: [
      { path: 'add', component: Add },
      { path: 'all', component: All },
      { path: 'del', component: Del },
      { path: 'detail/:id(\\d+)', component: Detail }
    ]}, 
]