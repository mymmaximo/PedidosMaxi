<template>
    <div class="cuerpo">
    
        <!-- Notificación -->
        <!-- Copiado en PortaPapeles -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="Notificacion_Copiar" 
                class="notificacion !bg-blue-300 !text-white"
                >
                    <span class="text-xl drop-shadow-sm">
                        ✅ 
                    </span>
                    <span>
                        {{ Texto_Notificacion }}
                    </span>
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

                <!-- Barra de Filtros de Registro de Precios -->
                <div :class="['bar', (Mostrar_Filtro || Mostrar_Nuevo) 
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
                                        Nombre producto A-Z
                                    </option>
                                    <option value="2">
                                        Nombre producto Z-A
                                    </option>
                                    <option value="3">
                                        Fecha Inicio ascendente
                                    </option>
                                    <option value="4">
                                        Fecha Inicio descendente
                                    </option>
                                    <option value="5">
                                        Fecha Fin ascendente
                                    </option>
                                    <option value="6">
                                        Fecha Fin descendente
                                    </option>
                                    <option value="7">
                                        Precio nuevo menor
                                    </option>
                                    <option value="8">
                                        Precio nuevo mayor
                                    </option>
                                    <option value="9">
                                        Precio viejo menor
                                    </option>
                                    <option value="10">
                                        Precio viejo mayor
                                    </option>
                                    <option value="11">
                                        Porcentaje de Descuento ascendente
                                    </option>
                                    <option value="12">
                                        Porcentaje de Descuento descendente
                                    </option>
                                    <option value="13">
                                        Categoria A-Z
                                    </option>
                                    <option value="14">
                                        Categoria Z-A
                                    </option>
                                </select>
                            </div>

                            <!-- Filtro de Actualizacion Max -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                    Filtros de Fecha de Actualizacion
                                </h2>
                                <input placeholder="Fecha de Actualizacion Max..."
                                type="date"
                                v-model="Filtro_Fecha_Inicio_Maximo" 
                                >
                                <input placeholder="Fecha de Actualizacion Min..."
                                type="date"
                                v-model="Filtro_Fecha_Inicio_Minimo" 
                                >
                                <input placeholder="Fecha de Actualizacion Max..."
                                type="date"
                                v-model="Filtro_Fecha_Fin_Maximo" 
                                >
                                <input placeholder="Fecha de Actualizacion Min..."
                                type="date"
                                v-model="Filtro_Fecha_Fin_Minimo" 
                                >
                            </div>

                            <!-- Filtro de Precio Viejo -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                    Filtros de Precio Viejo
                                </h2>
                                <input placeholder="Precio Anterior Max..."
                                type="number"
                                v-model="Filtro_Precio_Anterior_Maximo" 
                                maxlength="10"
                                >
                                <input placeholder="Precio Anterior Min..."
                                type="number"
                                v-model="Filtro_Precio_Anterior_Minimo" 
                                maxlength="10"
                                >
                            </div>

                            <!-- Filtro de Precio Nuevo -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                    Filtros de Precio Nuevo
                                </h2>
                                <input placeholder="Precio Nuevo Max..."
                                type="number"
                                v-model="Filtro_Precio_Nuevo_Maximo" 
                                maxlength="10"
                                >
                                <input placeholder="Precio Nuevo Min..."
                                type="number"
                                v-model="Filtro_Precio_Nuevo_Minimo"
                                maxlength="10"
                                >
                            </div>

                            <!-- Filtro de Categoria -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
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

                            <!-- Filtro de Distincion entre Promocion y Cambios Fijos -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2 text-green-800 font-bold">
                                    Tipo de Registro
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
                                    <label class="cursor-pointer">
                                        <input :value="2"
                                        type="radio" 
                                        v-model="Filtro_Promocion"
                                        class="accent-green-600 mr-1"
                                        > 
                                            Todos (Historial Completo)
                                    </label>
                                    <label class="cursor-pointer text-red-600 font-semibold">
                                        <input :value="1"
                                        type="radio" 
                                        v-model="Filtro_Promocion"
                                        class="accent-red-500 mr-1"
                                        > 
                                            🔥 Solo Ofertas Temporales
                                    </label>
                                    <label class="cursor-pointer text-blue-600 font-semibold">
                                        <input :value="0"
                                        type="radio" 
                                        v-model="Filtro_Promocion"
                                        class="accent-blue-500 mr-1"
                                        > 
                                            ⇄ Solo Cambios Fijos de Precio
                                    </label>
                                </div>
                            </div>

                            <!-- Filtro de Productos Activos -->
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                ¿El Productos esta Activo?
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
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

                            <!-- Filtro de Promocion Vigente -->
                            <div v-if="Filtro_Promocion === 1"
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2 text-indigo-800 font-bold">
                                    ¿El Registro / Promo está Vigente?
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
                                    <label class="cursor-pointer">
                                        <input :value="2"
                                        type="radio" 
                                        v-model="Filtro_Promocion_Estatus"
                                        class="accent-indigo-600 mr-1"
                                        > 
                                            Todos (Vigentes y Borrados)
                                    </label>
                                    <label class="cursor-pointer">
                                        <input :value="1"
                                        type="radio" 
                                        v-model="Filtro_Promocion_Estatus"
                                        class="accent-indigo-600 mr-1"
                                        > 
                                            Solo Vigentes
                                    </label>
                                    <label class="cursor-pointer text-gray-500">
                                        <input :value="0"
                                        type="radio" 
                                        v-model="Filtro_Promocion_Estatus"
                                        class="accent-gray-500 mr-1"
                                        > 
                                            Solo Eliminados / Vencidos
                                    </label>
                                </div>
                            </div>

                            <!-- Botones -->
                            <div class="botones">
                                <button @click="Filtro_Aplicar" 
                                class="botoncon">
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

                </div>

                <!-- Tabla de Historial de Precios -->
                <div class="start !px-5">

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando historial de precios..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                            Cargando historial de precios, un momento...
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

                    <!-- Registros de Precios -->
                    <div v-else>

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

                        <!-- Barra de Busqueda -->
						<div class="flex flex-row items-stretch w-full gap-3 mb-5">-
							<input @input="Backend_Get"
							type="text" 
							v-model="Busqueda" 
							placeholder="Busqueda..."
							class="busqueda !mb-0"
							maxlength="50"
							>
							<button @click="Formato_Items = !Formato_Items"
							title="Alternar Vista"
							class="botonvista"
							>
								<span v-if="!Formato_Items" class="text-xl">
    								「 」
								</span>
								<span v-else class="text-xl">
	    							☰
								</span>
							</button>
						</div>

                        <!-- Encabezado -->
                        <h1 class="titulo-config">
                            Registro de Precios
                        </h1>

                        <!-- Tabla de Historial de Precios -->
                        <div v-if="Historial.length > 0"
                        :class="Formato_Items 
                        ? 'flex flex-col gap-4 w-full' 
                        :'grid grid-cols-4 gap-6'"
                        >

                            <!-- Datos de Productos -->
                            <div v-for= "i in Historial" 
                            :key="i.id"
                            @click="Copiar_Portapapeles(i.codigo_barra, i.nombre)"
                            :class="Formato_Items 
                            ? 'tarjeta-premium z-10 relative bg-white !mb-6 !w-full !m-0 hover:!shadow-lg' 
                            : 'carta relative'"
                            >
                                <div class="flex flex-col text-left">
                                    <div class="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 class="text-xl font-black text-gray-800">
                                            {{ i.nombre }}
                                        </h2>
                                        <span class="text-xs font-bold px-3 py-1 
                                        rounded-full border shadow-sm"
                                        :class="(i.activo === 1 || i.activo === true) 
                                        ? 'bg-green-100 text-green-800 border-green-300' 
                                        : 'bg-red-100 text-red-800 border-red-300'"
                                        >
                                            {{ Estatus_Texto(i.activo) }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <span v-if="i.es_promocion"
                                        class="text-xs font-bold 
                                        w-fit mb-2 px-3 py-1 
                                        rounded-full border shadow-sm"
                                        :class="(i.activa === 1 || i.activa === true) 
                                        ? 'bg-green-100 text-green-800 border-green-300' 
                                        : 'bg-red-100 text-red-800 border-red-300'"
                                        >
                                            {{ Estatus_Promocion(i.activa) }}
                                        </span>
                                        <h2 class="mb-2 flex items-center gap-2">
                                            <span class="px-2 py-1 rounded-full 
                                            text-xs font-bold text-white 
                                            shadow-sm" 
                                            :class="i.es_promocion 
                                            ? 'bg-red-500' 
                                            : 'bg-blue-500'"
                                            >
                                                {{ i.es_promocion ? '🔥 Oferta' : '⇄ Cambio' }}
                                            </span>
                                            <span v-if="i.motivo" 
                                            class="font-semibold 
                                            text-gray-700"
                                            >
                                                {{ i.motivo }}
                                            </span>
                                        </h2>
                                        <h2>
                                            <span class="hidden lg:inline 2xl:inline">
                                                Categoria: 
                                            </span>
                                            {{ i.categoria }}
                                        </h2>
                                        <h2>
                                            <span class="hidden lg:inline 2xl:inline">
                                                Codigo de Barras: 
                                            </span>
                                            {{ i.codigo_barra }}
                                        </h2>
                                    </div>
                                </div>
                                <div class="lilbox">
                                    <h2>
                                        <span class="text-xs text-gray-500 font-bold mb-1">
                                            Precio Anterior: 
                                        </span>
                                        $ {{ Formato_Precios(i.precio_anterior) }}
                                    </h2>
                                    <h2>
                                        <span class="text-gray-500 font-medium text-sm">
                                            Precio Nuevo: 
                                        </span
                                        class="font-bold" 
                                        :class="i.precio_nuevo < i.precio_anterior 
                                        ? 'text-green-600' 
                                        : 'text-red-600'"
                                        >
                                        $ {{ Formato_Precios(i.precio_nuevo) }}
                                    </h2>
                                    <h2 v-if="i.es_promocion && i.porcentaje_descuento">
                                        <span class="text-gray-500 font-medium text-sm">
                                            Descuento:
                                        </span>
                                        {{ i.porcentaje_descuento }}%
                                    </h2>
                                    <h2 v-if="i.es_promocion">
                                        <span class="text-gray-500 font-medium text-sm">
                                            Fecha Inicio: 
                                        </span>
                                        {{ Formato_Fecha(i.fecha_inicio) }}
                                    </h2>
                                    <h2 v-if="i.es_promocion">
                                        <span class="text-gray-500 font-medium text-sm">
                                            Fecha Fin: 
                                        </span>
                                        {{ Formato_Fecha(i.fecha_fin) }}
                                    </h2>
                                    <h2 v-if="!i.es_promocion">
                                        <span class="text-gray-500 font-medium text-sm">
                                            Fecha de Cambio: 
                                        </span>
                                        {{ Formato_Fecha(i.fecha_inicio) }}
                                    </h2>
                                </div>
                            </div>

                        </div>

                        <!-- Tabla Vacia -->
                        <div v-else   
                        class="flex flex-col 
                        items-center justify-center p-8"
                        >
                            <h2 class="text-xl font-bold text-gray-700 text-center">
                                {{ Pagina === 0 ? 'No se encontraron Historial 😔' : 'Ya no hay más Historial para mostrar 🏁' }}
                            </h2>
                            <h3 v-if="Pagina === 0" 
                            class="text-gray-500 text-center mt-2"
                            >
                                Prueba buscando con otro término
                            </h3>
                        </div>

                        <!-- Mostrando Paginas -->
                        <div class="flex justify-center p-3">
                            <button @click="Cambiar_Pagina('back')" 
                            :disabled="Pagina === 0 || Backend_Espera"
                            class="botona"
                            >
                                ❮
                            </button>
                            <h2 class="self-center font-bold px-6 text-green-800 text-center">
                                <span v-if="Historial.length > 0">
                                    Mostrando {{ Pagina + 1 }} - {{ Pagina + Historial.length }}
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
</template>

<script setup>

    // ----- Imports ----- //

    import { 
        onMounted, 
        ref 
    } from 'vue'
    import { 
        backend_url 
    } from './Estatus.js'

    // ----- Variables Booleanas ----- //

    const Paginas_Max = ref (false)
    const Formato_Items = ref (window.innerWidth < 640)
    const Backend_Error = ref (false)
    const Backend_Espera = ref (true)
	const Mostrar_Filtro = ref (false)
    const Bloqueo_Peticion = ref (false)
    const Notificacion_Copiar = ref (false)
	const Mostrar_Limpiar_Filtro = ref (false)
    
    // ----- Variables Vacias ----- //
	
    const Orden = ref ("")
	const Busqueda = ref ("")
    const Historial = ref ([])
    const Datos_Categorias = ref ("")
	const Filtro_Categorias = ref ("")
    const Texto_Notificacion = ref ("")
	const Filtro_Fecha_Fin_Maximo = ref ("")
	const Filtro_Fecha_Fin_Minimo = ref ("")
	const Filtro_Precio_Nuevo_Maximo = ref ("")
	const Filtro_Precio_Nuevo_Minimo = ref ("")
	const Filtro_Fecha_Inicio_Maximo = ref ("")
	const Filtro_Fecha_Inicio_Minimo = ref ("")
	const Filtro_Precio_Anterior_Maximo = ref ("")
	const Filtro_Precio_Anterior_Minimo = ref ("")
    
    // ----- Variables Simples ----- //
	
    const Pagina = ref (0)
    const Paginas_Items = ref (24)
	const Filtro_Estatus = ref (2)
    const Filtro_Promocion = ref (2)
    const Filtro_Promocion_Estatus = ref (2)
    
    // ----- Funciones Vue ----- //
    
    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (Bloqueo_Peticion.value) 
            return
        Bloqueo_Peticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Espera.value = true
        Backend_Error.value = false
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        // Leer Registros y Categorias
        try {
            await Backend_Get()
            const respuesta = await fetch(`${backend_url}/producto/categorias/`)
            const datos = await respuesta.json()
            Datos_Categorias.value = datos
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
    
    // ----- Funciones Frontend ----- //

    // Cerrar Barra de Filtros //
	const Cerrar_Filtro = () => {
		Mostrar_Filtro.value = false
		document.body.style.overflow = "auto"
	}
    // Copiar en Portapapeles //
    const Copiar_Portapapeles = async (codigo, nombre_producto) => {
        try {
            await navigator.clipboard.writeText(codigo)
            Texto_Notificacion.value = `¡Codigo de Barra de ${nombre_producto} copiado al portapapeles!`
            Notificacion_Copiar.value = true
            setTimeout(() => {
                Notificacion_Copiar.value = false
            }, 2500)
        } catch (error) {
            console.error(
                'Error al copiar al portapapeles:', 
                error
            )
            alert("Tu navegador no soporta la función de copiar automáticamente.")
    }}
    // Establecer Texto de Insignia de Estatus de Producto //
	const Estatus_Texto = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅Producto Activo"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌Producto Inactivo"
        }
        return "Indefinido"
	}
    // Establecer Texto de Insignia de Estatus de Promocion //
	const Estatus_Promocion = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅ Promo Activa"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌ Promo Vencida"
        }
        return "Indefinido"
	}
    // Aplicar Filtros //
    const Filtro_Aplicar = () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        })
        Pagina.value = 0
        Backend_Get()
        Cerrar_Filtro()
    }
    // Limpiar Filtros, Orden y Busqueda //
    const Filtro_Limpiar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Orden.value = ""
        Pagina.value = 0
        Busqueda.value = ""
        Filtro_Categorias.value = ""
		Filtro_Fecha_Fin_Maximo.value = ""
		Filtro_Fecha_Fin_Minimo.value = ""
		Filtro_Precio_Nuevo_Maximo.value = ""
		Filtro_Precio_Nuevo_Minimo.value = ""
		Filtro_Fecha_Inicio_Maximo.value = ""
		Filtro_Fecha_Inicio_Minimo.value = ""
		Filtro_Precio_Anterior_Maximo.value = ""
		Filtro_Precio_Anterior_Minimo.value = ""
		Filtro_Estatus.value = 2 
        Filtro_Promocion.value = 2
        Filtro_Promocion_Estatus.value = 2
        Backend_Get()
        Cerrar_Filtro()
        Mostrar_Limpiar_Filtro.value = false
    }
    // Leer Fecha con Formato DD/MM/YYYY //
	const Formato_Fecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
	}}
    // Leer Precio con Formato Pesos Argentinos //
    const Formato_Precios = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }

    // ----- Funciones Backend ----- //
    
    // Leer Datos de los Registros //
    const Backend_Get = async() => {
        let url = new URL (`${backend_url}/registro_precios/historial/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', Paginas_Items.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_promocion', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Fecha de Inicio
        if (Filtro_Fecha_Inicio_Maximo.value !== "") {
            url.searchParams.append('fecha_inicio_max', Filtro_Fecha_Inicio_Maximo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Fecha_Inicio_Minimo.value !== "") {
            url.searchParams.append('fecha_inicio_min', Filtro_Fecha_Inicio_Minimo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Fecha d de Vencimiento
        if (Filtro_Fecha_Fin_Maximo.value !== "") {
            url.searchParams.append('fecha_fin_max', Filtro_Fecha_Fin_Maximo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Fecha_Fin_Minimo.value !== "") {
            url.searchParams.append('fecha_fin_min', Filtro_Fecha_Fin_Minimo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Precios Nuevos
        if (Filtro_Precio_Nuevo_Maximo.value !== "") {
            url.searchParams.append('precio_nuevo_max', Filtro_Precio_Nuevo_Maximo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Precio_Nuevo_Minimo.value !== "") {
            url.searchParams.append('precio_nuevo_min', Filtro_Precio_Nuevo_Minimo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Precios Anteriores
        if (Filtro_Precio_Anterior_Maximo.value !== "") {
            url.searchParams.append('precio_anterior_max', Filtro_Precio_Anterior_Maximo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Precio_Anterior_Minimo.value !== "") {
            url.searchParams.append('precio_anterior_min', Filtro_Precio_Anterior_Minimo.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Promocion
        if (Filtro_Promocion.value === 1) {
            url.searchParams.append('es_promocion', 'true')
            Mostrar_Limpiar_Filtro.value = true
        } else if (Filtro_Promocion.value === 0) {
            url.searchParams.append('es_promocion', 'false')
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Estatus de Promocion
        if (Filtro_Promocion_Estatus.value === 1) {
            url.searchParams.append('promo_activa', 'true')
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Promocion_Estatus.value === 0) {
            url.searchParams.append('promo_activa', 'false')
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Estatus de Producto
        if (Filtro_Estatus.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            Mostrar_Limpiar_Filtro.value = true
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
        const GetBackend = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await GetBackend.json()
        if (Array.isArray(datos)) {
            if (datos.length > Paginas_Items.value) {
                Paginas_Max.value = true
                Historial.value = datos.slice(0, Paginas_Items.value)
            } else {
                Paginas_Max.value = false
                Historial.value = datos
        }} else {
            Historial.value = []
            Paginas_Max.value = false
    }}

</script>