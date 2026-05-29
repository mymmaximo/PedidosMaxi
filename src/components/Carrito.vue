<template>
    <!-- Confirmacion Eliminar Detalle -->
    <Teleport to="body">
        <div
        v-if="ActualizarCarritoDel"
        class="fondo"
        >
            <div class="popup">
                <h1>
                ¿Desear Eliminar el Detalle?
                </h1>
                <div class="botones">
                    <button 
                    @click="BorrarDetalle()"
                    class="botoncon">
                    Si Confirmo
                    </button>
                    <button
                    @click="CerrarPopUp01"
                    class="botonc">
                    Cancelar
                    </button>
                </div>
            </div>
        </div>
    </Teleport>   
    <!-- Pantalla de Pagar -->
    <Teleport to="body">
        <div class="fondo" v-if="PantallaPagar">
            <div class="popup">
                <h1>
                Método de Pago:
                </h1>
                <select v-model="MetodoPago">
                    <option value="" disabled>
                    Selecciona un método...
                    </option>
                    <option value="Tarjeta">
                    Tarjeta de Crédito / Débito
                    </option>
                    <option value="MercadoPago">
                    Mercado Pago
                    </option>
                    <option value="Transferencia">
                    Transferencia Bancaria
                    </option>
                    <option value="Efectivo">
                    Efectivo al recibir
                    </option>
                </select>
                <h1>
                Dirección de Envío:
                </h1>
                <h3>
                Tus Direcciones
                </h3>
                <select v-model="DireccionExistente">
                    <option value="">
                    + Agrega una direccion
                    </option>
                    <option 
                    v-for="i in ListaDirecciones" 
                    :key="i.id_direccion" 
                    :value="i.id_direccion"
                    >
                    {{ i.calle }},
                    {{ i.numero }},
                    {{ i.barrio }},
                    {{ i.ciudad }},
                    {{ i.provincia }},
                    </option>
                </select>
                <div v-if="DireccionExistente === ''">
                        <h3>
                        Nueva Direccion:
                        </h3>
                    <div class="botones">
                        <input 
                        type="text" 
                        v-model="NuevaDireccion.calle" 
                        placeholder="Calle"
                        >
                        <input 
                        type="number" 
                        v-model="NuevaDireccion.numero" 
                        placeholder="Numero"
                        >
                        <input 
                        type="text" 
                        v-model="NuevaDireccion.barrio" 
                        placeholder="Barrio"
                        >
                        <input 
                        type="text" 
                        v-model="NuevaDireccion.ciudad" 
                        placeholder="Ciudad"
                        >
                        <select v-model="NuevaDireccion.provincia">
                            <option value="" disabled>
                            Selecciona tu Provincia...
                            </option>
                            <option value="Buenos Aires">
                            Buenos Aires
                            </option>
                            <option value="Catamarca">
                            Catamarca
                            </option>
                            <option value="Chaco">
                            Chaco
                            </option>
                            <option value="Chubut">
                            Chubut
                            </option>
                            <option value="Córdoba">
                            Córdoba
                            </option>
                            <option value="Corrientes">
                            Corrientes
                            </option>
                            <option value="Entre Ríos">
                            Entre Ríos
                            </option>
                            <option value="Formosa">
                            Formosa
                            </option>
                            <option value="Jujuy">
                            Jujuy
                            </option>
                            <option value="La Pampa">
                            La Pampa
                            </option>
                            <option value="La Pampa">
                            La Pampa
                            </option>
                            <option value="La Rioja">
                            La Rioja
                            </option>
                            <option value="Mendoza">
                            Mendoza
                            </option>
                            <option value="Misiones">
                            Misiones
                            </option>
                            <option value="Neuquén">
                            Neuquén
                            </option>
                            <option value="Río Negro">
                            Río Negro
                            </option>
                            <option value="Salta">
                            Salta
                            </option>
                            <option value="San Juan">
                            San Juan
                            </option>
                            <option value="San Luis">
                            San Luis
                            </option>
                            <option value="Santa Cruz">
                            Santa Cruz
                            </option>
                            <option value="Santa Fe">
                            Santa Fe
                            </option>
                            <option value="Santiago del Estero">
                            Santiago del Estero
                            </option>
                            <option value="Tierra del Fuego">
                            Tierra del Fuego
                            </option>
                            <option value="Tucumán">
                            Tucumán
                            </option>
                        </select>
                    </div>
                </div>
                <div class="botones">
                    <button 
                    @click="PantallaPagar = false"
                    class="botonc"
                    >
                    Cancelar
                    </button>
                    <button 
                    :disabled="confirboton" 
                    @click="ConfirmarCompra"
                    class="botoncon"
                    >
                    Finalizar Compra
                    </button>   
                </div>
            </div>
        </div>
    </Teleport>
    <!-- Tabla de Detalles -->
    <div
    v-if="CarritoLocal.length > 0" 
    class="cuerpo"
    >
        <div>
            <h1 class="text-center">
            Tu Carrito
            </h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th
                            class="
                            rounded-ss-2xl 
                            ">
                            Producto
                            </th>
                            <th>
                            Cantidad
                            </th>
                            <th>
                            Precio Unit.
                            </th>
                            <th>
                            Subtotal
                            </th>
                            <th
                            class="
                            rounded-se-2xl 
                            ">
                            Borrar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                        v-for="(item, index) in CarritoLocal" 
                        :key="index"
                        >
                            <td>
                            {{ item.nombre_producto }}
                            </td>
                            <td>
                            <input 
                            type="number"
                            v-model="item.cantidad"
                            @change="VerificarStock(item)" 
                            class="botoncentro"
                            >
                            </td>
                            <td>
                            ${{ item.precio_unitario }}
                            </td>
                            <td>
                            ${{ item.cantidad * item.precio_unitario }}
                            </td>
                            <td 
                            @click="Eliminacion(index)"
                            >
                            ❌
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="botones">
                <h1
                class="
                place-self-center
                text-center
                bg-green-100 
                border-green-500 rounded-2xl border-4
                my-1
                lg:my-3
                2xl:my-5"
                >
                Total: ${{ CarritoLocal.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0) }}
                </h1>
                <button 
                @click="PantallaPagar = true"
                class="botoncon">
                Completar Pedido
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
    // ----- Imports ----- //
    import { ref, onMounted, computed } from 'vue'
    import { CarritoLocal, LimpiarCompra, CerrarSesion, leerCookie } from './Estatus.js'
    // ----- Variantes ----- //
    const MetodoPago = ref ("")
    const ProductoEli = ref("")
    const ListaDirecciones = ref([])
    const PantallaPagar = ref (false)
    const DireccionExistente = ref ("")
    const ActualizarCarritoDel = ref(false)
    const idClienteCarrito = leerCookie("id_cliente")
    // ----- Funciones Vue ----- //
    const emit = defineEmits([
        'CarritoVacio'
    ])
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/cliente/${idClienteCarrito}/direcciones`)
        const datos = await respuesta.json();
        ListaDirecciones.value = datos;
    })
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCarritoDel.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp01 = () => {
		ActualizarCarritoDel.value = false
		document.body.style.overflow = "auto"
	}
    const NuevaDireccion = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })
    const Eliminacion = (producto_fila) => {
        ProductoEli.value = producto_fila
        AbrirPopUp01()
    }
    // ----- Para el Backend ----- //
    const VerificarStock = (item) => {
        if (item.cantidad < 1) {
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
    }
    const confirboton = computed(() =>{
        if (MetodoPago.value === "") {
            return true
        }
        if (DireccionExistente.value === "") {
            if (
                NuevaDireccion.value.calle === ""||
                NuevaDireccion.value.numero === ""||
                NuevaDireccion.value.barrio === ""||
                NuevaDireccion.value.ciudad === ""||
                NuevaDireccion.value.provincia === ""
            ) {
                return true
        }}
        return false
    })
    const ConfirmarCompra = (async() => {
        let DireccionPedido = null
        if (DireccionExistente.value !== "") {
            DireccionPedido = DireccionExistente.value
        } else {
            DireccionPedido = NuevaDireccion.value
            const SubidaNuevaDireccion = await fetch('http://localhost:8000/direcciones/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(NuevaDireccion.value)
            })
            const datos = await SubidaNuevaDireccion.json()
            DireccionPedido = datos.id
        }
        const SubidaNuevoPedido = await fetch('http://localhost:8000/pedidos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${leerCookie("token")}`
            },
            body: JSON.stringify({
                id_cliente: idClienteCarrito,
                id_direccion: DireccionPedido,
                metodo_pago: MetodoPago.value
            })
        })
        if (SubidaNuevoPedido.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            return
        }
        const datosPedido = await SubidaNuevoPedido.json()
        const Pedidoid = datosPedido.id
        const DetallesLista = CarritoLocal.value.map(item => {
            return {
                id_pedido: Pedidoid,
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario
            }
        })
        const SubidaNuevoDetalle = await fetch('http://localhost:8000/pedidos/detalles_pedido/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${leerCookie("token")}`
            },
            body: JSON.stringify(DetallesLista)
            })   
            if (SubidaNuevoDetalle.status === 401) {
                CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
                return
            }
            emit('CarritoVacio')
            LimpiarCompra()
    })
    const BorrarDetalle = () => {
        CarritoLocal.value.splice(ProductoEli.value, 1)
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value))
        CerrarPopUp01()
        if (CarritoLocal.value.length === 0) {
            emit('CarritoVacio')
        }
    }
</script>