<template>
    <div>
        <input
        @input="BusquedaHistorial"
        type="text" 
        v-model="Busqueda" 
        placeholder="Busqueda..."
        class="busqueda"
        >
        <button @click="AbrirPopUp1" class="botoncentro">
        🗃️Filtros
        </button>
        
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="FiltroCaja">
                <div class="caja_editar">
                    <h2>
                    Filtros de Historial
                    </h2>
                    <div>
						<h2>
						Filtros de Fecha de Actualizacion
						</h2>
                        <input 
                        type="number"
                        v-model="fecha_upgrade_max" 
                        placeholder="Fecha de Actualizacion Max..."
                        >
                        <input
                        type="number"
                        v-model="fecha_upgrade_min" 
                        placeholder="Fecha de Actualizacion Min..."
                        >
                    </div>
                    <div>
						<h2>
						Filtros de Precio Viejo
						</h2>
                        <input 
                        type="number"
                        v-model="precio_viejo_max" 
                        placeholder="Precio Viejo Max..."
                        >
                        <input
                        type="number"
                        v-model="precio_viejo_min" 
                        placeholder="Precio Viejo Min..."
                        >
                    </div>
                    <div>
						<h2>
						Filtros de Precio Nuevo
						</h2>
                        <input 
                        type="number"
                        v-model="precio_nuevo_max" 
                        placeholder="Precio Nuevo Max..."
                        >
                        <input
                        type="number"
                        v-model="precio_nuevo_min" 
                        placeholder="Precio Nuevo Min..."
                        >
                    </div>
                    <div>
                        <h2>
                        Filtro Categoria
                        </h2>
                        <div>
                            <select v-model="filtrocat" class="seleccion">
                                <option v-for="i in ListaCategoria" :key="i.categoria" :value="i.categoria">
                                {{ i.categoria }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h2>
                        ¿El Productos esta Activo?
                        </h2>
                        <div class="caja_radios">
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
                    <button @click="AplicarFiltro" class="Boton_Crear">
                    Aplicar Filtros
                    </button>
                    <button @click="LimpiarFiltro" class="Boton_Crear" v-if="filtroAct === true">
                    🗑️ Limpiar Filtro
                    </button>
                    <button @click="CerrarPopUp1" class="Boton_Crear">
                    Cerrar
                    </button>
                </div>
            </div>
        </Teleport>

		<div class="contenedor_principal">
			<h1>
			Historial de Pedidos
			</h1>
			<div class="contenedor_tabla" v-if="Historial.length > 0">
				<table class="tabla">
					<thead class="Cabeza">
						<tr>
							<th>
							Nombre Producto
							</th>
							<th>
							Categoria
							</th>
							<th>
							Codigo de Barras
							</th>
							<th>
							Precio Viejo
							</th>
							<th>
							Precio Nuevo
							</th>
							<th>
							Fecha de Actualizacion
							</th>
							<th>
							Activo
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for= "i in Historial" :key="i.id">
							<td>
							{{ i.nombre }}
							</td>
							<td>
							{{ i.categoria }}
							</td>
							<td>
							{{ i.codigo_barra }}
							</td>
							<td>
							${{ i.precio_viejo }}
							</td>
							<td>
							${{ i.precio_nuevo }}
							</td>
							<td>
							{{ FormatoFecha(i.updated_at) }}
							</td>
                            <td :class="Estatuscolor(i.activo)">
                            {{ Estatustxt(i.activo) }}
                            </td>
						</tr>
					</tbody>
				</table>
			</div>
            <div v-else>
                <h3>No se encontraron Cambios en Precios</h3>
                <p>Prueba buscando con otro termino</p>
            </div>
			<button @click="Pagina = Pagina - 20 ; BusquedaHistorial()" :disabled="Pagina < 20">
			⬅
			</button>
			<button @click="Pagina = Pagina + 20 ; BusquedaHistorial()" :disabled="Historial.length < 20">
			➡
			</button>
		</div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    onMounted(async() => {
        BusquedaHistorial()
        const respuesta = await fetch("http://localhost:8000/producto/categorias/")
        const categ = await respuesta.json()
        ListaCategoria.value = categ
	})
	const Busqueda = ref ("")
	const FiltroCaja = ref (false)
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
		CerrarPopUp1()
    }
	const AbrirPopUp1 = () => {
		FiltroCaja.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp1 = () => {
		FiltroCaja.value = false
		document.body.style.overflow = "auto";
	}
    const AplicarFiltro = () => {
        BusquedaHistorial();
        CerrarPopUp1()
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
        CerrarPopUp1()
        filtroAct.value = true;            
    }
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
		}
	}
    const Estatuscolor = (id_estatus) => {
        if (id_estatus === true) {
            return "classActivo"
        }
        else if (id_estatus === false) {
            return "classEliminado"
        }
    }
    const Estatustxt = (id_estatus) => {
        if (id_estatus === true) {
            return "Activo"
        }
        else if (id_estatus === false) {
            return "Eliminado"
        }
    }
</script>

<style scoped>
	.Cabeza{
		background-color: #cbb8ff;
		color: #130069;
		text-align: center;
	}
</style>