<template>
  <div v-if="Iniciado">
    <div class="barra">
      <img alt="Vue logo" src="./assets/logo.png">
      <div class="botones">
        <h1 @click="TablaActual = 'Pedidos'">
          Ver Pedidos
        </h1>
        <h1 @click="TablaActual = 'Clientes'">
          Ver Clientes
        </h1>
        <h1 @click="TablaActual = 'Productos'">
          Ver Productos
        </h1>
        <h1 @click="CerrarSesion" class="cerrar">
          Cerrar Sesion
        </h1>
      </div>
    </div>
    <div>
      <Pedidos v-if="TablaActual === 'Pedidos'"/>
      <Clientes  v-if="TablaActual === 'Clientes'"/>
      <Productos v-if="TablaActual === 'Productos'"/>
      
    </div>
  </div>
  <div v-else class="contenedor_login">
    <Login @LoginExitoso="Iniciado = true"/>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import Login from './components/Login.vue'
  import Pedidos from "./components/Pedidos.vue"
  import Clientes from "./components/Clientes.vue"
  import Productos from "./components/Productos.vue"
  const TablaActual = ref('');
  const Iniciado = ref(false);
  onMounted(() => {
        const tokenGuardado = localStorage.getItem("token");
        if (tokenGuardado) {
            Iniciado.value = true
        }
    });
  const CerrarSesion = () =>{
    localStorage.removeItem("token")
    Iniciado.value = false
  }
</script>

<style scoped>
.barra{
  width: 100%;
  background-color: darkblue;
  margin: 0;
}
.botones{
  display: flex;
  background-color: rgb(26, 26, 153);
  user-select: none;
}
.botones> *{
  border-radius: 0%;
  border-right: 1px solid white;
  padding-right: 10px;
}
.botones> *:last-child{
  border-right: none;
  padding-right: 10px;
}
.contenedor_login{
  padding: 50px;
  margin: 50px auto;
  width: fit-content;
  background-color: #daa32c;
  border-radius: 20px;
}
</style>
