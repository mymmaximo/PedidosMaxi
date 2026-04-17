<template>
  <div class="contenedor_principal">
    <h1>
      Pedidos
    </h1>
    <div class="contenedor_tabla">
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
              Tiempo de Entrega Estimado
            </th>
            <th>
              Tiempo de Entrega
            </th>
            <th>
              Detalles
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
              <td @click= "PedidoCambio(i.id_pedido)" class="boton_detalle">
                Ver Detalles
              </td>
            </tr>
            <tr v-if = "PedidoNow === i.id_pedido">
              <td colspan="6" class="cajon_detalles">
              <div class="caja_detalles">
              <table class="tabla_detalles">
                 <thead class="cabeza_detalles">
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
                      <th>
                        Codigo de Barras
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
                     <td>
                     {{ e.producto.codigo_barra }}
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
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  const Pedidos = ref([]);
  const PedidoNow = ref(null)
  const PedidoCambio = (id) => {
    if (PedidoNow.value === id) {
      PedidoNow.value = null
    }
    else {
      PedidoNow.value = id
    }
  }
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/pedidos/all/')
    const datos = await respuesta.json();
    console.log("aca che",datos)
    Pedidos.value = datos;
  })
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
.boton_detalle{
  cursor: pointer;
  background-color: #f1fff2;
  border-radius: 15px;
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
.cajon_detalles{
  padding: 0 !important; 
  background-color: #f4f9f4;
}
</style>