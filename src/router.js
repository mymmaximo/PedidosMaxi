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
import Centro_de_ayuda from './components/Centro_de_ayuda.vue'
import Login from './components/Login.vue'
import { 
    ValidadSesionBack, 
    Rol, 
    Iniciado, 
    MostrarError, 
    CarritoLocal, 
    ValidadCarrito, 
    VolverCarro 
} from './components/Estatus.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requireAuth: false,
            title: 'Iniciar Sesión'
        }
    },
    { 
        path: '/', 
        name: 'inicio', 
        component: Inicio,
        meta: {
            requireAuth: false,
            title: 'Inicio'
        }
    },
    { 
        path: '/productos', 
        name: 'productos', 
        component: Productos,
        meta: {
            requireAuth: false,
            title: 'Productos'
        }
    },
    { 
        path: '/pedidos', 
        name: 'pedidos', 
        component: Pedidos, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 3, 6],
            title: 'Pedidos'
        }
    },
    { 
        path: '/clientes', 
        name: 'clientes', 
        component: Clientes, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 7],
            title: 'Clientes'
        }
    },
    { 
        path: '/usuarios', 
        name: 'usuarios', 
        component: Usuarios, 
        meta: {
            requireAuth: true,
            rolesPer: [1],
            title: 'Usuarios'
        }
    },
    { 
        path: '/carrito', 
        name: 'carrito', 
        component: Carrito,
        meta: {
            requireCarrito: true,
            title: 'Carrito'
        }
    },
    { 
        path: '/configuracion',
        name: 'configuracion', 
        component: Configuracion,
        meta: {
            requireAuth: true,
            title: 'Configuracion'
        }
    },
    { 
        path: '/mis_pedidos', 
        name: 'mis_pedidos', 
        component: Mis_pedidos,
        meta: {
            requireAuth: true,
            title: 'Mis Pedidos'
        }
    },
    { 
        path: '/historial_precios', 
        name: 'historial_precios', 
        component: Historial_precios, 
        meta: {
            requireAuth: true,
            rolesPer: [1, 2, 4],
            title: 'Historial de precios'
        }
    },
    { 
        path: '/centro_de_ayuda', 
        name: 'centro_de_ayuda', 
        component: Centro_de_ayuda, 
        meta: {
            requireAuth: false,
            title: 'Centro de Ayuda'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth'}
        }
    }
})

let PrimeraCarga = true

router.beforeEach(async (to, from, next) => {
    const tituloBase = 'Maxi-Store'
    document.title = to.meta.title ? `${to.meta.title} - ${tituloBase}` : tituloBase
    if (PrimeraCarga) {
        await ValidadSesionBack()
        PrimeraCarga = false
    }
    if (to.meta.requireAuth) {
        if (!Iniciado.value) {
            MostrarError.value = true
            setTimeout(() => { MostrarError.value = false }, 3000)
            return next('/')
        }
        if (to.meta.rolesPer) {
            const Acceso = Rol.value && Rol.value.some(rol => to.meta.rolesPer.includes(rol))
            if (!Acceso) {
                MostrarError.value = true
                setTimeout(() => { MostrarError.value = false }, 3000)
                if (from.matched.length > 0) {
                    return next(false)
                } else {
                    return next('/')
                }
            }
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
            if (from.matched.length > 0) {
                return next(false)
            } else {
                return next('/')
            }
        }
    }
    next()
})

export default router