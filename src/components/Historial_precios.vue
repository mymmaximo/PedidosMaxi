<template>
    <div class="cuerpo">
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="bar">
                    <div>
                        <h1
                        @click="MostrarFiltro = !MostrarFiltro"
                        class="botonfil"
                        >
                        ᯤ
                        </h1>
                    </div>
                    <transition name="slide">
                        <div
                        class="flex flex-col lg:self-center"
                        v-if="MostrarFiltro"
                        >
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h1>
                                Ordenar
                                </h1>
                                <select 
                                v-model="orden" 
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
                                    Fecha ascendente
                                    </option>
                                    <option value="4">
                                    Fecha descendente
                                    </option>
                                    <option value="5">
                                    Precio nuevo menor
                                    </option>
                                    <option value="6">
                                    Precio nuevo mayor
                                    </option>
                                    <option value="7">
                                    Precio viejo menor
                                    </option>
                                    <option value="8">
                                    Precio viejo mayor
                                    </option>
                                    <option value="9">
                                    Categoria A-Z
                                    </option>
                                    <option value="10">
                                    Categoria Z-A
                                    </option>
                                </select>
                            </div>
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2">
                                Filtros de Fecha de Actualizacion
                                </h2>
                                <input 
                                type="date"
                                v-model="fecha_upgrade_max" 
                                placeholder="Fecha de Actualizacion Max..."
                                >
                                <input
                                type="date"
                                v-model="fecha_upgrade_min" 
                                placeholder="Fecha de Actualizacion Min..."
                                >
                            </div>
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2">
                                Filtros de Precio Viejo
                                </h2>
                                <input 
                                type="date"
                                v-model="precio_viejo_max" 
                                placeholder="Precio Viejo Max..."
                                maxlength="10"
                                >
                                <input
                                type="date"
                                v-model="precio_viejo_min" 
                                placeholder="Precio Viejo Min..."
                                maxlength="10"
                                >
                            </div>
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2">
                                Filtros de Precio Nuevo
                                </h2>
                                <input 
                                type="number"
                                v-model="precio_nuevo_max" 
                                placeholder="Precio Nuevo Max..."
                                maxlength="10"
                                >
                                <input
                                type="number"
                                v-model="precio_nuevo_min" 
                                placeholder="Precio Nuevo Min..."
                                maxlength="10"
                                >
                            </div>
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2">
                                Filtro Categoria
                                </h2>
                                <div>
                                    <select 
                                    v-model="filtrocat" 
                                    >
                                        <option value="" disabled>
                                        Categorias...
                                        </option>
                                        <option 
                                        v-for="i in ListaCategoria" 
                                        :key="i.categoria" 
                                        :value="i.categoria"
                                        >
                                        {{ i.categoria }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div
                            class="flex flex-col md:p-4 p-2"
                            >
                                <h2 class="p-2">
                                ¿El Productos esta Activo?
                                </h2>
                                <div 
                                class="
                                flex flex-col 
                                p-2 gap-2
                                ">
                                    <label>
                                    <input 
                                    type="radio" 
                                    :value="2"
                                    v-model="bool_activo "
                                    > 
                                    Todos los Productos
                                    </label>
                                    <label>
                                    <input 
                                    type="radio" 
                                    :value="1"
                                    v-model="bool_activo"
                                    > 
                                    Productos Activos
                                    </label>
                                    <label>
                                    <input 
                                    type="radio" 
                                    :value="0"
                                    v-model="bool_activo"
                                    > 
                                    Productos Eliminados
                                    </label>
                                </div>
                            </div>
                            <div class="botones">
                                <button 
                                @click="AplicarFiltro" 
                                class="botoncon">
                                Aplicar Filtros
                                </button>
                                <button 
                                @click="LimpiarFiltro"
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
                        <img 
                        src="../assets/loading.gif" 
                        alt="Cargando historial de precios..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 
                        class="text-green-800 
                        font-bold text-xl animate-pulse"
                        >
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
                        <button 
                        @click="CargarDatos" 
                        class="botoncon mt-4"
                        >
                        🔄 Recargar Página
                        </button>
                    </div>
                    <div v-else>
                        <!-- Barra de Busqueda -->
                        <input
                        @input="BusquedaHistorial"
                        type="text" 
                        v-model="Busqueda" 
                        placeholder="Busqueda de Historial..."
                        class="busqueda"
                        maxlength="50"
                        >
                        <h1 class="text-center">
                        Historial de Precios
                        </h1>
                        <!-- Tabla de Historial de Precios -->
                        <div v-if="Historial.length > 0">
                            <div
                            class="mb-2 lg:mb-5"
                            v-for= "i in Historial" 
                            :key="i.id">
                                <div 
                                :class="Estatuscolor(i.activo)"
                                class="tab"
                                >
                                    <div class="flex flex-col">
                                        <div class="flex flex-row">
                                            <h1>
                                            {{ i.nombre }}
                                            </h1>
                                        </div>
                                        <div class="flex flex-col">
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
                                    <div class="flex flex-col ml-auto text-right items-end">
                                        <h2>
                                        <span class="hidden lg:inline 2xl:inline">
                                        Precio Viejo: 
                                        </span>
                                        {{ i.precio_viejo }}
                                        </h2>
                                        <h2>
                                        <span class="hidden lg:inline 2xl:inline">
                                        Precio Nuevo: 
                                        </span>
                                        {{ i.precio_nuevo }}
                                        </h2>
                                        <h2>
                                        <span class="hidden lg:inline 2xl:inline">
                                        Fecha de Act: 
                                        </span>
                                        {{ FormatoFecha(i.updated_at) }}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <h2>
                            No se encontraron Cambios en Precios
                            </h2>
                            <h3>
                            Prueba buscando con otro termino
                            </h3>
                        </div>
                        <div 
                        class="
                        flex justify-center
                        p-3"
                        >
                            <button 
                            @click="Pagina = Pagina - 20 ; CargarDatos()" 
                            :disabled="Pagina < 20"
                            class="botona"
                            >
                            ❮
                            </button>
                            <h2 class="item">
                            Items 
                            {{ 0 + Pagina }}
                            - 
                            {{ Pagina + Historial.length }}
                            </h2>
                            <button 
                            @click="Pagina = Pagina + 20 ; CargarDatos()" 
                            :disabled="Historial.length < 20"
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
    import { onMounted, ref } from 'vue'
    import { urlover8000 } from './Estatus.js'
    // ----- Variables Booleanas ----- //
	const filtroAct = ref (false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
	const FiltroCaja = ref (false)
	const MostrarFiltro = ref (false)
    // ----- Variables Vacias ----- //
	const orden = ref ("")
    const Historial = ref([])
	const Busqueda = ref ("")
	const filtrocat = ref ("")
	const bool_activo = ref ("")
    const ListaCategoria = ref ("")
	const precio_nuevo_max = ref ("")
	const precio_nuevo_min = ref ("")
	const precio_viejo_max = ref ("")
	const precio_viejo_min = ref ("")
	const fecha_upgrade_max = ref ("")
	const fecha_upgrade_min = ref ("")
    // ----- Variables Simples ----- //
	const Pagina = ref (0)
    // ----- Funciones Vue ----- //
    onMounted (() => {
        CargarDatos()
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
        }
	})
    // ----- Para el Frontend ----- //
    const AplicarFiltro = () => {
        BusquedaHistorial();
        CerrarPopUp01()
    }
	const CerrarPopUp01 = () => {
		FiltroCaja.value = false
		document.body.style.overflow = "auto";
	}
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "si"
        }
        else if (id_estatus === false) {
            return "no"
        }
    }
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
		}
	}
    const LimpiarFiltro = () => {
		fecha_upgrade_max.value = ""
		fecha_upgrade_min.value = ""
		precio_nuevo_max.value = ""
		precio_nuevo_min.value = ""
		precio_viejo_max.value = ""
		precio_viejo_min.value = ""
        filtrocat.value = ""
		bool_activo.value = 1
        BusquedaHistorial();
        CerrarPopUp01()
        filtroAct.value = true;            
    }
    // ----- Para el Backend ----- //
    const BusquedaHistorial = async() => {
        let url = new URL (`${urlover8000}/historial/`);
		url.searchParams.append('skip', Pagina.value);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_historial', Busqueda.value);
        }
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
        }
        if (fecha_upgrade_max.value !== "") {
            url.searchParams.append('fecha_upgrade_max', fecha_upgrade_max.value)
            filtroAct.value = true
        }
        if (fecha_upgrade_min.value !== "") {
            url.searchParams.append('fecha_upgrade_min', fecha_upgrade_min.value)
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
        if (precio_viejo_max.value !== "") {
            url.searchParams.append('precio_viejo_max', precio_viejo_max.value)
            filtroAct.value = true
        }
        if (precio_viejo_min.value !== "") {
            url.searchParams.append('precio_viejo_min', precio_viejo_min.value)
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
        Historial.value = datos
		CerrarPopUp01()
    }
</script>