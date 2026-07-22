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
import { ValidadSesionBack, Rol, Iniciado, MostrarError, CarritoLocal, ValidadCarrito, VolverCarro } from './components/Estatus.js'

const routes = [
    { 
        path: '/', 
        name: 'inicio', 
        component: Inicio 
    },
    { 
        path: '/productos', 
        name: 'productos', 
        component: Productos 
    },
    { 
        path: '/pedidos', 
        name: 'pedidos', 
        component: Pedidos, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 3, 6]
        }
    },
    { 
        path: '/clientes', 
        name: 'clientes', 
        component: Clientes, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 7]
        }
    },
    { 
        path: '/usuarios', 
        name: 'usuarios', 
        component: Usuarios, 
        meta: {
            requireAuth: true,
            rolesPer: [1]
        }
    },
    { 
        path: '/carrito', 
        name: 'carrito', 
        component: Carrito,
        meta: {
            requireCarrito: true
        }
    },
    { 
        path: '/configuracion',
        name: 'configuracion', 
        component: Configuracion 
    },
    { 
        path: '/mis_pedidos', 
        name: 'mis_pedidos', 
        component: Mis_pedidos 
    },
    { 
        path: '/historial_precios', 
        name: 'historial_precios', 
        component: Historial_precios, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 2, 4]
        }
    },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth) {
        await ValidadSesionBack()
        if (!Iniciado.value) {
            MostrarError.value = true
            setTimeout(() => { MostrarError.value = false }, 3000)
            return next('/')
        }
        if (to.meta.rolesPer && !to.meta.rolesPer.includes(Rol.value)) {
            MostrarError.value = true
            setTimeout(() => { MostrarError.value = false }, 3000)
            return next('/')
        }
    }
    if (to.meta.requireCarrito) {
        let carrito_valido = false
        if (CarritoLocal.value.length > 0 && ValidadCarrito(CarritoLocal.value)) {
            carrito_valido = true
        } else {
            try {
                const CarritoGuardado = JSON.parse(localStorage.getItem('carrito_pendiente')) || []
                if (CarritoGuardado.length > 0 && ValidadCarrito(CarritoGuardado)) {
                    carrito_valido = true
                }
            } catch (error) {
                carrito_valido = false
            }
        }
        if (!carrito_valido) {
            VolverCarro.value = true
            setTimeout(() => { VolverCarro.value = false }, 3000)
            return next('/')
        }
    }
    next()
})

export default router