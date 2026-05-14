<template>
    <!-- Actualizar Datos -->
    <div class="cuerpo">
        <form 
        @submit.prevent="ActualizarCliente"
        class="p-8" 
        >
            <h1>
            Actualizar Usuario 
            {{ ClienteConfig.nombre }}
            </h1>
            <h2>
            Nombre
            </h2>
            <input 
            type="text" 
            v-model="ClienteConfig.nombre" 
            placeholder="Nombre"
            class="!self-start"
            >
            <h2>
            E-mail
            </h2>
            <input 
            type="text" 
            v-model="ClienteConfig.email" 
            placeholder="Email@email.com"
            class="!self-start !w-auto"
            >
            <h2>
            Contraseña
            </h2>
            <div>
                <input 
                :type="verContrasena ? 'text' : 'password'"
                v-model="ClienteConfig.contrasena" 
                placeholder="Contraseña"
                class="!p-2"
                >
                <button 
                type="button" 
                @click="verContrasena = !verContrasena"
                class="!p-1"
                >
                {{ verContrasena ? '🔒' : '👁️' }}
                </button>
            </div>
            <h2>
            Confirmar Contraseña
            </h2>
            <div>
                <input 
                :type="verConContrasena ? 'text' : 'password'"
                v-model="ClienteConfig.concontrasena" 
                placeholder="Contraseña"
                class="!p-2"
                >
                <button 
                type="button" 
                @click="verConContrasena = !verConContrasena"
                class="botont !p-1"
                >
                {{ verConContrasena ? '🔒' : '👁️' }}
                </button>
            </div>
            <div class="p-5">
                <button 
                type="submit" 
                class="botoncon"
                >
                Actualizar
                </button>
            </div>
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