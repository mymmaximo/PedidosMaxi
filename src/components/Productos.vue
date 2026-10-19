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
        <!-- Eliminar Producto -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Delete"
                @click.self="Cerrar_PopUp_Delete"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1 class="text-center">
                            ¿Desear Eliminar/Reactivar {{ Datos_Delete.nombre }}?
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
                                :disabled="Imagen_Leer(Datos_Delete.id) === 0"
                                class="botonflecha"
                                >
                                    ❮
                                </button>
                                <div>
                                    <img v-show="Imagen_Espera[Datos_Delete.id] === false"
                                    :src=Imagen_Url(Datos_Delete.imagenes[Imagen_Leer(Datos_Delete.id)].s3_key)
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
                                :disabled="Imagen_Leer(Datos_Delete.id) === Datos_Delete.imagenes.length - 1"
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

                            <!-- Datos de Producto -->
                            <div v-if="Verificar_Rol([1, 2])">
                                <h2>
                                    Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text"
                                v-model="Datos_Upgrade.nombre"
                                maxlength="50"
                                >
                            </div>
                            <div v-if="Verificar_Rol([1, 2, 4])">
                                <h2>
                                    Precio
                                </h2>
                                <input placeholder="Precio"
                                type="number" 
                                v-model="Datos_Upgrade.precio" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                            </div>
                            <div v-if="Verificar_Rol([1, 2, 5])">
                                <h2>
                                    Stock
                                </h2>
                                <input placeholder="Stock"
                                type="number" 
                                v-model="Datos_Upgrade.stock" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
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
                                    <h2>
                                        Nueva Categoria
                                    </h2>
                                    <input placeholder="Categoria"
                                    type="text" 
                                    v-model="Datos_Upgrade.categoria" 
                                    maxlength="20"
                                    >
                                </div>
                                <h2>
                                    Codigo de Barras
                                </h2>
                                <input placeholder="Codigo de Barras"
                                type="text" 
                                v-model="Datos_Upgrade.codigo_barra" 
                                maxlength="15"
                                >
                            </div>
                            <div v-if="Verificar_Rol([1, 2])">
                                <h2>
                                    Imágenes actuales
                                </h2>
                                <div v-if="Datos_Upgrade.imagenes && Datos_Upgrade.imagenes.length > 0" 
                                class="flex flex-row gap-3
                                items-center justify-center
                                w-full pb-2"
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
                                            :src=Imagen_Url(Datos_Upgrade.imagenes[Imagen_Leer(Datos_Upgrade.id)].s3_key)
                                            @load="Imagen_Espera[Datos_Upgrade.id] = false"
                                            :class="Datos_Delete_Imagenes.includes(Datos_Upgrade.imagenes[Imagen_Leer(Datos_Upgrade.id)].id_imagen) 
                                            ? 'imagendel' 
                                            : 'imagen'"
                                            >
                                            <div v-if="Imagen_Espera[Datos_Upgrade.id] !== false" 
                                            class="mt-2"
                                            >
                                                <img src="../assets/loading.gif" 
                                                alt="Cargando..." 
                                                class="imagen !2xl:p-15"
                                                >
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
                                    <div class="mt-4">
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
                                    {{ Actualizando ? 'Actualizando...' : 'Actualizar' }}
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

                        <!-- Datos de Producto -->
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
                                <div>
                                    <img v-show="Imagen_Espera[Producto_Actual.id] === false"
                                    :src=Imagen_Url(Producto_Actual.imagenes[Imagen_Leer(Producto_Actual.id)].s3_key)
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
                                :disabled="Imagen_Leer(Producto_Actual.id) === Producto_Actual.imagenes.length - 1"
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
                                    $ {{ Formato_Precios((Producto_Actual.es_promocion ? Producto_Actual.precio_nuevo : Producto_Actual.precio) * Producto_Cantidad) }}
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

                            <!-- Datos de Producto -->
                            <div class="bg-gray-50 rounded-xl 
                            p-2 shadow-inner 
                            mx-auto w-full max-w-[200px]"
                            >
                                <div v-if="Datos_Off.imagenes.length > 0"
                                class="flex flex-row 
                                gap-2 overflow-x-auto 
                                items-center justify-between 
                                w-full snap-x"
                                >
                                    <button type="button" 
                                    @click="Imagen_Anterior(Datos_Off)" 
                                    :disabled="Imagen_Leer(Datos_Off.id) === 0" 
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
                                        <img v-show="Imagen_Espera[Datos_Off.id] === false"
                                        :src=Imagen_Url(Datos_Off.imagenes[Imagen_Leer(Datos_Off.id)].s3_key)
                                        @load="Imagen_Espera[Datos_Off.id] = false"
                                        class="w-full h-full object-cover"
                                        >
                                        <div v-if="Imagen_Espera[Datos_Off.id] !== false" 
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
                                    @click="Imagen_Siguiente(Datos_Off)" 
                                    :disabled="Imagen_Leer(Datos_Off.id) === Datos_Off.imagenes.length - 1" 
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

                            <!-- Datos de la Promocion -->
                            <div class="flex flex-col gap-3">
                                <div>
                                    <h2 class="text-sm font-bold text-gray-600 ml-1 mb-1">
                                        Nombre (Opcional)
                                    </h2>
                                    <input placeholder="Ej: Cyber Monday..."
                                    type="text" 
                                    v-model="Datos_Offf.motivo" 
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
                                            v-model="Datos_Offf.precio_nuevo" 
                                            :disabled="Datos_Offf.porcentaje_descuento > 0"
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
                                            v-model="Datos_Offf.porcentaje_descuento" 
                                            :disabled="Datos_Offf.precio_nuevo > 0"
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
                                        v-model="Datos_Offf.fecha_inicio"
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
                                        v-model="Datos_Offf.fecha_fin"
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

                            <!-- Botones -->
                            <div class="flex flex-row 
                            justify-center 
                            gap-2 mt-2 pt-4 
                            border-t-2 border-gray-100"
                            >
                                <button type="submit" 
                                class="botoncon flex-1 !m-0"
                                :disabled="Actualizando"
                                >
                                    {{ Datos_Offf.id_promocion ? 'Actualizar' : 'Guardar' }}
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
            <div class="flex w-full flex-col sm:flex-row">

                <!-- Mostrar Fondo en Celular -->
                <Teleport to="body">
                    <transition name="fade">
                        <div v-if="(Mostrar_Filtro || Mostrar_Nuevo)" 
                        @click="Mostrar_Filtro = false; Mostrar_Nuevo = false"
                        class="fixed inset-0 
                        bg-black/40 backdrop-blur-sm 
                        z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>

                <!-- Barra de Filtros de Producto y Formulario de Nuevo Producto -->
                <div :class="['bar', (Mostrar_Filtro || Mostrar_Nuevo) 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >

                    <!-- Boton de Filtros -->
                    <div class="hidden sm:block">
                        <h1 @click="Mostrar_Filtro = !Mostrar_Filtro ; Mostrar_Nuevo = false"
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

                            <!-- Orden de Productos -->
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

                            <!-- Filtro de Promociones -->
                            <div class="flex flex-col 
                            md:px-4 md:py-3 p-2 my-2 
                            border-y-2 border-green-100 bg-green-50/50 rounded-xl"
                            >

                                <!-- Toggle de Promociones -->
                                <h2 class="!mb-3 flex 
                                items-center gap-1 
                                text-green-800 font-bold"
                                >
                                    🔥 Promociones
                                </h2>
                                <label class="relative 
                                inline-flex items-center 
                                cursor-pointer w-fit pl-1"
                                >
                                    <input 
                                    type="checkbox" 
                                    v-model="Filtro_Promocion"
                                    @change="filtroDescuentoMin = 0"
                                    class="sr-only peer"
                                    >
                                    <div class="w-11 h-6 bg-gray-300 rounded-full peer 
                                    peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white 
                                    after:content-[''] after:absolute 
                                    after:top-0.5 after:left-[6px] 
                                    after:bg-white after:border-gray-300 
                                    after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all 
                                    peer-checked:bg-green-500 shadow-inner"
                                    >
                                    </div>
                                    <span class="ml-3 font-bold text-gray-700 select-none">
                                        Ver ofertas
                                    </span>
                                </label>

                                <!-- Filtro Descuento Minimo -->
                                <div v-if="Filtro_Promocion" class="flex flex-col gap-2 mt-3 pt-3 border-t border-green-200/50">
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

                            <!-- Filtro de Precio Fijo -->
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

                            <!-- Filtro de Precio Personalizado -->
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

                            <!-- Filtro Producto Activo/Desactivo -->
                            <div v-if="Verificar_Rol([1, 2, 4])">
                                <h2>
                                    ¿El Productos esta Activo?
                                </h2>
                                <div class="flex flex-col md:p-4 p-2">
                                    <label>
                                        <input :value="2"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                        Todos los Productos
                                    </label>
                                    <label>
                                        <input :value="1"
                                        type="radio" 
                                        v-model="Filtro_Estatus"
                                        > 
                                        Productos Activos
                                    </label>
                                    <label>
                                        <input :value="0"
                                        type="radio"
                                        v-model="Filtro_Estatus"
                                        > 
                                        Productos Eliminados
                                    </label>
                                </div>
                            </div>

                            <!-- Botones -->
                            <div class="botones">
                                <button @click="Filtro_Aplicar" 
                                class="botoncon"
                                >
                                    Aplicar Filtros
                                </button>
                                <button @click="Filtro_Limpiar" 
                                v-if="Mostrar_Limpiar_Filtro === true"
                                class="botont"
                                >
                                    🗑️ Limpiar Filtro
                                </button>
                            </div>
                            
                        </div>
                    </transition>

                    <!-- Boton de Crear Nuevo Producto -->
                    <div v-if="Verificar_Rol([1, 2])">
                        <h1 @click="Mostrar_Nuevo = !Mostrar_Nuevo ; Mostrar_Filtro = false"
                        class="botonnew"
                        >
                            +
                        </h1>
                    </div>

                    <!-- Barra de Nuevo Producto -->
                    <transition name="slide">
                        <div v-if="Mostrar_Nuevo && (Verificar_Rol([1, 2]))"
                        class="flex flex-col lg:self-center"
                        >
                            <form @submit.prevent="Backend_Post">

                                <!-- Datos de Producto -->
                                <h2>
                                    Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text" 
                                v-model="Datos_New.nombre" 
                                maxlength="50"
                                >
                                <h2>
                                    Precio
                                </h2>
                                <input placeholder="Precio"
                                type="number" 
                                v-model="Datos_New.precio" 
                                oninput="if(this.value.length > 8) this.value = this.value.slice(0, 8);"
                                >
                                <h2>
                                    Stock
                                </h2>
                                <input placeholder="Stock"
                                type="number" 
                                v-model="Datos_New.stock"
                                maxlength="8"
                                >
                                <h2>
                                    Categoria
                                </h2>
                                <select v-model="Dato_Categoria" 
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
                                <h3 v-if="Dato_Categoria === 'new'">
                                    Nueva Categoria
                                </h3>
                                <input v-if="Dato_Categoria === 'new'" 
                                type="text" 
                                v-model="Datos_New.categoria" 
                                placeholder="Categoria"
                                maxlength="20"
                                >
                                <div>
                                    <div v-if="Producto_Imagenes_Previa.length > 0"
                                    class="flex flex-row gap-3 pb-2 w-full overflow-x-auto"
                                    > 
                                        <div v-for="(img, index) in Producto_Imagenes_Previa"
                                        :key="index"
                                        class="shrink-0 mt-2 relative"
                                        >
                                            <button @click="Imagen_Limpiar"
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
                                        <input @change="Imagen_Seleccionar"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        class="imagenu !w-full"
                                        />
                                    </div>
                                </div>

                                <!-- Botones -->
                                <div class="botones">
                                    <button :disabled="Verificar_Boton" 
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

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
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

                    <!-- Productos -->
                    <div v-else>
                        <div class="px-5 w-full">

                            <!-- Mostrar Boton Filtro en Celular -->
                            <button @click="Mostrar_Filtro = true"
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

                                <!-- Barra de Busqueda -->
                                <input @input="Backend_Get"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Busqueda..."
                                class="busqueda !mb-0"
                                maxlength="50"
                                >

                                <!-- Vista en Lista/Carta -->
                                <button @click="Formato_Items = !Formato_Items"
                                title="Alternar Vista"
                                class="bg-white border-2 border-green-200 
                                text-green-700 rounded-xl 
                                px-4 flex items-center justify-center hover:bg-green-50 
                                transition-all shadow-sm active:scale-95"
                                >
                                    <span v-if="!Formato_Items" class="text-xl">
                                        「 」
                                    </span>
                                    <span v-else class="text-xl">
                                        ☰
                                    </span>
                                </button>

                            </div>

                            <!-- Tabla de Productos -->
                            <div v-if="Productos.length > 0"
                            :class="Formato_Items 
                            ? 'flex flex-col gap-4 w-full' 
                            :['grid grid-cols-2 gap-6', 
                            (Mostrar_Filtro || Mostrar_Nuevo) 
                            ? 'lg:grid-cols-3' 
                            : 'lg:grid-cols-4']"
                            >
                                <div v-for= "i in Productos" 
                                :key="i.id"
                                @touchstart="Toque_Start($event)"
                                @touchend="Toque_End($event, i)" 
                                @click="Click_Items(i)"
                                :class="[Estatus_Color(i.activo), Formato_Items 
                                ? 'tarjeta-premium relative bg-white !w-full !m-0 hover:!shadow-lg' 
                                : 'carta relative']"
                                >

                                    <!-- Datos de Productos -->
                                    <div :class="Formato_Items 
                                    ? 'flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto text-left' 
                                    : 'w-full'"
                                    >
                                        <div :class="Formato_Items 
                                        ? 'w-24 sm:w-32 shrink-0' 
                                        : 'w-full'"
                                        >

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
                                            <div v-if="i.imagenes.length > 0"
                                            class="flex flex-row 
                                            gap-3 overflow-x-auto
                                            items-center justify-center 
                                            w-full pb-2 snap-x"
                                            >
                                                <button @click.stop="Imagen_Anterior(i)"
                                                :disabled="Imagen_Leer(i.id) === 0"
                                                class="botonflecha hidden md:flex" 
                                                v-show="!Formato_Items"
                                                >
                                                    ❮
                                                </button>
                                                <div>
                                                    <img v-show="Imagen_Espera[i.id] === false"
                                                    :src=Imagen_Url(i.imagenes[Imagen_Leer(i.id)].s3_key)
                                                    @load="Imagen_Espera[i.id] = false"
                                                    class="imagen"
                                                    >
                                                    <div v-if="Imagen_Espera[i.id] !== false" 
                                                    :class="Formato_Items 
                                                    ? 'w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl drop-shadow-md' 
                                                    : 'imagen'"
                                                    >
                                                        <img src="../assets/loading.gif" 
                                                        alt="Cargando..." 
                                                        class="imagen !2xl:p-15">
                                                    </div>
                                                </div>
                                                <button @click.stop="Imagen_Siguiente(i)"
                                                :disabled="Imagen_Leer(i.id) === i.imagenes.length - 1"
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
                                                <div v-if="i.es_promocion" 
                                                class="flex items-center 
                                                gap-2 -mb-1 mt-1"
                                                >
                                                    <span v-if="i.porcentaje_descuento" 
                                                    class="text-xs font-black text-white 
                                                    bg-green-500 px-1.5 py-0.5 rounded"
                                                    >
                                                        {{ i.porcentaje_descuento }} % OFF
                                                    </span>
                                                    <h2 class="text-gray-400 text-sm font-bold 
                                                    line-through"
                                                    >
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
                                            <div v-if="Verificar_Rol([1, 2, 4, 5])"
                                            :class="Formato_Items 
                                            ? 'mt-1' 
                                            : ''"
                                            >
                                                <h3 :class="Formato_Items 
                                                ? 'text-sm text-gray-400' 
                                                : ''"
                                                >
                                                    <span v-if="Formato_Items">
                                                        🪪 Código: 
                                                    </span>
                                                    {{ i.codigo_barra }} 
                                                    <br v-if="Formato_Items">
                                                    <span v-if="Formato_Items">
                                                        📦
                                                    </span>
                                                    Stock: {{ i.stock }}
                                                </h3>
                                            </div>
                                        </div>

                                    </div>

                                    <!-- Botones -->
                                    <div :class="Formato_Items 
                                    ? 'tarjeta-acciones flex flex-wrap justify-end gap-2 !mt-4 sm:!mt-0 w-full sm:w-auto ml-auto shrink-0' 
                                    : [Verificar_Rol([1, 2]) 
                                    ? 'grid grid-cols-2' 
                                    : 'flex flex-col', 'w-full mt-auto pt-3 gap-1.5 sm:gap-2']"
                                    >
                                        <button @click.stop="Abrir_PopUp_Upgrade(i)" 
                                        v-if="Verificar_Rol([1, 2, 4, 5])" 
                                        :class="Formato_Items 
                                        ? 'btn-chico-gris w-full justify-center' 
                                        : 'botont !px-2 !py-2 !text-sm'"
                                        >
                                            ✏️
                                            <span :class="Formato_Items 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                                Editar
                                            </span>
                                        </button>
                                        <button @click.stop="Abrir_PopUp_Off(i)" 
                                        v-if="Verificar_Rol([1, 2])" 
                                        :class="Formato_Items 
                                        ? 'btn-chico-gris !bg-blue-600 hover:!bg-blue-700 !text-white w-full justify-center' 
                                        : 'botont !bg-blue-50 !border-blue-200 !text-blue-700 hover:!bg-blue-100 !px-2 !py-2 !text-sm'"
                                        >
                                            🏷️
                                            <span :class="Formato_Items 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                                Promoción
                                            </span>
                                        </button>
                                        <button @click.stop="Abrir_PopUp_Delete(i)" 
                                        v-if="Verificar_Rol([1, 2]) && i.activo" 
                                        :class="Formato_Items 
                                        ? 'btn-chico-rojo w-full justify-center' 
                                        : [Verificar_Rol([2]) ? 'col-span-2' : '', 'botonc !px-2 !py-2 !text-sm']"
                                        >
                                            ❌
                                            <span :class="Formato_Items 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                                Eliminar
                                            </span>
                                        </button>
                                        <button @click.stop="Abrir_PopUp_Delete(i)" 
                                        v-if="Verificar_Rol([1, 2]) && !i.activo" 
                                        :class="Formato_Items 
                                        ? 'btn-chico-verde w-full justify-center' 
                                        : [Verificar_Rol([2]) ? 'col-span-2' : '', 'botoncon !px-2 !py-2 !text-sm']"
                                        >
                                            🕊️
                                            <span :class="Formato_Items 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                                Reactivar
                                            </span>
                                        </button>
                                        <button @click.stop="Abrir_PopUp_Buy(i)"
                                        :disabled="Verificar_Stock(i) === 0"
                                        v-if="Verificar_Rol_Excluido([2, 3, 4, 5, 6])"
                                        :class="Formato_Items 
                                        ? 'btn-chico-verde !bg-green-600 !text-white hover:!bg-green-700 w-full justify-center' 
                                        : 'botoncon !px-2 !py-2 !text-sm'"
                                        >
                                            🛍️
                                            <span :class="Formato_Items 
                                            ? 'inline ml-1' 
                                            : 'hidden xl:inline ml-1 truncate'"
                                            >
                                                Comprar
                                            </span>
                                        </button>
                                        <button @click.stop="Backend_Post_Delete_Favorito(i.id)"
                                        v-if="Cliente_ID"
                                        :class="Formato_Items 
                                        ? 'btn-chico-rojo w-full justify-center' 
                                        : [Verificar_Rol([1, 2]) 
                                        ? 'col-span-2' 
                                        : '', 'botonc !px-2 !py-2 !text-sm']"
                                        >
                                            {{ Datos_Favoritos.includes(i.id) ? '🤍 Quitar de Favoritos' : '❤️ Agregar a Favoritos' }}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <!-- Tabla Vacia -->
                            <div v-else 
                            class="flex flex-col 
                            items-center justify-center p-8"
                            >
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                    {{ Pagina === 0 ? 'No se encontraron productos 😔' : 'Ya no hay más productos para mostrar 🏁' }}
                                </h2>
                                <h3 v-if="Pagina === 0" 
                                class="text-gray-500 text-center mt-2"
                                >
                                    Prueba buscando con otro término
                                </h3>
                            </div>

                            <!-- Mostrando Paginas -->
                            <div class="flex justify-center p-5">
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
        watch, 
        computed 
    } from 'vue'
    import { 
        supabase 
    } from '../config/supabase.js'
    import { 
        Carrito_Local, 
        Cerrar_Sesion, 
        PopUp_Upgrade,
        PopUp_Delete,
        PopUp_Off,
        PopUp_Buy,
        Producto_Actual, 
        Producto_Cantidad, 
        Pedido_Actual, 
        Cliente_ID, 
        backend_url,
        Cargar_Carrito, 
        Iniciado, 
        Sesion_Expirada,
        Verificar_Rol,
        Verificar_Rol_Excluido
    } from './Estatus.js'

    // ----- Variables Vue ----- //

    const Mostrar_Filtro = ref (window.innerWidth >= 1024)
    // Habilitar Boton //
    const Verificar_Boton = computed(() =>{
        // Nuevo Producto
        if (Mostrar_Nuevo.value) {
            const faltandatos01 = 
                Datos_New.value.nombre === "" ||
                Datos_New.value.precio === "" ||
                Datos_New.value.stock === "" ||
                Datos_New.value.stock < 0 ||
                Datos_New.value.precio <= 0
            const faltandatos02 = 
                Dato_Categoria.value === "new" && Datos_New.value.categoria === ""
            return faltandatos01 || faltandatos02
        }
        // Actualizar Producto
        if (PopUp_Upgrade.value) {
            const faltandatos03 =
                Datos_Upgrade.value.nombre === "" ||
                Datos_Upgrade.value.precio === "" ||
                Datos_Upgrade.value.stock === "" ||
                Datos_Upgrade.value.codigo_barra === "" ||
                Datos_Upgrade.value.stock < 0 ||
                Datos_Upgrade.value.precio <= 0
            const faltandatos04 = 
                Dato_Categorias.value === "new" && Datos_Upgrade.value.categoria === ""
            return faltandatos03 || faltandatos04
    }})

    // ----- Variables Complejas ----- //

    // Almacen para Eliminar Producto //
    const Datos_Delete = ref ({
        id: "",
        nombre: "",
        imagenes: []
    })
    // Almacen para Nuevo Producto //
    const Datos_New = ref ({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
    })
    // Almacen para Producto a Promocionar //
    const Datos_Off = ref ({
        id: "",
        nombre: "",
        imagenes: []
    })
    // Almacen para Nueva Promocion //
    const Datos_Offf = ref ({
        motivo: "",
        precio_nuevo: "",
        porcentaje_descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
    })
    // Almacen para Actualizar Producto //
    const Datos_Upgrade = ref ({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        codigo_barra: "",
        imagenes: []
    })

    // ----- Variables Booleanas ----- //

    const Paginas_Max = ref (false)
    const Actualizando = ref (false)
    const Backend_Error = ref (false)
    const Formato_Items = ref (false)
    const Mostrar_Nuevo = ref (false)
    const Backend_Espera = ref (true)
    const Filtro_Promocion = ref (false)
    const Bloqueo_Peticion = ref (false)
    const Mostrar_Confirmacion = ref (false)
    const Mostrar_Limpiar_Filtro = ref (false)

    // ----- Variables Vacias ----- //

    const Orden = ref ("3")
    const Busqueda = ref ("")
    const Productos = ref ([])
    const Imagen_New = ref ('')
    const Imagen_Espera = ref ({})
    const Imagen_Indice = ref ({})
    const Datos_Favoritos = ref ([])
    const Datos_Categorias = ref ("")
    const Filtro_Categorias = ref ("")
    const Filtro_Precio_Mayor = ref ("")
    const Filtro_Precio_Menor = ref ("")
    const Datos_Delete_Imagenes= ref ([])
    const Producto_Imagenes_Previa = ref ([])
    const Producto_Imagenes_Seleccion = ref ([])

    // ----- Variables Simples ----- //

	const Pagina = ref (0)
    const Paginas_Items = ref (24)
    const Filtro_Precios = ref (4)
    const Filtro_Estatus = ref (1)
    const filtroDescuentoMin = ref (0)
    const Dato_Categoria = ref ("new")
    const Dato_Categorias = ref ("new")

    // ----- Variables Temporales ----- //

    let Cordenada_X = 0

    // ----- Funciones Vue ----- //

    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Leer Url/Link y Tamaño de Imagen //
    watch(path, () => {
        if (path.value) Imagen_Url()
    })
    // Verificacion de Stock > 0 //
    watch (Producto_Cantidad, (NuevaCantidad) => {
        let Cantidad_Carrito = 0
        if (Producto_Actual.value) {
            Carrito_Local.value.forEach((prod) => {
                if (prod.id_producto === Producto_Actual.value.id) {
                    Cantidad_Carrito = Cantidad_Carrito + prod.cantidad
                }
            })
            const Stock_Local = Producto_Actual.value.stock - Cantidad_Carrito
            if (NuevaCantidad > Stock_Local) {
                Producto_Cantidad.value = Stock_Local
            }
            if (NuevaCantidad < 1 && Stock_Local !== 0) {
                Producto_Cantidad.value = 1
    }}})
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        })
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
        // Leer Productos y Favoritos
        try {
            await Backend_Get()
            const respuesta = await fetch(`${backend_url}/producto/categorias/`, {
                headers: {
                    "X-Tunnel-Skip-AntiPhishing-Page": "true"
                }
            })
            const categ = await respuesta.json()
            Datos_Categorias.value = categ
            if (Cliente_ID.value) {
                const resFav = await fetch(`${backend_url}/favoritos/cliente/${Cliente_ID.value}`, {
                    credentials: 'include'
                })
                if (resFav.ok) {
                    Datos_Favoritos.value = await resFav.json()
                }
            }
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
    // Leer Url/Link y Tamaño de Imagen //
    const emit = defineEmits([
        'upload',
        'update:path'
    ])
    // Definir Url/Link y Tamaño de Imagen //
    const prop = defineProps ([
        'path',
        'size'
    ])
    // Asignar Url/Link y Tamaño de Imagen //
    const { path } = toRefs (prop)

    // ----- Funciones Frontend ----- //

    // Abrir Pop up para Añadir al Carrito //
	const Abrir_PopUp_Buy = (producto_fila) => {
        if (Verificar_Stock(producto_fila) <= 0) {
            return 
        }
        Producto_Actual.value = producto_fila
        Producto_Cantidad.value = 1
		PopUp_Buy.value = true
		document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Desactivar Producto //
	const Abrir_PopUp_Delete = (producto_fila) => {
        Datos_Delete.value.id = producto_fila.id
        Datos_Delete.value.nombre = producto_fila.nombre
        Datos_Delete.value.imagenes = producto_fila.imagenes
		PopUp_Delete.value = true
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
            porcentaje_descuento: "",
            fecha_inicio: "", 
            fecha_fin: "" 
        }
        // Leer Precios
        try {
            const respuesta = await fetch(`${backend_url}/registro_precios/`, {
                headers: { "X-Tunnel-Skip-AntiPhishing-Page": "true" },
                credentials: 'include'
            })
            if (respuesta.ok) {
                const Datos_Registros = await respuesta.json()
                const Datos_Promociones = Datos_Registros.find(
                    p => p.id_producto === producto_fila.id && p.activa === true
                )
                if (Datos_Promociones) {
                    Datos_Offf.value = {
                        id_promocion: Datos_Promociones.id,
                        motivo: Datos_Promociones.motivo || "",
                        precio_nuevo: Datos_Promociones.precio_nuevo,
                        porcentaje_descuento: Datos_Promociones.porcentaje_descuento || "",
                        fecha_inicio: new Date(Datos_Promociones.fecha_inicio).toISOString().slice(0, 16),
                        fecha_fin: new Date(Datos_Promociones.fecha_fin).toISOString().slice(0, 16)
                    }
                }
            }
        } catch (error) {
            console.error("Error buscando promo existente:", error)
        }
        PopUp_Off.value = true
        document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Actualizar Producto //
    const Abrir_PopUp_Upgrade = (producto_fila) => {
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
    // Cerrar Pop up para Añadir el Carrito //
	const Cerrar_PopUp_Buy = () => {
        PopUp_Buy.value = false
        Producto_Actual.value = null
        Producto_Cantidad.value = 1
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Borrar Producto //
	const Cerrar_PopUp_Delete = () => {
		PopUp_Delete.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Promocion //
	const Cerrar_PopUp_Off = () => {
        PopUp_Off.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Actualizar Producto //
	const Cerrar_PopUp_Upgrade = () => {
		PopUp_Upgrade.value = false
        Datos_Delete_Imagenes.value = []
        Imagen_Limpiar()
		document.body.style.overflow = "auto"
	}
    // Establecer Accion al Tocar el Tab //
    const Click_Items = (producto_fila) => {
        if (Verificar_Rol([1, 2, 3, 4, 5, 6])) {
            Abrir_PopUp_Upgrade(producto_fila)
        } else {
            Abrir_PopUp_Buy(producto_fila)
    }}
    // Establecer Color de Carta de Producto (Depende del Estatus) //
    const Estatus_Color = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        }
        else if (id_estatus === false) {
            return "no"
    }}
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
        Filtro_Estatus.value =  1
        filtroDescuentoMin.value = 0
        Filtro_Promocion.value = false
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
        const Imagen_Actual = Imagen_Leer(imagen.id)
        if (Imagen_Actual > 0) {
            Imagen_Indice.value[imagen.id] = Imagen_Actual - 1
            Imagen_Espera.value[imagen.id] = true
    }}
    // Quitar Imagen de Producto //
    const Imagen_Delete = (img) => {
        const index = Datos_Delete_Imagenes.value.indexOf(
            img.id_imagen
        )
        if (index === -1) {
            Datos_Delete_Imagenes.value.push(img.id_imagen)
        } else {
            Datos_Delete_Imagenes.value.splice(index, 1)
        }
        Imagen_Indice.value[Datos_Upgrade.value.id] = 0
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
            Imagen_New.value.value = ''
    }}
    // Subir Imagen de Producto //
    const Imagen_Seleccionar = (evt) => {
        const files = evt.target.files
        if (files) {
            for (
                let i = 0 ; i < files.length ; i++ 
            ) {
                Producto_Imagenes_Seleccion.value.push(files[i])
                Producto_Imagenes_Previa.value.push(URL.createObjectURL(files[i]))
    }}}
    // Leer Imagen Siguiente //
    const Imagen_Siguiente = (imagen) => {
        const Imagen_Actual = Imagen_Leer(imagen.id)
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
    // Fin del Toque de Imagen en Celular //
    const Toque_End = (evento, producto) => {
        if (!producto) return
        const finX = evento.changedTouches[0].clientX
        const diferencia = Cordenada_X - finX
        if (Math.abs(diferencia) < 50) {
            Cordenada_X = 0
            return
        }
        if (diferencia > 0) {
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

    // ----- Funciones Backend ----- //

    // Desactivar Datos del Producto //
    const Backend_Delete = async() => {
        const DeleteBackend = await fetch(`${backend_url}/productos/id/${Datos_Delete.value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (DeleteBackend.status === 401) {
            await Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Datos_Delete.value = {
            id: "",
            nombre: "",
            imagenes: []
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
                method: 'DELETE',
                credentials: 'include'
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
    const Backend_Get = async() => {
        let url = new URL (`${backend_url}/producto/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', Paginas_Items.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            if (Orden.value !== "3") {
                Mostrar_Limpiar_Filtro.value = true
            }
        }
        // Establecer Filtro de Precios
        let Filtro_Minimo = ""
        let Filtro_Maximo = ""
        if (Filtro_Precios.value === 4) {
            Filtro_Minimo = ""
            Filtro_Maximo = ""
            Filtro_Precio_Menor.value = ""
            Filtro_Precio_Mayor.value = ""
        }
        else if (Filtro_Precios.value === 3) {
            Filtro_Maximo = 10000
        }
        else if (Filtro_Precios.value === 2) {
            Filtro_Minimo = 10000
            Filtro_Maximo = 50000
        }
        else if (Filtro_Precios.value === 1) {
            Filtro_Minimo = 50000
        }
        // Establecer Filtro Precios Personalizados
        else if (Filtro_Precios.value === 0) {
            Filtro_Minimo = Filtro_Precio_Menor.value
            Filtro_Maximo = Filtro_Precio_Mayor.value
        }
        if (Filtro_Minimo !== "" && Filtro_Minimo != null) {
            url.searchParams.append('precio_producto_min', Filtro_Minimo)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Maximo !== "" && Filtro_Maximo != null) {
            url.searchParams.append('precio_producto_max', Filtro_Maximo)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Estatus.value === 2) {
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Estatus
        if (Filtro_Estatus.value === 1) {
            url.searchParams.append('bool_activo', 'true')
        }
        if (Filtro_Estatus.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Categoria
        if (Filtro_Categorias.value !== "") {
            url.searchParams.append('Filtro_Categorias', Filtro_Categorias.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Promocion
        if (Filtro_Promocion.value === true) {
            url.searchParams.append('bool_promocion', 'true')
            Mostrar_Limpiar_Filtro.value = true
            if (filtroDescuentoMin.value > 0) {
                url.searchParams.append('porcentaje_descuento_min', filtroDescuentoMin.value)
        }}
        const GetBackend = await fetch(url.toString(), {
            headers: {
                "X-Tunnel-Skip-AntiPhishing-Page": "true"
            },
            credentials: 'include'
        })
        const datos = await GetBackend.json()
        if (Array.isArray(datos)) {
            if (datos.length > Paginas_Items.value) {
                Paginas_Max.value = true
                Productos.value = datos.slice(0, Paginas_Items.value)
            } else {
                Paginas_Max.value = false
                Productos.value = datos
        }} else {
            Productos.value = []
            Paginas_Max.value = false
    }}
    // Subir Datos de Nuevo Producto //
    const Backend_Post = async() => {
        if (Dato_Categoria.value != "new") {
            Datos_New.value.categoria = Dato_Categoria.value
        }
        const PostBackend = await fetch(`${backend_url}/productos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Datos_New.value),
            credentials: 'include'
        })
        if (PostBackend.status === 401) {
            await Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        const Dato_New = await PostBackend.json()
        const Dato_New_Id = Dato_New.id        
        if (Producto_Imagenes_Seleccion.value.length > 0) {
            for (
                let i = 0 ; i < Producto_Imagenes_Seleccion.value.length ; i++
            ) {
                const file = Producto_Imagenes_Seleccion.value[i]
                const fileExt = file.name.split('.').pop()
                const filePath = `${Math.random()}.${fileExt}`
                let { error: uploadError } = await supabase.storage
                    .from('max_imagenes')
                    .upload(filePath, file)
                if (uploadError) {
                    alert("El Producto se creo, Pero hubi un  error subiendo la imagen")
                } else {
                    await fetch(`${backend_url}/productos/archivos/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_producto: Dato_New_Id,
                            s3_key: filePath,
                            nombre_original: file.name,
                            tipo_contenido: fileExt,
                            tamanio: file.size
                        }),
                        credentials: 'include'
            })}}
        }
        Datos_New.value = {
            nombre: "",
            precio: "",
            stock: "",
            categoria: ""
        }
        Imagen_Limpiar()
        Backend_Get()
    }
    // Sumar/Quitar Producto de Favoritos //
    const Backend_Post_Delete_Favorito = async (id_producto) => {
        try {
            const respuesta = await fetch(`${backend_url}/favoritos/toggle?id_cliente=${Cliente_ID.value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_producto: id_producto }),
                credentials: 'include'
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
                } else {
                    Datos_Favoritos.value = Datos_Favoritos.value.filter(id => id !== id_producto)
            }}
        } catch (error) {
            console.error("Error al actualizar favorito:", error)
    }}
    // Subir Datos de la Promocion //
    const Backend_Post_Promocion = async () => {
        if (Actualizando.value) return
        Actualizando.value = true
        
        try {
            const Payload = {
                id_producto: Datos_Off.value.id,
                motivo: Datos_Offf.value.motivo || null,
                precio_nuevo: Datos_Offf.value.precio_nuevo ? parseFloat(Datos_Offf.value.precio_nuevo) : null,
                porcentaje_descuento: Datos_Offf.value.porcentaje_descuento ? parseInt(Datos_Offf.value.porcentaje_descuento) : null,
                fecha_inicio: new Date(Datos_Offf.value.fecha_inicio).toISOString(),
                fecha_fin: new Date(Datos_Offf.value.fecha_fin).toISOString()
            }
            const respuesta = await fetch(`${backend_url}/registro_precios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Payload),
                credentials: 'include'
            })
            if (respuesta.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            if (!respuesta.ok) {
                const err = await respuesta.text()
                throw new Error(err)
            }
            Backend_Get()
            Cerrar_PopUp_Off()
        } catch (error) {
            console.error("Error al guardar promoción:", error)
            alert("Hubo un error al guardar la promoción.")
        } finally {
            Actualizando.value = false
    }}
    // Actualizar Datos del Producto //
    const Backend_Put = async() => {
        if (Actualizando.value) return
        Actualizando.value = true
        try {
            // Datos Texto Backend
            if (Dato_Categorias.value != "new") { 
                Datos_Upgrade.value.categoria = Dato_Categorias.value
            }
            const Dato_Upgrade = {
                nombre: Datos_Upgrade.value.nombre,
                precio: Datos_Upgrade.value.precio,
                stock: Datos_Upgrade.value.stock,
                categoria: Datos_Upgrade.value.categoria,
                codigo_barra: Datos_Upgrade.value.codigo_barra
            }
            const PutBackend = await fetch(`${backend_url}/productos/id/${Datos_Upgrade.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Dato_Upgrade),
            credentials: 'include'
            })
            if (PutBackend.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            // Borrar Datos Imagen
            for (const Imagen_Id of Datos_Delete_Imagenes.value) {
                const Datos_Imagenes = Datos_Upgrade.value.imagenes || []
                const Datos_Delete_Imagen = Datos_Imagenes.find(
                    img => img.id_imagen === Imagen_Id
                )
                if (Datos_Delete_Imagen && Datos_Delete_Imagen.s3_key) {
                    await supabase.storage.from('max_imagenes').remove([Datos_Delete_Imagen.s3_key])
                }
                await fetch(`${backend_url}/productos/archivos/id/${Imagen_Id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
            }
            // Subir Datos Imagen
            for (const file of Producto_Imagenes_Seleccion.value) {
                const fileExt = file.name.split('.').pop()
                const filePath = `${Math.random()}.${fileExt}`
            // Subir Datos Imagen Supabase
                let { error: uploadError } = await supabase.storage
                    .from('max_imagenes')
                    .upload(filePath, file)
            // Subir Datos Imagen Backend
                if (!uploadError) {
                    await fetch(`${backend_url}/productos/archivos/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id_producto: Datos_Upgrade.value.id,
                            s3_key: filePath,
                            nombre_original: file.name,
                            tipo_contenido: fileExt,
                            tamanio: file.size
                        }),
                        credentials: 'include'
            })}}
            Backend_Get()
            Cerrar_PopUp_Upgrade()
        } catch (error) {
            console.error(error)
            alert("Hubo un error al guardar los cambios.")
        } finally {
            Actualizando.value = false
    }}
    // Añadir al Carrito //
    const Frontend_Post = () => {
        if (!Producto_Actual.value)
            return
        // Establecer Datos del Producto 
        const Dato_Precio = Producto_Actual.value.es_promocion 
            ? Producto_Actual.value.precio_nuevo 
            : Producto_Actual.value.precio;
        const Producto_New = {
            id_pedido: Pedido_Actual.value,
            nombre_producto: Producto_Actual.value.nombre,
            id_producto: Producto_Actual.value.id,
            cantidad: Producto_Cantidad.value,
            precio_unitario: Dato_Precio,
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
            Carrito_Local.value.push(Producto_New)
        }
        localStorage.setItem(
            'carrito_pendiente',
            JSON.stringify(
                Carrito_Local.value
        ))
        Cerrar_PopUp_Buy()
        Mostrar_Confirmacion.value = true
        // Tiempo de Notificacion en Segundos
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