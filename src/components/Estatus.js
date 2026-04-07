import { ref } from 'vue'

export const PedidoGuardado = parseInt(localStorage.getItem("pedido"))
export const PedidoActual = ref(PedidoGuardado ? parseInt(PedidoGuardado) : null)
export const LimpiarCompra = () =>{
    PedidoActual.value = null
    localStorage.removeItem("pedido")
}
export const ProductoActual = ref(null)
export const ProductoCantidad = ref(1)
export const MostrarProducto_Cantidad = ref(false)
export const VentanaComprar = (ProductoSeleccionado) => {
        MostrarProducto_Cantidad.value = true
        ProductoActual.value = ProductoSeleccionado
        ProductoCantidad.value = 1
    }
export const SumarProducto = () => {
    if (ProductoActual.value && ProductoCantidad.value < ProductoActual.value.stock) {
        ProductoCantidad.value++
    }
}

export const RestarProducto = () => {
    if (ProductoCantidad.value > 1) {
        ProductoCantidad.value--
    }
}