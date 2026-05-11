<template>
    <!-- Actualizar Datos -->
    <div class="Texto_producto">
        <form @submit.prevent="ActualizarCliente" class="caja_config">
            <h2>
            Actualizar Usuario {{ ClienteConfig.nombre }}
            </h2>
            <h1>
            Nombre
            </h1>
            <input 
            type="text" 
            v-model="ClienteConfig.nombre" 
            placeholder="Nombre"
            >
            <h1>
            E-mail
            </h1>
            <input 
            type="text" 
            v-model="ClienteConfig.email" 
            placeholder="Email@email.com"
            >
            <h1>
            Contraseña
            </h1>
            <div style="display: flex;">
                <input 
                :type="verContrasena ? 'text' : 'password'"
                v-model="ClienteConfig.contrasena" 
                placeholder="Contraseña"
                >
                <button type="button" @click="verContrasena = !verContrasena">
                {{ verContrasena ? '🔒' : '👁️' }}
                </button>
            </div>
            <h1>
            Confirmar Contraseña
            </h1>
            <div style="display: flex;">
                <input 
                :type="verConContrasena ? 'text' : 'password'"
                v-model="ClienteConfig.concontrasena" 
                placeholder="Contraseña"
                >
                <button type="button" @click="verConContrasena = !verConContrasena">
                {{ verConContrasena ? '🔒' : '👁️' }}
                </button>
            </div>
            <button type="submit" class="Boton_Crear">
            Actualizar
            </button>
        </form>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { CerrarSesion, leerCookie } from './Estatus.js';
    const verContrasena = ref(false)
    const verConContrasena = ref(false)
    onMounted(async() => {
        const idConfig = leerCookie("id_cliente");
        if (idConfig) {
            const respuesta = await fetch(`http://localhost:8000/cliente/?id_cliente=${idConfig}`);
            const datos = await respuesta.json();
            if (datos.length > 0) {
                const miPerfil = datos.find(cliente => cliente.id === parseInt(idConfig))
                if (miPerfil) {
                    ClienteConfig.value.nombre = miPerfil.nombre
                    ClienteConfig.value.email = miPerfil.email
                    ClienteConfig.value.usuario = miPerfil.usuario
                }
            }
        }
    })
    const ClienteConfig = ref({
        nombre: "",
        email: "",
        contrasena: "",
        concontrasena: ""
    });
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
        const idUsuarioAct = leerCookie("id_cliente");
        const ActUsuario = await fetch(`http://localhost:8000/clientes/id/${idUsuarioAct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UsuarioUpd)
        });
        if (ActUsuario.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return
        }
        ClienteConfig.value = {
            nombre: "",
            email: "",
            contrasena: ""
        };
    };
</script>

<style scoped>
    .contenedor_principal {
        display: flex;
        width: fit-content;
        border-radius: 10px;
        overflow: hidden;
        padding: 10px;
    }
    .caja_config{
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        background-color: rgb(166, 133, 228);
	    border: 2px solid #000000;
        border-radius: 5px;
        overflow: hidden;
        width: 40%;
        align-self: center;
    }
    h1{
        font: 1em sans-serif;
        color: #000000;
        padding: 0;
    }
</style>