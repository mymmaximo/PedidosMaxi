<template>
    <div v-if="!SesionIniciada">
        <!-- Iniciar Sesion -->
        <div v-if="MostrarLogin">
            <form @submit.prevent="IniciarSesionUsuario" class="Texto_Login">
                <input 
                type="text" 
                v-model="LoginBox.email" 
                placeholder="Email"
                >
                <div style="display: flex;">
                    <input 
                    :type="verContrasena ? 'text' : 'password'"
                    v-model="LoginBox.contrasena" 
                    placeholder="Contraseña"
                    >
                    <button type="button" @click="verContrasena = !verContrasena">
                    {{ verContrasena ? '🔒' : '👁️' }}
                    </button>
                </div>
                <button type="submit" class="Boton_Iniciar">
                Iniciar Sesion
                </button>
                <p v-if="Herror">
                {{ Herror }}
                </p>
                <p>
                ¿No Tienes Cuenta?
                <button type="button" @click="MostrarLogin = false; Herror = ''">
                Registrate
                </button>
                </p>
            </form>
        </div>
        <!-- Registrarse -->
        <div v-else>
            <form @submit.prevent="SubirNuevoCliente" class="Texto_Login">
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
                placeholder="DNI">
                <button type="submit" class="Boton_Crear">
                Registrarte
                </button>
                <p v-if="Herror" class="classEliminado">
                {{ Herror }}
                </p>
            </form>
            <p>
            ¿Ya Tienes Cuenta?
            <button type="button" @click="MostrarLogin = true; Herror = ''">
            Iniciar Sesion
            </button>
            </p>
        </div>
    </div>
    <div v-else>
        <h2>
        ¡Bienvenido a la tienda! 🛒
        </h2>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { CerrarSesion, leerCookie } from './Estatus.js'
    const Herror = ref("")
    const verContrasena = ref(false)
    const MostrarLogin = ref(true)
    const SesionIniciada = ref(false)
    const emit = defineEmits(['LoginExitoso'])
    onMounted(() => {
        const tokenGuardado = leerCookie("token")
        if (tokenGuardado) {
            SesionIniciada.value = true
        }
    })
    const LoginBox = ref({
        email: "",
        contrasena: ""
    });
    const NuevoCliente = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: ""
    });
    const SubirNuevoCliente = async() => {
        const respuesta = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoCliente.value)
            });
        if (respuesta.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        const datos = await respuesta.json();
        if (respuesta.ok) {
            NuevoCliente.value = {
                nombre: "",
                email: "",
                dni: "",
                contrasena: ""
            };
            MostrarLogin.value = true
        } else {
            Herror.value = "Error al registrar, revisa tus datos";
        } 
    }
    const IniciarSesionUsuario = async() => {
        const respuesta = await fetch('http://localhost:8000/usuario/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LoginBox.value)
        });
        if (respuesta.status === 401) {
            IniciarSesionCliente()
        }
        const datos = await respuesta.json();
            if (respuesta.ok) {
                document.cookie= `token=${datos.access_token}; path=/`
                document.cookie= `id_usuario=${datos.id_usuario}; path=/`
                document.cookie= `id_rol=${datos.id_rol}; path=/`
                SesionIniciada.value = true
                emit('LoginExitoso')
                LoginBox.value = {
                    email: "",
                    contrasena: ""
                };
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
        });
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
</script>

<style scoped>
    .Texto_Login{
        padding: 15px;
        width: fit-content;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    body {
        margin: 0;
        background-color: rgb(46, 42, 169);
    }
</style>