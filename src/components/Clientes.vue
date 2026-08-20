<template>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <transition name="fade">
            <div v-if="ActualizarCajaCDel" 
            @click.self="CerrarPopUp02"
            class="fondo"
            >
                <div class="popup">
                    <h1>
                    ¿Desear Eliminar/Reactivar el Cliente {{ ClienteAct.nombre }}?
                    </h1>
                    <div class="botones">
                        <button @click="BorrarCliente()"
                        class="botoncon"
                        >
                        Si Confirmo
                        </button>
                        <button @click="CerrarPopUp02"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
    <!-- Actualizar Cliente -->
    <Teleport to="body">
        <transition name="fade">
            <div v-if="ActualizarCajaC"
            @click.self="CerrarPopUp01"
            class="fondo"
            >
                <div class="popup">
                    <h1>
                    Actualizar Cliente {{ ClienteAct.nombre }}
                    </h1>
                    <form @submit.prevent="ActualizarClientes">
                        <h2>
                        Nombre
                        </h2>
                        <input placeholder="Nombre"
                        type="text" 
                        v-model="ClienteAct.nombre" 
                        maxlength="20"
                        >
                        <h2>
                        E-mail
                        </h2>
                        <input placeholder="Email@email.com"
                        type="text" 
                        v-model="ClienteAct.email" 
                        maxlength="50"
                        >
                        <div class="botones">
                            <button :disabled="confirboton"
                            type="submit" 
                            class="botoncon"
                            >
                            Actualizar
                            </button>
                            <button @click="CerrarPopUp01" 
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
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="bar">
                    <div>
                        <h1 @click="MostrarFiltro = !MostrarFiltro ; MostrarNuevo = false"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                        <transition name="slide">
                            <div v-if="MostrarFiltro"
                            class="flex flex-col lg:self-center"
                            >
                                <div class="flex flex-col md:p-4 p-2">
                                    <h1>
                                    Ordenar
                                    </h1>
                                    <select placeholder=""
                                    v-model="orden" 
                                    >
                                        <option value="" disabled>
                                        Orden...
                                        </option> 
                                        <option value="1">
                                        Nombre A-Z
                                        </option>
                                        <option value="2">
                                        Nombre Z-A
                                        </option>
                                        <option value="3">
                                        Clientes Antiguos
                                        </option>
                                        <option value="4">
                                        Clientes Recientes
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col md:p-4 p-2">
                                    <h1>
                                    ¿Realizo un Pedido?
                                    </h1>
                                    <div class="flex flex-col">
                                        <label>
                                        <input :value="2" 
                                        type="radio"
                                        v-model="filtroDirec"
                                        >
                                        Todos los Clientes
                                        </label>
                                        <label>
                                        <input :value="1"
                                        type="radio" 
                                        v-model="filtroDirec"
                                        > 
                                        Realizo uno o mas Pedidos
                                        </label>
                                        <label>
                                        <input :value="0"
                                        type="radio"
                                        v-model="filtroDirec"
                                        > 
                                        No Realizo Pedidos
                                        </label>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2">
                                    <h1>
                                    ¿El Cliente esta Activo?
                                    </h1>
                                    <div class="flex flex-col">
                                        <label>
                                        <input :value="2"
                                        type="radio" 
                                        v-model="filtroEst"
                                        > 
                                        Todos los Clientes
                                        </label>
                                        <label>
                                        <input :value="1"
                                        type="radio" 
                                        v-model="filtroEst"
                                        > 
                                        Cliente Activo
                                        </label>
                                        <label>
                                        <input :value="0"
                                        type="radio"
                                        v-model="filtroEst"
                                        > 
                                        Cliente Eliminado
                                        </label>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2">
                                <div v-if="filtroDirec === 1">
                                    <h2>
                                    Ciudad del Cliente
                                    </h2>
                                    <select v-model="filtrociudad" 
                                    class="sel"
                                    >
                                        <option value="" disabled>
                                        Selecciona una Ciudad...
                                        </option>
                                        <option v-for="i in ListaCiudad" 
                                        :key="i.ciudad" 
                                        :value="i.ciudad"
                                        >
                                        {{ i.ciudad }}
                                        </option>
                                    </select>
                                    <h2>
                                    Provincia del Cliente
                                    </h2>
                                    <select v-model="filtroprovincia" 
                                    class="sel"
                                    >
                                        <option value="" disabled>
                                        Selecciona una Provincia...
                                        </option>
                                        <option v-for="i in ListaProvincia" 
                                        :key="i.provincia" 
                                        :value="i.provincia"
                                        >
                                        {{ i.provincia }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                                <div class="botones">
                                    <button @click="AplicarFiltro" 
                                    class="botoncon"
                                    >
                                    Filtrar
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
                    </div>
                    <div>
                        <h1 @click="MostrarNuevo = !MostrarNuevo ; MostrarFiltro = false"
                        class="botonnew"
                        >
                        +
                        </h1>
                        <transition name="slide">
                            <div v-if="MostrarNuevo"
                            class="flex flex-col lg:self-center"
                            >
                                <h1>
                                Nuevo Cliente
                                </h1>
                                <form @submit.prevent="SubirNuevoCliente">
                                    <h2>
                                    Nombre
                                    </h2>
                                    <input placeholder="Nombre"
                                    type="text" 
                                    v-model="NuevoCliente.nombre" 
                                    maxlength="20"
                                    >
                                    <h2>
                                    E-Mail
                                    </h2>
                                    <input placeholder="E-Mail"
                                    type="text" 
                                    v-model="NuevoCliente.email" 
                                    maxlength="50"
                                    >
                                    <h2>
                                    Documento
                                    </h2>
                                    <input placeholder="Documento"
                                    type="text"
                                    v-model="NuevoCliente.dni"
                                    maxlength="8"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                    >
                                    <h2>
                                    Contraseña
                                    </h2>
                                    <input placeholder="Contraseña"
                                    type="text"
                                    v-model="NuevoCliente.contrasena"
                                    maxlength="20"
                                    >
                                    <div class="botones">
                                        <button :disabled="confirboton"
                                        type="submit" 
                                        class="botoncon"
                                        >
                                        Crear Cliente
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </transition>
                    </div>
                </div>
                <!-- Tabla de Clientes -->
                <div class="start !px-5">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando clientes..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando clientes, un momento...
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
                        <button @click="CargarDatos" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <input @input="BusquedaCliente"
                        type="text" v-model="Busqueda" 
                        placeholder="Busqueda..."
                        class="busqueda"
                        maxlength="50"
                        >
                        <h1 class="titulo-config">
                        Clientes
                        </h1>
                        <div>
                            <div v-if="clientes.length > 0">
                                <div v-for= "i in clientes"
                                :key="i.id"
                                class="mb-6"
                                >
                                    <div @click= "TocarTab(i)"
                                    class="tarjeta-premium"
                                    >
                                        <div class="tarjeta-info">
                                            <div class="tarjeta-titulo">
                                                👤 {{ i.nombre }}
                                                <span :class="Estatuscolor(i.activo)">
                                                {{ Estatustxt(i.activo) }}
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
                                            <p class="tarjeta-dato">
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
                                    <div v-if="i.direcciones.length === 0" 
                                    class="text-center text-xs 
                                    text-gray-400 font-medium
                                    mt-2 mb-4 
                                    italic">
                                    Sin direcciones adjuntas
                                    </div>
                                    <div v-else-if="DireccionNow !== i.id" 
                                    @click.stop="DireccionCambio(i.id)"
                                    class="text-center text-xs 
                                    text-green-600 font-bold 
                                    mt-2 mb-4 
                                    cursor-pointer 
                                    hover:text-green-800 
                                    transition-colors" >
                                    Ver {{ i.direcciones.length }} Dirección(es) ⬇️
                                    </div>
                                    <div v-else @click.stop="DireccionCambio(i.id)"
                                    class="text-center text-xs 
                                    text-green-600 font-bold 
                                    mt-2 mb-4 
                                    cursor-pointer 
                                    hover:text-green-800 
                                    transition-colors" 
                                    >
                                    Ocultar Direcciones ⬆️
                                    </div>
                                    <transition name="slide">
                                        <div v-if="DireccionNow === i.id && i.direcciones.length > 0" 
                                        class="panel-desplegable"
                                        >
                                            <h3 class="text-lg font-bold 
                                            text-gray-800 
                                            mb-3 pb-2 
                                            border-b border-gray-200"
                                            >
                                            📍 Direcciones Registradas
                                            </h3>
                                            <div class="flex flex-col gap-3">
                                                <div v-for="e in i.direcciones" 
                                                :key="e.id" 
                                                class="flex flex-col 
                                                sm:flex-row
                                                justify-between 
                                                sm:items-center 
                                                bg-white p-4 shadow-sm gap-2
                                                rounded-xl border border-gray-200"
                                                >
                                                    <p class="tarjeta-dato">
                                                    🗺️ Calle: 
                                                    <span class="tarjeta-valor font-bold">
                                                    {{ e.calle }} 
                                                    {{ e.numero }}
                                                    </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                    🏘️ Barrio: 
                                                    <span class="tarjeta-valor">
                                                    {{ e.barrio }}
                                                    </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                    🏙️ Ciudad: 
                                                    <span class="tarjeta-valor">
                                                    {{ e.ciudad }}
                                                    </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                    📍 Prov: 
                                                    <span class="tarjeta-valor">
                                                    {{ e.provincia }}
                                                    </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>  
                            <div v-else>
                                <h2>
                                No se encontraran clientes 😔
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
                                {{ Pagina + clientes.length }}
                                </h2>
                                <button @click="Pagina = Pagina + 20 ; CargarDatos()" 
                                :disabled="clientes.length < 20"
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
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { 
        onMounted, 
        ref, 
        computed 
    } from 'vue'
    import { 
        CerrarSesion, 
        ActualizarCajaC, 
        urlover8000, 
        SesionExpirada, 
        Iniciado 
    } from './Estatus'
    // ----- Variables Vue ----- //
    const confirboton = computed(() =>{
        if (MostrarNuevo.value) {
            const faltandatos01 = 
                NuevoCliente.value.nombre === ""||
                NuevoCliente.value.email === ""||
                !NuevoCliente.value.email.includes("@") ||
                NuevoCliente.value.dni === ""||
                NuevoCliente.value.contrasena === ""
            return faltandatos01
        }
        if (ActualizarCajaC.value) {
            const faltandatos02 = 
                ClienteAct.value.nombre === ""||
                ClienteAct.value.email === ""
            return faltandatos02
        }
    })
    // ----- Variables Complejas ----- //
    const ClienteAct = ref({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
    })
    const NuevoCliente = ref({
        nombre: "",
        email: "",
        dni: "",
        contrasena: ""
    })
    // ----- Variables Booleanas ----- //
    const filtroAct = ref(false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const MostrarNuevo = ref(false)
    const MostrarFiltro = ref(false)
    const ActualizarCajaCDel = ref(false)
    // ----- Variables Vacias ----- //
    const orden = ref("")
    const Busqueda = ref("")
    const clientes =  ref([])
    const ClienteEli = ref("")
    const ListaCiudad = ref ("")
    const filtrociudad = ref ("")
    const ListaProvincia = ref ("")
    const filtroprovincia = ref ("")
    // ----- Variables Simples ----- //
	const Pagina = ref(0)
    const filtroEst = ref(2)
    const filtroDirec = ref(2)
    const DireccionNow = ref(null)
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
            await BusquedaCliente()
            const respuestac = await fetch(`${urlover8000}/direccion/ciudad/`)
            const ciudad = await respuestac.json()
            ListaCiudad.value = ciudad
            const respuestap = await fetch(`${urlover8000}/direccion/provincia/`)
            const provincia = await respuestap.json()
            ListaProvincia.value = provincia
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
		ActualizarCajaC.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaCDel.value = true
		document.body.style.overflow = "hidden"
	}
    const AplicarFiltro = () => {
        BusquedaCliente()
        filtrociudad.value = ""
        filtroprovincia.value = ""
    }
	const CerrarPopUp01 = () => {
		ActualizarCajaC.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaCDel.value = false
		document.body.style.overflow = "auto"
	}
    const DireccionCambio = (id) => {
        if (DireccionNow.value === id) {
            DireccionNow.value = null
        }
        else {
            DireccionNow.value = id
        }
    }
    const Edicion = (cliente_fila) => {
        ClienteAct.value.id = cliente_fila.id
        ClienteAct.value.nombre = cliente_fila.nombre
        ClienteAct.value.email = cliente_fila.email
        AbrirPopUp01()
    }
    const Eliminacion = (cliente_fila) => {
        ClienteEli.value = cliente_fila.id
        ClienteAct.value.nombre = cliente_fila.nombre
        AbrirPopUp02()
    }
    
    const TocarTab = (cliente) => {
        if (!cliente.direcciones || cliente.direcciones.length === 0) {
            Eliminacion(cliente)
        } else {
            DireccionCambio(cliente.id)
        }
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true || id_estatus === 1) {
            return "badge-activo"
        }
        else {
            return "badge-inactivo"
        }
    }
	const Estatustxt = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅ Activo"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌ Inactivo"
        }
        return "Indefinido"
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
        filtroDirec.value = 2
        filtroEst.value = 2
        filtrociudad.value = ""
        filtroprovincia.value = ""
        orden.value = ""
        BusquedaCliente()
        filtroAct.value = false
    }
    // ----- Para el Backend ----- //
    const ActualizarClientes = async() => {
        const ClienteUpd = {} 
        if (ClienteAct.value.nombre !== "") {
            ClienteUpd.nombre = ClienteAct.value.nombre
        }
        if (ClienteAct.value.email !== "") {
            ClienteUpd.email = ClienteAct.value.email
        }
        if (ClienteAct.value.contrasena !== "") {
            ClienteUpd.contrasena = ClienteAct.value.contrasena
        }
        const ActCliente = await fetch(`${urlover8000}/clientes/id/${ClienteAct.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ClienteUpd),
            credentials: 'include'
        })
        if (ActCliente.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        ClienteAct.value = {
            id: "",
            nombre: "",
            email: "",
            contrasena: "",
        }
        BusquedaCliente()
        CerrarPopUp01()
    }
    const BorrarCliente = async() => {
        const EraseCliente = await fetch(`${urlover8000}/clientes/id/${ClienteEli.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        })
        ClienteEli.value = ""
        if (EraseCliente.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        BusquedaCliente()
        CerrarPopUp02()
    }
    const BusquedaCliente = async() => {
        let url = new URL (`${urlover8000}/cliente/`)
		url.searchParams.append('skip', Pagina.value)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_cliente', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
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
        if (filtrociudad.value !== "") {
            url.searchParams.append('filtrociudad', filtrociudad.value)
            filtroAct.value = true            
        }
        if (filtroprovincia.value !== "") {
            url.searchParams.append('filtroprovincia', filtroprovincia.value)
            filtroAct.value = true            
        }
        const BusqCliente = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await BusqCliente.json()
        clientes.value = datos
    }
    const SubirNuevoCliente = async() => {
        const SubidaNuevoCliente = await fetch(`${urlover8000}/clientes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoCliente.value),
            credentials: 'include'
        })
        if (SubidaNuevoCliente.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        NuevoCliente.value = {
            nombre: "",
            email: "",
            dni: "",
            contrasena: ""
        }
        BusquedaCliente()
    }
</script>