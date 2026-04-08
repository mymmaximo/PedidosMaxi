<template>
    <div class="caja_elejir_cantidad" v-if="MostrarProducto_Cantidad">
        <h1>
            {{ ProductoActual.nombre }}
        </h1>
        <div>
            <input type="number" v-model="ProductoCantidad">
            <button @click="SumarProducto(ProductoActual)">
                +
            </button>
            <button @click="RestarProducto(ProductoActual)">
                -
            </button>
        </div>
        <div>
            <button @click="Confirmar">
                Confirmar
            </button>
            <button @click="Cancelar">
                Cancelar
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { VentanaComprar, MostrarProducto_Cantidad, ProductoActual, ProductoCantidad, SumarProducto, RestarProducto } from "./Estatus.js"
    import { PedidoActual } from './Estatus'
    const Confirmar = (async() =>{
        const tokenGuardado = localStorage.getItem("token");
        const ClienteGuardado = localStorage.getItem("id_cliente");
        if (PedidoActual.value) {
            const respuesta = await fetch('http://localhost:8000/pedidos/detalles_pedido/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify({
                    id_pedido: PedidoActual.value,
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                })
            })
            if (respuesta.ok) {
                Cancelar ()
                console.log ("funciono")
            } else {
            const error = await respuesta.text()
            console.error("Error al agregar detalle:", error)
            }
        } else {
            const respuesta = await fetch('http://localhost:8000/pedidos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify({
                    id_cliente: parseInt(ClienteGuardado),
                    id_direccion: 1,
                    metodo_pago: " ",
                    tiempo_estimado_entrega: 0,
                    tiempo_entrega: 0
                })
            })
            if (respuesta.ok) {
                const DatosPedido = await respuesta.json ()
                PedidoActual.value = DatosPedido.id
                localStorage.setItem(
                    "pedido",
                    PedidoActual.value
                )
                Confirmar() 
            } else {
            const error = await respuesta.text()
            console.error("Error al agregar Pedido:", error)
            }
        }
    })
    const Cancelar = () =>{
        MostrarProducto_Cantidad.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
    }    
    watch (ProductoCantidad, (NuevaCantidad) => {
        if (ProductoActual.value) {
            if (NuevaCantidad > ProductoActual.value.stock) {
                ProductoCantidad.value = ProductoActual.value.stock
            }
            if (NuevaCantidad < 1) {
                ProductoCantidad.value = 1
            }
        }
    })
</script>

<style scoped>
.caja_elejir_cantidad{
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
</style>