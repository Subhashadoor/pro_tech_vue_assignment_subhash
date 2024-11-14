// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import MyCart from '../views/MyCart.vue'

// Define route records
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/MyCart',
    name: 'MyCart',
    component: MyCart
  },
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
