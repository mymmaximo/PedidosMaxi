<template>
    <div class="cuerpo">
        <!-- Confirmacion Eliminar Detalle -->
        <Teleport to="body">
            <div v-if="ActualizarCarritoDel"
            @click.self="CerrarPopUp01" 
            class="fondo"
            >
                <div class="popup">
                    <h1>
                    ¿Desear Eliminar el Detalle?
                    </h1>
                    <div class="botones">
                        <button @click="BorrarDetalle()"
                        class="botoncon">
                        Si Confirmo
                        </button>
                        <button @click="CerrarPopUp01"
                        class="botonc">
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>   
        <!-- Pantalla de Pagar -->
        <Teleport to="body">
            <div v-if="PantallaDirecto"
            @click.self="CerrarPopUp02"
            class="fondo"
            >
                <div class="popup">
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
                        <option v-for="i in ListaDirecciones" 
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
                            <input placeholder="Calle"
                            type="text" 
                            v-model="NuevaDireccion.calle" 
                            >
                            <input placeholder="Numero"
                            type="number" 
                            v-model="NuevaDireccion.numero" 
                            >
                            <input placeholder="Barrio"
                            type="text" 
                            v-model="NuevaDireccion.barrio" 
                            >
                            <input placeholder="Ciudad"
                            type="text" 
                            v-model="NuevaDireccion.ciudad" 
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
                        <button @click="CerrarPopUp02"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                        <button @click="ConfirmarCompra"
                        :disabled="confirboton || ProcesandoPago" 
                        class="botoncon"
                        >
                        {{ ProcesandoPago ? 'Cargando...' : 'Realizar Pago' }}
                        </button>   
                    </div>
                </div>
            </div>
        </Teleport>
        <!-- Tabla de Detalles -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="start">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando carrito..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando carrito, un momento...
                        </h2>
                    </div>
                    <div v-else-if="ErrorCarga" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh] gap-4"
                    >
                        <h1 class="text-3xl font-bold text-red-600 text-center">
                        ¡Ups! La conexión tardó demasiado 🔌
                        </h1>
                        <h2 class="text-xl text-gray-700 text-center px-4">
                        El servidor no responde o tu conexión es inestable.
                        </h2>
                        <button @click="CargarDatos" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else class="carrito-contenedor">
                        <div class="carrito-header">
                            <h1>
                            Tu Carrito
                            </h1>
                        </div>
                        <div class="carrito-tabla-cabecera">
                            <div class="col-producto-titulo">
                            Producto
                            </div>
                            <div class="col-titulo">
                            Precio
                            </div>
                            <div class="col-titulo">
                            Cantidad
                            </div>
                            <div class="col-titulo">
                            Subtotal
                            </div>
                            <div class="col_borrar_titulo">
                            Borrar
                            </div>
                        </div>
                        <div class="carrito-lista">
                            <div v-for="(item, index) in CarritoLocal" 
                            :key="index"
                            class="carrito-fila"
                            >
                                <div class="carrito-col-producto">
                                    <div class="carrito-carrusel">
                                        <div v-if="item.imagenes && item.imagenes.length > 0"
                                        class="flex flex-row gap-1 items-center">
                                            <button @click="BackImg(item)"
                                            :disabled="GetImg(item.id_producto) === 0"
                                            class="carrito-btn-flecha"
                                            >
                                            ❮
                                            </button>
                                            <div>
                                                <img v-show="ImagenesCargando[item.id_producto] === false"
                                                :key="item.imagenes[GetImg(item.id_producto)].s3_key"
                                                :src="ObtenerImgUrl(item.imagenes[GetImg(item.id_producto)].s3_key)"
                                                @load="ImagenesCargando[item.id_producto] = false"
                                                class="imagencar !w-16 !h-16 shadow-sm"
                                                >
                                                <div v-if="ImagenesCargando[item.id_producto] !== false" 
                                                class="imagencar !w-16 !h-16"
                                                >
                                                    <img src="../assets/loading.gif" 
                                                    alt="Cargando...">
                                                </div>
                                            </div>
                                            <button @click="NextImg(item)"
                                            :disabled="GetImg(item.id_producto) === item.imagenes.length - 1"
                                            class="carrito-btn-flecha"
                                            >
                                            ❯
                                            </button>
                                        </div>
                                        <img v-else src="../assets/images.png"
                                        class="imagencar !w-16 !h-16 opacity-50"
                                        >
                                    </div>
                                    <h2 class="carrito-nombre-producto">
                                    {{ item.nombre_producto }}
                                    </h2>
                                </div>
                                <div class="carrito-col-precio">
                                    <span class="carrito-label-movil">
                                    Precio:
                                    </span>
                                    ${{ item.precio_unitario }}
                                </div>
                                <div class="carrito-col-cantidad">
                                    <input v-model="item.cantidad"
                                    type="number"
                                    @change="VerificarStock(item)" 
                                    class="carrito-input-cantidad"
                                    >
                                </div>
                                <div class="carrito-col-subtotal">
                                    <span class="carrito-label-movil">
                                    Subtotal:
                                    </span>
                                    ${{ item.item_subtotal || item.cantidad * item.precio_unitario }}
                                </div>

                                <div class="carrito-col-borrar">
                                    <button @click="Eliminacion(index)" 
                                    title="Eliminar"
                                    class="carrito-btn-borrar"
                                    >
                                    🗑️
                                    </button>
                                </div>
                            </div>
                            <div class="carrito-resumen-seccion">
                                <div class="carrito-tarjeta-resumen">
                                    <div class="carrito-resumen-decoracion">
                                    </div>
                                    <h2 class="carrito-resumen-titulo">
                                    Resumen de Compra
                                    </h2>
                                    <div class="carrito-total-bloque">
                                        <span>
                                        Total:
                                        </span>
                                        <span>
                                        ${{ CarritoLocal.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0) }}
                                        </span>
                                    </div>
                                    <button 
                                    @click="AbrirPopUp02"
                                    class="botoncon w-full !text-xl !py-4 z-10 hover:-translate-y-1">
                                    Completar Pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { 
        useRouter 
    } from 'vue-router'
    import { 
        initializePaddle 
    } from '@paddle/paddle-js'
    import { 
        ref, 
        onMounted, 
        computed 
    } from 'vue'
    import { 
        supabase 
    } from '../config/supabase.js'
    import { 
        CarritoLocal, 
        LimpiarCompra, 
        CerrarSesion, 
        Rol, 
        urlover8000, 
        ValidadCarrito, 
        ClienteID, 
        CargarCarrito, 
        SesionExpirada, 
        Iniciado 
    } from './Estatus.js'
    // ----- Variables Vue ----- //
    const router = useRouter()
    const confirboton = computed(() =>{
        if (Rol.value && Rol.value !== "") {
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
    // ----- Variables Complejas ----- //
    const NuevaDireccion = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })
    // ----- Variables Booleanas ----- //
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const ProcesandoPago = ref(false)
    const PantallaDirecto = ref (false)
    const ActualizarCarritoDel = ref(false)
    // ----- Variables Vacias ----- //
    const IndiceImg = ref ({})
    const ProductoEli = ref("")
    const ListaDirecciones = ref([])
    const ImagenesCargando = ref({})
    const InstanciaPaddle = ref(null)
    const DireccionExistente = ref ("")
    // ----- Funciones Vue ----- //
    onMounted (async () => {
        let PagoExito = false
        await CargarDatos()
        CargarCarrito()
        InstanciaPaddle.value = await initializePaddle({
            environment: 'sandbox', 
            token: 'test_04e1ed8d821a1fd086eaaa9ec0b',
            eventCallback: function(evento) {
                if (evento.name === "checkout.completed") {
                    PagoExito = true
                    emit('CarritoVacio')
                    LimpiarCompra()
                    document.body.style.overflow = "auto"
                    router.push('/mis_pedidos')
                } else if (evento.name === "checkout.closed") {
                    if (!PagoExito) {
                        console.log("El usuario cerró la ventana sin pagar")
                    }
                    ProcesandoPago.value = false
                }
            }
        })
    })
    const CargarDatos = (async() => {
        if (!ClienteID.value) { 
            CargandoTrue.value = false
            return
        }
        CargandoTrue.value = true
        ErrorCarga.value = false
        const temporizador = setTimeout(() => {
            if (CargandoTrue.value) {
                CargandoTrue.value = false
                ErrorCarga.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        try {
            const respuesta = await fetch(`${urlover8000}/cliente/${ClienteID.value}/direcciones/`, {
                credentials: 'include'
            })
            const datos = await respuesta.json()
            ListaDirecciones.value = datos
            clearTimeout(temporizador)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(temporizador)
            ErrorCarga.value = true
            CargandoTrue.value = false
        } finally {
            if (!ErrorCarga.value) {
                CargandoTrue.value = false
            }
        }
    })
    const emit = defineEmits([
        'CarritoVacio'
    ])
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCarritoDel.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		PantallaDirecto.value = true
		document.body.style.overflow = "hidden"
        if (ListaDirecciones.value.length > 0)
            DireccionExistente.value = ListaDirecciones.value[0].id_direccion
	}
    const BackImg = (imagen) => {
        const ImgActual = GetImg(imagen.id_producto)
        if (ImgActual > 0) {
            IndiceImg.value[imagen.id_producto] = ImgActual - 1
            ImagenesCargando.value[imagen.id_producto] = true
        }
    }
	const CerrarPopUp01 = () => {
		ActualizarCarritoDel.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		PantallaDirecto.value = false
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
            ImagenesCargando.value[imagen.id_producto] = true
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
            router.push('/')
        }
    }
    const ConfirmarCompra = (async() => {
        if (ProcesandoPago.value) return
        ProcesandoPago.value = true
        if (!ValidadCarrito(CarritoLocal.value)) {
            alert("Manipulación detectada. Tu carrito ha sido vaciado por seguridad.")
            LimpiarCompra()
            emit('CarritoVacio')
            ProcesandoPago.value = false
            return
        }
        let DireccionPedido = null
        if (DireccionExistente.value !== "") {
            DireccionPedido = DireccionExistente.value
        } else {
            const DatosNuevaDireccion = {
                calle: NuevaDireccion.value.calle,
                numero: parseInt(NuevaDireccion.value.numero),
                barrio: NuevaDireccion.value.barrio,
                ciudad: NuevaDireccion.value.ciudad,
                provincia: NuevaDireccion.value.provincia
            }
            const SubidaNuevaDireccion = await fetch(`${urlover8000}/direcciones/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DatosNuevaDireccion),
                credentials: 'include'
            })
            const datos = await SubidaNuevaDireccion.json()
            DireccionPedido = datos.id
        }
        const SubidaNuevoPedido = await fetch(`${urlover8000}/pedidos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_cliente: parseInt(ClienteID.value),
                id_direccion: DireccionPedido,
                metodo_pago: " ",
                tiempo_estimado_entrega: 0,
                tiempo_entrega: 0
            }),
            credentials: 'include'
        })
        if (SubidaNuevoPedido.status === 401) {
            CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            ProcesandoPago.value = false
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
        const SubidaNuevoDetalle = await fetch(`${urlover8000}/pedidos/detalles_pedido/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DetallesLista),
            credentials: 'include'
            })  
            if (SubidaNuevoDetalle.status === 401) {
                CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                ProcesandoPago.value = false
                return
            }
            const subidaTransaccion = await fetch(`${urlover8000}/crear-transaccion-paddle/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pedido: Pedidoid
                }),
                credentials: 'include'
            })

            if (subidaTransaccion.status === 401) {
                CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                ProcesandoPago.value = false
                return
            }

            const datosTransaccion = await subidaTransaccion.json()
            InstanciaPaddle.value?.Checkout.open({
            settings: {
                displayMode: "overlay",
                theme: "light",
                locale: "es"
            },
            transactionId: datosTransaccion.transaction_id
        })
    })
    const VerificarStock = (item) => {
        if (item.cantidad < 1) {
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value))
    }
</script>