import { createRouter, createWebHistory } from 'vue-router'
import Inicio from './components/Inicio.vue'
import Productos from './components/Productos.vue'
import Pedidos from './components/Pedidos.vue'
import Clientes from './components/Clientes.vue'
import Usuarios from './components/Usuarios.vue'
import Carrito from './components/Carrito.vue'
import Configuracion from './components/Configuracion.vue'
import Mis_pedidos from './components/Mis_pedidos.vue'
import Historial_precios from './components/Historial_precios.vue'
const routes = [
  { path: '/', name: 'inicio', component: Inicio },
  { path: '/productos', name: 'productos', component: Productos },
  { path: '/pedidos', name: 'pedidos', component: Pedidos },
  { path: '/clientes', name: 'clientes', component: Clientes },
  { path: '/usuarios', name: 'usuarios', component: Usuarios },
  { path: '/carrito', name: 'carrito', component: Carrito },
  { path: '/configuracion', name: 'configuracion', component: Configuracion },
  { path: '/mis_pedidos', name: 'mis_pedidos', component: Mis_pedidos },
  { path: '/historial_precios', name: 'historial_precios', component: Historial_precios },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router