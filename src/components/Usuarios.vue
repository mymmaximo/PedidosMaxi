<template>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <transition name="fade">
            <div v-if="ActualizarCajaUDel" 
            @click.self="CerrarPopUp01"
            class="fondo"
            >
                <div class="popup">
                    <h1>
                    ¿Desear Eliminar/Reactivar el Usuario {{ UsuarioAct.nombre }}?
                    </h1>
                    <div class="botones">
                        <button @click="BorrarUsuario()"
                        class="botoncon"
                        >
                        Si Confirmo
                        </button>
                        <button @click="CerrarPopUp01"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
    <!-- Actualizar Usuario -->
    <Teleport to="body">
        <transition name="fade">
            <div v-if="ActualizarCajaU"
            @click.self="CerrarPopUp02"
            class="fondo"
            >
                <div class="popup">
                    <h1>
                    Actualizar Usuario {{ UsuarioAct.nombre }}
                    </h1>
                    <form @submit.prevent="ActualizarUsuarios">
                        <h2 class="mt-4 mb-2 font-bold text-center text-green-900">
                            Roles Asignados
                        </h2>
                        <!-- Cuadrícula de botones (3 columnas en PC, 2 en móvil) -->
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6 px-4">
                            <button 
                            v-for="rol in ListaRoles" 
                            :key="rol.id"
                            @click="ToggleRol(rol.id)"
                            type="button"
                            class="py-2 px-1 rounded-lg font-bold text-sm transition-all duration-200 shadow-sm border-2"
                            :class="UsuarioAct.id_rol && UsuarioAct.id_rol.includes(rol.id) 
                                ? 'bg-green-600 text-white border-green-700 shadow-inner scale-95' 
                                : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'"
                            >
                                {{ rol.nombre }}
                            </button>
                        </div>
                        <div class="botones">
                            <button :disabled="confirboton"
                            type="submit" 
                            class="botoncon"
                            >
                            Actualizar
                            </button>
                            <button @click="CerrarPopUp02" 
                            class="botonc"
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </Teleport>
    <!-- Tabla de Usuarios -->
    <div class="cuerpo">
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <transition name="fade">
                    <div v-if="(MostrarFiltro || MostrarNuevo)" 
                    @click="MostrarFiltro = false; MostrarNuevo = false"
                    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[35] sm:hidden cursor-pointer"
                    >
                    </div>
                </transition>
                <div :class="[
                    'bar', 
                    (MostrarFiltro || MostrarNuevo) ? 'translate-x-0 sm:w-72 lg:w-80' : '-translate-x-full sm:w-fit sm:translate-x-0'
                ]">
                    <div class="hidden sm:block">
                        <h1 @click="MostrarFiltro = !MostrarFiltro ; MostrarNuevo = false"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                    </div>
                    <transition name="slide">
                        <div v-if="MostrarFiltro"
                        class="flex flex-col lg:self-center"
                        >
                            <div class="flex flex-col md:px-4 md:pb-4 p-2 !pt-0">
                                <h1 class="!mt-0">
                                Ordenar
                                </h1>
                                <select v-model="orden" 
                                placeholder=""
                                >
                                    <option value="" disabled>
                                    Orden...
                                    </option>
                                    <option value="1">
                                    Usuario A-Z
                                    </option>
                                    <option value="2">
                                    Usuario Z-A
                                    </option>
                                    <option value="3">
                                    Mayor Relevancia
                                    </option>
                                    <option value="4">
                                    Menor Relevancia
                                    </option>
                                    <option value="5">
                                    Usuarios Antiguos
                                    </option>
                                    <option value="6">
                                    Usuarios Recientes
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <h1>
                                ¿El Usuario esta Activo?
                                </h1>
                                <label>
                                <input :value="2"
                                type="radio" 
                                v-model="filtroEst"
                                > 
                                Todos los Usuarios
                                </label>
                                <label>
                                <input :value="1"
                                type="radio"
                                v-model="filtroEst"
                                > 
                                Usuario Activo
                                </label>
                                <label>
                                <input :value="0"
                                type="radio" 
                                v-model="filtroEst"
                                > 
                                Usuario Eliminado
                                </label>
                            </div>
                            <div class="botones">
                                <button @click="AplicarFiltro" 
                                class="botoncon"
                                >
                                Aplicar Filtros
                                </button>
                                <button @click="LimpiarFiltro" 
                                v-if="filtroAct === true"
                                class="botont" 
                                >
                                🗑️ Limpiar Filtro
                                </button>
                            </div>
                        </div>
                    </transition>
                    <div>
                        <h1 @click="MostrarNuevo = !MostrarNuevo ; MostrarFiltro = false"
                        class="botonnew"
                        >
                        +
                        </h1>
                    </div>
                    <transition name="slide">
                        <div v-if="MostrarNuevo"
                        class="flex flex-col lg:self-center"
                        >
                            <h1>
                            Nuevo Usuario
                            </h1>
                            <form @submit.prevent="SubirNuevoUsuario">
                                <h2>
                                Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text" 
                                v-model="NuevoUsuario.nombre" 
                                maxlength="50"
                                >
                                <h2>
                                E-Mail
                                </h2>
                                <input placeholder="E-Mail"
                                type="text" 
                                v-model="NuevoUsuario.email" 
                                maxlength="50"
                                >
                                <h2>
                                Documento
                                </h2>
                                <input placeholder="Documento"
                                type="text" 
                                v-model="NuevoUsuario.dni"
                                maxlength="8"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                >
                                <h2>
                                Contraseña
                                </h2>
                                <input placeholder="Contraseña"
                                type="text" 
                                v-model="NuevoUsuario.contrasena"
                                maxlength="30"
                                >
                                <h2>Roles</h2>
                                <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6 px-4">
                                    <button 
                                    v-for="rol in ListaRoles" 
                                    :key="'nuevo-' + rol.id"
                                    @click.prevent="NuevoUsuario.id_rol.includes(rol.id) ? NuevoUsuario.id_rol.splice(NuevoUsuario.id_rol.indexOf(rol.id), 1) : NuevoUsuario.id_rol.push(rol.id)"
                                    type="button"
                                    class="py-2 px-1 rounded-lg font-bold text-sm transition-all duration-200 shadow-sm border-2"
                                    :class="NuevoUsuario.id_rol.includes(rol.id) 
                                        ? 'bg-green-600 text-white border-green-700 shadow-inner scale-95' 
                                        : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'"
                                    >
                                        {{ rol.nombre }}
                                    </button>
                                </div>
                            </form>
                            <div class="botones">
                                <button :disabled="confirboton"
                                type="submit" 
                                class="botoncon"
                                >
                                Crear Cliente
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="start !px-5">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando usuarios..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando usuarios, un momento...
                        </h2>
                    </div>
                    <div v-else-if="ErrorCarga"
                    class="flex flex-col
                    items-center justify-center 
                    w-full h-[60vh] gap-4"
                    >
                        <h1 class="text-3xl font-bold text-red-600 text-center">
                        ¡Ups! La conexión tardó demasiado 🔌
                        </h1>
                        <h2 class="text-xl text-gray-700 text-center px-4">
                        El servidor no responde o tu conexión es inestable.
                        </h2>
                        <div class="mt-6 flex justify-center">
                            <button @click="CargarDatos()" 
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                            🔄 Recargar Página
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <button @click="MostrarFiltro = true"
                        class="sm:hidden w-full mb-4 py-3 bg-white text-green-800 font-black text-lg border-2 border-green-200 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 active:bg-green-50"
                        >
                        ᯤ Abrir Filtros
                        </button>
                        <!-- Barra de Busqueda -->
                        <input @input="BusquedaUsuario"
                        type="text" v-model="Busqueda" 
                        placeholder="Busqueda de Usuarios..."
                        class="busqueda"
                        maxlength="50"
                        >
                        <h1 class="titulo-config">
                        Usuarios
                        </h1>
                        <div v-if="usuarios.length > 0">
                            <div v-for= "i in usuarios" 
                            :key="i.id"
                            class="mb-6 relative"
                            >
                                <div @click="Edicion(i)"
                                class="tarjeta-premium z-10 relative bg-white"
                                >
                                    <div class="tarjeta-info">
                                        <div class="tarjeta-titulo">
                                            👤{{ i.nombre }}
                                                <span :class="Estatuscolor(i.activo)">
                                                {{ Roltxt(i.id_rol) }}
                                                </span>
                                        </div>
                                        <p class="tarjeta-dato">
                                        📧 E-Mail: <span class="tarjeta-valor">
                                        {{ i.email }}
                                        </span>
                                        </p>
                                        <p class="tarjeta-dato">
                                        🪪 DNI: 
                                        <span class="tarjeta-valor">
                                        {{ i.dni }}
                                        </span>
                                        </p>
                                        <p class="tarjeta-dato mb-1">
                                        📅 Creado el: 
                                        <span class="tarjeta-valor">
                                        {{ FormatoFecha(i.created_at) }}
                                        </span>
                                        </p>
                                    </div>
                                    <div class="tarjeta-acciones">
                                        <button @click.stop="Eliminacion(i)" 
                                        v-if="i.activo" 
                                        class="btn-chico-rojo"
                                        >
                                        ❌ Eliminar
                                        </button>
                                        <button v-else @click.stop="Eliminacion(i)"
                                        class="btn-chico-verde"
                                        >
                                        🕊️ Reactivar
                                        </button>
                                        <button @click.stop="Edicion(i)" 
                                        class="btn-chico-gris">
                                        ✏️ Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <div v-else>
                            <h2>
                            No se encontraran usuarios 😔
                            </h2>
                            <h3>
                            Prueba buscando con otro termino
                            </h3>
                        </div>
                        <div class="flex justify-center p-3">
                            <button @click="Pagina = Pagina - 20 ; CargarDatos()" 
                            :disabled="Pagina < 20"
                            class="botona"
                            >
                            ❮
                            </button>
                            <h2 class="item">
                            Items 
                            {{ 0 + Pagina }} 
                            - 
                            {{ Pagina + usuarios.length }}
                            </h2>
                            <button @click="Pagina = Pagina + 20 ; CargarDatos()" 
                            :disabled="usuarios.length < 20"
                            class="botona"
                            >
                            ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //6+
    import { 
        onMounted, 
        ref, 
        computed 
    } from 'vue'
    import { 
        urlover8000, 
        CerrarSesion, 
        SesionExpirada, 
        Iniciado, 
        ActualizarCajaC as ActualizarCajaU 
    } from './Estatus'
    // ----- Variables Vue ----- //
    const confirboton = computed(() =>{
        if (ActualizarUNew.value) {
            const faltandatos01 = 
                NuevoUsuario.value.nombre === ""||
                NuevoUsuario.value.email === ""||
                NuevoUsuario.value.dni === ""||
                NuevoUsuario.value.contrasena === ""||
                NuevoUsuario.value.id_rol.length === 0
            return faltandatos01
        }
        if (ActualizarCajaU.value) {
            const faltandatos02 = 
                UsuarioAct.value.id_rol.length === 0
            return faltandatos02
        }
    })
    // ----- Variables Complejas ----- //
    const NuevoUsuario = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        id_rol: []
    })
    const UsuarioAct = ref({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
        id_rol: []
    })
    const ListaRoles = ref([
        { id: 1, nombre: "Administrador"},
        { id: 2, nombre: "Editor de Productor General"},
        { id: 3, nombre: "Gestor de Pedidos General"},
        { id: 4, nombre: "Gestor de Precios"},
        { id: 5, nombre: "Gestor de Stock"},
        { id: 6, nombre: "Rider"},
        { id: 7, nombre: "Editor de Clientes"}
    ])
    // ----- Variables Booleanas ----- //
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const MostrarNuevo = ref(false)
    const VentanaFiltro = ref(false)
    const MostrarFiltro = ref(false)
    const ActualizarUNew = ref(false)
    const ActualizarCajaUDel = ref(false)
    // ----- Variables Vacias ----- //
    const orden = ref("")
    const Busqueda = ref("")
    const usuarios =  ref([])
    const UsuarioEli = ref("")
    // ----- Variables Simples ----- //
	const Pagina = ref(0)
    const filtroEst = ref(2)
    const filtroAct = ref(false)
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
    })
    const CargarDatos = (async() => {
        CargandoTrue.value = true
        ErrorCarga.value = false
        const temporizador = setTimeout(() => {
            if (CargandoTrue.value) {
                CargandoTrue.value = false
                ErrorCarga.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        try {
            await BusquedaUsuario()
            clearTimeout(temporizador)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(temporizador)
            ErrorCarga.value = true
            CargandoTrue.value = false
        } finally {
            if (!ErrorCarga.value) {
                CargandoTrue.value = false
            }
        }
    })
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaUDel.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaU.value = true
		document.body.style.overflow = "hidden"
	}
    const AplicarFiltro = () => {
        BusquedaUsuario()
    }
	const CerrarPopUp01 = () => {
		ActualizarCajaUDel.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaU.value = false
		document.body.style.overflow = "auto"
	}
    const Edicion = (usuario_fila) => {
        UsuarioAct.value.id = usuario_fila.id
        UsuarioAct.value.nombre = usuario_fila.nombre
        UsuarioAct.value.email = usuario_fila.email
        UsuarioAct.value.id_rol = usuario_fila.id_rol ? [...usuario_fila.id_rol] : []
        AbrirPopUp02()
    }
    const Eliminacion = (usuario_fila) => {
        UsuarioEli.value = usuario_fila.id
        AbrirPopUp01()
    }
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
		}
	}
    const LimpiarFiltro = () => {
        filtroEst.value = 2
        orden.value = ""
        BusquedaUsuario()
        filtroAct.value = false
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true || id_estatus === 1) {
            return "badge-activo"
        }
        else {
            return "badge-inactivo"
        }
    }
    const Roltxt = (array_roles) => {
        if (!Array.isArray(array_roles) || array_roles.length === 0) {
            return "Sin Rol Asignado"
        }
        if (array_roles.length > 1) {
            if (array_roles.includes(1)) return "Admin +"
            return "Multirrol"
        }
        const id_unico = array_roles[0]
        if (id_unico === 1) return "Administrador"
        if (id_unico === 2) return "Editor de Productos Gral."
        if (id_unico === 3) return "Gestor de Pedidos"
        if (id_unico === 4) return "Gestor de Precios"
        if (id_unico === 5) return "Gestor de Stock"
        if (id_unico === 6) return "Rider"
        if (id_unico === 7) return "Editor de Clientes"
        return "Desconocido"
    }
    const ToggleRol = (id_rol) => {
        if (!UsuarioAct.value.id_rol) {
            UsuarioAct.value.id_rol = []
        }
        const index = UsuarioAct.value.id_rol.indexOf(id_rol)
        if (index > -1) {
            UsuarioAct.value.id_rol.splice(index, 1)
        } else {
            UsuarioAct.value.id_rol.push(id_rol)
        }
    }
    // ----- Para el Backend ----- //
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
        if (UsuarioAct.value.id_rol.length > 0) {
            UsuarioUpd.id_rol = UsuarioAct.value.id_rol
        }
        const ActUsuario = await fetch(`${urlover8000}/usuarios/id/${UsuarioAct.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UsuarioUpd),
            credentials: 'include'
        })
        if (ActUsuario.status === 401) {
            await CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        UsuarioAct.value = {
            id: "",
            nombre: "",
            email: "",
            contrasena: "",
            id_rol: []
        }
        BusquedaUsuario()
        CerrarPopUp02()
    }
    const BorrarUsuario = async() => {
        const EraseCliente = await fetch(`${urlover8000}/usuarios/id/${UsuarioEli.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        })
        UsuarioEli.value = ""
        if (EraseCliente.status === 401) {
            await CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        BusquedaUsuario()
        CerrarPopUp01()
    }
    const BusquedaUsuario = async() => {
        let url = new URL (`${urlover8000}/usuarios/`)
		url.searchParams.append('skip', Pagina.value)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_usuario', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
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
        const BusqUsuario = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await BusqUsuario.json()
        usuarios.value = datos
    }
    const SubirNuevoUsuario = async() => {
        const SubidaNuevoUsuario = await fetch(`${urlover8000}/usuarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoUsuario.value),
            credentials: 'include'
        })
        if (SubidaNuevoUsuario.status === 401) {
            await CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        NuevoUsuario.value = {
            nombre: "",
            email: "",
            dni: "",
            contrasena: "",
            id_rol: []
        }
        BusquedaUsuario()
    }
</script>