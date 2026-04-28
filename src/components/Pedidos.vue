<template>
  <input
    @input="BusquedaPedido"
    type="text" v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
  <button @click="VentanaFiltro = true" class="botoncentro">
    Filtros ☰
  </button>
  <div class="caja_editar" v-if="VentanaFiltro === true">
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
  <div class="contenedor_principal">
    <h1>
      Pedidos
    </h1>
    <div class="contenedor_tabla" v-if="Pedidos.length > 0">
      <table class="tabla">
        <thead>
          <tr>
            <th>
              Cliente
            </th>
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
              Total del <br>
              Pedido
            </th>
            <th>
              Detalles
            </th>
            <th>
              Estatus
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for= "i in Pedidos" :key="i.id">
            <tr>
              <td>
                {{ i.cliente[0].nombre }} {{ i.cliente[0].apellido }}
              </td>
              <td>
                {{ i.direccion[0].calle }} {{ i.direccion[0].numero }} - {{ i.direccion[0].ciudad }} - {{ i.direccion[0].provincia }}        
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
              <td>
                ${{ i.total }}
              </td>
              <td @click= "PedidoCambio(i.id_pedido)" class="boton_detalle">
                Ver Detalles
              </td>
              <td @click="Edicion(i)" :class="Estatuscolor(i.estatus)">
                {{ Estatustxt(i.estatus) }}
              </td>
            </tr>
            <tr v-if = "PedidoNow === i.id_pedido">
              <td colspan="10" class="cajon_detalles">
              <div class="caja_detalles">
              <table class="tabla_detalles">
                 <thead class="cabeza_detalles">
                    <tr>
                      <th>
                        Producto
                      </th>
                      <th>
                        Categoria
                      </th>
                      <th>
                        Codigo de Barras
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
                    </tr>
                 </thead>
                 <tbody>
                    <tr v-for = "e in i.detalle_pedido" :key="e.id_detalle_pedido">
                     <td>
                     {{ e.producto.nombre }}
                     </td>
                     <td>
                     {{ e.producto.categoria }}
                     </td>
                     <td>
                     {{ e.producto.codigo_barra }}
                     </td>
                     <td>
                     {{ e.precio_unitario }}
                     </td>
                     <td>
                     {{ e.cantidad }}
                     </td>
                     <td>
                     ${{ e.subtotal }}
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
    <div class="caja_editar" v-if="ActualizarCajaP">
      <h1>
        ¿Quiere Actualizar el Estado del Pedido?
      </h1>
      <button @click="ActualizarEstatus()">
        Si Confirmo
      </button>
      <button @click="ActualizarCajaP = false">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
  const Busqueda = ref("")
  const Pedidos = ref([])
  const PedidoNow = ref(null)
  const VentanaFiltro = ref(false)
  const filtroAct = ref(false)
  const filtroMP = ref(4)
  const filtroEst = ref(4)
  const ActualizarCajaP = ref (false)
  const PedidoCambio = (id) => {
    if (PedidoNow.value === id) {
      PedidoNow.value = null
    }
    else {
      PedidoNow.value = id
    }
  }
  const Estatustxt = (id_estatus) => {
    if (id_estatus === 1) {
      return "Entregado"
    }
    else if (id_estatus === 2) {
      return "En Camino"
    }
    else if (id_estatus === 3) {
      return "Preparando"
    }
    return "indefinido";
  }
  const Estatuscolor = (id_estatus) => {
    if (id_estatus === 1) {
      return "classEntregado"
    }
    else if (id_estatus === 2) {
      return "classEn_Camino"
    }
    else if (id_estatus === 3) {
      return "classPreparando"
    }
    return "classindefinido";
  }
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/pedidos/all/')
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
    let url = new URL ('http://localhost:8000/pedidos/all/');
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
  const ActualizarEstatus = async() => {
        const ActEst = await fetch(`http://localhost:8000/pedidos/id/${EstatusAct.value.id_pedido}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(EstatusAct.value)
        });
        if (ActEst.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        EstatusAct.value = {
          id_pedido: "",
          id_cliente: "",
          id_direccion: "",
          metodo_pago: "",
          tiempo_estimado_entrega: "",
          tiempo_entrega: "",
          estatus: ""
        };
        const respuesta = await fetch("http://localhost:8000/pedidos/all/");
        const datos = await respuesta.json();
        Pedidos.value = datos;
        ActualizarCajaP.value = false;
  };
  const EstatusAct = ref({
        id_pedido: "",
        id_cliente: "",
        id_direccion: "",
        metodo_pago: "",
        tiempo_estimado_entrega: "",
        tiempo_entrega: "",
        estatus: ""
  });
  const Edicion = (pedido_fila) => {
    if (pedido_fila.estatus === 1) {
      return;
    }
    EstatusAct.value.id_pedido = pedido_fila.id_pedido;
    EstatusAct.value.id_cliente = pedido_fila.id_cliente;
    EstatusAct.value.id_direccion = pedido_fila.id_direccion;
    EstatusAct.value.metodo_pago = pedido_fila.metodo_pago;
    EstatusAct.value.tiempo_estimado_entrega = pedido_fila.tiempo_estimado_entrega;
    EstatusAct.value.tiempo_entrega = pedido_fila.tiempo_entrega;
    EstatusAct.value.estatus = pedido_fila.estatus - 1;
    ActualizarCajaP.value = true;
  };
</script>

<style scoped>
h1{
  color: black;
  font-size: x-large;
  margin: 0;
  width: fit-content;
}
.contenedor_tabla {
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #000000;
  text-align: center;
}
thead{
  background-color: #b8ffbd;
  color: #106900;
  text-align: center;
}
.busqueda{
  padding: 10px;
  width: 70%;
}
.boton_detalle{
  cursor: pointer;
  background-color: #f1fff2;
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