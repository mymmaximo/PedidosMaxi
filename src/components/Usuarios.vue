<template>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <transition name="fade">
            <div v-if="ActualizarCajaUDel" 
            @click.self="CerrarPopUp01"
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
                        @click="CerrarPopUp01"
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
                            </option>
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
                            :disabled="confirboton"
                            class="botoncon"
                            >
                            Actualizar
                            </button>
                            <button 
                            @click="CerrarPopUp02" 
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
    <div class="cuerpo">
        <!-- Tabla de Usuarios -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="bar">
                    <div>
                        <h1
                        @click="MostrarFiltro = !MostrarFiltro ; MostrarNuevo = false"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                    </div>
                    <transition name="slide">
                        <div
                        class="flex flex-col lg:self-center"
                        v-if="MostrarFiltro"
                        >
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h1>
                                Ordenar
                                </h1>
                                <select 
                                v-model="orden" 
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
                            <div
                            class="flex flex-col"
                            >
                                <h1>
                                ¿El Usuario esta Activo?
                                </h1>
                                <label>
                                <input 
                                type="radio" 
                                :value="2"
                                v-model="filtroEst"
                                > 
                                Todos los Usuarios
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="1"
                                v-model="filtroEst"
                                > 
                                Usuario Activo
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="0"
                                v-model="filtroEst"
                                > 
                                Usuario Eliminado
                                </label>
                            </div>
                            <div
                            class="botones"
                            >
                                <button 
                                @click="AplicarFiltro" 
                                class="botoncon">
                                Aplicar Filtros
                                </button>
                                <button 
                                @click="LimpiarFiltro" 
                                v-if="filtroAct === true"
                                class="botont" 
                                >
                                🗑️ Limpiar Filtro
                                </button>
                            </div>
                        </div>
                    </transition>
                    <div>
                        <h1
                        @click="MostrarNuevo = !MostrarNuevo ; MostrarFiltro = false"
                        class="botonnew"
                        >
                        +
                        </h1>
                    </div>
                    <transition name="slide">
                        <div
                        class="flex flex-col lg:self-center"
                        v-if="MostrarNuevo"
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
                                type="number" 
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
                                    </option>
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
                            </form>
                            <div 
                            class="botones"
                            >
                                <button 
                                type="submit" 
                                :disabled="confirboton"
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
                        <img 
                        src="../assets/loading.gif" 
                        alt="Cargando usuarios..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 
                        class="text-green-800 
                        font-bold text-xl animate-pulse"
                        >
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
                        <button 
                        @click="CargarDatos" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <!-- Barra de Busqueda -->
                        <input
                        @input="BusquedaUsuario"
                        type="text" v-model="Busqueda" 
                        placeholder="Busqueda de Usuarios..."
                        class="busqueda"
                        maxlength="50"
                        >
                        <h1 class="text-center">
                        Usuarios
                        </h1>
                        <div
                        v-if="usuarios.length > 0"
                        >
                            <div
                            class="mb-2 lg:mb-5"
                            v-for= "i in usuarios" 
                            :key="i.id">
                                <div 
                                :class="Rolcolor(i.id_rol,i.activo)"
                                class="tab"
                                >
                                    <div class="flex flex-col">
                                        <div class="flex flex-row">
                                            <h1>
                                            {{ i.nombre }} ({{ Roltxt(i.id_rol,i.activo) }})
                                            </h1>
                                        </div>
                                        <div class="flex flex-col">
                                            <h2>
                                            <span class="hidden lg:inline 2xl:inline">
                                            E-Mail: 
                                            </span>
                                            {{ i.email }}
                                            </h2>
                                            <h2>
                                            <span class="hidden lg:inline 2xl:inline">
                                            DNI: 
                                            </span>
                                            {{ i.dni }}
                                            </h2>
                                            <h2>
                                            <span class="hidden lg:inline 2xl:inline">
                                            Usuario creado el: 
                                            </span>
                                            {{ FormatoFecha(i.created_at) }}
                                            </h2>
                                        </div>
                                    </div>
                                    <div class="flex flex-col ml-auto text-right items-end">
                                        <button 
                                        @click="Eliminacion(i)" 
                                        v-if="i.activo"
                                        class="botonc !p-2"
                                        >
                                        ❌
                                        <span class="hidden lg:inline 2xl:inline">
                                        Eliminar
                                        </span>
                                        </button>
                                        <button 
                                        @click="Eliminacion(i)" 
                                        v-else
                                        class="botoncon !p-2"
                                        >
                                        🕊️
                                        <span class="hidden lg:inline 2xl:inline">
                                        Reactivar
                                        </span>
                                        </button>
                                        <button 
                                        @click="Edicion(i)"
                                        class="botont !p-2"
                                        >
                                        ✏️
                                        <span class="hidden lg:inline 2xl:inline">
                                        Editar
                                        </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                        p-3"
                        >
                            <button 
                            @click="Pagina = Pagina - 20 ; CargarDatos()" 
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
                            <button 
                            @click="Pagina = Pagina + 20 ; CargarDatos()" 
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
    // ----- Imports ----- //
    import { onMounted, ref, computed } from 'vue'
    import { urlover8000, CerrarSesion, SesionExpirada, Iniciado, ActualizarCajaC as ActualizarCajaU } from './Estatus'
    // ----- Variables Vue ----- //
    const confirboton = computed(() =>{
        if (ActualizarUNew.value) {
            const faltandatos01 = 
                NuevoUsuario.value.nombre === ""||
                NuevoUsuario.value.email === ""||
                NuevoUsuario.value.dni === ""||
                NuevoUsuario.value.contrasena === ""||
                NuevoUsuario.value.id_rol === ""
            return faltandatos01
        }
        if (ActualizarCajaU.value) {
            const faltandatos02 = 
                UsuarioAct.value.id_rol === ""
            return faltandatos02
        }
    })
    // ----- Variables Complejas ----- //
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
        filtroEst.value = 1
        BusquedaUsuario()
        filtroAct.value = false
    }
    const Rolcolor = (id_rol,activo) => {
        if (activo) {
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
        else {
            return "no"
        }
    }
    const Roltxt = (id_rol,activo) => {
        if (activo) {
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
        } else {
            if (id_rol === 1) {
                return "Ex-Administrador"
            }
            else if (id_rol === 2) {
                return "Ex-Editor de Productos Gral."
            }
            else if (id_rol === 3) {
                return "Ex-Gestor de Pedidos y Clientes"
            }
            else if (id_rol === 4) {
                return "Ex-Gestor de Precios"
            }
            else if (id_rol === 5) {
                return "Ex-Gestor de Stock"
            }
            else if (id_rol === 6) {
                return "Ex-Rider"
            }
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
        if (UsuarioAct.value.id_rol !== "") {
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
            id_rol: ""
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
            id_rol: ""
        }
        BusquedaUsuario()
    }
</script>