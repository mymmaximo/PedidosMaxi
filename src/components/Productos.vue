<template>
  <input
    @input="BusquedaProducto"
    type="text" v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
  <div class="contenedor">
    <div class="contenedor_principal">
      <h1>
        Productos
      </h1>
      <div class="contenedor_tabla">
        <table class="tabla">
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
              <td v-if="Rol === '1'">
                <button @click="BorrarProducto(i)" class="botoncentro">
                  ✖
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
  </div>
  <Comprar/>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import Comprar from './Comprar.vue';
  import { CarritoLocal, VentanaComprar, CerrarSesion, Rol, ProductoActual, ActualizarCajaP } from './Estatus.js';
  const Edicion = (producto_fila) => {
    ProductoAct.value.id = producto_fila.id;
    ProductoAct.value.nombre = producto_fila.nombre;
    ProductoAct.value.precio = producto_fila.precio;
    ProductoAct.value.stock = producto_fila.stock;
    ProductoAct.value.categoria = producto_fila.categoria;
    ProductoAct.value.codigo_barra = producto_fila.codigo_barra;
    ActualizarCajaP.value = true;
  };
  const Productos = ref([]);
  const Busqueda = ref("")
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/productos/')
    const datos = await respuesta.json();
    Productos.value = datos;
  })
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
    const BusqProducto = await fetch(`http://localhost:8000/producto/?busqueda_producto=${Busqueda.value}`)
    const datos = await BusqProducto.json();
    Productos.value = datos;
  }
  const NuevoProducto = ref({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    codigo_barra: ""
  });
  const SubirNuevoProducto = async() => {
    const SubidaNuevoProducto = await fetch('http://localhost:8000/productos/', {
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
    const respuesta = await fetch('http://localhost:8000/productos/');
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
  const BorrarProducto = async(id_producto) => {
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
    const respuesta = await fetch("http://localhost:8000/productos/");
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
.caja_elejir_cantidad{
  padding: 15px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.botoncentro{
  align-self: center;
}.caja_editar{
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
</style>