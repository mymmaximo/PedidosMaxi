<template>
    <div v-if="!SesionIniciada">
        <div v-if="MostrarLogin">
            <form @submit.prevent="IniciarSesionCliente" class="Texto_Login">
                <input type="text" v-model="LoginCliente.usuario" placeholder="Usuario">
                <input type="text" v-model="LoginCliente.contrasena" placeholder="Contraseña">
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
        <div v-else>
            <form @submit.prevent="SubirNuevoUsuario" class="Texto_Login">
                <input type="text" v-model="NuevoUsuario.usuario" placeholder="Usuario">
                <input type="text" v-model="NuevoUsuario.contrasena" placeholder="Contraseña" maxlength="72">
                <input type="text" v-model="NuevoUsuario.nombre" placeholder="Nombre">
                <input type="text" v-model="NuevoUsuario.apellido" placeholder="Apellido">
                <input type="text" v-model="NuevoUsuario.email" placeholder="E-Mail">
                <input type="text" v-model="NuevoUsuario.dni" placeholder="DNI">
                <button type="submit" class="Boton_Crear">
                Registrarte
                </button>
                <p v-if="Herror">
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
        <h2>¡Bienvenido a la tienda! 🛒</h2>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    const MostrarLogin = ref(true)
    const Herror = ref("")
    const SesionIniciada = ref(false)
    const LoginCliente = ref({
        usuario: "",
        contrasena: ""
    });
    const NuevoUsuario = ref({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        usuario: "",
        contrasena: ""
    });
    const emit = defineEmits(['LoginExitoso']);
    const SubirNuevoUsuario = async() => {
        const respuesta = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoUsuario.value)
            });
        const datos = await respuesta.json();
        if (respuesta.ok) {
            NuevoUsuario.value = {
                nombre: "",
                apellido: "",
                email: "",
                dni: "",
                usuario: "",
                contrasena: ""
            };
            MostrarLogin.value = true
        } else {
            Herror.value = "Error al registrar, revisa tus datos";
        } 
    }
    onMounted(() => {
        const tokenGuardado = localStorage.getItem("token");
        if (tokenGuardado) {
            SesionIniciada.value = true
        }
    })
    const IniciarSesionCliente = async() => {
    const respuesta = await fetch('http://localhost:8000/cliente/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginCliente.value)
    });
    const datos = await respuesta.json();
    if (respuesta.ok) {
        localStorage.setItem(
            "token",
            datos.access_token
        )
        SesionIniciada.value = true
        emit('LoginExitoso');
        LoginCliente.value = {
            usuario: "",
            contrasena: ""
        };
    } else {
        Herror.value = "Usuario o contraseña incorrectos";
    } 
};
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