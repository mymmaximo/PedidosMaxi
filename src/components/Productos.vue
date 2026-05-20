<template>
    <div class="cuerpo">
        <!-- Confirmacion Eliminar -->
        <Teleport to="body">
            <div class="fondo" v-if="ActualizarCajaPDel">
                <div class="popup">
                    <h1>
                    ¿Desear Eliminar/Reactivar el Producto?
                    </h1>
                    <div
                    class="botones"
                    >
                        <button 
                        @click="BorrarProducto()"
                        class="botoncon"
                        >
                        Si Confirmo
                        </button>
                        <button 
                        @click="CerrarPopUp02"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
        <!-- Comprar Ventana -->
        <Teleport to="body">
            <div class="fondo" v-if="VentanaCompra">
                <div class="popup">
                    <h1>
                    {{ ProductoActual.nombre }}
                    </h1>
                    <div
                    class="
                    flex flex-col
                    ">
                        <input 
                        type="number" 
                        v-model="ProductoCantidad"
                        maxlength="8"
                        class="!w-30 mb-5"
                        >
                        <div class="flex justify-center">
                            <button 
                            @click="SumarProducto(ProductoActual)"
                            class="botoncon !bg-green-400 !px-2"
                            >
                            ➕
                            </button>
                            <button 
                            @click="RestarProducto(ProductoActual)"
                            class="botonc !bg-red-400 !px-2"
                            >
                            ➖
                            </button>
                        </div>
                    </div>
                    <div
                    class="botones"
                    >
                        <button 
                        @click="SumarCarrito"
                        class="botoncon"
                        >
                        Agregar al Carrito
                        </button>
                        <button 
                        @click="CerrarPopUp04"
                        class="botonc"
                        >
                        Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
        <!-- Nuevo Producto -->
        <Teleport to="body">
            <div class="fondo" v-if="VentanaNuevo">
                <div class="
                popup 
                !min-w-[80vh]
                ">
                    <h1>
                    Nuevo Producto
                    </h1>
                    <form @submit.prevent="SubirNuevoProducto" class="Texto_producto">
                        <h2>
                        Nombre
                        </h2>
                        <input 
                        type="text" 
                        v-model="NuevoProducto.nombre" 
                        placeholder="Nombre"
                        maxlength="50"
                        >
                        <h2>
                        Precio
                        </h2>
                        <input 
                        type="number" 
                        v-model="NuevoProducto.precio" 
                        placeholder="Precio"
                        maxlength="8"
                        >
                        <h2>
                        Stock
                        </h2>
                        <input 
                        type="number" 
                        v-model="NuevoProducto.stock" 
                        placeholder="Stock"
                        maxlength="8"
                        >
                        <h2>
                        Categoria
                        </h2>
                        <select v-model="OpcionCategoria" class="seleccion">
                            <option value="new">
                            + Agrega una Categoria
                            </option>
                            <option v-for="i in ListaCategoria" :key="i.categoria" :value="i.categoria">
                            {{ i.categoria }}
                            </option>
                        </select>
                        <h3>
                        Nueva Categoria
                        </h3>
                        <input 
                        v-if="OpcionCategoria === 'new'" 
                        type="text" 
                        v-model="NuevoProducto.categoria" 
                        placeholder="Categoria"
                        maxlength="20"
                        >
                        <div>
                            <div
                            v-if="VistaPrevia"
                            class="
                            relative 
                            w-fit mx-auto mt-2
                            ">
                                <button
                                @click="LimpiarImagen"
                                title="Quitar imagen"
                                class="botonx"
                                >
                                🗙
                                </button>
                                <img 
                                :src="VistaPrevia" 
                                alt="Vista Previa"
                                class="imagen !m-0" 
                                />
                            </div>
                            <div
                            v-else 
                            class="
                            imageno
                            ">
                            <span>
                            Sin vista previa
                            </span> 
                            </div>
                            <div class="mt-4">
                                <input
                                type="file"
                                accept="image/*"
                                @change="SeleccionarImagen"
                                class="imagenu !w-full"
                                />
                            </div>
                        </div>
                        <div
                        class="botones"
                        >
                            <button 
                            type="submit" 
                            class="botoncon"
                            >
                            Crear
                            </button>
                            <button 
                            @click="CerrarPopUp03"
                            class="botonc"
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Actualizar Producto -->
        <Teleport to="body">
            <div class="fondo" v-if="ActualizarCajaP">
                <div class="popup">
                    <form @submit.prevent="ActualizarProducto" class="Texto_producto">
                        <h1>
                        {{ ProductoAct.nombre }}
                        </h1>
                        <div v-if="Rol === '1' || Rol === '2'">
                            <h2>
                            Nombre
                            </h2>
                            <input 
                            type="text" 
                            v-model="ProductoAct.nombre" 
                            placeholder="Nombre"
                            maxlength="50"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2' || Rol === '4'">
                            <h2>
                            Precio
                            </h2>
                            <input 
                            type="number" 
                            v-model="ProductoAct.precio" 
                            placeholder="Precio"
                            maxlength="8"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2' || Rol === '5'">
                            <h2>
                            Stock
                            </h2>
                            <input 
                            type="number" 
                            v-model="ProductoAct.stock" 
                            placeholder="Stock"
                            maxlength="8"
                            >
                        </div>
                        <div v-if="Rol === '1' || Rol === '2'">
                            <h2>
                            Categoria
                            </h2>
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
                            <h2>
                            Codigo de Barras
                            </h2>
                            <input 
                            type="text" 
                            v-model="ProductoAct.codigo_barra" 
                            placeholder="Codigo de Barras"
                            maxlength="15"
                            >
                            <div>
                                <div
                                v-if="VistaPrevia"
                                class="
                                relative 
                                w-fit mx-auto mt-2
                                ">
                                    <button
                                    @click="LimpiarImagen"
                                    title="Quitar imagen"
                                    class="botonx"
                                    >
                                    🗙
                                    </button>
                                    <img 
                                    :src="VistaPrevia" 
                                    alt="Vista Previa"
                                    class="imagen !m-0" 
                                    />
                                </div>
                                <div
                                v-else 
                                class="
                                imageno
                                ">
                                <span>
                                Sin vista previa
                                </span> 
                                </div>
                                <div class="mt-4">
                                    <input
                                    type="file"
                                    accept="image/*"
                                    @change="SeleccionarImagen"
                                    class="imagenu !w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div 
                        class="botones"
                        >
                            <button 
                            type="submit" 
                            class="botoncon">
                            Actualizar
                            </button>
                            <button 
                            @click="CerrarPopUp01" 
                            class="botonc">
                            Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>
        <!-- Tabla de Productos y Barra de Filtros -->
        <div 
        class="pagina"
        >
            <!-- Barra de Filtros -->
            <div
            class="bar"
            >
                <div
                class="flex flex-col"
                >
                    <div
                    class="flex flex-col"
                    >
                        <h2>
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
                    class="
                    flex flex-col
                    p-4
                    ">
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
                    class="
                    flex flex-col
                    p-4
                    ">
                        <h3
                        class="
                        flex flex-col
                        p-4
                        ">
                        Precio Mayor
                        </h3>
                        <input 
                        type="number"
                        v-model="mayor" 
                        placeholder="Precio Max..."
		                maxlength="10"
                        >
                        <h3
                        class="
                        flex flex-col
                        p-4
                        ">
                        Precio Minimo
                        </h3>
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
                        <div
                        class="
                        flex flex-col
                        p-4
                        ">
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
            <!-- Tabla de Productos -->
            <div
            class="
            w-full h-fit 
            flex flex-col 
            p-5 gap-5
            ">
                <input
                @input="BusquedaProducto"
                type="text" 
                v-model="Busqueda" 
                placeholder="Busqueda..."
                class="busqueda"
		        maxlength="50"
                >
                <button 
                @click="AbrirPopUp03"
                v-if="Rol === '1' || Rol === '2'"
                class="botont" 
                >
                Nuevo Producto ➕
                </button>
                <div 
                v-if="Productos.length > 0"
                class="
                grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3 
                gap-6
                ">
                    <div 
                    :class="Estatuscolor(i.activo)" 
                    v-for= "i in Productos" 
                    :key="i.id"
                    class="
                    flex flex-col 
                    items-center text-center overflow-hidden
                    p-4 gap-2
                    rounded-2xl shadow-md
                    bg-green-300/50
                    ">
                        <div>
                            <img
                            v-if="i.imagenes.length > 0"
                            :src=ObtenerImgUrl(i.imagenes[0].s3_key)
                            class="imagen"
                            >
                            <img
                            v-else
                            src="../assets/images.png"
                            class="imagen"
                            >
                            <div
                            >
                                <h2 class="font-bold">
                                {{ i.nombre }}
                                </h2>
                                <h3>
                                Categoria: 
                                {{ i.categoria }}
                                </h3>
                                <h2>
                                ${{ i.precio }}
                                </h2>
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
    // ----- Imports ----- //
    import { onMounted, toRefs, ref, watch } from 'vue'
    import { supabase } from '../config/supebase.js'
    import { CarritoLocal, CerrarSesion, Rol, ActualizarCajaP, ProductoActual, ProductoCantidad, PedidoActual } from './Estatus.js'
    // ----- Variables ----- //
    
    const prop = defineProps(['path','size'])
    const ActualizarCajaPDel = ref(false)
    const OpcionCategoriaA = ref("new")
    const { path, size } = toRefs(prop)
    const OpcionCategoria = ref("new")
    const VentanaCompra = ref(false)
    const VentanaNuevo = ref(false)
    const fileInput = ref('')
    const ListaCategoria = ref ("")
    const ArchivoSave = ref(null)
    const uploading = ref(false)
    const filtroAct = ref(false)
    const ProductoEli = ref("")
    const VistaPrevia = ref('')
    const filtrocat = ref ("")
    const filtroRadio = ref(0)
    const Productos = ref([])
    const filtroEst = ref(1)
    const Busqueda = ref("")
    const mayor = ref("")
    const menor = ref("")
	const Pagina = ref(0)
    const files = ref()
    const src = ref('')
    // ----- Funciones Vue ----- //
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
    watch(path, () => {
        if (path.value) ObtenerImgUrl()
    })
    const emit = defineEmits([
        'upload',
        'update:path'
    ])
    // ----- Para el Frontend ----- //
	const AbrirPopUp01 = () => {
		ActualizarCajaP.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp01 = () => {
		ActualizarCajaP.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp02 = () => {
		ActualizarCajaPDel.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp02 = () => {
		ActualizarCajaPDel.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp03 = () => {
        LimpiarImagen()
		VentanaNuevo.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp03 = () => {
		VentanaNuevo.value = false
		document.body.style.overflow = "auto";
	}
	const AbrirPopUp04 = () => {
		VentanaCompra.value = true
		document.body.style.overflow = "hidden";
	}
	const CerrarPopUp04 = () => {
        VentanaCompra.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
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
    const Compracion = (producto_fila) => {
        VentanaComprar(producto_fila)
        AbrirPopUp04()
    }
    const VentanaComprar = (ProductoSeleccionado) => {
        AbrirPopUp04()
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
    const AplicarFiltro = () => {
        BusquedaProducto();
        menor.value = "";
        mayor.value = "";
    }
    const LimpiarFiltro = () => {
        filtroRadio.value = 4
        filtrocat.value = ""
        filtroEst.value =  1
        BusquedaProducto();
        filtroAct.value = false
    }
    const NuevoProducto = ref({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
    })
    const SeleccionarImagen = (evt) => {
        const file = evt.target.files[0]
        if (file) {
            ArchivoSave.value = file
            VistaPrevia.value = URL.createObjectURL(file)
        }
    }
    const LimpiarImagen = () => {
    VistaPrevia.value = ''
    ArchivoSave.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }}
    const ObtenerImgUrl = (Imgenkey) => {
        const respuesta = supabase.storage
            .from('max_imagenes')
            .getPublicUrl(Imgenkey)
        return respuesta.data.publicUrl
    }
    const ProductoAct = ref({
        id: "",
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        codigo_barra: ""
    })
    const Eliminacion = (producto_fila) => {
        ProductoEli.value = producto_fila.id;
        AbrirPopUp02()
    }
    // ----- Para el Backend ----- //
    const CarritoStock = (Producto) => {
        let stockCarrito = 0
        CarritoLocal.value.forEach((itemCarrito) => {
            if (itemCarrito.id_producto === Producto.id) {
                stockCarrito = stockCarrito + itemCarrito.cantidad
            }
        })
        return Producto.stock - stockCarrito;
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
        CerrarPopUp04()    
    }
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
                CerrarPopUp04()
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
        const ProductoNew = await SubidaNuevoProducto.json()
        const NewId = ProductoNew.id        
        if (ArchivoSave.value) {
            const file = ArchivoSave.value
            const fileExt = file.name.split('.').pop()
            const filePath = `${Math.random()}.${fileExt}`
            uploading.value = true
            let { error: uploadError } = await supabase.storage
                .from('max_imagenes')
                .upload(filePath, file)
            if (uploadError) {
                alert("El Producto se creo, Pero hubi un  error subiendo la imagen")
            } else {
                await fetch('http://localhost:8000/productos/archivos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_producto: NewId,
                        s3_key: filePath,
                        nombre_original: file.name,
                        tipo_contenido: fileExt,
                        tamanio: file.size
                })
            })
        }}
        uploading.value = false
        NuevoProducto.value = {
            nombre: "",
            precio: "",
            stock: "",
            categoria: ""
        }
        LimpiarImagen()
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
        AbrirPopUp01()
    }
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
        CerrarPopUp01()
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
        CerrarPopUp02()
    }
</script>
