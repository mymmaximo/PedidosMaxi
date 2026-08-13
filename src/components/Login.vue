<template>
    <div class="cuerpo">
        <div class="pagina !md:items-center">
            <div v-if="CargandoTrue" 
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
                <!-- Iniciar Sesion -->
                <div v-if="MostrarLogin"
                class="tarjeta-config"
                >
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
                    <form @submit.prevent="IniciarSesionUsuario" 
                    class="!gap-5 relative z-10"
                    >
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            E-mail
                            </label>
                            <input placeholder="tucorreo@email.com"
                            type="text" 
                            v-model="LoginBox.email" 
                            class="input-config"
                            :class="{'!border-red-500' : Heror}"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            Contraseña
                            </label>
                            <div class="relative w-full">
                                <input placeholder="Tu contraseña"
                                :type="verContrasena ? 'text' : 'password'"
                                v-model="LoginBox.contrasena" 
                                class="input-config input-pass"
                                :class="{'!border-red-500' : Heror}"
                                >
                                <button @click="verContrasena = !verContrasena"
                                type="button" 
                                class="boton-ojo"
                                >
                                {{ verContrasena ? '🔒' : '👁️' }}
                                </button>
                            </div>
                        </div>
                        <div v-if="Heror" 
                        class="text-red-500 text-center font-bold text-sm 
                        bg-red-50 py-2 rounded-lg border border-red-200"
                        >
                        ❌ {{ Herror }}
                        </div>
                        <div class="mt-2">
                            <button :disabled="confirbotonlog || ProcesandoAuth" 
                            type="submit" 
                            class="boton-guardar"
                            >
                                {{ ProcesandoAuth ? 'Ingresando...' : 'Ingresar' }}
                            </button>
                        </div>
                        <div class="mt-6 border-t border-green-100 pt-6 text-center">
                            <p class="text-gray-600 font-medium mb-3">
                            ¿No tienes cuenta?
                            </p>
                            <button @click="MostrarLogin = false; Heror = false"
                            type="button" 
                            class="botont w-full !py-3 !rounded-2xl shadow-sm"
                            >
                                Crear una cuenta nueva
                            </button>
                        </div>
                    </form>
                </div>
                <!-- Registrarse -->
                <div v-else class="tarjeta-config">
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
                    <form @submit.prevent="SubirNuevoCliente" 
                    class="!gap-5 relative z-10"
                    >
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            Nombre Completo
                            </label>
                            <input placeholder="Tu nombre"
                            type="text" 
                            v-model="NuevoCliente.nombre" 
                            class="input-config"
                            >
                        </div>
                        <div class="flex flex-col text-left">
                            <label class="label-config">
                            DNI
                            </label>
                            <input placeholder="Tu documento"
                            type="text" 
                            v-model="NuevoCliente.dni"
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
                            v-model="NuevoCliente.email" 
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
                                v-model="NuevoCliente.contrasena" 
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
                                v-model="NuevoCliente.concontrasena" 
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
                        <div v-if="Heror" 
                        class="text-red-500 text-center font-bold text-sm 
                        bg-red-50 py-2 rounded-lg border border-red-200"
                        >
                        ❌ {{ Herror }}
                        </div>
                        <div class="mt-2">
                            <button :disabled="confirbotonreg || ProcesandoAuth" 
                            type="submit" 
                            class="boton-guardar"
                            >
                            {{ ProcesandoAuth ? 'Registrando...' : 'Registrarte' }}
                            </button>
                        </div>
                        <div class="mt-6 border-t border-green-100 pt-6 text-center">
                            <p class="text-gray-600 font-medium mb-3">
                            ¿Ya tienes cuenta?
                            </p>
                            <button @click="MostrarLogin = true; Heror = false"
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
        onMounted, 
        ref 
    } from 'vue'
    import {
        useRouter
    } from 'vue-router'
    import { 
        ValidadSesionBack, 
        urlover8000,
        Iniciado,
        Rol,
        VerificarRol,
        VerificarRolExcluido
    } from './Estatus.js'
    // ----- Variables Vue ----- //
    const router = useRouter()
    const confirbotonreg = computed(() =>{
        if (!MostrarLogin.value) {
            const faltandatos02 = 
                NuevoCliente.value.nombre === "" ||
                NuevoCliente.value.email === "" ||
                NuevoCliente.value.dni === "" ||
                NuevoCliente.value.contrasena === "" ||
                NuevoCliente.value.concontrasena === "" 
            return faltandatos02
        }
    })
    const confirbotonlog = computed(() =>{
        if (MostrarLogin.value) {
            const faltandatos01 = 
                LoginBox.value.email === "" ||
                LoginBox.value.contrasena === ""
            return faltandatos01
        }
    })
    // ----- Variables Complejas ----- //
    const LoginBox = ref({
        email: "",
        contrasena: ""
    })
    const NuevoCliente = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        concontrasena: ""
    })
    // ----- Variantes Booleanas ----- //
    const Heror = ref(false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(false)
    const MostrarLogin = ref(true)
    const verContrasena = ref(false)
    const ProcesandoAuth = ref(false)
    const verConContrasena = ref(false)
    // ----- Variantes Vacias ----- //
    const Herror = ref("")
    // ----- Funciones Vue ----- //
    const CargarDatos = ( async () => {
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
    const ProcesarLogin = () => {
        Iniciado.value = true
        if (VerificarRol([3, 6])) {
            router.push('/pedidos')
        } else {
            router.push('/')
        }
    }
    // ----- Para el Backend ----- //
    const IniciarSesionCliente = async() => {
        const respuesta = await fetch(`${urlover8000}/cliente/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LoginBox.value),
            credentials: 'include'
        })
        if (respuesta.ok) {
            await ValidadSesionBack()
            ProcesarLogin()
            LoginBox.value = {
                email: "",
                contrasena: ""
            }
        } else {
            Herror.value = "Usuario o contraseña incorrectos"
            Heror.value = true
        } 
    }
    const IniciarSesionUsuario = async() => {
        if (ProcesandoAuth.value) return
        ProcesandoAuth.value = true
        Heror.value = false
        try {
            const respuesta = await fetch(`${urlover8000}/usuario/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(LoginBox.value),
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await IniciarSesionCliente()
                return
            }
            if (respuesta.ok) {
                await ValidadSesionBack()
                ProcesarLogin()
                LoginBox.value = {
                    email: "",
                    contrasena: ""
                }
            } else {
                await IniciarSesionCliente()
            } 
        } catch (error) {
            console.error("Error de conexión:", error)
            Herror.value = "Error al conectar con el servidor"
            Heror.value = true
        } finally {
            ProcesandoAuth.value = false
        }
    }
    const SubirNuevoCliente = async() => {
        if (NuevoCliente.value.contrasena !== "" || NuevoCliente.value.concontrasena !== "") {
            if (NuevoCliente.value.contrasena !== NuevoCliente.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
            }
        }
        if (ProcesandoAuth.value) return
        ProcesandoAuth.value = true
        Heror.value = false
        try {
            const respuesta = await fetch(`${urlover8000}/clientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(NuevoCliente.value),
                credentials: 'include'
                })
            if (respuesta.ok) {
                NuevoCliente.value = {
                    nombre: "",
                    email: "",
                    dni: "",
                    contrasena: "",
                    concontrasena: ""
                }
                MostrarLogin.value = true
            } else {
                Herror.value = "Error al registrar, revisa tus datos"
                Heror.value = true
            } 
        } catch (error) {
            console.error("Error de conexión:", error)
            Herror.value = "Error al conectar con el servidor"
            Heror.value = true
        } finally {
            ProcesandoAuth.value = false
        }
    }
</script>