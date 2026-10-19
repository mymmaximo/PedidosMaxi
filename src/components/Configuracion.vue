<template>
    <div class="cuerpo">
        <div class="pagina">

            <!-- Gif Cargando -->
            <div v-if="Backend_Espera" 
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

            <!-- Error Cargando -->
            <div v-else-if="Backend_Error" 
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
                <div class="mt-6 flex justify-center">
                    <button @click="Backend_Cargar()" 
                    class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                    >
                        🔄 Recargar Página
                    </button>
                </div>
            </div>

            <!-- Actualizar Datos de Usuario -->
            <div v-else 
            class="flex justify-center 
            items-center w-full px-4 py-12"
            >
                <div class="tarjeta-config">
                    <div class="deco-config">
                    </div>
                    <form @submit.prevent="Backend_Put"
                    class="relative z-10 flex flex-col gap-4"
                    >
                        <!-- Encabezado -->
                        <h1 class="titulo-config mb-4">
                            DETALLES DE LA CUENTA
                        </h1>
                        
                        <!-- Datos de Cliente -->
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                Nombre Completo
                            </label>
                            <input placeholder="Nombre" 
                            type="text" 
                            v-model="Datos_Upgrade.nombre" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                E-mail
                            </label>
                            <input placeholder="tucorreo@email.com" 
                            type="text" 
                            v-model="Datos_Upgrade.email" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left mt-2">
                            <label class="label-config">
                                Nueva Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Escribe para cambiarla" 
                                :type="verContrasena ? 'text' : 'password'" 
                                v-model="Datos_Upgrade.contrasena" 
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
                            <label class="label-config">
                                Confirmar Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Repite la contraseña" 
                                :type="verConContrasena ? 'text' : 'password'" 
                                v-model="Datos_Upgrade.concontrasena" 
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

                        <!-- Botones -->
                        <div class="mt-6">
                            <button type="submit" 
                            :disabled="Boton_Espera" 
                            class="boton-guardar"
                            >
                                {{ Boton_Espera ? 'Guardando datos...' : 'Guardar Cambios' }}
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
        Cerrar_Sesion,
        backend_url, 
        Sesion_Expirada, 
        Iniciado
    } from './Estatus.js'

    // ----- Variables Complejas ----- //

    // Almacen para Actualizar Clientes //
    const Datos_Upgrade = ref ({
        nombre: "",
        email: "",
        contrasena: "",
        concontrasena: ""
    })

    // ----- Variables Booleanas ----- //

    const Boton_Espera = ref (false)
    const Backend_Error = ref (false)
    const verContrasena = ref (false)
    const Backend_Espera = ref (true)
    const verConContrasena = ref (false)

    // ----- Variables Vacias ----- //

    const Datos_Id = ref (null)

    // ----- Funciones Vue ----- //
    
    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })

    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
        }}, 15000)
        // Leer Datos del Cliente con Sesion Iniciada
        try {
            const respuesta_id = await fetch(`${backend_url}/reload/`, { credentials: 'include' })
            if (respuesta_id.ok) {
                const sesion = await respuesta_id.json()
                Datos_Id.value = sesion.id_cliente
                const respuesta = await fetch(`${backend_url}/cliente/`, { credentials: 'include' })
                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    if (datos && datos.length > 0) {
                        Datos_Upgrade.value.nombre = datos[0].nombre
                        Datos_Upgrade.value.email = datos[0].email
            }}}
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
    }}})

    // ----- Funciones Backend ----- //
    
    // Actualizar Datos del Cliente //
    const Backend_Put = async() => {
        if (Boton_Espera.value) return
        Boton_Espera.value = true
        // Verificacion Contraseñas iguales
        if (Datos_Upgrade.value.contrasena !== "" || Datos_Upgrade.value.concontrasena !== "") {
            if (Datos_Upgrade.value.contrasena !== Datos_Upgrade.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
        }}
        // Establecer Datos del Cliente
        const Dato_Upgrade = {} 
        if (Datos_Upgrade.value.nombre !== "") {
            Dato_Upgrade.nombre = Datos_Upgrade.value.nombre
        }
        if (Datos_Upgrade.value.email !== "") {
            Dato_Upgrade.email = Datos_Upgrade.value.email
        }
        if (Datos_Upgrade.value.contrasena !== "") {
            Dato_Upgrade.contrasena = Datos_Upgrade.value.contrasena
        }
        if (!Datos_Id.value) return
        // Enviar Datos Actualizados al Backend
        const PutBackend = await fetch(`${backend_url}/clientes/id/${Datos_Id.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Dato_Upgrade),
            credentials: 'include'
        })
        // Verificacion Sesion Vencida
        if (PutBackend.status === 401 || PutBackend.status === 403) {
            Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            Boton_Espera.value = false
            return
        }
        Datos_Upgrade.value = {
            nombre: "",
            email: "",
            contrasena: "",
            concontrasena: ""
        }
        await Backend_Cargar()
        Boton_Espera.value = false
    }
    
</script>