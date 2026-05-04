<template>
    <div>
        <input
        @input="BusquedaProducto"
        type="text" 
        v-model="Busqueda" 
        placeholder="Busqueda..."
        class="busqueda"
        >
        <button @click="AbrirPopUp1" class="botoncentro">
        Filtros ☰
        </button>
        <button @click="AbrirPopUp4" class="botoncentro" v-if="Rol === '1'">
        Nuevo Producto +
        </button>

        <Teleport to="body">
            <div class="fondo_oscuro" v-if="VentanaFiltro">
                <div class="caja_editar">
                    <h2>
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
                    <div v-if="filtroRadio === 0">
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
                    <div v-if="Rol === '1'">
                        <h2>
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
                    <button @click="AplicarFiltro" class="Boton_Crear">
                    Aplicar Filtros
                    </button>
                    <button @click="LimpiarFiltro" class="Boton_Crear" v-if="filtroAct === true">
                    Limpiar Filtro
                    </button>
                    <button @click="CerrarPopUp1" class="Boton_Crear">
                    Cerrar
                    </button>
                </div>
            </div>
        </Teleport>
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaP">
                <div class="caja_editar">
                    <h1>
                    Actualizar Producto {{ ProductoAct.nombre }}
                    </h1>
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
                        <button @click="CerrarPopUp2" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaPDel">
                <div class="caja_editar">
                    <h1>
                    ¿Desear Eliminar/Reactivar el Producto?
                    </h1>
                    <button @click="BorrarProducto()">
                    Si Confirmo
                    </button>
                    <button @click="CerrarPopUp3">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>
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
                        +
                        </button>
                        <button @click="RestarProducto(ProductoActual)">
                        -
                        </button>
                    </div>
                    <div>
                        <button @click="SumarCarrito">
                        Agregar al Carrito
                        </button>
                        <button @click="CerrarPopUp5">
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
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
                        type="text" 
                        v-model="NuevoProducto.precio" 
                        placeholder="Precio"
                        >
                        <input 
                        type="text" 
                        v-model="NuevoProducto.stock" 
                        placeholder="Stock"
                        >
                        <input 
                        type="text" 
                        v-model="NuevoProducto.categoria" 
                        placeholder="Categoria"
                        >
                        <input 
                        type="text" 
                        v-model="NuevoProducto.codigo_barra" 
                        placeholder="Codigo de Barras"
                        >
                    </form>
                    <button type="submit" class="Boton_Crear">
                    Crear
                    </button>
                    <button @click="CerrarPopUp4">
                    Cancelar
                    </button>
                </div>
            </div>
        </Teleport>

        <div class="contenedor">
            <div class="contenedor_principal">
                <h1>
                Productos
                </h1>
                <div class="contenedor_tabla" v-if="Productos.length > 0">
                    <table class="tabla" >
                        <thead>
                            <tr>
                                <th>
                                Nombre
                                </th>
                                <th>
                                Categoria
                                </th>
                                <th>
                                Stock
                                </th>
                                <th>
                                Precio
                                </th>
                                <th>
                                Codigo de Barras
                                </th>
                                <th>
                                Comprar
                                </th>
                                <th v-if="Rol === '1'">
                                Activo
                                </th>
                                <th v-if="Rol === '1'">
                                Borrar
                                </th>
                                <th v-if="Rol === '1'">
                                Editar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for= "i in Productos" :key="i.id">
                                <td>
                                {{ i.nombre }}
                                </td>
                                <td>
                                {{ i.categoria }}        
                                </td>
                                <td>
                                {{ i.stock }}
                                </td>
                                <td>
                                {{ i.precio }}
                                </td>
                                <td>
                                {{ i.codigo_barra }}
                                </td>
                                <td>
                                <button @click="Compracion(i)" :disabled="CarritoStock(i) === 0" class="botoncentro">
                                🛒
                                </button>
                                </td>
                                <td :class="Estatuscolor(i.activo)" v-if="Rol === '1'">
                                {{ Estatustxt(i.activo) }}
                                </td>
                                <td v-if="Rol === '1'">
                                <button @click="Eliminacion(i)" v-if="i.activo" class="botoncentro">
                                ❌
                                </button>
                                <button @click="Eliminacion(i)" v-else class="botoncentro">
                                🕊️
                                </button>
                                </td>
                                <td v-if="Rol === '1'">
                                <button @click="Edicion(i)" class="botoncentro">
                                ✎
                                </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
                <div v-else>
                    <h3>No se encontraron productos 😔</h3>
                    <p>Prueba buscando con otro termino</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { CarritoLocal, CerrarSesion, Rol, ActualizarCajaP, ProductoActual, ProductoCantidad, PedidoActual } from './Estatus.js'
    const ActualizarCajaPDel = ref(false)
    const VentanaCompra = ref(false)
    const VentanaFiltro = ref(false)
    const VentanaNuevo = ref(false)
    const filtroAct = ref(false)
    const ProductoEli = ref("")
    const filtroRadio = ref(0)
    const Productos = ref([])
    const filtroEst = ref(1)
    const Busqueda = ref("")
    const mayor = ref("")
    const menor = ref("")
	const AbrirPopUp1 = () => {
		VentanaFiltro.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp1 = () => {
		VentanaFiltro.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp2 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp2 = () => {
		ActualizarCajaP.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp3 = () => {
		ActualizarCajaPDel.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp3 = () => {
		ActualizarCajaPDel.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp4 = () => {
		VentanaNuevo.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp4 = () => {
		VentanaNuevo.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp5 = () => {
		VentanaCompra.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp5 = () => {
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
		document.body.style.overflow = "auto";
	}
    const Compracion = (producto_fila) => {
        VentanaComprar(producto_fila)
        AbrirPopUp5()
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
                CerrarPopUp5()
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
        AbrirPopUp5()
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
        CerrarPopUp5()    
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
        AbrirPopUp3()
    };
    const LimpiarFiltro = () => {
        filtroRadio.value = 4
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
        const respuesta = await fetch("http://localhost:8000/producto/");
        const datos = await respuesta.json();
        Productos.value = datos;
        CerrarPopUp3()
    }
    const Edicion = (producto_fila) => {
        ProductoAct.value.id = producto_fila.id;
        ProductoAct.value.nombre = producto_fila.nombre;
        ProductoAct.value.precio = producto_fila.precio;
        ProductoAct.value.stock = producto_fila.stock;
        ProductoAct.value.categoria = producto_fila.categoria;
        ProductoAct.value.codigo_barra = producto_fila.codigo_barra;
        AbrirPopUp2()
    };
    onMounted(async() => {
        const respuesta = await fetch('http://localhost:8000/producto/')
        const datos = await respuesta.json();
        Productos.value = datos;
        const CarritoOlvidado = localStorage.getItem('carrito_pendiente');
        if (CarritoOlvidado) {
            CarritoLocal.value = JSON.parse(CarritoOlvidado);
            console.log("Carrito recuperado:", CarritoLocal.value);
        }
    })
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
        categoria: "",
        codigo_barra: ""
    });
    const SubirNuevoProducto = async() => {
        const SubidaNuevoProducto = await fetch('http://localhost:8000/producto/', {
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
            categoria: "",
            codigo_barra: ""
        };
        const respuesta = await fetch('http://localhost:8000/producto/');
        const datos = await respuesta.json();
        Productos.value = datos;
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
        const respuesta = await fetch("http://localhost:8000/producto/");
        const datos = await respuesta.json();
        Productos.value = datos;
        CerrarPopUp2()
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
        background-color: #d5f1cb;
    }
    .classEliminado{
        background-color: #f58a72;
    }
    .botoncentro{
        align-self: center;
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