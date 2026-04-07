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
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { PedidoActual } from './Estatus'
    const Confirmar = (async() =>{
        const tokenGuardado = localStorage.getItem("token");
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
            }
        } else {
            const respuesta = await fetch('http://localhost:8000/pedidos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify({
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                })
            })
            if (respuesta.ok) {
                const DatosPedido = await respuesta.json ()
                PedidoActual.value = DatosPedido.id
                localStorage.setItem(
                    "pedido",
                    PedidoActual.value
                )
                Cancelar ()
                console.log ("funciono")
            }
        }
    })
    const Cancelar = () =>{
        MostrarProducto_Cantidad.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
    }
    const SumarProducto = () => {
        if (ProductoActual.value.stock < ProductoCantidad.value){
            ProductoCantidad.value++
        }
    }
    const RestarProducto = () => {
        if (0 < ProductoCantidad.value){
            ProductoCantidad.value--
        }
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
  padding: 15px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>