<template>
  <input
    @input="BusquedaProducto"
    type="text" 
    v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
  <button @click="VentanaFiltro = true" class="botoncentro">
    Filtros ☰
  </button>
  <div class="caja_editar" v-if="VentanaFiltro === true">
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
    <button @click="VentanaFiltro = false" class="Boton_Crear">
      Cerrar
    </button>
  </div>
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
                <button @click="VentanaComprar(i)" :disabled="CarritoStock(i) === 0" class="botoncentro">
                  🛒
                </button>
              </td>
              <td :class="Estatuscolor(i.activo)" v-if="Rol === '1'">
                {{ Estatustxt(i.activo) }}
              </td>
              <td v-if="Rol === '1'">
                <button @click="Eliminacion(i)" v-if="i.activo" class="botoncentro">
                  ✖
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
    <div class="caja_editar" v-if="ActualizarCajaP">
        <h1>
        Actualizar Producto {{ ProductoAct.nombre }}
      </h1>
      <form @submit.prevent="ActualizarProducto" class="Texto_producto">
        <input type="text" v-model="ProductoAct.nombre" placeholder="Nombre">
        <input type="text" v-model="ProductoAct.precio" placeholder="Precio">
        <input type="text" v-model="ProductoAct.stock" placeholder="Stock">
        <input type="text" v-model="ProductoAct.categoria" placeholder="Categoria">
        <input type="text" v-model="ProductoAct.codigo_barra" placeholder="Codigo de Barras">
        <button type="submit" class="Boton_Crear">
          Actualizar
        </button>
        <button @click="ActualizarCajaP = false" class="Boton_Crear">
          Cancelar
        </button>
      </form>
    </div>
    <div class="contenedor_secundario" v-if="Rol === '1'">
      <h1>
        Nuevo Producto
      </h1>
      <form @submit.prevent="SubirNuevoProducto" class="Texto_producto">
        <input type="text" v-model="NuevoProducto.nombre" placeholder="Nombre">
        <input type="text" v-model="NuevoProducto.precio" placeholder="Precio">
        <input type="text" v-model="NuevoProducto.stock" placeholder="Stock">
        <input type="text" v-model="NuevoProducto.categoria" placeholder="Categoria">
        <input type="text" v-model="NuevoProducto.codigo_barra" placeholder="Codigo de Barras">
        <button type="submit" class="Boton_Crear">
          Crear
        </button>
      </form>
      </div>
      <div class="caja_editar" v-if="ActualizarCajaPDel">
        <h1>
          ¿Desear Eliminar/Reactivar el Producto?
        </h1>
        <button @click="BorrarProducto()">
          Si Confirmo
        </button>
        <button @click="ActualizarCajaPDel = false">
          Cancelar
        </button>
      </div>
  </div>
  <Comprar/>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import Comprar from './Comprar.vue';
  import { CarritoLocal, VentanaComprar, CerrarSesion, Rol, ProductoActual, ActualizarCajaP } from './Estatus.js';
  const VentanaFiltro = ref(false);
  const filtroAct = ref(false)
  const mayor = ref("");
  const menor = ref("");
  const filtroRadio = ref(0);
  const Productos = ref([]);
  const ProductoEli = ref("")
  const Busqueda = ref("")
  const filtroEst = ref(1)
  const ActualizarCajaPDel = ref(false)
  const Eliminacion = (producto_fila) => {
    ProductoEli.value = producto_fila.id;
    ActualizarCajaPDel.value = true;
  };
  const LimpiarFiltro = () => {
    filtroRadio.value = 4
    BusquedaProducto();
    VentanaFiltro.value = false;
    filtroAct.value = false
  }
    const BorrarProducto = async() => {
    const EraseProducto = await fetch(`http://localhost:8000/productos/id/${ProductoEli.value}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    ProductoEli.value = ""
      if (EraseProducto.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    const respuesta = await fetch("http://localhost:8000/producto/");
    const datos = await respuesta.json();
    Productos.value = datos;
    ActualizarCajaPDel.value = false
  };
  const Edicion = (producto_fila) => {
    ProductoAct.value.id = producto_fila.id;
    ProductoAct.value.nombre = producto_fila.nombre;
    ProductoAct.value.precio = producto_fila.precio;
    ProductoAct.value.stock = producto_fila.stock;
    ProductoAct.value.categoria = producto_fila.categoria;
    ProductoAct.value.codigo_barra = producto_fila.codigo_barra;
    ActualizarCajaP.value = true;
  };
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/producto/')
    const datos = await respuesta.json();
    Productos.value = datos;
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
    VentanaFiltro.value = false;
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
    });
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
  };
  const ProductoAct = ref({
    id: "",
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    codigo_barra: ""
  });
  const ActualizarProducto = async() => {
    const ActProducto = await fetch(`http://localhost:8000/productos/id/${ProductoAct.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ProductoAct.value)
    });
    if (ActProducto.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    ActualizarCajaP.value = false;
    const respuesta = await fetch("http://localhost:8000/productos/");
    const datos = await respuesta.json();
    Productos.value = datos;
    ActualizarCajaP.value = false;
  };
  const BorrarProduct = async(id_producto) => {
    const EraseProducto = await fetch(`http://localhost:8000/productos/id/${id_producto.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (EraseProducto.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    const respuesta = await fetch("http://localhost:8000/producto/");
    const datos = await respuesta.json();
    Productos.value = datos;
  };
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
.caja_elejir_cantidad{
  padding: 15px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.botoncentro{
  align-self: center;
}
.caja_editar{
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
  border: 2px solid #000000;
  z-index: 1000;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
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