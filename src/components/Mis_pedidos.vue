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
                    <div v-else class="w-full max-w-5xl mx-auto pb-10">
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
                            <h1 class="text-2xl font-black text-green-800 
                            mb-4 border-b-2 border-green-200 pb-2"
                            >
                            📦 Mis Pedidos en Preparacion
                            </h1>
                            <div v-if="PedidosEnPreparacion.length > 0"
                            class="w-full mb-8"
                            >
                                <div v-for= "i in PedidosEnPreparacion" 
                                :key="i.id_pedido"
                                class="mb-4"
                                >
                                    <div  @click="PedidoCambioPreparando(i.id_pedido)"
                                    class="tab"
                                    >
                                        <div class="flex flex-col text-left">
                                            <div class="flex flex-wrap items-center gap-3 mb-2">
                                                <h2 class="text-xl font-black text-gray-800">
                                                📍Pedido a
                                                {{ i.direccion[0].calle }} 
                                                {{ i.direccion[0].numero }}
                                                </h2>
                                                <span class="globoamarillo"
                                                >
                                                ⏳ Preparando
                                                </span>
                                            </div>
                                            <p class="text-gray-500 font-medium text-sm">
                                            💳 Método de Pago: 
                                            <span class="text-gray-800">
                                            {{ i.metodo_pago }}
                                            </span>
                                            </p>
                                            <p class="text-gray-500 font-medium text-sm mt-1">
                                            💰 Total: 
                                            <span class="text-green-700 font-bold text-lg">
                                            ${{ FormatearPrecio(i.total) }}
                                            </span>
                                            </p>
                                        </div>
                                        <div class="lilbox !bg-green-50/50 !border-green-100">
                                            <p class="text-xs text-gray-500 font-bold mb-1">
                                            Tiempo Est. de Entrega: 
                                            <span class="text-gray-800">
                                            {{ i.tiempo_estimado_entrega }} Días
                                            </span>
                                            </p>
                                            <p class="text-xs text-gray-500 font-bold">
                                            Tiempo de Entrega: 
                                            <span class="text-gray-800">
                                            {{ i.tiempo_entrega }} Días
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                    <transition name="slide">
                                        <div v-if = "PedidoNowPreparando === i.id_pedido"
                                        class="liltab !border-green-100/50"
                                        >
                                            <h3 class="text-lg font-bold text-gray-800 
                                            border-b border-gray-100 
                                            mb-3 pb-2">
                                            🛒 Productos del Pedido
                                            </h3>
                                            <div class="flex flex-col gap-2 mb-6">
                                                <div v-for = "e in i.detalle_pedido" 
                                                :key="e.id_detalle_pedido"
                                                class="lilproduct"
                                                >
                                                    <div class="flex flex-col w-full 
                                                    sm:w-1/2 mb-2 sm:mb-0"
                                                    >
                                                        <span class="font-bold text-gray-800 text-base">
                                                        {{ e.producto.nombre }}
                                                        </span>
                                                        <span class="text-xs text-gray-400 font-bold 
                                                        uppercase tracking-wider"
                                                        >
                                                        {{ e.producto.categoria }}
                                                        </span>
                                                    </div>
                                                    <div class="flex flex-row flex-wrap 
                                                    gap-x-6 gap-y-2 
                                                    w-full sm:w-auto 
                                                    justify-between sm:justify-end 
                                                    text-sm"
                                                    >
                                                        <span class="text-gray-500">
                                                        Cant: 
                                                        <b class="text-gray-800">
                                                        {{ e.cantidad }}
                                                        </b>
                                                        </span>
                                                        <span class="text-gray-500">
                                                        Unidad: 
                                                        <b class="text-gray-800">
                                                        ${{ FormatearPrecio(e.precio_unitario) }}
                                                        </b>
                                                        </span>
                                                        <h2 class="font-bold mr-2">
                                                        Subtotal:
                                                        </h2>
                                                        <h2>
                                                        $ {{ FormatearPrecio(e.subtotal) }}
                                                        </h2>
                                                    </div>
                                                </div>
                                                <h3 class="text-lg font-bold text-gray-800 
                                                mb-3 border-b border-gray-100 pb-2"
                                                >
                                                📋 Información de Envío
                                                </h3>
                                                <div class="lildata"
                                                >
                                                    <p class="text-gray-500">
                                                    📅 
                                                    <span class="font-semibold text-gray-800">
                                                    Creado:
                                                    </span> 
                                                    {{ FormatoFecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🔄 
                                                    <span class="font-semibold text-gray-800">
                                                    Actualizado:
                                                    </span> 
                                                    {{ FormatoFecha(i.updated_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🏙️ 
                                                    <span class="font-semibold text-gray-800">
                                                    Ciudad:
                                                    </span> 
                                                    {{ i.direccion[0].ciudad }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🗺️ 
                                                    <span class="font-semibold text-gray-800">
                                                    Provincia:
                                                    </span> 
                                                    {{ i.direccion[0].provincia }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div v-else class="lilelse">
                                <span class="text-4xl mb-3 block">
                                😔
                                </span>
                                <h2 class="text-xl font-bold text-gray-700">
                                No se encontraron Pedidos en Preparación
                                </h2>
                                <p class="mt-1">
                                Intenta ajustando los filtros de búsqueda.
                                </p>
                            </div>
                            <div>
                            <!-- Tabla de Pedidos en Camino -->
                                <h1 class="text-2xl font-black text-blue-800  
                                border-b-2 border-blue-200 
                                pb-2 mt-4 mb-4">
                                🚚 Mis Pedidos En Camino
                                </h1>
                                <div v-if="PedidosEnCamino.length > 0"
                                class="w-full mb-8"
                                >
                                    <div v-for= "i in PedidosEnCamino" 
                                    :key="i.id_pedido"
                                    class="mb-4"
                                    >
                                        <div @click="PedidoCambioEnCamino(i.id_pedido)"
                                        class="tablue"
                                        >
                                            <!-- IZQUIERDA -->
                                            <div class="flex flex-col text-left">
                                                <div class="flex flex-wrap items-center gap-3 mb-2">
                                                    <h2 class="text-xl font-black text-gray-800">
                                                    📍 {{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
                                                    </h2>
                                                    <span class="globoazul"
                                                    >
                                                    💨 En Camino
                                                    </span>
                                                </div>
                                                <p class="text-gray-500 font-medium text-sm">
                                                💳 Método de Pago: 
                                                <span class="text-gray-800">
                                                {{ i.metodo_pago }}
                                                </span>
                                                </p>
                                                <p class="text-gray-500 font-medium text-sm mt-1">
                                                💰 Total: 
                                                <span class="text-blue-700 font-bold text-lg">
                                                ${{ FormatearPrecio(i.total) }}
                                                </span>
                                                </p>
                                            </div>
                                        <div class="lilbox !bg-blue-50/50 !border-blue-100">
                                                <p class="text-xs text-gray-500 font-bold mb-1">
                                                Tiempo Est. de Entrega: 
                                                <span class="text-gray-800">
                                                {{ i.tiempo_estimado_entrega }} Días
                                                </span>
                                                </p>
                                                <p class="text-xs text-gray-500 font-bold">
                                                Tiempo de Entrega: 
                                                <span class="text-gray-800">
                                                {{ i.tiempo_entrega }} Días
                                                </span>
                                                </p>
                                                <div class="text-blue-600 text-sm font-bold 
                                                flex items-center justify-end mt-3 gap-1"
                                                >
                                                {{ PedidoNowEnCamino === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
                                                </div>
                                            </div>
                                        </div>
                                        <transition name="slide">
                                            <div v-if = "PedidoNowEnCamino === i.id_pedido"
                                            class="lilelse !border-blue-100/50 "
                                            >
                                                <h3 class="text-lg font-bold text-gray-800 
                                                mb-3 border-b border-gray-100 pb-2"
                                                >
                                                🛒 Productos del Pedido
                                                </h3>
                                                <div class="flex flex-col gap-2 mb-6">
                                                    <div v-for = "e in i.detalle_pedido" 
                                                    :key="e.id_detalle_pedido"
                                                    class="lilproduct"
                                                    >
                                                        <div class="flex flex-col w-full
                                                        sm:w-1/2 mb-2 sm:mb-0"
                                                        >
                                                            <span class="font-bold text-gray-800 text-base">
                                                            {{ e.producto.nombre }}
                                                            </span>
                                                            <span class="text-xs text-gray-400 font-bold 
                                                            uppercase tracking-wider"
                                                            >
                                                            {{ e.producto.categoria }}
                                                            </span>
                                                        </div>
                                                        <div class="flex flex-row flex-wrap 
                                                        gap-x-6 gap-y-2 
                                                        w-full sm:w-auto 
                                                        justify-between sm:justify-end 
                                                        text-sm"
                                                        >
                                                            <span class="text-gray-500">
                                                            Cant: 
                                                            <b class="text-gray-800">
                                                            {{ e.cantidad }}
                                                            </b>
                                                            </span>
                                                            <span class="text-gray-500">
                                                            Unidad: 
                                                            <b class="text-gray-800">
                                                            ${{ FormatearPrecio(e.precio_unitario) }}
                                                            </b>
                                                            </span>
                                                            <span class="text-blue-700 font-black text-base">
                                                            Sub: ${{ FormatearPrecio(e.subtotal) }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 class="text-lg font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">📋 Información de Envío</h3>
                                                <div class="lildata !bg-blue-50 !border-blue-100"
                                                >
                                                    <p class="text-gray-500">
                                                    📅 <span class="font-semibold text-gray-800">
                                                    Creado:
                                                    </span> 
                                                    {{ FormatoFecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🔄 
                                                    <span class="font-semibold text-gray-800">
                                                    Actualizado:
                                                    </span> 
                                                    {{ FormatoFecha(i.updated_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🏙️ 
                                                    <span class="font-semibold text-gray-800">
                                                    Ciudad:
                                                    </span> 
                                                    {{ i.direccion[0].ciudad }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🗺️ 
                                                    <span class="font-semibold text-gray-800">
                                                    Provincia:
                                                    </span> 
                                                    {{ i.direccion[0].provincia }}
                                                    </p>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div v-else class="lilelse"
                                >
                                <span class="text-4xl mb-3 block">
                                💨
                                </span>
                                <h2 class="text-xl font-bold text-gray-700">
                                No hay Pedidos en Camino
                                </h2>
                                </div>
                            </div>
                            <!-- Boton Historial -->
                            <div class="w-full flex justify-center my-6">
                                <button @click="mostrarhistorial = !mostrarhistorial" 
                                class="boton-guardar 
                                !w-auto !px-8 !py-3 !rounded-full 
                                shadow-md flex items-center gap-2"
                                :class="mostrarhistorial ? '!from-gray-500 !to-gray-700' : ''"
                                >
                                    <span v-if="!mostrarhistorial">
                                    📜 Ver Historial de Pedidos Anteriores
                                    </span>
                                    <span v-if="mostrarhistorial">
                                    ⬆️ Ocultar Historial
                                    </span>
                                </button>
                            </div>
                            <!-- Tabla Historial de Pedidos -->
                            <div v-if="mostrarhistorial">
                                <h1 class="text-2xl font-black text-gray-700 
                                mb-4 border-b-2 border-gray-200 pb-2"
                                >
                                🧾Historial de Pedidos
                                </h1>
                                <div v-if="PedidosEnHistorial.length > 0"
                                class="w-full"
                                >
                                    <div v-for= "i in PedidosEnHistorial" 
                                    :key="i.id_pedido"
                                    class="mb-4 opacity-90 hover:opacity-100 transition-opacity"
                                    >
                                        <div @click="PedidoCambioHistorial(i.id_pedido)"
                                        class="tabgray"
                                        >
                                            <div class="flex flex-col text-left">       
                                                <div class="flex flex-wrap items-center gap-3 mb-2">
                                                    <h2 class="text-xl font-bold text-gray-700">
                                                    📍 {{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
                                                    </h2>
                                                    <span class="globlanco"
                                                    >
                                                    ✅ Entregado
                                                    </span>
                                                </div>
                                                <p class="text-gray-500 font-medium text-sm">
                                                💳 Método de Pago: 
                                                <span class="text-gray-700">
                                                {{ i.metodo_pago }}
                                                </span>
                                                </p>
                                                <p class="text-gray-500 font-medium text-sm mt-1">
                                                💰 Total: 
                                                <span class="text-gray-700 font-bold text-lg">
                                                ${{ FormatearPrecio(i.total) }}
                                                </span>
                                                </p>
                                            </div>
                                            <div class="lilbox"
                                            >
                                                <p class="text-xs text-gray-400 font-bold mb-1">
                                                Tiempo Est. de Entrega: <span class="text-gray-600">
                                                {{ i.tiempo_estimado_entrega }} Días
                                                </span>
                                                </p>
                                                <p class="text-xs text-gray-400 font-bold">
                                                Tiempo Real: 
                                                <span class="text-gray-600">
                                                {{ i.tiempo_entrega }} Días
                                                </span>
                                                </p>
                                                <div class="text-gray-500 text-sm font-bold 
                                                flex items-center justify-end 
                                                mt-3 gap-1"
                                                >
                                                    {{ PedidoNowHistorial === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
                                                </div>
                                            </div>
                                        </div>
                                        <transition name="slide">
                                            <div v-if = "PedidoNowHistorial === i.id_pedido"
                                            class="liltab"
                                            >
                                                <h3 class="text-lg font-bold text-gray-700 
                                                mb-3 border-b border-gray-100 pb-2"
                                                >
                                                🛒 Productos del Pedido
                                                </h3>
                                                <div class="flex flex-col gap-2 mb-6">
                                                    <div v-for = "e in i.detalle_pedido" 
                                                    :key="e.id_detalle_pedido"
                                                    class="lilproduct"
                                                    >
                                                        <div class="flex flex-col 
                                                        w-full sm:w-1/2 mb-2 sm:mb-0"
                                                        >
                                                            <span class="font-bold text-gray-700 text-base">
                                                            {{ e.producto.nombre }}
                                                            </span>
                                                            <span class="text-xs text-gray-400 font-bold 
                                                            uppercase tracking-wider"
                                                            >
                                                            {{ e.producto.categoria }}
                                                            </span>
                                                        </div>
                                                        <div class="flex flex-row flex-wrap 
                                                        gap-x-6 gap-y-2 w-full sm:w-auto 
                                                        justify-between sm:justify-end text-sm"
                                                        >
                                                            <span class="text-gray-500">
                                                            Cant: <b class="text-gray-700">
                                                            {{ e.cantidad }}
                                                            </b>
                                                            </span>
                                                            <span class="text-gray-500">
                                                            Unidad: 
                                                            <b class="text-gray-700">
                                                            ${{ FormatearPrecio(e.precio_unitario) }}
                                                            </b>
                                                            </span>
                                                            <span class="text-gray-700 font-black text-base">
                                                            Sub: ${{ FormatearPrecio(e.subtotal) }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 class="text-lg font-bold text-gray-700 mb-3 
                                                border-b border-gray-100 pb-2"
                                                >
                                                📋 Información de Envío
                                                </h3>
                                                <div class="lildata"
                                                >
                                                    <p class="text-gray-500">
                                                    📅 
                                                    <span class="font-semibold text-gray-700">
                                                    Creado:
                                                    </span> 
                                                    {{ FormatoFecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🔄 
                                                    <span class="font-semibold text-gray-700">
                                                    Entregado:
                                                    </span> 
                                                    {{ FormatoFecha(i.updated_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🏙️ 
                                                    <span class="font-semibold text-gray-700">
                                                    Ciudad:
                                                    </span> 
                                                    {{ i.direccion[0].ciudad }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                    🗺️ 
                                                    <span class="font-semibold text-gray-700">
                                                    Provincia:
                                                    </span> 
                                                    {{ i.direccion[0].provincia }}
                                                    </p>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div v-else class="lilelse"
                                >
                                    <span class="text-4xl mb-3 block">
                                    📂
                                    </span>
                                    <h2 class="text-xl font-bold text-gray-600">
                                    No hay historial de pedidos
                                    </h2>
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