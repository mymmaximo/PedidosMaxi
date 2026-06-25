<template>
    <!-- Confirmacion Eliminar -->
    <Teleport to="body">
        <div 
        v-if="ActualizarCajaCDel" 
        class="fondo"
        >
            <div 
            class="popup"
            >
                <h1>
                ¿Desear Eliminar/Reactivar el Cliente {{ ClienteAct.nombre }}?
                </h1>
                <div
                class="botones">
                    <button 
                    @click="BorrarCliente()"
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
    <!-- Actualizar Cliente -->
    <Teleport to="body">
        <div  
        v-if="ActualizarCajaC"
        class="fondo"
        >
            <div 
            class="popup"
            >
                <h1>
                Actualizar Cliente {{ ClienteAct.nombre }}
                </h1>
                <form @submit.prevent="ActualizarClientes">
                    <h2>
                    Nombre
                    </h2>
                    <input 
                    type="text" 
                    v-model="ClienteAct.nombre" 
                    placeholder="Nombre"
                    maxlength="20"
                    >
                    <h2>
                    E-mail
                    </h2>
                    <input 
                    type="text" 
                    v-model="ClienteAct.email" 
                    placeholder="Email@email.com"
                    maxlength="50"
                    >
                    <div
                    class="botones">
                        <button 
                        type="submit" 
                        :disabled="confirboton"
                        class="botoncon
                        ">
                        Actualizar
                        </button>
                        <button 
                        @click="CerrarPopUp03" 
                        class="botonc">
                        Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
    <div class="cuerpo">
        <div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">
                <div class="bar">
                    <div>
                        <h1
                        @click="MostrarFiltro = !MostrarFiltro ; MostrarNuevo = false"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                        <transition name="slide">
                            <div
                            class="flex flex-col lg:self-center"
                            v-if="MostrarFiltro"
                            >
                                <div
                                class="flex flex-col md:p-4 p-2"
                                >
                                    <h1>
                                    ¿Realizo un Pedido?
                                    </h1>
                                    <div 
                                    class="
                                    flex flex-col
                                    ">
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
                                </div>
                                <div
                                class="flex flex-col p-2"
                                >
                                    <h1>
                                    ¿El Cliente esta Activo?
                                    </h1>
                                    <div 
                                    class="
                                    flex flex-col
                                    ">
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
                                </div>
                                <div
                                class="flex flex-col p-2"
                                >
                                <div 
                                v-if="filtroDirec === 1"
                                >
                                    <h2>
                                    Ciudad del Cliente
                                    </h2>
                                    <select 
                                    v-model="filtrociudad" 
                                    class="sel"
                                    >
                                        <option value="" disabled>
                                        Selecciona una Ciudad...
                                        </option>
                                        <option v-for="i in ListaCiudad" :key="i.ciudad" :value="i.ciudad">
                                        {{ i.ciudad }}
                                        </option>
                                    </select>
                                    <h2>
                                    Provincia del Cliente
                                    </h2>
                                    <select 
                                    v-model="filtroprovincia" 
                                    class="sel">
                                        <option value="" disabled>
                                        Selecciona una Provincia...
                                        </option>
                                        <option v-for="i in ListaProvincia" :key="i.provincia" :value="i.provincia">
                                        {{ i.provincia }}
                                        </option>
                                    </select>
                                </div>
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
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div>
                        <h1
                        @click="MostrarNuevo = !MostrarNuevo ; MostrarFiltro = false"
                        class="botonnew"
                        >
                        +
                        </h1>
                        <transition name="slide">
                            <div
                            class="flex flex-col lg:self-center"
                            v-if="MostrarNuevo"
                            >
                                <h1>
                                Nuevo Cliente
                                </h1>
                                <form @submit.prevent="SubirNuevoCliente">
                                    <h2>
                                    Nombre
                                    </h2>
                                    <input 
                                    type="text" 
                                    v-model="NuevoCliente.nombre" 
                                    placeholder="Nombre"
                                    maxlength="20"
                                    >
                                    <h2>
                                    E-Mail
                                    </h2>
                                    <input 
                                    type="text" 
                                    v-model="NuevoCliente.email" 
                                    placeholder="E-Mail"
                                    maxlength="50"
                                    >
                                    <h2>
                                    Documento
                                    </h2>
                                    <input 
                                    type="text" 
                                    v-model="NuevoCliente.dni" 
                                    placeholder="Documento"
                                    maxlength="8"
                                    >
                                    <h2>
                                    Contraseña
                                    </h2>
                                    <input 
                                    type="text" 
                                    v-model="NuevoCliente.contrasena" 
                                    placeholder="Contraseña"
                                    maxlength="20"
                                    >
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
                        <img 
                        src="../assets/loading.gif" 
                        alt="Cargando clientes..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 
                        class="text-green-800 
                        font-bold text-xl animate-pulse"
                        >
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
                        <button 
                        @click="CargarDatos" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <input
                        @input="BusquedaCliente"
                        type="text" v-model="Busqueda" 
                        placeholder="Busqueda..."
                        class="busqueda"
                        maxlength="50"
                        >
                        <h1 class="text-center">
                        Clientes
                        </h1>
                        <div>
                            <div
                            v-if="clientes.length > 0"
                            >
                                <div
                                class="mb-2 lg:mb-5"
                                v-for= "i in clientes" 
                                :key="i.id">
                                    <div 
                                    :class="Estatuscolor(i.activo)"
                                    class="tab"
                                    >
                                        <div class="flex flex-col">
                                            <div class="flex flex-row">
                                                <h1>
                                                {{ i.nombre }}
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
                                    <div v-if = "DireccionNow === i.id">
                                        <div
                                        v-for = "e in i.direcciones" 
                                        :key="e.id"
                                        class="tab !bg-green-100/50"
                                        >
                                            <div class="flex flex-col">
                                                <div class="flex flex-row">
                                                    <h2>
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Calle: 
                                                    </span>
                                                    {{ e.calle }} 
                                                    {{ e.numero }}
                                                    </h2>
                                                </div>
                                                <div class="flex flex-col">
                                                    <h3>
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Barrio: 
                                                    </span>
                                                    {{ e.barrio }}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div class="flex flex-col ml-auto text-right items-end">
                                                <h2>
                                                <span class="hidden lg:inline 2xl:inline">
                                                Ciudad: 
                                                </span>
                                                {{ e.ciudad }}
                                                </h2>
                                                <h2>
                                                <span class="hidden lg:inline 2xl:inline">
                                                Provincia:  
                                                </span>
                                                {{ e.provincia }}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                    v-if="i.direcciones.length > 0 && DireccionNow === i.id" 
                                    @click= "DireccionCambio(i.id)"
                                    class="botonc"
                                    >
                                    Ocultar Direcciones
                                    </div>
                                    <div
                                    v-else-if="i.direcciones.length > 0 && DireccionNow !== i.id" 
                                    @click= "DireccionCambio(i.id)" 
                                    class="botoncon"
                                    >
                                    Ver Direcciones
                                    </div>
                                    <button
                                    v-else
                                    disabled
                                    class="botont w-full"
                                    >
                                    No hay Direcciones Adjuntas
                                    </button>
                                </div>
                            </div>  
                            <div v-else>
                                <h2>No se encontraran clientes 😔</h2>
                                <h3>Prueba buscando con otro termino</h3>
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
                                🢀
                                </button>
                                <h2 class="item">
                                Items 
                                {{ 0 + Pagina }} 
                                - 
                                {{ Pagina + clientes.length }}
                                </h2>
                                <button 
                                @click="Pagina = Pagina + 20 ; CargarDatos()" 
                                :disabled="clientes.length < 20"
                                class="botona"
                                >
                                🢂
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Barra de Busqueda -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref, computed } from 'vue'
    import { Rol, CerrarSesion, ActualizarCajaC } from './Estatus'
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
    const VentanaFiltro = ref(false)
    const ActualizarCNew = ref(false)
    const ActualizarCajaCDel = ref(false)
    // ----- Variables Vacias ----- //
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
            const respuestac = await fetch("http://localhost:8000/direccion/ciudad")
            const ciudad = await respuestac.json()
            ListaCiudad.value = ciudad
            const respuestap = await fetch("http://localhost:8000/direccion/provincia")
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
    const RecargarPagina = () => {
        window.location.reload()
    }
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		VentanaFiltro.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaCDel.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp03 = () => {
		ActualizarCajaC.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp04 = () => {
		ActualizarCNew.value = true
		document.body.style.overflow = "hidden";
	}
    const AplicarFiltro = () => {
        BusquedaCliente()
        CerrarPopUp01()
        filtrociudad.value = ""
        filtroprovincia.value = ""
    }
	const CerrarPopUp01 = () => {
		VentanaFiltro.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaCDel.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp03 = () => {
		ActualizarCajaC.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp04 = () => {
		ActualizarCNew.value = false
		document.body.style.overflow = "auto";
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
        AbrirPopUp03()
    }
    const Eliminacion = (cliente_fila) => {
        ClienteEli.value = cliente_fila.id
        AbrirPopUp02()
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        }
        else if (id_estatus === false) {
            return "no"
        }
    }
    const LimpiarFiltro = () => {
        filtroDirec.value = 2
        filtroEst.value = 1
        filtrociudad.value = ""
        filtroprovincia.value = ""
        BusquedaCliente();
        CerrarPopUp01();
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
        const ActCliente = await fetch(`http://10.250.4.36:8000/clientes/id/${ClienteAct.value.id}`, {
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
            email: "",
            contrasena: "",
        };
        BusquedaCliente()
        CerrarPopUp03()
    }
    const BorrarCliente = async() => {
        const EraseCliente = await fetch(`http://10.250.4.36:8000/clientes/id/${ClienteEli.value}`, {
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
    const BusquedaCliente = async() => {
        let url = new URL ('http://10.250.4.36:8000/cliente/');
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
        if (filtrociudad.value !== "") {
            url.searchParams.append('filtrociudad', filtrociudad.value)
            filtroAct.value = true            
        }
        if (filtroprovincia.value !== "") {
            url.searchParams.append('filtroprovincia', filtroprovincia.value)
            filtroAct.value = true            
        }
        const BusqCliente = await fetch(url)
        const datos = await BusqCliente.json()
        clientes.value = datos
    }
    const SubirNuevoCliente = async() => {
        const SubidaNuevoCliente = await fetch('http://10.250.4.36:8000/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoCliente.value)
        })
        if (SubidaNuevoCliente.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            return
        }
        NuevoCliente.value = {
            nombre: "",
            email: "",
            dni: "",
            contrasena: ""
        }
        BusquedaCliente()
        CerrarPopUp04()
    }
</script>