import { ref } from 'vue'

export const LimpiarCompra = () =>{
    localStorage.removeItem("carrito_pendiente")
    CarritoLocal.value = []
}

export const leerCookie = (nombre) => {
  const valor = `; ${document.cookie}`
  const partes = valor.split(`; ${nombre}=`)
  if (partes.length === 2) return partes.pop().split(';').shift()
  return null
}

export const CerrarSesion = () =>{
    document.cookie = "token=; max-age=0; path=/"
    document.cookie = "id_usuario=; max-age=0; path=/"
    document.cookie = "id_cliente=; max-age=0; path=/"
    document.cookie = "id_rol=; max-age=0; path=/"
    LimpiarCompra()
    Iniciado.value = false
    window.location.reload()
}

export const CarritoLocal = ref ([])

export const ProductoCantidad = ref(1)

export const ProductoActual = ref(null)

export const ActualizarCajaP = ref(false)

export const ActualizarCajaC = ref(false)

export const Iniciado = ref(leerCookie("token") !== null)

export const Rol = ref(leerCookie("id_rol"))

export const PedidoGuardado = parseInt(localStorage.getItem("pedido"))

export const PedidoActual = ref(PedidoGuardado ? parseInt(PedidoGuardado) : null)
