<template>
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
            </tr>
          </tbody>
        </table>
      </div>  
    </div>
    <div class="contenedor_principal">
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
</template>

<script setup>
  import { onMounted, ref } from 'vue';

  const Productos = ref([]);
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/productos/')
    const datos = await respuesta.json();
    Productos.value = datos;
  })
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
</script>

<style scoped>
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
.Texto_producto{
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.contenedor{
  width: 100%;
  display: flex;
}
.Boton_Crear{
  padding: 10px;
  border-radius: 5px;
}
</style>