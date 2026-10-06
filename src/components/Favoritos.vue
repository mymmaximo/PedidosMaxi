<template>
    <div class="cuerpo">

        <!-- Notificación -->
        <!-- Adicion al Carrito Exitosa -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="MostrarConfir" 
                class="notificacion"
                >
                    <span class="text-xl drop-shadow-sm">
                        🛒
                    </span>
                    <span>
                        ¡Agregado al carrito con éxito!
                    </span>
                </div>
            </transition>
        </Teleport>

        <!-- Confirmacion -->
        <!-- Confirmacion Quitar -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="QuitarCaja"
                @click.self="CerrarPopUp01"
                class="fondo"
                >
                    <div class="popup">
                        <h1 class="text-center">
                            ¿Desear Quitar {{ ProductoQ.nombre }} de Mis Favoritos?
                        </h1>
                        <!-- Imagenes del Producto -->
                        <div>
                            <div v-if="ProductoQ.imagenes.length > 0"
                            class="flex flex-row 
                            gap-3 overflow-x-auto
                            items-center justify-center 
                            w-full pb-2 snap-x"
                            >
                                <button @click="BackImg(ProductoQ)"
                                :disabled="GetImg(ProductoQ.id) === 0"
                                class="botonflecha"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="ImagenesCargando[ProductoQ.id] === false"
                                    :src=ObtenerImgUrl(ProductoQ.imagenes[GetImg(ProductoQ.id)].s3_key)
                                    @load="ImagenesCargando[ProductoQ.id] = false"
                                    class="imagen"
                                    >
                                    <div v-if="ImagenesCargando[ProductoQ.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="imagen !2xl:p-15"
                                        >
                                    </div>
                                </div>
                                <button @click="NextImg(ProductoQ)"
                                :disabled="GetImg(ProductoQ.id) === ProductoQ.imagenes.length - 1"
                                class="botonflecha"
                                >
                                    ❯
                                </button>
                            </div>
                            <img v-else src="../assets/images.png"
                            class="imagen"
                            >
                        </div>
                        <div class="botones">
                            <button @click="Quitar()"
                            class="botoncon"
                            >
                                Confirmo
                            </button>
                            <button @click="CerrarPopUp01"
                            class="botonc"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>

        <!-- Formulario -->
        <!-- Añadir al Carrito -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="VentanaCompra"
                @click.self="CerrarPopUp02"
                class="fondo" 
                >
                    <div class="popup popup-compra">
                        <h1>
                            {{ ProductoActual.nombre }}
                        </h1>
                        <!-- Imagenes del Producto -->
                        <div class="carrusel-contenedor">
                            <div v-if="ProductoActual.imagenes.length > 0"
                            class="carrusel-fila"
                            >
                                <button @click="BackImg(ProductoActual)"
                                :disabled="GetImg(ProductoActual.id) === 0"
                                class="carrusel-btn"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="ImagenesCargando[ProductoActual.id] === false"
                                    :src=ObtenerImgUrl(ProductoActual.imagenes[GetImg(ProductoActual.id)].s3_key)
                                    @load="ImagenesCargando[ProductoActual.id] = false"
                                    class="carrusel-img"
                                    >
                                    <div v-if="ImagenesCargando[ProductoActual.id] !== false" 
                                    class="absolute inset-0 flex items-center justify-center"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="w-12 h-12 opacity-50"
                                        >
                                    </div>
                                </div>
                                <button @click="NextImg(ProductoActual)"
                                :disabled="GetImg(ProductoActual.id) === ProductoActual.imagenes.length - 1"
                                class="carrusel-btn"
                                >
                                    ❯
                                </button>
                            </div>
                            <div v-else class="carrusel-img-caja">
                                <img src="../assets/images.png" 
                                class="carrusel-img opacity-40 grayscale"
                                >
                            </div>
                        </div>
                        <!-- Cantidad de Producto -->
                        <div class="panel-compra">
                            <div class="control-cantidad">
                                <button @click="RestarProducto(ProductoActual)"
                                class="control-btn-restar"
                                >
                                    ━
                                </button>
                                <input v-model="ProductoCantidad"
                                type="number" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                class="control-input"
                                >
                                <button @click="SumarProducto(ProductoActual)"
                                class="control-btn-sumar"s
                                >
                                    ✚
                                </button>
                            </div>
                            <div class="total-caja">
                                <span class="total-subtitulo">
                                    Precio Total
                                </span>
                                <span class="total-valor">
                                    $ {{ FormatearPrecio(ProductoActual.precio * ProductoCantidad) }}
                                </span>
                            </div>
                        </div>
                        <div class="botones mt-2">
                            <button @click="SumarCarrito"
                            class="botoncon"
                            >
                                Agregar al Carrito
                            </button>
                            <button @click="CerrarPopUp02"
                            class="botonc"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>

        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">

                <!-- Mostrar Fondo en Celular -->
                <Teleport to="body">
                    <transition name="fade">
                        <div v-if="MostrarFiltro" 
                        @click="MostrarFiltro = false"
                        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>

                <!-- Barra de Filtros de Productos Favoritos -->
                <div :class="['bar', MostrarFiltro 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >
                    <!-- Barra de Filtros -->
                    <div class="hidden sm:block">

                        <!-- Boton de Filtros -->
                        <h1 @click="MostrarFiltro = !MostrarFiltro" 
                        class="botonfil"
                        >
                            ᯤ
                        </h1>

                    </div>
                    <transition name="slide">
                        <div v-if="MostrarFiltro" 
                        class="flex flex-col lg:self-center"
                        >
                            <!-- Orden de Productos Favoritos -->
                            <div class="flex flex-col md:px-4 md:pb-4 p-2 !pt-0">
                                <h1 class="!mt-0">
                                    Ordenar
                                </h1>
                                <select v-model="orden" 
                                placeholder=""
                                >
                                    <option value="" disabled>
                                        Orden...
                                    </option>
                                    <option value="8">
                                        Agregados Recientemente
                                    </option>
                                    <option value="7">
                                        Agregados más Antiguos
                                    </option>
                                    <option value="1">
                                        Nombre A-Z
                                    </option>
                                    <option value="2">
                                        Nombre Z-A
                                    </option>
                                    <option value="3">
                                        Mayor Precio
                                    </option>
                                    <option value="4">
                                        Menor Precio
                                    </option>
                                    <option value="5">
                                        Mayor Stock
                                    </option>
                                    <option value="6">
                                        Menor Stock
                                    </option>
                                </select>
                            </div>

                            <!-- Filtro de Categoria -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2>
                                    Filtro Categoria
                                </h2>
                                <div>
                                    <select v-model="filtrocat">
                                        <option value="" disabled>
                                            Categorias...
                                        </option>
                                        <option v-for="i in ListaCategoria" 
                                        :key="i.categoria" 
                                        :value="i.categoria"
                                        >
                                            {{ i.categoria }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <!-- Filtro de Precio (Rango Fijos) -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2>
                                    Filtros de Precio
                                </h2>
                                <label>
                                    <input :value="4" 
                                    type="radio" 
                                    v-model="filtroRadio"
                                    > 
                                        Cualquier Precio
                                </label>
                                <label>
                                    <input :value="3" 
                                    type="radio" 
                                    v-model="filtroRadio"
                                    > 
                                        Hasta $10,000
                                </label>
                                <label>
                                    <input :value="2" 
                                    type="radio" 
                                    v-model="filtroRadio"
                                    > 
                                        $10,000 a $50,000
                                </label>
                                <label>
                                    <input :value="1" 
                                    type="radio" 
                                    v-model="filtroRadio"
                                    > 
                                        Más de $50,000
                                </label>
                                <label>
                                    <input :value="0" 
                                    type="radio" 
                                    v-model="filtroRadio"
                                    > 
                                        Personalizado
                                </label>
                            </div>

                            <!-- Filtro de Precio (Rango Personalizados) -->
                            <div v-if="filtroRadio === 0" 
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h3 class="flex flex-col md:p-4 p-2">
                                    Precio Mayor
                                </h3>
                                <input placeholder="Precio Max..." 
                                type="number" 
                                v-model="mayor" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                                <h3 class="flex flex-col md:p-4 p-2">
                                    Precio Minimo
                                </h3>
                                <input placeholder="Precio Min..." 
                                type="number" 
                                v-model="menor" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                            </div>
                            <div class="botones">
                                <button @click="AplicarFiltro" 
                                class="botoncon">
                                    Aplicar Filtros
                                </button>
                                <button @click="LimpiarFiltro" 
                                v-if="filtroAct === true" 
                                class="botont">
                                    🗑️ Limpiar Filtro
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Tabla de Productos Favoritos -->
                <div class="start">
                    
                    <!-- Gif Cargando -->
                    <div v-if="CargandoTrue" 
                    class="flex flex-col items-center justify-center w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando favoritos..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                            Cargando tus favoritos...
                        </h2>
                    </div>

                    <!-- Error Cargando -->
                    <div v-else-if="ErrorCarga" 
                    class="flex flex-col items-center justify-center w-full h-[60vh] gap-4"
                    >
                        <h1 class="text-3xl font-bold text-red-600 text-center">
                            ¡Ups! Algo falló 🔌
                        </h1>
                        <h2 class="text-xl text-gray-700 text-center px-4">
                            No pudimos cargar tus favoritos.
                        </h2>
                        <div class="mt-6 flex justify-center">
                            <button @click="CargarDatos()" 
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Reintentar
                            </button>
                        </div>
                    </div>

                    <!-- Favoritos -->
                    <div v-else>
                        <div class="px-5 w-full">

                            <!-- Mostrar Boton Filtro en Celular -->
                            <button @click="MostrarFiltro = true" 
                            class="sm:hidden w-full mb-4 py-3 bg-white text-green-800 font-black text-lg border-2 border-green-200 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 active:bg-green-50">
                                ᯤ Abrir Filtros
                            </button>

                            <!-- Encabezado -->
                            <h1 class="text-2xl font-black text-green-800 mb-4 ml-1">
                                🤍 Mi Lista de Deseos
                            </h1>

                            <div class="flex flex-row items-stretch w-full gap-3 mb-5">

                                <!-- Barra de Busqueda -->
                                <input @input="BusquedaFavoritos"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Buscar en mis favoritos..."
                                class="busqueda !mb-0 !w-full"
                                maxlength="50"
                                >

                                <!-- Vista en Lista/Carta -->
                                <button @click="VistaLista = !VistaLista"
                                title="Alternar Vista"
                                class="shrink-0 flex items-center justify-center bg-white border-2 border-green-200 text-green-700 rounded-xl w-12 sm:w-14 hover:bg-green-50 transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                    <span v-if="!VistaLista" class="text-xl">
                                        「 」
                                    </span>
                                    <span v-else class="text-xl">
                                        ☰
                                    </span>
                                </button>

                            </div>
                            
                            <!-- Tabla de Favoritos -->
                            <div v-if="Productos.length > 0"
                            :class="VistaLista 
                            ? 'flex flex-col gap-4 w-full' 
                            :['grid grid-cols-2 gap-6', MostrarFiltro ? 'lg:grid-cols-3' : 'lg:grid-cols-4']"
                            >
                                <div v-for= "i in Productos" 
                                :key="i.id"
                                @touchstart="ComienzoToque($event)"
                                @touchend="FinToque($event, i)" 
                                @click="Compracion(i)"
                                :class="['si', VistaLista 
                                ? 'tarjeta-premium relative bg-white !w-full !m-0 hover:!shadow-lg' 
                                : 'carta relative']"
                                >
                                    <div :class="VistaLista 
                                    ? 'flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto text-left' 
                                    : 'w-full'">
                                        
                                        <div v-if="i.es_promocion" 
                                        class="absolute top-2 left-2 
                                        z-10 bg-red-500 text-white 
                                        text-xs font-black px-2 py-1 
                                        rounded-md shadow-md"
                                        >
                                            🔥 {{ i.motivo || 'OFERTA' }}
                                        </div>
                                        <!-- Imagenes del Producto -->
                                        <div :class="VistaLista 
                                        ? 'w-24 sm:w-32 shrink-0' 
                                        : 'w-full'"
                                        >
                                            <div v-if="i.imagenes.length > 0"
                                            class="flex flex-row gap-3 overflow-x-auto 
                                            items-center justify-center w-full pb-2 snap-x"
                                            >
                                                <button @click.stop="BackImg(i)"
                                                :disabled="GetImg(i.id) === 0"
                                                class="botonflecha hidden md:flex" 
                                                v-show="!VistaLista"
                                                >
                                                    ❮
                                                </button>
                                                <div>
                                                    <img v-show="ImagenesCargando[i.id] === false"
                                                    :src=ObtenerImgUrl(i.imagenes[GetImg(i.id)].s3_key)
                                                    @load="ImagenesCargando[i.id] = false"
                                                    :class="VistaLista ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' : 'imagen'"
                                                    >
                                                    <div v-if="ImagenesCargando[i.id] !== false" 
                                                    class="mt-2"
                                                    >
                                                        <img src="../assets/loading.gif" 
                                                        alt="Cargando..." 
                                                        class="imagen !2xl:p-15"
                                                        >
                                                    </div>
                                                </div>
                                                <button @click.stop="NextImg(i)"
                                                :disabled="GetImg(i.id) === i.imagenes.length - 1"
                                                class="botonflecha hidden md:flex"
                                                v-show="!VistaLista"
                                                >
                                                    ❯
                                                </button>
                                            </div>
                                            <img v-else src="../assets/images.png"
                                            :class="VistaLista 
                                            ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' 
                                            : 'imagen'"
                                            >
                                        </div>
                                        <!-- Datos del Producto -->
                                        <div :class="VistaLista 
                                        ? 'tarjeta-info pt-2 sm:pt-0' 
                                        : 'mt-2'"
                                        >
                                            <h2 :class="['font-bold', VistaLista 
                                            ? 'text-2xl text-gray-800' 
                                            : '']"
                                            >
                                                {{ i.nombre }}
                                            </h2>
                                            <h3 :class="VistaLista 
                                            ? 'text-gray-500 font-medium' 
                                            : ''"
                                            >
                                                Categoria: {{ i.categoria }}
                                            </h3>
                                            <div class="flex flex-col">
                                                <div v-if="i.es_promocion" class="flex items-center gap-2 -mb-1 mt-1">
                                                    <span v-if="i.porcentaje_descuento" class="text-xs font-black text-white bg-green-500 px-1.5 py-0.5 rounded">
                                                        {{ i.porcentaje_descuento }}% OFF
                                                    </span>
                                                    <h2 class="text-gray-400 text-sm font-bold line-through">
                                                        $ {{ FormatearPrecio(i.precio) }}
                                                    </h2>
                                                </div>
                                                <h2 :class="[VistaLista 
                                                ? 'text-xl font-black mt-1' 
                                                : 'font-bold', 
                                                i.es_promocion 
                                                ? 'text-red-600' 
                                                : 'text-green-600',
                                                !i.es_promocion 
                                                ? 'mt-1' 
                                                : '']"
                                                >
                                                    $ {{ FormatearPrecio(i.es_promocion ? i.precio_nuevo : i.precio) }}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="VistaLista 
                                    ? 'tarjeta-acciones !mt-4 sm:!mt-0' 
                                    : 'flex flex-wrap w-full mt-auto justify-center items-center pt-3 gap-1.5 sm:gap-2'"
                                    >
                                        <button @click.stop="QuitarFavorito(i)" 
                                        :class="VistaLista ? 'btn-chico-rojo' : 'botonc !px-2 !py-2 !text-sm'"
                                        >
                                            💔
                                            <span :class="VistaLista ? 'inline' : 'hidden xl:inline ml-1 truncate'">
                                                Quitar
                                            </span>
                                        </button>
                                        <button @click.stop="Compracion(i)"
                                        :disabled="CarritoStock(i) === 0"
                                        v-if="VerificarRolExcluido([2, 3, 4, 5, 6])"
                                        :class="VistaLista ? 'btn-chico-verde !bg-green-600 !text-white hover:!bg-green-700' : 'botoncon !px-2 !py-2 !text-sm'">
                                            🛍️
                                            <span class="hidden xl:inline ml-1 truncate">
                                                Comprar
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Tabla Vacia -->
                            <div v-else class="flex flex-col items-center justify-center p-8">
                                <span class="text-5xl mb-4">
                                    👻
                                </span>
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                    {{ Pagina === 0 ? 'Aún no tienes productos en favoritos' : 'Ya no hay más productos para mostrar 🏁' }}
                                </h2>
                                <h3 v-if="Pagina === 0" 
                                class="text-gray-500 text-center mt-2"
                                >
                                    ¡Explora la tienda y dale al corazón a lo que te guste!
                                </h3>
                            </div>
                            
                            <!-- Mostrando Paginas -->
                            <div class="flex justify-center p-5" 
                            v-if="Productos.length > 0 || Pagina > 0"
                            >
                                <button @click="CambiarPagina('back')" 
                                :disabled="Pagina === 0 || CargandoTrue"
                                class="botona"
                                >
                                    ❮
                                </button>
                                <h2 class="self-center font-bold px-6 text-green-800 text-center">
                                    <span v-if="Productos.length > 0">
                                        Mostrando {{ Pagina + 1 }} - {{ Pagina + Productos.length }}
                                    </span>
                                    <span v-else>
                                        Fin de la lista
                                    </span>
                                </h2>
                                <button @click="CambiarPagina('next')" 
                                :disabled="!HayMasPaginas || CargandoTrue"
                                class="botona"
                                >
                                    ❯
                                </button>
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
        onMounted, 
        toRefs, 
        ref, 
        watch
    } from 'vue'
    import { 
        supabase 
    } from '../config/supabase.js'
    import { 
        CarritoLocal, 
        CerrarSesion, 
        ProductoActual, 
        ProductoCantidad, 
        PedidoActual, 
        ClienteID, 
        urlover8000,
        CargarCarrito, 
        Iniciado, 
        SesionExpirada,
        VerificarRolExcluido
    } from './Estatus.js'

    // ----- Variables Complejas ----- //

    // Almacen para Quitar de Favoritos //
    const ProductoQ = ref({
        id: "",
        nombre: "",
        imagenes: []
    })
    const MostrarFiltro = ref(window.innerWidth >= 1024)

    // ----- Variables Booleanas ----- //

    const BloqueoPeticion = ref(false)
    const VentanaCompra = ref(false)
    const MostrarConfir = ref(false)
    const HayMasPaginas = ref(false)
    const QuitarCaja = ref (false)
    const CargandoTrue = ref(true)
    const ErrorCarga = ref(false)
    const VistaLista = ref(false)
    const filtroAct = ref(false)

    // ----- Variables Complejas ----- //

    const ListaCategoria = ref("")
    const ImagenesCargando = ref({})
    const filtrocat = ref("")
    const IndiceImg = ref({})
    const Productos = ref([])
    const Busqueda = ref("")
    const orden = ref("8")
    const mayor = ref("")
    const menor = ref("")

    // ----- Variables Simples ----- //

    const ItemsPorPagina = ref(24)
    const filtroRadio = ref(4)
    const Pagina = ref(0)
    let inicioX = 0

    // ----- Funciones Vue ----- //

    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        CargarDatos()
    })
    // Verificacion de Stock > 0 //
    watch (ProductoCantidad, (NuevaCantidad) => {
        let CantidadnCarrito = 0
        if (ProductoActual.value) {
            CarritoLocal.value.forEach((prod) => {
                if (prod.id_producto === ProductoActual.value.id) {
                    CantidadnCarrito = CantidadnCarrito + prod.cantidad
                }
            })
            const StockLocal = ProductoActual.value.stock - CantidadnCarrito
            if (NuevaCantidad > StockLocal) {
                ProductoCantidad.value = StockLocal
            }
            if (NuevaCantidad < 1 && StockLocal !== 0) {
                ProductoCantidad.value = 1
            }
        }
    })
    // Definir Url/Link y Tamaño de Imagen //
    const prop = defineProps(['path','size'])
    // Asignar Url/Link y Tamaño de Imagen //
    const { path } = toRefs(prop)
    // Leer Url/Link y Tamaño de Imagen //
    watch(path, () => {
        if (path.value) ObtenerImgUrl()
    })
    // Carga de Datos de la Pagina //
    const CargarDatos = (async() => {
        if (!ClienteID.value) return
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        CargandoTrue.value = true
        ErrorCarga.value = false
        // Tiempo de Espera para el Backend
        const temporizador = setTimeout(() => {
            if (CargandoTrue.value) {
                CargandoTrue.value = false
                ErrorCarga.value = true
            }
        }, 15000)
        // Leer Productos Favoritos y Categorias
        try {
            await BusquedaFavoritos()
            const respuesta = await fetch(`${urlover8000}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                }
            })
            const categ = await respuesta.json()
            ListaCategoria.value = categ
            CargarCarrito()
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
            BloqueoPeticion.value = false
        }
    })
    // Cambiar Pagina //
    const CambiarPagina = async (direccion) => {
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        CargandoTrue.value = true
        ErrorCarga.value = false
        // Establecer Valor de Items de Pagina //
        if (direccion === 'next') {
            Pagina.value += ItemsPorPagina.value
        } else if (direccion === 'back') {
            Pagina.value -= ItemsPorPagina.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await BusquedaFavoritos()
        } catch (error) {
            console.error(error)
            ErrorCarga.value = true
        } finally {
            CargandoTrue.value = false
            BloqueoPeticion.value = false
        }
    }

    // ----- Funciones Frontend ----- //
    
    // Abrir Pop up para Quitar de Favoritos //
	const AbrirPopUp01 = () => {
		QuitarCaja.value = true
		document.body.style.overflow = "hidden"
	}
    // Aplicar Filtros //
    const AplicarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        BusquedaFavoritos()
        menor.value = ""
        mayor.value = ""
    }
    // Leer Imagen Anterior //
    const BackImg = (imagen) => {
        const ImgActual = GetImg(imagen.id)
        if (ImgActual > 0) {
            IndiceImg.value[imagen.id] = ImgActual - 1
            ImagenesCargando.value[imagen.id] = true
        }
    }
    // Cerrar Pop up para Quitar de Favoritos //
	const CerrarPopUp01 = () => {
		QuitarCaja.value = false
        ProductoQ.value = { id: "", nombre: "", imagenes: [] }
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Añadir a Carrito //
    const CerrarPopUp02 = () => {
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
        document.body.style.overflow = "auto"
    }
    // Inicio del Toque de Imagen en Celular //
    const ComienzoToque = (evento) => {
        inicioX = evento.changedTouches[0].clientX
    }
    // Establecer Valores del Producto para Añadir en el Carrito y Abrir Pop Up //
    const Compracion = (producto_fila) => {
        if (CarritoStock(producto_fila) <= 0) {
            return 
        }
        VentanaCompra.value = true
        document.body.style.overflow = "hidden"
        ProductoActual.value = producto_fila
        ProductoCantidad.value = 1
    }
    // Fin del Toque de Imagen en Celular //
    const FinToque = (evento, producto) => {
        if (!producto) return
        const finX = evento.changedTouches[0].clientX
        const diferencia = inicioX - finX
        if (Math.abs(diferencia) < 50) {
            inicioX = 0
            return
        }
        if (diferencia > 0) {
            NextImg(producto)
        }
        else {
            BackImg(producto)
        }
        inicioX = 0
    }
    // Leer Precio con Formato Pesos Argentinos //
    const FormatearPrecio = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    // Leer Imagen //
    const GetImg = (id) => {
        return IndiceImg.value[id] || 0
    }
    // Limpiar Filtros, Orden y Busqueda //
    const LimpiarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        filtroRadio.value = 4
        filtrocat.value = ""
        BusquedaFavoritos()
        filtroAct.value = false
    }
    // Leer Imagen Siguiente //
    const NextImg = (imagen) => {
        const ImgActual = GetImg(imagen.id)
        if (ImgActual < imagen.imagenes.length - 1) {
            IndiceImg.value[imagen.id] = ImgActual + 1
            ImagenesCargando.value[imagen.id] = true
        }
    }
    // Obtener Url/Link de Imagen //
    const ObtenerImgUrl = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    // Restar Cantidad de Producto //
    const RestarProducto = () => {
        if (ProductoCantidad.value > 1) {
            ProductoCantidad.value--
        }
    }
    // Sumar Cantidad de Producto //
    const SumarProducto = () => {
        if (ProductoActual.value && ProductoCantidad.value < ProductoActual.value.stock) {
            ProductoCantidad.value++
        }
    }
    // Establecer Valores del Producto para Quitar de Favoritos y Abrir Pop Up //
    const QuitarFavorito = (producto_fila) => {
        ProductoQ.value.id = producto_fila.id
        ProductoQ.value.nombre = producto_fila.nombre
        ProductoQ.value.imagenes = producto_fila.imagenes
        AbrirPopUp01()
    }

    // ----- Funciones Backend ----- //
    
    // Quitar Producto de Favoritos //
    const Quitar = async () => {
        if (!ProductoQ.value.id) return
        try {
            // Quitar Producto en el Backend
            const respuesta = await fetch(`${urlover8000}/favoritos/toggle?id_cliente=${ClienteID.value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_producto: ProductoQ.value.id }),
                credentials: 'include'
            })
            
            if (respuesta.status === 401) {
                await CerrarSesion()
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            
            if (respuesta.ok) {
                Productos.value = Productos.value.filter(p => p.id !== ProductoQ.value.id)
                CerrarPopUp01()
                if (Productos.value.length === 0 && Pagina.value > 0) {
                    CambiarPagina('back')
                } else if (Productos.value.length === 0 && Pagina.value === 0) {
                    BusquedaFavoritos()
                }
            }
        } catch (error) {
            console.error("Error al quitar favorito:", error)
        }
    }
    // Leer los Productos Favoritos //
    const BusquedaFavoritos = async() => {
        if (!ClienteID.value) return
        let url = new URL(`${urlover8000}/favoritos/lista/${ClienteID.value}`)
        url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', ItemsPorPagina.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        // Establecer Orden
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            if (orden.value !== "8") {
                filtroAct.value = true
            }
        }
        let minfiltro = ""
        let maxfiltro = ""
        // Establecer Filtro Precios Fijos
        if (filtroRadio.value === 4) {
            minfiltro = ""
            maxfiltro = ""
            menor.value = ""
            mayor.value = ""
        }
        else if (filtroRadio.value === 3) {
            maxfiltro = 10000
        }
        else if (filtroRadio.value === 2) {
            minfiltro = 10000
            maxfiltro = 50000
        }
        else if (filtroRadio.value === 1) {
            minfiltro = 50000
        }
        // Establecer Filtro Precios Personalizados
        else if (filtroRadio.value === 0) {
            minfiltro = menor.value
            maxfiltro = mayor.value
        }
        if (minfiltro !== "" && minfiltro != null) {
            url.searchParams.append('precio_producto_min', minfiltro)
            filtroAct.value = true
        }
        if (maxfiltro !== "" && maxfiltro != null) {
            url.searchParams.append('precio_producto_max', maxfiltro)
            filtroAct.value = true
        }
        // Establecer Filtro de Categoria
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value)
            filtroAct.value = true
        }
        url.searchParams.append('bool_activo', 'true')
        const BusqProducto = await fetch(url.toString(), {
            headers: {
                "X-Tunnel-Skip-AntiPhishing-Page": "true"
            },
            credentials: 'include'
        })
        if (BusqProducto.status === 401) {
            await CerrarSesion()
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        const datos = await BusqProducto.json()
        if (Array.isArray(datos)) {
            if (datos.length > ItemsPorPagina.value) {
                HayMasPaginas.value = true
                Productos.value = datos.slice(0, ItemsPorPagina.value)
            } else {
                HayMasPaginas.value = false
                Productos.value = datos
            }
        } else {
            Productos.value = []
            HayMasPaginas.value = false
        }
    }
    // Verificacion de Stock > 0 //
    const CarritoStock = (Producto) => {
        let stockCarrito = 0
        CarritoLocal.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                stockCarrito = stockCarrito + itemCarrito.cantidad
            }
        })
        return Producto.stock - stockCarrito
    }
    // Añadir al Carrito //
    const SumarCarrito = () => {
        if (!ProductoActual.value)
            return
        // Establecer Datos del Producto 
        const nuevoProducto = {
            id_pedido: PedidoActual.value,
            nombre_producto: ProductoActual.value.nombre,
            id_producto: ProductoActual.value.id,
            cantidad: ProductoCantidad.value,
            precio_unitario: ProductoActual.value.precio,
            stock_producto: ProductoActual.value.stock,
            imagenes: ProductoActual.value.imagenes
        }
        let CarritoExistente = CarritoLocal.value.find(
            (item_exitente) =>
            item_exitente.id_producto === ProductoActual.value.id
        )
        if (CarritoExistente){
            CarritoExistente.cantidad = ProductoCantidad.value + CarritoExistente.cantidad
        } else {
            CarritoLocal.value.push(nuevoProducto)
        }
        localStorage.setItem(
            'carrito_pendiente',
            JSON.stringify(
                CarritoLocal.value
            )
        )
        CerrarPopUp02()
        MostrarConfir.value = true
        setTimeout(() => { MostrarConfir.value = false }, 2000)
    }
</script>