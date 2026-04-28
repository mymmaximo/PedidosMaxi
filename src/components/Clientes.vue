<template>
  <input
    @input="BusquedaCliente"
    type="text" v-model="Busqueda" 
    placeholder="Busqueda..."
    class="busqueda"
    >
  <button @click="VentanaFiltro = true" class="botoncentro">
    Filtros ☰
  </button>
  <div class="caja_editar" v-if="VentanaFiltro === true">
    <h2>
      ¿Realizo un Pedido?
    </h2>
    <div class="caja_radios">
      <label>
        <input 
        type="radio" 
        :value="1"
        v-model="filtroDirec"
        > 
        Realizo uno o mas Pedidos
      </label>
      <label>
        <input 
        type="radio" 
        :value="0"
        v-model="filtroDirec"
        > 
        No Realizo Pedidos
      </label>
    </div>
     <h2>
       ¿El Cliente esta Activo?
     </h2>
     <div class="caja_radios">
      <label>
        <input 
        type="radio" 
        :value="2"
        v-model="filtroEst"
        > 
        Todos los Clientes
      </label>
      <label>
        <input 
        type="radio" 
        :value="1"
        v-model="filtroEst"
        > 
        Cliente Activo
      </label>
      <label>
        <input 
        type="radio" 
        :value="0"
        v-model="filtroEst"
        > 
        Cliente Eliminado
      </label>
    </div>
    <button @click="AplicarFiltro" class="Boton_Crear">
      Filtrar
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
        Clientes
      </h1>
      <div class="contenedor_tabla" v-if="clientes.length > 0">
        <table class="tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Apellido
              </th>
              <th>
                Email
              </th>
              <th>
                DNI
              </th>
              <th>
                Direcciones
              </th>
              <th>
                Activo
              </th>
              <th v-if="Rol === '1'">
                Eliminar
              </th>
              <th v-if="Rol === '1'">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for= "i in clientes" :key="i.id">
              <tr>
                <td>
                  {{ i.nombre }}
                </td>
                <td>
                  {{ i.apellido }}        
                </td>
                <td>
                  {{ i.email }}
                </td>
                <td>
                  {{ i.dni }}
                </td>
                <td v-if="i.direcciones.length > 0" @click= "DireccionCambio(i.id)" class="boton_direcciones">
                  Ver Direcciones
                </td>
                <td v-else>
                  No hay Direcciones Adjuntas
                </td>
                <td :class="Estatuscolor(i.activo)">
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
              <tr v-if = "DireccionNow === i.id">
                <td colspan="8" class="cajon_direcciones">
                  <div class="caja_direcciones">
                  <table class="tabla_direcciones">
                    <thead class="cabeza_direcciones">
                      <tr>
                        <th>
                          Calle
                        </th>
                        <th>
                          Numero
                        </th>
                        <th>
                          Barrio
                        </th>
                        <th>
                          Ciudad
                        </th>
                        <th>
                          Provincia
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for = "e in i.direcciones" :key="e.id">
                        <td>
                        {{ e.calle }}
                        </td>
                        <td>
                        {{ e.numero }}
                        </td>
                        <td>
                        {{ e.barrio }}
                        </td>
                        <td>
                        {{ e.ciudad }}
                        </td>
                        <td>
                        {{ e.provincia }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                  </td>
                </tr>
            </template>
          </tbody>
        </table>
      </div>  
      <div v-else>
        <h3>No se encontraran clientes 😔</h3>
        <p>Prueba buscando con otro termino</p>
      </div>
    </div>
    <div class="caja_editar" v-if="ActualizarCajaC">
      <h1>
        Actualizar Cliente {{ ClienteAct.nombre }}
      </h1>
      <form @submit.prevent="ActualizarClientes" class="Texto_producto">
        <input type="text" v-model="ClienteAct.nombre" placeholder="Nombre">
        <input type="text" v-model="ClienteAct.apellido" placeholder="Apellido">
        <input type="text" v-model="ClienteAct.email" placeholder="E-Mail">
        <input type="text" v-model="ClienteAct.usuario" placeholder="Usuario">
        <input type="text" v-model="ClienteAct.contrasena" placeholder="Contraseña">
        <select v-model="ClienteAct.id_rol" class="seleccion">
            <option value="" disabled>
              Selecciona un Rol...
            </option>
            <option value=1>
              Administrador
            </option>>
            <option value=2>
              Trabajador
            </option>
            <option value=3>
              Cliente
            </option>
        </select>
        <button type="submit" class="Boton_Crear">
          Actualizar
        </button>
        <button @click="ActualizarCajaC = false" class="Boton_Crear">
          Cancelar
        </button>
      </form>
      </div>
        <div class="caja_editar" v-if="ActualizarCajaCDel">
          <h1>
            ¿Desear Eliminar/Reactivar el Cliente?
          </h1>
          <button @click="BorrarCliente()">
            Si Confirmo
          </button>
          <button @click="ActualizarCajaCDel = false">
            Cancelar
          </button>
      </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { Rol, CerrarSesion, ActualizarCajaC } from './Estatus';
  const clientes =  ref([])
  const Busqueda = ref("")
  const filtroAct = ref(false)
  const filtroEst = ref(2)
  const DireccionNow = ref(null)
  const VentanaFiltro = ref(false);
  const filtroDirec = ref(2);
  const ActualizarCajaCDel = ref(false)
  const Eliminacion = (cliente_fila) => {
    ClienteEli.value = cliente_fila.id;
    ActualizarCajaCDel.value = true;
  };
  const Estatustxt = (id_estatus) => {
    if (id_estatus === true) {
      return "Activo"
    }
    else if (id_estatus === false) {
      return "Eliminado"
    }
  }
  const DireccionCambio = (id) => {
    if (DireccionNow.value === id) {
      DireccionNow.value = null
    }
    else {
      DireccionNow.value = id
    }
  }
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/cliente/')
    const datos = await respuesta.json();
    clientes.value = datos;
  })
  const BorrarCliente = async() => {
    const EraseCliente = await fetch(`http://localhost:8000/clientes/id/${ClienteEli.value}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    ClienteEli.value = ""
      if (EraseCliente.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    const respuesta = await fetch("http://localhost:8000/cliente/");
    const datos = await respuesta.json();
    clientes.value = datos;
    ActualizarCajaCDel.value = false
  };
  const Estatuscolor = (id_estatus) => {
    if (id_estatus === true) {
      return "classActivo"
    }
    else if (id_estatus === false) {
      return "classEliminado"
    }
  }
  const ClienteEli = ref("")
  const ClienteAct = ref({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    contrasena: "",
    id_rol: ""
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
            id: "",
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
            contrasena: "",
            id_rol: ""
        };
        const respuesta = await fetch("http://localhost:8000/cliente/");
        const datos = await respuesta.json();
        clientes.value = datos;
        ActualizarCajaC.value = false;
  };
  const Edicion = (cliente_fila) => {
    ClienteAct.value.id = cliente_fila.id;
    ClienteAct.value.nombre = cliente_fila.nombre;
    ClienteAct.value.apellido = cliente_fila.apellido;
    ClienteAct.value.email = cliente_fila.email;
    ClienteAct.value.usuario = cliente_fila.usuario;
    ActualizarCajaC.value = true;
  };
  const LimpiarFiltro = () => {
    filtroDirec.value = 2
    filtroEst.value = 1
    BusquedaCliente();
    VentanaFiltro.value = false;
    filtroAct.value = false
  }
  const BusquedaCliente = async() => {
    let url = new URL ('http://localhost:8000/cliente/');
    if (Busqueda.value !== "") {
      url.searchParams.append('busqueda_cliente', Busqueda.value);
    }
    if (filtroDirec.value === 1) {
      url.searchParams.append('bool_direccion', 'true');
      filtroAct.value = true;
    }
    if (filtroDirec.value === 0) {
      url.searchParams.append('bool_direccion', 'false');
      filtroAct.value = true;
    }
    if (filtroEst.value === 1) {
      url.searchParams.append('bool_activo', 'true');
      filtroAct.value = true;
    }
    if (filtroEst.value === 0) {
      url.searchParams.append('bool_activo', 'false');
      filtroAct.value = true;
    }
    const BusqCliente = await fetch(url)
    const datos = await BusqCliente.json();
    clientes.value = datos;
  }
  const AplicarFiltro = () => {
    BusquedaCliente();
    VentanaFiltro.value = false;
  }
</script>

<style scoped>
h1{
  color: black;
  font-size: x-large;
  margin: 0;
  width: fit-content;
}
.seleccion{
  padding: 10px;
}
.busqueda{
  padding: 10px;
  width: 70%;
}
.contenedor_tabla {
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #000000;
}
thead{
  background-color: #ffb8b8;
  color: #690000;
  text-align: center;
}
.boton_direcciones{
  cursor: pointer;
  background-color: #f8fff1;
  user-select: none;
}
.classActivo{
  background-color: #d5f1cb;
}
.classEliminado{
  background-color: #f58a72;
}
.caja_direcciones{
  background-color: #ffffff;
  padding: 10px 10px;
}
.cabeza_direcciones{
  background-color: #fccaca;
  color: #4d0000;
  text-align: center;
}
.tabla_direcciones{
  width: 100%;
  overflow: hidden;
  border: 1px solid #000000
}
.cajon_direcciones{
  padding: 0 !important; 
  background-color: #f9f4f4;
}
.botoncentro{
  align-self: center;
}
.Texto_cliente{
  padding: 10px;
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
