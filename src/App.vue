<template>
    <div 
    v-if="Iniciado"
    class="
    bg-green-600
    ">
        <div class="
        flex m-0
        bg-green-600
        w-30
        ">
            <img alt="Vue logo" src="./assets/logo.png">
        </div>
        <div class="flex m-0 bg-green-600">
            <div class="flex 
            bg-green-800
            divide-x-3 divide-green-400
            border-green-400 border-t-2 border-r-4 rounded-se-2xl
            text-white">
                <h3
                @click="TablaActual = 'Productos'" 
                v-if="Rol !== '3' && Rol !== '6'"
                class="flex-initial 
                hover:bg-green-600
                active:bg-green-400
                p-2"
                >
                Ver Productos
                </h3>
                <h3 
                @click="TablaActual = 'Pedidos'" 
                v-if="Rol === '1'|| Rol === '3' || Rol === '6'"
                class="flex-initial 
                hover:bg-green-600
                active:bg-green-400
                p-2"
                >
                Ver Pedidos
                </h3>
                <h3
                @click="TablaActual = 'Clientes'" 
                v-if="Rol === '1' || Rol === '3'"
                class="flex-initial 
                hover:bg-green-600
                active:bg-green-400
                p-2"
                >
                Ver Clientes
                </h3>
                <h3
                @click="TablaActual = 'Usuarios'" 
                v-if="Rol === '1'"
                class="flex-initial 
                hover:bg-green-600
                active:bg-green-400
                p-2"
                >
                Ver Usuarios
                </h3>
                <h3
                @click="TablaActual = 'Historial_precios'" 
                v-if="Rol === '1' || Rol === '4'"
                class="flex-initial 
                hover:bg-green-600
                hover:rounded-se-2xl
                active:bg-green-400
                p-2"
                >
                Ver Historial de Precios
                </h3>
            </div>
            <div class="flex absolute right-0 
            bg-green-800
            divide-x-3 divide-green-400
            border-green-400 border-t-2 border-l-4 rounded-ss-2xl">
                <h3
                @click="AbrirPopUp02() ; TablaActual = 'Productos'" 
                v-if="CarritoLocal.length > 0 && Rol !== '2' && Rol !== '3'&& Rol !== '4'&& Rol !== '5'&& Rol !== '6'"
                class="flex 
                hover:bg-green-600 
                active:bg-green-400
                hover:rounded-ss-2xl
                p-2"
                >
                🗑️
                </h3>
                <div
                v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                >
                    <h3
                    v-if="CarritoLocal.length > 0" 
                    @click="TablaActual = 'Carrito'"
                    class="flex 
                    hover:bg-green-600
                    active:bg-green-400
                    text-white
                    p-2"
                    >
                    Tu Carrito
                    </h3>
                    <div 
                    v-else
                    class="group relative 
                    cursor-pointer"
                    >
                        <h3
                        class="flex 
                        hover:block
                        hover:bg-green-600
                        hover:rounded-ss-2xl
                        active:bg-green-400
                        text-white
                        p-2"
                        >
                        Tu Carrito
                        </h3>
                        <h3
                        v-if="CarritoLocal.length === 0"
                        class="hidden
                        text-white
                        group-hover:flex
                        bg-red-600
                        absolute top-full
                        left-1/2 -translate-x-1/2
                        p-2 whitespace-nowrap
                        rounded-2xl"
                        >
                        ¡El Carrito está Vacio!
                        </h3>
                    </div>
                </div>
                <div
                class="
                group relative 
                cursor-pointer
                ">
                    <h3
                    class="
                    flex
                    hover:bg-green-600
                    active:bg-green-400
                    text-white
                    p-2
                    ">
                    Mi Perfil
                    </h3>
                    <div 
                    class="
                    hidden
                    group-hover:block 
                    absolute top-full right-0
                    bg-green-800
                    text-white text-end
                    rounded-es-2xl
                    ">
                        <h3
                        @click="TablaActual = 'Mis_pedidos'"
                        v-if="Rol !== '2' && Rol !== '3'&& Rol !== '4' && Rol !== '5' && Rol !== '6'"
                        class="
                        p-2
                        hover:bg-green-600
                        ">
                        Mis Pedidos
                        </h3>
                        <h3
                        @click="TablaActual = 'Configuracion'" 
                        v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                        class="
                        p-2
                        hover:bg-green-600
                        ">
                        Configuracion
                        </h3>
                        <h3
                        @click="AbrirPopUp01()"
                        class="
                        p-2
                        hover:bg-red-600
                        hover:rounded-es-2xl
                        ">
                        Cerrar Sesion
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Productos v-if="TablaActual === 'Productos'"/>
            <Pedidos v-if="TablaActual === 'Pedidos'"/>
            <Clientes v-if="TablaActual === 'Clientes'"/>
            <Usuarios v-if="TablaActual === 'Usuarios'"/>
            <Carrito v-if="TablaActual === 'Carrito'" @CarritoVacio="TablaActual = 'Productos'"/>
            <Configuracion v-if="TablaActual === 'Configuracion'"/>
            <Mis_pedidos v-if="TablaActual === 'Mis_pedidos'"/>
            <Historial_precios v-if="TablaActual === 'Historial_precios'"/>
        </div>
        <Teleport to="body">
            <div 
            v-if="ActualizarCajaLogout"
            class="
            fixed inset-0
            bg-black/70 flex 
            justify-center
            items-center
            ">
                <div class="
                flex-col
                bg-green-600
                rounded-2xl p-5
                gap-3 
                ">
                    <h2
                    class="
                    text-3xl
                    font-bold  
                    p-4
                    ">
                    ¿Desear Cerrar Sesion?
                    </h2>
                    <div
                    class="
                    flex flex-col
                    gap-3
                    items-center
                    ">
                        <button 
                        @click="CerrarSesion() ; CerrarPopUp01()"
                        class="botonc">
                        Si Confirmo
                        </button>
                        <button @click="CerrarPopUp01()"
                        class="botont">
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>   
        <Teleport to="body">
            <div 
            v-if="BorrarCarrito"
            class="
            fixed inset-0
            bg-black/70 flex 
            justify-center
            items-center
            ">
                <div
                class="
                flex-col
                bg-green-400
                rounded-2xl p-5
                gap-3 
                ">
                    <h2
                    class="
                    text-2xl
                    font-bold  
                    p-4
                    ">
                    ¿Desear Vaciar tu Carrito?
                    </h2>
                    <div
                    class="
                    flex flex-col
                    gap-3
                    items-center
                    ">
                        <button 
                        @click="LimpiarCompra() ; CerrarPopUp02()"
                        class="
                        bg-red-600 text-white
                        rounded-3xl
                        px-6 py-2
                        ">
                        Si Confirmo
                        </button>
                        <button 
                        @click="CerrarPopUp02()"
                        class="
                        bg-gray-400 text-white
                        rounded-3xl
                        px-8 py-2
                        ">
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>   
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
    import Pedidos from "./components/Pedidos.vue"
    import Clientes from "./components/Clientes.vue"
    import Usuarios from "./components/Usuarios.vue"
    import Productos from "./components/Productos.vue"
    import Carrito from "./components/Carrito.vue"
    import Configuracion from './components/Configuracion.vue'
    import Mis_pedidos from './components/Mis_pedidos.vue'
    import Historial_precios from './components/Historial_precios.vue'
    // ----- Variables ----- //
    const BorrarCarrito = ref(false)
    const TablaActual = ref("")
    const ActualizarCajaLogout = ref(false)
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        if (Rol.value === '3' || Rol.value === '6') {
            TablaActual.value = 'Pedidos'
        }
        else {
            TablaActual.value = 'Productos'
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