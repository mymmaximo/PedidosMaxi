<template>
    <div class="contenedor_secundario" v-if="Rol === '1'">
      <h1>
        Nuevo Cliente
      </h1>
      <form @submit.prevent="SubirNuevoCliente" class="Texto_producto">
        <input type="text" v-model="NuevoCliente.nombre" placeholder="Nombre">
        <input type="text" v-model="NuevoCliente.apellido" placeholder="Apellido">
        <input type="text" v-model="NuevoCliente.email" placeholder="E-Mail">
        <input type="text" v-model="NuevoCliente.usuario" placeholder="Usuario">
        <input type="text" v-model="NuevoCliente.contrasena" placeholder="Contraseña">
        <button type="submit" class="Boton_Crear">
            Crear Cliente
        </button>
      </form>
    </div>
    <div class="contenedor_secundario" v-if="Rol === '1'">
      <h1>
        Actualizar Cliente
      </h1>
      <form @submit.prevent="ActualizarClientes" class="Texto_producto">
        <input type="text" v-model="ClienteAct.id" placeholder="ID">
        <input type="text" v-model="ClienteAct.nombre" placeholder="Nombre">
        <input type="text" v-model="ClienteAct.apellido" placeholder="Apellido">
        <input type="text" v-model="ClienteAct.email" placeholder="E-Mail">
        <input type="text" v-model="ClienteAct.usuario" placeholder="Usuario">
        <input type="text" v-model="ClienteAct.contrasena" placeholder="Contraseña">
        <button type="submit" class="Boton_Crear">
          Actualizar
        </button>
      </form>
    </div>
    <div class="contenedor_secundario">
      <h1>
        Actualizar Usuario
      </h1>
      <form @submit.prevent="ActualizarUsuario" class="Texto_producto">
        <input type="text" v-model="ActualizarUsuario.id" placeholder="ID">
        <input type="text" v-model="ActualizarUsuario.nombre" placeholder="Nombre">
        <input type="text" v-model="ActualizarUsuario.apellido" placeholder="Apellido">
        <input type="text" v-model="ActualizarUsuario.email" placeholder="E-Mail">
        <input type="text" v-model="ActualizarUsuario.usuario" placeholder="Usuario">
        <input type="text" v-model="ActualizarUsuario.contrasena" placeholder="Contraseña">
        <button type="submit" class="Boton_Crear">
          Actualizar Datos
        </button>
      </form>
    </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { CarritoLocal, VentanaComprar, CerrarSesion, Rol } from './Estatus.js';
import Clientes from './Clientes.vue';
  const NuevoCliente = ref({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    contrasena: ""
  });
  const SubirNuevoCliente = async() => {
    const SubidaNuevoCliente = await fetch('http://localhost:8000/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NuevoCliente.value)
    });
    if (SubidaNuevoCliente.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    NuevoCliente.value = {
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrasena: ""
    };
    const respuesta = await fetch('http://localhost:8000/clientes/');
    const datos = await respuesta.json();
    Clientes.value = datos;
  };
  const ClienteAct = ref({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    contrasena: ""
  });
  const ActualizarClientes = async() => {
    const ActCliente = await fetch(`http://localhost:8000/clientes/id/${ClienteAct.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ClienteAct.value)
    });
    if (ActCliente.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    ClienteAct.value = {
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrasena: ""
    };
    const respuesta = await fetch("http://localhost:8000/clientes/");
    const datos = await respuesta.json();
    Clientes.value = datos;
  };


</script>

<style scoped>

</style>