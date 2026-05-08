<template>
    <div>
        <!-- Confirmacion Eliminar -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaPDel">
                <div class="caja_editar">
                    <h1>
                    ¿Desear Eliminar/Reactivar el Producto?
                    </h1>
                    <button @click="BorrarProducto()">
                    Si Confirmo
                    </button>
                    <button @click="CerrarPopUp03">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>
        <!-- Comprar Ventana -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="VentanaCompra">
                <div class="caja_editar">
                    <h2>
                    {{ ProductoActual.nombre }}
                    </h2>
                    <div>
                        <input 
                        type="number" 
                        v-model="ProductoCantidad"
                        >
                        <button @click="SumarProducto(ProductoActual)">
                        ➕
                        </button>
                        <button @click="RestarProducto(ProductoActual)">
                        ➖
                        </button>
                    </div>
                    <div>
                        <button @click="SumarCarrito">
                        Agregar al Carrito
                        </button>
                        <button @click="CerrarPopUp05">
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
        <!-- Nuevo Producto -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="VentanaNuevo">
                <div class="caja_editar">
                    <h1>
                    Nuevo Producto
                    </h1>
                    <form @submit.prevent="SubirNuevoProducto" class="Texto_producto">
                        <input 
                        type="text" 
                        v-model="NuevoProducto.nombre" 
                        placeholder="Nombre"
                        >
                        <input 
                        type="number" 
                        v-model="NuevoProducto.precio" 
                        placeholder="Precio"
                        >
                        <input 
                        type="number" 
                        v-model="NuevoProducto.stock" 
                        placeholder="Stock"
                        >
                        <select v-model="OpcionCategoria" class="seleccion">
                            <option value="new">
                            + Agrega una Categoria
                            </option>
                            <option v-for="i in ListaCategoria" :key="i.categoria" :value="i.categoria">
                            {{ i.categoria }}
                            </option>
                        </select>
                        <input 
                        v-if="OpcionCategoria === 'new'" 
                        type="text" 
                        v-model="NuevoProducto.categoria" 
                        placeholder="Categoria"
                        >
                        <button type="submit" class="Boton_Crear">
                        Crear
                        </button>
                        <button @click="CerrarPopUp04">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Botones Actualizar Producto -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaP">
                <div class="caja_editar">
                    <h1>
                    Actualizar Producto {{ ProductoAct.nombre }}
                    </h1>
                    <button @click="AbrirPopUp06" class="botoncentro">
                    Actualizar Nombre
                    </button>
                    <button @click="AbrirPopUp07" class="botoncentro">
                    Actualizar Precio
                    </button>
                    <button @click="AbrirPopUp08" class="botoncentro">
                    Actualizar Stock
                    </button>
                    <button @click="AbrirPopUp09" class="botoncentro">
                    Actualizar Categoria
                    </button>
                    <button @click="AbrirPopUp10" class="botoncentro">
                    Actualizar Codigo de Barras
                    </button>
                    <button @click="AbrirPopUp11" class="botoncentro">
                    Actualizar Todo
                    </button>
                    <button @click="CerrarPopUp02" class="botoncentro">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto Nombre -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarPNombre">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="text" 
                        v-model="ProductoAct.nombre" 
                        placeholder="Nombre"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp06" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto Precio -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarPPrecio">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="number" 
                        v-model="ProductoAct.precio" 
                        placeholder="Precio"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp07" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto Stock -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarPStock">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="number" 
                        v-model="ProductoAct.stock" 
                        placeholder="Stock"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp08" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto Categoria -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarPCategoria">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="text" 
                        v-model="ProductoAct.categoria" 
                        placeholder="Categoria"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp09" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto Codigo de Barra -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarPCodigoBarra">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="text" 
                        v-model="ProductoAct.codigo_barra" 
                        placeholder="Codigo de Barras"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp10" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Todo Producto -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarProductos">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <input 
                        type="text" 
                        v-model="ProductoAct.nombre" 
                        placeholder="Nombre"
                        >
                        <input 
                        type="text" 
                        v-model="ProductoAct.precio" 
                        placeholder="Precio"
                        >
                        <input 
                        type="text" 
                        v-model="ProductoAct.stock" 
                        placeholder="Stock"
                        >
                        <input 
                        type="text" 
                        v-model="ProductoAct.categoria"
                        placeholder="Categoria"
                        >
                        <input 
                        type="text" 
                        v-model="ProductoAct.codigo_barra" 
                        placeholder="Codigo de Barras"
                        >
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp11" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>

        <div class="concontenedor">
            <div class="barside">
                <div class="margen">
                    <h2>
                    <br>
                    <br>
                    Filtros de Precio
                    </h2>
                    <div class="caja_radios">
                        <label>
                        <input 
                        type="radio" 
                        :value="3"
                        v-model="filtroRadio"
                        > 
                        Hasta $10,000
                        </label>
                        <label>
                        <input 
                        type="radio" 
                        :value="2"
                        v-model="filtroRadio"
                        > 
                        $10,000 a $50,000
                        </label>
                        <label>
                        <input 
                        type="radio" 
                        :value="1"
                        v-model="filtroRadio"
                        > 
                        Más de $50,000
                        </label>
                        <label>
                        <input 
                        type="radio" 
                        :value="0"
                        v-model="filtroRadio"
                        > 
                        Personalizado
                        </label>
                    </div>
                    <div v-if="filtroRadio === 0" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                        <input 
                        type="number"
                        v-model="mayor" 
                        placeholder="Precio Max..."
                        >
                        <input
                        type="number"
                        v-model="menor" 
                        placeholder="Precio Min..."
                        >
                    </div>
                    <div>
                        <h2>
                        <br>
                        <br>
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
                    <div v-if="Rol === '1'">
                        <h2>
                        <br>
                        <br>
                        ¿El Productos esta Activo?
                        </h2>
                        <div class="caja_radios">
                            <label>
                            <input 
                            type="radio" 
                            :value="2"
                            v-model="filtroEst"
                            > 
                            Todos los Productos
                            </label>
                            <label>
                            <input 
                            type="radio" 
                            :value="1"
                            v-model="filtroEst"
                            > 
                            Productos Activos
                            </label>
                            <label>
                            <input 
                            type="radio" 
                            :value="0"
                            v-model="filtroEst"
                            > 
                            Productos Eliminados
                            </label>
                        </div>
                    </div>
                    <h2>
                    <br>
                    <br>
                    </h2>
                    <button @click="AplicarFiltro" class="Boton_Crear">
                    Aplicar Filtros
                    </button>
                    <button @click="LimpiarFiltro" class="Boton_Crear" v-if="filtroAct === true">
                    🗑️ Limpiar Filtro
                    </button>
                </div>
            </div>
            <div class="contenedor">
                <input
                @input="BusquedaProducto"
                type="text" 
                v-model="Busqueda" 
                placeholder="Busqueda..."
                class="busqueda"
                >
                <button @click="AbrirPopUp04" class="botoncentro" v-if="Rol === '1'">
                Nuevo Producto ➕
                </button>
                <div v-if="Productos.length > 0" class="contenedor_cartas">
                    <div :class="Estatuscolor(i.activo)" v-for= "i in Productos" :key="i.id">
                        <div>
                            <img class="imagen_carta" alt="Vue logo" src="../assets/images.png">
                            <div class="info_carta">
                                <h3>
                                {{ i.nombre }}
                                </h3>
                                <p>
                                {{ i.categoria }}
                                {{ i.precio }}
                                </p>
                                <button @click="Compracion(i)" :disabled="CarritoStock(i) === 0" class="botoncentro">
                                🛒 Añadir al Carrito 🛒
                                </button>
                                <div v-if="Rol === '1'">
                                    <p>
                                    {{ i.codigo_barra }}
                                    {{ i.stock }}
                                    {{ Estatustxt(i.activo) }}
                                    </p>
                                    <button @click="Eliminacion(i)" v-if="i.activo" class="botoncentro">
                                    ❌
                                    </button>
                                    <button @click="Eliminacion(i)" v-else class="botoncentro">
                                    🕊️
                                    </button>
                                    <button @click="Edicion(i)" class="botoncentro">
                                    ✏️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h3>No se encontraron productos 😔</h3>
                    <p>Prueba buscando con otro termino</p>
                </div>
            </div>
        </div>
        <div class="contenedor_pagina">
            <button @click="Pagina = Pagina - 21 ; BusquedaProducto()" :disabled="Pagina < 21">
            ⬅
            </button>
            <h2>
            Items {{ 0 + Pagina }} - {{ Pagina + Productos.length }}
            </h2>
            <button @click="Pagina = Pagina + 21 ; BusquedaProducto()" :disabled="Productos.length < 21">
            ➡
            </button>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { CarritoLocal, CerrarSesion, Rol, ActualizarCajaP, ProductoActual, ProductoCantidad, PedidoActual } from './Estatus.js'
    const ActualizarPCodigoBarra = ref(false)
    const ActualizarPCategoria = ref(false)
    const ActualizarProductos = ref(false)
    const ActualizarCajaPDel = ref(false)
    const ActualizarPNombre = ref(false)
    const ActualizarPPrecio = ref(false)
    const ActualizarPStock = ref(false)
    const OpcionCategoria = ref("new")
    const VentanaCompra = ref(false)
    const VentanaFiltro = ref(false)
    const VentanaNuevo = ref(false)
    const ListaCategoria = ref ("")
    const filtroAct = ref(false)
    const ProductoEli = ref("")
    const filtrocat = ref ("")
    const filtroRadio = ref(0)
    const Productos = ref([])
    const filtroEst = ref(1)
    const Busqueda = ref("")
    const mayor = ref("")
    const menor = ref("")
	const Pagina = ref(0)
    onMounted(async() => {
        BusquedaProducto()
        const respuesta = await fetch("http://localhost:8000/producto/categorias/")
        const categ = await respuesta.json()
        ListaCategoria.value = categ
        const CarritoOlvidado = localStorage.getItem('carrito_pendiente')
        if (CarritoOlvidado) {
            CarritoLocal.value = JSON.parse(CarritoOlvidado)
            console.log("Carrito recuperado:", CarritoLocal.value)
        }
    })
	const AbrirPopUp01 = () => {
		VentanaFiltro.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp1 = () => {
		VentanaFiltro.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaP.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp03 = () => {
		ActualizarCajaPDel.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp03 = () => {
		ActualizarCajaPDel.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp04 = () => {
		VentanaNuevo.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp04 = () => {
		VentanaNuevo.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp05 = () => {
		VentanaCompra.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp05 = () => {
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp06 = () => {
		ActualizarPNombre.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp06 = () => {
		ActualizarPNombre.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp07 = () => {
		ActualizarPPrecio.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp07 = () => {
		ActualizarPPrecio.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp08 = () => {
		ActualizarPStock.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp08 = () => {
		ActualizarPStock.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp09 = () => {
		ActualizarPCategoria.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp09 = () => {
		ActualizarPCategoria.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp10 = () => {
		ActualizarPCodigoBarra.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp10 = () => {
		ActualizarPCodigoBarra.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp11 = () => {
		ActualizarProductos.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp11 = () => {
		ActualizarProductos.value = false
		document.body.style.overflow = "auto";
	}
    const Compracion = (producto_fila) => {
        VentanaComprar(producto_fila)
        AbrirPopUp05()
    };
    const Confirmar = (async() => {
        const tokenGuardado = leerCookie("token");
        const ClienteGuardado = leerCookie("id_cliente");
        if (PedidoActual.value) {
            const respuesta = await fetch('http://localhost:8000/pedidos/detalles_pedido/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify([{
                    id_pedido: PedidoActual.value,
                    id_producto: ProductoActual.value.id,
                    cantidad: ProductoCantidad.value
                }])
            })
            if (respuesta.ok) {
                CerrarPopUp05()
                console.log ("funciono")
            } else {
                const error = await respuesta.text()
                console.error("Error al agregar detalle:", error)
            }
        } else {
            const respuesta = await fetch('http://localhost:8000/pedidos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenGuardado
                },
                body: JSON.stringify({
                    id_cliente: parseInt(ClienteGuardado),
                    id_direccion: 1,
                    metodo_pago: " ",
                    tiempo_estimado_entrega: 0,
                    tiempo_entrega: 0
                })
            })
            if (respuesta.status === 401) {
                CerrarSesion();
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
                return;
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
    const VentanaComprar = (ProductoSeleccionado) => {
        AbrirPopUp05()
        ProductoActual.value = ProductoSeleccionado
        ProductoCantidad.value = 1
    }
    const SumarProducto = () => {
        if (ProductoActual.value && ProductoCantidad.value < ProductoActual.value.stock) {
            ProductoCantidad.value++
        }
    }
    const RestarProducto = () => {
        if (ProductoCantidad.value > 1) {
            ProductoCantidad.value--
        }
    }
    const SumarCarrito = () => {
        if (!ProductoActual.value)
            return; 
        const nuevoProducto = {
            id_pedido: PedidoActual.value,
            nombre_producto: ProductoActual.value.nombre,
            id_producto: ProductoActual.value.id,
            cantidad: ProductoCantidad.value,
            precio_unitario: ProductoActual.value.precio,
            stock_producto: ProductoActual.value.stock
        }
        let CarritoExistente = CarritoLocal.value.find(
            (item_exitente) =>
            item_exitente.id_producto === ProductoActual.value.id
        )
        if (CarritoExistente){
            CarritoExistente.cantidad = ProductoCantidad.value + CarritoExistente.cantidad
        } else {
            CarritoLocal.value.push(nuevoProducto);
        }
        localStorage.setItem(
            'carrito_pendiente',
            JSON.stringify(
                CarritoLocal.value
            )
        )
        CerrarPopUp05()    
    }
    // revisar para optimizar
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
    const Eliminacion = (producto_fila) => {
        ProductoEli.value = producto_fila.id;
        AbrirPopUp03()
    };
    const LimpiarFiltro = () => {
        filtroRadio.value = 4
        filtrocat.value = ""
        BusquedaProducto();
        CerrarPopUp1()
        filtroAct.value = false
    }
    const BorrarProducto = async() => {
        const EraseProducto = await fetch(`http://localhost:8000/productos/id/${ProductoEli.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        ProductoEli.value = ""
        if (EraseProducto.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        BusquedaProducto()
        CerrarPopUp03()
    }
    const Edicion = (producto_fila) => {
        ProductoAct.value.id = producto_fila.id;
        ProductoAct.value.nombre = producto_fila.nombre;
        ProductoAct.value.precio = producto_fila.precio;
        ProductoAct.value.stock = producto_fila.stock;
        ProductoAct.value.categoria = producto_fila.categoria;
        ProductoAct.value.codigo_barra = producto_fila.codigo_barra;
        AbrirPopUp02()
    };
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
    const CarritoStock = (Producto) => {
        let stockCarrito = 0
        CarritoLocal.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                stockCarrito = stockCarrito + itemCarrito.cantidad
            }
        })
        return Producto.stock - stockCarrito;
    }
    const BusquedaProducto = async() => {
        let url = new URL ('http://localhost:8000/producto/');
		url.searchParams.append('skip', Pagina.value);
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_producto', Busqueda.value);
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
            minfiltro = menor.value;
            maxfiltro = mayor.value;
        }
        if (minfiltro !== "" && minfiltro != null) {
            url.searchParams.append('precio_producto_min', minfiltro);
            filtroAct.value = true
        }
        if (maxfiltro !== "" && maxfiltro != null) {
            url.searchParams.append('precio_producto_max', maxfiltro);
            filtroAct.value = true
        }
        if (filtroEst.value === 1) {
            url.searchParams.append('bool_activo', 'true');
            filtroAct.value = true;
        }
        if (filtroEst.value === 0) {
            url.searchParams.append('bool_activo', 'false');
            filtroAct.value = true;
        }
        if (filtrocat.value !== "") {
            url.searchParams.append('filtrocat', filtrocat.value);
            filtroAct.value = true;            
        }
        const BusqProducto = await fetch(url)
        const datos = await BusqProducto.json();
        Productos.value = datos;
    }
    const AplicarFiltro = () => {
        BusquedaProducto();
        CerrarPopUp1()
        menor.value = "";
        mayor.value = "";
    }
    const NuevoProducto = ref({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
    })
    const SubirNuevoProducto = async() => {
        if (OpcionCategoria.value != "new") {
            NuevoProducto.value.categoria = OpcionCategoria.value
        }
        const SubidaNuevoProducto = await fetch('http://localhost:8000/productos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(NuevoProducto.value)
        })
        if (SubidaNuevoProducto.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        NuevoProducto.value = {
            nombre: "",
            precio: "",
            stock: "",
            categoria: ""
        }
        BusquedaProducto()
        CerrarPopUp04()
    }
    const ProductoAct = ref({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        codigo_barra: ""
    })
    const ActualizarProducto = async() => {
        const ActProducto = await fetch(`http://localhost:8000/productos/id/${ProductoAct.value.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ProductoAct.value)
        })
        if (ActProducto.status === 401) {
            CerrarSesion();
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
            return;
        }
        BusquedaProducto()
        CerrarPopUp02()
        CerrarPopUp06()
        CerrarPopUp07()
        CerrarPopUp08()
        CerrarPopUp09()
        CerrarPopUp10()
        CerrarPopUp11()
    }
</script>

<style scoped>
    .busqueda{
        padding: 10px;
        width: 70%;
    }
    h1{
        color: black;
        font-size: x-large;
        margin: 0;
        width: fit-content;
    }
    h2{
        color: rgb(254, 255, 205);
        font-size: medium;
        margin: 0;
        gap: 15px;
        width: fit-content;
        font-style: sans-serif; 
    }
    label{
        color: white;
        font-size: small;
        gap: 5px;
        width: fit-content;
    }
    .contenedor_tabla {
        border-radius: 15px;
        overflow: hidden;
        border: 2px solid #000000;
    }
    thead{
        background-color: #b8fbff;
        color: #005f69;
        text-align: center;
    }
    .Boton_Crear{
        padding: 10px;
        border-radius: 5px;
    }
    .classActivo{
        height: 100%;
        border: 2px solid #000000;
        border-radius: 15px;
        padding: 10px;
        text-align: center;
        background-color: rgb(204, 245, 235);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .classEliminado{
        height: 100%;
        border: 2px solid #000000;
        border-radius: 15px;
        padding: 10px;
        text-align: center;
        background-color: rgb(245, 204, 204);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .seleccion{
        padding: 10px;
    }
    .caja_radios {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: left;
        width: 100%;
    }
    .caja_radios label {
        cursor: pointer;
        font-size: 16px;
    }
</style>