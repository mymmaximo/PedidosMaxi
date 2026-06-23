<template>
    <div class="cuerpo">
        <div 
        v-if="!SesionIniciada"
        class="pagina !md:items-center"
        >
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
                <div 
                v-if="MostrarLogin"
                class="troncodentro"
                >
                    <form 
                    @submit.prevent="IniciarSesionUsuario" 
                    class="popup"
                    >
                        <h4 class="text-center">
                        Iniciar Sesion
                        </h4>
                        <h2>
                        Ingresa tu E-Mail
                        </h2>
                        <input 
                        type="text" 
                        v-model="LoginBox.email" 
                        placeholder="Email"
                        :class="{'!border-red-500' : Heror === true}"
                        >
                        <h2>
                        Ingresa tu Contraseña
                        </h2>
                        <div class="flex">
                            <input 
                            :type="verContrasena ? 'text' : 'password'"
                            v-model="LoginBox.contrasena" 
                            placeholder="Contraseña"
                            :class="{'!border-red-500' : Heror === true}"
                            >
                            <button 
                            type="button" 
                            @click="verContrasena = !verContrasena"
                            class="botont !p-1"
                            >
                            {{ verContrasena ? '🔒' : '👁️' }}
                            </button>
                        </div>
                        <div class="botones">
                            <button 
                            type="submit" 
                            class="botoncon">
                            Iniciar Sesion
                            </button>
                        </div>
                        <h4 
                        v-if="Heror"
                        class="botonc">
                        {{ Herror }}
                        </h4>
                        <h2 class="text-center">
                        ¿No Tienes Cuenta?
                        </h2>
                        <div class="botones">
                            <button 
                            type="button" 
                            @click="MostrarLogin = false; Heror = false"
                            class="botont"
                            >
                            Registrate
                            </button>
                        </div>
                    </form>
                </div>
                <!-- Registrarse -->
                <div v-else>
                    <form 
                    @submit.prevent="SubirNuevoCliente" 
                    class="troncodentro">
                        <h4 class="text-center">
                        Registrarse
                        </h4>
                        <h3>
                        Ingresa tu E-Mail
                        </h3>
                        <input
                        type="text" 
                        v-model="NuevoCliente.email" 
                        placeholder="E-Mail"
                        >
                        <h3>
                        Ingresa tu Contraseña
                        </h3>
                        <div class="flex">
                            <input 
                            :type="verContrasena ? 'text' : 'password'"
                            v-model="NuevoCliente.contrasena" 
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
                        <h3>
                        Confirmar Contraseña
                        </h3>
                        <div class="flex">
                            <input 
                            :type="verConContrasena ? 'text' : 'password'"
                            v-model="NuevoCliente.concontrasena" 
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
                        <h3>
                        Ingresa tu Nombre
                        </h3>
                        <input 
                        type="text" 
                        v-model="NuevoCliente.nombre" 
                        placeholder="Nombre"
                        >
                        <h3>
                        Ingresa tu DNI
                        </h3>
                        <input 
                        type="text" 
                        v-model="NuevoCliente.dni" 
                        placeholder="DNI"
                        >
                        <div class="botones">
                            <button 
                            type="submit" 
                                    :disabled="confirboton" 
                            class="botoncon"
                            >
                            Registrarte
                            </button>
                        </div>
                        <h2 
                        v-if="Heror"
                        class="text-red-500">
                        {{ Herror }}
                        </h2>
                        <div class="botones">
                            <h3>
                            ¿Ya Tienes Cuenta?
                            </h3>
                            <button 
                            type="button" 
                            @click="MostrarLogin = true; Heror = false"
                            class="botont !p-1"
                            >
                            Iniciar Sesion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>
            ¡Bienvenido a la tienda! 🛒
            </h2>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { computed, onMounted, ref } from 'vue';
    import { CerrarSesion, leerCookie } from './Estatus.js'
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
    const CargandoTrue = ref(true)
    const MostrarLogin = ref(true)
    const verContrasena = ref(false)
    const SesionIniciada = ref(false)
    // ----- Variantes Vacias ----- //
    const Herror = ref("")
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
    })
    const CargarDatos = (() => {
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
            const tokenGuardado = leerCookie("token")
            if (tokenGuardado) {
                SesionIniciada.value = true
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
    const confirboton = computed(() =>{
        if (!MostrarLogin.value) {
            const faltandatos01 = 
                NuevoCliente.value.nombre === "" ||
                NuevoCliente.value.email === "" ||
                NuevoCliente.value.dni === "" ||
                NuevoCliente.value.contrasena === "" ||
                NuevoCliente.value.concontrasena === "" 
            return faltandatos01
        }
    })
    const RecargarPagina = () => {
        window.location.reload()
    }
    const emit = defineEmits([
        'LoginExitoso'
    ])
    // ----- Para el Backend ----- //
    const IniciarSesionCliente = async() => {
        const respuesta = await fetch('https://x1sjqnzh-8000.brs.devtunnels.ms/cliente/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LoginBox.value)
        })
        const datos = await respuesta.json();
            if (respuesta.ok) {
                document.cookie= `token=${datos.access_token}; path=/`
                document.cookie= `id_cliente=${datos.id_cliente}; path=/`
                SesionIniciada.value = true
                emit('LoginExitoso')
                LoginBox.value = {
                    email: "",
                    contrasena: ""
                };
                window.location.reload();
            } else {
                Herror.value = "Usuario o contraseña incorrectos"
                Heror.value = true
            } 
    }
    const IniciarSesionUsuario = async() => {
        const respuesta = await fetch('https://x1sjqnzh-8000.brs.devtunnels.ms/usuario/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LoginBox.value)
        })
        if (respuesta.status === 401) {
            IniciarSesionCliente()
        }
        const datos = await respuesta.json()
            if (respuesta.ok) {
                document.cookie= `token=${datos.access_token}; path=/`
                document.cookie= `id_usuario=${datos.id_usuario}; path=/`
                document.cookie= `id_rol=${datos.id_rol}; path=/`
                SesionIniciada.value = true
                emit('LoginExitoso')
                LoginBox.value = {
                    email: "",
                    contrasena: ""
                }
                window.location.reload()
            } else {
                IniciarSesionCliente()
            } 
    }
    const SubirNuevoCliente = async() => {
        if (NuevoCliente.value.contrasena !== "" || NuevoCliente.value.concontrasena !== "") {
            if (NuevoCliente.value.contrasena !== NuevoCliente.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
            }
        }
        const respuesta = await fetch('https://x1sjqnzh-8000.brs.devtunnels.ms/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoCliente.value)
            })
        if (respuesta.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            return
        }
        const datos = await respuesta.json();
        if (respuesta.ok) {
            NuevoCliente.value = {
                nombre: "",
                email: "",
                dni: "",
                contrasena: ""
            }
            MostrarLogin.value = true
        } else {
            Herror.value = "Error al registrar, revisa tus datos"
            Heror.value = true
        } 
    }
</script>