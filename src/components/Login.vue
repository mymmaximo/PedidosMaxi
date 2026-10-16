<template>
    <div class="cuerpo">
        <!-- Pagina -->
        <div class="pagina !md:items-center">
                    
            <!-- Gif Cargando -->
            <div v-if="Backend_Espera" 
            class="flex flex-col 
            items-center justify-center 
            w-full h-[60vh]"
            >
                <img 
                src="../assets/loading.gif" 
                alt="Cargando pagina..." 
                class="w-32 h-32 object-contain mb-4"
                >
                <h2 
                class="text-green-800 
                font-bold text-xl animate-pulse"
                >
                    Cargando pagina, un momento...
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
            
            <!-- Pagina de Inicio de Sesion / Registrar -->
            <div v-else>

                <!-- Opcion Iniciar Sesion -->
                <div v-if="Mostrar_Log_In"
                class="tarjeta-config"
                >

                    <!-- Encabezado -->
                    <div class="deco-config">
                    </div>
                    <div class="text-center mb-8 relative z-10">
                        <h1 class="titulo-config">
                            Iniciar Sesión
                        </h1>
                        <p class="text-gray-500 font-medium text-sm sm:text-base">
                            Bienvenido de nuevo a Maxi-Store
                        </p>
                    </div>

                    <!-- Formulario -->
                    <!-- Iniciar Sesion -->
                    <form @submit.prevent="Backend_Post_Usuario_Log_In" 
                    class="!gap-5 relative z-10"
                    >
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                E-mail
                            </label>
                            <input placeholder="tucorreo@email.com"
                            type="text" 
                            v-model="Datos_Log_In.email" 
                            class="input-config"
                            :class="{'!border-red-500' : Dato_Error}"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Tu contraseña"
                                :type="verContrasena ? 'text' : 'password'"
                                v-model="Datos_Log_In.contrasena" 
                                class="input-config input-pass"
                                :class="{'!border-red-500' : Dato_Error}"
                                >
                                <button @click="verContrasena = !verContrasena"
                                type="button" 
                                class="boton-ojo"
                                >
                                    {{ verContrasena ? '🔒' : '👁️' }}
                                </button>
                            </div>
                        </div>

                        <!-- Botones -->
                        <div v-if="Dato_Error" 
                        class="text-red-500 text-center font-bold text-sm 
                        bg-red-50 py-2 rounded-lg border border-red-200"
                        >
                            ❌ {{ Texto_Error }}
                        </div>
                        <div class="mt-2">
                            <button :disabled="Verificar_Boton || Dato_Verificacion" 
                            type="submit" 
                            class="boton-guardar"
                            >
                                {{ Dato_Verificacion ? 'Ingresando...' : 'Ingresar' }}
                            </button>
                        </div>
                        <div class="mt-6 border-t border-green-100 pt-6 text-center">
                            <p class="text-gray-600 font-medium mb-3">
                                ¿No tienes cuenta?
                            </p>
                            <button @click="Mostrar_Log_In = false; Dato_Error = false"
                            type="button" 
                            class="botont w-full !py-3 !rounded-2xl shadow-sm"
                            >
                                Crear una cuenta nueva
                            </button>
                        </div>

                    </form>

                </div>
                
                <!-- Opcion Registrarse -->
                <div v-else class="tarjeta-config">

                    <!-- Encabezado -->
                    <div class="deco-config">
                    </div>
                    <div class="text-center mb-8 relative z-10">
                        <h1 class="titulo-config">
                        Crear Cuenta
                        </h1>
                        <p class="text-gray-500 font-medium text-sm sm:text-base">
                        Únete para gestionar tus pedidos
                        </p>
                    </div>

                    <!-- Formulario -->
                    <!-- Registrarse -->
                    <form @submit.prevent="Backend_Post" 
                    class="!gap-5 relative z-10"
                    >
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                Nombre Completo
                            </label>
                            <input placeholder="Tu nombre"
                            type="text" 
                            v-model="Datos_New.nombre" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                DNI
                            </label>
                            <input placeholder="Tu documento"
                            type="text" 
                            v-model="Datos_New.dni"
                            maxlength="8"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                E-mail
                            </label>
                            <input placeholder="tucorreo@email.com"
                            type="text" 
                            v-model="Datos_New.email" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                                Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Crea una contraseña"
                                :type="verContrasena ? 'text' : 'password'"
                                v-model="Datos_New.contrasena" 
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
                                v-model="Datos_New.concontrasena" 
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
                        <div v-if="Dato_Error" 
                        class="text-red-500 text-center font-bold text-sm 
                        bg-red-50 py-2 rounded-lg border border-red-200"
                        >
                            ❌ {{ Texto_Error }}
                        </div>
                        <div class="mt-2">
                            <button :disabled="Verificar_Boton || Dato_Verificacion" 
                            type="submit" 
                            class="boton-guardar"
                            >
                                {{ Dato_Verificacion ? 'Registrando...' : 'Registrarte' }}
                            </button>
                        </div>
                        <div class="mt-6 border-t border-green-100 pt-6 text-center">
                            <p class="text-gray-600 font-medium mb-3">
                                ¿Ya tienes cuenta?
                            </p>
                            <button @click="Mostrar_Log_In = true; Dato_Error = false"
                            type="button" 
                            class="botont w-full !py-3 !rounded-2xl shadow-sm"
                            >
                                Iniciar Sesión
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
        computed,
        ref 
    } from 'vue'
    import {
        useRouter
    } from 'vue-router'
    import { 
        Validad_Sesion_Backend, 
        backend_url,
        Iniciado,
        Verificar_Rol
    } from './Estatus.js'
    
    // ----- Variables Vue ----- //
    
    // Habilitar Boton //
    const Verificar_Boton = computed(() =>{
        // Iniciar Sesion
        if (Mostrar_Log_In.value) {
            const Datos_Log_In_Faltantes = 
                Datos_Log_In.value.email === "" ||
                Datos_Log_In.value.contrasena === ""
            return Datos_Log_In_Faltantes
        }
        // Registrarse
        if (!Mostrar_Log_In.value) {
            const Datos_New_Faltantes = 
                Datos_New.value.nombre === "" ||
                Datos_New.value.email === "" ||
                Datos_New.value.dni === "" ||
                Datos_New.value.contrasena === "" ||
                Datos_New.value.concontrasena === "" 
            return Datos_New_Faltantes
    }})
    const router = useRouter()

    // ----- Variables Complejas ----- //

    // Almacen para Inicio de Sesion //
    const Datos_Log_In = ref({
        email: "",
        contrasena: ""
    })
    // Almacen para Resgistrar Cliente //
    const Datos_New = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        concontrasena: ""
    })

    // ----- Variantes Booleanas ----- //
    
    const Dato_Error = ref(false)
    const Backend_Error = ref(false)
    const Backend_Espera = ref(false)
    const Mostrar_Log_In = ref(true)
    const verContrasena = ref(false)
    const Dato_Verificacion = ref(false)
    const verConContrasena = ref(false)
    
    // ----- Variantes Vacias ----- //
    
    const Texto_Error = ref("")
    
    // ----- Funciones Vue ----- //
    
    // Carga de Datos de la Pagina //
    const Backend_Cargar = ( async () => {
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        try {
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

    // Enviar Usuario/Cliente a Url/Link //
    const Click_Log_In = () => {
        Iniciado.value = true
        // Rider y Gestor de Pedidos General
        if (Verificar_Rol([3, 6])) {
            router.push('/pedidos')
        } else {
            router.push('/')
    }}

    // ----- Funciones Backend ----- //

    // Verificar Inicio de Sesion como Cliente //
    const Backend_Post_Cliente_Log_In = async() => {
        const respuesta = await fetch(`${backend_url}/cliente/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Datos_Log_In.value),
            credentials: 'include'
        })
        if (respuesta.ok) {
            await Validad_Sesion_Backend()
            Click_Log_In()
            Datos_Log_In.value = {
                email: "",
                contrasena: ""
            }
        } else {
            Texto_Error.value = "Usuario o contraseña incorrectos"
            Dato_Error.value = true
    }}
    // Verificar Inicio de Sesion como Usuario //
    const Backend_Post_Usuario_Log_In = async() => {
        if (Dato_Verificacion.value) return
        Dato_Verificacion.value = true
        Dato_Error.value = false
        try {
            const respuesta = await fetch(`${backend_url}/usuario/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Datos_Log_In.value),
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await Backend_Post_Cliente_Log_In()
                return
            }
            if (respuesta.ok) {
                await Validad_Sesion_Backend()
                Click_Log_In()
                Datos_Log_In.value = {
                    email: "",
                    contrasena: ""
                }
            } else {
                // Verificar Inicio de Sesion como Cliente //
                await Backend_Post_Cliente_Log_In()
            } 
        } catch (error) {
            console.error("Error de conexión:", error)
            Texto_Error.value = "Error al conectar con el servidor"
            Dato_Error.value = true
        } finally {
            Dato_Verificacion.value = false
    }}
    // Registrar Cliente Nuevo //
    const Backend_Post = async() => {
        if (Datos_New.value.contrasena !== "" || Datos_New.value.concontrasena !== "") {
            if (Datos_New.value.contrasena !== Datos_New.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
            }
        }
        if (Dato_Verificacion.value) return
        Dato_Verificacion.value = true
        Dato_Error.value = false
        try {
            const respuesta = await fetch(`${backend_url}/clientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Datos_New.value),
                credentials: 'include'
                })
            if (respuesta.ok) {
                Datos_New.value = {
                    nombre: "",
                    email: "",
                    dni: "",
                    contrasena: "",
                    concontrasena: ""
                }
                Mostrar_Log_In.value = true
            } else {
                Texto_Error.value = "Error al registrar, revisa tus datos"
                Dato_Error.value = true
        }} catch (error) {
            console.error("Error de conexión:", error)
            Texto_Error.value = "Error al conectar con el servidor"
            Dato_Error.value = true
        } finally {
            Dato_Verificacion.value = false
    }}
    
</script>