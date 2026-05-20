<template>
    <div
    class="cuerpo"
    >
        <!-- Barra de Busqueda -->
        <input
        @input="BusquedaUsuario"
        type="text" v-model="Busqueda" 
        placeholder="Busqueda..."
        class="busqueda"
        maxlength="50"
        >
        <!-- Boton de Filtro -->
        <button 
        @click="AbrirPopUp01" 
        class="botoncon"
        >
        🗃️Filtros
        </button>
        <!-- Crear Nuevo Cliente/Usuario -->
        <button 
        @click="AbrirPopUp04" 
        class="botont"
        >
        Crear Nuevo Usuario
        </button>
        <!-- Tabla de Usuarios -->
        <div>
            <div>
                <h1>
                Usuarios
                </h1>
                <div
                v-if="usuarios.length > 0"
                >
                    <table>
                        <thead>
                            <tr>
                                <th
                                class="
                                rounded-ss-2xl 
                                ">
                                Nombre
                                </th>
                                <th>
                                Email
                                </th>
                                <th>
                                DNI
                                </th>
                                <th 
                                v-if="Rol === '1'"
                                >
                                Activo
                                </th>
                                <th 
                                v-if="Rol === '1'"
                                >
                                Rol
                                </th>
                                <th 
                                v-if="Rol === '1'"
                                >
                                Eliminar
                                </th>
                                <th 
                                v-if="Rol === '1'"
                                class="
                                rounded-se-2xl 
                                ">
                                Editar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template 
                            v-for= "i in usuarios" 
                            :key="i.id"
                            >
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
                                    <td 
                                    v-if="Rol === '1'" 
                                    :class="Estatuscolor(i.activo)"
                                    >
                                    {{ Estatustxt(i.activo) }}
                                    </td>
                                    <td 
                                    v-if="Rol === '1'" 
                                    :class="Rolcolor(i.id_rol)"
                                    >
                                    {{ Roltxt(i.id_rol) }}
                                    </td>
                                    <td 
                                    v-if="Rol === '1'"
                                    >
                                    <button 
                                    @click="Eliminacion(i)" 
                                    v-if="i.activo"
                                    >
                                    ❌
                                    </button>
                                    <button 
                                    @click="Eliminacion(i)" 
                                    v-else
                                    >
                                    🕊️
                                    </button>
                                    </td>
                                    <td 
                                    v-if="Rol === '1'"
                                    >
                                    <button 
                                    @click="Edicion(i)" 
                                    >
                                    ✏️
                                    </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>  
                <div 
                v-else>
                    <h2>
                    No se encontraran usuarios 😔
                    </h2>
                    <h3>
                    Prueba buscando con otro termino
                    </h3>
                </div>
                <div 
                class="
                flex justify-center
                ">
                    <button 
                    @click="Pagina = Pagina - 20 ; BusquedaUsuario()" 
                    :disabled="Pagina < 20"
                    class="botona"
                    >
                    ⬅
                    </button>
                    <h2
                    class="
                    self-center p-5
                    ">
                    Items 
                    {{ 0 + Pagina }} 
                    - 
                    {{ Pagina + usuarios.length }}
                    </h2>
                    <button 
                    @click="Pagina = Pagina + 20 ; BusquedaUsuario()" 
                    :disabled="usuarios.length < 20"
                    class="botona"
                    >
                    ➡
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Filtro -->
    <Teleport to="body">
        <div class="fondo" v-if="VentanaFiltro">
           <div class="popup">
                <h1>
                ¿El Usuario esta Activo?
                </h1>
                <div class="flex flex-col">
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
                <div
                class="botones">
                    <button 
                    @click="AplicarFiltro" 
                    class="botoncon"
                    >
                    Filtrar
                    </button>
                    <button 
                    @click="LimpiarFiltro" 
                    v-if="filtroAct === true"
                    class="botont"
                    >
                    🗑️ Limpiar Filtro
                    </button>
                    <button 
                    @click="CerrarPopUp01" 
                    class="botonc"
                    >
                    Cerrar
                    </button>
                </div>
            </div> 
        </div>
    </Teleport>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <div 
        v-if="ActualizarCajaUDel" 
        class="fondo"
        >
            <div 
            class="popup"
            >
                <h1>
                ¿Desear Eliminar/Reactivar el Usuario {{ UsuarioAct.nombre }}?
                </h1>
                <div
                class="botones">
                    <button 
                    @click="BorrarUsuario()"
                    class="botoncon"
                    >
                    Si Confirmo
                    </button>
                    <button 
                    @click="CerrarPopUp02"
                    class="botonc"
                    >
                    Cancelar
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
    <!-- Actualizar Usuario -->
    <Teleport to="body">
        <div 
        v-if="ActualizarCajaU"
        class="fondo"
        >
            <div 
            class="popup"
            >
                <h1>
                Actualizar Usuario {{ UsuarioAct.nombre }}
                </h1>
                <form 
                @submit.prevent="ActualizarUsuarios" 
                >
                    <h2 
                    class="!self-center font-bold"
                    >
                    Rol
                    </h2>
                    <select 
                    v-model="UsuarioAct.id_rol"
                    >
                        <option value="" disabled>
                        Selecciona un Rol...
                        </option>
                        <option value=1>
                        Administrador
                        </option>>
                        <option value=2>
                        Editor de Productos General
                        </option>
                        <option value=3>
                        Gestor de Pedidos General y Editor de Clientes
                        </option>
                        <option value=4>
                        Gestor de Precios
                        </option>
                        <option value=5>
                        Gestor de Stock
                        </option>
                        <option value=6>
                        Rider
                        </option>
                    </select>
                    <div
                    class="botones"
                    >
                        <button 
                        type="submit" 
                        class="botoncon"
                        >
                        Actualizar
                        </button>
                        <button 
                        @click="CerrarPopUp03" 
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Nuevo Usuario -->
    <Teleport to="body">
        <div 
        v-if="ActualizarUNew"
        class="fondo" >
            <div 
            v-if="Rol === '1'"
            class="popup !min-w-[60vh]" 
            >
                <h1>
                Nuevo Usuario
                </h1>
                <form 
                @submit.prevent="SubirNuevoUsuario" 
                >
                    <h2>
                    Nombre
                    </h2>
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.nombre" 
                    placeholder="Nombre"
                    maxlength="50"
                    >
                    <h2>
                    E-Mail
                    </h2>
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.email" 
                    placeholder="E-Mail"
                    maxlength="50"
                    >
                    <h2>
                    Documento
                    </h2>
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.dni" 
                    placeholder="Documento"
                    maxlength="8"
                    >
                    <h2>
                    Contraseña
                    </h2>
                    <input 
                    type="text" 
                    v-model="NuevoUsuario.contrasena" 
                    placeholder="Contraseña"
                    maxlength="30"
                    >
                    <h2>
                    Rol
                    </h2>
                    <select 
                    v-model="NuevoUsuario.id_rol" 
                    >
                        <option value="" disabled>
                        Selecciona un Rol...
                        </option>
                        <option value=1>
                        Administrador
                        </option>>
                        <option value=2>
                        Editor de Productos General
                        </option>
                        <option value=3>
                        Gestor de Pedidos General y Editor de Clientes
                        </option>
                        <option value=4>
                        Gestor de Precios
                        </option>
                        <option value=5>
                        Gestor de Stock
                        </option>
                        <option value=6>
                        Rider
                        </option>
                    </select>
                    <div 
                    class="botones"
                    >
                        <button 
                        type="submit" 
                        class="botoncon"
                        >
                        Crear Cliente
                        </button>
                        <button 
                        @click="CerrarPopUp01"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue';
    import { Rol, CerrarSesion, ActualizarCajaC as ActualizarCajaU } from './Estatus';
    // ----- Variantes ----- //
	const Pagina = ref(0)
    const filtroEst = ref(2)
    const Busqueda = ref("")
    const usuarios =  ref([])
    const UsuarioEli = ref("")
    const filtroAct = ref(false)
    const VentanaFiltro = ref(false)
    const ActualizarUNew = ref(false)
    const ActualizarCajaUDel = ref(false)
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        BusquedaUsuario()
    })
    // ----- Para el Frontend ----- //
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
	const AbrirPopUp04 = () => {
		ActualizarUNew.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp04 = () => {
		ActualizarUNew.value = false
		document.body.style.overflow = "auto";
	}
    const Estatustxt = (id_estatus) => {
        if (id_estatus === true) {
            return "Activo"
        }
        else if (id_estatus === false) {
            return "Eliminado"
        }
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        }
        else if (id_estatus === false) {
            return "no"
        }
    }
    const Roltxt = (id_rol) => {
        if (id_rol === 1) {
            return "Administrador"
        }
        else if (id_rol === 2) {
            return "Editor de Productos Gral."
        }
        else if (id_rol === 3) {
            return "Gestor de Pedidos y Clientes"
        }
        else if (id_rol === 4) {
            return "Gestor de Precios"
        }
        else if (id_rol === 5) {
            return "Gestor de Stock"
        }
        else if (id_rol === 6) {
            return "Rider"
        }
    }
    const Rolcolor = (id_rol) => {
        if (id_rol === 1) {
            return "admin"
        }
        else if (id_rol === 2) {
            return "pgral"
        }
        else if (id_rol === 3) {
            return "pedcli"
        }
        else if (id_rol === 4) {
            return "preci"
        }
        else if (id_rol === 5) {
            return "stoc"
        }
        else if (id_rol === 6) {
            return "rider"
        }
    }
    const AplicarFiltro = () => {
        BusquedaUsuario()
        CerrarPopUp01()
    }
    const LimpiarFiltro = () => {
        filtroEst.value = 1
        BusquedaUsuario();
        CerrarPopUp01();
        filtroAct.value = false
    }
    const NuevoUsuario = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        id_rol: ""
    })
    const UsuarioAct = ref({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
        id_rol: ""
    })
    const Edicion = (usuario_fila) => {
        UsuarioAct.value.id = usuario_fila.id
        UsuarioAct.value.nombre = usuario_fila.nombre
        UsuarioAct.value.apellido = usuario_fila.apellido
        UsuarioAct.value.email = usuario_fila.email
        UsuarioAct.value.usuario = usuario_fila.usuario
        AbrirPopUp03()
    }
    const Eliminacion = (usuario_fila) => {
        UsuarioEli.value = usuario_fila.id
        AbrirPopUp02()
    }
    // ----- Para el Backend ----- //
    const BusquedaUsuario = async() => {
        let url = new URL ('http://localhost:8000/usuarios/');
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
        })
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
        }
        BusquedaUsuario()
        CerrarPopUp03()
    }
    const SubirNuevoUsuario = async() => {
        const SubidaNuevoUsuario = await fetch('http://localhost:8000/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoUsuario.value)
        })
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
        }
        BusquedaUsuario()
        CerrarPopUp04()
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
</script>