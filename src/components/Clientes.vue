<template>
    <input
    @input="BusquedaCliente"
    type="text" v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
    <button @click="AbrirPopUp01" class="botoncentro">
    🗃️Filtros
    </button>
    <button @click="AbrirPopUp10" class="botoncentro">
    Crear Nuevo Cliente
    </button>

    <!-- Filtro -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="VentanaFiltro">
           <div class="caja_editar">
                <h2>
                ¿Realizo un Pedido?
                </h2>
                <div class="caja_radios">
                    <label>
                    <input 
                    type="radio" 
                    :value="1"
                    v-model="filtroDirec"
                    > 
                    Realizo uno o mas Pedidos
                    </label>
                    <label>
                    <input 
                    type="radio" 
                    :value="0"
                    v-model="filtroDirec"
                    > 
                    No Realizo Pedidos
                    </label>
                </div>
                <h2>
                ¿El Cliente esta Activo?
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
                <h2>
                Ciudad del Cliente
                </h2>
                <div class="caja_radios">
                </div>
                <h2>
                Provincia del Cliente
                </h2>
                <div class="caja_radios">
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
        <div class="fondo_oscuro" v-if="ActualizarCajaCDel">
            <div class="caja_editar">
                <h1>
                ¿Desear Eliminar/Reactivar el Cliente?
                </h1>
                <button @click="BorrarCliente()">
                Si Confirmo
                </button>
                <button @click="CerrarPopUp02">
                Cancelar
                </button>
            </div>
        </div>
    </Teleport>
    <!-- Botones Actualizar Cliente -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCajaC">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <button @click="AbrirPopUp04" class="botoncentro">
                Actualizar Nombre y Apellido
                </button>
                <button @click="AbrirPopUp05" class="botoncentro">
                Actualizar E-Mail
                </button>
                <button @click="AbrirPopUp06" class="botoncentro">
                Actualizar Usuario
                </button>
                <button @click="AbrirPopUp07" class="botoncentro">
                Actualizar Contraseña
                </button>
                <button @click="AbrirPopUp08" class="botoncentro">
                Actualizar Rol
                </button>
                <button @click="AbrirPopUp09" class="botoncentro">
                Actualizar Todo
                </button>
                <button @click="CerrarPopUp03" class="Boton_Crear">
                Cancelar
                </button>
            </div>
        </div>
    </Teleport>
    <!-- Nuevo Cliente -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCNew">
            <div class="contenedor_secundario" v-if="Rol === '1'">
                <h1>
                Nuevo Cliente
                </h1>
                <form @submit.prevent="SubirNuevoCliente" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="NuevoCliente.nombre" 
                    placeholder="Nombre"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoCliente.apellido" 
                    placeholder="Apellido"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoCliente.email" 
                    placeholder="E-Mail"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoCliente.dni" 
                    placeholder="Documento"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoCliente.usuario" 
                    placeholder="Usuario"
                    >
                    <input 
                    type="text" 
                    v-model="NuevoCliente.contrasena" 
                    placeholder="Contraseña"
                    >
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
                    <button @click="CerrarPopUp01">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    
    <!-- Actualizar Cliente Nombre y Apellido -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCNombre_Apellido">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="ClienteAct.nombre" 
                    placeholder="Nombre"
                    >
                    <input 
                    type="text" 
                    v-model="ClienteAct.apellido" 
                    placeholder="Apellido"
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
    <!-- Actualizar Cliente Email -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCEmail">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="ClienteAct.email" 
                    placeholder="E-Mail"
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
    <!-- Actualizar Cliente Usuario -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCUsuario">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="ClienteAct.usuario" 
                    placeholder="Usuario"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp06" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Actualizar Cliente Contraseña -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCContrasena">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="ClienteAct.contrasena" 
                    placeholder="Contraseña"
                    >
                    <button type="submit" class="Boton_Crear">
                    Actualizar
                    </button>
                    <button @click="CerrarPopUp07" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Actualizar Cliente Rol -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCRol">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <select v-model="ClienteAct.id_rol" class="seleccion">
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
                    <button @click="CerrarPopUp08" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
    <!-- Actualizar Todo Cliente -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCliente">
            <div class="caja_editar">
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }} {{ ClienteAct.apellido }}
                </h1>
                <form @submit.prevent="ActualizarClientes" class="Texto_producto">
                    <input 
                    type="text" 
                    v-model="ClienteAct.nombre" 
                    placeholder="Nombre"
                    >
                    <input 
                    type="text" 
                    v-model="ClienteAct.apellido" 
                    placeholder="Apellido"
                    >
                    <input 
                    type="text" 
                    v-model="ClienteAct.email" 
                    placeholder="Email@email.com"
                    >
                    <input 
                    type="text" 
                    v-model="ClienteAct.usuario" 
                    placeholder="Usuario"
                    >
                    <input 
                    type="text" 
                    v-model="ClienteAct.contrasena" 
                    placeholder="Contraseña"
                    >
                    <select v-model="ClienteAct.id_rol" class="seleccion">
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
                    <button @click="CerrarPopUp09" class="Boton_Crear">
                    Cancelar
                    </button>
                </form>
            </div>
        </div>
    </Teleport>

    <div class="contenedor">
        <div class="contenedor_principal">
            <h1>
            Clientes
            </h1>
            <div class="contenedor_tabla" v-if="clientes.length > 0">
                <table class="tabla">
                    <thead>
                        <tr>
                            <th>
                            Nombre
                            </th>
                            <th>
                            Apellido
                            </th>
                            <th>
                            Email
                            </th>
                            <th>
                            DNI
                            </th>
                            <th>
                            Direcciones
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
                        <template v-for= "i in clientes" :key="i.id">
                            <tr>
                                <td>
                                {{ i.nombre }}
                                </td>
                                <td>
                                {{ i.apellido }}        
                                </td>
                                <td>
                                {{ i.email }}
                                </td>
                                <td>
                                {{ i.dni }}
                                </td>
                                <td v-if="i.direcciones.length > 0 && DireccionNow === i.id" @click= "DireccionCambio(i.id)" class="boton_ocultar_detalle">
                                Ocultar Direcciones
                                </td>
                                <td v-else-if="i.direcciones.length > 0 && DireccionNow !== i.id" @click= "DireccionCambio(i.id)" class="boton_detalle">
                                Ver Direcciones
                                </td>
                                <td v-else>
                                No hay Direcciones Adjuntas
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
                            <tr v-if = "DireccionNow === i.id">
                                <td colspan="9" class="cajon_direcciones">
                                    <div class="caja_direcciones">
                                        <table class="tabla_direcciones">
                                            <thead class="cabeza_direcciones">
                                                <tr>
                                                    <th>
                                                    Calle
                                                    </th>
                                                    <th>
                                                    Numero
                                                    </th>
                                                    <th>
                                                    Barrio
                                                    </th>
                                                    <th>
                                                    Ciudad
                                                    </th>
                                                    <th>
                                                    Provincia
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for = "e in i.direcciones" :key="e.id">
                                                    <td>
                                                    {{ e.calle }}
                                                    </td>
                                                    <td>
                                                    {{ e.numero }}
                                                    </td>
                                                    <td>
                                                    {{ e.barrio }}
                                                    </td>
                                                    <td>
                                                    {{ e.ciudad }}
                                                    </td>
                                                    <td>
                                                    {{ e.provincia }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>  
            <div v-else>
                <h3>No se encontraran clientes 😔</h3>
                <p>Prueba buscando con otro termino</p>
            </div>
            <div class="contenedor_pagina">
			<button @click="Pagina = Pagina - 20 ; BusquedaCliente()" :disabled="Pagina < 20">
			⬅
			</button>
            <h2>
            Items {{ 0 + Pagina }} - {{ Pagina + clientes.length }}
            </h2>
			<button @click="Pagina = Pagina + 20 ; BusquedaCliente()" :disabled="clientes.length < 20">
			➡
			</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { Rol, CerrarSesion, ActualizarCajaC } from './Estatus';
	const Pagina = ref(0)
    const filtroEst = ref(2)
    const Busqueda = ref("")
    const clientes =  ref([])
    const filtroDirec = ref(2)
    const ClienteEli = ref("")
    const filtroAct = ref(false)
    const DireccionNow = ref(null)
    const VentanaFiltro = ref(false)
    const ActualizarCNew = ref(false)
    const ActualizarCRol = ref(false)
    const ActualizarCEmail = ref(false)
    const ActualizarCliente = ref(false)
    const ActualizarCajaCDel = ref(false)
    const ActualizarCUsuario = ref(false)
    const ActualizarCContrasena = ref(false)
    const ActualizarCNombre_Apellido = ref(false)
    onMounted(async() => {
        BusquedaCliente()
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
		ActualizarCajaCDel.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaCDel.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp03 = () => {
		ActualizarCajaC.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp03 = () => {
		ActualizarCajaC.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp04 = () => {
		ActualizarCNombre_Apellido.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp04 = () => {
		ActualizarCNombre_Apellido.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp05 = () => {
		ActualizarCEmail.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp05 = () => {
		ActualizarCEmail.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp06 = () => {
		ActualizarCUsuario.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp06 = () => {
		ActualizarCUsuario.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp07 = () => {
		ActualizarCContrasena.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp07 = () => {
		ActualizarCContrasena.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp08 = () => {
		ActualizarCRol.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp08 = () => {
		ActualizarCRol.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp09 = () => {
		ActualizarCliente.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp09 = () => {
		ActualizarCliente.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp10 = () => {
		ActualizarCNew.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp10 = () => {
		ActualizarCNew.value = false
		document.body.style.overflow = "auto";
	}
    const Eliminacion = (cliente_fila) => {
        ClienteEli.value = cliente_fila.id
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
    const DireccionCambio = (id) => {
        if (DireccionNow.value === id) {
            DireccionNow.value = null
        }
        else {
            DireccionNow.value = id
        }
    }
    const BorrarCliente = async() => {
        const EraseCliente = await fetch(`http://localhost:8000/clientes/id/${ClienteEli.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        ClienteEli.value = ""
        if (EraseCliente.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return
        }
        BusquedaCliente()
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
    const ClienteAct = ref({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrasena: "",
        id_rol: ""
    })
    const ActualizarClientes = async() => {
        const ClienteUpd = {} 
        if (ClienteAct.value.nombre !== "") {
            ClienteUpd.nombre = ClienteAct.value.nombre
        }
        if (ClienteAct.value.apellido !== "") {
            ClienteUpd.apellido = ClienteAct.value.apellido
        }
        if (ClienteAct.value.email !== "") {
            ClienteUpd.email = ClienteAct.value.email
        }
        if (ClienteAct.value.usuario !== "") {
            ClienteUpd.usuario = ClienteAct.value.usuario
        }
        if (ClienteAct.value.contrasena !== "") {
            ClienteUpd.contrasena = ClienteAct.value.contrasena
        }
        if (ClienteAct.value.id_rol !== "") {
            ClienteUpd.id_rol = ClienteAct.value.id_rol
        }
        const ActCliente = await fetch(`http://localhost:8000/clientes/id/${ClienteAct.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ClienteUpd)
        });
        if (ActCliente.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        ClienteAct.value = {
            id: "",
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
            contrasena: "",
            id_rol: ""
        };
        BusquedaCliente()
        CerrarPopUp03()
        CerrarPopUp04()
        CerrarPopUp05()
        CerrarPopUp06()
        CerrarPopUp07()
        CerrarPopUp08()
        CerrarPopUp09()
    }
    const Edicion = (cliente_fila) => {
        ClienteAct.value.id = cliente_fila.id
        ClienteAct.value.nombre = cliente_fila.nombre
        ClienteAct.value.apellido = cliente_fila.apellido
        ClienteAct.value.email = cliente_fila.email
        ClienteAct.value.usuario = cliente_fila.usuario
        AbrirPopUp03()
    };
    const LimpiarFiltro = () => {
        filtroDirec.value = 2
        filtroEst.value = 1
        BusquedaCliente();
        CerrarPopUp01();
        filtroAct.value = false
    }
    const BusquedaCliente = async() => {
        let url = new URL ('http://localhost:8000/cliente/');
		url.searchParams.append('skip', Pagina.value);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_cliente', Busqueda.value)
        }
        if (filtroDirec.value === 1) {
            url.searchParams.append('bool_direccion', 'true')
            filtroAct.value = true
        }
        if (filtroDirec.value === 0) {
            url.searchParams.append('bool_direccion', 'false')
            filtroAct.value = true
        }
        if (filtroEst.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            filtroAct.value = true
        }
        if (filtroEst.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            filtroAct.value = true
        }
        const BusqCliente = await fetch(url)
        const datos = await BusqCliente.json()
        clientes.value = datos;
    }
    const AplicarFiltro = () => {
        BusquedaCliente()
        CerrarPopUp01()
    }
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
        BusquedaCliente()
        CerrarPopUp10()
    };
</script>

<style scoped>
    h1{
        color: black;
        font-size: x-large;
        margin: 0;
        width: fit-content;
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
