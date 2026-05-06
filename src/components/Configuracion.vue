<template>
    <div class="Texto_producto">
        <div class="caja_config">
            <button @click="AbrirPopUp02" class="botoncentro">
            Actualiza tu Nombre y Apellido
            </button>
            <button @click="AbrirPopUp03" class="botoncentro">
            Actualiza Tu E-Mail
            </button>
            <button @click="AbrirPopUp04" class="botoncentro">
            Actualiza Tu Usuario
            </button>
            <button @click="AbrirPopUp05" class="botoncentro">
            Actualiza Tu Contraseña
            </button>
        </div>
    </div>

    
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCNombre_Apellido">
            <div class="caja_editar">
                <h2>
                Actualizar Nombre y Apellido {{ UsuarioAct.nombre }} {{ UsuarioAct.apellido }}
                </h2>
                <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="UsuarioAct.nombre" 
                    placeholder="Nombre"
                    >
                    <input 
                    type="text" 
                    v-model="UsuarioAct.apellido" 
                    placeholder="Apellido"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp02" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCEmail">
            <div class="caja_editar">
                <h2>
                Actualizar E-Mail {{ UsuarioAct.nombre }} {{ UsuarioAct.apellido }}
                </h2>
                <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="UsuarioAct.email" 
                    placeholder="E-Mail"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp03" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCUsuario">
            <div class="caja_editar">
                <h2>
                Actualizar Usuario {{ UsuarioAct.nombre }} {{ UsuarioAct.apellido }}
                </h2>
                <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="UsuarioAct.usuario" 
                    placeholder="Usuario"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp04" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCContrasena">
            <div class="caja_editar">
                <h2>
                Actualizar Contraseña {{ UsuarioAct.nombre }} {{ UsuarioAct.apellido }}
                </h2>
                <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="UsuarioAct.contrasena" 
                    placeholder="Contraseña"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp05" class="Boton_Crear">
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
    const ActualizarCEmail = ref(false)
    const ActualizarCUsuario = ref(false)
    const ActualizarCContrasena = ref(false)
    const ActualizarCNombre_Apellido = ref(false)
    const rolUsuarioAct = leerCookie("id_rol")
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
	const AbrirPopUp02 = () => {
		ActualizarCNombre_Apellido.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp02 = () => {
		ActualizarCNombre_Apellido.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp03 = () => {
		ActualizarCEmail.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp03 = () => {
		ActualizarCEmail.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp04 = () => {
		ActualizarCUsuario.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp04 = () => {
		ActualizarCUsuario.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp05 = () => {
		ActualizarCContrasena.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp05 = () => {
		ActualizarCContrasena.value = false
		document.body.style.overflow = "auto"
	}
    const UsuarioAct = ref({
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrasena: "",
        id_rol: rolUsuarioAct
    });
    const ActualizarUsuario = async() => {
        const UsuarioUpd = {} 
        if (UsuarioAct.value.nombre !== "") {
            UsuarioUpd.nombre = UsuarioAct.value.nombre
        }
        if (UsuarioAct.value.apellido !== "") {
            UsuarioUpd.apellido = UsuarioAct.value.apellido
        }
        if (UsuarioAct.value.email !== "") {
            UsuarioUpd.email = UsuarioAct.value.email
        }
        if (UsuarioAct.value.usuario !== "") {
            UsuarioUpd.usuario = UsuarioAct.value.usuario
        }
        if (UsuarioAct.value.contrasena !== "") {
            UsuarioUpd.contrasena = UsuarioAct.value.contrasena
        }
        if (UsuarioAct.value.id_rol !== "") {
            UsuarioUpd.id_rol = UsuarioAct.value.id_rol
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
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        CerrarPopUp02()
        CerrarPopUp03()
        CerrarPopUp04()
        CerrarPopUp05()
        UsuarioAct.value = {
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
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
</style>