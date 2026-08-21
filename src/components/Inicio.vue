<template>
    <div class="cuerpo">
        <!-- Confirmacion Eliminar -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaPDel"
                @click.self="CerrarPopUp02"
                class="fondo" 
                >
                    <div class="popup">
                        <h1>
                        ¿Desear Eliminar/Reactivar {{ ProductoEli.nombre }}?
                        </h1>
                        <div>
                            <div v-if="ProductoEli.imagenes.length > 0"
                            class="flex flex-row gap-1
                            md:gap-3 overflow-x-auto
                            items-center justify-center 
                            w-full md:pb-2 snap-x pb-1
                            ">
                                <button @click="BackImg(ProductoEli)"
                                :disabled="GetImg(ProductoEli.id) === 0"
                                class="botonflecha"
                                >
                                ❮
                                </button>
                                <div>
                                    <img v-show="ImagenesCargando[ProductoEli.id] === false"
                                    :src=ObtenerImgUrl(ProductoEli.imagenes[GetImg(ProductoEli.id)].s3_key)
                                    @load="ImagenesCargando[ProductoEli.id] = false"
                                    class="imagen"
                                    >
                                    <div v-if="ImagenesCargando[ProductoEli.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="imagen !2xl:p-15">
                                    </div>
                                </div>
                                <button @click="NextImg(ProductoEli)"
                                :disabled="GetImg(ProductoEli.id) === ProductoEli.imagenes.length - 1"
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
                            <button @click="BorrarProducto()"
                            class="botoncon"
                            >
                            Si Confirmo
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
        <!-- Comprar Ventana -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="VentanaCompra"
                @click.self="CerrarPopUp04"
                class="fondo"
                >
                    <div class="popup popup-compra">
                        <h1>
                        {{ ProductoActual.nombre }}
                        </h1>
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
                                <div class="carrusel-img-caja">
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
                        <div class="panel-compra">
                            <div class="control-cantidad">
                                <button @click="RestarProducto(ProductoActual)"
                                class="control-btn-restar"
                                >
                                ━
                                </button>
                                <input v-model="ProductoCantidad"
                                type="number" 
                                maxlength="8"
                                class="control-input"
                                >
                                <button @click="SumarProducto(ProductoActual)"
                                class="control-btn-sumar"
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
                            🛒 Agregar al Carrito
                            </button>
                            <button @click="CerrarPopUp04"
                            class="botonc"
                            >
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Comprar Notificacion -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="MostrarConfir" 
                class="fixed top-4 right-4 
                bg-green-600 text-white 
                px-6 py-3 rounded-xl shadow-lg 
                z-[100] font-bold"
                >
                ✅ ¡Agregado al carrito!
                </div>
            </transition>
        </Teleport>
        <!-- Actualizar Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaP"
                @click.self="CerrarPopUp01" 
                class="fondo"
                >
                    <div class="popup">
                        <form @submit.prevent="ActualizarProducto">
                            <h1>
                            {{ ProductoAct.nombre }}
                            </h1>
                            <!-- Actualizar Nombre -->
                            <div v-if="VerificarRol([1, 2])">
                                <h2>
                                Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text" 
                                v-model="ProductoAct.nombre" 
                                maxlength="50"
                                >
                            </div>
                            <!-- Actualizar Precio -->
                            <div v-if="VerificarRol([1, 2, 4])">
                                <h2>
                                Precio
                                </h2>
                                <input placeholder="Precio"
                                type="number" 
                                v-model="ProductoAct.precio" 
                                maxlength="8"
                                >
                            </div>
                            <!-- Actualizar Stock -->
                            <div v-if="VerificarRol([1, 2, 5])">
                                <h2>
                                Stock
                                </h2>
                                <input placeholder="Stock"
                                type="number" 
                                v-model="ProductoAct.stock"
                                maxlength="8"
                                >
                            </div>
                            <!-- Actualizar Categoria y Codigo de Barra -->
                            <div v-if="VerificarRol([1, 2])">
                                <h2>
                                Categoria
                                </h2>
                                <select v-model="OpcionCategoriaA" 
                                class="seleccion"
                                >
                                    <option value="new">
                                    + Agrega una Categoria
                                    </option>
                                    <option v-for="i in ListaCategoria" 
                                    :key="i.categoria" 
                                    :value="i.categoria"
                                    >
                                    {{ i.categoria }}
                                    </option>
                                </select>
                                <div v-if="OpcionCategoriaA === 'new'">
                                    <h3>
                                    Nueva Categoria
                                    </h3>
                                    <input placeholder="Categoria"
                                    type="text" 
                                    v-model="ProductoAct.categoria"
                                    maxlength="20"
                                    >
                                </div>
                                <h2>
                                Codigo de Barras
                                </h2>
                                <input placeholder="Codigo de Barras"
                                type="text" 
                                v-model="ProductoAct.codigo_barra" 
                                maxlength="15"
                                >
                            </div>
                            <!-- Actualizar Imagenes Actuales -->
                            <div v-if="VerificarRol([1, 2])">
                                <h2>
                                Imágenes actuales
                                </h2>
                                <div v-if="ProductoAct.imagenes && ProductoAct.imagenes.length > 0" 
                                class="flex flex-row
                                md:gap-3 gap-1
                                items-center justify-center
                                w-full md:pb-2 pb-1"
                                >
                                    <button @click="BackImg(ProductoAct)"
                                    type="button"
                                    :disabled="GetImg(ProductoAct.id) === 0"
                                    class="botonflecha"
                                    >
                                    ❮
                                    </button>
                                    <div class="relative w-fit mx-auto mt-2">
                                        <button @click="NoMoreImages(ProductoAct.imagenes[GetImg(ProductoAct.id)])"
                                        type="button"
                                        title="Quitar imagen"
                                        class="botonx"
                                        >
                                        🗙
                                        </button>
                                        <div>
                                            <img v-show="ImagenesCargando[ProductoAct.id] === false"
                                            :src=ObtenerImgUrl(ProductoAct.imagenes[GetImg(ProductoAct.id)].s3_key)
                                            @load="ImagenesCargando[ProductoAct.id] = false"
                                            :class="DelImg.includes(ProductoAct.imagenes[GetImg(ProductoAct.id)].id_imagen) ? 'imagendel' : 'imagen'"
                                            >
                                            <div v-if="ImagenesCargando[ProductoAct.id] !== false" 
                                            class="mt-2"
                                            >
                                                <img src="../assets/loading.gif" 
                                                alt="Cargando..." 
                                                class="imagen !2xl:p-15">
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="NextImg(ProductoAct)"
                                    type="button" 
                                    :disabled="GetImg(ProductoAct.id) === ProductoAct.imagenes.length - 1"
                                    class="botonflecha">
                                    ❯
                                    </button>
                                </div>
                                <div v-else class="imageno">
                                Sin imágenes
                                </div>
                                <!-- Imagenes Nuevas -->
                                <div>
                                    <h2>
                                    Imagenes Nuevas
                                    </h2>
                                    <div v-if="VistaPrevia.length > 0"
                                    class="relative w-fit mx-auto mt-2"
                                    >
                                        <div v-for="(img, index) in VistaPrevia"
                                        :key="index"
                                        class="shrink-0 mt-2 relative"
                                        >
                                            <button @click="LimpiarImagenes"
                                            type="button"
                                            title="Quitar imagen"
                                            class="botonx"
                                            >
                                            🗙
                                            </button>
                                            <img :src="img" 
                                            alt="Vista Previa"
                                            class="imagen !m-0" 
                                            />
                                        </div>
                                    </div>
                                    <div v-else class="imageno">
                                    <span>
                                    Sin vista previa
                                    </span> 
                                    </div>
                                    <div class="md:mt-4 mt-2">
                                        <input @change="SeleccionarImagen"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        class="imagenu !w-full"
                                        ref="fileInput"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="botones">
                                <button :disabled="confirboton || Actualizando" 
                                type="submit" 
                                class="botoncon"
                                >
                                {{ Actualizando ? 'Actualizando...' : 'Actualizar' }}
                                </button>
                                <button @click="CerrarPopUp01"
                                type="button" 
                                class="botonc"
                                >
                                Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Actualizar Banner -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="VentanaBanner"
                @click.self="CerrarPopUp03" 
                class="fondo"
                >
                    <div class="popup">
                        <h1 class="text-center">
                        Banners:
                        </h1>
                        <!-- Subir Banners -->
                        <div>
                            <h1>
                            Nuevos Banners
                            </h1>
                            <div class="md:mt-4 mt-2">
                                <input @change="SeleccionarBanner"
                                type="file"
                                accept="image/*"
                                multiple
                                class="imagenu !w-full"
                                ref="fileInput"
                                />
                            </div>
                        </div>
                        <!-- Actualizar Banners -->
                        <div>
                            <h1>
                            Actualizar Banners
                            </h1>
                            <div v-if="bannersorden.length > 0"
                            class="relative flex flex-row overflow-x-auto gap-4"
                            >
                                <div v-for="(banner, index) in bannersorden"
                                :key="banner.id || banner.vista_previa"
                                :class="bannerdesactivado(banner) ? 'cartabannerdel' : 'cartabanner'"
                                draggable="true"
                                @dragstart="EmpezarArrastre(index)"
                                @dragover.prevent
                                @drop="Soltar(index)"
                                >
                                    <template v-if="banner.id">
                                            <div class="botones">
                                                <button @click="bannerestatus(banner.id)"
                                                v-if="!bannerdesactivado(banner)"
                                                type="button"
                                                title="Desactivar"
                                                class="botonc"
                                                >
                                                🗙
                                                </button>
                                                <button v-else @click="bannerestatus(banner.id)"
                                                type="button"
                                                title="Restaurar"
                                                class="botoncon"
                                                >
                                                🐦‍🔥
                                                </button>
                                            </div>
                                            <div v-if="bannerdesactivado(banner)">
                                                <button @click="DelSupaBann.push(banner.id)"
                                                v-if="!DelSupaBann.includes(banner.id)"
                                                type="button"
                                                title="Quitar imagen"
                                                class="botonx"
                                                >
                                                🗑️
                                                </button>
                                                <button v-else @click="DelSupaBann = DelSupaBann.filter(id => id !== banner.id)"
                                                type="button"
                                                title="Restaurar imagen"
                                                class="botonx"
                                                >
                                                🕊️
                                                </button>
                                            </div>
                                            <div class="banner-wrapper">
                                                <img :src="ObtenerImgUrl(banner.s3_key)"
                                                :class="DelSupaBann.includes(banner.id) ? 'imagendel' : 'imagen'"
                                                >
                                                <div v-if="bannerdesactivado(banner)" 
                                                class="banner-overlay"
                                                >
                                                </div>
                                            </div>
                                    </template>
                                    <template v-else>
                                        <h1>
                                        Nuevo!
                                        </h1>
                                        <button @click="BannersNuevos.splice(BannersNuevos.indexOf(banner), 1)"
                                        type="button"
                                        title="Quitar imagen nueva"
                                        class="botonx !top-20 !right-20"
                                        >
                                        🗑️
                                        </button>
                                        <img :src="banner.vista_previa" 
                                        alt="Vista Previa"
                                        class="imagen !m-0" 
                                        />
                                    </template>
                                    <input placeholder="Enlace..."
                                    v-model="banner.enlace"
                                    type="text"
                                    class="mt-3"
                                    >
                                </div>
                            </div>
                            <div v-else class="imageno">
                            Sin imágenes
                            </div>
                        </div>
                        <div class="botones">
                            <button @click="SaveBanner"
                            class="botoncon"
                            >
                            Guardar Cambios
                            </button>
                            <button @click="CerrarPopUp03"
                            class="botonc"
                            >
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Tabla de Productos y Barra de Filtros -->
        <div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">
                <!-- Tabla de Productos -->
                <div class="start">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando catálogo..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando catálogo, un momento...
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
                        <button @click="CargarDatos()" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <div class="px-5">
                            <input placeholder="🔍 Busqueda..."
                            @input="BusquedaProducto"
                            type="text" 
                            v-model="Busqueda" 
                            class="busqueda"
                            maxlength="50"
                            >
                        </div>
                        <div v-if="Bananaer"
                        class="flex flex-col relative group w-full overflow-hidden rounded-xl" 
                        >   
                            <div v-if="Bananaer.imagenes && Bananaer.imagenes.length > 0"
                            class="relative px-5"
                            @touchstart="ComienzoToque($event)"
                            @touchend="FinToque($event, Bananaer)"
                            >
                                <button @click="IndiceBanner--"
                                :disabled="IndiceBanner === 0"
                                type="button"
                                class="botonflechagrande
                                absolute left-0 top-0 z-20 opacity-0
                                hidden md:flex
                                group-hover:opacity-100"
                                >
                                ❮
                                </button>
                                <button @click="AbrirPopUp03"
                                v-if="VerificarRol([1])"
                                type="button"
                                class="botonx !right-20 !bg-gray-700"
                                >
                                ✏️
                                </button>
                                <div>
                                    <img @click="router.push(`/${Bananaer.imagenes[IndiceBanner].enlace}`)"
                                    @load="ImagenesCargando[Bananaer.id] = false"
                                    v-show="ImagenesCargando[Bananaer.id] === false"
                                    :src="ObtenerImgUrl(Bananaer.imagenes[IndiceBanner].s3_key)"
                                    class="banner"
                                    > 
                                    <div v-if="ImagenesCargando[Bananaer.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="banner">
                                    </div>
                                </div>
                                <button @click="IndiceBanner++"
                                :disabled="IndiceBanner === Bananaer.imagenes.length - 1"
                                type="button"
                                class="botonflechagrande 
                                absolute right-0 top-0 z-20 opacity-0
                                hidden md:flex
                                group-hover:opacity-100"
                                >
                                ❯
                                </button>
                            </div>
                        </div>
                        <div v-for="cat in ListaCategoria" 
                        :key="cat.categoria" 
                        >
                            <div v-if="ProductosPorCategoria[cat.categoria] && ProductosPorCategoria[cat.categoria].length > 0"
                            class="relative group flex flex-col md:mb-8 mb-2 
                            bg-gradient-to-tr from-green-600/50 to-green-300/50 rounded-2xl"
                            >
                                <h1 class="text-3xl font-extrabold text-green-900 md:mb-2 mb-0 drop-shadow-sm">
                                {{ cat.categoria }}
                                </h1>
                                <div :id="'carrusel-' + cat.categoria"
                                class="
                                flex flex-row 
                                w-full overflow-x-auto md:overflow-hidden md:py-4 py-2
                                scroll-smooth gap-5"
                                >
                                    <button @click="CarruselIzquierda(cat.categoria)"
                                    :disabled="ObtenerIndiceCarrusel(cat.categoria) === 0"
                                    class="botonflechacat 
                                    absolute left-0 top-[55%] 
                                    hidden md:flex
                                    opacity-0 group-hover:opacity-100"
                                    >
                                    ❮
                                    </button>
                                    <div v-for="i in ProductosPorCategoria[cat.categoria]"
                                    :key="cat.categoria + '-' + i.id"
                                    :class="Estatuscolor(i.activo)"
                                    @click="AccionCarta(i)"
                                    class="carta"
                                    >
                                        <div>
                                            <div v-if="i.imagenes.length > 0"
                                            class="
                                            flex flex-row 
                                            2xl:gap-3 gap-1
                                            items-center justify-center 
                                            w-full md:pb-2 pb-1 snap-x
                                            ">
                                                <img v-show="ImagenesCargando[i.id] === false"
                                                :src=ObtenerImgUrl(i.imagenes[GetImg(i.id)].s3_key)
                                                @load="ImagenesCargando[i.id] = false"
                                                class="imagen"
                                                >
                                                <div v-if="ImagenesCargando[i.id] !== false" 
                                                class="mt-2"
                                                >
                                                    <img src="../assets/loading.gif" 
                                                    alt="Cargando...." 
                                                    class="imagen !p-15">
                                                </div>
                                            </div>
                                            <img v-else src="../assets/images.png"
                                            class="imagen"
                                            >
                                            <div>
                                                <h2 class="font-bold">
                                                {{ i.nombre }}
                                                </h2>
                                                <h2>
                                                $ {{ FormatearPrecio(i.precio) }}
                                                </h2>
                                                <div v-if="VerificarRol([1, 2, 4, 5])">
                                                    <h3>
                                                    {{ i.codigo_barra }} 
                                                    <br>
                                                    Stock: 
                                                    {{ i.stock }}
                                                    </h3>
                                                </div>
                                                <div class="flex flex-row lg:flex-col justify-center">
                                                    <div class="botones">
                                                        <div v-if="VerificarRol([1, 2])">
                                                            <button @click.stop="Eliminacion(i)" 
                                                            v-if="i.activo" 
                                                            class="botonc !py-2"
                                                            >
                                                            ❌ 
                                                            <span class="hidden lg:inline 2xl:inline">
                                                            Eliminar
                                                            </span>
                                                            </button>
                                                            <button v-else @click.stop="Eliminacion(i)" 
                                                            class="botoncon !py-2"
                                                            >
                                                            🕊️
                                                            <span class="hidden lg:inline 2xl:inline">
                                                            Reactivar
                                                            </span> 
                                                            </button>
                                                        </div>
                                                        <div v-if="VerificarRol([1, 2, 4, 5])">
                                                            <button @click.stop="Edicion(i)" 
                                                            v-if="VerificarRol([1, 2, 4, 5])" 
                                                            class="botont !py-2">
                                                            ✏️ 
                                                            <span class="hidden lg:inline 2xl:inline">
                                                            Editar
                                                            </span>
                                                            </button>
                                                        </div>
                                                        <button @click.stop="Compracion(i)"
                                                        :disabled="CarritoStock(i) === 0"
                                                        v-if="VerificarRolExcluido([2, 3, 4, 5, 6])"
                                                        class="botoncon !py-2 !text-2xl"
                                                        >
                                                        🛍️
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="CarruselDerecha(cat.categoria, ProductosPorCategoria[cat.categoria].length)"
                                    class="botonflechacat 
                                    absolute right-0 top-[55%] 
                                    hidden md:flex
                                    opacity-0 group-hover:opacity-100"
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
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { 
        CarritoLocal, 
        CerrarSesion, 
        Rol, 
        ActualizarCajaP, 
        ProductoActual, 
        ProductoCantidad, 
        PedidoActual, 
        leerCookie, 
        urlover8000, 
        CargarCarrito, 
        Iniciado, 
        SesionExpirada,
        ValidadSesionBack,
        VerificarRol,
        VerificarRolExcluido
    } from './Estatus.js'
    import { 
        onMounted, 
        onUnmounted, 
        toRefs, 
        ref, 
        watch, 
        computed 
    } from 'vue'
    import { 
        supabase 
    } from '../config/supabase.js'
    import { 
        useRouter 
    } from 'vue-router'
    // ----- Variables Vue ----- //
    const bannersorden = computed ({
        get() {
            const viejo = (Bananaeract.value && Bananaeract.value.imagenes) ? Bananaeract.value.imagenes : []
            const nuevo = BannersNuevos.value
            const todo = [...viejo, ...nuevo]
            return todo.sort((a,b) => {
                const desactA = bannerdesactivado (a)
                const desactB = bannerdesactivado (b)
                if (desactA && !desactB)
                    return 1
                if (desactB && !desactA)
                    return -1
                const ordenA = a.orden || 0
                const ordenB = b.orden || 0
                return ordenA - ordenB
            })
        },
        set (bannersordenados) {
            bannersordenados.forEach((banner, index) => {
                banner.orden = index + 1
            })
        }
    })
    const confirboton = computed(() =>{
        if (ActualizarCajaP.value) {
            const faltandatos03 =
                ProductoAct.value.nombre === "" ||
                ProductoAct.value.precio === "" ||
                ProductoAct.value.stock === "" ||
                ProductoAct.value.codigo_barra === "" ||
                ProductoAct.value.stock < 0 ||
                ProductoAct.value.precio <= 0
            const faltandatos04 = 
                OpcionCategoriaA.value === "new" && ProductoAct.value.categoria === ""
            return faltandatos03 || faltandatos04
        }
    })
    const ProductosPorCategoria = computed(() => {
        const agrupados = {}
        if (ListaCategoria.value && Productos.value) {
            ListaCategoria.value.forEach(cat => {
                agrupados[cat.categoria] = Productos.value.filter(p => p.categoria === cat.categoria)
            })
        }
        return agrupados
    })
    // ----- Variables Complejas ----- //
    const ProductoAct = ref({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        codigo_barra: "",
        imagenes: []
    })
    const ProductoEli = ref({
        id: "",
        nombre: "",
        imagenes: []
    })
    const prop = defineProps (['path','size'])
    const { path } = toRefs (prop)
    const router = useRouter()
    // ----- Variables Booleanas ----- //
    const ActualizarCajaPDel = ref (false)
    const VentanaCompra = ref (false)
    const VentanaBanner = ref (false)
    const MostrarConfir = ref(false)
    const Actualizando = ref(false)
    const CargandoTrue = ref(true)
    const filtroAct = ref (false)
    const ErrorCarga = ref(false)
    // ----- Variables Vacias ----- //
    const ImagenesCargando = ref({})
    const ListaCategoria = ref ("")
    const BannersNuevos = ref ([])
    const IndiceCarrusel = ref({})
    const VistaPrevia = ref ([])
    const ArchivoSave = ref ([])
    const DelSupaBann = ref ([])
    const filtrocat = ref ("")
    const IndiceImg = ref ({})
    const Productos = ref ([])
    const fileInput = ref ('')
    const Busqueda = ref ("")
    const DelBann = ref ([])
    const NewImg = ref ([])
    const DelImg = ref ([])
    const mayor = ref ("")
    const menor = ref ("")
    // ----- Variables Simples ----- //
    const OpcionCategoriaA = ref ("new")
    const Bananaeract = ref(null)
    const IndiceBanner = ref(0)
    const filtroRadio = ref(0)
    const Bananaer = ref(null)
    const filtroEst = ref (1)
    // ----- Variables Temporales ----- //
    let intervaloCarrusel = null
    let cartagarrada = null
    let inicioX = 0
    let inicioY = 0
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
    })
    onUnmounted (() => {
        if (intervaloCarrusel) clearInterval(intervaloCarrusel)
    })
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
    watch (path, () => {
        if (path.value) ObtenerImgUrl()
    })
    const CargarDatos = (async() => {
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
            await ValidadSesionBack()
            await Banner()
            await BusquedaProducto()
            if (VerificarRol([1])) {
                await Banneractu()
            }
            const respuesta = await fetch(`${urlover8000}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                },
                credentials: 'include'
            })
            if (!respuesta.ok) throw new Error("Error de conexión con el servidor")
            const categ = await respuesta.json()
            const OrdenDeseado = ["Accesorios", "Hardware", "Periféricos", "Audio", "Hogar y Deco.", "Indumentaria", "SimRacing", "Varios..."]
            categ.sort((a, b) => {
                let indexA = OrdenDeseado.indexOf(a.categoria)
                let indexB = OrdenDeseado.indexOf(b.categoria)
                if (indexA === -1) indexA = 999 
                if (indexB === -1) indexB = 999 
                return indexA - indexB
            })
            ListaCategoria.value = categ
            CargarCarrito()
            IniciarCarruselAutomatico()
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
    const IniciarCarruselAutomatico = () => {
        intervaloCarrusel = setInterval(() => {
            if (Bananaer.value && Bananaer.value.imagenes) {
                if (IndiceBanner.value < Bananaer.value.imagenes.length - 1) {
                    IndiceBanner.value++
                } else {
                    IndiceBanner.value = 0
                }
            }
        }, 4000)
    }
    const emit = defineEmits ([
        'upload',
        'update:path'
    ])
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaPDel.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp03 = () => {
		VentanaBanner.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp04 = () => {
		VentanaCompra.value = true
		document.body.style.overflow = "hidden"
	}
    const AccionCarta = (producto_fila) => {
        if (VerificarRol([1, 2, 3, 4, 5, 6])) {
            Edicion(producto_fila)
        } else {
            Compracion(producto_fila)
        }
    }
    const BackImg = (imagen) => {
        const ImgActual = GetImg(imagen.id)
        if (ImgActual > 0) {
            IndiceImg.value[imagen.id] = ImgActual - 1
            ImagenesCargando.value[imagen.id] = true
        }
    }
    const bannerdesactivado = (banner) => {
        if (!banner.id) 
            return false
        if (banner.activo === true) 
            return DelBann.value.includes(banner.id)
        return !DelBann.value.includes(banner.id)
    }
    const bannerestatus = (id) => {
        if (DelBann.value.includes(id)) {
            DelBann.value = DelBann.value.filter(
                b => b !== id
            )
            DelSupaBann.value = DelSupaBann.value.filter(
                b => b !== id
            )
        } else {
            DelBann.value.push(id)
        }
    }
    const CarruselDerecha = (categoria, totalProductos) => {
        const current = ObtenerIndiceCarrusel(categoria)
        if (current < totalProductos - 1) {
            IndiceCarrusel.value[categoria] = current + 1
            const carrusel = document.getElementById('carrusel-' + categoria)
            if (carrusel) {
                carrusel.scrollBy({ left: 1000, behavior: 'smooth' })
            }
        }
    }
    const CarruselIzquierda = (categoria) => {
        const current = ObtenerIndiceCarrusel(categoria)
        if (current > 0) {
            IndiceCarrusel.value[categoria] = current - 1
            const carrusel = document.getElementById('carrusel-' + categoria)
            if (carrusel) {
                carrusel.scrollBy({ left: -1000, behavior: 'smooth' })
            }
        }
    }
	const CerrarPopUp01 = () => {
		ActualizarCajaP.value = false
        DelImg.value = []
        LimpiarImagenes()
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaPDel.value = false
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp03 = () => {
		VentanaBanner.value = false
        DelBann.value = []
        DelSupaBann.value = []
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp04 = () => {
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
		document.body.style.overflow = "auto"
	}
    const ComienzoToque = (evento) => {
        inicioX = evento.changedTouches[0].clientX
        inicioY = evento.changedTouches[0].clientY
    }
    const Compracion = (producto_fila) => {
        if (CarritoStock(producto_fila) <= 0) {
            return 
        }
        VentanaComprar(producto_fila)
        AbrirPopUp04()
    }
    const Eliminacion = (producto_fila) => {
        ProductoEli.value.id = producto_fila.id
        ProductoEli.value.nombre = producto_fila.nombre
        ProductoEli.value.imagenes = producto_fila.imagenes
        AbrirPopUp02()
    }
    const EmpezarArrastre = (index) => {
        cartagarrada = index
    }
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        }
        else if (id_estatus === false) {
            return "no"
        }
    }
    const FinToque = (evento, producto) => {
        if (!producto) return
        const finX = evento.changedTouches[0].clientX
        const finY = evento.changedTouches[0].clientY
        const diferenciaX = inicioX - finX
        const diferenciaY = Math.abs(inicioY - finY)
        if (diferenciaY > Math.abs(diferenciaX)) {
            inicioX = 0
            inicioY = 0
            return
        }
        if (Math.abs(diferenciaX) < 50) {
            inicioX = 0
            inicioY = 0
            return
        }
        if (Math.abs(diferenciaX) < 50) {
            inicioX = 0
            return
        }
        if (diferenciaX > 0) {
            NextImg(producto)
        }
        else {
            BackImg(producto)
        }
        inicioX = 0
        inicioY = 0
    }
    const FormatearPrecio = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    const GetImg = (id) => {
        return IndiceImg.value[id] || 0
    }
    const LimpiarImagenes = () => {
        VistaPrevia.value = []
        ArchivoSave.value = []
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    }
    const NextImg = (imagen) => {
        const ImgActual = GetImg(imagen.id)
        if (ImgActual < imagen.imagenes.length - 1) {
            IndiceImg.value[imagen.id] = ImgActual + 1
            ImagenesCargando.value[imagen.id] = true
        }
    }
    const NoMoreImages = (img) => {
        const index = DelImg.value.indexOf(
            img.id_imagen
        )
        if (index === -1) {
            DelImg.value.push(img.id_imagen)
        } else {
            DelImg.value.splice(index, 1)
        }
        IndiceImg.value[ProductoAct.value.id] = 0
    }
    const ObtenerImgUrl = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    const ObtenerIndiceCarrusel = (categoria) => {
        const ind = (IndiceCarrusel.value[categoria])
        return ind || 0
    }
    const RestarProducto = () => {
        if (ProductoCantidad.value > 1) {
            ProductoCantidad.value--
        }
    }
    const SeleccionarImagen = (evt) => {
        const files = evt.target.files
        if (files) {
            for (
                let i = 0 ; i < files.length ; i++ 
            ) {
                ArchivoSave.value.push(files[i])
                VistaPrevia.value.push(URL.createObjectURL(files[i]))
            }
        }
    }
    const SeleccionarBanner = (evt) => {
        const files = evt.target.files
        if (files) {
            let maxOrdenExistente = 0
            if (Bananaer.value && Bananaer.value.imagenes) {
                Bananaer.value.imagenes.forEach(b => {
                    if (b.orden && b.orden > maxOrdenExistente) {
                        maxOrdenExistente = b.orden
                    }
                })
            }
            let maxOrdenNuevos = 0
            if (BannersNuevos.value.length > 0) {
                BannersNuevos.value.forEach(b => {
                    if (b.orden && b.orden > maxOrdenNuevos) {
                        maxOrdenNuevos = b.orden
                    }
                })
            }
            let proximoOrden = Math.max(maxOrdenExistente, maxOrdenNuevos) + 1
            for (let i = 0 ; i < files.length ; i++) {
                const BannerNuevo = {
                    imagen: files[i],
                    vista_previa: URL.createObjectURL(files[i]),
                    enlace: "",
                    orden: proximoOrden
                }
                BannersNuevos.value.push(BannerNuevo)
                proximoOrden++
            }
        }
    }
    const Soltar = (cartasoltada) => {
        if (cartagarrada === null || cartagarrada === cartasoltada) return
        const nuevalista = [...bannersorden.value]
        const cartamovida = nuevalista.splice(cartagarrada, 1)[0]
        nuevalista.splice(cartasoltada, 0, cartamovida)
        bannersorden.value = nuevalista
        cartagarrada = null
    }
    const SumarProducto = () => {
        if (ProductoActual.value && ProductoCantidad.value < ProductoActual.value.stock) {
            ProductoCantidad.value++
        }
    }
    const VentanaComprar = (ProductoSeleccionado) => {
        AbrirPopUp04()
        ProductoActual.value = ProductoSeleccionado
        ProductoCantidad.value = 1
    }
    // ----- Para el Backend ----- //
    const ActualizarBanner = async() => {
        // ----- Actualizar Datos Banner Backend ----- //
        if (!Bananaeract.value) return
        for (const BannerAct of Bananaeract.value.imagenes) {
            if (bannerdesactivado(BannerAct)) continue
            const BannerActData = {
                enlace: BannerAct.enlace,
                orden: BannerAct.orden
            }
            const ActBanner = await fetch(`${urlover8000}/banners/id/${BannerAct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(BannerActData),
            credentials: 'include'
            })
            if (ActBanner.status === 401) {
                await CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
        }
    }
    const ActualizarProducto = async() => {
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            // ----- Datos Texto Backend ----- //
            if (OpcionCategoriaA.value != "new") { 
                ProductoAct.value.categoria = OpcionCategoriaA.value
            }
            const ProductoActNoImg = {
                nombre: ProductoAct.value.nombre,
                precio: ProductoAct.value.precio,
                stock: ProductoAct.value.stock,
                categoria: ProductoAct.value.categoria,
                codigo_barra: ProductoAct.value.codigo_barra
            }
            const ActProducto = await fetch(`${urlover8000}/productos/id/${ProductoAct.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ProductoActNoImg),
            credentials: 'include'
            })
            if (ActProducto.status === 401) {
                await CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            // ----- Borrar Datos Imagen ----- //
            for (const id_img of DelImg.value) {
                const listaImagenes = ProductoAct.value.imagenes || []
                const ImgDel = listaImagenes.find(
                    img => img.id_imagen === id_img
                )
                if (ImgDel && ImgDel.s3_key) {
                    await supabase.storage.from('max_imagenes').remove([ImgDel.s3_key])
                }
                await fetch(`${urlover8000}/productos/archivos/id/${id_img}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
            }
            // ----- Subir Datos Imagen ----- //
            for (const file of ArchivoSave.value) {
                const fileExt = file.name.split('.').pop()
                const filePath = `${Math.random()}.${fileExt}`
            // ----- Subir Datos Imagen Supabase ----- //
                let { error: uploadError } = await supabase.storage
                    .from('max_imagenes')
                    .upload(filePath, file)
            // ----- Subir Datos Imagen Backend ----- //
                if (!uploadError) {
                    await fetch(`${urlover8000}/productos/archivos/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id_producto: ProductoAct.value.id,
                            s3_key: filePath,
                            nombre_original: file.name,
                            tipo_contenido: fileExt,
                            tamanio: file.size
                        }),
                        credentials: 'include'
                    })
                }
            }
            BusquedaProducto()
            CerrarPopUp01()
        } catch (error) {
            console.error(error)
            alert("Hubo un error al guardar los cambios.")
        } finally {
            Actualizando.value = false
        }
    }
    const Banner = async () => {
        try {
            const respuesta = await fetch(`${urlover8000}/banners/?bool_activo=true`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                },
                credentials: 'include'
            })
            if (respuesta.ok) {
                const bananaer = await respuesta.json()
                if (bananaer.length > 0) {
                    Bananaer.value = {
                        id: "bananaer",
                        imagenes: bananaer
                    }
                }
            }
        } catch (error) {
            console.error("Error al cargar el banner:", error)
        }
    }
    const Banneractu = async () => {
        try {
            const respuesta = await fetch(`${urlover8000}/banners/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                },
                credentials: 'include'
            })
            if (respuesta.ok) {
                const bananaeract = await respuesta.json()
                if (bananaeract.length > 0) {
                    Bananaeract.value = {
                        id: "bananaeract",
                        imagenes: bananaeract
                    }
                }
            }
        } catch (error) {
            console.error("Error al cargar el banner:", error)
        }
    }
    const BorrarBanner = async() => {
        // ----- Borrar Banner Imagen ----- //
        if (!Bananaeract.value) return
        for (const id_banner of DelSupaBann.value) {
            const BannerDelete = Bananaeract.value.imagenes.find(
                (b) => b.id === id_banner
            )
            if (BannerDelete) {
                if (BannerDelete.s3_key) {
                    await supabase.storage.from('max_imagenes').remove([BannerDelete.s3_key])
                }
                await fetch(`${urlover8000}/banners/id/${BannerDelete.id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
            }
        }
        DelSupaBann.value = []
    }
    const BorrarProducto = async() => {
        const EraseProducto = await fetch(`${urlover8000}/productos/id/${ProductoEli.value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (EraseProducto.status === 401) {
            await CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        ProductoEli.value = {
        id: "",
        nombre: "",
        imagenes: []
        }
        BusquedaProducto()
        CerrarPopUp02()
    }
    const BusquedaProducto = async() => {
        let url = new URL (`${urlover8000}/producto/`)
		url.searchParams.append('limit', 1000)
        url.searchParams.append('bool_activo', 'true')
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        let minfiltro = ""
        let maxfiltro = ""
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
        if (filtroEst.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            filtroAct.value = true
        }
        if (filtroEst.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            filtroAct.value = true
        }
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value)
            filtroAct.value = true
        }
        const BusqProducto = await fetch(url, {
            headers: {
                "X-Tunnel-Skip-AntiPhishing-Page": "true"
            },
            credentials: 'include'
        })
        const datos = await BusqProducto.json()
        Productos.value = datos
    }
    const CarritoStock = (Producto) => {
        let stockCarrito = 0
        CarritoLocal.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                stockCarrito = stockCarrito + itemCarrito.cantidad
            }
        })
        return Producto.stock - stockCarrito
    }
    const Confirmar = (async() => {
        const tokenGuardado = leerCookie("token")
        const ClienteGuardado = leerCookie("id_cliente")
        if (PedidoActual.value) {
            const respuesta = await fetch(`${urlover8000}/pedidos/detalles_pedido/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify([{
                    id_pedido: PedidoActual.value,
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                }]),
                credentials: 'include'
            })
            if (respuesta.ok) {
                CerrarPopUp04()
                console.log ("funciono")
            } else {
                const error = await respuesta.text()
                console.error("Error al agregar detalle:", error)
            }
        } else {
            const respuesta = await fetch(`${urlover8000}/pedidos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify({
                    id_cliente: parseInt(ClienteGuardado),
                    id_direccion: 1,
                    metodo_pago: " ",
                    tiempo_estimado_entrega: 0,
                    tiempo_entrega: 0
                }),
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            if (respuesta.ok) {
                const DatosPedido = await respuesta.json ()
                PedidoActual.value = DatosPedido.id
                localStorage.setItem(
                    "pedido",
                    PedidoActual.value
                )
                Confirmar() 
            } else {
                const error = await respuesta.text()
                console.error("Error al agregar Pedido:", error)
            }
        }
    })
    const DesactivarBanner = async () => {
        if (!Bananaeract.value) return
        for (const id_banner of DelBann.value) {
            if (DelSupaBann.value.includes(id_banner)) continue
            const BannerDelete = Bananaeract.value.imagenes.find(
                (b) => b.id === id_banner
            )
            if (BannerDelete) {
                await fetch(`${urlover8000}/banners/estado/id/${BannerDelete.id}`, {
                    method: 'PUT',
                    credentials: 'include'
                })
            }
        }
        DelBann.value = []
    }
    const Edicion = (producto_fila) => {
        ProductoAct.value.id = producto_fila.id
        ProductoAct.value.nombre = producto_fila.nombre
        ProductoAct.value.precio = producto_fila.precio
        ProductoAct.value.stock = producto_fila.stock
        OpcionCategoriaA.value = producto_fila.categoria
        ProductoAct.value.codigo_barra = producto_fila.codigo_barra
        ProductoAct.value.imagenes = producto_fila.imagenes
        DelImg.value = []
        NewImg.value = []
        VistaPrevia.value = []
        AbrirPopUp01()
    }
    const SaveBanner = async () => {
        if (BannersNuevos.value.length > 0) {
            await SubirBanner()
        }
        if (DelBann.value.length > 0) {
            await DesactivarBanner()
        }
        if (DelSupaBann.value.length > 0) {
            await BorrarBanner()
        }
        await ActualizarBanner()
        DelBann.value = []
        DelSupaBann.value = []
        await Banner()
        await Banneractu()
        CerrarPopUp03()
    }
    const SumarCarrito = () => {
        if (!ProductoActual.value)
            return
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
        CerrarPopUp04()
        MostrarConfir.value = true
        setTimeout(() => { MostrarConfir.value = false }, 2000)
    }
    const SubirBanner = async() => {
        // ----- Subir Datos Banner ----- //
        for (const BannerNew of BannersNuevos.value) {
            const fileExt = BannerNew.imagen.name.split('.').pop()
            const filePath = `${Math.random()}.${fileExt}`
        // ----- Subir Datos Banner Supabase ----- //
            let { error: uploadError } = await supabase.storage
                .from('max_imagenes')
                .upload(filePath, BannerNew.imagen)
        // ----- Subir Datos Banner Backend ----- //
            if (!uploadError) {
                await fetch(`${urlover8000}/banners/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        s3_key: filePath,
                        nombre_original: BannerNew.imagen.name,
                        tipo_contenido: fileExt,
                        tamanio: BannerNew.imagen.size,
                        enlace: BannerNew.enlace,
                        orden: Number(BannerNew.orden) || 1
                    }),
                    credentials: 'include'
                })
            }
        }
        BannersNuevos.value = []
    }
</script>