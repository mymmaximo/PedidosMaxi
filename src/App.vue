<template>
    <div class="cuerpo">
        <Teleport to="body">
            <div 
            v-if="ActualizarCajaLogout"
            class="fondo
            ">
                <div class="popup">
                    <h1>
                    ¿Desear Cerrar Sesion?
                    </h1>
                    <div
                    class="botones">
                        <button 
                        @click="CerrarSesion() ; CerrarPopUp01() ; TablaActual = 'Productos'"
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
        </Teleport>   
        <Teleport to="body">
            <div 
            v-if="BorrarCarrito"
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
                    v-if="Rol !== '3' && Rol !== '6'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                    class="botonpestaña">
                        <h2 class="letra-Josefin">
                        Inicio
                        </h2>
                    </div>
                    <div 
                    @click="router.push('/productos')" 
                    v-if="Rol !== '3' && Rol !== '6'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Productos
                        </h2>
                    </div>
                    <div 
                        @click="router.push('/pedidos')" 
                        v-if="Rol === '1'|| Rol === '3' || Rol === '6'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Pedidos
                        </h2>
                    </div>
                    <div
                    @click="router.push('/clientes')" 
                    v-if="Rol === '1' || Rol === '3'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Clientes
                        </h2>
                    </div>
                    <div 
                    @click="router.push('/usuarios')" 
                    v-if="Rol === '1'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Usuarios
                        </h2>
                    </div>
                    <div 
                    @click="router.push('/historial_precios')" 
                    v-if="Rol === '1' || Rol === '4'"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Historial de Precios
                        </h2>
                    </div>
                </div>
                <div class="flex min-h-10">
                    <div
                    @click="AbrirPopUp02()" 
                    v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3'&& Rol !== '4'&& Rol !== '5'&& Rol !== '6'"
                    class="botont !rounded-none !px-5"
                    >
                        <h2>
                        🗑️
                        </h2>
                    </div>
                    <div
                    v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                    @click="router.push('/carrito')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                    class="botonpestaña"
                    >
                        <h2>
                        Tu Carrito
                        </h2>
                    </div>
                    <div 
                    v-else
                    class="
                    botonpestaña
                    group relative"
                    >
                        <h2>
                        Tu Carrito
                        </h2>
                        <h2
                        class="
                        hidden group-hover:flex
                        absolute top-full left-4
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
                        <h2>
                        Mi Perfil
                        </h2>
                        <div 
                        class="
                        hidden group-hover:block 
                        absolute top-full left-4
                        bg-green-800
                        text-white
                        border-green-700 border-4 rounded-sm
                        ">
                            <h3
                            @click="router.push('/mis_pedidos')"
                            v-if="Rol !== '2' && Rol !== '3'&& Rol !== '4' && Rol !== '5' && Rol !== '6'"
                            class="botonpestaña !p-2">
                            Mis Pedidos
                            </h3>
                            <h3
                            @click="router.push('/configuracion')" 
                            v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                            class="botonpestaña !p-2">
                            Configuracion
                            </h3>
                            <h3
                            @click="AbrirPopUp01()"
                            class="botonc !rounded-none !p-2">
                            Cerrar Sesion
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bar">
                <div class="flex flex-row bg-green-600 sm:hidden">
                    <div class="m-2 p-2 !z-40"
                    >
                        <h1
                        @click="MostrarMenu = !MostrarMenu"
                        class="sticky top-0 p-0 m-0 text-white"
                        >
                        ⫶☰
                        </h1>
                        <div class="fondo"
                        v-if="MostrarMenu">
                            <div
                            class="fixed top-0 left-0 h-screen w-fit bg-green-800 z-40 shadow-2xl flex flex-col text-white"
                            >
                                <div
                                class="
                                flex flex-col
                                
                                ">
                                    <h1
                                    @click="MostrarMenu = !MostrarMenu"
                                    class="!py-0 !px-1 m-3 max-w-min"
                                    >
                                    ⫶☰
                                    </h1>
                                    <div>
                                        <div
                                        @click="router.push('/') ; MostrarMenu = false" 
                                        v-if="Rol !== '3' && Rol !== '6'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                                        class="botonpestaña !py-0 !text-left">
                                            <h1>
                                            🏠︎ Inicio
                                            </h1>
                                        </div>
                                        <div 
                                        @click="router.push('/productos') ; MostrarMenu = false" 
                                        v-if="Rol !== '3' && Rol !== '6'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            📦 Productos
                                            </h1>
                                        </div>
                                        <div 
                                            @click="router.push('/pedidos') ; MostrarMenu = false" 
                                            v-if="Rol === '1'|| Rol === '3' || Rol === '6'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            🚛 Pedidos
                                            </h1>
                                        </div>
                                        <div
                                        @click="router.push('/clientes') ; MostrarMenu = false" 
                                        v-if="Rol === '1' || Rol === '3'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            👥 Clientes
                                            </h1>
                                        </div>
                                        <div 
                                        @click="router.push('/usuarios') ; MostrarMenu = false" 
                                        v-if="Rol === '1'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            👨🏻‍💼 Usuarios
                                            </h1>
                                        </div>
                                        <div 
                                        @click="router.push('/historial_precios') ; MostrarMenu = false" 
                                        v-if="Rol === '1' || Rol === '4'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/historial_precios'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            💲 Historial de Precios
                                            </h1>
                                        </div>
                                        <div
                                        v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                        @click="router.push('/carrito') ; MostrarMenu = false"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                                        class="botonpestaña !py-0 !text-left"
                                        >
                                            <h1>
                                            🛒 Tu Carrito
                                            </h1>
                                        </div>
                                        <div
                                        @click="AbrirPopUp02()" 
                                        v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3'&& Rol !== '4'&& Rol !== '5'&& Rol !== '6'"
                                        class="botonpestaña !from-red-400/80 !to-red-500/80 !py-0 !text-left"
                                        >
                                            <h1>
                                            🗑️ Vaciar Carrito
                                            </h1>
                                        </div>
                                        <div
                                        @click="router.push('/mis_pedidos') ; MostrarMenu = false"
                                        v-if="Rol !== '2' && Rol !== '3'&& Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/mis_pedidos'}"
                                        class="botonpestaña !py-0 !text-left">
                                            <h1>
                                            👤 Mis Pedidos
                                            </h1>
                                        </div>
                                        <div
                                        @click="router.push('/configuracion') ; MostrarMenu = false" 
                                        v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/configuracion'}"
                                        class="botonpestaña !py-0 !text-left">
                                            <h1>
                                            ⚙️ Configuracion
                                            </h1>
                                        </div>
                                        <div
                                        @click="AbrirPopUp01()"
                                        class="botonpestaña !from-red-600/80 !to-red-800/80 !py-0 !text-left">
                                            <h1>
                                            ➜] Cerrar Sesion
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-col w-full">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
        <div v-else>
            <Login @LoginExitoso="Iniciado = true"/>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { CarritoLocal, LimpiarCompra, Iniciado, CerrarSesion, Rol } from './components/Estatus.js'
    import Login from './components/Login.vue'
    // ----- Variables ----- //
    const route = useRoute()
    const router = useRouter()
    const TablaActual = ref("")
    const MostrarMenu = ref (false)
    const BorrarCarrito = ref(false)
    const ActualizarCajaLogout = ref(false)
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        if (route.path === '/') {
            if (Rol.value === '3' || Rol.value === '6') {
                router.push('/pedidos')
            } else {
                router.push('/')
            }
        }
    })
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaLogout.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp01 = () => {
		ActualizarCajaLogout.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp02 = () => {
		BorrarCarrito.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp02 = () => {
		BorrarCarrito.value = false
		document.body.style.overflow = "auto";
	}
</script>