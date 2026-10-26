import { createRouter, createWebHistory } from 'vue-router'
import Inicio from './components/Inicio.vue'
import Productos from './components/Productos.vue'
import Pedidos from './components/Pedidos.vue'
import Clientes from './components/Clientes.vue'
import Usuarios from './components/Usuarios.vue'
import Carrito from './components/Carrito.vue'
import Configuracion from './components/Configuracion.vue'
import Mis_pedidos from './components/Mis_pedidos.vue'
import Favoritos from './components/Favoritos.vue'
import Registro_precios from './components/Registro_precios.vue'
import Centro_de_ayuda from './components/Centro_de_ayuda.vue'
import Login from './components/Login.vue'
import { 
    Validad_Sesion_Backend, 
    Rol, 
    Iniciado, 
    Mostrar_Error, 
    Carrito_Local, 
    Validad_Carrito, 
    Volver_Carro 
} from './components/Estatus.js'

// Redireccion a Url/Link //
const routes = 
    [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requireAuth: false,
            title: 'Iniciar Sesión'
    }}, { 
        path: '/', 
        name: 'inicio', 
        component: Inicio,
        meta: {
            requireAuth: false,
            title: 'Inicio'
    }}, { 
        path: '/productos', 
        name: 'productos', 
        component: Productos,
        meta: {
            requireAuth: false,
            title: 'Productos'
    }}, {
        path: '/pedidos', 
        name: 'pedidos', 
        component: Pedidos, 
        meta: {
            requireAuth: true,
            Roles_Permitidos: [1, 3, 6],
            title: 'Pedidos'
    }}, { 
        path: '/clientes', 
        name: 'clientes', 
        component: Clientes, 
        meta: {
            requireAuth: true,
            Roles_Permitidos: [1, 7],
            title: 'Clientes'
    }}, { 
        path: '/usuarios', 
        name: 'usuarios', 
        component: Usuarios, 
        meta: {
            requireAuth: true,
            Roles_Permitidos: [1],
            title: 'Usuarios'
    }}, { 
        path: '/carrito', 
        name: 'carrito', 
        component: Carrito,
        meta: {
            requireCarrito: true,
            title: 'Carrito'
    }}, { 
        path: '/configuracion',
        name: 'configuracion', 
        component: Configuracion,
        meta: {
            requireAuth: true,
            title: 'Configuracion'
    }}, { 
        path: '/mis_pedidos', 
        name: 'mis_pedidos', 
        component: Mis_pedidos,
        meta: {
            requireAuth: true,
            title: 'Mis Pedidos'
    }}, { 
        path: '/favoritos', 
        name: 'favoritos', 
        component: Favoritos,
        meta: {
            requireAuth: true,
            title: 'Mis Favoritos'
    }}, { 
        path: '/registro_precios', 
        name: 'registro_precios', 
        component: Registro_precios, 
        meta: {
            requireAuth: true,
            Roles_Permitidos: [1, 2, 4],
            title: 'Registro de precios'
    }}, { 
        path: '/centro_de_ayuda', 
        name: 'centro_de_ayuda', 
        component: Centro_de_ayuda, 
        meta: {
            requireAuth: false,
            title: 'Centro de Ayuda'
}}]

// Subir al Principio de la Pantalla //
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { 
                top: 0, 
                behavior: 'smooth'
}}}})

let PrimeraCarga = true

// Verificar de Sesion, Rol, Carrito y Titulo de Pagina //
router.beforeEach(async (to, from, next) => {
    // Titulo de Pagina
    const Mostrar_Titulo = 'Maxi-Store'
    document.title = to.meta.title ? `${to.meta.title} - ${Mostrar_Titulo}` : Mostrar_Titulo
    next()
    if (PrimeraCarga) {
        await Validad_Sesion_Backend()
        PrimeraCarga = false
    }
    // Verificar Sesion y Rol
    if (to.meta.requireAuth) {
        if (!Iniciado.value) {
            if (!Sesion_Expirada.value) {
                Mostrar_Error.value = true
                setTimeout(() => { Mostrar_Error.value = false }, 3000)
            }
            return next('/')
        }
        if (to.meta.Roles_Permitidos) {
            const Acceso = Rol.value && Rol.value.some(rol => to.meta.Roles_Permitidos.includes(rol))
            if (!Acceso) {
                Mostrar_Error.value = true
                setTimeout(() => { Mostrar_Error.value = false }, 3000)
                if (from.matched.length > 0) {
                    return next(false)
                } else {
                    return next('/')
    }}}}
    // Verificar Validez del Carrito
    if (to.meta.requireCarrito) {
        let Carrito_Valido = false
        if (Carrito_Local.value.length > 0 && Validad_Carrito(Carrito_Local.value)) {
            Carrito_Valido = true
        } else {
            try {
                const Carrito_Guardado = JSON.parse(localStorage.getItem('carrito_pendiente')) || []
                if (Carrito_Guardado.length > 0 && Validad_Carrito(Carrito_Guardado)) {
                    Carrito_Valido = true
            }} catch (error) {
                Carrito_Valido = false
        }}
        if (!Carrito_Valido) {
            Volver_Carro.value = true
            setTimeout(() => { Volver_Carro.value = false }, 3000)
            if (from.matched.length > 0) {
                return next(false)
            } else {
                return next('/')
    }}}
    next()
})

export default router