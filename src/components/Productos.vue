<template>
    <div class="cuerpo">
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
            <div class="fondo" v-if="VentanaCompra">
                <div class="popup">
                    <h2 style="color: black;">
                    {{ ProductoActual.nombre }}
                    </h2>
                    <div>
                        <input 
                        type="number" 
                        v-model="ProductoCantidad"
                        style="width: 100px; height: 25px;"
                        maxlength="8"
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
                        maxlength="50"
                        >
                        <input 
                        type="number" 
                        v-model="NuevoProducto.precio" 
                        placeholder="Precio"
                        maxlength="8"
                        >
                        <input 
                        type="number" 
                        v-model="NuevoProducto.stock" 
                        placeholder="Stock"
                        maxlength="8"
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
                        maxlength="20"
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
        <!-- Actualizar Producto -->
        <Teleport to="body">
            <div class="fondo_oscuro" v-if="ActualizarCajaP">
                <div class="caja_editar">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <div v-if="Rol === '1' || Rol === '2'">
                            <h1>
                            Nombre
                            </h1>
                            <input 
                            type="text" 
                            v-model="ProductoAct.nombre" 
                            placeholder="Nombre"
                            maxlength="50"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2' || Rol === '4'">
                            <h1>
                            Precio
                            </h1>
                            <input 
                            type="number" 
                            v-model="ProductoAct.precio" 
                            placeholder="Precio"
                            maxlength="8"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2' || Rol === '5'">
                            <h1>
                            Stock
                            </h1>
                            <input 
                            type="number" 
                            v-model="ProductoAct.stock" 
                            placeholder="Stock"
                            maxlength="8"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2'">
                            <h1>
                            Categoria
                            </h1>
                            <select v-model="OpcionCategoriaA" class="seleccion">
                                <option value="new">
                                + Agrega una Categoria
                                </option>
                                <option v-for="i in ListaCategoria" :key="i.categoria" :value="i.categoria">
                                {{ i.categoria }}
                                </option>
                            </select>
                            <input 
                            v-if="OpcionCategoriaA === 'new'" 
                            type="text" 
                            v-model="ProductoAct.categoria" 
                            placeholder="Categoria"
                            maxlength="20"
                            >
                            <h1>
                            Codigo de Barras
                            </h1>
                            <input 
                            type="text" 
                            v-model="ProductoAct.codigo_barra" 
                            placeholder="Codigo de Barras"
                            maxlength="15"
                            >
                        </div>
                        <button type="submit" class="Boton_Crear">
                        Actualizar
                        </button>
                        <button @click="CerrarPopUp02" class="Boton_Crear">
                        Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Tabla de Productos y Barra de Filtros -->
        <div>
            <!-- Barra de Filtros -->
            <div class="barside">
                <div class="margen">
                    <div>
                        <h2>
                        <br>
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
                    <div>
                        <h2>
                        Filtros de Precio
                        </h2>
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
                    <div 
                    v-if="filtroRadio === 0" 
                    >
                        <input 
                        type="number"
                        v-model="mayor" 
                        placeholder="Precio Max..."
		                maxlength="10"
                        >
                        <input
                        type="number"
                        v-model="menor" 
                        placeholder="Precio Min..."
		                maxlength="10"
                        >
                    </div>
                    <div 
                    v-if="Rol === '1' || Rol === '2' || Rol === '4'"
                    >
                        <h2>
                        ¿El Productos esta Activo?
                        </h2>
                        <div>
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
            <!-- Tabla de Productos -->
            <div>
                <input
                @input="BusquedaProducto"
                type="text" 
                v-model="Busqueda" 
                placeholder="Busqueda..."
                class="busqueda"
		        maxlength="50"
                >
                <button 
                @click="AbrirPopUp04"
                v-if="Rol === '1' || Rol === '2'"
                class="botont" 
                >
                Nuevo Producto ➕
                </button>
                <div 
                v-if="Productos.length > 0"
                >
                    <div 
                    :class="Estatuscolor(i.activo)" 
                    v-for= "i in Productos" 
                    :key="i.id"
                    >
                        <div>
                            <img
                            alt="Vue logo" src="../assets/images.png"
                            >
                            <div
                            >
                                <h2>
                                {{ i.nombre }}
                                </h2>
                                <h3>
                                Categoria: 
                                {{ i.categoria }}
                                <br>
                                ${{ i.precio }}
                                </h3>
                                <button 
                                @click="Compracion(i)" 
                                :disabled="CarritoStock(i) === 0" 
                                class="botont"
                                v-if="Rol !== '2' && Rol !== '3' && Rol !== '4' && Rol !== '5' && Rol !== '6'"
                                >
                                🛒 Añadir al Carrito 🛒
                                </button>
                                <div v-if="Rol === '1' || Rol === '2' || Rol === '4' || Rol === '5'">
                                    <h3>
                                    {{ i.codigo_barra }} <br>
                                    Stock: 
                                    {{ i.stock }}
                                    </h3>
                                    <div 
                                    v-if="Rol === '1' || Rol === '2'"
                                    >
                                        <button 
                                        @click="Eliminacion(i)" 
                                        v-if="i.activo" 
                                        class="botonc"
                                        >
                                        ❌ Eliminar
                                        </button>
                                        <button 
                                        @click="Eliminacion(i)" 
                                        v-else 
                                        class="botoncon"
                                        >
                                        🕊️ Reactivar
                                        </button>
                                    </div>
                                    <button 
                                    @click="Edicion(i)" 
                                    v-if="Rol === '1' || Rol === '2' || Rol === '4' || Rol === '5'" 
                                    class="botont">
                                    ✏️ Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h2>No se encontraron productos 😔</h2>
                    <h3>Prueba buscando con otro termino</h3>
                </div>
                <div
                class="
                flex justify-center
                ">
                    <button 
                    @click="Pagina = Pagina - 21 ; BusquedaProducto()" 
                    :disabled="Pagina < 21"
                    class="botona"
                    >
                    ⬅
                    </button>
                    <h2
                    class="
                    self-center p-5
                    ">
                    Items 
                    {{ 0 + Pagina }} 
                    - 
                    {{ Pagina + Productos.length }}
                    </h2>
                    <button 
                    @click="Pagina = Pagina + 21 ; BusquedaProducto()" 
                    :disabled="Productos.length < 21"
                    class="botona"
                    >
                    ➡
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { CarritoLocal, CerrarSesion, Rol, ActualizarCajaP, ProductoActual, ProductoCantidad, PedidoActual } from './Estatus.js'
    const ActualizarCajaPDel = ref(false)
    const OpcionCategoria = ref("new")
    const OpcionCategoriaA = ref("new")
    const VentanaCompra = ref(false)
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
        filtroEst.value =  1
        BusquedaProducto();
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
        OpcionCategoriaA.value = producto_fila.categoria;
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
        if (OpcionCategoriaA.value != "new") {
            ProductoAct.value.categoria = OpcionCategoriaA.value
        }
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
    }
</script>

<style scoped>
    h1{
        color: black;
        font-size: small;
        margin: 0;
        width: fit-content;
        font-style: sans-serif; 
        padding: 0;
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
    .caja_radios_label {
        cursor: pointer;
        font-size: 16px;
    }
</style>