<template>
    <!-- Actualizar Datos -->
    <div class="cuerpo">
        <div class="pagina">
            <div v-if="CargandoTrue" 
            class="flex flex-col 
            items-center justify-center 
            w-full h-[60vh]"
            >
                <img src="../assets/loading.gif" 
                alt="Cargando configuracion..." 
                class="w-32 h-32 object-contain mb-4"
                >
                <h2 class="text-green-800 font-bold text-xl animate-pulse">
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
                <button @click="CargarDatos" 
                class="botoncon mt-4"
                >
                🔄 Recargar Página
                </button>
            </div>
            <div v-else>
                <div class="troncodentro !z-0">
                    <form @submit.prevent="ActualizarCliente">
                        <h1 class="text-center">
                        DETALLES DE LA CUENTA
                        </h1>
                        <h2>
                        Nombre
                        </h2>
                        <input placeholder="Nombre"
                        type="text"
                        v-model="ClienteConfig.nombre"
                        >
                        <h2>
                        E-mail
                        </h2>
                        <input placeholder="Email@email.com"
                        type="text"
                        v-model="ClienteConfig.email"
                        >
                        <h2>
                        Contraseña
                        </h2>
                        <div class="flex">
                            <input placeholder="Contraseña"
                            :type="verContrasena ? 'text' : 'password'"
                            v-model="ClienteConfig.contrasena"
                            >
                            <button @click="verContrasena = !verContrasena"
                            type="button"
                            class="botont !p-1"
                            >
                            {{ verContrasena ? '🔒' : '👁️' }}
                            </button>
                        </div>
                        <h2>
                        Confirmar Contraseña
                        </h2>
                        <div class="flex">
                            <input placeholder="Confirmar Contraseña"
                            :type="verConContrasena ? 'text' : 'password'"
                            v-model="ClienteConfig.concontrasena"
                            >
                            <button @click="verConContrasena = !verConContrasena"
                            type="button" 
                            class="botont !p-1"
                            >
                            {{ verConContrasena ? '🔒' : '👁️' }}
                            </button>
                        </div>
                        <div class="botones !p-0">
                            <button type="submit" 
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
    import { 
        onMounted, 
        ref 
    } from 'vue'
    import { 
        CerrarSesion,
        urlover8000, 
        SesionExpirada, 
        Iniciado 
    } from './Estatus.js'
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
    // ----- Variables Vacias ----- //
    const IdClienteAct = ref(null)
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
            const respuestaid = await fetch(`${urlover8000}/reload/`, { credentials: 'include' })
            if (respuestaid.ok) {
                const sesion = await respuestaid.json()
                IdClienteAct.value = sesion.id_cliente
                const respuesta = await fetch(`${urlover8000}/cliente/?limit=1000`, { credentials: 'include' })
                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    const miPerfil = datos.find(cliente => cliente.id === sesion.id_cliente)
                    if (datos && datos.length > 0) {
                        ClienteConfig.value.nombre = miPerfil.nombre
                        ClienteConfig.value.email = miPerfil.email
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
        if (!IdClienteAct.value) return
        const ActUsuario = await fetch(`${urlover8000}/clientes/id/${IdClienteAct.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UsuarioUpd),
            credentials: 'include'
        })
        if (ActUsuario.status === 401 || ActUsuario.status === 403) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        ClienteConfig.value = {
            nombre: "",
            email: "",
            contrasena: "",
            concontrasena: ""
        }
        await CargarDatos()
    }
</script>