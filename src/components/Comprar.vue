<template>
    <div class="caja_elejir_cantidad" v-if="MostrarProducto_Cantidad">
        <h2>
            {{ ProductoActual.nombre }}
        </h2>
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
            <button @click="SumarCarrito">
                Agregar al Carrito
            </button>
            <button @click="Cancelar">
                Cancelar
            </button>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { CarritoLocal, MostrarProducto_Cantidad, ProductoActual, ProductoCantidad, SumarProducto, RestarProducto } from "./Estatus.js"
    import { PedidoActual } from './Estatus'
    onMounted (() => {
        const CarritoOlvidado = localStorage.getItem('carrito_pendiente');
        if (CarritoOlvidado) {
            CarritoLocal.value = JSON.parse(CarritoOlvidado);
            console.log("Carrito recuperado:", CarritoLocal.value);
        }
    })
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
                body: JSON.stringify([{
                    id_pedido: PedidoActual.value,
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                }])
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
    const SumarCarrito = () => {
        if (!ProductoActual.value)
            return; 
        const nuevoProducto = {
            id_pedido: PedidoActual.value,
            nombre_producto: ProductoActual.value.nombre,
            id_producto: ProductoActual.value.id,
            cantidad: ProductoCantidad.value,
            precio_unitario: ProductoActual.value.precio,
            stock_producto: ProductoActual.value.stock
        }
        let CarritoExistente = CarritoLocal.value.find(
            (item_exitente) =>
            item_exitente.id_producto === ProductoActual.value.id
        )
        if (CarritoExistente){
            CarritoExistente.cantidad = ProductoCantidad.value + CarritoExistente.cantidad
        } else {
            CarritoLocal.value.push(nuevoProducto);
        }
        localStorage.setItem(
            'carrito_pendiente',
            JSON.stringify(
                CarritoLocal.value
        ));
        Cancelar()    
    }
    // revisar para optimizar
    watch (ProductoCantidad, (NuevaCantidad) => {
        let CantidadnCarrito = 0
        if (ProductoActual.value) {
            CarritoLocal.value.forEach((prod) => {
                if (prod.id_producto === ProductoActual.value.id) {
                    CantidadnCarrito = CantidadnCarrito + prod.cantidad
                }
            })
            const StockLocal = ProductoActual.value.stock - CantidadnCarrito
            if (NuevaCantidad > StockLocal) {
                ProductoCantidad.value = StockLocal
            }
            if (NuevaCantidad < 1 && StockLocal !== 0) {
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