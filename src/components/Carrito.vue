<template>
    <div class="cuerpo">
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
        <div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">
                <!-- Tabla de Detalles -->
                <div class="start">
                    <h1>
                    Tu Carrito
                    </h1>
                    <div class="flex flex-row 
                                    gap-3 justify-evenly">
                        <div class="mr-10 ml-5 sm:mr-50 md:mr-70  lg:mr-90  xl:mr-110  2xl:mr-130">
                            <h2>
                            Producto
                            </h2>
                        </div>
                        <div class="flex gap-1 sm:gap-20 md:gap-25 lg:gap-35 xl:gap-48 2xl:gap-50 mr-20">
                            <h2>
                            Precio
                            </h2>
                            <h2>
                            Cantidad
                            </h2>
                            <h2>
                            Subtotal
                            </h2>   
                            <h2>
                            Borrar
                            </h2>   
                        </div>
                    </div>
                    <div v-if="CarritoLocal.length > 0">
                        <div
                        class="mb-2 lg:mb-5"
                        v-for="(item, index) in CarritoLocal" 
                        :key="index"
                        >
                            <div class="tab bg-green-500/30">
                                <div class="flex-1 hidden sm:flex justify-center items-center min-w-0">
                                    <div 
                                    v-if="item.imagenes && item.imagenes.length > 0"
                                    class="flex flex-row 
                                    gap-3 justify-evenly
                                    ">
                                        <button
                                        @click="BackImg(item)"
                                        :disabled="GetImg(item.id_producto) === 0"
                                        class="
                                        botonflecha"
                                        >
                                        🢀
                                        </button>
                                        <img
                                        :key="item.imagenes[GetImg(item.id_producto)].s3_key"
                                        :src=ObtenerImgUrl(item.imagenes[GetImg(item.id_producto)].s3_key)
                                        class="imagencar"
                                        >
                                        <button
                                        @click="NextImg(item)"
                                        :disabled="GetImg(item.id_producto) === item.imagenes.length - 1"
                                        class="botonflecha"
                                        >
                                        🢂
                                        </button>
                                    </div>
                                    <img
                                    v-else
                                    src="../assets/images.png"
                                    class="imagen"
                                    >
                                </div>
                                <div class="flex-1 flex items-center min-w-0">
                                    <div class="flex flex-row">
                                        <h1>
                                        {{ item.nombre_producto }}
                                        </h1>
                                    </div>
                                </div>
                                <div class="flex-1 flex justify-center items-center min-w-0">
                                    <h2>
                                    ${{ item.precio_unitario }}
                                    </h2>
                                </div>
                                <div class="flex-1 flex justify-center items-center min-w-0">
                                    <input 
                                    type="number"
                                    v-model="item.cantidad"
                                    @change="VerificarStock(item)" 
                                    class="
                                    max-w-20
                                    lg:max-w-100
                                    2xl:max-w-200"
                                    >
                                </div>
                                <div class="flex-1 flex justify-center items-center min-w-0">
                                    <h2 class="font-bold">
                                    ${{ item.cantidad * item.precio_unitario }}
                                    </h2>
                                </div>
                                <div class="flex-1 flex justify-center items-center min-w-0">
                                    <button @click="Eliminacion(index)" class="text-2xl">
                                    🗑️
                                    </button>
                                </div>
                            </div>
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
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { ref, onMounted, computed } from 'vue'
    import { supabase } from '../config/supebase.js'
    import { CarritoLocal, LimpiarCompra, CerrarSesion, leerCookie } from './Estatus.js'
    // ----- Variables Complejas ----- //
    const NuevaDireccion = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })
    const idClienteCarrito = leerCookie("id_cliente")
    // ----- Variables Booleanas ----- //
    const PantallaPagar = ref (false)
    const ActualizarCarritoDel = ref(false)
    // ----- Variables Vacias ----- //
    const IndiceImg = ref ({})
    const MetodoPago = ref ("")
    const ProductoEli = ref("")
    const ListaDirecciones = ref([])
    const DireccionExistente = ref ("")
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/cliente/${idClienteCarrito}/direcciones`)
        const datos = await respuesta.json();
        ListaDirecciones.value = datos;
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
    const emit = defineEmits([
        'CarritoVacio'
    ])
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCarritoDel.value = true
		document.body.style.overflow = "hidden"
	}
    const BackImg = (imagen) => {
        const ImgActual = GetImg(imagen.id_producto)
        if (ImgActual > 0) {
            IndiceImg.value[imagen.id_producto] = ImgActual - 1
        }
    }
	const CerrarPopUp01 = () => {
		ActualizarCarritoDel.value = false
		document.body.style.overflow = "auto"
	}
    const Eliminacion = (producto_fila) => {
        ProductoEli.value = producto_fila
        AbrirPopUp01()
    }
    const GetImg = (id) => {
        return IndiceImg.value[id] || 0
    }
    const NextImg = (imagen) => {
        const ImgActual = GetImg(imagen.id_producto)
        if (ImgActual < imagen.imagenes.length - 1) {
            IndiceImg.value[imagen.id_producto] = ImgActual + 1
        }
    }
    const ObtenerImgUrl = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    // ----- Para el Backend ----- //
    const BorrarDetalle = () => {
        CarritoLocal.value.splice(ProductoEli.value, 1)
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value))
        CerrarPopUp01()
        if (CarritoLocal.value.length === 0) {
            emit('CarritoVacio')
        }
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
    const VerificarStock = (item) => {
        if (item.cantidad < 1) {
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
    }
</script>