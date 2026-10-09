<template>
	<div class="cuerpo">

        <!-- Confirmacion -->
		<!-- Actualizar Estatus -->
		<Teleport to="body">
			<transition name="fade">
				<div v-if="ActualizarCajaP" 
				@click.self="CerrarPopUp01"
				class="fondo" 
				>
					<div class="popup">

                        <!-- Encabezado -->
						<h1>
							¿Quiere Actualizar el Estado del Pedido?
						</h1>

                        <!-- Botones -->
						<div class="botones">
							<button @click="ActualizarEstatus()"
							class="botoncon"
							>
								Si Confirmo
							</button>
							<button @click="CerrarPopUp01"
							class="botonc"
							>
								Cancelar
							</button>
						</div>

					</div>
				</div>
			</transition>
		</Teleport>

        <!-- Pagina -->
		<div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">

                <!-- Mostrar Fondo en Celular -->
				<transition name="fade">
					<div v-if="(MostrarFiltro || MostrarNuevo)" 
					@click="MostrarFiltro = false; MostrarNuevo = false"
                    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[35] sm:hidden cursor-pointer"
					>
					</div>
				</transition>

                <!-- Barra de Filtros de Pedidos -->
				<div :class="['bar', (MostrarFiltro || MostrarNuevo) 
				? 'translate-x-0 sm:w-72 lg:w-80' 
				: '-translate-x-full sm:w-fit sm:translate-x-0']"
				>

                    <!-- Boton de Filtros -->
                    <div class="hidden sm:block">
						<h1 @click="MostrarFiltro = !MostrarFiltro"
						class="botonfil"
						>
							ᯤ
						</h1>
					</div>

                    <!-- Barra de Filtros -->
                    <transition name="slide">
						<div v-if="MostrarFiltro"
						class="flex flex-col lg:self-center gap-5"
						>

                            <!-- Orden de Pedidos -->
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
        	                            Pedidos Antiguos
                                    </option>
                                    <option value="2">
            	                        Pedidos Recientes
                                    </option>
                                </select>
                            </div>

                            <!-- Filtro de Pedidos -->
							<div class="flex flex-col">

                                <!-- Filtro de Metodo de Pago -->
								<h1>
									Filtro de Metodo de Pago
								</h1>
								<label>
									<input :value="5"
									type="radio" 
									v-model="filtroMP"
									> 
										Todos
								</label>
								<label>
									<input :value="4"
									type="radio" 
									v-model="filtroMP"
									> 
										Paddle
								</label>
								<label>
									<input :value="3"
									type="radio" 
									v-model="filtroMP"
									> 
										Tarjeta de Credito / Debito
								</label>
								<label>
									<input :value="2"
									type="radio"
									v-model="filtroMP"
									> 
										Mercado Pago
								</label>
								<label>
									<input :value="1"
									type="radio"
									v-model="filtroMP"
									> 
										Transferencia Bancaria
								</label>
								<label>
									<input :value="0"
									type="radio"
									v-model="filtroMP"
									> 
										Efectivo
								</label>
							</div>

                            <!-- Filtro de Estatus del Pedido -->
							<div class="flex flex-col">
								<h1>
									Filtro de Estatus
								</h1>
								<label>
									<input :value="4"
									type="radio"
									v-model="filtroEst"
									> 
										Todos
								</label>
								<label>
									<input :value="3"
									type="radio"
									v-model="filtroEst"
									> 
										Preparando
								</label>
								<label>
									<input :value="2"
									type="radio" 
									v-model="filtroEst"
									> 
										En Camino
								</label>
								<label>
									<input :value="1"
									type="radio" 
									v-model="filtroEst"
									> 
										Entregado
								</label>
							</div>

                            <!-- Filtro de Pedido en Promocion -->
							<div class="flex flex-col">
								<h1>
									Filtro de Promocion
								</h1>
								<label>
									<input :value="3"
									type="radio"
									v-model="filtroProm"
									> 
										Todos
								</label>
								<label>
									<input :value="2"
									type="radio" 
									v-model="filtroProm"
									> 
										Compras con Descuento
								</label>
								<label>
									<input :value="1"
									type="radio" 
									v-model="filtroProm"
									> 
										Compras sin Descuento
								</label>
							</div>

                            <!-- Filtro de Ciudad del Cliente -->
							<div class="flex flex-col">
								<h1>
									Ciudad del Cliente
								</h1>
								<div>
									<select v-model="filtrociudad">
										<option value="" disabled>
											Selecciona una Ciudad...
										</option>
										<option v-for="i in ListaCiudad" 
										:key="i.ciudad" 
										:value="i.ciudad"
										>
											{{ i.ciudad }}
										</option>
									</select>
								</div>
							</div>

                            <!-- Filtro de Provincia del Cliente -->
							<div class="flex flex-col">
								<h1>
									Provincia del Cliente
								</h1>
								<div>
									<select v-model="filtroprovincia">
										<option value="" disabled>
											Selecciona una Provincia...
										</option>
										<option v-for="i in ListaProvincia" 
										:key="i.provincia" 
										:value="i.provincia"
										>
											{{ i.provincia }}
										</option>
									</select>
								</div>

							</div>

                        	<!-- Botones -->
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

				</div>

				<!-- Tabla de Pedidos -->
				<div class="start !px-5">

                    <!-- Gif Cargando -->
					<div v-if="CargandoTrue" 
					class="flex flex-col 
					items-center justify-center 
					w-full h-[60vh]"
					>
						<img src="../assets/loading.gif" 
						alt="Cargando todos los pedidos..." 
						class="w-32 h-32 object-contain mb-4"
						>
						<h2 class="text-green-800 font-bold text-xl animate-pulse">
							Cargando todos los pedidos, un momento...
						</h2>
					</div>

                    <!-- Error Cargando -->
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
                            class="botoncon 
							!flex-none !w-auto 
							px-8 shadow-lg shadow-green-900/20"
                            >
                    	        🔄 Recargar Página
                            </button>
                        </div>
                    </div>

                    <!-- Pedidos -->
					<div v-else>
						<div>

                            <!-- Mostrar Boton Filtro en Celular -->
							<button @click="MostrarFiltro = true"
							class="sm:hidden 
							w-full mb-4 py-3 
							bg-white text-green-800 
							font-black text-lg border-2 
							border-green-200 rounded-xl 
							flex items-center justify-center 
							gap-2 shadow-sm transition-all 
							active:scale-95 active:bg-green-50"
							>
								ᯤ Abrir Filtros
							</button>

                            <!-- Barra de Busqueda -->
							<div class="flex flex-row items-stretch w-full gap-3 mb-5">-
								<input @input="BusquedaPedido"
								type="text" 
								v-model="Busqueda" 
								placeholder="Busqueda..."
								class="busqueda !mb-0"
								maxlength="50"
								>
							</div>

						</div>

                        <!-- Encabezado -->
						<h1 class="titulo-config">
						Pedidos
						</h1>

                        <!-- Pedidos -->
						<div v-if="Pedidos.length > 0"
						class="w-full mb-8"
						>
							<div v-for= "i in Pedidos" 
							:key="i.id_pedido"
							class="mb-4"
							>

                                <!-- Datos de Pedido -->
								<div @click="Edicion(i)"
								class="tab"
								>
									<div class="flex flex-col text-left">
										<div class="flex flex-wrap items-center gap-3 mb-2">
											<span :class="Estatuscolor(i.estatus)">
												{{ Estatustxt(i.estatus) }}
											</span>
										</div>
										<p class="text-gray-500 font-medium text-sm">
											💳 Método de Pago: 
											<span class="text-gray-800">
												{{ i.metodo_pago }}
											</span>
										</p>
										<p class="text-gray-500 font-medium text-sm">
											📍 Direccion: 
											<span class="text-gray-800">
												{{ i.direccion[0].calle }} {{ i.direccion[0].numero }}
											</span>
										</p>
										<p class="text-gray-500 font-medium text-sm mt-1">
											💰 Total: 
											<span class="text-green-700 font-bold text-lg">
												$ {{ FormatearPrecio(i.total) }}
											</span>
										</p>
									</div>
									<div class="lilbox !bg-green-50/50 !border-green-100">
										<p class="text-xs text-gray-500 font-bold mb-1">
											Tiempo Est. de Entrega: 
											<span class="text-gray-800">
												{{ i.tiempo_estimado_entrega }} Días
											</span>
										</p>
										<p class="text-xs text-gray-500 font-bold">
											Tiempo de Entrega: 
											<span class="text-gray-800">
												{{ i.tiempo_entrega }} Días
											</span>
										</p>
										<div v-if="i.estatus === 1"
										class="text-green-600 text-sm font-bold 
										mt-3 flex items-center justify-end gap-1"
										>
											{{ PedidoNow === i.id_pedido ? 'Ocultar Detalles ⬆️' : 'Ver Detalles ⬇️' }}
										</div>
										<button v-if="i.estatus !== 1"
										class="bg-gray-800 text-white text-xs 
										my-3 cursor-pointer 
										font-bold px-3 py-2 rounded-lg 
										hover:bg-gray-700 shadow-sm"
										>
											✏️ Editar Estado
										</button>
									</div>
								</div>

                                <!-- Detalles de Pedido -->
                                <transition name="slide">
									<div v-if = "PedidoNow === i.id_pedido"
									class="liltab !border-green-100/50"
									>
										<h3 class="text-lg font-bold text-gray-800 
										border-b border-gray-100 
										mb-3 pb-2">
											🛒 Productos del Pedido
										</h3>
										<div class="flex flex-col gap-2 mb-6">
											<div v-for = "e in i.detalle_pedido" 
											:key="e.id_detalle_pedido"
											class="lilproduct 
											flex flex-col sm:flex-row 
											justify-between items-start 
											sm:items-center py-3 
											border-b border-gray-100"
											>
												<div class="flex flex-col w-full 
												sm:w-1/2 mb-2 sm:mb-0"
												>
													<span class="font-bold text-gray-800 text-base">
														{{ e.producto.nombre }}
													</span>
													<div v-if="e.producto.es_promocion" 
													class="flex flex-wrap items-center 
													gap-2 mt-1"
													>
														<span v-if="e.producto.porcentaje_descuento" 
														class="text-xs font-black text-white 
														bg-green-500 px-1.5 py-0.5 
														rounded shadow-sm"
														>
															{{ e.producto.porcentaje_descuento }} % OFF
														</span>
														<span class="text-xs font-bold text-red-600 
														bg-red-50 px-2 py-0.5 
														rounded-md border border-red-200"
														>
															🔥 {{ e.producto.motivo || 'Oferta' }}
														</span>
													</div>
													<span class="text-xs text-gray-400 font-bold 
													uppercase tracking-wider"
													>
														{{ e.producto.categoria }}
													</span>
												</div>
												<div class="flex flex-row flex-wrap 
												gap-x-6 gap-y-2 
												w-full sm:w-auto 
												justify-between sm:justify-end 
												text-sm"
												>
													<span class="text-gray-500">
														Cant: 
														<b class="text-gray-800">
															{{ e.cantidad }}
														</b>
													</span>
													<div class="flex flex-col items-end">
														<span v-if="e.producto.es_promocion && e.producto.precio_anterior" 
														class="text-xs text-gray-400 font-bold line-through"
														>
															$ {{ FormatearPrecio(e.producto.precio_anterior) }}
														</span>
														<span class="text-gray-500">
															Unidad: 
															<b :class="e.producto.es_promocion 
															? 'text-red-600 font-black' 
															: 'text-gray-800'"
															>
																${{ FormatearPrecio(e.precio_unitario) }}
															</b>
														</span>
													</div>
													<div class="flex flex-col items-end">
														<h2 class="font-bold text-xs text-gray-400">
															Subtotal:
														</h2>
														<h2 class="font-black text-gray-800 text-base">
															$ {{ FormatearPrecio(e.subtotal) }}
														</h2>
													</div>
												</div>
											</div>
                                            <!-- Direccion -->
											<h3 class="text-lg font-bold text-gray-800 
											mb-3 border-b border-gray-100 pb-2"
											>
												📋 Información de Envío
											</h3>
											<div class="lildata">
												<p class="text-gray-500">
													📅 
													<span class="font-semibold text-gray-800">
														Creado:
													</span> 
													{{ FormatoFecha(i.created_at) }}
												</p>
												<p class="text-gray-500">
													🔄 
													<span class="font-semibold text-gray-800">
														Actualizado:
													</span> 
													{{ FormatoFecha(i.updated_at) }}
												</p>
												<p class="text-gray-500">
													🏙️ 
													<span class="font-semibold text-gray-800">
														Ciudad:
													</span> 
													{{ i.direccion[0].ciudad }}
												</p>
												<p class="text-gray-500">
													🗺️ 
													<span class="font-semibold text-gray-800">
														Provincia:
													</span> 
													{{ i.direccion[0].provincia }}
												</p>
											</div>
										</div>
									</div>
                                </transition>

                        		<!-- Botones -->
								<div class="flex flex-row justify-end gap-2 mt-3">
									<button @click= "PedidoCambio(i.id_pedido)"
									v-if="i.estatus !== 1"
									class="bg-green-50 text-green-700 
									border border-green-200 
									text-xs font-bold px-3 py-2 
									rounded-lg hover:bg-green-100 shadow-sm"
									>
										{{ PedidoNow === i.id_pedido ? 'Ocultar ⬆️' : 'Detalles ⬇️' }}
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
								{{ Pagina === 0 ? 'No se encontraron Pedidos 😔' : 'Ya no hay más Pedidos para mostrar 🏁' }}
							</h2>
							<h3 v-if="Pagina === 0" 
							class="text-gray-500 text-center mt-2"
							>
								Prueba buscando con otro término
							</h3>
						</div>

                        <!-- Mostrando Paginas -->
						<div class="flex justify-center p-3">
                            <button @click="CambiarPagina('back')" 
                            :disabled="Pagina === 0 || CargandoTrue"
							class="botona"
							>
								❮
							</button>
							<h2 class="self-center px-6
							font-bold text-green-800 text-center"
							>
								<span v-if="Pedidos.length > 0">
									Mostrando {{ Pagina + 1 }} - {{ Pagina + Pedidos.length }}
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
		urlover8000, 
		SesionExpirada, 
		Iniciado 
	} from './Estatus.js'

	// ----- Variables Complejas ----- //

    // Almacen para Actualizar Estatus del Pedido //
	const EstatusAct = ref({
		id_pedido: "",
		id_cliente: "",
		id_direccion: "",
		metodo_pago: "",
		tiempo_estimado_entrega: "",
		tiempo_entrega: "",
		estatus: ""
	})

    // ----- Variables Booleanas ----- //

	const filtroAct = ref(false)
    const ErrorCarga = ref(false)
    const CargandoTrue = ref(true)
    const HayMasPaginas = ref(false)
	const MostrarFiltro = ref(false)
    const BloqueoPeticion = ref(false)
	const ActualizarCajaP = ref (false)

    // ----- Variables Vacias ----- //

	const orden = ref("")
	const Pedidos = ref([])
	const Busqueda = ref("")
	const PedidoNow = ref(null)
    const ListaCiudad = ref ("")
    const filtrociudad = ref ("")
    const ListaProvincia = ref ("")
    const filtroprovincia = ref ("")

    // ----- Variables Simples ----- //

	const Pagina = ref(0)
	const filtroMP = ref(5)
	const filtroEst = ref(4)
	const filtroProm = ref(3)
    const ItemsPorPagina = ref(24)

    // ----- Funciones Vue ----- //
    
    // Primera Carga de Datos de la Pagina //
	onMounted (() => {
        CargarDatos()
    })
    // Carga de Datos de la Pagina //
    const CargarDatos = (async() => {
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        CargandoTrue.value = true
        ErrorCarga.value = false
        // Tiempo de Espera para el Backend
        const temporizador = setTimeout(() => {
            if (CargandoTrue.value) {
                CargandoTrue.value = false
                ErrorCarga.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
            }
        }, 15000)
        // Leer Pedidos y Direcciones
        try {
			await BusquedaPedido()
			const respuestac = await fetch(`${urlover8000}/direccion/ciudad/`)
			const ciudad = await respuestac.json()
			ListaCiudad.value = ciudad
			const respuestap = await fetch(`${urlover8000}/direccion/provincia/`)
			const provincia = await respuestap.json()
			ListaProvincia.value = provincia
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
    }})
    // Cambiar Pagina //
    const CambiarPagina = async (direccion) => {
        if (BloqueoPeticion.value) return
        BloqueoPeticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        CargandoTrue.value = true
        ErrorCarga.value = false
        // Establecer Valor de Items de Pagina
        if (direccion === 'next') {
            Pagina.value += ItemsPorPagina.value
        } else if (direccion === 'back') {
            Pagina.value -= ItemsPorPagina.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await BusquedaPedido()
        } catch (error) {
            console.error(error)
            ErrorCarga.value = true
        } finally {
            CargandoTrue.value = false
            BloqueoPeticion.value = false
    }}

    // ----- Funciones Frontend ----- //

    // Abrir Pop up para Actualizar Estatus de Pedido //
	const AbrirPopUp01 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden"
	}
    // Aplicar Filtros //
	const AplicarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
		BusquedaPedido()
	}
    // Cerrar Pop up para Actualizar Estatus de Pedido //
	const CerrarPopUp01 = () => {
		ActualizarCajaP.value = false
		document.body.style.overflow = "auto"
	}
    // Establecer Valores de Pedido para Actualizar Estatus y Abrir Pop Up //
	const Edicion = (pedido_fila) => {
		if (pedido_fila.estatus === 1) {
			PedidoCambio(pedido_fila.id_pedido)
			return
		}
		EstatusAct.value.id_pedido = pedido_fila.id_pedido
		EstatusAct.value.id_cliente = pedido_fila.id_cliente
		EstatusAct.value.id_direccion = pedido_fila.id_direccion
		EstatusAct.value.metodo_pago = pedido_fila.metodo_pago
		EstatusAct.value.tiempo_estimado_entrega = pedido_fila.tiempo_estimado_entrega
		EstatusAct.value.tiempo_entrega = pedido_fila.tiempo_entrega
		EstatusAct.value.estatus = pedido_fila.estatus - 1
		AbrirPopUp01()
	}
    // Establecer Color de Insignia de Estatus //
	const Estatuscolor = (id_estatus) => {
		// Entregado
		if (id_estatus === 1) {
			return "globoazul"
		}
		// En Camino
		else if (id_estatus === 2) {
			return "globoamarillo"
		}
		// Preparando
		else if (id_estatus === 3) {
			return "globlanco"
		}
		// Pendiente
		else if (id_estatus === 4) {
			return "globlanco"
		}
			return "globlanco"
	}
    // Establecer Texto de Insignia de Estatus //
	const Estatustxt = (id_estatus) => {
		// Entregado
		if (id_estatus === 1) {
			return "✅ Entregado"
		}
		// En Camino
		else if (id_estatus === 2) {
			return "💨 En Camino"
		}
		// Preparando
		else if (id_estatus === 3) {
			return "🕑 Preparando"
		}
		// Pendiente
		else if (id_estatus === 4) {
			return "⚠️ Pendiente"
		}
			return "indefinido"
	}
    // Leer Fecha con Formato DD/MM/YYYY //
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
	}}
    // Leer Precio con Formato Pesos Argentinos //
	const FormatearPrecio = (precio) => {
		if (precio === null || precio === undefined) return "0"
		return new Intl.NumberFormat('es-AR').format(precio)
	}
    // Limpiar Filtros, Orden y Busqueda //
	const LimpiarFiltro = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
		filtroMP.value = 5
		filtroEst.value = 4
		filtroProm.value = 3
        filtrociudad.value = ""
        filtroprovincia.value = ""
		orden.value = ""
		BusquedaPedido()
		filtroAct.value = false
	}
    // Mostrar Detalles de Pedido //
	const PedidoCambio = (id) => {
		if (PedidoNow.value === id) {
			PedidoNow.value = null
		}
		else {
			PedidoNow.value = id
	}}

    // ----- Funciones Backend ----- //

    // Actualizar Estatus del Pedido //
	const ActualizarEstatus = async() => {
		const ActEst = await fetch(`${urlover8000}/pedidos/id/${EstatusAct.value.id_pedido}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(EstatusAct.value),
			credentials: 'include'
		})
		if (ActEst.status === 401) {
			CerrarSesion()
			alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
			SesionExpirada.value = true
			Iniciado.value = false
			return
		}
		EstatusAct.value = {
			id_pedido: "",
			id_cliente: "",
			id_direccion: "",
			metodo_pago: "",
			tiempo_estimado_entrega: "",
			tiempo_entrega: "",
			estatus: ""
		}
		BusquedaPedido()
		CerrarPopUp01()
	}
    // Keer Datos del Pedido //
	const BusquedaPedido = async() => {
		let url = new URL (`${urlover8000}/pedidos/all/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', ItemsPorPagina.value + 1)
        // Establecer Busqueda
		if (Busqueda.value !== "") {
			url.searchParams.append('busqueda_pedido', Busqueda.value)
		}
        // Establecer Orden
        if (orden.value !== "") {
            url.searchParams.append('orden', orden.value)
            filtroAct.value = true
        }
        // Establecer Filtro de Metodo de Pago
		let mpfiltro = ""
		if (filtroMP.value === 5) {
			mpfiltro = ""
		}
		else if (filtroMP.value === 4) {
			mpfiltro = "Paddle"
		}
		else if (filtroMP.value === 3) {
			mpfiltro = "Tarjeta de Crédito"
		}
		else if (filtroMP.value === 2) {
			mpfiltro = "MercadoPago"
		}
		else if (filtroMP.value === 1) {
			mpfiltro = "Transferencia"
		}
		else if (filtroMP.value === 0) {
			mpfiltro = "Efectivo"
		}
		if (filtroMP.value !== 5 && mpfiltro !== "") {
			url.searchParams.append('filtromp', mpfiltro)
			filtroAct.value = true
		}
        // Establecer Filtro de Estatus de los Pedidos
		if (filtroEst.value !== 4) {
			url.searchParams.append('filtroest', filtroEst.value)
			filtroAct.value = true
		}
        // Establecer Filtro en Promocion
		if (filtroProm.value !== 3) {
			const esPromoBool = filtroProm.value === 2 ? 'true' : 'false'
            url.searchParams.append('filtroprom', esPromoBool)
            filtroAct.value = true
		}
        // Establecer Filtro Direcciones
        if (filtrociudad.value !== "") {
            url.searchParams.append('busqueda_pedido', filtrociudad.value)
            filtroAct.value = true
        }
        if (filtroprovincia.value !== "") {
            url.searchParams.append('busqueda_pedido', filtroprovincia.value)
            filtroAct.value = true
        }
		const BusqPedido = await fetch(url, {
			method: 'GET',
            credentials: 'include'
		})
		const datos = await BusqPedido.json()
		Pedidos.value = datos
        if (Array.isArray(datos)) {
            if (datos.length > ItemsPorPagina.value) {
                HayMasPaginas.value = true
                Pedidos.value = datos.slice(0, ItemsPorPagina.value)
            } else {
                HayMasPaginas.value = false
                Pedidos.value = datos
        }} else {
            Pedidos.value = []
            HayMasPaginas.value = false
    }}
</script>