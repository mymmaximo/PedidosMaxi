<template>
    <div class="cuerpo">
        <!-- Cerrar Sesion -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaLogout"
                @click.self="CerrarPopUp01"
                class="fondo
                ">
                    <div class="popup">
                        <h1>
                        ¿Desear Cerrar Sesion?
                        </h1>
                        <div
                        class="botones">
                            <button 
                            @click="CerrarSesion()"
                            class="botonc">
                            Si Confirmo
                            </button>
                            <button @click="CerrarPopUp01()"
                            class="botoncon">
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
                class="fondo">
                    <div class="popup">
                        <h1>
                        Tu sesión ha expirado
                        </h1>
                        <div
                        class="botones">
                            <button 
                            @click="SesionExpirada = false"
                            class="botoncon">
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
                <div v-if="MostrarError" class="fixed top-4 right-4 bg-yellow-600 text-black px-6 py-3 rounded-xl shadow-lg z-[100] font-bold">
                    ¡Acceso Denegado!, revisa tus privilegios
                </div>
            </transition>
        </Teleport>
        <!-- Noticacion Carro Vacio -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="VolverCarro" class="fixed top-4 right-4 bg-red-600 text-black px-6 py-3 rounded-xl shadow-lg z-[100] font-bold">
                    ¡Carrito Vacio!
                </div>
            </transition>
        </Teleport>
        <!-- Confirmacion Borrar Carrito -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="BorrarCarrito"
                @click.self="CerrarPopUp02"
                class="fondo">
                    <div
                    class="popup">
                        <h1>
                        ¿Desear Vaciar tu Carrito?
                        </h1>
                        <div
                        class="botones">
                            <button 
                            @click="LimpiarCompra() ; CerrarPopUp02()"
                            class="botonc">
                            Si Confirmo
                            </button>
                            <button 
                            @click="CerrarPopUp02()"
                            class="botoncon">
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>   
        <div 
        v-if="Iniciado">
            <div class="sticky top-0
            w-full m-0 p-0 justify-between z-30
            bg-green-600 hidden sm:flex"
            >
                <div class="flex min-h-10 !bg-green-600">
                    <div
                    @click="router.push('/')" 
                    v-if="Rol !== 3 && Rol !== 6"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                    class="botonpestaña">
                    Inicios
                    </div>
                    <div 
                    @click="router.push('/productos')" 
                    v-if="Rol !== 3 && Rol !== 6"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                    class="botonpestaña"
                    >
                    Productos
                    </div>
                    <div 
                    @click="router.push('/pedidos')" 
                    v-if="Rol === 1|| Rol === 3 || Rol === 6"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                    class="botonpestaña"
                    >
                    Pedidos
                    </div>
                    <div
                    @click="router.push('/clientes')" 
                    v-if="Rol === 1 || Rol === 3"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                    class="botonpestaña"
                    >
                    Clientes
                    </div>
                    <div 
                    @click="router.push('/usuarios')" 
                    v-if="Rol === 1"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                    class="botonpestaña"
                    >
                    Usuarios
                    </div>
                    <div 
                    @click="router.push('/historial_precios')" 
                    v-if="Rol === 1 || Rol === 4"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                    class="botonpestaña"
                    >
                    Historial de Precios
                    </div>
                </div>
                <div class="flex min-h-10">
                    <div
                    @click="AbrirPopUp02()" 
                    v-if="CarritoLocal.length > 0 && Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                    class="botont !rounded-none !px-5"
                    >
                    🗑️
                    </div>
                    <div
                    v-if="CarritoLocal.length > 0 && Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                    @click="router.push('/carrito')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                    class="botonpestaña"
                    >
                    Tu Carrito
                    </div>
                    <div 
                    v-else
                    class="
                    botonpestaña
                    group relative"
                    >
                        Tu Carrito
                        <h2
                        class="
                        hidden group-hover:flex
                        absolute top-full 
                        sm:right-0 md:right-0 lg:right-0 xl:left-4 2xl:left-4
                        p-4 whitespace-nowrap
                        bg-red-200
                        border-red-700 border-4 rounded-sm"
                        >
                        ¡Está Vacio!
                        </h2>
                    </div>
                    <div
                    class="
                    botonpestaña
                    group relative z-50"
                    >
                    Mi Perfil
                        <div 
                        class="
                        hidden group-hover:block 
                        absolute top-full 
                        sm:right-0 md:right-0 lg:right-0 xl:left-4 2xl:left-4
                        bg-green-800
                        text-white
                        border-green-700 border-4 rounded-sm
                        ">
                            <h3
                            @click="router.push('/mis_pedidos')"
                            v-if="Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                            class="botonpestaña !p-2 !truncate">
                            Mis Pedidos
                            </h3>
                            <h3
                            @click="router.push('/configuracion')" 
                            v-if="Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                            class="botonpestaña !p-2 !truncate">
                            Configuracion
                            </h3>
                            <h3
                            @click="AbrirPopUp01()"
                            class="botonc !rounded-none !p-2 !truncate">
                            Cerrar Sesion
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagina">
                <div class="ticky top-0 z-30 flex w-full flex-col bg-green-600 sm:hidden shadow-md">
                    <div class="bar">
                        <h1
                        @click="MostrarMenu = !MostrarMenu"
                        class="botonfil"
                        >
                        ⫶☰
                        </h1>
                    </div>
                    <transition name="fade">
                        <div 
                        v-if="MostrarMenu" 
                        @click="MostrarMenu = false"
                        class="fondo !z-40 cursor-pointer"
                        >
                        </div>
                    </transition>
                    <transition name="slide-left">
                        <div v-if="MostrarMenu"
                        class="fixed top-0 left-0 h-screen w-[75%] max-w-sm bg-green-800 z-50 shadow-2xl flex flex-col text-white overflow-y-auto"
                        >
                            <div
                            class="
                            flex flex-col
                            ">
                                <h1 v-if="!MostrarMenu"
                                @click="MostrarMenu = !MostrarMenu"
                                class="botonpestaña !py-4 !text-left"
                                >
                                ⫶☰
                                </h1>
                                <h1
                                @click="MostrarMenu = !MostrarMenu"
                                class="botonpestaña !py-4 !text-left bg-green-900 border-b border-green-700"
                                >
                                ⫶☰ Cerrar Menu
                                </h1>
                                <div
                                @click="router.push('/') ; MostrarMenu = false" 
                                v-if="Rol !== 3 && Rol !== 6"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                                class="botonpestaña !py-4 !text-left">
                                🏠︎ Inicio
                                </div>
                                <div 
                                @click="router.push('/productos') ; MostrarMenu = false" 
                                v-if="Rol !== 3 && Rol !== 6"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                📦 Productos
                                </div>
                                <div 
                                    @click="router.push('/pedidos') ; MostrarMenu = false" 
                                    v-if="Rol === 1|| Rol === 3 || Rol === 6"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🚛 Pedidos
                                </div>
                                <div
                                @click="router.push('/clientes') ; MostrarMenu = false" 
                                v-if="Rol === 1 || Rol === 3"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👥 Clientes
                                </div>
                                <div 
                                @click="router.push('/usuarios') ; MostrarMenu = false" 
                                v-if="Rol === 1"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                👨🏻‍💼 Usuarios
                                </div>
                                <div 
                                @click="router.push('/historial_precios') ; MostrarMenu = false" 
                                v-if="Rol === 1 || Rol === 4"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                💲 Historial de Precios
                                </div>
                                <div
                                v-if="CarritoLocal.length > 0 && Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                                @click="router.push('/carrito') ; MostrarMenu = false"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                🛒 Tu Carrito
                                </div>
                                <div
                                @click="AbrirPopUp02()" 
                                v-if="CarritoLocal.length > 0 && Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                                class="botonpestaña !from-red-400/80 !to-red-500/80 !py-4 !text-left"
                                >
                                🗑️ Vaciar Carrito
                                </div>
                                <div
                                @click="router.push('/mis_pedidos') ; MostrarMenu = false"
                                v-if="Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/mis_pedidos'}"
                                class="botonpestaña !py-4 !text-left">
                                👤 Mis Pedidos
                                </div>
                                <div
                                @click="router.push('/configuracion') ; MostrarMenu = false" 
                                v-if="Rol !== 2 && Rol !== 3 && Rol !== 4 && Rol !== 5 && Rol !== 6"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/configuracion'}"
                                class="botonpestaña !py-4 !text-left">
                                ⚙️ Configuracion
                                </div>
                                <div
                                @click="AbrirPopUp01()"
                                class="botonpestaña !from-red-600/80 !to-red-800/80 !py-4 !text-left">
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
        <div v-else>
            <Login @LoginExitoso="ProcesarLogin"/>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { ref } from 'vue'
    import Login from './components/Login.vue'
    import { useRouter, useRoute } from 'vue-router'
    import { CarritoLocal, LimpiarCompra, Iniciado, CerrarSesion, Rol, MostrarError, VolverCarro, SesionExpirada } from './components/Estatus.js'
    // ----- Variables Complejas ----- //
    const route = useRoute()
    const router = useRouter()
    // ----- Variables Booleanas ----- //
    const MostrarMenu = ref (false)
    const BorrarCarrito = ref(false)
    const ActualizarCajaLogout = ref(false)
    // ----- Variables Vacias ----- //
    const TablaActual = ref("")
    // ----- Funciones Vue ----- //
    const ProcesarLogin = () => {
        Iniciado.value = true
        if (Rol.value === 3 || Rol.value === 6) {
            router.push('/pedidos')
        } else {
            router.push('/')
        }
    }
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