<template>
    <!-- Actualizar Datos -->
    <div class="cuerpo">
        <div class="pagina">
            <div v-if="CargandoTrue" 
            class="flex flex-col 
            items-center justify-center 
            w-full h-[60vh]"
            >
                <img 
                src="../assets/loading.gif" 
                alt="Cargando configuracion..." 
                class="w-32 h-32 object-contain mb-4"
                >
                <h2 
                class="text-green-800 
                font-bold text-xl animate-pulse"
                >
                Cargando configuracion, un momento...
                </h2>
            </div>
            <div v-else-if="ErrorCarga" 
            class="flex flex-col 
            items-center justify-center 
            w-full h-[60vh] gap-4"
            >
                <h1 class="text-3xl font-bold text-red-600 text-center">
                ¡Ups! La conexión tardó demasiado 🔌
                </h1>
                <h2 class="text-xl text-gray-700 text-center px-4">
                El servidor no responde o tu conexión es inestable.
                </h2>
                <button 
                @click="CargarDatos" 
                class="botoncon mt-4"
                >
                🔄 Recargar Página
                </button>
            </div>
            <div v-else>
                <div
                class="troncodentro !z-0"
                >
                    <form @submit.prevent="ActualizarCliente">
                        <h1 class="text-center">
                        CONFIGURACION
                        </h1>
                        <h2>
                        Nombre
                        </h2>
                        <input 
                        type="text" 
                        v-model="ClienteConfig.nombre" 
                        placeholder="Nombre"
                        >
                        <h2>
                        E-mail
                        </h2>
                        <input 
                        type="text" 
                        v-model="ClienteConfig.email" 
                        placeholder="Email@email.com"
                        >
                        <h2>
                        Contraseña
                        </h2>
                        <div class="flex">
                            <input 
                            :type="verContrasena ? 'text' : 'password'"
                            v-model="ClienteConfig.contrasena" 
                            placeholder="Contraseña"
                            >
                            <button 
                            type="button" 
                            @click="verContrasena = !verContrasena"
                            class="botont !p-1"
                            >
                            {{ verContrasena ? '🔒' : '👁️' }}
                            </button>
                        </div>
                        <h2>
                        Confirmar Contraseña
                        </h2>
                        <div class="flex">
                            <input 
                            :type="verConContrasena ? 'text' : 'password'"
                            v-model="ClienteConfig.concontrasena" 
                            placeholder="Confirmar Contraseña"
                            >
                            <button 
                            type="button" 
                            @click="verConContrasena = !verConContrasena"
                            class="botont !p-1"
                            >
                            {{ verConContrasena ? '🔒' : '👁️' }}
                            </button>
                        </div>
                        <div class="botones !p-0">
                            <button 
                            type="submit" 
                            class="botoncon"
                            >
                            Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue'
    import { CerrarSesion, leerCookie } from './Estatus.js'
    // ----- Variables Complejas ----- //
    const ClienteConfig = ref({
        nombre: "",
        email: "",
        contrasena: "",
        concontrasena: ""
    })
    // ----- Variantes Booleanas ----- //
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const verContrasena = ref(false)
    const verConContrasena = ref(false)
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
    })
    const CargarDatos = (async() => {
        CargandoTrue.value = true
        ErrorCarga.value = false
        const temporizador = setTimeout(() => {
            if (CargandoTrue.value) {
                CargandoTrue.value = false
                ErrorCarga.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        try {
            const idConfig = leerCookie("id_cliente");
            if (idConfig) {
                const respuesta = await fetch(`http://10.250.4.36:8000/cliente/?id_cliente=${idConfig}`);
                const datos = await respuesta.json();
                if (datos.length > 0) {
                    const miPerfil = datos.find(cliente => cliente.id === parseInt(idConfig))
                    if (miPerfil) {
                        ClienteConfig.value.nombre = miPerfil.nombre
                        ClienteConfig.value.email = miPerfil.email
                        ClienteConfig.value.usuario = miPerfil.usuario
                    }
                }
            }
            clearTimeout(temporizador)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(temporizador)
            ErrorCarga.value = true
            CargandoTrue.value = false
        } finally {
            if (!ErrorCarga.value) {
                CargandoTrue.value = false
            }
        }
    })
    const RecargarPagina = () => {
        window.location.reload()
    }
    // ----- Para el Backend ----- //
    const ActualizarCliente = async() => {
        if (ClienteConfig.value.contrasena !== "" || ClienteConfig.value.concontrasena !== "") {
            if (ClienteConfig.value.contrasena !== ClienteConfig.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
            }
        }
        const UsuarioUpd = {} 
        if (ClienteConfig.value.nombre !== "") {
            UsuarioUpd.nombre = ClienteConfig.value.nombre
        }
        if (ClienteConfig.value.email !== "") {
            UsuarioUpd.email = ClienteConfig.value.email
        }
        if (ClienteConfig.value.contrasena !== "") {
            UsuarioUpd.contrasena = ClienteConfig.value.contrasena
        }
        const idUsuarioAct = leerCookie("id_cliente");
        const ActUsuario = await fetch(`http://10.250.4.36:8000/clientes/id/${idUsuarioAct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UsuarioUpd)
        })
        if (ActUsuario.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return
        }
        ClienteConfig.value = {
            nombre: "",
            email: "",
            contrasena: ""
        }
    }
</script>