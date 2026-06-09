<template>
	<!-- Confirmar Actualizar Estatus -->
	<Teleport to="body">
		<div
		v-if="ActualizarCajaP" 
		class="fondo" 
		>
			<div 
			class="popup"
			>
				<h1>
				¿Quiere Actualizar el Estado del Pedido?
				</h1>
				<div
				class="botones"
				>
					<button 
					@click="ActualizarEstatus()"
					class="botoncon"
					>
					Si Confirmo
					</button>
					<button 
					@click="CerrarPopUp01"
					class="botonc"
					>
					Cancelar
					</button>
				</div>
			</div>
		</div>
	</Teleport>
	<!-- Filtro -->
	<Teleport to="body">
		<div
		v-if="VentanaFiltro" 
		class="fondo" 
		>
			<div 
			class="popup"
			>
				<h1>
				Filtro de Metodo de Pago
				</h1>
				<div 
				class="
				flex flex-col
				">
					<label>
					<input 
					type="radio" 
					:value="3"
					v-model="filtroMP"
					> 
					Tarjeta de Credito / Debito
					</label>
					<label>
					<input 
					type="radio" 
					:value="2"
					v-model="filtroMP"
					> 
					Mercado Pago
					</label>
					<label>
					<input 
					type="radio" 
					:value="1"
					v-model="filtroMP"
					> 
					Transferencia Bancaria
					</label>
					<label>
					<input 
					type="radio" 
					:value="0"
					v-model="filtroMP"
					> 
					Efectivo
					</label>
				</div>
				<h1>
				Filtro de Estatus
				</h1>
				<div 
				class="
				flex flex-col
				">
					<label>
					<input 
					type="radio" 
					:value="3"
					v-model="filtroEst"
					> 
					Preparando
					</label>
					<label>
					<input 
					type="radio" 
					:value="2"
					v-model="filtroEst"
					> 
					En Camino
					</label>
					<label>
					<input 
					type="radio" 
					:value="1"
					v-model="filtroEst"
					> 
					Entregado
					</label>
				</div>
				<h2>
				Ciudad del Cliente
				</h2>
				<div>
					<select 
					v-model="filtrociudad"
					>
						<option 
						value="" disabled
						>
						Selecciona una Ciudad...
						</option>
						<option 
						v-for="i in ListaCiudad" 
						:key="i.ciudad" 
						:value="i.ciudad"
						>
						{{ i.ciudad }}
						</option>
					</select>
				</div>
				<h2>
				Provincia del Cliente
				</h2>
				<div>
					<select 
					v-model="filtroprovincia" 
					>
						<option 
						value="" 
						disabled
						>
						Selecciona una Provincia...
						</option>
						<option 
						v-for="i in ListaProvincia" 
						:key="i.provincia" 
						:value="i.provincia"
						>
						{{ i.provincia }}
						</option>
					</select>
				</div>
				<div
				class="botones"
				>
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
					<button 
					@click="CerrarPopUp02" 
					class="botonc">
					Cerrar
					</button>
				</div>
			</div>
		</div>
	</Teleport>
	<div class="cuerpo">
		<div class="pagina">
            <div class="flex w-full flex-col lg:flex-row">
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
					class="flex flex-col lg:self-center gap-5"
					v-if="MostrarFiltro"
					>
						<div
						class="flex flex-col"
						>
							<h1>
							Filtro de Metodo de Pago
							</h1>
							<label>
							<input 
							type="radio" 
							:value="3"
							v-model="filtroMP"
							> 
							Tarjeta de Credito / Debito
							</label>
							<label>
							<input 
							type="radio" 
							:value="2"
							v-model="filtroMP"
							> 
							Mercado Pago
							</label>
							<label>
							<input 
							type="radio" 
							:value="1"
							v-model="filtroMP"
							> 
							Transferencia Bancaria
							</label>
							<label>
							<input 
							type="radio" 
							:value="0"
							v-model="filtroMP"
							> 
							Efectivo
							</label>
						</div>
						<div
						class="flex flex-col"
						>
							<h1>
							Filtro de Estatus
							</h1>
							<label>
							<input 
							type="radio" 
							:value="3"
							v-model="filtroEst"
							> 
							Preparando
							</label>
							<label>
							<input 
							type="radio" 
							:value="2"
							v-model="filtroEst"
							> 
							En Camino
							</label>
							<label>
							<input 
							type="radio" 
							:value="1"
							v-model="filtroEst"
							> 
							Entregado
							</label>
						</div>
						<div
						class="flex flex-col"
						>
							<h1>
							Ciudad del Cliente
							</h1>
							<div>
								<select 
								v-model="filtrociudad"
								>
									<option 
									value="" disabled
									>
									Selecciona una Ciudad...
									</option>
									<option 
									v-for="i in ListaCiudad" 
									:key="i.ciudad" 
									:value="i.ciudad"
									>
									{{ i.ciudad }}
									</option>
								</select>
							</div>
						</div>
						<div
						class="flex flex-col"
						>
							<h1>
							Provincia del Cliente
							</h1>
							<div>
								<select 
								v-model="filtroprovincia" 
								>
									<option 
									value="" 
									disabled
									>
									Selecciona una Provincia...
									</option>
									<option 
									v-for="i in ListaProvincia" 
									:key="i.provincia" 
									:value="i.provincia"
									>
									{{ i.provincia }}
									</option>
								</select>
							</div>
						</div>
						<div
						class="botones"
						>
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
				<div class="start !px-5"
				>
					<!-- Barra de Busqueda -->
					<input
					@input="BusquedaPedido"
					type="text" v-model="Busqueda" 
					placeholder="Busqueda..."
					class="busqueda"
					maxlength="50"
					>
					<h1>
					Pedidos
					</h1>
					<!-- Tabla de Pedidos -->
					<div v-if="Pedidos.length > 0">
						<div 
						v-for= "i in Pedidos" 
						:key="i.id"
						class="mb-2 lg:mb-5">
							<div 
							@click="Edicion(i)" 
							:class="Estatuscolor(i.estatus)"
							class="tab"
							>
								<div class="flex flex-col">
									<div class="flex flex-row">
										<h1>
										{{ i.cliente[0].nombre }}
										</h1>
										<h1>
										({{ Estatustxt(i.estatus) }})
										</h1>
									</div>
									<div class="flex flex-col">
										<h2>
										Direccion: 
										{{ i.direccion[0].calle }} 
										{{ i.direccion[0].numero }}
										</h2>
										<h2 class="font-bold">
										${{ i.total }}
										</h2>
									</div>
								</div>
								<div class="flex flex-col ml-auto text-right items-end">
									<h3>
									Tiempo Est. de Entrega: {{ i.tiempo_estimado_entrega }} Dias
									</h3>
									<h3>
									Tiempo de Entrega: {{ i.tiempo_entrega }} Dias
									</h3>
								</div>
							</div>
							<div v-if = "PedidoNow === i.id_pedido">
								<div class="tab !bg-gray-400">
                                    <div class="flex flex-col sm:flex-row gap-3 justify-between w-full">
										<div class="flex flex-col gap-1">
											<div class="flex flex-row">
												<h2 class="font-bold mr-2">
												Pagado con: 
												</h2>
												<h2>
												{{ i.metodo_pago }}
												</h2>
											</div>
											<div class="flex flex-row">
												<h2 class="font-bold mr-2">
												Ciudad: 
												</h2>
												<h2>
												{{ i.direccion[0].ciudad }}
												</h2>
											</div>
											<div class="flex flex-row">
												<h2 class="font-bold mr-2">
												Provincia:
												</h2>
												<h2>
												{{ i.direccion[0].provincia }}
												</h2>
											</div>
										</div>
										<div class="flex flex-col gap-1">
											<div class="flex flex-row">
												<h2 class="mr-2">
												Pedido Creado el Dia: 
												</h2>
												<h3>
												{{ FormatoFecha(i.created_at) }}
												</h3>
											</div>
											<div class="flex flex-row">
												<h3 class="mr-2">
												Pedido Act. el Dia: 
												</h3>
												<h3>
												{{ FormatoFecha(i.updated_at) }}
												</h3>
											</div>
										</div>
									</div>
								</div>
								<div
								class="tab !bg-green-100/50"
								v-for = "e in i.detalle_pedido" 
								:key="e.id_detalle_pedido">
									<div class="flex flex-col">
										<div class="flex flex-row">
											<h3 class="font-bold">
											{{ e.producto.nombre }}
											</h3>
										</div>
										<div class="flex flex-col">
											<h3>
											Cantidad: {{ e.cantidad }}
											</h3>
											<h3>
											Precio Unitario: ${{ e.precio_unitario }}
											</h3>
											<div class="flex flex-row">
												<h2 class="font-bold mr-2">
												Subtotal:
												</h2>
												<h2>
												${{ e.subtotal }}
												</h2>
											</div>
										</div>
									</div>
									<div class="flex flex-col ml-auto text-right items-end">
										<h3>
										Categoria: {{ e.producto.categoria }}
										</h3>
										<h3>
										Codigo de Barras: {{ e.producto.codigo_barra }}
										</h3>
									</div>
								</div>
							</div>
							<div 
							v-if = "PedidoNow === i.id_pedido" 
							@click= "PedidoCambio(i.id_pedido)" 
							class="botonc text-center"
							>
							Ocultar Detalles
							</div>
							<div
							v-else 
							@click= "PedidoCambio(i.id_pedido)"
							class="botoncon text-center"
							>
							Ver Detalles
							</div>
						</div>
					</div>
					<div v-else>
						<h2>
						No se encontraron Pedidos 😔
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
						@click="Pagina = Pagina - 20 ; BusquedaPedido()" 
						:disabled="Pagina < 20"
						class="botona"
						>
						🢀
						</button>
						<h2 class="item">
						Items 
						{{ 0 + Pagina }} 
						- 
						{{ Pagina + Pedidos.length }}
						</h2>
						<button 
						@click="Pagina = Pagina + 20 ; BusquedaPedido()" 
						:disabled="Pedidos.length < 20"
						class="botona"
						>
						🢂
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
    // ----- Imports ----- //
	import { onMounted, ref } from 'vue'
    // ----- Variantes ----- //
	const Pagina = ref(0)
	const Pedidos = ref([])
	const filtroMP = ref(4)
	const Busqueda = ref("")
	const filtroEst = ref(4)
	const PedidoNow = ref(null)
	const MostrarFiltro = ref(false)
    const filtrociudad = ref ("")
    const filtroprovincia = ref ("")
	const filtroAct = ref(false)
    const ListaCiudad = ref ("")
    const ListaProvincia = ref ("")
	const VentanaFiltro = ref(false)
	const ActualizarCajaP = ref (false)
    // ----- Funciones Vue ----- //
	onMounted(async() => {
		BusquedaPedido()
        const respuestac = await fetch("http://localhost:8000/direccion/ciudad")
        const ciudad = await respuestac.json()
        ListaCiudad.value = ciudad
        const respuestap = await fetch("http://localhost:8000/direccion/provincia")
        const provincia = await respuestap.json()
        ListaProvincia.value = provincia
	})
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp01 = () => {
		ActualizarCajaP.value = false
		document.body.style.overflow = "auto"
	}
	const AbrirPopUp02 = () => {
		VentanaFiltro.value = true
		document.body.style.overflow = "hidden"
	}
	const CerrarPopUp02 = () => {
		VentanaFiltro.value = false
		document.body.style.overflow = "auto"
	}
	const Estatustxt = (id_estatus) => {
		if (id_estatus === 1) {
			return "Entregado"
		}
		else if (id_estatus === 2) {
			return "En Camino"
		}
		else if (id_estatus === 3) {
			return "Preparando"
		}
			return "indefinido"
	}
	const Estatuscolor = (id_estatus) => {
		if (id_estatus === 1) {
			return "sent"
		}
		else if (id_estatus === 2) {
			return "way"
		}
		else if (id_estatus === 3) {
			return "box"
		}
			return "what";
	}
	const FormatoFecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
		}
	}
	const AplicarFiltro = () => {
		BusquedaPedido()
		CerrarPopUp02()
	}
	const LimpiarFiltro = () => {
		filtroMP.value = 4
		filtroEst.value = 4
        filtrociudad.value = ""
        filtroprovincia.value = ""
		BusquedaPedido()
		CerrarPopUp02()
		filtroAct.value = false
	}
	const PedidoCambio = (id) => {
		if (PedidoNow.value === id) {
			PedidoNow.value = null
		}
		else {
			PedidoNow.value = id
		}
	}
	const EstatusAct = ref({
		id_pedido: "",
		id_cliente: "",
		id_direccion: "",
		metodo_pago: "",
		tiempo_estimado_entrega: "",
		tiempo_entrega: "",
		estatus: ""
	})
    // ----- Para el Backend ----- //
	const BusquedaPedido = async() => {
		let url = new URL ('http://localhost:8000/pedidos/all/');
		url.searchParams.append('skip', Pagina.value);
		if (Busqueda.value !== "") {
			url.searchParams.append('busqueda_pedido', Busqueda.value);
		}
		let mpfiltro = ""
		if (filtroMP.value === 4) {
			mpfiltro = ""
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
		if (filtroMP.value !== 4&& mpfiltro !== "") {
			url.searchParams.append('filtromp', mpfiltro)
			filtroAct.value = true
		}
		if (filtroEst.value !== 4) {
			url.searchParams.append('filtroest', filtroEst.value)
			filtroAct.value = true
		}
        if (filtrociudad.value !== "") {
            url.searchParams.append('busqueda_pedido', filtrociudad.value)
            filtroAct.value = true
        }
        if (filtroprovincia.value !== "") {
            url.searchParams.append('busqueda_pedido', filtroprovincia.value)
            filtroAct.value = true
        }
		const BusqPedido = await fetch(url)
		const datos = await BusqPedido.json()
		Pedidos.value = datos
	}
	const ActualizarEstatus = async() => {
			const ActEst = await fetch(`http://localhost:8000/pedidos/id/${EstatusAct.value.id_pedido}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(EstatusAct.value)
			})
			if (ActEst.status === 401) {
				CerrarSesion();
				alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
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
	const Edicion = (pedido_fila) => {
		if (pedido_fila.estatus === 1) {
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
</script>