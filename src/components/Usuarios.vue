<template>
    <!-- Barra de Busqueda -->
    <input
    @input="BusquedaUsuario"
    type="text" v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
    <!-- Boton de Filtro -->
    <button @click="AbrirPopUp01" class="botoncentro">
    🗃️Filtros
    </button>
    <!-- Crear Nuevo Cliente/Usuario -->
    <button @click="AbrirPopUp10" class="botoncentro">
    Crear Nuevo Usuario
    </button>

    <!-- Filtro -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="VentanaFiltro">
           <div class="caja_editar">
                <h2>
                ¿El Usuario esta Activo?
                </h2>
                <div class="caja_radios">
                    <label>
                    <input 
                    type="radio" 
                    :value="2"
                    v-model="filtroEst"
                    > 
                    Todos los Clientes
                    </label>
                    <label>
                    <input 
                    type="radio" 
                    :value="1"
                    v-model="filtroEst"
                    > 
                    Cliente Activo
                    </label>
                    <label>
                    <input 
                    type="radio" 
                    :value="0"
                    v-model="filtroEst"
                    > 
                    Cliente Eliminado
                    </label>
                </div>
                <button @click="AplicarFiltro" class="Boton_Crear">
                Filtrar
                </button>
                <button @click="LimpiarFiltro" class="Boton_Crear" v-if="filtroAct === true">
                🗑️ Limpiar Filtro
                </button>
                <button @click="CerrarPopUp01" class="Boton_Crear">
                Cerrar
                </button>
            </div> 
        </div>
    </Teleport>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCajaUDel">
            <div class="caja_editar">
                <h2>
                ¿Desear Eliminar/Reactivar el Usuario {{ UsuarioAct.nombre }}?
                </h2>
                <button @click="BorrarUsuario()">
                Si Confirmo
                </button>
                <button @click="CerrarPopUp02">
                Cancelar
                </button>
            </div>
        </div>
    </Teleport>
    <!-- Actualizar Cliente -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCajaU">
            <div class="caja_editar">
                <h1>
                Actualizar Usuario {{ UsuarioAct.nombre }}
                </h1>
                <form @submit.prevent="ActualizarUsuarios" class="Texto_producto">
                    <h1>
                    Rol
                    </h1>
                    <select v-model="UsuarioAct.id_rol" class="seleccion">
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
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp03" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Nuevo Cliente -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarUNew">
            <div class="caja_editar" v-if="Rol === '1'">
                <h1>
                Nuevo Cliente
                </h1>
                <form @submit.prevent="SubirNuevoUsuario" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.nombre" 
                    placeholder="Nombre"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.email" 
                    placeholder="E-Mail"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.dni" 
                    placeholder="Documento"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.contrasena" 
                    placeholder="Contraseña"
                    >
                    <select v-model="NuevoUsuario.id_rol" class="seleccion">
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
                    <button @click="CerrarPopUp01">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Tabla de Usuarios -->
    <div class="contenedor">
        <div class="contenedor_principal">
            <h1>
            Usuarios
            </h1>
            <div class="contenedor_tabla" v-if="usuarios.length > 0">
                <table class="tabla">
                    <thead>
                        <tr>
                            <th>
                            Nombre
                            </th>
                            <th>
                            Email
                            </th>
                            <th>
                            DNI
                            </th>
                            <th v-if="Rol === '1'">
                            Activo
                            </th>
                            <th v-if="Rol === '1'">
                            Rol
                            </th>
                            <th v-if="Rol === '1'">
                            Eliminar
                            </th>
                            <th v-if="Rol === '1'">
                            Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for= "i in usuarios" :key="i.id">
                            <tr>
                                <td>
                                {{ i.nombre }}
                                </td>
                                <td>
                                {{ i.email }}
                                </td>
                                <td>
                                {{ i.dni }}
                                </td>
                                <td v-if="Rol === '1'" :class="Estatuscolor(i.activo)">
                                {{ Estatustxt(i.activo) }}
                                </td>
                                <td v-if="Rol === '1'" :class="Rolcolor(i.id_rol)">
                                {{ Roltxt(i.id_rol) }}
                                </td>
                                <td v-if="Rol === '1'">
                                <button @click="Eliminacion(i)" v-if="i.activo" class="botoncentro">
                                ❌
                                </button>
                                <button @click="Eliminacion(i)" v-else class="botoncentro">
                                🕊️
                                </button>
                                </td>
                                <td v-if="Rol === '1'">
                                <button @click="Edicion(i)" class="botoncentro">
                                ✏️
                                </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>  
            <div v-else>
                <h3>No se encontraran usuarios 😔</h3>
                <p>Prueba buscando con otro termino</p>
            </div>
            <div class="contenedor_pagina">
			<button @click="Pagina = Pagina - 20 ; BusquedaUsuario()" :disabled="Pagina < 20">
			⬅
			</button>
            <h2>
            Items {{ 0 + Pagina }} - {{ Pagina + usuarios.length }}
            </h2>
			<button @click="Pagina = Pagina + 20 ; BusquedaUsuario()" :disabled="usuarios.length < 20">
			➡
			</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { Rol, CerrarSesion, ActualizarCajaC as ActualizarCajaU } from './Estatus';
	const Pagina = ref(0)
    const filtroEst = ref(2)
    const Busqueda = ref("")
    const usuarios =  ref([])
    const UsuarioEli = ref("")
    const filtroAct = ref(false)
    const VentanaFiltro = ref(false)
    const ActualizarUNew = ref(false)
    const ActualizarCajaUDel = ref(false)
    onMounted(async() => {
        BusquedaUsuario()
    })
	const AbrirPopUp01 = () => {
		VentanaFiltro.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp01 = () => {
		VentanaFiltro.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaUDel.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaUDel.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp03 = () => {
		ActualizarCajaU.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp03 = () => {
		ActualizarCajaU.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp10 = () => {
		ActualizarUNew.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp10 = () => {
		ActualizarUNew.value = false
		document.body.style.overflow = "auto";
	}
    const Eliminacion = (usuario_fila) => {
        UsuarioEli.value = usuario_fila.id
        AbrirPopUp02()
    }
    const Roltxt = (id_rol) => {
        if (id_rol === 1) {
            return "Administrador"
        }
        else if (id_rol === 2) {
            return "Trabajador"
        }
        else if (id_rol === 3) {
            return "Cliente"
        }
    }
    const Estatustxt = (id_estatus) => {
        if (id_estatus === true) {
            return "Activo"
        }
        else if (id_estatus === false) {
            return "Eliminado"
        }
    }
    const BorrarUsuario = async() => {
        const EraseCliente = await fetch(`http://localhost:8000/usuarios/id/${UsuarioEli.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        UsuarioEli.value = ""
        if (EraseCliente.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return
        }
        BusquedaUsuario()
        CerrarPopUp02()
    }
    const Rolcolor = (id_rol) => {
        if (id_rol === 1) {
            return "classAdmin"
        }
        else if (id_rol === 2) {
            return "classTrabajador"
        }
        else if (id_rol === 3) {
            return "classCliente"
        }
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "classActivo"
        }
        else if (id_estatus === false) {
            return "classEliminado"
        }
    }
    const UsuarioAct = ref({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
        id_rol: ""
    })
    const ActualizarUsuarios = async() => {
        const UsuarioUpd = {} 
        if (UsuarioAct.value.nombre !== "") {
            UsuarioUpd.nombre = UsuarioAct.value.nombre
        }
        if (UsuarioAct.value.email !== "") {
            UsuarioUpd.email = UsuarioAct.value.email
        }
        if (UsuarioAct.value.contrasena !== "") {
            UsuarioUpd.contrasena = UsuarioAct.value.contrasena
        }
        if (UsuarioAct.value.id_rol !== "") {
            UsuarioUpd.id_rol = UsuarioAct.value.id_rol
        }
        const ActUsuario = await fetch(`http://localhost:8000/usuarios/id/${UsuarioAct.value.id}`, {
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
        UsuarioAct.value = {
            id: "",
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
            contrasena: "",
            id_rol: ""
        };
        BusquedaUsuario()
        CerrarPopUp03()
    }
    const Edicion = (usuario_fila) => {
        UsuarioAct.value.id = usuario_fila.id
        UsuarioAct.value.nombre = usuario_fila.nombre
        UsuarioAct.value.apellido = usuario_fila.apellido
        UsuarioAct.value.email = usuario_fila.email
        UsuarioAct.value.usuario = usuario_fila.usuario
        AbrirPopUp03()
    };
    const LimpiarFiltro = () => {
        filtroEst.value = 1
        BusquedaUsuario();
        CerrarPopUp01();
        filtroAct.value = false
    }
    const BusquedaUsuario = async() => {
        let url = new URL ('http://localhost:8000/usuario/');
		url.searchParams.append('skip', Pagina.value);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_usuario', Busqueda.value)
        }
        if (filtroEst.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            filtroAct.value = true
        }
        if (filtroEst.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            filtroAct.value = true
        }
        const BusqUsuario = await fetch(url)
        const datos = await BusqUsuario.json()
        usuarios.value = datos;
    }
    const AplicarFiltro = () => {
        BusquedaUsuario()
        CerrarPopUp01()
    }
    const NuevoUsuario = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        id_rol: ""
    });
    const SubirNuevoUsuario = async() => {
        const SubidaNuevoUsuario = await fetch('http://localhost:8000/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoUsuario.value)
        });
        if (SubidaNuevoUsuario.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        NuevoUsuario.value = {
            nombre: "",
            apellido: "",
            email: "",
            email: "",
            usuario: "",
            contrasena: "",
            id_rol: ""
        };
        BusquedaUsuario()
        CerrarPopUp10()
    };
</script>

<style scoped>
    h1{
        color: black;
        font-size: small;
        margin: 0;
        width: fit-content;
        padding: 0;
    }
    h2{
        color: black;
        font-size: large;
        margin: 0;
        width: fit-content;
        padding: 10px;
    }
    .seleccion{
        padding: 10px;
    }
    .contenedor_tabla {
        border-radius: 15px;
        overflow: hidden;
        border: 2px solid #000000;
    }
    thead{
        background-color: #ffb8b8;
        color: #690000;
        text-align: center;
    }
    .boton_direcciones{
        cursor: pointer;
        background-color: #f8fff1;
        user-select: none;
    }
    .caja_direcciones{
        background-color: #ffffff;
        padding: 10px 10px;
    }
    .cabeza_direcciones{
        background-color: #fccaca;
        color: #4d0000;
        text-align: center;
    }
    .tabla_direcciones{
        width: 100%;
        overflow: hidden;
        border: 1px solid #000000
    }
    .cajon_direcciones{
        padding: 0 !important; 
        background-color: #f9f4f4;
    }
    .botoncentro{
        align-self: center;
    }
    .Texto_cliente{
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .contenedor{
        width: 100%;
        display: flex;
    }
    .Boton_Crear{
        padding: 10px;
        border-radius: 5px;
    }
</style>
