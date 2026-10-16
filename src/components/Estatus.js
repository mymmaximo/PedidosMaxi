// ----- Imports ----- //

import { ref } from 'vue'

// ----- Variables Booleanas ----- //

export const PopUp_Upgrade = ref(false)
export const PopUp_Delete = ref(false)
export const PopUp_Off = ref(false)
export const PopUp_Buy = ref(false)
export const Sesion_Expirada = ref(false)
export const Mostrar_Error = ref(false)
export const Volver_Carro = ref(false)
export const Iniciado = ref(false)

// ----- Variables Vacias ----- //

export const Producto_Actual = ref(null)
export const Carrito_Local = ref ([])
export const Cliente_ID = ref(null)
export const Rol = ref([])

// ----- Variables Simples ----- //

export const Producto_Cantidad = ref(1)

// ----- Funciones Vue ----- //

export const backend_url = "https://backend-pedidos-maxi.vercel.app"
export const Pedido_Guardado = parseInt(localStorage.getItem("pedido"))
export const Pedido_Actual = ref(Pedido_Guardado ? parseInt(Pedido_Guardado) : null)

// ----- Funciones ----- //

// Cargar Carrito //
export const Cargar_Carrito = () => {
    const CarritoOlvidado = localStorage.getItem('carrito_pendiente')
    if (CarritoOlvidado) {
        try {
            const carrito_parse = JSON.parse(CarritoOlvidado)
            if (Validad_Carrito(carrito_parse)) {
                Carrito_Local.value = carrito_parse
                console.log("Carrito valido y recuperado")
            } else {
                console.log("Carrito destruido")
                Limpiar_Compra()
        }} catch(error) {
            console.log("Carrito destruido")
            Limpiar_Compra()
}}}
// Cerrar Sesion //
export const Cerrar_Sesion = async () =>{
    try {
        await fetch (`${backend_url}/logout/`, {
            method: 'POST',
            credentials: 'include'
    })} catch (error) {
        console.error (
            "Error al cerrar sesion en el servidor:",
            error
    )}
    Limpiar_Compra()
    document.cookie = "sesion_activa=; path=/; max-age=0;"
    Rol.value = []
    Cliente_ID.value = null
    Iniciado.value = false
    window.location.href = '/'
}
// Leer Cookie //
export const Leer_Cookie = (nombre) => {
    const valor = `; ${document.cookie}`
    const partes = valor.split(`; ${nombre}=`)
    if (partes.length === 2)
        return partes.pop().split(';').shift()
    return null
}
// Vaciar Carrito //
export const Limpiar_Compra = () =>{
    localStorage.removeItem("carrito_pendiente")
    Carrito_Local.value = []
}
// Validad Sesion Iniciada //
export const Validad_Sesion_Backend = async () => {
    try {
        const respuesta = await fetch(`${backend_url}/reload/`, {
            method: 'GET',
            credentials: 'include'
        })
        if (respuesta.status === 401) {
            if (Leer_Cookie('sesion_activa') === 'true') {
                Sesion_Expirada.value = true
                document.cookie = "sesion_activa=; path=/; max-age=0"
            }
            Iniciado.value = false
            Rol.value = []
            Cliente_ID.value = null
            return false
        }
        if (respuesta.ok) {
            const datos = await respuesta.json()
            Iniciado.value = true
            Rol.value = datos.id_rol || []
            Cliente_ID.value = datos.id_cliente
        } else {
            if (Leer_Cookie('sesion_activa') === 'true') {
                Sesion_Expirada.value = true
                document.cookie = "sesion_activa=; path=/; max-age=0;"
            }
            Iniciado.value = false
            Rol.value = []
            Cliente_ID.value = null
            Limpiar_Compra()
    }} catch (error) {
        console.error("Error validando la sesión:", error)
        Iniciado.value = false
}}
// Verificacion de Carrito //
export const Validad_Carrito = (carrito_check) => {
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
        }}
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
    }}
    return true
}
// Verificacion de Rol //
export const Verificar_Rol = (rolesPermitidos) => {
    if (!Rol.value || Rol.value.length === 0) return false
    const permitidos = Array.isArray(rolesPermitidos) ? rolesPermitidos : [rolesPermitidos]
    return Rol.value.some(rol => permitidos.includes(rol))
}
// Prohibicion de Rol //
export const Verificar_Rol_Excluido = (rolesnoPermitidos) => {
    if (!Rol.value || Rol.value.length === 0) return true
    const nopermitidos = Array.isArray(rolesnoPermitidos) ? rolesnoPermitidos : [rolesnoPermitidos]
    return Rol.value.some(rol => !nopermitidos.includes(rol))
}