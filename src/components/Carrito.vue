<template>
    <!-- Tabla de Detalles -->
    <div class="contenedor" v-if="CarritoLocal.length > 0">
        <div class="contenedor_principal">
            <h1>
            Tu Carrito
            </h1>
            <div class="contenedor_tabla">
                <table>
                    <thead>
                        <tr>
                            <th>
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
                            <th>
                            Borrar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in CarritoLocal" :key="index">
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
                            <td @click="Eliminacion(index)" style="cursor: pointer;" class="botoncentro">
                            ❌
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>
            Total: ${{ CarritoLocal.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0) }}
            </h2>
            <button @click="PantallaPagar = true">
            Completar Pedido
            </button>
        </div>
    </div>
    <!-- Confirmacion Eliminar Detalle -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="ActualizarCarritoDel">
            <div class="caja_editar">
                <h1>
                ¿Desear Eliminar el Detalle?
                </h1>
                <button @click="BorrarDetalle()">
                Si Confirmo
                </button>
                <button @click="CerrarPopUp">
                Cancelar
                </button>
            </div>
        </div>
    </Teleport>   
    <!-- Pantalla de Pagar -->
    <Teleport to="body">
        <div class="fondo_oscuro" v-if="PantallaPagar">
            <div class="caja_editar">
                <label>
                <h2>
                Método de Pago:
                </h2>
                </label>
                <select v-model="MetodoPago" class="seleccion">
                    <option value="" disabled>
                    Selecciona un método...
                    </option>
                    <option value="Tarjeta">
                    Tarjeta de Crédito / Débito
                    </option>>
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
                <label>
                <h2>
                Dirección de Envío:
                </h2>
                </label>
                <label>
                Tus Direcciones
                </label>
                <select v-model="DireccionExistente" class="seleccion">
                    <option value="">
                    + Agrega una direccion
                    </option>
                    <option v-for="i in ListaDirecciones" :key="i.id_direccion" :value="i.id_direccion">
                    {{ i.calle }},
                    {{ i.numero }},
                    {{ i.barrio }},
                    {{ i.ciudad }},
                    {{ i.provincia }},
                    </option>
                </select>
                <div v-if="DireccionExistente === ''">
                    <div class="Texto_producto">
                        <label>
                        Nueva Direccion:
                        </label>
                        <input 
                        type="text" 
                        v-model="NuevaDireccion.calle" 
                        placeholder="Calle" class=""
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
                        <select v-model="NuevaDireccion.provincia" class="seleccion">
                            <option value="" disabled>
                            Selecciona tu Provincia...
                            </option>
                            <option value="Buenos Aires">
                            Buenos Aires
                            </option>>
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
                <button @click="PantallaPagar = false">
                Cancelar
                </button>
                <button :disabled="confirboton" @click="ConfirmarCompra">
                Finalizar Compra
                </button>   
            </div>
        </div>
    </Teleport>
</template>


<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { CarritoLocal, LimpiarCompra, CerrarSesion, leerCookie } from './Estatus.js'
    const MetodoPago = ref ("")
    const ProductoEli = ref("")
    const ListaDirecciones = ref([])
    const PantallaPagar = ref (false)
    const DireccionExistente = ref ("")
    const ActualizarCarritoDel = ref(false)
    const idClienteCarrito = leerCookie("id_cliente")
    const emit = defineEmits(['CarritoVacio'])
	const AbrirPopUp = () => {
		ActualizarCarritoDel.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp = () => {
		ActualizarCarritoDel.value = false
		document.body.style.overflow = "auto"
	}
    const Eliminacion = (producto_fila) => {
        ProductoEli.value = producto_fila
        AbrirPopUp()
    }
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
            });
            const datos = await SubidaNuevaDireccion.json();
            DireccionPedido = datos.id;
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
        });   
        if (SubidaNuevoPedido.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        const datosPedido = await SubidaNuevoPedido.json();
        const Pedidoid = datosPedido.id;
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
                CerrarSesion();
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
                return;
            }
            emit('CarritoVacio')
            LimpiarCompra()
    })
    const NuevaDireccion = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })
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
    const BorrarDetalle = () => {
        CarritoLocal.value.splice(ProductoEli.value, 1)
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
        CerrarPopUp()
        if (CarritoLocal.value.length === 0) {
            emit('CarritoVacio');
        }
    }
    const VerificarStock = (item) => {
        if (item.cantidad < 1) {
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
    }
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/cliente/${idClienteCarrito}/direcciones`)
        const datos = await respuesta.json();
        ListaDirecciones.value = datos;
    })
</script>

<style scoped>
    .ventana{
        width: 80%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        position: fixed;
        z-index: 1000;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(151, 149, 230);
        border-radius: 15px;
        border: 2px solid #000000;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
    }
    .contenedor{
        width: fit-content;
        display: flex;
        flex-direction: column;
        padding: 15px;
        gap: 15px;
    }
    h1{
        color: black;
        font-size: x-large;
        margin: 0;
        width: fit-content;
    }
    .contenedor_tabla {
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
        border: 2px solid #000000;
    }
    thead{
        background-color: #bcf2f5;
        color: #005f69;
        text-align: center;
    }
    .Boton_Crear{
        padding: 10px;
        border-radius: 5px;
    }
    .Texto_producto{
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        align-self: center;
        text-align: center;
        align-items: center;
        justify-content: center;
        place-self: center;
    }
    .botoncentro{
        background-color: white;
        color: black;
        text-align: center;
    }
</style>