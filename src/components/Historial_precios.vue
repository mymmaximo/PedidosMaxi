<template>
    <div class="cuerpo">
        <div class="pagina">
            <div class="bar">
                <div>
                    <h1
                    @click="MostrarFiltro = !MostrarFiltro"
                    class="botonfil"
                    >
                    ᯤ
                    </h1>
                </div>
                <div
                class="flex flex-col lg:self-center"
                v-if="MostrarFiltro"
                >
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
            </div>
            <div class="start">
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
                Historial de Pedidos
                </h1>
                <!-- Tabla de Historial de Precios -->
                <div
                v-if="Historial.length > 0"
                >
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
                <div 
                v-else
                >
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
                    @click="Pagina = Pagina - 20 ; BusquedaHistorial()" 
                    :disabled="Pagina < 20"
                    class="botona"
                    >
                    🢀
                    </button>
                    <h2 class="item">
                    Items 
                    {{ 0 + Pagina }}
                    - 
                    {{ Pagina + Historial.length }}
                    </h2>
                    <button 
                    @click="Pagina = Pagina + 20 ; BusquedaHistorial()" 
                    :disabled="Historial.length < 20"
                    class="botona"
                    >
                    🢂
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    // ----- Imports ----- //
    import { onMounted, ref } from 'vue'
    // ----- Variantes ----- //
	const Busqueda = ref ("")
	const FiltroCaja = ref (false)
	const MostrarFiltro = ref (false)
	const filtroAct = ref (false)
	const fecha_upgrade_max = ref ("")
	const fecha_upgrade_min = ref ("")
	const precio_nuevo_max = ref ("")
	const precio_nuevo_min = ref ("")
	const precio_viejo_max = ref ("")
	const precio_viejo_min = ref ("")
    const ListaCategoria = ref ("")
	const bool_activo = ref ("")
	const filtrocat = ref ("")
    const Historial = ref([])
	const Pagina = ref (0)
    // ----- Funciones Vue ----- //
    onMounted(async() => {
        BusquedaHistorial()
        const respuesta = await fetch("http://localhost:8000/producto/categorias/")
        const categ = await respuesta.json()
        ListaCategoria.value = categ
	})
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		FiltroCaja.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp01 = () => {
		FiltroCaja.value = false
		document.body.style.overflow = "auto";
	}
    const AplicarFiltro = () => {
        BusquedaHistorial();
        CerrarPopUp01()
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
    const Estatustxt = (id_estatus) => {
        if (id_estatus === true) {
            return "Activo"
        }
        else if (id_estatus === false) {
            return "Eliminado"
        }
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
    // ----- Para el Backend ----- //
    const BusquedaHistorial = async() => {
        let url = new URL ('http://localhost:8000/historial/');
		url.searchParams.append('skip', Pagina.value);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value);
        }
        if (fecha_upgrade_max.value !== "") {
            url.searchParams.append('fecha_upgrade_max', fecha_upgrade_max.value);
            filtroAct.value = true;
        }
        if (fecha_upgrade_min.value !== "") {
            url.searchParams.append('fecha_upgrade_min', fecha_upgrade_min.value);
            filtroAct.value = true;
        }
        if (precio_nuevo_max.value !== "") {
            url.searchParams.append('precio_nuevo_max', precio_nuevo_max.value);
            filtroAct.value = true;
        }
        if (precio_nuevo_min.value !== "") {
            url.searchParams.append('precio_nuevo_min', precio_nuevo_min.value);
            filtroAct.value = true;
        }
        if (precio_viejo_max.value !== "") {
            url.searchParams.append('precio_viejo_max', precio_viejo_max.value);
            filtroAct.value = true;
        }
        if (precio_viejo_min.value !== "") {
            url.searchParams.append('precio_viejo_min', precio_viejo_min.value);
            filtroAct.value = true;
        }
        if (bool_activo.value === 1) {
            url.searchParams.append('bool_activo', 'true');
            filtroAct.value = true;
        }
        if (bool_activo.value === 0) {
            url.searchParams.append('bool_activo', 'false');
            filtroAct.value = true;
        }
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value);
            filtroAct.value = true;            
        }
        const BusqProducto = await fetch(url)
        const datos = await BusqProducto.json();
        Historial.value = datos;
		CerrarPopUp01()
    }
</script>