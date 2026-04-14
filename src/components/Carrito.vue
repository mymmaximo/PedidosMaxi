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
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in CarritoLocal" :key="index">
                        <td>{{ item.nombre_producto }}</td>
                        <td>
                            <input 
                                type="number"
                                v-model="item.cantidad"
                                @change="VerificarStock(item)" 
                                class="botoncentro"
                            >
                        </td>
                        <td>${{ item.precio_unitario }}</td>
                        <td>${{ item.cantidad * item.precio_unitario }}</td>
                        <td @click="BorrarDetalle(index)" style="cursor: pointer;" class="botoncentro">
                            ❌
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h2>
            Total: ${{ 
                CarritoLocal.reduce((suma, item) => suma + (item.cantidad * item.precio_unitario), 0) 
                }}
        </h2>
        <button @click="PantallaPagar = true">
            Completar Pedido
        </button>
    </div>
    <div v-if="PantallaPagar === true" class="contenedor">
        <label>
            Método de Pago:
        </label>
        <select v-model="MetodoPago">
            <option value="" disabled>
                Selecciona un método...
            </option>
            <option value="Tarjeta">
                Tarjeta de Crédito / Débito
            </option>>
            <option value="MercadoPago">
                Mercado Pago
            </option>
            <option value="Transferencia">
                Transferencia Bancaria
            </option>
            <option value="Efectivo">
                Efectivo al recibir
            </option>
        </select>
        <label>
            Dirección de Envío:
        </label>
            <label>
                Tus Direcciones
            </label>
            <select v-model="DireccionExistente">
                <option value="">
                    + Agrega una direccion
                </option>
                <option v-for="i in ListaDirecciones" :key="i.id_direccion" :value="i.id_direccion">
                    {{ i.calle }},
                    {{ i.numero }},
                    {{ i.barrio }},
                    {{ i.ciudad }},
                    {{ i.provincia }},
                </option>
            </select>
            <div v-if="DireccionExistente === ''">
                <label>
                    Nueva Direccion:
                </label>
                    <div class="Texto_producto">
                        <input type="text" v-model="NuevaDireccion.calle" placeholder="Calle" class="">
                        <input type="number" v-model="NuevaDireccion.numero" placeholder="Numero">
                        <input type="text" v-model="NuevaDireccion.barrio" placeholder="Barrio">
                        <input type="text" v-model="NuevaDireccion.ciudad" placeholder="Ciudad">
                        <input type="text" v-model="NuevaDireccion.provincia" placeholder="Provincia">
                        <button type="submit" class="Boton_Crear">
                            Agregar Direccion
                        </button>
                    </div>
            </div>
        <button @click="PantallaPagar = false">
            Cancelar
        </button>
        <button disabled>
            Finalizar Compra
        </button>   
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue'
    import { CarritoLocal } from './Estatus.js'
    const idUsuario = localStorage.getItem("id_cliente");
    const emit = defineEmits(['CarritoVacio']);
    const PantallaPagar = ref (false)
    const DireccionEnvio = ref (" ")
    const MetodoPago = ref ("")
    const ListaDirecciones = ref([])
    const NuevaDireccion = ref ({
        calle: "",
        numero: null,
        barrio: "",
        ciudad: "",
        provincia: ""
    })
    const MostrarAgregarD = () => {
        if (DireccionExistente){
            return false
        } else {
            return true            
        }
    }
    const DireccionExistente = ref ("")
    const BorrarDetalle = (index) => {
        CarritoLocal.value.splice(index, 1);
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
        if (CarritoLocal.value.length === 0) {
            emit('CarritoVacio');
        }
    }
    const VerificarStock = (item) => {
        if (item.cantidad < 1){
            item.cantidad = 1
        }
        if (item.cantidad > item.stock_producto) {
            item.cantidad = item.stock_producto
        }
        localStorage.setItem('carrito_pendiente', JSON.stringify(CarritoLocal.value));
    }
    onMounted(async() => {
        const respuesta = await fetch(`http://localhost:8000/cliente/${idUsuario}/direcciones`)
        const datos = await respuesta.json();
        ListaDirecciones.value = datos;
    })
</script>

<style scoped>
.contenedor{
  width: 60%;
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
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #000000;
}
thead{
  background-color: #bcf2f5;
  color: #005f69;
  text-align: center;
}
.Boton_Crear{
  padding: 10px;
  border-radius: 5px;
}
.Texto_producto{
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 60%;
}
.botoncentro{
  background-color: white;
  color: black;
  text-align: center;
}
</style>