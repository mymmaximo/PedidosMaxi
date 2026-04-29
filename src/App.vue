<template>
    <div v-if="Iniciado">
        <div class="barra">
            <img alt="Vue logo" src="./assets/logo.png">
        </div>
        <div class="barra">
            <div class="botones_izquierda">
                <h1 @click="TablaActual = 'Productos'">
                Ver Productos
                </h1>
                <h1 @click="TablaActual = 'Pedidos'" v-if="Rol === '1'">
                Ver Pedidos
                </h1>
                <h1 @click="TablaActual = 'Clientes'" v-if="Rol === '1'">
                Ver Clientes
                </h1>
            </div>
            <div class="botones_derecha">
                <h1 @click="AbrirPopUp2() ; TablaActual = 'Productos'" v-if="CarritoLocal.length > 0" class="cerrar">
                🗑️
                </h1>
                <div class="perfil">
                    <h1 v-if="CarritoLocal.length > 0" @click="TablaActual = 'Carrito'" class="btn_perfil">
                    Tu Carrito
                    </h1>
                    <h1 v-else class="btn_perfil">
                    Tu Carrito
                    </h1>
                    <div class="desplegable_perfil" v-if="CarritoLocal.length === 0">
                        <h2>
                        ¡El Carrito está Vacio!
                        </h2>
                    </div>
                </div>
                <div class="perfil">
                    <h1 class="btn_perfil" @click="TablaActual = 'Configuracion'">
                        Mi Perfil
                    </h1>
                    <div class="desplegable_perfil">
                        <h2 @click="TablaActual = 'Configuracion'">
                        Configuracion
                        </h2>
                        <h2 @click="TablaActual = 'Mis_pedidos'">
                        Mis Pedidos
                        </h2>
                        <h2 @click="AbrirPopUp1()" class="cerrar">
                        Cerrar Sesion
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Productos v-if="TablaActual === 'Productos'"/>
            <Pedidos v-if="TablaActual === 'Pedidos'"/>
            <Clientes  v-if="TablaActual === 'Clientes'"/>
            <Carrito v-if="TablaActual === 'Carrito'" @CarritoVacio="TablaActual = 'Productos'"/>
            <Configuracion v-if="TablaActual === 'Configuracion'"/>
            <Mis_pedidos v-if="TablaActual === 'Mis_pedidos'"/>
        </div>
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaLogout">
                <div class="caja_editar">
                    <h2>
                    ¿Desear Cerrar Sesion?
                    </h2>
                    <button @click="CerrarSesion() ; CerrarPopUp1()">
                    Si Confirmo
                    </button>
                    <button @click="CerrarPopUp1()">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>   
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="BorrarCarrito">
                <div class="caja_editar">
                    <h2>
                    ¿Desear Vaciar tu Carrito?
                    </h2>
                    <button @click="LimpiarCompra() ; CerrarPopUp2()">
                    Si Confirmo
                    </button>
                    <button @click="CerrarPopUp2()">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>   
    </div>
    <div v-else class="contenedor_login">
        <Login @LoginExitoso="Iniciado = true"/>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { CarritoLocal, LimpiarCompra, Iniciado, CerrarSesion, Rol } from './components/Estatus.js'
    import Login from './components/Login.vue'
    import Pedidos from "./components/Pedidos.vue"
    import Clientes from "./components/Clientes.vue"
    import Productos from "./components/Productos.vue"
    import Carrito from "./components/Carrito.vue"
    import Configuracion from './components/Configuracion.vue'
    import Mis_pedidos from './components/Mis_pedidos.vue'
    const TablaActual = ref('Productos');
    const ActualizarCajaLogout = ref(false)
    const BorrarCarrito = ref(false)
	const AbrirPopUp1 = () => {
		ActualizarCajaLogout.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp1 = () => {
		ActualizarCajaLogout.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp2 = () => {
		BorrarCarrito.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp2 = () => {
		BorrarCarrito.value = false
		document.body.style.overflow = "auto";
	}
</script>

<style scoped>
    .perfil {
        position: relative;
        cursor: pointer;
    }
    .desplegable_perfil {
        background-color: darkblue;
        color: white;
        position: absolute;
        top: 100%;
        right: 0;
        min-width: 150px;
        display: none;
    }
    .perfil:hover .desplegable_perfil {
        display: block;
    }
    .desplegable_perfil h2 {
        font-size: small;
        padding: 10px;
        margin: 0;
        border-bottom: 1px solid white;
    }
    .caja_editar{
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 15px;
        border: 2px solid #000000;
        z-index: 1000;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
    }
    .barra{
        display: flex;
        width: 100%;
        background-color: darkblue;
        margin: 0;
    }
    .botones_izquierda{
        display: flex;
        background-color: rgb(26, 26, 153);
        user-select: none;
    }
    .botones_izquierda> *{
        border-radius: 0%;
        border-right: 1px solid white;
        padding-right: 10px;
    }
    .botones_izquierda> *:last-child{
        border-right: none;
        padding-right: 10px;
    }
    .botones_derecha{
        margin-left: auto;
        display: flex;
        background-color: rgb(26, 26, 153);
        user-select: none;
    }
    .botones_derecha> *{
        border-radius: 0%;
        border-right: 1px solid white;
        padding-right: 10px;
    }
    .botones_derecha> *:last-child{
        border-right: none;
        padding-right: 10px;
    }
    .contenedor_login{
        padding: 50px;
        margin: 50px auto;
        width: fit-content;
        background-color: #a7cdcf;
        border-radius: 20px;
    }
</style>
