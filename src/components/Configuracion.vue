<template>
    <button @click="AbrirPopUp2" class="botoncentro">
        Actualizar Tu Usuario
    </button>
    <button @click="AbrirPopUp1" class="botoncentro">
        Crear Nuevo Cliente
    </button>
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCNew">
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
                    <select v-model="NuevoCliente.id_rol" class="seleccion">
                        <option value="" disabled>
                        Selecciona un Rol...
                        </option>
                        <option value=1>
                        Administrador
                        </option>>
                        <option value=2>
                        Trabajador
                        </option>
                        <option value=3>
                        Cliente
                        </option>
                    </select>
                    <button type="submit" class="Boton_Crear">
                    Crear Cliente
                    </button>
                    <button @click="CerrarPopUp1">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>   
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarC">
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
                    <button @click="CerrarPopUp2">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport> 
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { CerrarSesion, Rol, leerCookie } from './Estatus.js';
    const ActualizarCNew = ref(false)
    const ActualizarC = ref(false)
    const rolUsuarioAct = leerCookie("id_rol");
	const AbrirPopUp1 = () => {
		ActualizarCNew.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp1 = () => {
		ActualizarCNew.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp2 = () => {
		ActualizarC.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp2 = () => {
		ActualizarC.value = false
		document.body.style.overflow = "auto";
	}
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
        CerrarPopUp2()
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
        CerrarPopUp1()
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