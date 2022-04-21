import { createRouter, createWebHistory } from "vue-router";
import NoPageFound from "@/shared/pages/NoPageFound";

import daybookRouter from '../modules/daybook/router'
import authRouter from '../modules/auth/router'
import isAuthGuard from '@/modules/auth/router/auth-guard'

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/mapa",
    name: "mapa",
    component: () =>
      import(/* webpackChunkName: "About" */ "@/views/MapaView.vue"),
  },
  {
    path: "/contacto",
    name: "contacto",
    component: () =>
      import(/* webpackChunkNa "Contacto" */ "@/views/ContactoView.vue"),
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: "/daybook",
    beforeEnter: [ isAuthGuard ],
    name: "Blog",
    ...daybookRouter
  },
  {
    path: "/:pathMatch(.*)*",
    component: NoPageFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;