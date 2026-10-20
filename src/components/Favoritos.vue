<template>
    <div class="cuerpo">

        <!-- Notificación --> 
        <!-- Adicion al Carrito Exitosa -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="Mostrar_Confirmacion" 
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
                <div v-if="PopUp_Delete"
                @click.self="Cerrar_PopUp_Delete"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1 class="text-center">
                            ¿Desear Quitar {{ Datos_Delete.nombre }} de Mis Favoritos?
                        </h1>

                        <!-- Imagenes del Producto -->
                        <div>
                            <div v-if="Datos_Delete.imagenes.length > 0"
                            class="flex flex-row 
                            gap-3 overflow-x-auto
                            items-center justify-center 
                            w-full pb-2 snap-x"
                            >
                                <button @click="Imagen_Anterior(Datos_Delete)"
                                :disabled="Imagen_Get(Datos_Delete.id) === 0"
                                class="botonflecha"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="Imagen_Espera[Datos_Delete.id] === false"
                                    :src=Imagen_Url(Datos_Delete.imagenes[Imagen_Get(Datos_Delete.id)].s3_key)
                                    @load="Imagen_Espera[Datos_Delete.id] = false"
                                    class="imagen"
                                    >
                                    <div v-if="Imagen_Espera[Datos_Delete.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="imagen !2xl:p-15"
                                        >
                                    </div>
                                </div>
                                <button @click="Imagen_Siguiente(Datos_Delete)"
                                :disabled="Imagen_Get(Datos_Delete.id) === Datos_Delete.imagenes.length - 1"
                                class="botonflecha"
                                >
                                    ❯
                                </button>
                            </div>
                            <img v-else src="../assets/images.png"
                            class="imagen"
                            >
                        </div>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="Backend_Delete()"
                            class="botoncon"
                            >
                                Confirmo
                            </button>
                            <button @click="Cerrar_PopUp_Delete"
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
                <div v-if="PopUp_Buy"
                @click.self="Cerrar_PopUp_Buy"
                class="fondo" 
                >
                    <div class="popup popup-compra">

                        <!-- Encabezado -->
                        <h1>
                            {{ Producto_Actual.nombre }}
                        </h1>

                        <!-- Imagenes del Producto -->
                        <div class="carrusel-contenedor">
                            <div v-if="Producto_Actual.imagenes.length > 0"
                            class="carrusel-fila"
                            >
                                <button @click="Imagen_Anterior(Producto_Actual)"
                                :disabled="Imagen_Get(Producto_Actual.id) === 0"
                                class="carrusel-btn"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="Imagen_Espera[Producto_Actual.id] === false"
                                    :src=Imagen_Url(Producto_Actual.imagenes[Imagen_Get(Producto_Actual.id)].s3_key)
                                    @load="Imagen_Espera[Producto_Actual.id] = false"
                                    class="carrusel-img"
                                    >
                                    <div v-if="Imagen_Espera[Producto_Actual.id] !== false" 
                                    class="absolute inset-0 flex items-center justify-center"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="w-12 h-12 opacity-50"
                                        >
                                    </div>
                                </div>
                                <button @click="Imagen_Siguiente(Producto_Actual)"
                                :disabled="Imagen_Get(Producto_Actual.id) === Producto_Actual.imagenes.length - 1"
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
                                <button @click="Producto_Restar(Producto_Actual)"
                                class="control-btn-restar"
                                >
                                    ━
                                </button>
                                <input v-model="Producto_Cantidad"
                                type="number" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                class="control-input"
                                >
                                <button @click="Producto_Sumar(Producto_Actual)"
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
                                    $ {{ Formato_Precios(Producto_Actual.precio * Producto_Cantidad) }}
                                </span>
                            </div>
                        </div>

                        <!-- Botones -->
                        <div class="botones mt-2">
                            <button @click="Backend_Post"
                            class="botoncon"
                            >
                                Agregar al Carrito
                            </button>
                            <button @click="Cerrar_PopUp_Buy"
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
                        <div v-if="Mostrar_Filtro" 
                        @click="Mostrar_Filtro = false"
                        class="fixed inset-0 
                        bg-black/40 backdrop-blur-sm 
                        z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>

                <!-- Barra de Filtros de Productos Favoritos -->
                <div :class="['bar', Mostrar_Filtro 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >

                    <!-- Boton de Filtros -->
                    <div class="hidden sm:block">
                        <h1 @click="Mostrar_Filtro = !Mostrar_Filtro" 
                        class="botonfil"
                        >
                            ᯤ
                        </h1>
                    </div>

                    <!-- Barra de Filtros -->
                    <transition name="slide">
                        <div v-if="Mostrar_Filtro" 
                        class="flex flex-col lg:self-center"
                        >

                            <!-- Orden de Productos Favoritos -->
                            <div class="flex flex-col md:px-4 md:pb-4 p-2 !pt-0">
                                <h1 class="!mt-0">
                                    Ordenar
                                </h1>
                                <select v-model="Orden" 
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
                                    <select v-model="Filtro_Categorias">
                                        <option value="" disabled>
                                            Categorias...
                                        </option>
                                        <option v-for="i in Datos_Categorias" 
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
                                    v-model="Filtro_Precios"
                                    > 
                                        Cualquier Precio
                                </label>
                                <label>
                                    <input :value="3" 
                                    type="radio" 
                                    v-model="Filtro_Precios"
                                    > 
                                        Hasta $10,000
                                </label>
                                <label>
                                    <input :value="2" 
                                    type="radio" 
                                    v-model="Filtro_Precios"
                                    > 
                                        $10,000 a $50,000
                                </label>
                                <label>
                                    <input :value="1" 
                                    type="radio" 
                                    v-model="Filtro_Precios"
                                    > 
                                        Más de $50,000
                                </label>
                                <label>
                                    <input :value="0" 
                                    type="radio" 
                                    v-model="Filtro_Precios"
                                    > 
                                        Personalizado
                                </label>
                            </div>

                            <!-- Filtro de Precio (Rango Personalizados) -->
                            <div v-if="Filtro_Precios === 0" 
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h3 class="flex flex-col md:p-4 p-2">
                                    Precio Mayor
                                </h3>
                                <input placeholder="Precio Max..." 
                                type="number" 
                                v-model="Filtro_Precio_Mayor" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                                <h3 class="flex flex-col md:p-4 p-2">
                                    Precio Minimo
                                </h3>
                                <input placeholder="Precio Min..." 
                                type="number" 
                                v-model="Filtro_Precio_Menor" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                            </div>

                            <!-- Botones -->
                            <div class="botones">
                                <button @click="Filtro_Aplicar" 
                                class="botoncon">
                                    Aplicar Filtros
                                </button>
                                <button @click="Filtro_Limpiar" 
                                v-if="Mostrar_Limpiar_Filtro === true" 
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
                    <div v-if="Backend_Espera" 
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
                    <div v-else-if="Backend_Error" 
                    class="flex flex-col items-center justify-center w-full h-[60vh] gap-4"
                    >
                        <h1 class="text-3xl font-bold text-red-600 text-center">
                            ¡Ups! Algo falló 🔌
                        </h1>
                        <h2 class="text-xl text-gray-700 text-center px-4">
                            No pudimos cargar tus favoritos.
                        </h2>
                        <div class="mt-6 flex justify-center">
                            <button @click="Backend_Cargar()" 
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
                            <button @click="Mostrar_Filtro = true" 
                            class="sm:hidden w-full mb-4 py-3 
                            bg-white text-green-800 font-black text-lg 
                            border-2 border-green-200 rounded-xl 
                            flex items-center justify-center gap-2 
                            shadow-sm transition-all 
                            active:scale-95 active:bg-green-50"
                            >
                                ᯤ Abrir Filtros
                            </button>

                            <!-- Encabezado -->
                            <h1 class="text-2xl font-black text-green-800 mb-4 ml-1">
                                🤍 Mi Lista de Deseos
                            </h1>

                            <div class="flex flex-row items-stretch w-full gap-3 mb-5">

                                <!-- Barra de Busqueda -->
                                <input @input="Backend_Get"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Buscar en mis favoritos..."
                                class="busqueda !mb-0 !w-full"
                                maxlength="50"
                                >

                                <!-- Vista en Lista/Carta -->
                                <button @click="Formato_Items = !Formato_Items"
                                title="Alternar Vista"
                                class="shrink-0 flex items-center justify-center bg-white border-2 border-green-200 text-green-700 rounded-xl w-12 sm:w-14 hover:bg-green-50 transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                    <span v-if="!Formato_Items" class="text-xl">
                                        「 」
                                    </span>
                                    <span v-else class="text-xl">
                                        ☰
                                    </span>
                                </button>

                            </div>

                            <!-- Tabla de Favoritos -->
                            <div v-if="Productos.length > 0"
                            :class="Formato_Items 
                            ? 'flex flex-col gap-4 w-full' 
                            :['grid grid-cols-2 gap-6', Mostrar_Filtro ? 'lg:grid-cols-3' : 'lg:grid-cols-4']"
                            >
                                <div v-for= "i in Productos" 
                                :key="i.id"
                                @touchstart="Toque_Start($event)"
                                @touchend="Toque_End($event, i)" 
                                @click="Abrir_PopUp_Buy(i)"
                                :class="['si', Formato_Items 
                                ? 'tarjeta-premium relative bg-white !w-full !m-0 hover:!shadow-lg' 
                                : 'carta relative']"
                                >

                                    <!-- Datos del Producto en Favorito -->
                                    <div :class="Formato_Items 
                                    ? 'flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto text-left' 
                                    : 'w-full'">

                                        <!-- Motivo de Promocion -->
                                        <div v-if="i.es_promocion" 
                                        class="absolute top-2 left-2 
                                        z-10 bg-red-500 text-white 
                                        text-xs font-black px-2 py-1 
                                        rounded-md shadow-md"
                                        >
                                            🔥 {{ i.motivo || 'OFERTA' }}
                                        </div>

                                        <!-- Imagenes del Producto -->
                                        <div :class="Formato_Items 
                                        ? 'w-24 sm:w-32 shrink-0' 
                                        : 'w-full'"
                                        >
                                            <div v-if="i.imagenes.length > 0"
                                            class="flex flex-row gap-3 overflow-x-auto 
                                            items-center justify-center w-full pb-2 snap-x"
                                            >
                                                <button @click.stop="Imagen_Anterior(i)"
                                                :disabled="Imagen_Get(i.id) === 0"
                                                class="botonflecha hidden md:flex" 
                                                v-show="!Formato_Items"
                                                >
                                                    ❮
                                                </button>
                                                <div>
                                                    <img v-show="Imagen_Espera[i.id] === false"
                                                    :src=Imagen_Url(i.imagenes[Imagen_Get(i.id)].s3_key)
                                                    @load="Imagen_Espera[i.id] = false"
                                                    :class="Formato_Items ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' : 'imagen'"
                                                    >
                                                    <div v-if="Imagen_Espera[i.id] !== false" 
                                                    class="mt-2"
                                                    >
                                                        <img src="../assets/loading.gif" 
                                                        alt="Cargando..." 
                                                        class="imagen !2xl:p-15"
                                                        >
                                                    </div>
                                                </div>
                                                <button @click.stop="Imagen_Siguiente(i)"
                                                :disabled="Imagen_Get(i.id) === i.imagenes.length - 1"
                                                class="botonflecha hidden md:flex"
                                                v-show="!Formato_Items"
                                                >
                                                    ❯
                                                </button>
                                            </div>
                                            <img v-else src="../assets/images.png"
                                            :class="Formato_Items 
                                            ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' 
                                            : 'imagen'"
                                            >
                                        </div>

                                        <!-- Datos del Producto -->
                                        <div :class="Formato_Items 
                                        ? 'tarjeta-info pt-2 sm:pt-0' 
                                        : 'mt-2'"
                                        >
                                            <h2 :class="['font-bold', Formato_Items 
                                            ? 'text-2xl text-gray-800' 
                                            : '']"
                                            >
                                                {{ i.nombre }}
                                            </h2>
                                            <h3 :class="Formato_Items 
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
                                                        $ {{ Formato_Precios(i.precio) }}
                                                    </h2>
                                                </div>
                                                <h2 :class="[Formato_Items 
                                                ? 'text-xl font-black mt-1' 
                                                : 'font-bold', 
                                                i.es_promocion 
                                                ? 'text-red-600' 
                                                : 'text-green-600',
                                                !i.es_promocion 
                                                ? 'mt-1' 
                                                : '']"
                                                >
                                                    $ {{ Formato_Precios(i.es_promocion ? i.precio_nuevo : i.precio) }}
                                                </h2>
                                            </div>
                                        </div>

                                    </div>

                                    <!-- Botones -->
                                    <div :class="Formato_Items 
                                    ? 'tarjeta-acciones !mt-4 sm:!mt-0' 
                                    : 'flex flex-wrap w-full mt-auto justify-center items-center pt-3 gap-1.5 sm:gap-2'"
                                    >
                                        <button @click.stop="Abrir_PopUp_Delete(i)" 
                                        :class="Formato_Items ? 'btn-chico-rojo' : 'botonc !px-2 !py-2 !text-sm'"
                                        >
                                            💔
                                            <span :class="Formato_Items ? 'inline' : 'hidden xl:inline ml-1 truncate'">
                                                Quitar
                                            </span>
                                        </button>
                                        <button @click.stop="Abrir_PopUp_Buy(i)"
                                        :disabled="Verificar_Stock(i) === 0"
                                        v-if="Verificar_Rol_Excluido([2, 3, 4, 5, 6])"
                                        :class="Formato_Items ? 'btn-chico-verde !bg-green-600 !text-white hover:!bg-green-700' : 'botoncon !px-2 !py-2 !text-sm'">
                                            🛍️
                                            <span class="hidden xl:inline ml-1 truncate">
                                                Comprar
                                            </span>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>

                            <!-- Tabla Vacia -->
                            <div v-else 
                            class="flex flex-col 
                            items-center justify-center p-8"
                            >
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
                                <button @click="Cambiar_Pagina('back')" 
                                :disabled="Pagina === 0 || Backend_Espera"
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
                                <button @click="Cambiar_Pagina('next')" 
                                :disabled="!Paginas_Max || Backend_Espera"
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
        Carrito_Local, 
        Cerrar_Sesion, 
        Producto_Actual, 
        Producto_Cantidad, 
        Pedido_Actual, 
        Cliente_ID, 
        backend_url,
        Cargar_Carrito,
        PopUp_Delete,
        PopUp_Buy,
        Iniciado, 
        Sesion_Expirada,
        Verificar_Rol_Excluido
    } from './Estatus.js'

    // ----- Variables Complejas ----- //

    // Almacen para Quitar de Favoritos //
    const Datos_Delete = ref ({
        id: "",
        nombre: "",
        imagenes: []
    })
    // Ancho de Filtro //
    const Mostrar_Filtro = ref (window.innerWidth >= 1024)
    // Definir Url/Link y Tamaño de Imagen //
    const prop = defineProps([
        'path',
        'size'
    ])
    // Asignar Url/Link y Tamaño de Imagen //
    const { path } = toRefs(prop)

    // ----- Variables Booleanas ----- //

    const Paginas_Max = ref (false)
    const Formato_Items = ref (false)
    const Backend_Error = ref (false)
    const Backend_Espera = ref (true)
    const Bloqueo_Peticion = ref (false)
    const Mostrar_Confirmacion = ref (false)
    const Mostrar_Limpiar_Filtro = ref (false)

    // ----- Variables Complejas ----- //

    const Orden = ref ("8")
    const Busqueda = ref ("")
    const Productos = ref ([])
    const Imagen_Espera = ref ({})
    const Imagen_Indice = ref ({})
    const Datos_Categorias = ref ("")
    const Filtro_Categorias = ref ("")
    const Filtro_Precio_Mayor = ref ("")
    const Filtro_Precio_Menor = ref ("")

    // ----- Variables Simples ----- //

    const Pagina = ref (0)
    const Paginas_Items = ref (24)
    const Filtro_Precios = ref (4)

    // ----- Variables Temporales ----- //

    let Cordenada_X = 0

    // ----- Funciones Vue ----- //

    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Verificacion de Stock > 0 //
    watch (Producto_Cantidad, (NuevaCantidad) => {
        let Cantidad_Carrito = 0
        if (Producto_Actual.value) {
            Carrito_Local.value.forEach((prod) => {
                if (prod.id_producto === Producto_Actual.value.id) {
                    Cantidad_Carrito = Cantidad_Carrito + prod.cantidad
            }})
            const Stock_Local = Producto_Actual.value.stock - Cantidad_Carrito
            if (NuevaCantidad > Stock_Local) {
                Producto_Cantidad.value = Stock_Local
            }
            if (NuevaCantidad < 1 && Stock_Local !== 0) {
                Producto_Cantidad.value = 1
    }}})
    // Leer Url/Link y Tamaño de Imagen //
    watch(path, () => {
        if (path.value) Imagen_Url()
    })
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (!Cliente_ID.value) return
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
        }}, 15000)
        // Leer Productos Favoritos y Categorias
        try {
            await Backend_Get()
            const respuesta = await fetch(`${backend_url}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
            }})
            const Dato_Categoria = await respuesta.json()
            Datos_Categorias.value = Dato_Categoria
            Cargar_Carrito()
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
            }
            Bloqueo_Peticion.value = false
    }})
    // Cambiar Pagina //
    const Cambiar_Pagina = async (direccion) => {
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Espera.value = true
        Backend_Error.value = false
        // Establecer Valor de Items de Pagina //
        if (direccion === 'next') {
            Pagina.value += Paginas_Items.value
        } else if (direccion === 'back') {
            Pagina.value -= Paginas_Items.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await Backend_Get()
        } catch (error) {
            console.error(error)
            Backend_Error.value = true
        } finally {
            Backend_Espera.value = false
            Bloqueo_Peticion.value = false
    }}
    // ----- Funciones Frontend ----- //

    // Establecer Valores del Producto para Añadir en el Carrito y Abrir Pop Up //
    const Abrir_PopUp_Buy = (producto_fila) => {
        if (Verificar_Stock(producto_fila) <= 0) {
            return 
        }
        PopUp_Buy.value = true
        document.body.style.overflow = "hidden"
        Producto_Actual.value = producto_fila
        Producto_Cantidad.value = 1
    }
    // Abrir Pop up para Quitar de Favoritos //
	const Abrir_PopUp_Delete = (producto_fila) => {
        Datos_Delete.value.id = producto_fila.id
        Datos_Delete.value.nombre = producto_fila.nombre
        Datos_Delete.value.imagenes = producto_fila.imagenes
		PopUp_Delete.value = true
		document.body.style.overflow = "hidden"
	}
    // Cerrar Pop up para Añadir a Carrito //
    const Cerrar_PopUp_Buy = () => {
        PopUp_Buy.value = false
        Producto_Actual.value = null
        Producto_Cantidad.value = 1
        document.body.style.overflow = "auto"
    }
    // Cerrar Pop up para Quitar de Favoritos //
	const Cerrar_PopUp_Delete = () => {
		PopUp_Delete.value = false
        Datos_Delete.value = { id: "", nombre: "", imagenes: [] }
		document.body.style.overflow = "auto"
	}
    // Aplicar Filtros //
    const Filtro_Aplicar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Backend_Get()
        Filtro_Precio_Menor.value = ""
        Filtro_Precio_Mayor.value = ""
    }
    // Limpiar Filtros, Orden y Busqueda //
    const Filtro_Limpiar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Filtro_Precios.value = 4
        Filtro_Categorias.value = ""
        Backend_Get()
        Mostrar_Limpiar_Filtro.value = false
    }
    // Leer Precio con Formato Pesos Argentinos //
    const Formato_Precios = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    // Leer Imagen Anterior //
    const Imagen_Anterior = (imagen) => {
        const Imagen_Actual = Imagen_Get(imagen.id)
        if (Imagen_Actual > 0) {
            Imagen_Indice.value[imagen.id] = Imagen_Actual - 1
            Imagen_Espera.value[imagen.id] = true
    }}
    // Leer Imagen //
    const Imagen_Get = (id) => {
        return Imagen_Indice.value[id] || 0
    }
    // Leer Imagen Siguiente //
    const Imagen_Siguiente = (imagen) => {
        const Imagen_Actual = Imagen_Get(imagen.id)
        if (Imagen_Actual < imagen.imagenes.length - 1) {
            Imagen_Indice.value[imagen.id] = Imagen_Actual + 1
            Imagen_Espera.value[imagen.id] = true
    }}
    // Obtener Url/Link de Imagen //
    const Imagen_Url = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    // Fin del Toque de Imagen en Celular //
    const Toque_End = (evento, producto) => {
        if (!producto) return
        const Cordenada_X_Fin = evento.changedTouches[0].clientX
        const Distancia = Cordenada_X - Cordenada_X_Fin
        if (Math.abs(Distancia) < 50) {
            Cordenada_X = 0
            return
        }
        if (Distancia > 0) {
            Imagen_Siguiente(producto)
        }
        else {
            Imagen_Anterior(producto)
        }
        Cordenada_X = 0
    }
    // Inicio del Toque de Imagen en Celular //
    const Toque_Start = (evento) => {
        Cordenada_X = evento.changedTouches[0].clientX
    }
    // Restar Cantidad de Producto //
    const Producto_Restar = () => {
        if (Producto_Cantidad.value > 1) {
            Producto_Cantidad.value--
    }}
    // Sumar Cantidad de Producto //
    const Producto_Sumar = () => {
        if (Producto_Actual.value && Producto_Cantidad.value < Producto_Actual.value.stock) {
            Producto_Cantidad.value++
    }}

    // ----- Funciones Backend ----- //
    
    // Quitar Producto de Favoritos //
    const Backend_Delete = async () => {
        if (!Datos_Delete.value.id) return
        try {
            // Quitar Producto en el Backend
            const respuesta = await fetch(`${backend_url}/favoritos/toggle?id_cliente=${Cliente_ID.value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_producto: Datos_Delete.value.id }),
                credentials: 'include'
            })            
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }            
            if (respuesta.ok) {
                Productos.value = Productos.value.filter(p => p.id !== Datos_Delete.value.id)
                Cerrar_PopUp_Delete()
                if (Productos.value.length === 0 && Pagina.value > 0) {
                    Cambiar_Pagina('back')
                } else if (Productos.value.length === 0 && Pagina.value === 0) {
                    Backend_Get()
            }}
        } catch (error) {
            console.error("Error al quitar favorito:", error)
    }}
    // Leer los Productos Favoritos //
    const Backend_Get = async() => {
        if (!Cliente_ID.value) return
        let url = new URL(`${backend_url}/favoritos/lista/${Cliente_ID.value}`)
        url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', Paginas_Items.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            if (Orden.value !== "8") {
                Mostrar_Limpiar_Filtro.value = true
        }}
        let Filtro_Precios_Minimo = ""
        let Filtro_Precios_Maximo = ""
        // Establecer Filtro Precios Fijos
        if (Filtro_Precios.value === 4) {
            Filtro_Precios_Minimo = ""
            Filtro_Precios_Maximo = ""
            Filtro_Precio_Menor.value = ""
            Filtro_Precio_Mayor.value = ""
        }
        else if (Filtro_Precios.value === 3) {
            Filtro_Precios_Maximo = 10000
        }
        else if (Filtro_Precios.value === 2) {
            Filtro_Precios_Minimo = 10000
            Filtro_Precios_Maximo = 50000
        }
        else if (Filtro_Precios.value === 1) {
            Filtro_Precios_Minimo = 50000
        }
        // Establecer Filtro Precios Personalizados
        else if (Filtro_Precios.value === 0) {
            Filtro_Precios_Minimo = Filtro_Precio_Menor.value
            Filtro_Precios_Maximo = Filtro_Precio_Mayor.value
        }
        if (Filtro_Precios_Minimo !== "" && Filtro_Precios_Minimo != null) {
            url.searchParams.append('precio_producto_min', Filtro_Precios_Minimo)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Precios_Maximo !== "" && Filtro_Precios_Maximo != null) {
            url.searchParams.append('precio_producto_max', Filtro_Precios_Maximo)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Categoria
        if (Filtro_Categorias.value !== "") {
            url.searchParams.append('Filtro_Categorias', Filtro_Categorias.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        url.searchParams.append('bool_activo', 'true')
        const GetBackend = await fetch(url.toString(), {
            headers: {
                "X-Tunnel-Skip-AntiPhishing-Page": "true"
            },
            credentials: 'include'
        })
        if (GetBackend.status === 401) {
            await Cerrar_Sesion()
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        const datos = await GetBackend.json()
        if (Array.isArray(datos)) {
            if (datos.length > Paginas_Items.value) {
                Paginas_Max.value = true
                Productos.value = datos.slice(0, Paginas_Items.value)
            } else {
                Paginas_Max.value = false
                Productos.value = datos
            }
        } else {
            Productos.value = []
            Paginas_Max.value = false
    }}
    // Añadir al Carrito //
    const Backend_Post = () => {
        if (!Producto_Actual.value)
            return
        // Establecer Datos del Producto 
        const Datos_New = {
            id_pedido: Pedido_Actual.value,
            nombre_producto: Producto_Actual.value.nombre,
            id_producto: Producto_Actual.value.id,
            cantidad: Producto_Cantidad.value,
            precio_unitario: Producto_Actual.value.precio,
            stock_producto: Producto_Actual.value.stock,
            imagenes: Producto_Actual.value.imagenes
        }
        let Carrito_Existente = Carrito_Local.value.find(
            (item_exitente) =>
            item_exitente.id_producto === Producto_Actual.value.id
        )
        if (Carrito_Existente){
            Carrito_Existente.cantidad = Producto_Cantidad.value + Carrito_Existente.cantidad
        } else {
            Carrito_Local.value.push(Datos_New)
        }
        localStorage.setItem(
            'carrito_pendiente',
            JSON.stringify(
                Carrito_Local.value
        ))
        Cerrar_PopUp_Buy()
        Mostrar_Confirmacion.value = true
        setTimeout(() => { Mostrar_Confirmacion.value = false }, 2000)
    }
    // Verificacion de Stock > 0 //
    const Verificar_Stock = (Producto) => {
        let Stock_Carrito = 0
        Carrito_Local.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                Stock_Carrito = Stock_Carrito + itemCarrito.cantidad
        }})
        return Producto.stock - Stock_Carrito
    }
    
</script>