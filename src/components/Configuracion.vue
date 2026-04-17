<template>
    <div class="contenedor">
        <div class="contenedor_principal">
            <div class="contenedor_secundario" v-if="Rol === '1'">
            <h1>
                Nuevo Cliente
            </h1>
            <form @submit.prevent="SubirNuevoCliente" class="Texto_producto">
                <input type="text" v-model="NuevoCliente.nombre" placeholder="Nombre">
                <input type="text" v-model="NuevoCliente.apellido" placeholder="Apellido">
                <input type="text" v-model="NuevoCliente.email" placeholder="E-Mail">
                <input type="text" v-model="NuevoCliente.dni" placeholder="Documento">
                <input type="text" v-model="NuevoCliente.usuario" placeholder="Usuario">
                <input type="text" v-model="NuevoCliente.contrasena" placeholder="Contraseña">
                <input type="text" v-model="NuevoCliente.id_rol" placeholder="Rol 1.Adm 2. Trabajador 3.Cliente">
                <button type="submit" class="Boton_Crear">
                    Crear Cliente
                </button>
            </form>
            </div>
            <div class="contenedor_secundario" v-if="Rol === '1'">
            <h1>
                Actualizar Cliente
            </h1>
            <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                <input type="text" v-model="ClienteAct.id" placeholder="ID">
                <input type="text" v-model="ClienteAct.nombre" placeholder="Nombre">
                <input type="text" v-model="ClienteAct.apellido" placeholder="Apellido">
                <input type="text" v-model="ClienteAct.email" placeholder="E-Mail">
                <input type="text" v-model="ClienteAct.usuario" placeholder="Usuario">
                <input type="text" v-model="ClienteAct.contrasena" placeholder="Contraseña">
                <input type="text" v-model="ClienteAct.id_rol" placeholder="Rol 1.Adm 2. Trabajador 3.Cliente">
                <button type="submit" class="Boton_Crear">
                Actualizar
                </button>
            </form>
            </div>
            <div class="contenedor_secundario">
            <h1>
                Actualizar Usuario
            </h1>
            <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
                <input type="text" v-model="UsuarioAct.nombre" placeholder="Nombre">
                <input type="text" v-model="UsuarioAct.apellido" placeholder="Apellido">
                <input type="text" v-model="UsuarioAct.email" placeholder="E-Mail">
                <input type="text" v-model="UsuarioAct.usuario" placeholder="Usuario">
                <input type="text" v-model="UsuarioAct.contrasena" placeholder="Contraseña">
                <button type="submit" class="Boton_Crear">
                Actualizar Datos
                </button>
            </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { CarritoLocal, VentanaComprar, CerrarSesion, Rol, leerCookie } from './Estatus.js';
    onMounted(async() => {
        const idUsuarioAct = leerCookie("id_cliente");
        if (idUsuarioAct) {
            const respuesta = await fetch(`http://localhost:8000/cliente/?id_cliente=${idUsuarioAct}`);
            const datos = await respuesta.json();
            if (datos.length > 0) {
            const miPerfil = datos[0];
                UsuarioAct.value.nombre = miPerfil.nombre;
                UsuarioAct.value.apellido = miPerfil.apellido;
                UsuarioAct.value.email = miPerfil.email;
                UsuarioAct.value.usuario = miPerfil.usuario;
            }
        }
    })
    const rolUsuarioAct = leerCookie("id_rol");
    const UsuarioAct = ref({
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrasena: "",
        id_rol: rolUsuarioAct
    });
    const ActualizarUsuario = async() => {
        const idUsuarioAct = leerCookie("id_cliente");
        const ActUsuario = await fetch(`http://localhost:8000/clientes/id/${idUsuarioAct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UsuarioAct.value)
        });
        if (ActUsuario.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        UsuarioAct.value = {
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
            contrasena: ""
        };
        const respuesta = await fetch("http://localhost:8000/clientes/");
        const datos = await respuesta.json();
    };
    const NuevoCliente = ref({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        usuario: "",
        contrasena: "",
        id_rol: ""
    });
    const SubirNuevoCliente = async() => {
        const SubidaNuevoCliente = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoCliente.value)
        });
        if (SubidaNuevoCliente.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        NuevoCliente.value = {
            nombre: "",
            apellido: "",
            email: "",
            email: "",
            usuario: "",
            contrasena: "",
            id_rol: ""
        };
        const respuesta = await fetch('http://localhost:8000/clientes/');
        const datos = await respuesta.json();
        Clientes.value = datos;
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
</style>