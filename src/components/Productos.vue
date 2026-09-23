<template>
    <div class="cuerpo">
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
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
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
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
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
                                    <h2>
                                    Nueva Categoria
                                    </h2>
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
                                class="flex flex-row gap-3
                                items-center justify-center
                                w-full pb-2"
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
                                                class="imagen !2xl:p-15"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="NextImg(ProductoAct)"
                                    type="button" 
                                    :disabled="GetImg(ProductoAct.id) === ProductoAct.imagenes.length - 1"
                                    class="botonflecha"
                                    >
                                    ❯
                                    </button>
                                </div>
                                <div v-else class="imageno">
                                Sin imágenes
                                </div>
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
                                    <div class="mt-4">
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
        <!-- Confirmacion Eliminar -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="ActualizarCajaPDel"
                @click.self="CerrarPopUp02"
                class="fondo"
                >
                    <div class="popup">
                        <h1 class="text-center">
                        ¿Desear Eliminar/Reactivar {{ ProductoEli.nombre }}?
                        </h1>
                        <div>
                            <div v-if="ProductoEli.imagenes.length > 0"
                            class="flex flex-row 
                            gap-3 overflow-x-auto
                            items-center justify-center 
                            w-full pb-2 snap-x"
                            >
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
                                        class="imagen !2xl:p-15"
                                        >
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
                            Confirmo
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
                @click.self="CerrarPopUp03"
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
                                    $ {{ FormatearPrecio((ProductoActual.es_promocion ? ProductoActual.precio_nuevo : ProductoActual.precio) * ProductoCantidad) }}
                                </span>
                            </div>
                        </div>
                        <div class="botones mt-2">
                            <button @click="SumarCarrito"
                            class="botoncon"
                            >
                            Agregar al Carrito
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
        <!-- Comprar Notificacion -->
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
        <!-- Promocion Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="VentanaPromocion"
                @click.self="CerrarPopUp04" 
                class="fondo"
                >
                    <div class="popup !max-w-md">
                        <form @submit.prevent="GuardarPromocion" 
                        class="flex flex-col gap-4"
                        >
                            <h1 class="text-center !text-xl !mb-2">
                            🏷️ Oferta: {{ ProductoPromo.nombre }}
                            </h1>
                            <div class="bg-gray-50 rounded-xl 
                            p-2 shadow-inner 
                            mx-auto w-full max-w-[200px]"
                            >
                                <div v-if="ProductoPromo.imagenes.length > 0"
                                class="flex flex-row 
                                gap-2 overflow-x-auto 
                                items-center justify-between 
                                w-full snap-x"
                                >
                                    <button type="button" 
                                    @click="BackImg(ProductoPromo)" 
                                    :disabled="GetImg(ProductoPromo.id) === 0" 
                                    class="botonflecha 
                                    !p-1 !h-8 !w-8 shrink-0"
                                    >
                                    ❮
                                    </button>
                                    <div class="shrink-0 flex 
                                    justify-center w-24 h-24 
                                    relative rounded-lg 
                                    overflow-hidden border-2 
                                    border-white shadow-sm"
                                    >
                                        <img v-show="ImagenesCargando[ProductoPromo.id] === false"
                                        :src=ObtenerImgUrl(ProductoPromo.imagenes[GetImg(ProductoPromo.id)].s3_key)
                                        @load="ImagenesCargando[ProductoPromo.id] = false"
                                        class="w-full h-full object-cover"
                                        >
                                        <div v-if="ImagenesCargando[ProductoPromo.id] !== false" 
                                        class="absolute inset-0 
                                        flex items-center 
                                        justify-center bg-gray-100"
                                        >
                                            <img src="../assets/loading.gif" 
                                            alt="Cargando..." 
                                            class="w-8 h-8 opacity-50"
                                            >
                                        </div>
                                    </div>
                                    <button type="button" 
                                    @click="NextImg(ProductoPromo)" 
                                    :disabled="GetImg(ProductoPromo.id) === ProductoPromo.imagenes.length - 1" 
                                    class="botonflecha 
                                    !p-1 !h-8 !w-8 shrink-0"
                                    >
                                    ❯
                                    </button>
                                </div>
                                <img v-else src="../assets/images.png" 
                                class="w-24 h-24 object-cover mx-auto rounded-lg shadow-sm"
                                >
                            </div>
                            <div class="flex flex-col gap-3">
                                <div>
                                    <h2 class="text-sm font-bold text-gray-600 ml-1 mb-1">
                                    Nombre (Opcional)
                                    </h2>
                                    <input placeholder="Ej: Cyber Monday..."
                                    type="text" 
                                    v-model="FormPromo.motivo" 
                                    maxlength="100"
                                    class="w-full px-4 py-2 
                                    border-2 border-green-200 
                                    rounded-xl 
                                    focus:border-green-500 
                                    focus:outline-none 
                                    transition-colors"
                                    >
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <h2 class="text-sm font-bold 
                                        text-gray-600 
                                        ml-1 mb-1 text-center"
                                        >
                                        Precio de Oferta
                                        </h2>
                                        <div class="relative">
                                            <span class="absolute 
                                            left-3 top-1/2 
                                            -translate-y-1/2 
                                            text-gray-500 font-bold"
                                            >
                                            $
                                            </span>
                                            <input placeholder="Monto"
                                            type="number" 
                                            v-model="FormPromo.precio_nuevo" 
                                            :disabled="FormPromo.porcentaje_descuento > 0"
                                            maxlength="8"
                                            class="w-full 
                                            pl-8 pr-4 py-2 
                                            border-2 border-green-200 
                                            rounded-xl 
                                            focus:border-green-500 
                                            focus:outline-none 
                                            transition-colors 
                                            disabled:bg-gray-100"
                                            >
                                        </div>
                                    </div>
                                    <div>
                                        <h2 class="text-sm font-bold text-gray-600 
                                        ml-1 mb-1 text-center"
                                        >
                                        Descuento (%)
                                        </h2>
                                        <div class="relative">
                                            <span class="absolute 
                                            right-3 top-1/2 
                                            -translate-y-1/2 
                                            text-gray-500 font-bold"
                                            >
                                            %
                                            </span>
                                            <input placeholder="Ej: 20"
                                            type="number" 
                                            v-model="FormPromo.porcentaje_descuento" 
                                            :disabled="FormPromo.precio_nuevo > 0"
                                            max="99" min="1"
                                            class="w-full 
                                            pr-8 pl-4 py-2 
                                            border-2 border-green-200 
                                            rounded-xl 
                                            focus:border-green-500 
                                            focus:outline-none 
                                            transition-colors 
                                            disabled:bg-gray-100"
                                            >
                                        </div> 
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 
                                sm:grid-cols-2 gap-3"
                                >
                                    <div>
                                        <h2 class="text-sm 
                                        font-bold text-gray-600 
                                        ml-1 mb-1"
                                        >
                                        Inicio
                                        </h2>
                                        <input 
                                        type="datetime-local" 
                                        v-model="FormPromo.fecha_inicio"
                                        required
                                        class="w-full 
                                        px-3 py-2 
                                        border-2 border-green-200 
                                        rounded-xl text-sm 
                                        focus:border-green-500 
                                        focus:outline-none 
                                        transition-colors"
                                        >
                                    </div>
                                    <div>
                                        <h2 class="text-sm font-bold 
                                        text-gray-600 
                                        ml-1 mb-1"
                                        >
                                        Fin
                                        </h2>
                                        <input 
                                        type="datetime-local" 
                                        v-model="FormPromo.fecha_fin"
                                        required
                                        class="w-full px-3 py-2 
                                        border-2 border-green-200 
                                        rounded-xl text-sm 
                                        focus:border-green-500 
                                        focus:outline-none 
                                        transition-colors"
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row 
                            justify-center 
                            gap-2 mt-2 pt-4 
                            border-t-2 border-gray-100"
                            >
                                <button type="submit" 
                                class="botoncon flex-1 !m-0"
                                :disabled="Actualizando"
                                >
                                {{ FormPromo.id_promocion ? 'Actualizar' : 'Guardar' }}
                                </button>   
                                <button type="button" 
                                v-if="FormPromo.id_promocion"
                                @click="BorrarPromocion"
                                class="botonc flex-1 !m-0"
                                :disabled="Actualizando"
                                >
                                🗑️ Borrar
                                </button>
                                <button @click="CerrarPopUp04" 
                                type="button" 
                                class="botonc flex-1 !m-0"
                                >
                                Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
        <!-- Tabla de Productos y Barra de Filtros -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <!-- Barra de Filtros -->
                <Teleport to="body">
                    <transition name="fade">
                        <div v-if="(MostrarFiltro || MostrarNuevo)" 
                        @click="MostrarFiltro = false; MostrarNuevo = false"
                        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>
                <div :class="[
                    'bar', 
                    (MostrarFiltro || MostrarNuevo) 
                        ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                        : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0'
                    ]">
                    <div class="hidden sm:block">
                        <h1 @click="MostrarFiltro = !MostrarFiltro ; MostrarNuevo = false"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                    </div>
                    <transition name="slide">
                        <div v-if="MostrarFiltro"
                        class="flex flex-col lg:self-center"
                        >
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
                                    <option value="7">
                                    Productos Antiguos
                                    </option>
                                    <option value="8">
                                    Productos Recientes
                                    </option>
                                </select>
                            </div>
                            <!-- Switch de Promociones y Porcentaje -->
                            <div class="flex flex-col md:px-4 md:py-3 p-2 my-2 border-y-2 border-green-100 bg-green-50/50 rounded-xl">
                                <h2 class="!mb-3 flex items-center gap-1 text-green-800 font-bold">
                                🔥 Promociones
                                </h2>
                                <label class="relative inline-flex items-center cursor-pointer w-fit pl-1">
                                    <input 
                                    type="checkbox" 
                                    v-model="filtroPromo"
                                    @change="filtroDescuentoMin = 0"
                                    class="sr-only peer"
                                    >
                                    <div class="w-11 h-6 bg-gray-300 rounded-full peer 
                                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                                    after:content-[''] after:absolute after:top-0.5 after:left-[6px] 
                                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner">
                                    </div>
                                    <span class="ml-3 font-bold text-gray-700 select-none">Ver ofertas</span>
                                </label>
                                
                                <!-- Opciones de Porcentaje (Solo aparecen si el switch está prendido) -->
                                <div v-if="filtroPromo" class="flex flex-col gap-2 mt-3 pt-3 border-t border-green-200/50">
                                    <span class="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Descuento Mínimo:
                                    </span>
                                    <label class="text-sm text-gray-700 cursor-pointer">
                                        <input 
                                        :value="0" 
                                        type="radio" 
                                        v-model="filtroDescuentoMin" 
                                        class="mr-1 accent-green-600"
                                        > 
                                        Cualquier descuento
                                    </label>
                                    <label class="text-sm text-gray-700 cursor-pointer">
                                        <input 
                                        :value="15" 
                                        type="radio" 
                                        v-model="filtroDescuentoMin"
                                        class="mr-1 accent-green-600"
                                        > 
                                        15% OFF o más
                                    </label>
                                    <label class="text-sm text-gray-700 cursor-pointer">
                                        <input 
                                        :value="30" 
                                        type="radio" 
                                        v-model="filtroDescuentoMin" 
                                        class="mr-1 accent-green-600"
                                        > 
                                        30% OFF o más
                                    </label>
                                    <label class="text-sm text-red-600 font-bold cursor-pointer">
                                        <input :value="50" 
                                        type="radio" 
                                        v-model="filtroDescuentoMin" 
                                        class="mr-1 accent-red-600"
                                        > 
                                        ¡50% OFF o más!
                                    </label>
                                </div>
                            </div>
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
                            <div v-if="VerificarRol([1, 2, 4])">
                                <h2>
                                ¿El Productos esta Activo?
                                </h2>
                                <div class="flex flex-col md:p-4 p-2">
                                    <label>
                                    <input :value="2"
                                    type="radio" 
                                    v-model="filtroEst"
                                    > 
                                    Todos los Productos
                                    </label>
                                    <label>
                                    <input :value="1"
                                    type="radio" 
                                    v-model="filtroEst"
                                    > 
                                    Productos Activos
                                    </label>
                                    <label>
                                    <input :value="0"
                                    type="radio"
                                    v-model="filtroEst"
                                    > 
                                    Productos Eliminados
                                    </label>
                                </div>
                            </div>
                            <div class="botones">
                                <button @click="AplicarFiltro" 
                                class="botoncon"
                                >
                                Aplicar Filtros
                                </button>
                                <button @click="LimpiarFiltro" 
                                v-if="filtroAct === true"
                                class="botont"
                                >
                                🗑️ Limpiar Filtro
                                </button>
                            </div>
                        </div>
                    </transition>
                    <div v-if="VerificarRol([1, 2])">
                        <h1 @click="MostrarNuevo = !MostrarNuevo ; MostrarFiltro = false"
                        class="botonnew"
                        >
                        +
                        </h1>
                    </div>
                    <transition name="slide">
                        <div v-if="MostrarNuevo && (VerificarRol([1, 2]))"
                        class="flex flex-col lg:self-center"
                        >
                            <form @submit.prevent="SubirNuevoProducto">
                                <h2>
                                Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text" 
                                v-model="NuevoProducto.nombre" 
                                maxlength="50"
                                >
                                <h2>
                                Precio
                                </h2>
                                <input placeholder="Precio"
                                type="number" 
                                v-model="NuevoProducto.precio" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                                <h2>
                                Stock
                                </h2>
                                <input placeholder="Stock"
                                type="number" 
                                v-model="NuevoProducto.stock"
                                maxlength="8"
                                >
                                <h2>
                                Categoria
                                </h2>
                                <select v-model="OpcionCategoria" 
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
                                <h3 v-if="OpcionCategoria === 'new'">
                                Nueva Categoria
                                </h3>
                                <input v-if="OpcionCategoria === 'new'" 
                                type="text" 
                                v-model="NuevoProducto.categoria" 
                                placeholder="Categoria"
                                maxlength="20"
                                >
                                <div>
                                    <div v-if="VistaPrevia.length > 0"
                                    class="flex flex-row gap-3 pb-2 w-full overflow-x-auto"
                                    > 
                                        <div v-for="(img, index) in VistaPrevia"
                                        :key="index"
                                        class="shrink-0 mt-2 relative"
                                        >
                                            <button @click="LimpiarImagenes"
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
                                    <div class="mt-4">
                                        <input @change="SeleccionarImagen"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        class="imagenu !w-full"
                                        />
                                    </div>
                                </div>
                                <div class="botones">
                                    <button :disabled="confirboton" 
                                    type="submit" 
                                    class="botoncon"
                                    >
                                    Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </transition>
                </div>
                <!-- Tabla de Productos -->
                <div class="start">
                    <div v-if="CargandoTrue" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando productos..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                        Cargando productos, un momento...
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
                        <div class="mt-6 flex justify-center">
                            <button @click="CargarDatos()" 
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                            🔄 Recargar Página
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="px-5 w-full">
                        <button @click="MostrarFiltro = true"
                        class="sm:hidden 
                        w-full mb-4 py-3 
                        bg-white text-green-800 
                        font-black text-lg 
                        border-2 border-green-200 
                        rounded-xl flex items-center 
                        justify-center gap-2 
                        shadow-sm transition-all 
                        active:scale-95 active:bg-green-50"
                        >
                        ᯤ Abrir Filtros
                        </button>
                            <div class="flex flex-row items-stretch w-full gap-3 mb-5">-
                                <input @input="BusquedaProducto"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Busqueda..."
                                class="busqueda !mb-0"
                                maxlength="50"
                                >
                                <button @click="VistaLista = !VistaLista"
                                title="Alternar Vista"
                                class="bg-white border-2 border-green-200 
                                text-green-700 rounded-xl 
                                px-4 flex items-center justify-center hover:bg-green-50 
                                transition-all shadow-sm active:scale-95"
                                >
                                    <span v-if="!VistaLista" class="text-xl">
                                    「 」
                                    </span>
                                    <span v-else class="text-xl">
                                    ☰
                                    </span>
                                </button>
                            </div>
                            <div v-if="Productos.length > 0"
                            :class="VistaLista 
                            ? 'flex flex-col gap-4 w-full' 
                            :['grid grid-cols-2 gap-6', 
                            (MostrarFiltro || MostrarNuevo) 
                            ? 'lg:grid-cols-3' 
                            : 'lg:grid-cols-4']"
                            >
                                <div v-for= "i in Productos" 
                                :key="i.id"
                                @touchstart="ComienzoToque($event)"
                                @touchend="FinToque($event, i)" 
                                @click="AccionCarta(i)"
                                :class="[Estatuscolor(i.activo), VistaLista 
                                ? 'tarjeta-premium relative bg-white !w-full !m-0 hover:!shadow-lg' 
                                : 'carta relative']"
                                >
                                    <div :class="VistaLista 
                                    ? 'flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto text-left' 
                                    : 'w-full'"
                                    >
                                        <div :class="VistaLista 
                                        ? 'w-24 sm:w-32 shrink-0' 
                                        : 'w-full'"
                                        >
                                            <div v-if="i.es_promocion" 
                                            class="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md shadow-md"
                                            >
                                            🔥 {{ i.motivo || 'OFERTA' }}
                                            </div>
                                            <div v-if="i.imagenes.length > 0"
                                            class="flex flex-row 
                                            gap-3 overflow-x-auto
                                            items-center justify-center 
                                            w-full pb-2 snap-x"
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
                                                    class="imagen"
                                                    >
                                                    <div v-if="ImagenesCargando[i.id] !== false" 
                                                    :class="VistaLista 
                                                    ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' 
                                                    : 'imagen'"
                                                    >
                                                        <img src="../assets/loading.gif" 
                                                        alt="Cargando..." 
                                                        class="imagen !2xl:p-15">
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
                                        <div :class="VistaLista 
                                        ? 'tarjeta-info pt-2 sm:pt-0' 
                                        : 'mt-2'"
                                        >
                                            <h2 :class="['font-bold', VistaLista 
                                            ? 'text-2xl text-gray-800' 
                                            : '']">
                                            {{ i.nombre }}
                                            </h2>
                                            <h3 :class="VistaLista 
                                            ? 'text-gray-500 font-medium' 
                                            : ''">
                                            Categoria: 
                                            {{ i.categoria }}
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
                                                    <h2 :class="[
                                                    VistaLista ? 'text-xl font-black mt-1' : 'font-bold', 
                                                    i.es_promocion ? 'text-red-600' : 'text-green-600',
                                                    !i.es_promocion ? 'mt-1' : ''
                                                    ]">
                                                    $ {{ FormatearPrecio(i.es_promocion ? i.precio_nuevo : i.precio) }}
                                                    </h2>
                                                </div>
                                            <div v-if="VerificarRol([1, 2, 4, 5])"
                                            :class="VistaLista 
                                            ? 'mt-1' 
                                            : ''"
                                            >
                                                <h3 :class="VistaLista 
                                                ? 'text-sm text-gray-400' 
                                                : ''"
                                                >
                                                <span v-if="VistaLista">
                                                🪪 Código: 
                                                </span>
                                                {{ i.codigo_barra }} 
                                                <br v-if="VistaLista">
                                                <span v-if="VistaLista">
                                                📦
                                                </span>
                                                Stock: {{ i.stock }}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="VistaLista 
                                    ? 'tarjeta-acciones flex flex-wrap justify-end gap-2 !mt-4 sm:!mt-0 w-full sm:w-auto ml-auto shrink-0' 
                                    : [VerificarRol([1, 2]) ? 'grid grid-cols-2' : 'flex flex-col', 'w-full mt-auto pt-3 gap-1.5 sm:gap-2']"
                                    >
                                        <!-- Boton Editar -->
                                        <button @click.stop="Edicion(i)" 
                                        v-if="VerificarRol([1, 2, 4, 5])" 
                                        :class="VistaLista 
                                        ? 'btn-chico-gris w-full justify-center' 
                                        : 'botont !px-2 !py-2 !text-sm'"
                                        >
                                            ✏️
                                            <span :class="VistaLista 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                            Editar
                                            </span>
                                        </button>

                                        <!-- Boton Promocion -->
                                        <button @click.stop="AbrirPopUp04(i)" 
                                        v-if="VerificarRol([1, 2])" 
                                        :class="VistaLista 
                                        ? 'btn-chico-gris !bg-blue-600 hover:!bg-blue-700 !text-white w-full justify-center' 
                                        : 'botont !bg-blue-50 !border-blue-200 !text-blue-700 hover:!bg-blue-100 !px-2 !py-2 !text-sm'"
                                        >
                                            🏷️
                                            <span :class="VistaLista 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                            Promoción
                                            </span>
                                        </button>

                                        <!-- Boton Eliminar -->
                                        <button @click.stop="Eliminacion(i)" 
                                        v-if="VerificarRol([1, 2]) && i.activo" 
                                        :class="VistaLista 
                                        ? 'btn-chico-rojo w-full justify-center' 
                                        : [VerificarRol([2]) ? 'col-span-2' : '', 'botonc !px-2 !py-2 !text-sm']"
                                        >
                                            ❌
                                            <span :class="VistaLista 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                            Eliminar
                                            </span>
                                        </button>

                                        <!-- Boton Reactivar -->
                                        <button @click.stop="Eliminacion(i)" 
                                        v-if="VerificarRol([1, 2]) && !i.activo" 
                                        :class="VistaLista 
                                        ? 'btn-chico-verde w-full justify-center' 
                                        : [VerificarRol([2]) ? 'col-span-2' : '', 'botoncon !px-2 !py-2 !text-sm']"
                                        >
                                            🕊️
                                            <span :class="VistaLista 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                            Reactivar
                                            </span>
                                        </button>

                                        <!-- Boton Comprar -->
                                        <button @click.stop="Compracion(i)"
                                        :disabled="CarritoStock(i) === 0"
                                        v-if="VerificarRolExcluido([2, 3, 4, 5, 6])"
                                        :class="VistaLista 
                                        ? 'btn-chico-verde !bg-green-600 !text-white hover:!bg-green-700 w-full justify-center' 
                                        : 'botoncon !px-2 !py-2 !text-sm'"
                                        >
                                            🛍️
                                            <span :class="VistaLista 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                            Comprar
                                            </span>
                                        </button>

                                        <!-- Boton Favoritos -->
                                        <button @click.stop="ToggleFavorito(i.id)"
                                        v-if="ClienteID"
                                        :class="VistaLista 
                                        ? 'btn-chico-rojo w-full justify-center' 
                                        : [VerificarRol([1, 2]) ? 'col-span-2' : '', 'botonc !px-2 !py-2 !text-sm']"
                                        >
                                            {{ MisFavoritos.includes(i.id) ? '🤍 Quitar de Favoritos' : '❤️ Agregar a Favoritos' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex flex-col items-center justify-center p-8">
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                {{ Pagina === 0 ? 'No se encontraron productos 😔' : 'Ya no hay más productos para mostrar 🏁' }}
                                </h2>
                                <h3 v-if="Pagina === 0" class="text-gray-500 text-center mt-2">
                                Prueba buscando con otro término
                                </h3>
                            </div>
                            <div class="flex justify-center p-5">
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
        watch, 
        computed 
    } from 'vue'
    import { 
        supabase 
    } from '../config/supabase.js'
    import { 
        CarritoLocal, 
        CerrarSesion, 
        Rol, 
        ActualizarCajaP, 
        ProductoActual, 
        ProductoCantidad, 
        PedidoActual, 
        ClienteID, 
        urlover8000,
        CargarCarrito, 
        Iniciado, 
        SesionExpirada,
        VerificarRol,
        VerificarRolExcluido
    } from './Estatus.js'
    import { 
        useRouter 
    } from 'vue-router'
    // ----- Variables Vue ----- //
    const confirboton = computed(() =>{
        if (VentanaNuevo.value) {
            const faltandatos01 = 
                NuevoProducto.value.nombre === "" ||
                NuevoProducto.value.precio === "" ||
                NuevoProducto.value.stock === "" ||
                NuevoProducto.value.stock < 0 ||
                NuevoProducto.value.precio <= 0
            const faltandatos02 = 
                OpcionCategoria.value === "new" && NuevoProducto.value.categoria === ""
            return faltandatos01 || faltandatos02
        }
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
    // ----- Variables Complejas ----- //
    const NuevoProducto = ref({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
    })
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
    const ProductoPromo = ref({
        id: "",
        nombre: "",
        imagenes: []
    })
    const FormPromo = ref({
        motivo: "",
        precio_nuevo: "",
        porcentaje_descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
    })
    const prop = defineProps (['path','size'])
    const router = useRouter()
    const { path } = toRefs (prop)
    const MostrarFiltro = ref(window.innerWidth >= 1024)
    // ----- Variables Booleanas ----- //
    const ActualizarCajaPDel = ref (false)
    const VentanaPromocion = ref(false)
    const BloqueoPeticion = ref(false)
    const VentanaCompra = ref (false)
    const MostrarConfir = ref (false)
    const MostrarNuevo = ref (false)
    const VentanaNuevo = ref (false)
    const HayMasPaginas = ref(false)
    const Actualizando = ref(false)
    const CargandoTrue = ref(true)
    const filtroPromo = ref(false)
    const ErrorCarga = ref(false)
    const VistaLista = ref(false)
    const uploading = ref (false)
    const filtroAct = ref (false)
    // ----- Variables Vacias ----- //
    const ListaCategoria = ref ("")
    const ImagenesCargando = ref({})
    const ArchivoSave = ref ([])
    const VistaPrevia = ref ([])
    const MisFavoritos = ref([])
    const filtrocat = ref ("")
    const IndiceImg = ref ({})
    const Productos = ref ([])
    const fileInput = ref ('')
    const Busqueda = ref ("")
    const NewImg = ref ([])
    const orden = ref ("3")
    const mayor = ref ("")
    const menor = ref ("")
    const DelImg= ref ([])
    // ----- Variables Simples ----- //
    const OpcionCategoriaA = ref ("new")
    const OpcionCategoria = ref ("new")
    const filtroDescuentoMin = ref(0)
    const ItemsPorPagina = ref(24)
    const filtroRadio = ref(4)
    const filtroEst = ref (1)
	const Pagina = ref (0)
    // ----- Variables Temporales ----- //
    let inicioX = 0
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
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
    watch(path, () => {
        if (path.value) ObtenerImgUrl()
    })
    const CargarDatos = (async() => {
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
            await BusquedaProducto()
            const respuesta = await fetch(`${urlover8000}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                }
            })
            const categ = await respuesta.json()
            ListaCategoria.value = categ
            if (ClienteID.value) {
                const resFav = await fetch(`${urlover8000}/favoritos/cliente/${ClienteID.value}`, {
                    credentials: 'include'
                })
                if (resFav.ok) {
                    MisFavoritos.value = await resFav.json()
                }
            }
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
    const CambiarPagina = async (direccion) => {
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        CargandoTrue.value = true
        ErrorCarga.value = false
        if (direccion === 'next') {
            Pagina.value += ItemsPorPagina.value
        } else if (direccion === 'back') {
            Pagina.value -= ItemsPorPagina.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await BusquedaProducto()
        } catch (error) {
            console.error(error)
            ErrorCarga.value = true
        } finally {
            CargandoTrue.value = false
            BloqueoPeticion.value = false
        }
    }
    const emit = defineEmits([
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
		VentanaCompra.value = true
		document.body.style.overflow = "hidden"
	}
	const AbrirPopUp04 = async (producto_fila) => {
		ProductoPromo.value.id = producto_fila.id
        ProductoPromo.value.nombre = producto_fila.nombre
        ProductoPromo.value.imagenes = producto_fila.imagenes
        FormPromo.value = { 
            id_promocion: null,
            motivo: "", 
            precio_nuevo: "", 
            porcentaje_descuento: "",
            fecha_inicio: "", 
            fecha_fin: "" 
        }
        try {
            const respuesta = await fetch(`${urlover8000}/registro_precios/`, {
                headers: { "X-Tunnel-Skip-AntiPhishing-Page": "true" },
                credentials: 'include'
            })
            if (respuesta.ok) {
                const todasLasPromos = await respuesta.json()
                const promoExistente = todasLasPromos.find(
                    p => p.id_producto === producto_fila.id && p.activa === true
                )
                if (promoExistente) {
                    FormPromo.value = {
                        id_promocion: promoExistente.id,
                        motivo: promoExistente.motivo || "",
                        precio_nuevo: promoExistente.precio_nuevo,
                        porcentaje_descuento: promoExistente.porcentaje_descuento || "",
                        fecha_inicio: new Date(promoExistente.fecha_inicio).toISOString().slice(0, 16),
                        fecha_fin: new Date(promoExistente.fecha_fin).toISOString().slice(0, 16)
                    }
                }
            }
        } catch (error) {
            console.error("Error buscando promo existente:", error)
        }
        VentanaPromocion.value = true
        document.body.style.overflow = "hidden"
	}
    const AccionCarta = (producto_fila) => {
        if (VerificarRol([1, 2, 3, 4, 5, 6])) {
            Edicion(producto_fila)
        } else {
            Compracion(producto_fila)
        }
    }
    const AplicarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        BusquedaProducto()
        menor.value = ""
        mayor.value = ""
    }
    const BackImg = (imagen) => {
        const ImgActual = GetImg(imagen.id)
        if (ImgActual > 0) {
            IndiceImg.value[imagen.id] = ImgActual - 1
            ImagenesCargando.value[imagen.id] = true
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
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
		document.body.style.overflow = "auto"
	}
	const CerrarPopUp04 = () => {
        VentanaPromocion.value = false
		document.body.style.overflow = "auto"
	}
    const ComienzoToque = (evento) => {
        inicioX = evento.changedTouches[0].clientX
    }
    const Compracion = (producto_fila) => {
        if (CarritoStock(producto_fila) <= 0) {
            return 
        }
        VentanaComprar(producto_fila)
        AbrirPopUp03()
    }
    const Eliminacion = (producto_fila) => {
        ProductoEli.value.id = producto_fila.id
        ProductoEli.value.nombre = producto_fila.nombre
        ProductoEli.value.imagenes = producto_fila.imagenes
        AbrirPopUp02()
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
    const FormatearPrecio = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    const GetImg = (id) => {
        return IndiceImg.value[id] || 0
    }
    const LimpiarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        filtroRadio.value = 4
        filtrocat.value = ""
        filtroEst.value =  1
        filtroDescuentoMin.value = 0
        filtroPromo.value = false
        BusquedaProducto()
        filtroAct.value = false
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
    const SumarProducto = () => {
        if (ProductoActual.value && ProductoCantidad.value < ProductoActual.value.stock) {
            ProductoCantidad.value++
        }
    }
    const VentanaComprar = (ProductoSeleccionado) => {
        AbrirPopUp03()
        ProductoActual.value = ProductoSeleccionado
        ProductoCantidad.value = 1
    }
    // ----- Para el Backend ----- //
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
    const BorrarPromocion = async () => {
        if (!FormPromo.value.id_promocion) return
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            const respuesta = await fetch(`${urlover8000}/registro_precios/id/${FormPromo.value.id_promocion}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await CerrarSesion()
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar la promoción")
            }
            BusquedaProducto()
            CerrarPopUp04()
        } catch (error) {
            console.error(error)
            alert("Hubo un error al eliminar la promoción.")
        } finally {
            Actualizando.value = false
        }
    }
    const BusquedaProducto = async() => {
        let url = new URL (`${urlover8000}/producto/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', ItemsPorPagina.value + 1)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            if (orden.value !== "3") {
                filtroAct.value = true
            }
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
        if (filtroEst.value === 2) {
            filtroAct.value = true
        }
        if (filtroEst.value === 1) {
            url.searchParams.append('bool_activo', 'true')
        }
        if (filtroEst.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            filtroAct.value = true
        }
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value)
            filtroAct.value = true
        }
        if (filtroPromo.value === true) {
            url.searchParams.append('bool_promocion', 'true')
            filtroAct.value = true
            if (filtroDescuentoMin.value > 0) {
                url.searchParams.append('porcentaje_descuento_min', filtroDescuentoMin.value)
            }
        }
        const BusqProducto = await fetch(url.toString(), {
            headers: {
                "X-Tunnel-Skip-AntiPhishing-Page": "true"
            },
            credentials: 'include'
        })
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
        const ClienteGuardado = ClienteID.value
        if (PedidoActual.value) {
            const respuesta = await fetch(`${urlover8000}/pedidos/detalles_pedido/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{
                    id_pedido: PedidoActual.value,
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                }]),
                credentials: 'include'
            })
            if (respuesta.ok) {
                CerrarPopUp03()
                console.log ("funciono")
            } else {
                const error = await respuesta.text()
                console.error("Error al agregar detalle:", error)
            }
        } else {
            const respuesta = await fetch(`${urlover8000}/pedidos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
    const GuardarPromocion = async () => {
        if (Actualizando.value) return
        Actualizando.value = true
        
        try {
            const payload = {
                id_producto: ProductoPromo.value.id,
                motivo: FormPromo.value.motivo || null,
                precio_nuevo: FormPromo.value.precio_nuevo ? parseFloat(FormPromo.value.precio_nuevo) : null,
                porcentaje_descuento: FormPromo.value.porcentaje_descuento ? parseInt(FormPromo.value.porcentaje_descuento) : null,
                fecha_inicio: new Date(FormPromo.value.fecha_inicio).toISOString(),
                fecha_fin: new Date(FormPromo.value.fecha_fin).toISOString()
            }
            const respuesta = await fetch(`${urlover8000}/registro_precios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await CerrarSesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            if (!respuesta.ok) {
                const err = await respuesta.text()
                throw new Error(err)
            }
            BusquedaProducto()
            CerrarPopUp04()
        } catch (error) {
            console.error("Error al guardar promoción:", error)
            alert("Hubo un error al guardar la promoción.")
        } finally {
            Actualizando.value = false
        }
    }
    const SubirNuevoProducto = async() => {
        if (OpcionCategoria.value != "new") {
            NuevoProducto.value.categoria = OpcionCategoria.value
        }
        const SubidaNuevoProducto = await fetch(`${urlover8000}/productos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NuevoProducto.value),
            credentials: 'include'
        })
        if (SubidaNuevoProducto.status === 401) {
            await CerrarSesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            SesionExpirada.value = true
            Iniciado.value = false
            return
        }
        const ProductoNew = await SubidaNuevoProducto.json()
        const NewId = ProductoNew.id        
        if (ArchivoSave.value.length > 0) {
            uploading.value = true
            for (
                let i = 0 ; i < ArchivoSave.value.length ; i++
            ) {
                const file = ArchivoSave.value[i]
                const fileExt = file.name.split('.').pop()
                const filePath = `${Math.random()}.${fileExt}`
                let { error: uploadError } = await supabase.storage
                    .from('max_imagenes')
                    .upload(filePath, file)
                if (uploadError) {
                    alert("El Producto se creo, Pero hubi un  error subiendo la imagen")
                } else {
                    await fetch(`${urlover8000}/productos/archivos/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_producto: NewId,
                            s3_key: filePath,
                            nombre_original: file.name,
                            tipo_contenido: fileExt,
                            tamanio: file.size
                        }),
                        credentials: 'include'
                    })
                }
            }
            uploading.value = false
        }
        NuevoProducto.value = {
            nombre: "",
            precio: "",
            stock: "",
            categoria: ""
        }
        LimpiarImagenes()
        BusquedaProducto()
    }
    const SumarCarrito = () => {
        if (!ProductoActual.value)
            return
        const precioEfectivo = ProductoActual.value.es_promocion 
            ? ProductoActual.value.precio_nuevo 
            : ProductoActual.value.precio;
        const nuevoProducto = {
            id_pedido: PedidoActual.value,
            nombre_producto: ProductoActual.value.nombre,
            id_producto: ProductoActual.value.id,
            cantidad: ProductoCantidad.value,
            precio_unitario: precioEfectivo,
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
        CerrarPopUp03()
        MostrarConfir.value = true
        setTimeout(() => { MostrarConfir.value = false }, 2000)
    }
    const ToggleFavorito = async (id_producto) => {
        try {
            const respuesta = await fetch(`${urlover8000}/favoritos/toggle?id_cliente=${ClienteID.value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_producto: id_producto }),
                credentials: 'include'
            })
            
            if (respuesta.status === 401) {
                await CerrarSesion()
                SesionExpirada.value = true
                Iniciado.value = false
                return
            }
            
            if (respuesta.ok) {
                const data = await respuesta.json()
                if (data.estado_favorito) {
                    MisFavoritos.value.push(id_producto)
                } else {
                    MisFavoritos.value = MisFavoritos.value.filter(id => id !== id_producto)
                }
            }
        } catch (error) {
            console.error("Error al actualizar favorito:", error)
        }
    }
</script>