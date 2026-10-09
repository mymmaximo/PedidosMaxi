<template>
    <div class="cuerpo">

        <!-- Notificación -->
        <!-- Rol invalido -->
        <Teleport to="body">
            <transition name="slide">
                <div v-if="MostrarError" 
                class="notificacion !bg-yellow-600"
                >
                    <span class="text-xl drop-shadow-sm">
                    ⛔
                    </span>
                    <span>
                    ¡Acceso Denegado!
                    </span>
                </div>
            </transition>
        </Teleport>

        <!-- Notificación -->
        <!-- Carro Vacio -->
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

        <!-- Confirmacion -->
        <!-- Cerrar Sesion -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaLogout"
                @click.self="CerrarPopUp01"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                            ¿Desear Cerrar Sesion?
                        </h1>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="CerrarSesion() ; CerrarPopUp01()"
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

        <!-- Confirmacion -->
        <!-- Sesion Expirada -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="SesionExpirada" 
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                            Tu sesión ha expirado
                        </h1>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="SesionExpirada = false; document.body.style.overflow = 'auto'; router.push('/login')"
                            class="botoncon"
                            >
                                Iniciar Sesion
                            </button>
                        </div>

                    </div>
                </div>
            </transition>
        </Teleport>

        <!-- Confirmacion -->
        <!-- Borrar Carrito -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="BorrarCarrito"
                @click.self="CerrarPopUp02"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                        ¿Desear Vaciar tu Carrito?
                        </h1>

                        <!-- Botones -->
                        <div class="botones">
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

            <!-- Version de Computadora -->
            <div class="sticky top-0
            w-full m-0 p-0 justify-between z-30
            bg-green-600 hidden sm:flex"
            >
                <div class="flex min-h-10 !bg-green-600">

                    <!-- Pagina de Inicio -->
                    <div @click="router.push('/')" 
                    v-if="VerificarRolExcluido([3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                    class="botonpestaña"
                    >
                        Inicio
                    </div>

                    <!-- Productos -->
                    <div @click="router.push('/productos')" 
                    v-if="VerificarRolExcluido([3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                    class="botonpestaña"
                    >
                        Productos
                    </div>

                    <!-- Pedidos -->
                    <div @click="router.push('/pedidos')" 
                    v-if="VerificarRol([1, 3, 6])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                    class="botonpestaña"
                    >
                        Pedidos
                    </div>

                    <!-- Clientes -->
                    <div @click="router.push('/clientes')" 
                    v-if="VerificarRol([1, 3])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                    class="botonpestaña"
                    >
                        Clientes
                    </div>

                    <!-- Usuarios -->
                    <div @click="router.push('/usuarios')" 
                    v-if="VerificarRol([1])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                    class="botonpestaña"
                    >
                        Usuarios
                    </div>

                    <!-- Registros de Precios -->
                    <div @click="router.push('/registro_precios')" 
                    v-if="VerificarRol([1, 4])"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/registro_precios'}"
                    class="botonpestaña"
                    >
                        Registro de Precios
                    </div>
                </div>
                <div class="flex min-h-10">

                    <!-- Vaciar Carrito -->
                    <div @click="AbrirPopUp02()" 
                    v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                    class="botonc !rounded-none !px-2"
                    >
                        🗑️
                    </div>

                    <!-- Carrito -->
                    <div v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                    @click="router.push('/carrito')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                    class="botonpestaña flex flex-row items-center justify-center gap-2"
                    >
                        Tu Carrito 
                        <span class="flex 
                        items-center justify-center 
                        w-6 h-6 bg-green-500 
                        rounded-full shadow-md
                        text-white text-xs font-bold"
                        >
                            {{ CarritoLocal.length }}
                        </span>
                    </div>

                    <!-- Carrito Vacio -->
                    <div v-else
                    class="botonpestaña 
                    group cursor-default 
                    transition-all duration-300 
                    hover:!from-red-100 hover:!to-red-300 
                    hover:!text-white hover:shadow-inner"
                    >
                        <span class="block group-hover:hidden">
                            Tu Carrito
                        </span>
                        <span class="hidden group-hover:block text-black tracking-wide">
                            ¡Está Vacío!
                        </span>
                    </div>

                    <!-- Centro de Ayuda -->
                    <div @click="router.push('/centro_de_ayuda')"
                    :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/centro_de_ayuda'}"
                    class="botonpestaña"
                    >
                        Centro de Ayuda
                    </div>

                    <!-- Desplegable Mi Perfil/Iniciar Sesion -->
                    <div class="group relative z-50">

                        <!-- Iniciar Sesion -->
                        <h3 @click="router.push('/login')"
                        v-if="!Iniciado"
                        :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/login'}"
                        class="botonpestaña"
                        >
                            Iniciar Sesion
                        </h3>

                        <!-- Mi Perfil -->
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

                            <!-- Mis Pedidos -->
                            <h3 @click="router.push('/mis_pedidos')"
                            v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                            class="botonpestaña !p-2 !truncate"
                            >
                                Mis Pedidos
                            </h3>

                            <!-- Mis Favoritos -->
                            <h3 @click="router.push('/favoritos')"
                            v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                            class="botonpestaña !p-2 !truncate"
                            >
                                Mis Favoritos
                            </h3>

                            <!-- Configuracion -->
                            <h3 @click="router.push('/configuracion')" 
                            v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                            class="botonpestaña !p-2 !truncate"
                            >
                                Configuracion
                            </h3>

                            <!-- Cerrar Sesion -->
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

            <!-- Version de Celular -->
            <div class="pagina !gap-0">
                <div class="flex flex-col sticky 
                w-full top-0 z-30 
                bg-green-600 sm:hidden shadow-md"
                >

                    <!-- Abrir Menu -->
                    <div class="p-3 w-full">
                        <h1 @click="MostrarMenu = !MostrarMenu ; document.body.style.overflow = 'hidden'"
                        class="botonfil !mb-0 !py-2"
                        >
                            ⫶☰ Menú
                        </h1>
                    </div>

                    <!-- Mostrar Fondo que Cierra Menu -->
                    <transition name="fade">
                        <div @click="MostrarMenu = false"
                        v-if="MostrarMenu" 
                        class="fondo !z-40 cursor-pointer"
                        >
                        </div>
                    </transition>

                    <!-- Menu Desplegado -->
                    <transition name="slide-left">
                        <div v-if="MostrarMenu"
                        class="flex flex-col  overflow-y-auto
                        fixed top-0 left-0 
                        h-screen w-[75%] max-w-sm 
                        bg-green-800 z-50 shadow-2xl text-white"
                        >
                            <div class="flex flex-col">

                                <!-- Abrir Menu -->
                                <h1 @click="MostrarMenu = !MostrarMenu"
                                v-if="!MostrarMenu"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    ⫶☰
                                </h1>

                                <!-- Cerrar Menu -->
                                <h1 @click="MostrarMenu = !MostrarMenu"
                                class="botonpestaña 
                                !py-4 !text-left 
                                bg-green-900 border-b border-green-700"
                                >
                                    ⫶☰ Cerrar Menu
                                </h1>

                                <!-- Pagina de Inicio -->
                                <div @click="router.push('/') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    🏠︎ Inicio
                                </div>

                                <!-- Productos -->
                                <div @click="router.push('/productos') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/productos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    📦 Productos
                                </div>

                                <!-- Pedidos -->
                                <div @click="router.push('/pedidos') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 3, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    🚛 Pedidos
                                </div>

                                <!-- Clientes -->
                                <div @click="router.push('/clientes') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 3])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/clientes'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    👥 Clientes
                                </div>

                                <!-- Usuarios -->
                                <div @click="router.push('/usuarios') ; MostrarMenu = false" 
                                v-if="VerificarRol([1])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/usuarios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    👨🏻‍💼 Usuarios
                                </div>

                                <!-- Registros de Precios -->
                                <div @click="router.push('/registro_precios') ; MostrarMenu = false" 
                                v-if="VerificarRol([1, 4])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/registro_precios'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    💲 Registro de Precios
                                </div>

                                <!-- Carrito -->
                                <div @click="router.push('/carrito') ; MostrarMenu = false"
                                v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/carrito'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    🛒 Tu Carrito
                                </div>

                                <!-- Vaciar Carrito -->
                                <div @click="AbrirPopUp02()" 
                                v-if="CarritoLocal.length > 0 && VerificarRolExcluido([2, 3, 4, 5, 6])"
                                class="botonpestaña !from-red-400/80 !to-red-500/80 !py-4 !text-left"
                                >
                                    🗑️ Vaciar Carrito
                                </div>

                                <!-- Iniciar Sesion -->
                                <div @click="router.push('/login') ; MostrarMenu = false"
                                v-if="!Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/login'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    👤 Iniciar Sesion
                                </div>

                                <!-- Centro de Ayuda -->
                                <div @click="router.push('/centro_de_ayuda') ; MostrarMenu = false"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/centro_de_ayuda'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    🗣️ Centro de Ayuda
                                </div>

                                <!-- Mis Pedidos -->
                                <div @click="router.push('/mis_pedidos') ; MostrarMenu = false"
                                v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/mis_pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    👤 Mis Pedidos
                                </div>

                                <!-- Mis Favoritos -->
                                <div @click="router.push('/favoritos') ; MostrarMenu = false"
                                v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/mis_pedidos'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    🤍 Mis Favoritos
                                </div>

                                <!-- Configuracion -->
                                <div @click="router.push('/configuracion') ; MostrarMenu = false" 
                                v-if="VerificarRolExcluido([2, 3, 4, 5, 6]) && Iniciado"
                                :class="{'!from-green-100 !to-green-300 !text-black shadow-inner': route.path === '/configuracion'}"
                                class="botonpestaña !py-4 !text-left"
                                >
                                    ⚙️ Configuracion
                                </div>

                                <!-- Cerrar Sesion -->
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
                <div class="flex-col w-full flex-1">
                    <router-view>
                    </router-view>
                </div>

                <!-- Pie de Pagina -->
                <footer class="relative 
                bg-green-900 text-green-100 
                py-10 w-full z-10"
                >
                    <div class="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="flex flex-col gap-3">
                            <h2 class="text-white">
                            Maxi-Store
                            </h2>
                            <p class="text-sm text-green-200">
                            Testing eslogan aca siu.
                            </p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h3 class="text-lg font-bold text-white mb-2">
                            Soporte y Legal
                            </h3>
                            <span @click="router.push('/centro_de_ayuda')"
                            class="cursor-pointer  transition-colors
                            hover:text-white text-sm"
                            >
                            Centro de Ayuda
                            </span>
                            <span class="cursor-pointer transition-colors 
                            hover:text-white text-sm"
                            >
                            Términos y Condiciones
                            </span>
                            <span class="cursor-pointer transition-colors 
                            hover:text-white text-sm"
                            >
                            Política de Privacidad
                            </span>
                            <span class="cursor-pointer transition-colors 
                            hover:text-white text-sm"
                            >
                            Botón de Arrepentimiento
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h3 class="text-lg font-bold text-white mb-2">
                            Medios de Pago
                            </h3>
                            <div class="flex flex-row gap-3 text-3xl select-none">
                            💳 🏦 💵 
                            </div>
                            <p class="text-sm text-green-200 mt-1">
                            Pagos seguros encriptados y procesados mediante Paddle.
                            </p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h3 class="text-lg font-bold text-white mb-2">
                            Contacto
                            </h3>
                            <span class="text-sm hover:text-white transition-colors cursor-pointer">
                            📧 soporte@maxi-store.com
                            </span>
                            <span class="text-sm">
                            📍 Córdoba, Argentina
                            </span>
                        </div>
                    </div>
                </footer>

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
    
    // ----- Funciones Frontend ----- //
	
    // Abrir Pop up para Cerrar Sesion //
    const AbrirPopUp01 = () => {
		ActualizarCajaLogout.value = true
		document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Vaciar Carrito //
	const AbrirPopUp02 = () => {
		BorrarCarrito.value = true
		document.body.style.overflow = "hidden"
	}
    // Cerrar Pop up para Cerrar Sesion //
	const CerrarPopUp01 = () => {
		ActualizarCajaLogout.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Vaciar Carrito //
	const CerrarPopUp02 = () => {
		BorrarCarrito.value = false
		document.body.style.overflow = "auto"
	}

</script>