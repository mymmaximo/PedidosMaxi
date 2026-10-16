<template>
    <div class="cuerpo">

        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">

                <!-- Mostrar Fondo en Celular -->
                <Teleport to="body">
                    <transition name="fade">
                        <div v-if="(Mostrar_Filtro || Mostrar_Nuevo)" 
                        @click="Mostrar_Filtro = false; Mostrar_Nuevo = false"
                        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>

                <!-- Barra de Filtros de Pedidos de Cliente -->
                <div :class="['bar', (Mostrar_Filtro || Mostrar_Nuevo) 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >

                    <!-- Boton de Filtros -->
                    <div class="hidden sm:block">
                        <h1 @click="Mostrar_Filtro = !Mostrar_Filtro"
                        class="botonfil"
                        >
                            ᯤ
                        </h1>
                    </div>

                    <!-- Barra de Filtros y Orden -->
                    <transition name="slide">
                        <div v-if="Mostrar_Filtro"
                        class="flex flex-col self-center"
                        >

                            <!-- Orden de Mis Pedidos -->
                            <div class="flex flex-col md:px-4 md:pb-4 p-2 !pt-0">
                                <h1 class="!mt-0">
                                    Ordenar
                                </h1>
                                <select v-model="Orden" 
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

                            <!-- Filtro de Mis Pedidos -->
                            <div class="flex flex-col w-full gap-2.5">

                                <!-- Filtro de Metodo de Pago -->
                                <h2>
                                    Filtro de Metodo de Pago
                                </h2>
                                <div class="flex flex-col gap-3">
                                    <label>
                                        <input :value="5"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Todos
                                    </label>
                                    <label>
                                        <input :value="4"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Paddle
                                    </label>
                                    <label>
                                        <input :value="3"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Tarjeta de Credito / Debito
                                    </label>
                                    <label>
                                        <input :value="2"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Mercado Pago
                                    </label>
                                    <label>
                                        <input :value="1"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Transferencia Bancaria
                                    </label>
                                    <label>
                                        <input :value="0"
                                        type="radio" 
                                        v-model="Filtro_Metodo_Pago"
                                        > 
                                            Efectivo
                                    </label>
                                </div>

                                <!-- Filtro de Estatus del Pedido -->
                                <h2>
                                    Filtro de Estatus
                                </h2>
                                <div class="flex flex-col gap-3">
                                    <label>
                                        <input :value="4"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                            Todos
                                    </label>
                                    <label>
                                        <input :value="3"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                            Preparando
                                    </label>
                                    <label>
                                        <input :value="2"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                            En Camino
                                    </label>
                                    <label>
                                        <input :value="1"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                            Entregado
                                    </label>
                                </div>

                                <!-- Botones -->
                                <div class="botones">
                                    <button @click="Filtro_Aplicar" 
                                    class="botoncon"
                                    >
                                        Aplicar Filtros
                                    </button>
                                    <button @click="Filtro_Limpiar" 
                                    v-if="Mostrar_Limpiar_Filtro === true"
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

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
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

                    <!-- Error Cargando -->
                    <div v-else-if="Backend_Error" 
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
                            <button @click="Backend_Cargar()" 
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Recargar Página
                            </button>
                        </div>
                    </div>

                    <!-- Mis Pedidos -->
                    <div v-else class="w-full max-w-5xl mx-auto pb-10">
                        <div>

                            <!-- Mostrar Boton Filtro en Celular -->
                            <button @click="Mostrar_Filtro = true"
                            class="sm:hidden 
                            w-full mb-4 py-3 
                            bg-white text-green-800 
                            font-black text-lg border-2 
                            border-green-200 rounded-xl 
                            flex items-center justify-center 
                            gap-2 shadow-sm transition-all 
                            active:scale-95 active:bg-green-50"
                            >
                                ᯤ Abrir Filtros
                            </button>

                            <!-- Barra de Busqueda -->
                            <div class="flex flex-row items-stretch w-full gap-3 mb-5">-
                                <input @input="Backend_Get"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Busqueda..."
                                class="busqueda !mb-0"
                                maxlength="50"
                                >
                            </div>

                        </div>
                        <div class="flex-col lg:flex-row">

                            <!-- Encabezado -->
                            <h1 class="text-2xl font-black text-green-800 
                            mb-4 border-b-2 border-green-200 pb-2"
                            >
                                📦 Mis Pedidos en Preparacion
                            </h1>

                            <!-- Pedidos en Preparacion -->
                            <div v-if="Filtro_Preparacion.length > 0"
                            class="w-full mb-8"
                            >
                                <div v-for= "i in Filtro_Preparacion" 
                                :key="i.id_pedido"
                                class="mb-4"
                                >

                                    <!-- Datos de Pedido -->
                                    <div  @click="Mostrar_Detalle_Preparando(i.id_pedido)"
                                    class="tab"
                                    >
                                        <div class="flex flex-col text-left">
                                            <div class="flex flex-wrap items-center gap-3 mb-2">
                                                <h2 class="text-xl font-black text-gray-800">
                                                    📍Pedido a {{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
                                                </h2>
                                                <span class="globoamarillo">
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
                                                    $ {{ Formato_Precios(i.total) }}
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
                                            <div
                                            class="text-green-600 text-sm font-bold 
                                            mt-3 flex items-center justify-end gap-1"
                                            >
                                                {{ Mostrar_Preparando === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Detalles de Pedido -->
                                    <transition name="slide">
                                        <div v-if = "Mostrar_Preparando === i.id_pedido"
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
                                                class="lilproduct 
                                                flex flex-col sm:flex-row 
                                                justify-between items-start 
                                                sm:items-center py-3 
                                                border-b border-gray-100"
                                                >
                                                    <div class="flex flex-col w-full 
                                                    sm:w-1/2 mb-2 sm:mb-0"
                                                    >
                                                        <span class="font-bold text-gray-800 text-base">
                                                            {{ e.producto.nombre }}
                                                        </span>
                                                        <div v-if="e.producto.es_promocion" 
                                                        class="flex flex-wrap items-center 
                                                        gap-2 mt-1"
                                                        >
                                                            <span v-if="e.producto.porcentaje_descuento" 
                                                            class="text-xs font-black text-white 
                                                            bg-green-500 px-1.5 py-0.5 
                                                            rounded shadow-sm"
                                                            >
                                                                {{ e.producto.porcentaje_descuento }} % OFF
                                                            </span>
                                                            <span class="text-xs font-bold text-red-600 
                                                            bg-red-50 px-2 py-0.5 
                                                            rounded-md border border-red-200"
                                                            >
                                                                🔥 {{ e.producto.motivo || 'Oferta' }}
                                                            </span>
                                                        </div>
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
                                                        <div class="flex flex-col items-end">
                                                            <span v-if="e.producto.es_promocion && e.producto.precio_anterior" 
                                                            class="text-xs text-gray-400 font-bold line-through"
                                                            >
                                                                $ {{ Formato_Precios(e.producto.precio_anterior) }}
                                                            </span>
                                                            <span class="text-gray-500">
                                                                Unidad: 
                                                                <b :class="e.producto.es_promocion ? 'text-red-600 font-black' : 'text-gray-800'">
                                                                    $ {{ Formato_Precios(e.precio_unitario) }}
                                                                </b>
                                                            </span>
                                                        </div>
                                                        <div class="flex flex-col items-end">
                                                            <h2 class="font-bold text-xs text-gray-400">
                                                                Subtotal:
                                                            </h2>
                                                            <h2 class="font-black text-gray-800 text-base">
                                                                $ {{ Formato_Precios(e.subtotal) }}
                                                            </h2>
                                                        </div>
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
                                                        {{ Formato_Fecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                        🔄 
                                                        <span class="font-semibold text-gray-800">
                                                            Actualizado:
                                                        </span> 
                                                       {{ Formato_Fecha(i.updated_at) }}
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

                            <!-- Tabla Vacia -->
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

                            <!-- Pedidos en Camino -->
                            <div>

                                <!-- Encabezado -->
                                <h1 class="text-2xl font-black text-blue-800  
                                border-b-2 border-blue-200 
                                pb-2 mt-4 mb-4">
                                    🚚 Mis Pedidos En Camino
                                </h1>

                                <!-- Pedidos en Camino -->
                                <div v-if="Filtro_En_Camino.length > 0"
                                class="w-full mb-8"
                                >
                                    <div v-for= "i in Filtro_En_Camino" 
                                    :key="i.id_pedido"
                                    class="mb-4"
                                    >

                                        <!-- Datos de Pedido -->
                                        <div @click="Mostrar_Detalle_En_Camino(i.id_pedido)"
                                        class="tablue"
                                        >
                                            <div class="flex flex-col text-left">
                                                <div class="flex flex-wrap items-center gap-3 mb-2">
                                                    <h2 class="text-xl font-black text-gray-800">
                                                        📍 {{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
                                                    </h2>
                                                    <span class="globoazul">
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
                                                        ${{ Formato_Precios(i.total) }}
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
                                                    {{ Mostrar_En_Camino === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Detalles de Pedido -->
                                        <transition name="slide">
                                            <div v-if = "Mostrar_En_Camino === i.id_pedido"
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
                                                    class="lilproduct 
                                                    flex flex-col sm:flex-row 
                                                    justify-between items-start 
                                                    sm:items-center py-3 
                                                    border-b border-gray-100"
                                                    >
                                                        <div class="flex flex-col w-full
                                                        sm:w-1/2 mb-2 sm:mb-0"
                                                        >
                                                            <span class="font-bold text-gray-800 text-base">
                                                                {{ e.producto.nombre }}
                                                            </span>
                                                            <div v-if="e.producto.es_promocion" 
                                                            class="flex flex-wrap items-center 
                                                            gap-2 mt-1"
                                                            >
                                                                <span v-if="e.producto.porcentaje_descuento" 
                                                                class="text-xs font-black text-white 
                                                                bg-green-500 px-1.5 py-0.5 
                                                                rounded shadow-sm"
                                                                >
                                                                    {{ e.producto.porcentaje_descuento }} % OFF
                                                                </span>
                                                                <span class="text-xs font-bold text-red-600 
                                                                bg-red-50 px-2 py-0.5 
                                                                rounded-md border border-red-200"
                                                                >
                                                                    🔥 {{ e.producto.motivo || 'Oferta' }}
                                                                </span>
                                                            </div>
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
                                                            <div class="flex flex-col items-end">
                                                                <span v-if="e.producto.es_promocion && e.producto.precio_anterior" 
                                                                class="text-xs text-gray-400 font-bold line-through"
                                                                >
                                                                    ${{ Formato_Precios(e.producto.precio_anterior) }}
                                                                </span>
                                                                <span class="text-gray-500">
                                                                    Unidad: 
                                                                    <b :class="e.producto.es_promocion 
                                                                    ? 'text-red-600 font-black' 
                                                                    : 'text-gray-800'"
                                                                    >
                                                                        ${{ Formato_Precios(e.precio_unitario) }}
                                                                    </b>
                                                                </span>
                                                            </div>
                                                            <div class="flex flex-col items-end">
                                                                <h2 class="font-bold text-xs text-gray-400">
                                                                    Subtotal:
                                                                </h2>
                                                                <h2 class="font-black text-gray-800 text-base">
                                                                    $ {{ Formato_Precios(e.subtotal) }}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 class="text-lg font-bold text-gray-800 
                                                mb-3 border-b border-gray-100 pb-2"
                                                >
                                                    📋 Información de Envío
                                                </h3>
                                                <div class="lildata 
                                                !bg-blue-50 !border-blue-100"
                                                >
                                                    <p class="text-gray-500">
                                                        📅 
                                                        <span class="font-semibold text-gray-800">
                                                            Creado:
                                                        </span> 
                                                        {{ Formato_Fecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                        🔄 
                                                        <span class="font-semibold text-gray-800">
                                                            Actualizado:
                                                        </span> 
                                                        {{ Formato_Fecha(i.updated_at) }}
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

                                <!-- Tabla Vacia -->
                                <div v-else class="lilelse">
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
                                <button @click="Boton_Mostrar_Historial = !Boton_Mostrar_Historial" 
                                class="boton-guardar 
                                !w-auto !px-8 !py-3 !rounded-full 
                                shadow-md flex items-center gap-2"
                                :class="Boton_Mostrar_Historial 
                                ? '!from-gray-500 !to-gray-700' 
                                : ''"
                                >
                                    <span v-if="!Boton_Mostrar_Historial">
                                        📜 Ver Historial de Pedidos Anteriores
                                    </span>
                                    <span v-if="Boton_Mostrar_Historial">
                                        ⬆️ Ocultar Historial
                                    </span>
                                </button>
                            </div>

                            <!-- Historial de Pedidos -->
                            <div v-if="Boton_Mostrar_Historial">

                                <!-- Encabezado -->
                                <h1 class="text-2xl font-black text-gray-700 
                                mb-4 border-b-2 border-gray-200 pb-2"
                                >
                                    🧾Historial de Pedidos
                                </h1>

                                <!-- Historial de Pedidos -->
                                <div v-if="Filtro_Historial.length > 0"
                                class="w-full"
                                >
                                    <div v-for= "i in Filtro_Historial" 
                                    :key="i.id_pedido"
                                    class="mb-4 opacity-90 
                                    hover:opacity-100 transition-opacity"
                                    >

                                        <!-- Datos de Pedido -->
                                        <div @click="Mostrar_Detalle_Historial(i.id_pedido)"
                                        class="tabgray"
                                        >
                                            <div class="flex flex-col text-left">       
                                                <div class="flex flex-wrap items-center gap-3 mb-2">
                                                    <h2 class="text-xl font-bold text-gray-700">
                                                        📍 {{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
                                                    </h2>
                                                    <span class="globlanco">
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
                                                        $ {{ Formato_Precios(i.total) }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="lilbox">
                                                <p class="text-xs text-gray-400 font-bold mb-1">
                                                    Tiempo Est. de Entrega: 
                                                    <span class="text-gray-600">
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
                                                    {{ Mostrar_Historial === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Detalles de Pedido -->
                                        <transition name="slide">
                                            <div v-if = "Mostrar_Historial === i.id_pedido"
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
                                                    class="lilproduct 
                                                    flex flex-col sm:flex-row 
                                                    justify-between items-start 
                                                    sm:items-center py-3 
                                                    border-b border-gray-100"
                                                    >
                                                        <div class="flex flex-col 
                                                        w-full sm:w-1/2 mb-2 sm:mb-0"
                                                        >
                                                            <span class="font-bold text-gray-700 text-base">
                                                                {{ e.producto.nombre }}
                                                            </span>
                                                            <div v-if="e.producto.es_promocion" 
                                                            class="flex flex-wrap items-center 
                                                            gap-2 mt-1"
                                                            >
                                                                <span v-if="e.producto.porcentaje_descuento" 
                                                                class="text-xs font-black text-white 
                                                                bg-green-500 px-1.5 py-0.5 
                                                                rounded shadow-sm"
                                                                >
                                                                    {{ e.producto.porcentaje_descuento }} % OFF
                                                                </span>
                                                                <span class="text-xs font-bold text-red-600 
                                                                bg-red-50 px-2 py-0.5 
                                                                rounded-md border border-red-200"
                                                                >
                                                                    🔥 {{ e.producto.motivo || 'Oferta' }}
                                                                </span>
                                                            </div>
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
                                                                Cant: 
                                                                <b class="text-gray-700">
                                                                    {{ e.cantidad }}
                                                                </b>
                                                            </span>
                                                            <div class="flex flex-col items-end">
                                                                <span v-if="e.producto.es_promocion && e.producto.precio_anterior" 
                                                                class="text-xs text-gray-400 font-bold line-through"
                                                                >
                                                                    ${{ Formato_Precios(e.producto.precio_anterior) }}
                                                                </span>
                                                                <span class="text-gray-500">
                                                                    Unidad: 
                                                                    <b :class="e.producto.es_promocion ? 'text-red-600 font-black' : 'text-gray-800'">
                                                                        ${{ Formato_Precios(e.precio_unitario) }}
                                                                    </b>
                                                                </span>
                                                            </div>
                                                            <div class="flex flex-col items-end">
                                                                <h2 class="font-bold text-xs text-gray-400">
                                                                    Subtotal:
                                                                </h2>
                                                                <h2 class="font-black text-gray-800 text-base">
                                                                    $ {{ Formato_Precios(e.subtotal) }}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 class="text-lg font-bold text-gray-700 mb-3 
                                                border-b border-gray-100 pb-2"
                                                >
                                                    📋 Información de Envío
                                                </h3>
                                                <div class="lildata">
                                                    <p class="text-gray-500">
                                                        📅 
                                                        <span class="font-semibold text-gray-700">
                                                            Creado:
                                                        </span> 
                                                        {{ Formato_Fecha(i.created_at) }}
                                                    </p>
                                                    <p class="text-gray-500">
                                                        🔄 
                                                        <span class="font-semibold text-gray-700">
                                                            Entregado:
                                                        </span> 
                                                        {{ Formato_Fecha(i.updated_at) }}
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
                                

                                <!-- Tabla Vacia -->
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
        Cliente_ID, 
        backend_url,
        Cerrar_Sesion,
        Sesion_Expirada,
        Iniciado
    } from './Estatus.js'

    // ----- Variables Booleanas ----- //

    const Mostrar_Limpiar_Filtro = ref(false)
    const Backend_Error = ref(false)
    const Backend_Espera = ref(true)
    const Mostrar_Filtro = ref (false)
    const Boton_Mostrar_Historial = ref(false)

    // ----- Variables Vacias ----- //

    const Orden = ref("")
    const Pedidos = ref([])
    const Busqueda = ref("")
    const Mostrar_En_Camino = ref(null)
    const Mostrar_Historial = ref(null)
    const Mostrar_Preparando = ref(null)

    // ----- Variables Simples ----- //

    const Filtro_Metodo_Pago = ref(5)
    const Filtro_Estatus = ref(4)

    // ----- Funciones Vue ----- //
    
    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (!Cliente_ID.value) return
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
        }}, 15000)
        // Leer Pedidos del Cliente
        try {
            const respuesta = await fetch(`${backend_url}/pedidos/cliente/${Cliente_ID.value}`, {
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            const datos = await respuesta.json()
            Pedidos.value = Array.isArray(datos) ? datos : []
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
    }}})
    // Filtrar Pedidos en Preparacion //
    const Filtro_Preparacion = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 3)
    })
    // Filtrar Pedidos en Camino //
    const Filtro_En_Camino = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 2)
    })
    // Filtrar Pedidos Entregados //
    const Filtro_Historial = computed(() => {
        return Pedidos.value.filter(pedido => pedido.estatus === 1)
    })

    // ----- Funciones Frontend ----- //
    
    // Aplicar Filtros //
    const Filtro_Aplicar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Get()
        Mostrar_Filtro.value = false
        if (Filtro_Estatus.value === 1) {
            Boton_Mostrar_Historial.value = true
    }}
    // Leer Fecha con Formato DD/MM/YYYY //
    const Formato_Fecha = (fecha) => {
        if (fecha) {
            return new Date(fecha).toLocaleDateString('es-ES')
        }
        else {
            return "Pendiente"
    }}
    // Leer Precio con Formato Pesos Argentinos //
    const Formato_Precios = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    // Limpiar Filtros, Orden y Busqueda //
    const Filtro_Limpiar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Filtro_Metodo_Pago.value = 5
        Filtro_Estatus.value = 4
        Backend_Get()
        Mostrar_Filtro.value = false
        Mostrar_Limpiar_Filtro.value = false
    }
    // Mostrar Detalles de Pedido //
    const Mostrar_Detalle_En_Camino = (id) => {
        if (Mostrar_En_Camino.value === id) {
            Mostrar_En_Camino.value = null
        }
        else {
            Mostrar_En_Camino.value = id
    }}
    // Mostrar Detalles de Pedido //
    const Mostrar_Detalle_Historial = (id) => {
        if (Mostrar_Historial.value === id) {
            Mostrar_Historial.value = null
        }
        else {
            Mostrar_Historial.value = id
    }}
    // Mostrar Detalles de Pedido //
    const Mostrar_Detalle_Preparando = (id) => {
        if (Mostrar_Preparando.value === id) {
            Mostrar_Preparando.value = null
        }
        else {
            Mostrar_Preparando.value = id
    }}

    // ----- Funciones Backend ----- //
    
    // Leer Datos de los Pedidos //
    const Backend_Get = async() => {
        let url = new URL (`${backend_url}/pedidos/cliente/${Cliente_ID.value}`)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_pedido', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Metodo de Pago
        let mpfiltro = ""
        if (Filtro_Metodo_Pago.value === 5) {
            mpfiltro = ""
        }
        else if (Filtro_Metodo_Pago.value === 4) {
            mpfiltro = "Paddle"
        }
        else if (Filtro_Metodo_Pago.value === 3) {
            mpfiltro = "Tarjeta de Crédito"
        }
        else if (Filtro_Metodo_Pago.value === 2) {
            mpfiltro = "MercadoPago"
        }
        else if (Filtro_Metodo_Pago.value === 1) {
            mpfiltro = "Transferencia"
        }
        else if (Filtro_Metodo_Pago.value === 0) {
            mpfiltro = "Efectivo"
        }
        if (Filtro_Metodo_Pago.value !== 5 && mpfiltro !== "") {
            url.searchParams.append('filtromp', mpfiltro)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Estatus de los Pedidos
        if (Filtro_Estatus.value !== 4) {
            url.searchParams.append('filtroest', Filtro_Estatus.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        const GetBackend = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        if (GetBackend.status === 401) {
            await Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        const datos = await GetBackend.json()
        Pedidos.value = Array.isArray(datos) ? datos : []
    }

</script>