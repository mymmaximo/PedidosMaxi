
<template>
    <div class="contenedor" v-if="CarritoLocal.length > 0">
        <div class="contenedor_principal">
            <h1>
                Tu Carrito
            </h1>
        </div>
        <div class="contenedor_tabla">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in CarritoLocal" :key="index">
                        <td>{{ item.nombre_producto }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>${{ item.precio_unitario }}</td>
                        <td>${{ item.cantidad * item.precio_unitario }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>
            Total: ${{ 
                CarritoLocal.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0) 
                }}
        </h2>
    </div>
</template>


<script setup>
  import { CarritoLocal } from './Estatus.js'
</script>

<style scoped>
.contenedor{
  width: 100%;
  display: flex;
  flex-direction: column;
}
h1{
  color: black;
  font-size: x-large;
  margin: 0;
  width: fit-content;
}
.contenedor_tabla {
  width: 50%;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #000000;
}
thead{
  background-color: #bcf2f5;
  color: #005f69;
  text-align: center;
}
.Texto_producto{
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>