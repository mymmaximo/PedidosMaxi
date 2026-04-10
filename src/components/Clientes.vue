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
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';

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
