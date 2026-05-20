<template>
    <div 
    v-if="!SesionIniciada"
    class="cuerpo"
    >
        <!-- Iniciar Sesion -->
        <div 
        v-if="MostrarLogin"
        >
            <form 
            @submit.prevent="IniciarSesionUsuario" 
            class="popup"
            >
                <input 
                type="text" 
                v-model="LoginBox.email" 
                placeholder="Email"
                class="!w-auto"
                >
                <div>
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
                <button 
                type="submit" 
                class="botoncon">
                Iniciar Sesion
                </button>
                <h2 v-if="Herror">
                {{ Herror }}
                </h2>
                <p>
                ¿No Tienes Cuenta?
                </p>
                <button 
                type="button" 
                @click="MostrarLogin = false; Herror = ''"
                class="botont"
                >
                Registrate
                </button>
            </form>
        </div>
        <!-- Registrarse -->
        <div v-else>
            <form 
            @submit.prevent="SubirNuevoCliente" 
            class="popup">
                <input 
                type="text" 
                v-model="NuevoCliente.email" 
                placeholder="E-Mail"
                >
                <input 
                type="text" 
                v-model="NuevoCliente.contrasena" 
                placeholder="Contraseña" 
                maxlength="72"
                >
                <input 
                type="text" 
                v-model="NuevoCliente.nombre" 
                placeholder="Nombre"
                >
                <input 
                type="text" 
                v-model="NuevoCliente.dni" 
                placeholder="DNI"
                >
                <button 
                type="submit" 
                class="botoncon"
                >
                Registrarte
                </button>
                <p v-if="Herror" class="classEliminado">
                {{ Herror }}
                </p>
                <p>
                ¿Ya Tienes Cuenta?
                </p>
                <button 
                type="button" 
                @click="MostrarLogin = true; Herror = ''"
                class="botont"
                >
                Iniciar Sesion
                </button>
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
        contrasena: ""
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