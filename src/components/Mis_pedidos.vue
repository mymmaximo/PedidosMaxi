<template>
    <div>
        <input
        @input="BusquedaPedido"
        type="text" v-model="Busqueda" 
        placeholder="Busqueda..."
        class="busqueda"
        >
        <button @click="VentanaFiltro = true" class="botoncentro">
        Filtros ☰
        </button>
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="VentanaFiltro">
                <div class="caja_editar">
                    <h2>
                    Filtro de Metodo de Pago
                    </h2>
                    <div class="caja_radios">
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
                    <div class="caja_radios">
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
                    <button @click="AplicarFiltro" class="Boton_Crear">
                    Aplicar Filtros
                    </button>
                    <button @click="LimpiarFiltro" class="Boton_Crear" v-if="filtroAct === true">
                    Limpiar Filtro
                    </button>
                    <button @click="VentanaFiltro = false" class="Boton_Crear">
                    Cerrar
                    </button>
                </div>
            </div>
        </Teleport>
        <div class="contenedor_principal">
            <div>
                <h1>
                Mis Pedidos en Preparacion
                </h1>
                <div class="contenedor_tabla" v-if="Pedidos.length > 0">
                    <table class="tabla">
                        <thead class="thead_preparacion">
                            <tr>
                                <th>
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
                                <th>
                                Total del <br>
                                Pedido
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for= "i in Pedidos" :key="i.id && i.estatus === 3">
                                <tr v-if="i.estatus === 3">
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
                                    <td v-if="PedidoNowPreparando === i.id_pedido" @click="PedidoCambioPreparando(i.id_pedido)" class="boton_ocultar_detalle">
                                    Ocultar Detalles
                                    </td>
                                    <td v-else @click="PedidoCambioPreparando(i.id_pedido)" class="boton_detalle">
                                    Ver Detalles
                                    </td>
                                    <td>
                                    ${{ i.total }}
                                    </td>
                                </tr>
                                <tr v-if = "PedidoNowPreparando === i.id_pedido && i.estatus === 3">
                                    <td colspan="9" class="cajon_detalles">
                                        <div class="caja_detalles">
                                            <table class="tabla_detalles">
                                                <thead class="thead_preparacion">
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
                                                    <tr v-for = "e in i.detalle_pedido" :key="e.id_detalle_pedido">
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
                    <h3>No se encontraron Pedidos 😔</h3>
                    <p>Prueba buscando con otro termino</p>
                </div>
            </div>
            <div>
                <h1>
                Mis Pedidos En Camino
                </h1>
                <div class="contenedor_tabla" v-if="Pedidos.length > 0">
                    <table class="tabla">
                        <thead class="thead_en_camino">
                            <tr>
                                <th>
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
                                <th>
                                Total del <br>
                                Pedido
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for= "i in Pedidos" :key="i.id && i.estatus === 2">
                                <tr v-if="i.estatus === 2">
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
                                    <td v-if="PedidoNowEnCamino === i.id_pedido" @click="PedidoCambioEnCamino(i.id_pedido)" class="boton_ocultar_detalle">
                                    Ocultar Detalles
                                    </td>
                                    <td v-else @click="PedidoCambioEnCamino(i.id_pedido)" class="boton_detalle">
                                    Ver Detalles
                                    </td>
                                    <td>
                                    ${{ i.total }}
                                    </td>
                                </tr>
                                <tr v-if = "PedidoNowEnCamino === i.id_pedido">
                                    <td colspan="9" class="cajon_detalles">
                                        <div class="caja_detalles">
                                            <table class="tabla_detalles">
                                                <thead class="thead_en_camino">
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
                                                    <tr v-for = "e in i.detalle_pedido" :key="e.id_detalle_pedido">
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
                    <h3>No se encontraron Pedidos 😔</h3>
                    <p>Prueba buscando con otro termino</p>
                </div>
            </div>
            <div>
                <button @click="mostrarhistorial = !mostrarhistorial" class="boton_historial">
                    <h2>
                    Ver Historial de Pedidos
                    </h2>
                </button>
                <div class="contenedor_tabla" v-if="Pedidos.length > 0 && mostrarhistorial === true">
                    <table class="tabla">
                        <thead class="thead_entregado">
                            <tr>
                                <th>
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
                                <th>
                                Total del <br>
                                Pedido
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for= "i in Pedidos" :key="i.id && i.estatus === 1">
                                <tr v-if="i.estatus === 1">
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
                                    <td v-if="PedidoNowHistorial === i.id_pedido" @click="PedidoCambioHistorial(i.id_pedido)" class="boton_ocultar_detalle">
                                    Ocultar Detalles
                                    </td>
                                    <td v-else @click="PedidoCambioHistorial(i.id_pedido)" class="boton_detalle">
                                    Ver Detalles
                                    </td>
                                    <td>
                                    ${{ i.total }}
                                    </td>
                                </tr>
                                <tr v-if = "PedidoNowHistorial === i.id_pedido">
                                    <td colspan="9" class="cajon_detalles">
                                        <div class="caja_detalles">
                                            <table class="tabla_detalles">
                                                <thead class="thead_entregado">
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
                                                    <tr v-for = "e in i.detalle_pedido" :key="e.id_detalle_pedido">
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
                <div v-else-if="mostrarhistorial === true">
                    <h3>No se encontraron Pedidos 😔</h3>
                    <p>Prueba buscando con otro termino</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { leerCookie } from './Estatus.js'
    const Pedidos = ref([])
    const filtroMP = ref(4)
    const filtroEst = ref(4)
    const Busqueda = ref("")
    const filtroAct = ref(false)
    const VentanaFiltro = ref(false)
    const mostrarhistorial = ref(false)
    const PedidoNowEnCamino = ref(null)
    const PedidoNowHistorial = ref(null)
    const PedidoNowPreparando = ref(null)
    const idUsuario = leerCookie("id_cliente")
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
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/pedidos/cliente/${idUsuario}`)
        const datos = await respuesta.json();
        console.log("aca che",datos)
        Pedidos.value = datos;
    })
    const LimpiarFiltro = () => {
        filtroMP.value = 4
        filtroEst.value = 4
        BusquedaPedido();
        VentanaFiltro.value = false;
        filtroAct.value = false
    }
    const BusquedaPedido = async() => {
        let url = new URL (`http://localhost:8000/pedidos/cliente/${idUsuario}/`);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_pedido', Busqueda.value);
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
            url.searchParams.append('filtromp', mpfiltro);
            filtroAct.value = true
        }
        if (filtroEst.value !== 4) {
            url.searchParams.append('filtroest', filtroEst.value);
            filtroAct.value = true
        }
        const BusqPedido = await fetch(url)
        const datos = await BusqPedido.json();
        Pedidos.value = datos;
    }
    const FormatoFecha = (fechai) => {
        if (fechai) {
            return new Date(fechai).toLocaleDateString('es-ES')
        }
        else {
            return "Pendiente"
        }
    }
    const AplicarFiltro = () => {
        BusquedaPedido();
        VentanaFiltro.value = false;
    }
</script>

<style scoped>
    h1{
        color: black;
        font-size: x-large;
        margin: 0;
        width: fit-content;
    }
    .thead_entregado{
        background-color: #b8ffbd;
        color: #106900;
        text-align: center;
    }
    .thead_en_camino{
        background-color: #faffb8;
        color: #695d00;
        text-align: center;
    }
    .thead_preparacion{
        background-color: #ffb8b8;
        color: #690000;
        text-align: center;
    }
    .busqueda{
        padding: 10px;
        width: 70%;
    }
    .boton_historial{
        margin-top: 15px;
        padding: 5px;
        width: 80%;
        cursor: pointer;
        background-color: #d0f8d2;
        user-select: none;
    }
    .caja_detalles{
        background-color: #ffffff;
        padding: 10px 10px;
    }
    .cabeza_detalles{
        background-color: #cafcce;
        color: #0c4d00;
        text-align: center;
    }
    .tabla_detalles{
        width: 100%;
        overflow: hidden;
        border: 1px solid #000000
    }
    .caja_editar{
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 15px;
        border: 2px solid #000000;
        z-index: 1000;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
    }
    .cajon_detalles{
        padding: 0 !important; 
        background-color: #f4f9f4;
    }
    .classEntregado{
        background-color: #9ff7a5;
        cursor: not-allowed !important;
    }
    .classEn_Camino{
        background-color: #f6f67a;
    }
    .classPreparando{
        background-color: #f5ab72;
    }
    .classindefinido{
        background-color: #ffffff;
    }
</style>