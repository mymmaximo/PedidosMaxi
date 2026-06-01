<template>
    <div class="cuerpo">
        <div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">
                <div class="bar">
                    <h1
                    @click="MostrarFiltro = !MostrarFiltro"
                    class="botoncon !py-0 !px-1 max-w-min self-center"
                    >
                    ᯤ
                    </h1>
                    <div
                    class="flex flex-col self-center"
                    v-if="MostrarFiltro"
                    >
                        <div
                        class="
                        flex flex-col w-full gap-2.5
                        ">
                            <h2>
                            Filtro de Metodo de Pago
                            </h2>
                            <div
                            class="
                            flex flex-col
                            gap-3
                            ">
                                <label>
                                <input 
                                type="radio" 
                                :value="3"
                                v-model="filtroMP"
                                > 
                                Tarjeta de Credito / Debito
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="2"
                                v-model="filtroMP"
                                > 
                                Mercado Pago
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="1"
                                v-model="filtroMP"
                                > 
                                Transferencia Bancaria
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="0"
                                v-model="filtroMP"
                                > 
                                Efectivo
                                </label>
                            </div>
                            <h2>
                            Filtro de Estatus
                            </h2>
                            <div
                            class="
                            flex flex-col
                            gap-3
                            ">
                                <label>
                                <input 
                                type="radio" 
                                :value="3"
                                v-model="filtroEst"
                                > 
                                Preparando
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="2"
                                v-model="filtroEst"
                                > 
                                En Camino
                                </label>
                                <label>
                                <input 
                                type="radio" 
                                :value="1"
                                v-model="filtroEst"
                                > 
                                Entregado
                                </label>
                            </div>
                            <div 
                            class="botones"
                            >
                                <button 
                                @click="AplicarFiltro" 
                                class="botoncon"
                                >
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
                    </div>
                </div>
                <!-- Tabla de Mis Pedidos -->
                <div class="start">
                    <div>
                        <!-- Barra de Busqueda -->
                        <input
                        @input="BusquedaPedido"
                        type="text" v-model="Busqueda" 
                        placeholder="Busqueda..."
                        class="busqueda"
                        maxlength="50"
                        >
                    </div>
                    <div class="flex-col lg:flex-row">
                        <h1 class="text-center">
                        Mis Pedidos en Preparacion
                        </h1>
                        <div 
                        v-if="Pedidos.length > 0"
                        class="
                        w-full"
                        >
                            <table 
                            class="w-full min-w-max [&_th]:!bg-green-500"
                            >
                                <thead>
                                    <tr>
                                        <th
                                        class="
                                        rounded-ss-2xl 
                                        ">
                                        Direccion
                                        </th>
                                        <th>
                                        Metodo de Pago
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega Estimado
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Creacion
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Actualizacion
                                        </th>
                                        <th>
                                        Detalles
                                        </th>
                                        <th
                                        class="
                                        rounded-se-2xl 
                                        ">
                                        Total del <br>
                                        Pedido
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template 
                                    v-for= "i in Pedidos" 
                                    :key="i.id && i.estatus === 3"
                                    >
                                        <tr 
                                        v-if="i.estatus === 3"
                                        >
                                            <td>
                                            {{ i.direccion[0].calle }}
                                            {{ i.direccion[0].numero }}
                                            - 
                                            {{ i.direccion[0].ciudad }}
                                            - 
                                            {{ i.direccion[0].provincia }}        
                                            </td>
                                            <td>
                                            {{ i.metodo_pago }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_estimado_entrega }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_entrega }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.created_at) }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.updated_at) }}
                                            </td>
                                            <td 
                                            v-if="PedidoNowPreparando === i.id_pedido" 
                                            @click="PedidoCambioPreparando(i.id_pedido)"
                                            >
                                            Ocultar Detalles
                                            </td>
                                            <td 
                                            v-else 
                                            @click="PedidoCambioPreparando(i.id_pedido)"
                                            >
                                            Ver Detalles
                                            </td>
                                            <td>
                                            ${{ i.total }}
                                            </td>
                                        </tr>
                                        <tr 
                                        v-if = "PedidoNowPreparando === i.id_pedido && i.estatus === 3"
                                        >
                                            <td colspan="8">
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                Producto
                                                                </th>
                                                                <th>
                                                                Precio Unitario
                                                                </th>
                                                                <th>
                                                                Cantidad
                                                                </th>
                                                                <th>
                                                                Subtotal
                                                                </th>
                                                                <th>
                                                                Categoria
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr 
                                                            v-for = "e in i.detalle_pedido" 
                                                            :key="e.id_detalle_pedido"
                                                            >
                                                                <td>
                                                                {{ e.producto.nombre }}
                                                                </td>
                                                                <td>
                                                                {{ e.precio_unitario }}
                                                                </td>
                                                                <td>
                                                                {{ e.cantidad }}
                                                                </td>
                                                                <td>
                                                                {{ e.subtotal }}
                                                                </td>
                                                                <td>
                                                                {{ e.producto.categoria }}
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
                    <div>
                        <h1 class="text-center">
                        Mis Pedidos En Camino
                        </h1>
                        <div
                        v-if="Pedidos.length > 0"
                        >
                            <table 
                            class="
                            [&_th]:!bg-yellow-600 
                            [&_td]:!bg-yellow-50"
                            >
                                <thead>
                                    <tr>
                                        <th
                                        class="
                                        rounded-ss-2xl 
                                        ">
                                        Direccion
                                        </th>
                                        <th>
                                        Metodo de Pago
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega Estimado
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Creacion
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Actualizacion
                                        </th>
                                        <th>
                                        Detalles
                                        </th>
                                        <th
                                        class="
                                        rounded-se-2xl 
                                        ">
                                        Total del <br>
                                        Pedido
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template 
                                    v-for= "i in Pedidos" 
                                    :key="i.id && i.estatus === 2"
                                    >
                                        <tr 
                                        v-if="i.estatus === 2"
                                        >
                                            <td>
                                            {{ i.direccion[0].calle }} 
                                            {{ i.direccion[0].numero }}
                                            - 
                                            {{ i.direccion[0].ciudad }}
                                            - 
                                            {{ i.direccion[0].provincia }}        
                                            </td>
                                            <td>
                                            {{ i.metodo_pago }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_estimado_entrega }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_entrega }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.created_at) }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.updated_at) }}
                                            </td>
                                            <td 
                                            v-if="PedidoNowEnCamino === i.id_pedido" 
                                            @click="PedidoCambioEnCamino(i.id_pedido)"
                                            >
                                            Ocultar Detalles
                                            </td>
                                            <td 
                                            v-else 
                                            @click="PedidoCambioEnCamino(i.id_pedido)"
                                            >
                                            Ver Detalles
                                            </td>
                                            <td>
                                            ${{ i.total }}
                                            </td>
                                        </tr>
                                        <tr 
                                        v-if = "PedidoNowEnCamino === i.id_pedido">
                                            <td colspan="8">
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                Producto
                                                                </th>
                                                                <th>
                                                                Precio Unitario
                                                                </th>
                                                                <th>
                                                                Cantidad
                                                                </th>
                                                                <th>
                                                                Subtotal
                                                                </th>
                                                                <th>
                                                                Categoria
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr 
                                                            v-for = "e in i.detalle_pedido" 
                                                            :key="e.id_detalle_pedido"
                                                            >
                                                                <td>
                                                                {{ e.producto.nombre }}
                                                                </td>
                                                                <td>
                                                                {{ e.precio_unitario }}
                                                                </td>
                                                                <td>
                                                                {{ e.cantidad }}
                                                                </td>
                                                                <td>
                                                                {{ e.subtotal }}
                                                                </td>
                                                                <td>
                                                                {{ e.producto.categoria }}
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
                            <h2
                            >No se encontraron Pedidos 😔
                            </h2>
                            <h3>
                            Prueba buscando con otro termino
                            </h3>
                        </div>
                    </div>
                    <div
                    class="
                    flex flex-col
                    items-center
                    my-5 
                    lg:p-5 
                    gap-3 lg:gap-5
                    ">
                        <button 
                        @click="mostrarhistorial = !mostrarhistorial" 
                        class="botoncon">
                            <h2>
                            Ver Historial de Pedidos
                            </h2>
                        </button>
                        <div 
                        v-if="Pedidos.length > 0 && mostrarhistorial === true"
                        class="p-0" 
                        >
                            <table 
                            class="
                            [&_th]:!bg-red-500 
                            [&_td]:!bg-red-50"
                            >
                                <thead>
                                    <tr>
                                        <th
                                        class="
                                        rounded-ss-2xl 
                                        ">
                                        Direccion
                                        </th>
                                        <th>
                                        Metodo de Pago
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega Estimado
                                        </th>
                                        <th>
                                        Tiempo de <br>
                                        Entrega
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Creacion
                                        </th>
                                        <th>
                                        Fecha de <br>
                                        Actualizacion
                                        </th>
                                        <th>
                                        Detalles
                                        </th>
                                        <th
                                        class="
                                        rounded-se-2xl 
                                        ">
                                        Total del <br>
                                        Pedido
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template 
                                    v-for= "i in Pedidos" 
                                    :key="i.id && i.estatus === 1"
                                    >
                                        <tr 
                                        v-if="i.estatus === 1"
                                        >
                                            <td>
                                            {{ i.direccion[0].calle }} 
                                            {{ i.direccion[0].numero }}
                                            - 
                                            {{ i.direccion[0].ciudad }} 
                                            - 
                                            {{ i.direccion[0].provincia }}        
                                            </td>
                                            <td>
                                            {{ i.metodo_pago }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_estimado_entrega }}
                                            </td>
                                            <td>
                                            {{ i.tiempo_entrega }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.created_at) }}
                                            </td>
                                            <td>
                                            {{ FormatoFecha(i.updated_at) }}
                                            </td>
                                            <td 
                                            v-if="PedidoNowHistorial === i.id_pedido" 
                                            @click="PedidoCambioHistorial(i.id_pedido)"
                                            class="no"
                                            >
                                            Ocultar Detalles
                                            </td>
                                            <td 
                                            v-else 
                                            @click="PedidoCambioHistorial(i.id_pedido)"
                                            class="si"
                                            >
                                            Ver Detalles
                                            </td>
                                            <td>
                                            ${{ i.total }}
                                            </td>
                                        </tr>
                                        <tr 
                                        v-if = "PedidoNowHistorial === i.id_pedido"
                                        >
                                            <td 
                                            colspan="8"
                                            >
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                Producto
                                                                </th>
                                                                <th>
                                                                Precio Unitario
                                                                </th>
                                                                <th>
                                                                Cantidad
                                                                </th>
                                                                <th>
                                                                Subtotal
                                                                </th>
                                                                <th>
                                                                Categoria
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr 
                                                            v-for = "e in i.detalle_pedido" 
                                                            :key="e.id_detalle_pedido"
                                                            >
                                                                <td>
                                                                {{ e.producto.nombre }}
                                                                </td>
                                                                <td>
                                                                {{ e.precio_unitario }}
                                                                </td>
                                                                <td>
                                                                {{ e.cantidad }}
                                                                </td>
                                                                <td>
                                                                {{ e.subtotal }}
                                                                </td>
                                                                <td>
                                                                {{ e.producto.categoria }}
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
                        <div 
                        v-else-if="mostrarhistorial === true"
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
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue';
    import { leerCookie } from './Estatus.js'
    // ----- Variantes ----- //
    const Pedidos = ref([])
    const filtroMP = ref(4)
    const filtroEst = ref(4)
    const Busqueda = ref("")
    const filtroAct = ref(false)
    const VentanaFiltro = ref(false)
    const MostrarFiltro = ref (false)
    const mostrarhistorial = ref(false)
    const PedidoNowEnCamino = ref(null)
    const PedidoNowHistorial = ref(null)
    const PedidoNowPreparando = ref(null)
    const idUsuario = leerCookie("id_cliente")
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/pedidos/cliente/${idUsuario}`)
        const datos = await respuesta.json();
        console.log("aca che",datos)
        Pedidos.value = datos;
    })
    // ----- Para el Frontend ----- //
    const AplicarFiltro = () => {
        BusquedaPedido()
        MostrarFiltro.value = false
    }
    const LimpiarFiltro = () => {
        filtroMP.value = 4
        filtroEst.value = 4
        BusquedaPedido()
        MostrarFiltro.value = false
        filtroAct.value = false
    }
    const FormatoFecha = (fechai) => {
        if (fechai) {
            return new Date(fechai).toLocaleDateString('es-ES')
        }
        else {
            return "Pendiente"
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
    const PedidoCambioEnCamino = (id) => {
        if (PedidoNowEnCamino.value === id) {
            PedidoNowEnCamino.value = null
        }
        else {
            PedidoNowEnCamino.value = id
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
        let url = new URL (`http://localhost:8000/pedidos/cliente/${idUsuario}/`);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_pedido', Busqueda.value)
        }
        let mpfiltro = ""
        if (filtroMP.value === 4) {
            mpfiltro = ""
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
        if (filtroMP.value !== 4&& mpfiltro !== "") {
            url.searchParams.append('filtromp', mpfiltro)
            filtroAct.value = true
        }
        if (filtroEst.value !== 4) {
            url.searchParams.append('filtroest', filtroEst.value)
            filtroAct.value = true
        }
        const BusqPedido = await fetch(url)
        const datos = await BusqPedido.json()
        Pedidos.value = datos
    }
</script>