import { ref } from 'vue'

export const urlbase5173 = "https://pedidosmaxi-production.up.railway.app"

export const urlover8000 = "https://backend-pedidos-maxi.vercel.app"

export const urlbase5173b = "http://localhost:5173"

export const urlover8000b = "http://localhost:8000"

export const urlbase5173a = "http://10.250.4.18:5173"

export const urlover8000a = "http://10.250.4.18:8000"

export const Rol = ref([])

export const ClienteID = ref(null)

export const Iniciado = ref(false)

export const CarritoLocal = ref ([])

export const VolverCarro = ref(false)

export const MostrarError = ref(false)

export const ProductoCantidad = ref(1)

export const ProductoActual = ref(null)

export const ActualizarCajaP = ref(false)

export const ActualizarCajaC = ref(false)

export const SesionExpirada = ref(false)

export const PedidoGuardado = parseInt(localStorage.getItem("pedido"))

export const PedidoActual = ref(PedidoGuardado ? parseInt(PedidoGuardado) : null)

export const CargarCarrito = () => {
    const CarritoOlvidado = localStorage.getItem('carrito_pendiente')
    if (CarritoOlvidado) {
        try {
            const carrito_parse = JSON.parse(CarritoOlvidado)
            if (ValidadCarrito(carrito_parse)) {
                CarritoLocal.value = carrito_parse
                console.log("Carrito valido y recuperado")
            } else {
                console.log("Carrito destruido")
                LimpiarCompra()
            }
        } catch(error) {
            console.log("Carrito destruido")
            LimpiarCompra()
        }
    }
}

export const CerrarSesion = async () =>{
    try {
        await fetch (`${urlover8000}/logout/`, {
            method: 'POST',
            credentials: 'include'
        })
    } catch (error) {
        console.error (
            "Error al cerrar sesion en el servidor:",
            error
        )
    }
    LimpiarCompra()
    Rol.value = ""
    ClienteID.value = null
    Iniciado.value = false
    window.location.href = '/'
}

const Decodificar = (token) => {
    try{
        const Base64Url = token.split('.')[1]
        const Base64 = Base64Url.replace(/-/g, '+').replace(/_/g,'/')
        return JSON.parse(window.atob(Base64))
    } catch (error) {
        return null
    }
}

export const leerCookie = (nombre) => {
    const valor = `; ${document.cookie}`
    const partes = valor.split(`; ${nombre}=`)
    if (partes.length === 2)
        return partes.pop().split(';').shift()
    return null
}

export const LimpiarCompra = () =>{
    localStorage.removeItem("carrito_pendiente")
    CarritoLocal.value = []
}

export const ValidadSesionBack = async () => {
    try {
        const respuesta = await fetch(`${urlover8000}/reload/`, {
            method: 'GET',
            credentials: 'include'
        })
        if (respuesta.ok) {
            const datos = await respuesta.json()
            Iniciado.value = true
            Rol.value = datos.id_rol || []
            ClienteID.value = datos.id_cliente
        } else {
            if (Iniciado.value === true) {
                SesionExpirada.value = true
            }
            Iniciado.value = false
            Rol.value = ""
            ClienteID.value = null
            LimpiarCompra()
        }
    } catch (error) {
        console.error("Error validando la sesión:", error)
        Iniciado.value = false
    }
}

export const ValidadSesionBackold = async () => {
    const token = leerCookie("token_seguro")
    if (token) {
        const payload = Decodificar(token)
        if (payload && payload.exp * 1000 > Date.now()) {
            Iniciado.value = true
            Rol.value = payload.id_rol
        } else {
            await CerrarSesion()
        }
    } else {
        Iniciado.value = false
    }
}

export const ValidadCarrito = (carrito_check) => {
    if (!Array.isArray(carrito_check)) {
            return false
    }
    for (const item of carrito_check) {
        if (typeof item !== 'object' || item === null) {
            return false
        }
        const claves = [
            'id_pedido',
            'nombre_producto',
            'id_producto',
            'cantidad',
            'precio_unitario',
            'stock_producto',
            'imagenes'
        ]
        for (const clave of claves) {
            if (!(clave in item)) {
                return false
            }
        }
        if (
            typeof item.id_producto !== 'number' ||
            typeof item.cantidad !== 'number' ||
            typeof item.precio_unitario !== 'number' ||
            typeof item.stock_producto !== 'number' ||
            typeof item.nombre_producto !== 'string' ||
            !Array.isArray(item.imagenes)
        ) {
            return false
        }
        if (item.cantidad < 1 || item.cantidad > item.stock_producto) {
            return false
        }
    }
    return true
}

export const VerificarRol = (rolesPermitidos) => {
    if (!Rol.value || Rol.value.length === 0) return false
    const permitidos = Array.isArray(rolesPermitidos) ? rolesPermitidos : [rolesPermitidos]
    return Rol.value.some(rol => permitidos.includes(rol))
}

export const VerificarRolExcluido = (rolesnoPermitidos) => {
    if (!Rol.value || Rol.value.length === 0) return true
    const nopermitidos = Array.isArray(rolesnoPermitidos) ? rolesnoPermitidos : [rolesnoPermitidos]
    return Rol.value.some(rol => !nopermitidos.includes(rol))
}