<template>
    <div 
    v-if="!SesionIniciada"
    class="cuerpo"
    >
        <!-- Iniciar Sesion -->
        <div 
        v-if="MostrarLogin"
        class="m-5"
        >
            <form 
            @submit.prevent="IniciarSesionUsuario" 
            class="popup"
            >
                <h1 class="text-center">
                Iniciar Sesion
                </h1>
                <h2>
                Ingresa tu E-Mail
                </h2>
                <input 
                type="text" 
                v-model="LoginBox.email" 
                placeholder="Email"
                >
                <h2>
                Ingresa tu Contraseña
                </h2>
                <div class="flex">
                    <input 
                    :type="verContrasena ? 'text' : 'password'"
                    v-model="LoginBox.contrasena" 
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
                <div class="botones">
                    <button 
                    type="submit" 
                    class="botoncon">
                    Iniciar Sesion
                    </button>
                </div>
                <h2 
                v-if="Herror"
                class="text-red-500">
                {{ Herror }}
                </h2>
                <h3 class="text-center">
                ¿No Tienes Cuenta?
                </h3>
                <div class="botones">
                    <button 
                    type="button" 
                    @click="MostrarLogin = false; Herror = ''"
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
            class="popup">
                <h1 class="text-center">
                Registrarse
                </h1>
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
                    class="botoncon"
                    >
                    Registrarte
                    </button>
                </div>
                <h2 
                v-if="Herror"
                class="text-red-500">
                {{ Herror }}
                </h2>
                <div class="botones">
                    <h3>
                    ¿Ya Tienes Cuenta?
                    </h3>
                    <button 
                    type="button" 
                    @click="MostrarLogin = true; Herror = ''"
                    class="botont"
                    >
                    Iniciar Sesion
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div v-else>
        <h2>
        ¡Bienvenido a la tienda! 🛒
        </h2>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue';
    import { CerrarSesion, leerCookie } from './Estatus.js'
    // ----- Variantes ----- //
    const Herror = ref("")
    const verContrasena = ref(false)
    const MostrarLogin = ref(true)
    const SesionIniciada = ref(false)
    // ----- Funciones Vue ----- //
    const emit = defineEmits([
        'LoginExitoso'
    ])
    onMounted(() => {
        const tokenGuardado = leerCookie("token")
        if (tokenGuardado) {
            SesionIniciada.value = true
        }
    })
    // ----- Para el Frontend ----- //
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
    // ----- Para el Backend ----- //
    const IniciarSesionUsuario = async() => {
        const respuesta = await fetch('http://localhost:8000/usuario/login/', {
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
    const IniciarSesionCliente = async() => {
        const respuesta = await fetch('http://localhost:8000/cliente/login/', {
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
            } 
    }
    const SubirNuevoCliente = async() => {
        if (NuevoCliente.value.contrasena !== "" || NuevoCliente.value.concontrasena !== "") {
            if (NuevoCliente.value.contrasena !== NuevoCliente.value.concontrasena) {
                alert("❌ Las contraseñas no coinciden. Por favor, verifícalas.")
                return
            }
        }
        const respuesta = await fetch('http://localhost:8000/clientes/', {
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
        } 
    }
</script>