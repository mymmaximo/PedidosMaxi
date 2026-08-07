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
                    <div class="popup">
                        <h1 class="text-center">
                        {{ ProductoActual.nombre }}
                        </h1>
                        <div>
                            <div v-if="ProductoActual.imagenes.length > 0"
                            class="flex flex-row 
                            gap-3 overflow-x-auto
                            items-center justify-center 
                            w-full pb-2 snap-x
                            ">
                                <button @click="BackImg(ProductoActual)"
                                :disabled="GetImg(ProductoActual.id) === 0"
                                class="botonflecha"
                                >
                                ❮
                                </button>
                                <div>
                                    <img v-show="ImagenesCargando[ProductoActual.id] === false"
                                    :src=ObtenerImgUrl(ProductoActual.imagenes[GetImg(ProductoActual.id)].s3_key)
                                    @load="ImagenesCargando[ProductoActual.id] = false"
                                    class="imagen"
                                    >
                                    <div v-if="ImagenesCargando[ProductoActual.id] !== false" 
                                    class="mt-2"
                                    >
                                        <img src="../assets/loading.gif" 
                                        alt="Cargando..." 
                                        class="imagen !2xl:p-15"
                                        >
                                    </div>
                                </div>
                                <button @click="NextImg(ProductoActual)"
                                :disabled="GetImg(ProductoActual.id) === ProductoActual.imagenes.length - 1"
                                class="botonflecha"
                                >
                                ❯
                                </button>
                            </div>
                            <img v-else src="../assets/images.png"
                            class="imagen"
                            >
                        </div>
                        <div class="flex flex-col">
                            <input v-model="ProductoCantidad"
                            type="number" 
                            maxlength="8"
                            class="!w-30 mb-3"
                            >
                            <div class="botones !flex-row">
                                <button @click="RestarProducto(ProductoActual)"
                                class="botonc !px-4 !font-bold"
                                >
                                ━
                                </button>
                                <button @click="SumarProducto(ProductoActual)"
                                class="botoncon !px-4"
                                >
                                ✚
                                </button>
                            </div>
                            <h1 class="text-center">
                            <span class="hidden lg:inline 2xl:inline">
                            Total:
                            </span>
                            ${{ ProductoActual.precio * ProductoCantidad }}  
                            </h1>
                        </div>
                        <div class="botones">
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
                class="fixed top-4 right-4 
                bg-green-600 text-white 
                px-6 py-3 rounded-xl shadow-lg 
                z-[100] font-bold"
                >
                ✅ ¡Agregado al carrito!
                </div>
            </transition>
        </Teleport>
        <!-- Tabla de Productos y Barra de Filtros -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <!-- Barra de Filtros -->
                <div class="bar">
                    <div>
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
                            <div class="flex flex-col md:p-4 p-2">
                                <h1>
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
                                maxlength="10"
                                >
                                <h3 class="flex flex-col md:p-4 p-2">
                                Precio Minimo
                                </h3>
                                <input placeholder="Precio Min..."
                                type="number"
                                v-model="menor" 
                                maxlength="10"
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
                                maxlength="8"
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
                        <button @click="CargarDatos()" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <div class="px-5">
                            <input @input="BusquedaProducto"
                            type="text" 
                            v-model="Busqueda" 
                            placeholder="Busqueda..."
                            class="busqueda"
                            maxlength="50"
                            >
                            <div v-if="Productos.length > 0"
                            class="grid lg:grid-cols-3 grid-cols-2 gap-6"
                            >
                                <div :class="Estatuscolor(i.activo)" 
                                v-for= "i in Productos" 
                                :key="i.id"
                                @touchstart="ComienzoToque($event)"
                                @touchend="FinToque($event, i)" 
                                class="carta"
                                @click="Compracion(i)"
                                >
                                    <div>
                                        <div v-if="i.imagenes.length > 0"
                                        class="flex flex-row 
                                        gap-3 overflow-x-auto
                                        items-center justify-center 
                                        w-full pb-2 snap-x"
                                        >
                                            <button @click.stop="BackImg(i)"
                                            :disabled="GetImg(i.id) === 0"
                                            class="botonflecha hidden md:flex"
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
                                                class="mt-2"
                                                >
                                                    <img src="../assets/loading.gif" 
                                                    alt="Cargando..." 
                                                    class="imagen !2xl:p-15">
                                                </div>
                                            </div>
                                            <button @click.stop="NextImg(i)"
                                            :disabled="GetImg(i.id) === i.imagenes.length - 1"
                                            class="botonflecha hidden md:flex"
                                            >
                                            ❯
                                            </button>
                                        </div>
                                        <img v-else src="../assets/images.png"
                                        class="imagen"
                                        >
                                        <div>
                                            <h2 class="font-bold">
                                            {{ i.nombre }}
                                            </h2>
                                            <h3>
                                            Categoria: 
                                            {{ i.categoria }}
                                            </h3>
                                            <h2>
                                            ${{ i.precio }}
                                            </h2>
                                            <div v-if="VerificarRol([1, 2, 4, 5])">
                                                <h3>
                                                {{ i.codigo_barra }} <br>
                                                Stock: 
                                                {{ i.stock }}
                                                </h3>
                                            </div>
                                            <div class="botones">
                                                <div v-if="VerificarRol([1, 2, 4, 5])">
                                                    <button @click.stop="Edicion(i)" 
                                                    v-if="VerificarRol([1, 2, 4, 5])" 
                                                    class="botont !py-2"
                                                    >
                                                    ✏️
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Editar
                                                    </span>
                                                    </button>
                                                </div>
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
                                                    class="botoncon"
                                                    >
                                                    🕊️
                                                    <span class="hidden lg:inline 2xl:inline">
                                                    Reactivar
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
                            <div v-else>
                                <h2>
                                No se encontraron productos 😔
                                </h2>
                                <h3>
                                Prueba buscando con otro termino
                                </h3>
                            </div>
                            <div class="flex justify-center p-5">
                                <button @click="CambiarPagina('back')" 
                                :disabled="Pagina < 20 || CargandoTrue"
                                class="botona"
                                >
                                ❮
                                </button>
                                <h2 class="self-center p-5">
                                Items 
                                {{ 0 + Pagina }} 
                                - 
                                {{ Pagina + Productos.length }}
                                </h2>
                                <button @click="CambiarPagina('next')" 
                                :disabled="Productos.length < 20 || CargandoTrue"
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
    const prop = defineProps (['path','size'])
    const router = useRouter()
    const { path } = toRefs (prop)
    // ----- Variables Booleanas ----- //
    const ActualizarCajaPDel = ref (false)
    const BloqueoPeticion = ref(false)
    const VentanaCompra = ref (false)
    const MostrarConfir = ref (false)
    const MostrarFiltro = ref (true)
    const MostrarNuevo = ref (false)
    const VentanaNuevo = ref (false)
    const Actualizando = ref(false)
    const CargandoTrue = ref(true)
    const ErrorCarga = ref(false)
    const uploading = ref (false)
    const filtroAct = ref (false)
    // ----- Variables Vacias ----- //
    const ListaCategoria = ref ("")
    const ImagenesCargando = ref({})
    const ArchivoSave = ref ([])
    const VistaPrevia = ref ([])
    const filtrocat = ref ("")
    const IndiceImg = ref ({})
    const Productos = ref ([])
    const fileInput = ref ('')
    const Busqueda = ref ("")
    const NewImg = ref ([])
    const orden = ref ("")
    const mayor = ref ("")
    const menor = ref ("")
    const DelImg= ref ([])
    // ----- Variables Simples ----- //
    const OpcionCategoriaA = ref ("new")
    const OpcionCategoria = ref ("new")
    const filtroRadio = ref(0)
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
            Pagina.value += 21
        } else if (direccion === 'back') {
            Pagina.value -= 21
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
    const AplicarFiltro = () => {
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
    const GetImg = (id) => {
        return IndiceImg.value[id] || 0
    }
    const LimpiarFiltro = () => {
        filtroRadio.value = 4
        filtrocat.value = ""
        filtroEst.value =  1
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
    const BusquedaProducto = async() => {
        let url = new URL (`${urlover8000}/producto/`)
		url.searchParams.append('skip', Pagina.value)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
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
        const BusqProducto = await fetch(url.toString(), {
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
                    await fetch(`${urlover8000}/productos/archivos`, {
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
        CerrarPopUp03()
        MostrarConfir.value = true
        setTimeout(() => { MostrarConfir.value = false }, 2000)
    }
</script>