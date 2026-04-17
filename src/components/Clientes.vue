<template>
  <div class="contenedor">
    <div class="contenedor_principal">
      <h1>
        Clientes
      </h1>
      <div class="contenedor_tabla">
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
                <td v-if="Rol === '1'">
                  <button @click="BorrarCliente(i)" class="botoncentro">
                    ✖
                  </button>
                </td>
                <td v-if="Rol === '1'">
                  <button @click="Edicion(i)" class="botoncentro">
                    ✎
                  </button>
                </td>
              </tr>
              <tr v-if = "DireccionNow === i.id">
                  <td colspan="5" class="cajon_direcciones">
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
        <input type="text" v-model="ClienteAct.id_rol" placeholder="Rol 1.Adm 2. Trabajador 3.Cliente">
        <button type="submit" class="Boton_Crear">
          Actualizar
        </button>
        <button @click="ActualizarCajaC = false" class="Boton_Crear">
          Cancelar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { Rol, CerrarSesion, ActualizarCajaC } from './Estatus';

  const clientes =  ref([])
  const DireccionNow = ref(null)
  const DireccionCambio = (id) => {
    if (DireccionNow.value === id) {
      DireccionNow.value = null
    }
    else {
      DireccionNow.value = id
    }
  }
  onMounted(async() => {
    const respuesta = await fetch('http://localhost:8000/clientes/')
    const datos = await respuesta.json();
    clientes.value = datos;
  })
  const BorrarCliente = async(id_cliente) => {
    const EraseCliente = await fetch(`http://localhost:8000/clientes/id/${id_cliente.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (EraseCliente.status === 401) {
        CerrarSesion();
        alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.");
        return;
    }
    const respuesta = await fetch("http://localhost:8000/clientes/");
    const datos = await respuesta.json();
    clientes.value = datos;
  };
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
        const respuesta = await fetch("http://localhost:8000/clientes/");
        const datos = await respuesta.json();
        Clientes.value = datos;
    };
    const Edicion = (cliente_fila) => {
    ClienteAct.value.id = cliente_fila.id;
    ClienteAct.value.nombre = cliente_fila.nombre;
    ClienteAct.value.apellido = cliente_fila.apellido;
    ClienteAct.value.email = cliente_fila.email;
    ClienteAct.value.usuario = cliente_fila.usuario;
    ActualizarCajaC.value = true;
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
  background-color: #ffb8b8;
  color: #690000;
  text-align: center;
}
.boton_direcciones{
  cursor: pointer;
  background-color: #f8fff1;
  border-radius: 15px;
  user-select: none;
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
