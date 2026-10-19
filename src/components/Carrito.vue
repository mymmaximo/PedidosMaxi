<template>
    <div class="cuerpo">

        <!-- Confirmacion -->
        <!-- Borrar Detalle -->
        <Teleport to="body">
            <div v-if="PopUp_Delete"
            @click.self="Cerrar_PopUp_Delete"
            class="fondo"
            >
                <div class="popup">

                    <!-- Encabezado -->
                    <h1>
                        ¿Desear Borrar el Detalle?
                    </h1>

                    <!-- Botones -->
                    <div class="botones">
                        <button @click="Frontend_Delete()"
                        class="botoncon"
                        >
                            Si Confirmo
                        </button>
                        <button @click="Cerrar_PopUp_Delete"
                        class="botonc"
                        >
                            Cancelar
                        </button>
                    </div>
                    
                </div>
            </div>
        </Teleport>   

        <!-- Formulario -->
        <!-- Comfirmar Pago -->
        <Teleport to="body">
            <div v-if="PopUp_Pay"
            @click.self="Cerrar_PopUp_Pay"
            class="fondo"
            >
                <div class="popup">

                    <!-- Encabezado -->
                    <h1>
                        Dirección de Envío:
                    </h1>
                    <h3>
                        Tus Direcciones
                    </h3>

                    <!-- Tiene Direcciones Guardadas -->
                    <select v-model="Datos_Direccion">
                        <option value="">
                            + Agrega una direccion
                        </option>
                        <option v-for="i in Datos_Direcciones" 
                        :key="i.id_direccion" 
                        :value="i.id_direccion"
                        >
                            {{ i.calle }}, {{ i.numero }}, {{ i.barrio }}, {{ i.ciudad }}, {{ i.provincia }}
                        </option>
                    </select>

                    <!-- Crear Direccion -->
                    <div v-if="Datos_Direccion === ''">
                            <h3>
                                Nueva Direccion:
                            </h3>
                        <div class="botones">
                            <input placeholder="Calle"
                            type="text" 
                            v-model="Datos_New.calle" 
                            >
                            <input placeholder="Numero"
                            type="text" 
                            v-model="Datos_New.numero" 
                            maxlength="6"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                            >
                            <input placeholder="Barrio"
                            type="text" 
                            v-model="Datos_New.barrio" 
                            >
                            <input placeholder="Ciudad"
                            type="text" 
                            v-model="Datos_New.ciudad" 
                            >
                            <select v-model="Datos_New.provincia">

                                <!-- Provincias -->
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

                    <!-- Botones -->
                    <div class="botones">
                        <button @click="Cerrar_PopUp_Pay"
                        class="botonc"
                        >
                            Cancelar
                        </button>
                        <button @click="Backend_Post"
                        :disabled="Verificar_Boton || Procesando_Pago" 
                        class="botoncon"
                        >
                            {{ Procesando_Pago ? 'Cargando...' : 'Realizar Pago' }}
                        </button>   
                    </div>

                </div>
            </div>
        </Teleport>
        
        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="start">

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
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

                    <!-- Error Cargando -->
                    <div v-else-if="Backend_Error" 
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
                        <div class="mt-6 flex justify-center">
                            <button @click="Backend_Cargar()" 
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Recargar Página
                            </button>
                        </div>
                    </div>
                    
                    <!-- Carrito -->
                    <div v-else class="carrito-contenedor">

                        <!-- Encabezado -->
                        <div class="titulo-config">
                            <h1>
                                Tu Carrito
                            </h1>
                        </div>

                        <!-- Datos Encabezado -->
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

                        <!-- Productos en Carrito -->
                        <div class="carrito-lista">
                            <div v-for="(item, index) in Carrito_Local" 
                            :key="index"
                            class="carrito-fila"
                            >
                                <div class="carrito-col-producto">

                                    <!-- Imagenes de Producto -->
                                    <div class="carrito-carrusel">
                                        <div v-if="item.imagenes && item.imagenes.length > 0"
                                        class="flex flex-row gap-1 items-center">
                                            <button @click="Imagen_Anterior(item)"
                                            :disabled="Imagen_Leer(item.id_producto) === 0"
                                            class="carrito-btn-flecha"
                                            >
                                                ❮
                                            </button>
                                            <div>
                                                <img v-show="Imagen_Espera[item.id_producto] === false"
                                                :key="item.imagenes[Imagen_Leer(item.id_producto)].s3_key"
                                                :src="Imagen_Url(item.imagenes[Imagen_Leer(item.id_producto)].s3_key)"
                                                @load="Imagen_Espera[item.id_producto] = false"
                                                class="imagencar !w-16 !h-16 shadow-sm"
                                                >
                                                <div v-if="Imagen_Espera[item.id_producto] !== false" 
                                                class="imagencar !w-16 !h-16"
                                                >
                                                    <img src="../assets/loading.gif" 
                                                    alt="Cargando...">
                                                </div>
                                            </div>
                                            <button @click="Imagen_Siguiente(item)"
                                            :disabled="Imagen_Leer(item.id_producto) === item.imagenes.length - 1"
                                            class="carrito-btn-flecha"
                                            >
                                                ❯
                                            </button>
                                        </div>
                                        <img v-else src="../assets/images.png"
                                        class="imagencar !w-16 !h-16 opacity-50"
                                        >
                                    </div>

                                    <!-- Nombre del Producto -->
                                    <h2 class="carrito-nombre-producto">
                                        {{ item.nombre_producto }}
                                    </h2>

                                </div>

                                <!-- Precio del Producto -->
                                <div class="carrito-col-precio">
                                    <span class="carrito-label-movil">
                                        Precio:
                                    </span>
                                        ${{ Formato_Precios(item.precio_unitario) }}
                                </div>

                                <!-- Stock del Producto (Incluye Verificacion) -->
                                <div class="carrito-col-cantidad">
                                    <input v-model="item.cantidad"
                                    type="number"
                                    @change="Verificar_Stock(item)" 
                                    class="carrito-input-cantidad"
                                    >
                                </div>

                                <!-- Subtotal (Calculado) -->
                                <div class="carrito-col-subtotal">
                                    <span class="carrito-label-movil">
                                        Subtotal:
                                    </span>
                                        $ {{ Formato_Precios(item.item_subtotal || item.cantidad * item.precio_unitario) }}
                                </div>

                                <!-- Boton Borrar Producto de Carrito -->
                                <div class="carrito-col-borrar">
                                    <button @click="Abrir_PopUp_Delete(index)" 
                                    title="Eliminar"
                                    class="carrito-btn-borrar"
                                    >
                                        🗑️
                                    </button>
                                </div>

                            </div>

                            <!-- Resumen de Compra y Boton de Compra -->
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
                                            $ {{ Formato_Precios(Carrito_Local.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0)) }}
                                        </span>
                                    </div>
                                    <button @click="Abrir_PopUp_Pay"
                                    class="botoncon 
                                    w-full !text-xl !py-4 
                                    z-10 hover:-translate-y-1"
                                    >
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
        Carrito_Local, 
        Limpiar_Compra, 
        Cerrar_Sesion, 
        Rol, 
        backend_url, 
        Validad_Carrito, 
        PopUp_Delete,
        Cliente_ID, 
        Cargar_Carrito, 
        Sesion_Expirada, 
        Iniciado 
    } from './Estatus.js'

    // ----- Variables Vue ----- //

    // Verificacion del Boton //
    const Verificar_Boton = computed(() =>{
        if (Rol.value && Rol.value.length > 0) {
            return true
        }
        if (Datos_Direccion.value === "") {
            if (
                Datos_New.value.calle === ""||
                Datos_New.value.numero === ""||
                Datos_New.value.barrio === ""||
                Datos_New.value.ciudad === ""||
                Datos_New.value.provincia === ""
            ) {
                return true
        }}
        return false
    })
    // Primera Carga de Datos de la Pagina //
    onMounted (async () => {
        let Pago_Exitoso = false
        await Backend_Cargar()
        Cargar_Carrito()
        // Llamar Pasarela de Pago
        Instancia_Paddle.value = await initializePaddle({
            environment: 'sandbox', 
            token: 'test_04e1ed8d821a1fd086eaaa9ec0b',
            eventCallback: function(evento) {
                if (evento.name === "checkout.completed") {
                    Pago_Exitoso = true
                    emit('CarritoVacio')
                    Limpiar_Compra()
                    document.body.style.overflow = "auto"
                    router.push('/mis_pedidos')
                } else if (evento.name === "checkout.closed") {
                    if (!Pago_Exitoso) {
                        console.log("El usuario cerró la ventana sin pagar")
                    }
                    Procesando_Pago.value = false
    }}})})
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (!Cliente_ID.value) { 
            Backend_Espera.value = false
            return
        }
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
        }}, 15000)
        // Leer Direcciones de Cliente
        try {
            const respuesta = await fetch(`${backend_url}/cliente/${Cliente_ID.value}/direcciones/`, {
                credentials: 'include'
            })
            const datos = await respuesta.json()
            Datos_Direcciones.value = datos
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
    }}})
    const emit = defineEmits([
        'CarritoVacio'
    ])
    const router = useRouter()

    // ----- Variables Complejas ----- //

    // Almacen para Nuevas Direcciones //
    const Datos_New = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })

    // ----- Variables Booleanas ----- //
    
    const PopUp_Pay = ref (false)
    const Backend_Error = ref (false)
    const Backend_Espera = ref (true)
    const Procesando_Pago = ref (false)

    // ----- Variables Vacias ----- //
    
    const Datos_Delete = ref ("")
    const Imagen_Espera = ref ({})
    const Imagen_Indice = ref ({})
    const Datos_Direccion = ref ("")
    const Datos_Direcciones = ref ([])
    const Instancia_Paddle = ref (null)

    // ----- Funciones Frontend ----- //
    
    // Abrir Pop up para Borrar Detalle //
	const Abrir_PopUp_Delete = (producto_fila) => {
        Datos_Delete.value = producto_fila
		PopUp_Delete.value = true
		document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Confirmar el Pago (Si no Inicio Sesion /login) //
	const Abrir_PopUp_Pay = () => {
        if (!Iniciado.value) {
            router.push('/login')
            return
        }
		PopUp_Pay.value = true
		document.body.style.overflow = "hidden"
        if (Datos_Direcciones.value.length > 0)
            Datos_Direccion.value = Datos_Direcciones.value[0].id_direccion
	}
    // Cerrar Pop up de Borrar Detalle //
	const Cerrar_PopUp_Delete = () => {
		PopUp_Delete.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up de Borrar Detalle //
	const Cerrar_PopUp_Pay = () => {
		PopUp_Pay.value = false
		document.body.style.overflow = "auto"
	}
    // Leer Precio con Formato Pesos Argentinos //
    const Formato_Precios = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    // Leer Imagen Anterior //
    const Imagen_Anterior = (imagen) => {
        const Imagen_Actual = Imagen_Leer(imagen.id_producto)
        if (Imagen_Actual > 0) {
            Imagen_Indice.value[imagen.id_producto] = Imagen_Actual - 1
            Imagen_Espera.value[imagen.id_producto] = true
    }}
    // Leer Imagen //
    const Imagen_Leer = (id) => {
        return Imagen_Indice.value[id] || 0
    }
    // Leer Imagen Siguiente //
    const Imagen_Siguiente = (imagen) => {
        const Imagen_Actual = Imagen_Leer(imagen.id_producto)
        if (Imagen_Actual < imagen.imagenes.length - 1) {
            Imagen_Indice.value[imagen.id_producto] = Imagen_Actual + 1
            Imagen_Espera.value[imagen.id_producto] = true
    }}
    // Obtener Url/Link de Imagen //
    const Imagen_Url = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }

    // ----- Funciones Backend ----- //
    
    // Enviar Pedido Completo al Backend //
    const Backend_Post = (async() => {
        if (Procesando_Pago.value) return
        Procesando_Pago.value = true
        // Verificacion de Carrito
        if (!Validad_Carrito(Carrito_Local.value)) {
            alert("Manipulación detectada. Tu carrito ha sido vaciado por seguridad.")
            Limpiar_Compra()
            emit('CarritoVacio')
            Procesando_Pago.value = false
            return
        }
        // Confirmar Compra
        try {
            let Datos_Direccion_Pedido = null
            if (Datos_Direccion.value !== "") {
                Datos_Direccion_Pedido = Datos_Direccion.value
            } else {
                // Establecer Datos de Nueva de Direccion
                const DatosBackend = {
                    calle: Datos_New.value.calle,
                    numero: parseInt(Datos_New.value.numero),
                    barrio: Datos_New.value.barrio,
                    ciudad: Datos_New.value.ciudad,
                    provincia: Datos_New.value.provincia
                }
                // Subir Datos de Nueva de Direccion
                const PostBackend_Direccion = await fetch(`${backend_url}/direcciones/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(DatosBackend),
                    credentials: 'include'
                })
                const datos = await PostBackend_Direccion.json()
                Datos_Direccion_Pedido = datos.id
            }
            // Subir Nuevo Pedido
            const PostBackend = await fetch(`${backend_url}/pedidos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: parseInt(Cliente_ID.value),
                    id_direccion: Datos_Direccion_Pedido,
                    metodo_pago: " ",
                    tiempo_estimado_entrega: 0,
                    tiempo_entrega: 0
                }),
                credentials: 'include'
            })
            // Sesion Vencida
            if (PostBackend.status === 401) {
                Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                Procesando_Pago.value = false
                return
            }
            const DatosPedido = await PostBackend.json()
            const Pedidoid = DatosPedido.id
            // Establecer Lista de Detalles de Pedido
            const DatosDetalle = Carrito_Local.value.map(item => {
                return {
                    id_pedido: Pedidoid,
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: item.precio_unitario
            }})
            // Subir Lista de Detalles de Pedido
            const PostBackend_Detalle = await fetch(`${backend_url}/pedidos/detalles_pedido/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DatosDetalle),
                credentials: 'include'
                })
            // Sesion Vencida
            if (PostBackend_Detalle.status === 401) {
                Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                Procesando_Pago.value = false
                return
            }
            // Subir Transaccion de Pasarela de Pago
            const PostBackend_Paddle = await fetch(`${backend_url}/crear-transaccion-paddle/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pedido: Pedidoid
                }),
                credentials: 'include'
            })
            // Sesion Vencida
            if (PostBackend_Paddle.status === 401) {
                Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                Procesando_Pago.value = false
                return
            }
            const DatosPaddle = await PostBackend_Paddle.json()
            Instancia_Paddle.value?.Checkout.open({
                settings: {
                    displayMode: "overlay",
                    theme: "light",
                    locale: "es"
                },
                transactionId: DatosPaddle.transaction_id
            })
        } catch (error) {
            console.error("Error crítico procesando la compra:", error)
            alert("Ocurrió un problema al procesar tu pedido. Por favor, intenta de nuevo.")
            Procesando_Pago.value = false
    }})
    // Borrar Detalle de Pedido del Carrito //
    const Frontend_Delete = () => {
        Carrito_Local.value.splice(Datos_Delete.value, 1)
        localStorage.setItem('carrito_pendiente', JSON.stringify(Carrito_Local.value))
        Cerrar_PopUp_Delete()
        // Carrito Vacio, vuelve al Inicio
        if (Carrito_Local.value.length === 0) {
            emit('CarritoVacio')
            router.push('/')
    }}
    // Verificacion de Stock > 0 //
    const Verificar_Stock = (item) => {
        if (item.cantidad < 1) {
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem(
            'carrito_pendiente', 
            JSON.stringify(Carrito_Local.value
    ))}
    
</script>