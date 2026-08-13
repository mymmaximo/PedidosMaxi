<template>
    <div class="cuerpo">
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <!-- Filtros -->
                <div class="bar">
                    <div>
                        <h1 @click="MostrarFiltro = !MostrarFiltro"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                    </div>
                    <transition name="slide">
                        <div v-if="MostrarFiltro"
                        class="flex flex-col self-center"
                        >
                            <div class="flex flex-col md:p-4 p-2">
                                <h1>
                                Ordenar
                                </h1>
                                <select v-model="orden" 
                                placeholder=""
                                >
                                    <option value="" disabled>
                                    Orden...
                                    </option>
                                    <option value="1">
                                    Pedidos Antiguos
                                    </option>
                                    <option value="2">
                                    Pedidos Recientes
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col w-full gap-2.5">
                                <h2>
                                Filtro de Metodo de Pago
                                </h2>
                                <div class="flex flex-col gap-3">
                                    <label>
                                    <input :value="5"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Todos
                                    </label>
                                    <label>
                                    <input :value="4"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Paddle
                                    </label>
                                    <label>
                                    <input :value="3"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Tarjeta de Credito / Debito
                                    </label>
                                    <label>
                                    <input :value="2"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Mercado Pago
                                    </label>
                                    <label>
                                    <input :value="1"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Transferencia Bancaria
                                    </label>
                                    <label>
                                    <input :value="0"
                                    type="radio" 
                                    v-model="filtroMP"
                                    > 
                                    Efectivo
                                    </label>
                                </div>
                                <h2>
                                Filtro de Estatus
                                </h2>
                                <div class="flex flex-col gap-3">
                                    <label>
                                    <input :value="3"
                                    type="radio" 
                                    v-model="filtroEst"
                                    > 
                                    Preparando
                                    </label>
                                    <label>
                                    <input :value="2"
                                    type="radio" 
                                    v-model="filtroEst"
                                    > 
                                    En Camino
                                    </label>
                                    <label>
                                    <input :value="1"
                                    type="radio" 
                                    v-model="filtroEst"
                                    > 
                                    Entregado
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
                        </div>
                    </transition>
                </div>
                <!-- Tabla de Mis Pedidos -->
                <div class="start !px-5">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando tus pedidos..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando tus pedidos, un momento...
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
                        <div>
                            <!-- Barra de Busqueda -->
                            <input @input="BusquedaPedido"
                            type="text" v-model="Busqueda" 
                            placeholder="Busqueda..."
                            class="busqueda"
                            maxlength="50"
                            >
                        </div>
                        <div class="flex-col lg:flex-row">
                        <!-- Tabla de Pedidos en Preparacion -->
                            <h1 class="titulo-config">
                            Mis Pedidos en Preparacion
                            </h1>
                            <div v-if="PedidosEnPreparacion.length > 0"
                            class="w-full"
                            >
                                <div v-for= "i in PedidosEnPreparacion" 
                                :key="i.id_pedido"
                                class="mb-2 lg:mb-5"
                                >
                                    <div  @click="PedidoCambioPreparando(i.id_pedido)"
                                    class="tab !bg-green-200"
                                    >
                                        <div class="flex flex-col">
                                            <div class="flex flex-row">
                                                <h1>
                                                Pedido a
                                                {{ i.direccion[0].calle }} 
                                                {{ i.direccion[0].numero }}
                                                </h1>
                                            </div>
                                            <div class="flex flex-col">
                                                <h2>
                                                <span class="hidden lg:inline 2xl:inline">
                                                Pagado con: 
                                                </span>
                                                {{ i.metodo_pago }}
                                                </h2>
                                                <h2 class="font-bold">
                                                <span class="hidden lg:inline 2xl:inline">
                                                Total:
                                                </span>
                                                $ {{ FormatearPrecio(i.total) }}
                                                </h2>
                                            </div>
                                        </div>
                                        <div class="flex flex-col ml-auto text-right items-end">
                                            <h3>
                                            Tiempo Est. de Entrega: {{ i.tiempo_estimado_entrega }} Dias
                                            </h3>
                                            <h3>
                                            Tiempo de Entrega: {{ i.tiempo_entrega }} Dias
                                            </h3>
                                        </div>
                                    </div>
                                    <div v-if = "PedidoNowPreparando === i.id_pedido">
                                        <div v-for = "e in i.detalle_pedido" 
                                        :key="e.id_detalle_pedido"
                                        class="tab !bg-green-100/50 !p-5 !mx-5 !w-auto"
                                        >
                                            <div class="flex flex-col sm:flex-row gap-3 justify-between w-full">
                                                <div class="flex flex-row">
                                                    <h1 class="font-bold overflow-hidden text-ellipsis">
                                                    {{ e.producto.nombre }}
                                                    </h1>
                                                </div>
                                                <div class="flex flex-col gap-1">
                                                    <h3>
                                                    Categoria: 
                                                    {{ e.producto.categoria }}
                                                    </h3>
                                                    <h3>
                                                    Precio Unitario: $ 
                                                    {{ FormatearPrecio(e.precio_unitario) }}
                                                    </h3>
                                                    <h3>
                                                    Cantidad: {{ e.cantidad }}
                                                    </h3>
                                                    <div class="flex flex-row">
                                                        <h2 class="font-bold mr-2">
                                                        Subtotal:
                                                        </h2>
                                                        <h2>
                                                        $ {{ FormatearPrecio(e.subtotal) }}
                                                        </h2>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col gap-1">
                                                    <div class="flex flex-row">
                                                        <h2 class="mr-2">
                                                        Pedido Creado el Dia: 
                                                        </h2>
                                                        <h3>
                                                        {{ FormatoFecha(i.created_at) }}
                                                        </h3>
                                                    </div>
                                                    <div class="flex flex-row">
                                                        <h3 class="mr-2">
                                                        Pedido Act. el Dia: 
                                                        </h3>
                                                        <h3>
                                                        {{ FormatoFecha(i.updated_at) }}
                                                        </h3>
                                                    </div>
                                                    <div class="flex flex-row">
                                                        <h2 class="font-bold mr-2">
                                                        Ciudad: 
                                                        </h2>
                                                        <h2>
                                                        {{ i.direccion[0].ciudad }}
                                                        </h2>
                                                    </div>
                                                    <div class="flex flex-row">
                                                        <h2 class="font-bold mr-2">
                                                        Provincia:
                                                        </h2>
                                                        <h2>
                                                        {{ i.direccion[0].provincia }}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <h2>
                                No se encontraron Pedidos 😔
                                </h2>
                                <h3>
                                Prueba buscando con otro termino
                                </h3>
                            </div>
                            <div>
                            <!-- Tabla de Pedidos en Camino -->
                                <h1 class="titulo-config !from-yellow-800 !to-yellow-500">
                                Mis Pedidos En Camino
                                </h1>
                                <div v-if="PedidosEnCamino.length > 0"
                                class="w-full"
                                >
                                    <div v-for= "i in PedidosEnCamino" 
                                    :key="i.id_pedido"
                                    class="mb-2 lg:mb-5"
                                    >
                                        <div @click="PedidoCambioEnCamino(i.id_pedido)"
                                        class="tab !from-yellow-200/50"
                                        >
                                            <div class="flex flex-col">
                                                <div class="flex flex-row">
                                                    <h1>
                                                    Pedido a
                                                    {{ i.direccion[0].calle }} 
                                                    {{ i.direccion[0].numero }}
                                                    </h1>
                                                </div>
                                                <div class="flex flex-col">
                                                    <h2>
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Pagado con: 
                                                    </span>
                                                    {{ i.metodo_pago }}
                                                    </h2>
                                                    <h2 class="font-bold">
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Total:
                                                    </span>
                                                    $ {{ FormatearPrecio(i.total) }}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div class="flex flex-col ml-auto text-right items-end">
                                                <h3>
                                                Tiempo Est. de Entrega: {{ i.tiempo_estimado_entrega }} Dias
                                                </h3>
                                                <h3>
                                                Tiempo de Entrega: {{ i.tiempo_entrega }} Dias
                                                </h3>
                                            </div>
                                        </div>
                                        <div v-if = "PedidoNowEnCamino === i.id_pedido">
                                            <div v-for = "e in i.detalle_pedido" 
                                            :key="e.id_detalle_pedido"
                                            class="tab !from-yellow-100 !mx-5 !w-auto"
                                            >
                                                <div class="flex flex-col sm:flex-row gap-3 justify-between w-full">
                                                    <div class="flex flex-row">
                                                        <h1 class="font-bold overflow-hidden text-ellipsis">
                                                        {{ e.producto.nombre }}
                                                        </h1>
                                                    </div>
                                                    <div class="flex flex-col gap-1">
                                                        <h3>
                                                        Categoria: {{ e.producto.categoria }}
                                                        </h3>
                                                        <h3>
                                                        Precio Unitario: $ {{ FormatearPrecio(e.precio_unitario) }}
                                                        </h3>
                                                        <h3>
                                                        Cantidad: {{ e.cantidad }}
                                                        </h3>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Subtotal:
                                                            </h2>
                                                            <h2>
                                                            $ {{ FormatearPrecio(e.subtotal) }}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-col gap-1">
                                                        <div class="flex flex-row">
                                                            <h2 class="mr-2">
                                                            Pedido Creado el Dia: 
                                                            </h2>
                                                            <h3>
                                                            {{ FormatoFecha(i.created_at) }}
                                                            </h3>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h3 class="mr-2">
                                                            Pedido Act. el Dia: 
                                                            </h3>
                                                            <h3>
                                                            {{ FormatoFecha(i.updated_at) }}
                                                            </h3>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Ciudad: 
                                                            </h2>
                                                            <h2>
                                                            {{ i.direccion[0].ciudad }}
                                                            </h2>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Provincia:
                                                            </h2>
                                                            <h2>
                                                            {{ i.direccion[0].provincia }}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <h2>
                                    No se encontraron Pedidos 😔
                                    </h2>
                                    <h3>
                                    Prueba buscando con otro termino
                                    </h3>
                                </div>
                            </div>
                            <!-- Boton Historial -->
                            <div class="botones">
                                <button @click="mostrarhistorial = !mostrarhistorial" 
                                :class="Estatuscolor(mostrarhistorial)"
                                >
                                    <h2 v-if="!mostrarhistorial">
                                    Ver Historial de Pedidos
                                    </h2>
                                    <h2 v-if="mostrarhistorial">
                                    Ocultar Historial de Pedidos
                                    </h2>
                                </button>
                            </div>
                            <!-- Tabla Historial de Pedidos -->
                            <div v-if="mostrarhistorial">
                                <div v-if="PedidosEnHistorial.length > 0"
                                class="w-full"
                                >
                                    <div v-for= "i in PedidosEnHistorial" 
                                    :key="i.id_pedido"
                                    class="mb-2 lg:mb-5"
                                    >
                                        <div @click="PedidoCambioHistorial(i.id_pedido)"
                                        class="tab !from-gray-200"
                                        >
                                            <div class="flex flex-col">
                                                <div class="flex flex-row">
                                                    <h1>
                                                    Pedido a
                                                    {{ i.direccion[0].calle }} 
                                                    {{ i.direccion[0].numero }}
                                                    </h1>
                                                </div>
                                                <div class="flex flex-col">
                                                    <h2>
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Pagado con: 
                                                    </span>
                                                    {{ i.metodo_pago }}
                                                    </h2>
                                                    <h2 class="font-bold">
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Total:
                                                    </span>
                                                    $ {{ FormatearPrecio(i.total) }}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div class="flex flex-col ml-auto text-right items-end">
                                                <h3>
                                                Tiempo Est. de Entrega: {{ i.tiempo_estimado_entrega }} Dias
                                                </h3>
                                                <h3>
                                                Tiempo de Entrega: {{ i.tiempo_entrega }} Dias
                                                </h3>
                                            </div>
                                        </div>
                                        <div v-if = "PedidoNowHistorial === i.id_pedido">
                                            <div v-for = "e in i.detalle_pedido" 
                                            :key="e.id_detalle_pedido"
                                            class="tab !from-gray-100 !mx-5 !w-auto"
                                            >
                                                <div class="flex flex-col sm:flex-row gap-3 justify-between w-full">
                                                    <div class="flex flex-row">
                                                        <h1 class="font-bold overflow-hidden text-ellipsis">
                                                        {{ e.producto.nombre }}
                                                        </h1>
                                                    </div>
                                                    <div class="flex flex-col gap-1">
                                                        <h3>
                                                        Categoria: 
                                                        {{ e.producto.categoria }}
                                                        </h3>
                                                        <h3>
                                                        Precio Unitario: $ 
                                                        {{ FormatearPrecio(e.precio_unitario) }}
                                                        </h3>
                                                        <h3>
                                                        Cantidad: 
                                                        {{ e.cantidad }}
                                                        </h3>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Subtotal:
                                                            </h2>
                                                            <h2>
                                                            $ {{ FormatearPrecio(e.subtotal) }}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-col gap-1">
                                                        <div class="flex flex-row">
                                                            <h2 class="mr-2">
                                                            Pedido Creado el Dia: 
                                                            </h2>
                                                            <h3>
                                                            {{ FormatoFecha(i.created_at) }}
                                                            </h3>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h3 class="mr-2">
                                                            Pedido Act. el Dia: 
                                                            </h3>
                                                            <h3>
                                                            {{ FormatoFecha(i.updated_at) }}
                                                            </h3>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Ciudad: 
                                                            </h2>
                                                            <h2>
                                                            {{ i.direccion[0].ciudad }}
                                                            </h2>
                                                        </div>
                                                        <div class="flex flex-row">
                                                            <h2 class="font-bold mr-2">
                                                            Provincia:
                                                            </h2>
                                                            <h2>
                                                            {{ i.direccion[0].provincia }}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div 
                                v-else
                                >
                                    <h2>
                                    No se encontraron Pedidos 😔
                                    </h2>
                                    <h3>
                                    Prueba buscando con otro termino
                                    </h3>
                                </div>
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
        computed, 
        ref 
    } from 'vue'
    import { 
        ClienteID, 
        urlover8000 
    } from './Estatus.js'
    // ----- Variables Booleanas ----- //
    const filtroAct = ref(false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const MostrarFiltro = ref (false)
    const mostrarhistorial = ref(false)
    // ----- Variables Vacias ----- //
    const orden = ref("")
    const Pedidos = ref([])
    const Busqueda = ref("")
    const PedidoNowEnCamino = ref(null)
    const PedidoNowHistorial = ref(null)
    const PedidoNowPreparando = ref(null)
    // ----- Variables Simples ----- //
    const filtroMP = ref(5)
    const filtroEst = ref(4)
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
    })
    const CargarDatos = (async() => {
        if (!ClienteID.value) return
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
            const respuesta = await fetch(`${urlover8000}/pedidos/cliente/${ClienteID.value}`, {
                credentials: 'include'
            })
            const datos = await respuesta.json()
            Pedidos.value = datos
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
    const PedidosEnPreparacion = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 3)
    })
    const PedidosEnCamino = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 2)
    })
    const PedidosEnHistorial = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 1)
    })
    // ----- Para el Frontend ----- //
    const AplicarFiltro = () => {
        BusquedaPedido()
        MostrarFiltro.value = false
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "botonc"
        }
        else if (id_estatus === false) {
            return "botoncon"
        }
    }
    const FormatoFecha = (fechai) => {
        if (fechai) {
            return new Date(fechai).toLocaleDateString('es-ES')
        }
        else {
            return "Pendiente"
        }
    }
    const FormatearPrecio = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    const LimpiarFiltro = () => {
        filtroMP.value = 5
        filtroEst.value = 4
        BusquedaPedido()
        MostrarFiltro.value = false
        filtroAct.value = false
    }
    const PedidoCambioEnCamino = (id) => {
        if (PedidoNowEnCamino.value === id) {
            PedidoNowEnCamino.value = null
        }
        else {
            PedidoNowEnCamino.value = id
        }
    }
    const PedidoCambioHistorial = (id) => {
        if (PedidoNowHistorial.value === id) {
            PedidoNowHistorial.value = null
        }
        else {
            PedidoNowHistorial.value = id
        }
    }
    const PedidoCambioPreparando = (id) => {
        if (PedidoNowPreparando.value === id) {
            PedidoNowPreparando.value = null
        }
        else {
            PedidoNowPreparando.value = id
        }
    }
    // ----- Para el Backend ----- //
    const BusquedaPedido = async() => {
        let url = new URL (`${urlover8000}/pedidos/cliente/${ClienteID.value}`)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_pedido', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
        }
        let mpfiltro = ""
        if (filtroMP.value === 5) {
            mpfiltro = ""
        }
        else if (filtroMP.value === 4) {
            mpfiltro = "Paddle"
        }
        else if (filtroMP.value === 3) {
            mpfiltro = "Tarjeta de Crédito"
        }
        else if (filtroMP.value === 2) {
            mpfiltro = "MercadoPago"
        }
        else if (filtroMP.value === 1) {
            mpfiltro = "Transferencia"
        }
        else if (filtroMP.value === 0) {
            mpfiltro = "Efectivo"
        }
        if (filtroMP.value !== 5 && mpfiltro !== "") {
            url.searchParams.append('filtromp', mpfiltro)
            filtroAct.value = true
        }
        if (filtroEst.value !== 4) {
            url.searchParams.append('filtroest', filtroEst.value)
            filtroAct.value = true
        }
        const BusqPedido = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await BusqPedido.json()
        Pedidos.value = datos
    }
</script>