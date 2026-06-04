<template>
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
    v-if="Iniciado"
    class="cuerpo !pt-0 !bg-green-600">
        <div class="sticky top-0
        w-full m-0 p-0 justify-between z-40
        bg-green-600 hidden lg:flex 2xl:flex"
        >
            <div class="flex min-h-10">
                <div
                @click="TablaActual = 'Inicio'" 
                v-if="Rol !== '3' && Rol !== '6'"
                :class="{
                    '!bg-green-300 !text-black shadow-inner': TablaActual === 'Inicio'
                    }"
                class="botonpestaña">
                    <h2>
                    Inicio
                    </h2>
                </div>
                <div 
                @click="TablaActual = 'Productos'" 
                v-if="Rol !== '3' && Rol !== '6'"
                :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Productos'}"
                class="botonpestaña"
                >
                    <h2>
                    Productos
                    </h2>
                </div>
                <div 
                    @click="TablaActual = 'Pedidos'" 
                    v-if="Rol === '1'|| Rol === '3' || Rol === '6'"
                :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Pedidos'}"
                class="botonpestaña"
                >
                    <h2>
                    Pedidos
                    </h2>
                </div>
                <div
                @click="TablaActual = 'Clientes'" 
                v-if="Rol === '1' || Rol === '3'"
                :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Clientes'}"
                class="botonpestaña"
                >
                    <h2>
                    Clientes
                    </h2>
                </div>
                <div 
                @click="TablaActual = 'Usuarios'" 
                v-if="Rol === '1'"
                :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Usuarios'}"
                class="botonpestaña"
                >
                    <h2>
                    Usuarios
                    </h2>
                </div>
                <div 
                @click="TablaActual = 'Historial_precios'" 
                v-if="Rol === '1' || Rol === '4'"
                :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Historial_precios'}"
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
                @click="TablaActual = 'Carrito'"
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
                        @click="TablaActual = 'Mis_pedidos'"
                        v-if="Rol !== '2' && Rol !== '3'&& Rol !== '4' && Rol !== '5' && Rol !== '6'"
                        class="botonpestaña !p-2">
                        Mis Pedidos
                        </h3>
                        <h3
                        @click="TablaActual = 'Configuracion'" 
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
        <div class="flex">
            <div class="flex flex-row lg:hidden 2xl:hidden">
                <div class="m-2 p-0 !z-40"
                >
                    <h1
                    @click="MostrarMenu = !MostrarMenu"
                    class="sticky top-0 w-full bg-green-600 p-0 m-0 text-white"
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
                                    @click="TablaActual = 'Inicio' ; MostrarMenu = false" 
                                    v-if="Rol !== '3' && Rol !== '6'"
                                    :class="{
                                    '!bg-green-300 !text-black shadow-inner': TablaActual === 'Inicio'
                                    }"
                                    class="botonpestaña !py-0 !text-left">
                                        <h1>
                                        🏠︎ Inicio
                                        </h1>
                                    </div>
                                    <div 
                                    @click="TablaActual = 'Productos' ; MostrarMenu = false" 
                                    v-if="Rol !== '3' && Rol !== '6'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Productos'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        📦 Productos
                                        </h1>
                                    </div>
                                    <div 
                                        @click="TablaActual = 'Pedidos' ; MostrarMenu = false" 
                                        v-if="Rol === '1'|| Rol === '3' || Rol === '6'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Pedidos'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        🚛 Pedidos
                                        </h1>
                                    </div>
                                    <div
                                    @click="TablaActual = 'Clientes' ; MostrarMenu = false" 
                                    v-if="Rol === '1' || Rol === '3'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Clientes'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        👥 Clientes
                                        </h1>
                                    </div>
                                    <div 
                                    @click="TablaActual = 'Usuarios' ; MostrarMenu = false" 
                                    v-if="Rol === '1'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Usuarios'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        👨🏻‍💼 Usuarios
                                        </h1>
                                    </div>
                                    <div 
                                    @click="TablaActual = 'Historial_precios' ; MostrarMenu = false" 
                                    v-if="Rol === '1' || Rol === '4'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Historial_precios'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        💲 Historial de Precios
                                        </h1>
                                    </div>
                                    <div
                                    v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                    @click="TablaActual = 'Carrito' ; MostrarMenu = false"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Carrito'}"
                                    class="botonpestaña !py-0 !text-left"
                                    >
                                        <h1>
                                        🛒 Tu Carrito
                                        </h1>
                                    </div>
                                    <div
                                    @click="AbrirPopUp02()" 
                                    v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3'&& Rol !== '4'&& Rol !== '5'&& Rol !== '6'"
                                    class="botonpestaña !bg-red-700/50 !py-0 !text-left"
                                    >
                                        <h1>
                                        🗑️ Vaciar Carrito
                                        </h1>
                                    </div>
                                    <div
                                    @click="TablaActual = 'Mis_pedidos' ; MostrarMenu = false"
                                    v-if="Rol !== '2' && Rol !== '3'&& Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Mis_pedidos'}"
                                    class="botonpestaña !py-0 !text-left">
                                        <h1>
                                        👤 Mis Pedidos
                                        </h1>
                                    </div>
                                    <div
                                    @click="TablaActual = 'Configuracion' ; MostrarMenu = false" 
                                    v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                    :class="{'!bg-green-300 !text-black shadow-inner': TablaActual === 'Configuracion'}"
                                    class="botonpestaña !py-0 !text-left">
                                        <h1>
                                        ⚙️ Configuracion
                                        </h1>
                                    </div>
                                    <div
                                    @click="AbrirPopUp01()"
                                    class="botonpestaña !bg-red-700 !py-0 !text-left">
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
                <Inicio v-if="TablaActual === 'Inicio'"/>
                <Productos v-if="TablaActual === 'Productos'"/>
                <Pedidos v-if="TablaActual === 'Pedidos'"/>
                <Clientes v-if="TablaActual === 'Clientes'"/>
                <Usuarios v-if="TablaActual === 'Usuarios'"/>
                <Carrito v-if="TablaActual === 'Carrito'" @CarritoVacio="TablaActual = 'Productos'"/>
                <Configuracion v-if="TablaActual === 'Configuracion'"/>
                <Mis_pedidos v-if="TablaActual === 'Mis_pedidos'"/>
                <Historial_precios v-if="TablaActual === 'Historial_precios'"/>
            </div>
        </div>
    </div>
    <div 
    v-else 
    class="
    flex
    bg-green-200
    justify-center
    rounded-2xl p-5
    gap-3 
    ">
        <Login @LoginExitoso="Iniciado = true"/>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue'
    import { CarritoLocal, LimpiarCompra, Iniciado, CerrarSesion, Rol } from './components/Estatus.js'
    import Login from './components/Login.vue'
    import Inicio from './components/Inicio.vue'
    import Pedidos from "./components/Pedidos.vue"
    import Clientes from "./components/Clientes.vue"
    import Usuarios from "./components/Usuarios.vue"
    import Productos from "./components/Productos.vue"
    import Carrito from "./components/Carrito.vue"
    import Configuracion from './components/Configuracion.vue'
    import Mis_pedidos from './components/Mis_pedidos.vue'
    import Historial_precios from './components/Historial_precios.vue'
    // ----- Variables ----- //
    const MostrarMenu = ref (false)
    const BorrarCarrito = ref(false)
    const TablaActual = ref("")
    const ActualizarCajaLogout = ref(false)
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        if (Rol.value === '3' || Rol.value === '6') {
            TablaActual.value = 'Pedidos'
        }
        else {
            TablaActual.value = 'Inicio'
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