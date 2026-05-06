<template>
    <div>
        
		<div class="contenedor_principal">
			<h1>
			Historial de Pedidos
			</h1>
			<div class="contenedor_tabla" v-if="Pedidos.length > 0">
				<table class="tabla">
					<thead>
						<tr>
							<th>
							Cliente
							</th>
							<th>
							Direccion
							</th>
							<th>
							Metodo de Pago
							</th>
							<th>
							Tiempo de <br>
							Entrega Estimado
							</th>
							<th>
							Tiempo de <br>
							Entrega
							</th>
							<th>
							Fecha de <br>
							Creacion
							</th>
							<th>
							Fecha de <br>
							Actualizacion
							</th>
							<th>
							Total del <br>
							Pedido
							</th>
							<th>
							Detalles
							</th>
							<th>
							Estatus
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-for= "i in Pedidos" :key="i.id">
							<tr>
								<td>
								{{ i.cliente[0].nombre }}
								{{ i.cliente[0].apellido }}
								</td>
								<td>
								{{ i.direccion[0].calle }} 
								{{ i.direccion[0].numero }}
								 - 
								{{ i.direccion[0].ciudad }}
								 - 
								{{ i.direccion[0].provincia }}        
								</td>
								<td>
								{{ i.metodo_pago }}
								</td>
								<td>
								{{ i.tiempo_estimado_entrega }}
								</td>
								<td>
								{{ i.tiempo_entrega }}
								</td>
								<td>
								{{ FormatoFecha(i.created_at) }}
								</td>
								<td>
								{{ FormatoFecha(i.updated_at) }}
								</td>
								<td>
								${{ i.total }}
								</td>
								<td v-if = "PedidoNow === i.id_pedido" @click= "PedidoCambio(i.id_pedido)" class="boton_ocultar_detalle">
								Ocultar Detalles
								</td>
								<td v-else @click= "PedidoCambio(i.id_pedido)" class="boton_detalle">
								Ver Detalles
								</td>
								<td @click="Edicion(i)" :class="Estatuscolor(i.estatus)">
								{{ Estatustxt(i.estatus) }}
								</td>
							</tr>
							<tr v-if = "PedidoNow === i.id_pedido">
								<td colspan="10" class="cajon_detalles">
									<div class="caja_detalles">
										<table class="tabla_detalles">
											<thead class="cabeza_detalles">
												<tr>
													<th>
													Producto
													</th>
													<th>
													Categoria
													</th>
													<th>
													Codigo de Barras
													</th>
													<th>
													Precio Unitario
													</th>
													<th>
													Cantidad
													</th>
													<th>
													Subtotal
													</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for = "e in i.detalle_pedido" :key="e.id_detalle_pedido">
													<td>
													{{ e.producto.nombre }}
													</td>
													<td>
													{{ e.producto.categoria }}
													</td>
													<td>
													{{ e.producto.codigo_barra }}
													</td>
													<td>
													{{ e.precio_unitario }}
													</td>
													<td>
													{{ e.cantidad }}
													</td>
													<td>
													${{ e.subtotal }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>  
			<div v-else>
				<h3>No se encontraron Pedidos 😔</h3>
				<p>Prueba buscando con otro termino</p>
			</div>
			<button @click="Pagina = Pagina - 20 ; BusquedaPedido()" :disabled="Pagina < 20">
			⬅
			</button>
			<button @click="Pagina = Pagina + 20 ; BusquedaPedido()" :disabled="Pedidos.length < 20">
			➡
			</button>
		</div>
    </div>
</template>

<script setup>

</script>