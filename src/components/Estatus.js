import { ref } from 'vue'

export const PedidoGuardado = parseInt(localStorage.getItem("pedido"))

export const PedidoActual = ref(PedidoGuardado ? parseInt(PedidoGuardado) : null)

export const LimpiarCompra = () =>{
    localStorage.removeItem("carrito_pendiente")
    CarritoLocal.value = [];
}

export const ProductoActual = ref(null)

export const CarritoLocal = ref ([])

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

export const leerCookie = (nombre) => {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(';').shift();
  return null;
}

export const Iniciado = ref(leerCookie("token") !== null)

export const Rol = ref(leerCookie("id_rol"))
    
export const CerrarSesion = () =>{
    document.cookie = "token=; max-age=0; path=/";
    document.cookie = "id_cliente=; max-age=0; path=/";
    document.cookie = "id_rol=; max-age=0; path=/";
    LimpiarCompra()
    Iniciado.value = false
}
