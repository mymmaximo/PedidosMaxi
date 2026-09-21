<template>
    <div class="cuerpo">
        <!-- Notificación de Copiado Exitoso -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="MostrarNotificacion" 
                class="notificacion !bg-blue-300 !text-white"
                >
                    <span class="text-xl drop-shadow-sm">
                    ✅ 
                    </span>
                    <span>
                    {{ TextoNotificacion }}
                    </span>
                </div>
            </transition>
        </Teleport>
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
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
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                Filtros de Fecha de Actualizacion
                                </h2>
                                <input placeholder="Fecha de Actualizacion Max..."
                                type="date"
                                v-model="fecha_inicio_max" 
                                >
                                <input placeholder="Fecha de Actualizacion Min..."
                                type="date"
                                v-model="fecha_inicio_min" 
                                >
                                <input placeholder="Fecha de Actualizacion Max..."
                                type="date"
                                v-model="fecha_fin_max" 
                                >
                                <input placeholder="Fecha de Actualizacion Min..."
                                type="date"
                                v-model="fecha_fin_min" 
                                >
                            </div>
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                Filtros de Precio Viejo
                                </h2>
                                <input placeholder="Precio Anterior Max..."
                                type="number"
                                v-model="precio_anterior_max" 
                                maxlength="10"
                                >
                                <input placeholder="Precio Anterior Min..."
                                type="number"
                                v-model="precio_anterior_min" 
                                maxlength="10"
                                >
                            </div>
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                Filtros de Precio Nuevo
                                </h2>
                                <input placeholder="Precio Nuevo Max..."
                                type="number"
                                v-model="precio_nuevo_max" 
                                maxlength="10"
                                >
                                <input placeholder="Precio Nuevo Min..."
                                type="number"
                                v-model="precio_nuevo_min"
                                maxlength="10"
                                >
                            </div>
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
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
                                <h2 class="p-2 text-green-800 font-bold">
                                Tipo de Registro
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
                                    <label class="cursor-pointer">
                                        <input :value="2"
                                        type="radio" 
                                        v-model="es_promocion_filtro"
                                        class="accent-green-600 mr-1"
                                        > 
                                        Todos (Historial Completo)
                                    </label>
                                    <label class="cursor-pointer text-red-600 font-semibold">
                                        <input :value="1"
                                        type="radio" 
                                        v-model="es_promocion_filtro"
                                        class="accent-red-500 mr-1"
                                        > 
                                        🔥 Solo Ofertas Temporales
                                    </label>
                                    <label class="cursor-pointer text-blue-600 font-semibold">
                                        <input :value="0"
                                        type="radio" 
                                        v-model="es_promocion_filtro"
                                        class="accent-blue-500 mr-1"
                                        > 
                                        🔄 Solo Cambios Fijos de Precio
                                    </label>
                                </div>
                            </div>
                            <div class="flex flex-col md:p-4 p-2">
                                <h2 class="p-2">
                                ¿El Productos esta Activo?
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
                                    <label>
                                    <input :value="2"
                                    type="radio" 
                                    v-model="bool_activo"
                                    > 
                                    Todos los Productos
                                    </label>
                                    <label>
                                    <input :value="1"
                                    type="radio" 
                                    v-model="bool_activo"
                                    > 
                                    Productos Activos
                                    </label>
                                    <label>
                                    <input :value="0"
                                    type="radio" 
                                    v-model="bool_activo"
                                    > 
                                    Productos Eliminados
                                    </label>
                                </div>
                            </div>
                            <div v-if="es_promocion_filtro === 1"
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2 text-indigo-800 font-bold">
                                ¿El Registro / Promo está Vigente?
                                </h2>
                                <div class="flex flex-col p-2 gap-2">
                                    <label class="cursor-pointer">
                                        <input :value="2"
                                        type="radio" 
                                        v-model="promo_activa_filtro"
                                        class="accent-indigo-600 mr-1"
                                        > 
                                        Todos (Vigentes y Borrados)
                                    </label>
                                    <label class="cursor-pointer">
                                        <input :value="1"
                                        type="radio" 
                                        v-model="promo_activa_filtro"
                                        class="accent-indigo-600 mr-1"
                                        > 
                                        Solo Vigentes
                                    </label>
                                    <label class="cursor-pointer text-gray-500">
                                        <input :value="0"
                                        type="radio" 
                                        v-model="promo_activa_filtro"
                                        class="accent-gray-500 mr-1"
                                        > 
                                        Solo Eliminados / Vencidos
                                    </label>
                                </div>
                            </div>
                            <div class="botones">
                                <button @click="AplicarFiltro" 
                                class="botoncon">
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
                </div>
                <!-- Tabla de Historial de Precios -->
                <div class="start !px-5">
                    <div v-if="CargandoTrue" 
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
                        <button @click="MostrarFiltro = true"
                        class="sm:hidden w-full mb-4 py-3 bg-white text-green-800 font-black text-lg border-2 border-green-200 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 active:bg-green-50"
                        >
                        ᯤ Abrir Filtros
                        </button>
                        <!-- Barra de Busqueda -->
						<div class="flex flex-row items-stretch w-full gap-3 mb-5">-
							<input @input="BusquedaHistorial"
							type="text" 
							v-model="Busqueda" 
							placeholder="Busqueda..."
							class="busqueda !mb-0"
							maxlength="50"
							>
							<button @click="VistaLista = !VistaLista"
							title="Alternar Vista"
							class="botonvista"
							>
								<span v-if="!VistaLista" class="text-xl">
								「 」
								</span>
								<span v-else class="text-xl">
								☰
								</span>
							</button>
						</div>
                        <h1 class="titulo-config">
                        Registro de Precios
                        </h1>
                        <!-- Tabla de Historial de Precios -->
                        <div v-if="Historial.length > 0"
                        :class="VistaLista 
                        ? 'flex flex-col gap-4 w-full' 
                        :'grid grid-cols-4 gap-6'"
                        >
                            <div v-for= "i in Historial" 
                            :key="i.id"
                            @click="CopiarAlPortapapeles(i.codigo_barra, i.nombre)"
                            :class="VistaLista 
                            ? 'tarjeta-premium z-10 relative bg-white !mb-6 !w-full !m-0 hover:!shadow-lg' 
                            : 'carta relative'"
                            >
                                <div class="flex flex-col text-left">
                                    <div class="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 class="text-xl font-black text-gray-800">
                                        {{ i.nombre }}
                                        </h2>
                                        <span class="text-xs font-bold 
                                        px-3 py-1 
                                        rounded-full border shadow-sm"
                                        :class="(i.activo === 1 || i.activo === true) ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'">
                                        {{ Estatustxt(i.activo) }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-xs font-bold 
                                        px-3 py-1 
                                        rounded-full border shadow-sm"
                                        :class="(i.activa === 1 || i.activa === true) ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'">
                                        {{ EstatusPromotxt(i.activa) }}
                                        </span>
                                        <h2 class="mb-2">
                                        <span class="px-2 py-1 rounded-full 
                                        text-xs font-bold text-white 
                                        shadow-sm" 
                                        :class="i.es_promocion ? 'bg-red-500' : 'bg-blue-500'"
                                        >
                                        {{ i.es_promocion ? '🔥 Oferta' : '🔄 Cambio' }}
                                        </span>
                                        <span v-if="i.motivo" 
                                        class="ml-2 font-semibold 
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
                                    $ {{ FormatearPrecio(i.precio_anterior) }}
                                    </h2>
                                    <h2>
                                    <span class="text-gray-500 font-medium text-sm">
                                    Precio Nuevo: 
                                    </span
                                    class="font-bold" 
                                    :class="i.precio_nuevo < i.precio_anterior ? 'text-green-600' : 'text-red-600'"
                                    >
                                    $ {{ FormatearPrecio(i.precio_nuevo) }}
                                    </h2>
                                    <h2 v-if="i.es_promocion && i.porcentaje_descuento">
                                    <span class="text-gray-500 font-medium text-sm">
                                    Descuento:
                                    </span>
                                    {{ i.porcentaje_descuento }}%
                                    </h2>
                                    <h2>
                                    <span class="text-gray-500 font-medium text-sm">
                                    Fecha Inicio: 
                                    </span>
                                    {{ FormatoFecha(i.fecha_inicio) }}
                                    </h2>
                                    <h2>
                                    <span class="text-gray-500 font-medium text-sm">
                                    Fecha Fin: 
                                    </span>
                                    {{ FormatoFecha(i.fecha_fin) }}
                                    </h2>
                                </div>
                            </div>
                        </div>
                            <div v-else class="flex flex-col items-center justify-center p-8">
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                {{ Pagina === 0 ? 'No se encontraron Historial 😔' : 'Ya no hay más Historial para mostrar 🏁' }}
                                </h2>
                                <h3 v-if="Pagina === 0" class="text-gray-500 text-center mt-2">
                                Prueba buscando con otro término
                                </h3>
                            </div>
                        <div class="flex justify-center p-3">
                            <button @click="CambiarPagina('back')" 
                            :disabled="Pagina === 0 || CargandoTrue"
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
</template>

<script setup>
    // ----- Imports ----- //
    import { 
        onMounted, 
        ref 
    } from 'vue'
    import { 
        urlover8000 
    } from './Estatus.js'
    // ----- Variables Booleanas ----- //
    const VistaLista = ref(true)
	const filtroAct = ref (false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const HayMasPaginas = ref(false)
	const MostrarFiltro = ref (false)
    const BloqueoPeticion = ref(false)
    const MostrarNotificacion = ref(false)
    // ----- Variables Vacias ----- //
	const orden = ref ("")
    const Historial = ref([])
	const Busqueda = ref ("")
	const filtrocat = ref ("")
    const ListaCategoria = ref ("")
	const precio_nuevo_max = ref ("")
	const precio_nuevo_min = ref ("")
	const precio_anterior_max = ref ("")
	const precio_anterior_min = ref ("")
    const TextoNotificacion = ref("")
	const fecha_inicio_max = ref ("")
	const fecha_inicio_min = ref ("")
	const fecha_fin_max = ref ("")
	const fecha_fin_min = ref ("")
    // ----- Variables Simples ----- //
	const Pagina = ref (0)
	const bool_activo = ref (2)
    const ItemsPorPagina = ref(24)
    const es_promocion_filtro = ref(2)
    const promo_activa_filtro = ref (2)
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
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
            await BusquedaHistorial()
            const respuesta = await fetch(`${urlover8000}/producto/categorias/`)
            const categ = await respuesta.json()
            ListaCategoria.value = categ
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
    // ----- Para el Frontend ----- //
    const AplicarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        BusquedaHistorial()
        CerrarPopUp01()
    }
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
            await BusquedaHistorial()
        } catch (error) {
            console.error(error)
            ErrorCarga.value = true
        } finally {
            CargandoTrue.value = false
            BloqueoPeticion.value = false
        }
    }
	const CerrarPopUp01 = () => {
		MostrarFiltro.value = false
		document.body.style.overflow = "auto"
	}
    const CopiarAlPortapapeles = async (codigo, nombre_producto) => {
        try {
            await navigator.clipboard.writeText(codigo)
            TextoNotificacion.value = `¡Codigo de Barra de ${nombre_producto} copiado al portapapeles!`
            MostrarNotificacion.value = true
            setTimeout(() => {
                MostrarNotificacion.value = false
            }, 2500)
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error)
            alert("Tu navegador no soporta la función de copiar automáticamente.")
        }
    }
	const Estatustxt = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅ Activo"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌ Inactivo"
        }
        return "Indefinido"
	}
	const EstatusPromotxt = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅ Promo Activa"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌ Promo Vencida"
        }
        return "Indefinido"
	}
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
		}
	}
    const FormatearPrecio = (precio) => {
        if (precio === null || precio === undefined) return "0"
        return new Intl.NumberFormat('es-AR').format(precio)
    }
    const LimpiarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
		fecha_inicio_max.value = ""
		fecha_inicio_min.value = ""
		fecha_fin_max.value = ""
		fecha_fin_min.value = ""
		precio_nuevo_max.value = ""
		precio_nuevo_min.value = ""
		precio_anterior_max.value = ""
		precio_anterior_min.value = ""
        filtrocat.value = ""
		bool_activo.value = 2 
        promo_activa_filtro.value = 2
        es_promocion_filtro.value = 2
        orden.value = ""
        BusquedaHistorial()
        CerrarPopUp01()
        filtroAct.value = false
    }
    // ----- Para el Backend ----- //
    const BusquedaHistorial = async() => {
        let url = new URL (`${urlover8000}/registro_precios/historial/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', ItemsPorPagina.value + 1)
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_promocion', Busqueda.value)
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
        }
        if (fecha_inicio_max.value !== "") {
            url.searchParams.append('fecha_inicio_max', fecha_inicio_max.value)
            filtroAct.value = true
        }
        if (fecha_inicio_min.value !== "") {
            url.searchParams.append('fecha_inicio_min', fecha_inicio_min.value)
            filtroAct.value = true
        }
        if (fecha_fin_max.value !== "") {
            url.searchParams.append('fecha_fin_max', fecha_fin_max.value)
            filtroAct.value = true
        }
        if (fecha_fin_min.value !== "") {
            url.searchParams.append('fecha_fin_min', fecha_fin_min.value)
            filtroAct.value = true
        }
        if (precio_nuevo_max.value !== "") {
            url.searchParams.append('precio_nuevo_max', precio_nuevo_max.value)
            filtroAct.value = true
        }
        if (precio_nuevo_min.value !== "") {
            url.searchParams.append('precio_nuevo_min', precio_nuevo_min.value)
            filtroAct.value = true
        }
        if (precio_anterior_max.value !== "") {
            url.searchParams.append('precio_anterior_max', precio_anterior_max.value)
            filtroAct.value = true
        }
        if (precio_anterior_min.value !== "") {
            url.searchParams.append('precio_anterior_min', precio_anterior_min.value)
            filtroAct.value = true
        }
        if (es_promocion_filtro.value === 1) {
            url.searchParams.append('es_promocion', 'true')
            filtroAct.value = true
        } else if (es_promocion_filtro.value === 0) {
            url.searchParams.append('es_promocion', 'false')
            filtroAct.value = true
        }
        if (promo_activa_filtro.value === 1) {
            url.searchParams.append('promo_activa', 'true')
            filtroAct.value = true
        }
        if (promo_activa_filtro.value === 0) {
            url.searchParams.append('promo_activa', 'false')
            filtroAct.value = true
        }
        if (bool_activo.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            filtroAct.value = true
        }
        if (bool_activo.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            filtroAct.value = true
        }
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value)
            filtroAct.value = true
        }
        const BusqProducto = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await BusqProducto.json()
        if (Array.isArray(datos)) {
            if (datos.length > ItemsPorPagina.value) {
                HayMasPaginas.value = true
                Historial.value = datos.slice(0, ItemsPorPagina.value)
            } else {
                HayMasPaginas.value = false
                Historial.value = datos
            }
        } else {
            Historial.value = []
            HayMasPaginas.value = false
        }
    }
</script>