<template>
    <div class="cuerpo">
        <!-- Cerrar Sesion -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaLogout"
                @click.self="CerrarPopUp01"
                class="fondo"
                >
                    <div class="popup">
                        <h1>
                        ¿Desear Cerrar Sesion?
                        </h1>
                        <div class="botones">
                            <button @click="CerrarSesion() ; CerrarPopUp01"
                            class="botonc"
                            >
                            Si Confirmo
                            </button>
                            <button @click="CerrarPopUp01()"
                            class="botoncon"
                            >
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Notificacion Sesion Expirada -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="SesionExpirada" 
                class="fondo"
                >
                    <div class="popup">
                        <h1>
                        Tu sesión ha expirado
                        </h1>
                        <div class="botones">
                            <button @click="SesionExpirada = false; router.push('/login')"
                            class="botoncon"
                            >
                            Iniciar Sesion
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Notificacion de rol invalido -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="MostrarError" 
                class="fixed top-4 right-4 
                bg-yellow-600 text-black 
                px-6 py-3 rounded-xl shadow-lg 
                z-[100] font-bold"
                >
                ¡Acceso Denegado!, revisa tus privilegios
                </div>
            </transition>
        </Teleport>
        <!-- Noticacion Carro Vacio -->
        <template>
            <Teleport to="body">
                <transition name="fade">
                    <div v-if="VolverCarro" 
                    class="fixed top-4 right-4
                    bg-red-600 text-black 
                    px-6 py-3 rounded-xl shadow-lg
                    z-[100] font-bold"
                    >
                    ¡Carrito Vacio!
                    </div>
                </transition>
            </Teleport>
        </template>
        <!-- Confirmacion Borrar Carrito -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="BorrarCarrito"
                @click.self="CerrarPopUp02"
                class="fondo"
                >
                    <div class="popup">
                        <h1>
                        ¿Desear Vaciar tu Carrito?
                        </h1>
                        <div
                        class="botones"
                        >
                            <button @click="LimpiarCompra() ; CerrarPopUp02() ; router.push('/')"
                            class="botonc"
                            >
                            Si Confirmo
                            </button>
                            <button @click="CerrarPopUp02()"
                            class="botoncon"
                            >
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>   
        <div>
            <div class="sticky top-0
            w-full m-0 p-0 justify-between z-30
            bg-green-600 hidden sm:flex"
            >
                <div class="flex min-h-10 !bg-green-600">
                    <div @click="router.push('/')" 
                    v-if="VerificarRolExcluido([3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                    class="botonpestaña"
                    >
                    Inicio
                    </div>
                    <div @click="router.push('/productos')" 
                    v-if="VerificarRolExcluido([3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                    class="botonpestaña"
                    >
                    Productos
                    </div>
                    <div @click="router.push('/pedidos')" 
                    v-if="VerificarRol([1, 3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                    class="botonpestaña"
                    >
                    Pedidos
                    </div>
                    <div @click="router.push('/clientes')" 
                    v-if="VerificarRol([1, 3])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                    class="botonpestaña"
                    >
                    Clientes
                    </div>
                    <div @click="router.push('/usuarios')" 
                    v-if="VerificarRol([1])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                    class="botonpestaña"
                    >
                    Usuarios
                    </div>
                    <div @click="router.push('/historial_precios')" 
                    v-if="VerificarRol([1, 4])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                    class="botonpestaña"
                    >
                    Historial de Precios
                    </div>
                </div>
                <div class="flex min-h-10">
                    <div @click="AbrirPopUp02()" 
                    v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                    class="botonc !rounded-none !px-2"
                    >
                    🗑️
                    </div>
                    <div v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                    @click="router.push('/carrito')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                    class="botonpestaña"
                    >
                    Tu Carrito 
                    <span class="bg-green-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                    {{ CarritoLocal.length }}
                    </span>
                    </div>
                    <div v-else
                    class="botonpestaña group cursor-default 
                    transition-all duration-300 
                    hover:!from-red-100 hover:!to-red-300 hover:!text-white hover:shadow-inner"
                    >
                        <span class="block group-hover:hidden">
                        Tu Carrito
                        </span>
                        <span class="hidden group-hover:block text-black tracking-wide">
                        ¡Está Vacío!
                        </span>
                    </div>
                    <div @click="router.push('/centro_de_ayuda')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/centro_de_ayuda'}"
                    class="botonpestaña"
                    >
                    Centro de Ayuda
                    </div>
                    <div class="group relative z-50">
                        <h3 @click="router.push('/login')"
                        v-if="!Iniciado"
                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/login'}"
                        class="botonpestaña"
                        >
                        Iniciar Sesion
                        </h3>
                        <h3 @click="!Rol || Rol.length === 0 ? router.push('/mis_pedidos') : null"
                        v-if="Iniciado"
                        class="botonpestaña"
                        >
                        Mi Perfil
                        </h3>
                        <div v-if="Iniciado"
                        class="hidden group-hover:block 
                        absolute top-full 
                        sm:right-0 md:right-0 lg:right-0
                        bg-green-800 text-white border-green-700 border-4 rounded-sm"
                        >
                            <h3 @click="router.push('/mis_pedidos')"
                            v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                            class="botonpestaña !p-2 !truncate"
                            >
                            Mis Pedidos
                            </h3>
                            <h3 @click="router.push('/configuracion')" 
                            v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                            class="botonpestaña !p-2 !truncate"
                            >
                            Configuracion
                            </h3>
                            <h3 @click="AbrirPopUp01()"
                            v-if="Iniciado"
                            class="botonc !rounded-none !p-2 !truncate"
                            >
                            Cerrar Sesion
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagina">
                <div class="flex flex-col sticky 
                w-full top-0 z-30 
                bg-green-600 sm:hidden shadow-md"
                >
                    <div class="bar">
                        <h1 @click="MostrarMenu = !MostrarMenu"
                        class="botonfil"
                        >
                        ⫶☰
                        </h1>
                    </div>
                    <transition name="fade">
                        <div @click="MostrarMenu = false"
                        v-if="MostrarMenu" 
                        class="fondo !z-40 cursor-pointer"
                        >
                        </div>
                    </transition>
                    <transition name="slide-left">
                        <div v-if="MostrarMenu"
                        class="flex flex-col  overflow-y-auto
                        fixed top-0 left-0 
                        h-screen w-[75%] max-w-sm 
                        bg-green-800 z-50 shadow-2xl text-white"
                        >
                            <div class="flex flex-col">
                                <h1 @click="MostrarMenu = !MostrarMenu"
                                v-if="!MostrarMenu"
                                class="botonpestaña !py-4 !text-left"
                                >
                                ⫶☰
                                </h1>
                                <h1 @click="MostrarMenu = !MostrarMenu"
                                class="botonpestaña 
                                !py-4 !text-left 
                                bg-green-900 border-b border-green-700"
                                >
                                ⫶☰ Cerrar Menu
                                </h1>
                                <div @click="router.push('/') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🏠︎ Inicio
                                </div>
                                <div @click="router.push('/productos') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                📦 Productos
                                </div>
                                <div @click="router.push('/pedidos') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🚛 Pedidos
                                </div>
                                <div @click="router.push('/clientes') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 3])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👥 Clientes
                                </div>
                                <div @click="router.push('/usuarios') ; MostrarMenu = false" 
                                v-if="VerificarRol([1])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👨🏻‍💼 Usuarios
                                </div>
                                <div @click="router.push('/historial_precios') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 4])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                💲 Historial de Precios
                                </div>
                                <div @click="router.push('/carrito') ; MostrarMenu = false"
                                v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🛒 Tu Carrito
                                </div>
                                <div @click="AbrirPopUp02()" 
                                v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                                class="botonpestaña !from-red-400/80 !to-red-500/80 !py-4 !text-left"
                                >
                                🗑️ Vaciar Carrito
                                </div>
                                <div @click="router.push('/login') ; MostrarMenu = false"
                                v-if="!Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/login'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👤 Iniciar Sesion
                                </div>
                                <div @click="router.push('/centro_de_ayuda') ; MostrarMenu = false"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/centro_de_ayuda'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🗣️ Centro de Ayuda
                                </div>
                                <div @click="router.push('/mis_pedidos') ; MostrarMenu = false"
                                v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/mis_pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👤 Mis Pedidos
                                </div>
                                <div @click="router.push('/configuracion') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/configuracion'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                ⚙️ Configuracion
                                </div>
                                <div @click="AbrirPopUp01()"
                                v-if="Iniciado"
                                class="botonpestaña 
                                !from-red-600/80 !to-red-800/80 
                                !py-4 !text-left"
                                >
                                ➜] Cerrar Sesion
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="flex-col w-full">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { 
        ref 
    } from 'vue'
    import { 
        useRouter, 
        useRoute 
    } from 'vue-router'
    import { 
        CarritoLocal, 
        LimpiarCompra, 
        Iniciado, 
        CerrarSesion, 
        Rol, 
        MostrarError, 
        VolverCarro, 
        SesionExpirada,
        VerificarRol,
        VerificarRolExcluido
    } from './components/Estatus.js'
    // ----- Variables Complejas ----- //
    const route = useRoute()
    const router = useRouter()
    // ----- Variables Booleanas ----- //
    const MostrarMenu = ref (false)
    const BorrarCarrito = ref(false)
    const ActualizarCajaLogout = ref(false)
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaLogout.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		BorrarCarrito.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp01 = () => {
		ActualizarCajaLogout.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		BorrarCarrito.value = false
		document.body.style.overflow = "auto"
	}
</script>