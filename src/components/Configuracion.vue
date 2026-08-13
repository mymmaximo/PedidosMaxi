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
                        <h1 class="titulo-config">
                        DETALLES DE LA CUENTA
                        </h1>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            Nombre Completo
                            </label>
                            <input placeholder="Nombre" 
                            type="text" 
                            v-model="ClienteConfig.nombre" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            E-mail
                            </label>
                            <input placeholder="tucorreo@email.com" 
                            type="text" 
                            v-model="ClienteConfig.email" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            Nueva Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Escribe para cambiarla" 
                                :type="verContrasena ? 'text' : 'password'" 
                                v-model="ClienteConfig.contrasena" 
                                autocomplete="new-password" 
                                class="input-config input-pass"
                                >
                                <button @click="verContrasena = !verContrasena" 
                                type="button" 
                                class="boton-ojo"
                                >
                                    {{ verContrasena ? '🔒' : '👁️' }}
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">Confirmar Contraseña</label>
                            <div class="relative w-full">
                                <input placeholder="Repite la contraseña" 
                                :type="verConContrasena ? 'text' : 'password'" 
                                v-model="ClienteConfig.concontrasena" 
                                autocomplete="new-password" 
                                class="input-config input-pass"
                                >
                                <button @click="verConContrasena = !verConContrasena" 
                                type="button" 
                                class="boton-ojo"
                                >
                                    {{ verConContrasena ? '🔒' : '👁️' }}
                                </button>
                            </div>
                        </div>
                        <div class="mt-6">
                            <button type="submit" 
                            :disabled="Actualizando" 
                            class="boton-guardar"
                            >
                                {{ Actualizando ? 'Guardando datos...' : 'Guardar Cambios' }}
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
        Iniciado,
        ClienteID
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
    const Actualizando = ref(false)
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
                const respuesta = await fetch(`${urlover8000}/cliente/`, { credentials: 'include' })
                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    if (datos && datos.length > 0) {
                        ClienteConfig.value.nombre = datos[0].nombre
                        ClienteConfig.value.email = datos[0].email
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
        if (Actualizando.value) return
        Actualizando.value = true
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
            Actualizando.value = false
            return
        }
        ClienteConfig.value = {
            nombre: "",
            email: "",
            contrasena: "",
            concontrasena: ""
        }
        await CargarDatos()
        Actualizando.value = false
    }
</script>