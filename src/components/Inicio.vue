<template>
    <div class="cuerpo">

        <!-- Notificación -->
        <!-- Adicion al Carrito Exitosa -->
        <Teleport to="body">
            <transition name="slide">
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
        <!-- Eliminar Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Delete" 
                @click.self="Cerrar_PopUp_Delete" 
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                            ¿Desear Eliminar/Reactivar {{ Datos_Delete.nombre }}?
                        </h1>

                        <!-- Imagenes del Producto -->
                        <div>
                            <div v-if="Datos_Delete.imagenes.length > 0"
                            class="flex flex-row 
                            gap-1 md:gap-3 overflow-x-auto 
                            items-center justify-center 
                            w-full md:pb-2 snap-x pb-1"
                            >
                                <button @click="Imagen_Anterior(Datos_Delete)"
                                :disabled="Imagen_Leer(Datos_Delete.id) === 0"
                                class="botonflecha"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="Imagen_Espera[Datos_Delete.id] === false"
                                    :src="Imagen_Url(Datos_Delete.imagenes[Imagen_Leer(Datos_Delete.id)].s3_key)"
                                    @load="Imagen_Espera[Datos_Delete.id] = false"
                                    class="imagen"
                                    />
                                    <div v-if="Imagen_Espera[Datos_Delete.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif"
                                        alt="Cargando..."
                                        class="imagen !2xl:p-15"
                                        />
                                    </div>
                                </div>
                                <button @click="Imagen_Siguiente(Datos_Delete)"
                                :disabled="Imagen_Leer(Datos_Delete.id) === Datos_Delete.imagenes.length - 1"
                                class="botonflecha"
                                >
                                    ❯
                                </button>
                            </div>
                            <img v-else 
                            src="../assets/images.png" 
                            class="imagen" 
                            />
                        </div>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="Backend_Delete()" 
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
            </transition>
        </Teleport>

        <!-- Formulario -->
        <!-- Comprar Ventana -->
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
                                :disabled="Imagen_Leer(Producto_Actual.id) === 0"
                                class="carrusel-btn"
                                >
                                    ❮
                                </button>
                                <div class="carrusel-img-caja">
                                    <img v-show="Imagen_Espera[Producto_Actual.id] === false"
                                    :src="Imagen_Url(Producto_Actual.imagenes[Imagen_Leer(Producto_Actual.id)].s3_key)"
                                    @load="Imagen_Espera[Producto_Actual.id] = false"
                                    class="carrusel-img"
                                    />
                                    <div v-if="Imagen_Espera[Producto_Actual.id] !== false"
                                    class="absolute inset-0 
                                    flex items-center justify-center"
                                    >
                                        <img src="../assets/loading.gif"
                                        alt="Cargando..."
                                        class="w-12 h-12 opacity-50"
                                        />
                                    </div>
                                </div>
                                <button @click="Imagen_Siguiente(Producto_Actual)"
                                :disabled="Imagen_Leer(Producto_Actual.id) === Producto_Actual.imagenes.length - 1"
                                class="carrusel-btn"
                                >
                                    ❯
                                </button>
                            </div>
                            <div v-else 
                            class="carrusel-img-caja"
                            >
                                <img src="../assets/images.png"
                                class="carrusel-img opacity-40 grayscale"
                                />
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
                                maxlength="8"
                                class="control-input"
                                />
                                <button @click="Producto_Sumar(Producto_Actual)" 
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
                                    $ {{ Formato_Precios(Producto_Actual.precio * Producto_Cantidad) }}
                                </span>
                            </div>
                        </div>

                        <!-- Botones -->
                        <div class="botones mt-2">
                            <button @click="Frontend_Post"
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

        <!-- Formulario -->
        <!-- Actualizar Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Upgrade" 
                @click.self="Cerrar_PopUp_Upgrade" 
                class="fondo"
                >
                    <div class="popup">
                        <form @submit.prevent="Backend_Put">

                            <!-- Encabezado -->
                            <h1>
                                {{ Datos_Upgrade.nombre }}
                            </h1>

                            <!-- Datos del Producto -->
                            <div v-if="Verificar_Rol([1, 2])">
                                <h2>
                                    Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text"
                                v-model="Datos_Upgrade.nombre"
                                maxlength="50"
                                />
                            </div>
                            <div v-if="Verificar_Rol([1, 2, 4])">
                                <h2>
                                    Precio
                                </h2>
                                <input placeholder="Precio"
                                type="number"
                                v-model="Datos_Upgrade.precio"
                                maxlength="8"
                                />
                            </div>
                            <div v-if="Verificar_Rol([1, 2, 5])">
                                <h2>
                                    Stock
                                </h2>
                                <input placeholder="Stock"
                                type="number"
                                v-model="Datos_Upgrade.stock"
                                maxlength="8"
                                />
                            </div>
                            <div v-if="Verificar_Rol([1, 2])">
                                <h2>
                                    Categoria
                                </h2>
                                <select v-model="Dato_Categorias" 
                                class="seleccion"
                                >
                                    <option value="new">
                                        + Agrega una Categoria
                                    </option>
                                    <option v-for="i in Datos_Categorias"
                                    :key="i.categoria"
                                    :value="i.categoria"
                                    >
                                        {{ i.categoria }}
                                    </option>
                                </select>
                                <div v-if="Dato_Categorias === 'new'">
                                    <h3>
                                        Nueva Categoria
                                    </h3>
                                    <input placeholder="Categoria"
                                    type="text"
                                    v-model="Datos_Upgrade.categoria"
                                    maxlength="20"
                                    />
                                </div>
                                <h2>
                                    Codigo de Barras
                                </h2>
                                <input placeholder="Codigo de Barras"
                                type="text"
                                v-model="Datos_Upgrade.codigo_barra"
                                maxlength="15"
                                />
                            </div>

                            <!-- Imagenes del Producto -->
                            <div v-if="Verificar_Rol([1, 2])">
                                <h2>
                                    Imágenes actuales
                                </h2>
                                <div v-if="Datos_Upgrade.imagenes && Datos_Upgrade.imagenes.length > 0"
                                class="flex flex-row 
                                md:gap-3 gap-1 items-center 
                                justify-center w-full md:pb-2 pb-1"
                                >
                                    <button @click="Imagen_Anterior(Datos_Upgrade)"
                                    type="button"
                                    :disabled="Imagen_Leer(Datos_Upgrade.id) === 0"
                                    class="botonflecha"
                                    >
                                        ❮
                                    </button>
                                    <div class="relative w-fit mx-auto mt-2">
                                        <button @click="Imagen_Delete(Datos_Upgrade.imagenes[Imagen_Leer(Datos_Upgrade.id)])"
                                        type="button"
                                        title="Quitar imagen"
                                        class="botonx"
                                        >
                                            🗙
                                        </button>
                                        <div>
                                            <img v-show="Imagen_Espera[Datos_Upgrade.id] === false"
                                            :src="Imagen_Url(Datos_Upgrade.imagenes[Imagen_Leer(Datos_Upgrade.id)].s3_key)" 
                                            @load="Imagen_Espera[Datos_Upgrade.id] = false"
                                            :class="Datos_Delete_Imagenes.includes(Datos_Upgrade.imagenes[Imagen_Leer(Datos_Upgrade.id)].id_imagen) 
                                            ? 'imagendel' 
                                            : 'imagen'"
                                            />
                                            <div v-if="Imagen_Espera[Datos_Upgrade.id] !== false" 
                                            class="mt-2"
                                            >
                                                <img src="../assets/loading.gif"
                                                alt="Cargando..."
                                                class="imagen !2xl:p-15"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="Imagen_Siguiente(Datos_Upgrade)"
                                    type="button"
                                    :disabled="Imagen_Leer(Datos_Upgrade.id) === Datos_Upgrade.imagenes.length - 1"
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
                                    <div v-if="Producto_Imagenes_Previa.length > 0" 
                                    class="relative w-fit mx-auto mt-2"
                                    >
                                        <div v-for="(img, index) in Producto_Imagenes_Previa"
                                        :key="index"
                                        class="shrink-0 mt-2 relative"
                                        >
                                            <button @click="Imagen_Limpiar"
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
                                        <input @change="Imagen_Seleccionar"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        class="imagenu !w-full"
                                        ref="Imagen_New"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Botones -->
                            <div class="botones">
                                <button :disabled="Verificar_Boton || Actualizando"
                                type="submit"
                                class="botoncon"
                                >
                                    {{ Actualizando ? "Actualizando..." : "Actualizar" }}
                                </button>
                                <button @click="Cerrar_PopUp_Upgrade" 
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

        <!-- Formulario -->
        <!-- Actualizar Banner -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Banner" 
                @click.self="Cerrar_PopUp_Banner" 
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1 class="text-center">
                            Banners:
                        </h1>

                        <!-- Subir Banners -->
                        <div>
                            <h1>
                                Nuevos Banners
                            </h1>
                            <div class="md:mt-4 mt-2">
                                <input @change="Banner_Seleccionar"
                                type="file"
                                accept="image/*"
                                multiple
                                class="imagenu !w-full"
                                ref="Imagen_New"
                                />
                            </div>
                        </div>

                        <!-- Actualizar Banners -->
                        <div>
                            <h1>
                                Actualizar Banners
                            </h1>
                            <div v-if="Orden_Banner.length > 0"
                            class="relative flex flex-row overflow-x-auto gap-4"
                            >
                                <div v-for="(banner, index) in Orden_Banner"
                                :key="banner.id || banner.vista_previa"
                                :class="Filtro_Banner_Estatus_0(banner) ? 'cartabannerdel' : 'cartabanner'"
                                draggable="true"
                                @dragstart="Toque_Drag(index)"
                                @dragover.prevent
                                @drop="Toque_Drop(index)"
                                >
                                    <template v-if="banner.id">
                                        <div class="botones">
                                            <button @click="Filtro_Banner_Estatus_1(banner.id)"
                                            v-if="!Filtro_Banner_Estatus_0(banner)"
                                            type="button"
                                            title="Desactivar"
                                            class="botonc"
                                            >
                                                🗙
                                            </button>
                                            <button v-else
                                            @click="Filtro_Banner_Estatus_1(banner.id)"
                                            type="button"
                                            title="Restaurar"
                                            class="botoncon"
                                            >
                                                🐦‍🔥
                                            </button>
                                        </div>
                                        <div v-if="Filtro_Banner_Estatus_0(banner)">
                                            <button @click="Banner_Delete_Supabase.push(banner.id)"
                                            v-if="!Banner_Delete_Supabase.includes(banner.id)"
                                            type="button"
                                            title="Quitar imagen"
                                            class="botonx"
                                            >
                                                🗑️
                                            </button>
                                            <button v-else
                                            @click="Banner_Delete_Supabase = Banner_Delete_Supabase.filter((id) => id !== banner.id)"
                                            type="button"
                                            title="Restaurar imagen"
                                            class="botonx"
                                            >
                                                🕊️
                                            </button>
                                        </div>
                                        <div class="banner-wrapper">
                                            <img :src="Imagen_Url(banner.s3_key)"
                                            :class="Banner_Delete_Supabase.includes(banner.id) 
                                            ? 'imagendel' 
                                            : 'imagen'"
                                            />
                                            <div v-if="Filtro_Banner_Estatus_0(banner)" 
                                            class="banner-overlay"
                                            >
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <h1>
                                            Nuevo!
                                        </h1>
                                        <button @click="Datos_New.splice(Datos_New.indexOf(banner), 1)"
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
                                    />
                                </div>
                            </div>
                            <div v-else class="imageno">
                                Sin imágenes
                            </div>
                        </div>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="Backend_Post_Banner" 
                            class="botoncon"
                            >
                                Guardar Cambios
                            </button>
                            <button @click="Cerrar_PopUp_Banner" 
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
        <!-- Promocionar Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Off" 
                @click.self="Cerrar_PopUp_Off" 
                class="fondo"
                >
                    <div class="popup !max-w-md">
                        <form @submit.prevent="Backend_Post_Promocion" 
                        class="flex flex-col gap-4"
                        >

                            <!-- Encabezado -->
                            <h1 class="text-center !text-xl !mb-2">
                                🏷️ Oferta: {{ Datos_Off.nombre }}
                            </h1>

                            <!-- Imagenes del Producto -->
                            <div class="bg-gray-50 rounded-xl 
                            p-2 shadow-inner 
                            mx-auto w-full max-w-[200px]"
                            >
                                <div v-if="Datos_Off.imagenes.length > 0"
                                class="flex flex-row gap-2 
                                overflow-x-auto items-center 
                                justify-between w-full snap-x"
                                >
                                    <button type="button"
                                    @click="Imagen_Anterior(Datos_Off)"
                                    :disabled="Imagen_Leer(Datos_Off.id) === 0"
                                    class="botonflecha !p-1 !h-8 !w-8 shrink-0"
                                    >
                                        ❮
                                    </button>
                                    <div class="shrink-0 flex justify-center
                                    w-24 h-24 relative 
                                    rounded-lg overflow-hidden 
                                    border-2 border-white shadow-sm"
                                    >
                                        <img v-show="Imagen_Espera[Datos_Off.id] === false"
                                        :src="Imagen_Url(Datos_Off.imagenes[Imagen_Leer(Datos_Off.id)].s3_key)"
                                        @load="Imagen_Espera[Datos_Off.id] = false"
                                        class="w-full h-full object-cover"
                                        />
                                        <div v-if="Imagen_Espera[Datos_Off.id] !== false"
                                        class="absolute inset-0 flex items-center justify-center bg-gray-100"
                                        >
                                            <img src="../assets/loading.gif"
                                            alt="Cargando..."
                                            class="w-8 h-8 opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <button type="button"
                                    @click="Imagen_Siguiente(Datos_Off)"
                                    :disabled="
                                    Imagen_Leer(Datos_Off.id) === Datos_Off.imagenes.length - 1"
                                    class="botonflecha !p-1 !h-8 !w-8 shrink-0"
                                    >
                                        ❯
                                    </button>
                                </div>
                                <img
                                v-else
                                src="../assets/images.png"
                                class="w-24 h-24 object-cover mx-auto rounded-lg shadow-sm"
                                />
                            </div>

                            <!-- Datos de la Promocion -->
                            <div class="flex flex-col gap-3">
                                <div>
                                    <h2 class="text-sm font-bold 
                                    text-gray-600 ml-1 mb-1"
                                    >
                                        Nombre (Opcional)
                                    </h2>
                                    <input placeholder="Ej: Cyber Monday..."
                                    type="text"
                                    v-model="Datos_Offf.motivo"
                                    maxlength="100"
                                    class="w-full px-4 py-2 
                                    border-2 border-green-200 rounded-xl 
                                    focus:border-green-500 focus:outline-none 
                                    transition-colors"
                                    />
                                </div>
                                <div>
                                    <h2 class="text-sm font-bold text-gray-600 
                                    ml-1 mb-1"
                                    >
                                        Precio de Oferta
                                    </h2>
                                    <div class="relative">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 
                                        text-gray-500 font-bold"
                                        >
                                            $
                                        </span>
                                        <input placeholder="Nuevo Precio"
                                        type="number"
                                        v-model="Datos_Offf.precio_nuevo"
                                        maxlength="8"
                                        required
                                        class="w-full pl-8 pr-4 py-2 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <h2 class="text-sm font-bold text-gray-600 
                                        ml-1 mb-1"
                                        >
                                            Inicio
                                        </h2>
                                        <input type="datetime-local"
                                        v-model="Datos_Offf.fecha_inicio"
                                        required
                                        class="w-full px-3 py-2 
                                        border-2 border-green-200 rounded-xl 
                                        text-sm focus:border-green-500 
                                        focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <h2 class="text-sm font-bold text-gray-600 
                                        ml-1 mb-1"
                                        >
                                            Fin
                                        </h2>
                                        <input type="datetime-local"
                                        v-model="Datos_Offf.fecha_fin"
                                        required
                                        class="w-full px-3 py-2 
                                        border-2 border-green-200 rounded-xl 
                                        text-sm focus:border-green-500 
                                        focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Botones -->
                            <div class="flex flex-row justify-center 
                            gap-2 mt-2 pt-4 
                            border-t-2 border-gray-100"
                            >
                                <button type="submit"
                                class="botoncon flex-1 !m-0"
                                :disabled="Actualizando"
                                >
                                    {{ Datos_Offf.id_promocion ? "Actualizar" : "Guardar" }}
                                </button>
                                <button type="button"
                                v-if="Datos_Offf.id_promocion"
                                @click="Backend_Delete_Promocion"
                                class="botonc flex-1 !m-0"
                                :disabled="Actualizando"
                                >
                                    🗑️ Borrar
                                </button>
                                <button @click="Cerrar_PopUp_Off" 
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

        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">

                <!-- Pagina de Inicio -->
                <div class="start">
                    
                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera"
                    class="flex flex-col items-center 
                    justify-center w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif"
                        alt="Cargando catálogo..."
                        class="w-32 h-32 object-contain mb-4"
                        />
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                            Cargando catálogo, un momento...
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
                            <button
                            @click="Backend_Cargar()"
                            class="botoncon !flex-none !w-auto 
                            px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Recargar Página
                            </button>
                        </div>
                    </div>

                    <!-- Pagina de Inicio -->
                    <div v-else>

                        <!-- Barra de Busqueda -->
                        <div class="px-5">
                            <input placeholder="🔍 Busqueda..."
                            @input="Backend_Get"
                            type="text"
                            v-model="Busqueda"
                            class="busqueda"
                            maxlength="50"
                            />
                        </div>

                        <!-- Banner Encabezado -->
                        <div v-if="Datos_Banner"
                        class="flex flex-col 
                        relative group w-full 
                        overflow-hidden rounded-xl"
                        >
                            <div
                            v-if="Datos_Banner.imagenes && Datos_Banner.imagenes.length > 0"
                            class="relative px-5"
                            @touchstart="Toque_Start($event)"
                            @touchend="Toque_End($event, Datos_Banner)"
                            >
                                <button @click="Banner_Indice--"
                                :disabled="Banner_Indice === 0"
                                type="button"
                                class="botonflechagrande absolute left-0 top-0 z-20 opacity-0 hidden md:flex group-hover:opacity-100"
                                >
                                    ❮
                                </button>
                                <button @click="Abrir_PopUp_Banner"
                                v-if="Verificar_Rol([1])"
                                type="button"
                                class="botonx !right-20 !bg-gray-700"
                                >
                                    ✏️
                                </button>
                                <div>
                                    <img @click="router.push(`/${Datos_Banner.imagenes[Banner_Indice].enlace}`)"
                                    @load="Imagen_Espera[Datos_Banner.id] = false"
                                    v-show="Imagen_Espera[Datos_Banner.id] === false"
                                    :src="Imagen_Url(Datos_Banner.imagenes[Banner_Indice].s3_key)"
                                    class="banner"
                                    />
                                    <div v-if="Imagen_Espera[Datos_Banner.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="banner" 
                                        />
                                    </div>
                                </div>
                                <button @click="Banner_Indice++"
                                :disabled="Banner_Indice === Datos_Banner.imagenes.length - 1"
                                type="button"
                                class="botonflechagrande absolute 
                                right-0 top-0 z-20 opacity-0 
                                hidden md:flex group-hover:opacity-100"
                                >
                                    ❯
                                </button>
                            </div>
                        </div>

                        <!-- Lista de Productos por Categoria -->
                        <div v-for="cat in Datos_Categorias" 
                        :key="cat.categoria"
                        >
                            <div v-if="Datos_Productos_Categoria[cat.categoria] && Datos_Productos_Categoria[cat.categoria].length > 0"
                            class="relative group flex flex-col 
                            md:mb-8 mb-2 
                            bg-gradient-to-tr from-green-600/50 
                            to-green-300/50 rounded-2xl"
                            >

                                <!-- Encabezado -->
                                <h1 class="text-3xl font-extrabold 
                                text-green-900 md:mb-2 mb-0 drop-shadow-sm"
                                >
                                    {{ cat.categoria }}
                                </h1>

                                <!-- Carrusel de Productos -->
                                <div :id="'carrusel-' + cat.categoria"
                                class="flex flex-row 
                                w-full overflow-x-auto 
                                md:overflow-hidden 
                                md:py-4 py-2 scroll-smooth gap-5"
                                >
                                    <button @click="Carrusel_Anterior(cat.categoria)"
                                    :disabled="Carrusel_Get_Indice(cat.categoria) === 0"
                                    class="botonflechacatr absolute left-0 top-[55%] hidden md:flex opacity-0 group-hover:opacity-100"
                                    >
                                        ❮
                                    </button>
                                    <div v-for="i in Datos_Productos_Categoria[cat.categoria]"
                                    :key="cat.categoria + '-' + i.id"
                                    :class="Estatus_Color(i.activo)"
                                    @click="Click_Items(i)"
                                    class="carta relative"
                                    >
                                        <div>

                                            <!-- MMotivo de Promocion -->
                                            <div v-if="i.es_promocion" 
                                            class="absolute top-2 left-2 
                                            z-10 bg-red-500 text-white 
                                            text-xs font-black px-2 py-1 
                                            rounded-md shadow-md"
                                            >
                                                🔥 {{ i.motivo || 'OFERTA' }}
                                            </div>

                                            <!-- Imagenes del Producto -->
                                            <div v-if="i.imagenes.length > 0"
                                            class="flex flex-row 
                                            2xl:gap-3 gap-1 
                                            items-center justify-center 
                                            w-full md:pb-2 pb-1 snap-x"
                                            >
                                                <img v-show="Imagen_Espera[i.id] === false"
                                                :src="Imagen_Url(i.imagenes[Imagen_Leer(i.id)].s3_key)"
                                                @load="Imagen_Espera[i.id] = false"
                                                class="imagen"
                                                />
                                                <div v-if="Imagen_Espera[i.id] !== false" 
                                                class="mt-2"
                                                >
                                                    <img src="../assets/loading.gif"
                                                    alt="Cargando...."
                                                    class="imagen !p-15"
                                                    />
                                                </div>
                                            </div>
                                            <img v-else 
                                            src="../assets/images.png" 
                                            class="imagen" 
                                            />

                                            <!-- Datos del Producto -->
                                            <div>
                                                <h2 class="font-bold">
                                                    {{ i.nombre }}
                                                </h2>
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
                                                <div v-if="Verificar_Rol([1, 2, 4, 5])">
                                                    <h3>
                                                        {{ i.codigo_barra }}
                                                        <br />
                                                        Stock:
                                                        {{ i.stock }}
                                                    </h3>
                                                </div>

                                                <!-- Botones -->
                                                <div class="flex flex-row lg:flex-col justify-center">
                                                    <div class="flex flex-wrap 
                                                    w-full mt-auto justify-center items-center 
                                                    pt-3 gap-1.5 sm:gap-2">
                                                        <button @click.stop="Abrir_PopUp_Act(i)"
                                                        v-if="Verificar_Rol([1, 2, 4, 5])"
                                                        class="botont !px-2 !py-2 !text-sm"
                                                        >
                                                            ✏️
                                                            <span class="hidden xl:inline ml-1 truncate"> 
                                                                Editar 
                                                            </span>
                                                        </button>
                                                        <button @click.stop="Abrir_PopUp_Off(i)"
                                                        v-if="Verificar_Rol([1, 2, 3])"
                                                        class="botont !bg-blue-50 !border-blue-200 !text-blue-700 hover:!bg-blue-100 !px-2 !py-2 !text-sm"
                                                        >
                                                            🏷️
                                                            <span class="hidden xl:inline ml-1 truncate">
                                                                Promoción
                                                            </span>
                                                        </button>
                                                        <button @click.stop="Abrir_PopUp_Delete(i)"
                                                        v-if="Verificar_Rol([1, 2]) && i.activo"
                                                        class="botonc !px-2 !py-2 !text-sm"
                                                        >
                                                            ❌
                                                            <span class="hidden xl:inline ml-1 truncate">
                                                                Eliminar
                                                            </span>
                                                        </button>
                                                        <button @click.stop="Abrir_PopUp_Delete(i)"
                                                        v-if="Verificar_Rol([1, 2]) && !i.activo"
                                                        class="botoncon !px-2 !py-2 !text-sm"
                                                        >
                                                            🕊️
                                                            <span class="hidden xl:inline ml-1 truncate">
                                                                Reactivar
                                                            </span>
                                                        </button>
                                                        <button @click.stop="Abrir_PopUp_Buy(i)"
                                                        :disabled="Verificar_Stock(i) === 0"
                                                        v-if="Verificar_Rol_Excluido([2, 3, 4, 5, 6])"
                                                        class="botoncon !px-2 !py-2 !text-sm"
                                                        >
                                                            🛍️
                                                            <span class="hidden xl:inline ml-1 truncate">
                                                                Comprar
                                                            </span>
                                                        </button>
                                                        <button @click.stop="Backend_Post_Delete_Favorito(i.id)"
                                                        v-if="Cliente_ID"
                                                        :class="Formato_Items 
                                                        ? 'btn-chico-rojo w-full justify-center' 
                                                        : [Verificar_Rol([1, 2]) ? 'col-span-2' : '', 'botonc !px-2 !py-2 !text-sm']"
                                                        >
                                                            {{ Datos_Favoritos.includes(i.id) ? '🤍 Quitar de Favoritos' : '❤️ Agregar a Favoritos' }}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <button @click="Carrusel_Siguiente(cat.categoria, Datos_Productos_Categoria[cat.categoria].length)"
                                    class="botonflechacatl 
                                    absolute right-0 top-[55%] hidden 
                                    md:flex opacity-0 group-hover:opacity-100"
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
        Carrito_Local,
        Cerrar_Sesion,
        PopUp_Upgrade,
        PopUp_Delete,
        PopUp_Off,
        PopUp_Buy,
        Producto_Actual,
        Producto_Cantidad,
        Pedido_Actual as Datos_Pedido,
        Leer_Cookie,
        Cliente_ID,
        backend_url,
        Cargar_Carrito,
        Iniciado,
        Sesion_Expirada,
        Validad_Sesion_Backend,
        Verificar_Rol,
        Verificar_Rol_Excluido,
    } from "./Estatus.js"
    import { 
        onMounted, 
        onUnmounted, 
        toRefs, 
        ref, 
        watch, 
        computed 
    } from "vue"
    import { supabase } from "../config/supabase.js"
    import { useRouter } from "vue-router"

    // ----- Variables Complejas ----- //

    // Almacen para Actualizar Productos //
    const Datos_Upgrade = ref({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        codigo_barra: "",
        imagenes: [],
    })
    // Almacen para Eliminar Productos //
    const Datos_Delete = ref({
        id: "",
        nombre: "",
        imagenes: [],
    })
    // Almacen para Promocionar Productos //
    const Datos_Off = ref({
        id: "",
        nombre: "",
        imagenes: [],
    })
    // Almacen para Promociones //
    const Datos_Offf = ref({
        motivo: "",
        precio_nuevo: "",
        fecha_inicio: "",
        fecha_fin: "",
    })
    // Llamar Funcion Router //
    const router = useRouter()
    // Leer Url/Link y Tamaño de Imagen //
    const emit = defineEmits(["upload", "update:path"])
    // Definir Url/Link y Tamaño de Imagen //
    const prop = defineProps(["path", "size"])
    // Asignar Url/Link y Tamaño de Imagen //
    const { path } = toRefs(prop)

    // ----- Variables Booleanas ----- //

    const PopUp_Banner = ref(false)
    const Mostrar_Confirmacion = ref(false)
    const Actualizando = ref(false)
    const Backend_Espera = ref(true)
    const Backend_Error = ref(false)

    // ----- Variables Vacias ----- //

    const Imagen_Espera = ref({})
    const Datos_Categorias = ref("")
    const Indice_Carrusel = ref({})
    const Datos_New = ref([])
    const Datos_Favoritos = ref([])
    const Producto_Imagenes_Previa = ref([])
    const Producto_Imagenes_Seleccion = ref([])
    const Banner_Delete_Supabase = ref([])
    const Imagen_Indice = ref({})
    const Productos = ref([])
    const Imagen_New = ref("")
    const Busqueda = ref("")
    const Banner_Delete = ref([])
    const Datos_Delete_Imagenes = ref([])

    // ----- Variables Simples ----- //

    const Dato_Categorias = ref("new")
    const Banner_Upgrade = ref(null)
    const Datos_Banner = ref(null)
    const Banner_Indice = ref(0)

    // ----- Variables Temporales ----- //

    let Carrusel_Espera = null
    let Banner_Picked = null
    let Cordenada_X = 0
    let Cordenada_Y = 0

    // ----- Variables Vue ----- //

    // Leer Banners en Orden //
    const Orden_Banner = computed({
        // Establecer Orden
        get() {
            const viejo = Banner_Upgrade.value && Banner_Upgrade.value.imagenes ? Banner_Upgrade.value.imagenes : []
            const nuevo = Datos_New.value
            const todo = [...viejo, ...nuevo]
            return todo.sort((a, b) => {
                const Banner_Desactivado_A = Filtro_Banner_Estatus_0(a)
                const Banner_Desactivado_B = Filtro_Banner_Estatus_0(b)
                if (Banner_Desactivado_A && !Banner_Desactivado_B) return 1
                if (Banner_Desactivado_B && !Banner_Desactivado_A) return -1
                const Orden_Banner_A = a.orden || 0
                const Orden_Banner_B = b.orden || 0
                return Orden_Banner_A - Orden_Banner_B
            })
        },
        // Enviar Orden
        set(Orden_Bannerados) {
            Orden_Bannerados.forEach((banner, index) => {
            banner.orden = index + 1
    })},})
    // Habilitar Boton //
    const Verificar_Boton = computed(() => {
        // Actualizar Producto
        if (PopUp_Upgrade.value) {
            const Datos_Upgrade_Faltantes =
            Datos_Upgrade.value.nombre === "" ||
            Datos_Upgrade.value.precio === "" ||
            Datos_Upgrade.value.stock === "" ||
            Datos_Upgrade.value.codigo_barra === "" ||
            Datos_Upgrade.value.stock < 0 ||
            Datos_Upgrade.value.precio <= 0
            const Dato_Categorias_Faltantes =
            Dato_Categorias.value === "new" && Datos_Upgrade.value.categoria === ""
            return Datos_Upgrade_Faltantes || Dato_Categorias_Faltantes
    }})
    // Establecer Categorias para la Pagina //
    const Datos_Productos_Categoria = computed(() => {
        const Categorias_Grupos = {}
        if (Datos_Categorias.value && Productos.value) {
                Datos_Categorias.value.forEach((cat) => {
                    Categorias_Grupos[cat.categoria] = Productos.value.filter(
                        (p) => p.categoria === cat.categoria
        )})}
        return Categorias_Grupos
    })

    // ----- Funciones Vue ----- //

    // Primera Carga de Datos de la Pagina //
    onMounted(() => {
        Backend_Cargar()
    })
    // Temporizador del Carrusel del Banner //
    onUnmounted(() => {
        if (Carrusel_Espera) clearInterval(Carrusel_Espera)
    })
    // Verificacion de Stock > 0 //
    watch(Producto_Cantidad, (NuevaCantidad) => {
        let CantidadnCarrito = 0
        if (Producto_Actual.value) {
            Carrito_Local.value.forEach((prod) => {
                if (prod.id_producto === Producto_Actual.value.id) {
                    CantidadnCarrito = CantidadnCarrito + prod.cantidad
            }})
            const Stock_Local = Producto_Actual.value.stock - CantidadnCarrito
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
    const Backend_Cargar = async () => {
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        // Leer Banners, Productos, Categorias y Favoritos
        try {
            await Validad_Sesion_Backend()
            await Backend_Get_Banner()
            await Backend_Get()
            if (Verificar_Rol([1])) {
                await Backend_Get_Banners()
            }
            const respuesta = await fetch(`${backend_url}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true",
                },
                credentials: "include",
            })
            if (!respuesta.ok) throw new Error("Error de conexión con el servidor")
            const Dato_Categoria = await respuesta.json()
            // Orden de las Categorias
            const Orden_Deseado = [
                "Accesorios",
                "Hardware",
                "Periféricos",
                "Audio",
                "Hogar y Deco.",
                "Indumentaria",
                "SimRacing",
                "Varios...",
            ]
            Dato_Categoria.sort((a, b) => {
                let Orden_Index_A = Orden_Deseado.indexOf(a.categoria)
                let Orden_Index_B = Orden_Deseado.indexOf(b.categoria)
                if (Orden_Index_A === -1) Orden_Index_A = 999
                if (Orden_Index_B === -1) Orden_Index_B = 999
                return Orden_Index_A - Orden_Index_B
            })
            Datos_Categorias.value = Dato_Categoria
            if (Cliente_ID.value) {
                const Dato_Favorito = await fetch(`${backend_url}/favoritos/cliente/${Cliente_ID.value}`, {
                    credentials: "include",
                })
                if (Dato_Favorito.ok) {
                    Datos_Favoritos.value = await Dato_Favorito.json()
                }
            }
            Cargar_Carrito()
            Carrusel_Automatico()
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
    }}}
    // Iniciar Carrusel del Banner //
    const Carrusel_Automatico = () => {
        Carrusel_Espera = setInterval(() => {
            if (Datos_Banner.value && Datos_Banner.value.imagenes) {
                if (Banner_Indice.value < Datos_Banner.value.imagenes.length - 1) {
                    Banner_Indice.value++
                } else {
                    Banner_Indice.value = 0
    // Tiempo de Carrusel en Segundos
    }}}, 4000)}

// ----- Para el Frontend ----- //

    // Abrir Pop up para Actualizar Producto //
    const Abrir_PopUp_Act = (producto_fila) => {
        Datos_Upgrade.value.id = producto_fila.id
        Datos_Upgrade.value.nombre = producto_fila.nombre
        Datos_Upgrade.value.precio = producto_fila.precio
        Datos_Upgrade.value.stock = producto_fila.stock
        Dato_Categorias.value = producto_fila.categoria
        Datos_Upgrade.value.codigo_barra = producto_fila.codigo_barra
        Datos_Upgrade.value.imagenes = producto_fila.imagenes
        Datos_Delete_Imagenes.value = []
        Producto_Imagenes_Previa.value = []
        PopUp_Upgrade.value = true
        document.body.style.overflow = "hidden"
    }
    // Abrir Pop up para Borrar Producto //
    const Abrir_PopUp_Delete = (producto_fila) => {
        Datos_Delete.value.id = producto_fila.id
        Datos_Delete.value.nombre = producto_fila.nombre
        Datos_Delete.value.imagenes = producto_fila.imagenes
        PopUp_Delete.value = true
        document.body.style.overflow = "hidden"
        setTimeout(() => {
            Datos_Delete.value = {
                id: "",
                nombre: "",
                imagenes: [],
            }
            Imagen_Indice.value = {}
    }, 300)}
    // Abrir Pop up para Actualizar el Banner //
    const Abrir_PopUp_Banner = () => {
        PopUp_Banner.value = true
        document.body.style.overflow = "hidden"
    }
    // Abrir Pop up para Añadir el Carrito //
    const Abrir_PopUp_Buy = (producto_fila) => {
        if (Verificar_Stock(producto_fila) <= 0) {
            return
        }
        Producto_Actual.value = producto_fila
        Producto_Cantidad.value = 1
        PopUp_Buy.value = true
        document.body.style.overflow = "hidden"
    }
    // Abrir Pop up para Promocion (Lee Precios) //
    const Abrir_PopUp_Off = async (producto_fila) => {
        Datos_Off.value.id = producto_fila.id
        Datos_Off.value.nombre = producto_fila.nombre
        Datos_Off.value.imagenes = producto_fila.imagenes
        Datos_Offf.value = {
            id_promocion: null,
            motivo: "",
            precio_nuevo: "",
            fecha_inicio: "",
            fecha_fin: "",
        }
        // Leer Precios
        try {
            const respuesta = await fetch(`${backend_url}/registro_precios/`, {
                headers: { "X-Tunnel-Skip-AntiPhishing-Page": "true" },
                credentials: "include",
            })
            if (respuesta.ok) {
                const Datos_Registros = await respuesta.json()
                const Datos_Promociones = Datos_Registros.find((p) => p.id_producto === producto_fila.id)
                if (Datos_Promociones) {
                    Datos_Offf.value = {
                    id_promocion: Datos_Promociones.id,
                    motivo: Datos_Promociones.motivo || "",
                    precio_nuevo: Datos_Promociones.precio_nuevo,
                    fecha_inicio: new Date(Datos_Promociones.fecha_inicio).toISOString().slice(0, 16),
                    fecha_fin: new Date(Datos_Promociones.fecha_fin).toISOString().slice(0, 16),
        }}}} catch (error) {
            console.error("Error buscando promo existente:", error)
        }
        PopUp_Off.value = true
        document.body.style.overflow = "hidden"
    }
    // Establecer Accion al Tocar el Tab //
    const Click_Items = (producto_fila) => {
        if (Verificar_Rol([1, 2, 3, 4, 5, 6])) {
            Abrir_PopUp_Act(producto_fila)
        } else {
            Abrir_PopUp_Buy(producto_fila)
    }}
    // Leer Imagen Anterior //
    const Imagen_Anterior = (imagen) => {
        const Imagen_Actual = Imagen_Leer(imagen.id)
        if (Imagen_Actual > 0) {
            Imagen_Indice.value[imagen.id] = Imagen_Actual - 1
            Imagen_Espera.value[imagen.id] = true
    }}
    // Filtrar Banners Desactivados //
    const Filtro_Banner_Estatus_0 = (banner) => {
        if (!banner.id) return false
        if (banner.activo === true) return Banner_Delete.value.includes(banner.id)
        return !Banner_Delete.value.includes(banner.id)
    }
    // Filtrar Banners Activados //
    const Filtro_Banner_Estatus_1 = (id) => {
        if (Banner_Delete.value.includes(id)) {
            Banner_Delete.value = Banner_Delete.value.filter((b) => b !== id)
            Banner_Delete_Supabase.value = Banner_Delete_Supabase.value.filter((b) => b !== id)
        } else {
            Banner_Delete.value.push(id)
    }}
    // Siguiente Banner //
    const Carrusel_Siguiente = (categoria, totalProductos) => {
        const Banner_Actual = Carrusel_Get_Indice(categoria)
        if (Banner_Actual < totalProductos - 1) {
            Indice_Carrusel.value[categoria] = Banner_Actual + 1
            const Carrusel = document.getElementById("carrusel-" + categoria)
            if (Carrusel) {
                Carrusel.scrollBy({ left: 1000, behavior: "smooth" })
    }}}
    // Banner Anterior //
    const Carrusel_Anterior = (categoria) => {
        const Banner_Actual = Carrusel_Get_Indice(categoria)
        if (Banner_Actual > 0) {
            Indice_Carrusel.value[categoria] = Banner_Actual - 1
            const Carrusel = document.getElementById("carrusel-" + categoria)
            if (Carrusel) {
                Carrusel.scrollBy({ 
                    left: -1000,
                    behavior: "smooth" 
    })}}}
    // Cerrar Pop up para Actualizar Producto //
    const Cerrar_PopUp_Upgrade = () => {
        PopUp_Upgrade.value = false
        Datos_Delete_Imagenes.value = []
        Imagen_Limpiar()
        document.body.style.overflow = "auto"
    }
    // Cerrar Pop up para Borrar Producto //
    const Cerrar_PopUp_Delete = () => {
        PopUp_Delete.value = false
        document.body.style.overflow = "auto"
    }
    // Cerrar Pop up para Actualizar el Banner //
    const Cerrar_PopUp_Banner = () => {
        PopUp_Banner.value = false
        Banner_Delete.value = []
        Banner_Delete_Supabase.value = []
        document.body.style.overflow = "auto"
    }
    // Cerrar Pop up para Añadir el Carrito //
    const Cerrar_PopUp_Buy = () => {
        PopUp_Buy.value = false
        Producto_Actual.value = null
        Producto_Cantidad.value = 1
        document.body.style.overflow = "auto"
    }
    // Cerrar Pop up para Promocion //
    const Cerrar_PopUp_Off = () => {
        PopUp_Off.value = false
        document.body.style.overflow = "auto"
    }
    // Inicio del Toque de Imagen en Celular //
    const Toque_Start = (evento) => {
        Cordenada_X = evento.changedTouches[0].clientX
        Cordenada_Y = evento.changedTouches[0].clientY
    }
    // Inicio del Arrastre de Imagen en Celular //
    const Toque_Drag = (index) => {
        Banner_Picked = index
    }
    // Establecer Color de Carta de Producto (Depende del Estatus) //
    const Estatus_Color = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        } else if (id_estatus === false) {
            return "no"
    }}
    // Fin del Toque de Imagen en Celular //
    const Toque_End = (evento, producto) => {
        if (!producto) return
        const Cordenada_X_End = evento.changedTouches[0].clientX
        const Cordenada_Y_End = evento.changedTouches[0].clientY
        const Distancia_X = Cordenada_X - Cordenada_X_End
        const Distancia_Y = Math.abs(Cordenada_Y - Cordenada_Y_End)
        if (Distancia_Y > Math.abs(Distancia_X)) {
            Cordenada_X = 0
            Cordenada_Y = 0
            return
        }
        if (Math.abs(Distancia_X) < 50) {
            Cordenada_X = 0
            Cordenada_Y = 0
            return
        }
        if (Math.abs(Distancia_X) < 50) {
            Cordenada_X = 0
            return
        }
        if (Distancia_X > 0) {
            Imagen_Siguiente(producto)
        } else {
            Imagen_Anterior(producto)
        }
        Cordenada_X = 0
        Cordenada_Y = 0
    }
    // Leer Precio con Formato Pesos Argentinos //
    const Formato_Precios = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat("es-AR").format(precio)
    }
    // Leer Imagen //
    const Imagen_Leer = (id) => {
        return Imagen_Indice.value[id] || 0
    }
    // Limpiar Imagenes sin Subir en Vista Previa //
    const Imagen_Limpiar = () => {
        Producto_Imagenes_Previa.value = []
        Producto_Imagenes_Seleccion.value = []
        if (Imagen_New.value) {
            Imagen_New.value.value = ""
    }}
    // Leer Imagen Siguiente //
    const Imagen_Siguiente = (imagen) => {
        const Imagen_Actual = Imagen_Leer(imagen.id)
        if (Imagen_Actual < imagen.imagenes.length - 1) {
            Imagen_Indice.value[imagen.id] = Imagen_Actual + 1
            Imagen_Espera.value[imagen.id] = true
    }}
    // Quitar Imagen de Producto //
    const Imagen_Delete = (img) => {
        const index = Datos_Delete_Imagenes.value.indexOf(img.id_imagen)
        if (index === -1) {
            Datos_Delete_Imagenes.value.push(img.id_imagen)
        } else {
            Datos_Delete_Imagenes.value.splice(index, 1)
        }
        Imagen_Indice.value[Datos_Upgrade.value.id] = 0
    }
    // Obtener Url/Link de Imagen //
    const Imagen_Url = (Imgenkey) => {
        const respuesta = supabase.storage.from("max_imagenes").getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    // Leer que Banner Mostrar //
    const Carrusel_Get_Indice = (categoria) => {
        const ind = Indice_Carrusel.value[categoria]
        return ind || 0
    }
    // Restar Cantidad de Producto //
    const Producto_Restar = () => {
        if (Producto_Cantidad.value > 1) {
            Producto_Cantidad.value--
    }}
    // Subir Imagen de Producto //
    const Imagen_Seleccionar = (evt) => {
        const files = evt.target.files
        if (files) {
            for (let i = 0 ; i < files.length ; i++) {
            Producto_Imagenes_Seleccion.value.push(files[i])
            Producto_Imagenes_Previa.value.push(URL.createObjectURL(files[i]))
    }}}
    // Subir Imagen de Banner //
    const Banner_Seleccionar = (evt) => {
        const files = evt.target.files
        if (files) {
            let Orden_Maximo = 0
            if (Datos_Banner.value && Datos_Banner.value.imagenes) {
                Datos_Banner.value.imagenes.forEach((b) => {
                    if (b.orden && b.orden > Orden_Maximo) {
                    Orden_Maximo = b.orden
            }})}
            let Orden_Minimo = 0
            if (Datos_New.value.length > 0) {
                Datos_New.value.forEach((b) => {
                    if (b.orden && b.orden > Orden_Minimo) {
                    Orden_Minimo = b.orden
            }})}
            let Orden_Next = Math.max(Orden_Maximo, Orden_Minimo) + 1
            for (let i = 0 ; i < files.length ; i++) {
                const Banner_New = {
                    imagen: files[i],
                    vista_previa: URL.createObjectURL(files[i]),
                    enlace: "",
                    orden: Orden_Next,
                }
                Datos_New.value.push(Banner_New)
                Orden_Next++
    }}}
    // Mover Orden de Imagen de Banner //
    const Toque_Drop = (cartasoltada) => {
        if (Banner_Picked === null || Banner_Picked === cartasoltada) return
        const Orden_New_Banner = [...Orden_Banner.value]
        const Banner_Moved = Orden_New_Banner.splice(Banner_Picked, 1)[0]
        Orden_New_Banner.splice(cartasoltada, 0, Banner_Moved)
        Orden_Banner.value = Orden_New_Banner
        Banner_Picked = null
    }
    // Sumar Cantidad de Producto //
    const Producto_Sumar = () => {
        if (Producto_Actual.value && Producto_Cantidad.value < Producto_Actual.value.stock) {
            Producto_Cantidad.value++
    }}

    // ----- Para el Backend ----- //

    // Actualizar Datos del Banner //
    const Backend_Put_Banner = async () => {
        if (!Banner_Upgrade.value) return
        for (const Dato_Banner of Banner_Upgrade.value.imagenes) {
            if (Filtro_Banner_Estatus_0(Dato_Banner)) continue
            const Dato_Upgrade_Banner = {
                enlace: Dato_Banner.enlace,
                orden: Dato_Banner.orden,
            }
            const PutBackend_Banner = await fetch(`${backend_url}/banners/id/${Dato_Banner.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Dato_Upgrade_Banner),
                credentials: "include",
            })
            if (PutBackend_Banner.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
    }}}
    // Actualizar Datos del Producto //
    const Backend_Put = async () => {
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            if (Dato_Categorias.value != "new") {
                Datos_Upgrade.value.categoria = Dato_Categorias.value
            }
            const Dato_Upgrade = {
                nombre: Datos_Upgrade.value.nombre,
                precio: Datos_Upgrade.value.precio,
                stock: Datos_Upgrade.value.stock,
                categoria: Datos_Upgrade.value.categoria,
                codigo_barra: Datos_Upgrade.value.codigo_barra,
            }
            const PutBackend = await fetch(`${backend_url}/productos/id/${Datos_Upgrade.value.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(Dato_Upgrade),
                credentials: "include",
            })
            if (PutBackend.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            for (const Imagen_Id of Datos_Delete_Imagenes.value) {
                const Datos_Imagenes = Datos_Upgrade.value.imagenes || []
                const Datos_Delete_Imagen = Datos_Imagenes.find((img) => img.id_imagen === Imagen_Id)
                if (Datos_Delete_Imagen && Datos_Delete_Imagen.s3_key) {
                    await supabase.storage.from("max_imagenes").remove([Datos_Delete_Imagen.s3_key])
                }
                await fetch(`${backend_url}/productos/archivos/id/${Imagen_Id}`, {
                    method: "DELETE",
                    credentials: "include",
            })}
            for (const file of Producto_Imagenes_Seleccion.value) {
                const fileExt = file.name.split(".").pop()
                const filePath = `${Math.random()}.${fileExt}`
                let { error: uploadError } = await supabase.storage
                    .from("max_imagenes")
                    .upload(filePath, file)
                if (!uploadError) {
                    await fetch(`${backend_url}/productos/archivos/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id_producto: Datos_Upgrade.value.id,
                            s3_key: filePath,
                            nombre_original: file.name,
                            tipo_contenido: fileExt,
                            tamanio: file.size,
                        }),
                        credentials: "include",
            })}}
            Backend_Get()
            Cerrar_PopUp_Upgrade()
        } catch (error) {
            console.error(error)
            alert("Hubo un error al guardar los cambios.")
        } finally {
            Actualizando.value = false
    }}
    // Leer Datos Activos del Banner //
    const Backend_Get_Banner = async () => {
        try {
            const respuesta = await fetch(`${backend_url}/banners/?bool_activo=true`, {
                headers: {"X-Tunnel-Skip-AntiPhishing-Page": "true",},
                credentials: "include",
            })
            if (respuesta.ok) {
                const Dato_Banners = await respuesta.json()
                if (Dato_Banners.length > 0) {
                    Datos_Banner.value = {
                        id: "Datos_Banner",
                        imagenes: Dato_Banners,
        }}}} catch (error) {
            console.error("Error al cargar el banner:", error)
    }}
    // Leer Todos los Datos del Banner //
    const Backend_Get_Banners = async () => {
        try {
            const respuesta = await fetch(`${backend_url}/banners/`, {
                headers: {"X-Tunnel-Skip-AntiPhishing-Page": "true",},
                credentials: "include",
            })
            if (respuesta.ok) {
                const Dato_All_Banners = await respuesta.json()
                if (Dato_All_Banners.length > 0) {
                    Banner_Upgrade.value = {
                    id: "Banner_Upgrade",
                    imagenes: Dato_All_Banners,
        }}}} catch (error) {
            console.error("Error al cargar el banner:", error)
    }}
    // Borrar Datos del Banner //
    const Backend_Delete_Banner = async () => {
        if (!Banner_Upgrade.value) return
        for (const Banner_Id of Banner_Delete_Supabase.value) {
            const BannerDelete = Banner_Upgrade.value.imagenes.find((b) => b.id === Banner_Id)
            if (BannerDelete) {
                if (BannerDelete.s3_key) {
                    await supabase.storage.from("max_imagenes").remove([BannerDelete.s3_key])
                }
                await fetch(`${backend_url}/banners/id/${BannerDelete.id}`, {
                    method: "DELETE",
                    credentials: "include",
        })}}
        Banner_Delete_Supabase.value = []
    }
    // Desactivar Datos del Producto //
    const Backend_Delete = async () => {
        const DeleteBackend = await fetch(`${backend_url}/productos/id/${Datos_Delete.value.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json",},
                credentials: "include",
        })
        if (DeleteBackend.status === 401) {
            await Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Backend_Get()
        Cerrar_PopUp_Delete()
    }
    // Desactivar Datos de Promocion //
    const Backend_Delete_Promocion = async () => {
        if (!Datos_Offf.value.id_promocion) return
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            const respuesta = await fetch(`${backend_url}/registro_precios/id/${Datos_Offf.value.id_promocion}`, {
                method: "DELETE",
                credentials: "include",
            })
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar la promoción")
            }
            Backend_Get()
            Cerrar_PopUp_Off()
        } catch (error) {
            console.error(error)
            alert("Hubo un error al eliminar la promoción.")
        } finally {
            Actualizando.value = false
    }}
    // Leer Datos de los Productos //
    const Backend_Get = async () => {
        let url = new URL(`${backend_url}/producto/`)
        url.searchParams.append("limit", 1000)
        url.searchParams.append("bool_activo", "true")
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append("busqueda_producto", Busqueda.value)
        }
        const GetBackend = await fetch(url, {
            headers: {"X-Tunnel-Skip-AntiPhishing-Page": "true",},
            credentials: "include",
        })
        const datos = await GetBackend.json()
        Productos.value = datos
    }
    // Verificacion de Stock > 0 //
    const Verificar_Stock = (Producto) => {
        let stockCarrito = 0
        Carrito_Local.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                stockCarrito = stockCarrito + itemCarrito.cantidad
        }})
        return Producto.stock - stockCarrito
    }
    // Desactivar Datos del Banner //
    const Backend_Put_Delete_Banner = async () => {
        if (!Banner_Upgrade.value) return
        for (const Banner_Id of Banner_Delete.value) {
            if (Banner_Delete_Supabase.value.includes(Banner_Id)) continue
                const Datos_Delete_Banner = Banner_Upgrade.value.imagenes.find((b) => b.id === Banner_Id)
                if (Datos_Delete_Banner) {
                    await fetch(`${backend_url}/banners/estado/id/${Datos_Delete_Banner.id}`, {
                        method: "PUT",
                        credentials: "include",
        })}}
        Banner_Delete.value = []
    }
    // Subir Datos de la Promocion //
    const Backend_Post_Promocion = async () => {
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            const Payload = {
                id_producto: Datos_Off.value.id,
                motivo: Datos_Offf.value.motivo || null,
                precio_nuevo: parseFloat(Datos_Offf.value.precio_nuevo),
                fecha_inicio: new Date(Datos_Offf.value.fecha_inicio).toISOString(),
                fecha_fin: new Date(Datos_Offf.value.fecha_fin).toISOString(),
            }
            const respuesta = await fetch(`${backend_url}/registro_precios/`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(Payload),
                credentials: "include",
            })
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            if (!respuesta.ok) {
                const Texto_Error = await respuesta.text()
                throw new Error(Texto_Error)
            }
            Backend_Get()
            Cerrar_PopUp_Off()
        } catch (error) {
            console.error("Error al guardar promoción:", error)
            alert("Hubo un error al guardar la promoción.")
        } finally {
            Actualizando.value = false
    }}
    // Subir Datos del Banner //
    const Backend_Post_Banner = async () => {
        if (Datos_New.value.length > 0) {
            await Backend_Post_Banner_Imagen()
        }
        if (Banner_Delete.value.length > 0) {
            await Backend_Put_Delete_Banner()
        }
        if (Banner_Delete_Supabase.value.length > 0) {
            await Backend_Delete_Banner()
        }
        await Backend_Put_Banner()
        Banner_Delete.value = []
        Banner_Delete_Supabase.value = []
        await Backend_Get_Banner()
        await Backend_Get_Banners()
        Cerrar_PopUp_Banner()
    }
    // Añadir al Carrito //
    const Frontend_Post = () => {
        if (!Producto_Actual.value) 
            return
        // Establecer Datos del Producto 
        const Dato_Precio = Producto_Actual.value.es_promocion
            ? Producto_Actual.value.precio_nuevo
            : Producto_Actual.value.precio
        const Producto_New = {
            id_pedido: Datos_Pedido.value,
            nombre_producto: Producto_Actual.value.nombre,
            id_producto: Producto_Actual.value.id,
            cantidad: Producto_Cantidad.value,
            precio_unitario: Dato_Precio,
            stock_producto: Producto_Actual.value.stock,
            imagenes: Producto_Actual.value.imagenes,
        }
        let Carrito_Existente = Carrito_Local.value.find(
            (item_exitente) => item_exitente.id_producto === Producto_Actual.value.id
        )
        if (Carrito_Existente) {
            Carrito_Existente.cantidad = Producto_Cantidad.value + Carrito_Existente.cantidad
        } else {
            Carrito_Local.value.push(Producto_New)
        }
        localStorage.setItem(
            "carrito_pendiente",
            JSON.stringify(Carrito_Local.value
        ))
        Cerrar_PopUp_Buy()
        Mostrar_Confirmacion.value = true
        setTimeout(() => {
            Mostrar_Confirmacion.value = false
    // Tiempo de Notificacion en Segundos
    }, 2000)}
    // Subir Imagen del Banner //
    const Backend_Post_Banner_Imagen = async () => {
        for (const Banner_New of Datos_New.value) {
            const fileExt = Banner_New.imagen.name.split(".").pop()
            const filePath = `${Math.random()}.${fileExt}`
            let { error: uploadError } = await supabase.storage
            .from("max_imagenes")
            .upload(filePath, Banner_New.imagen)
            if (!uploadError) {
                await fetch(`${backend_url}/banners/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify ({
                    s3_key: filePath,
                    nombre_original: Banner_New.imagen.name,
                    tipo_contenido: fileExt,
                    tamanio: Banner_New.imagen.size,
                    enlace: Banner_New.enlace,
                    orden: Number(Banner_New.orden) || 1,
                    }),
                    credentials: "include",
        })}}
        Datos_New.value = []
    }
    // Sumar/Quitar Producto de Favoritos //
    const Backend_Post_Delete_Favorito = async (id_producto) => {
        try {
            const respuesta = await fetch(`${backend_url}/favoritos/toggle?id_cliente=${Cliente_ID.value}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_producto: id_producto }),
                credentials: "include",
            })
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            if (respuesta.ok) {
                const data = await respuesta.json()
            if (data.estado_favorito) {
                Datos_Favoritos.value.push(id_producto)
            } 
            else {
                Datos_Favoritos.value = Datos_Favoritos.value.filter((id) => id !== id_producto)
        }}} catch (error) {
            console.error("Error al actualizar favorito:", error)
    }}

</script>
