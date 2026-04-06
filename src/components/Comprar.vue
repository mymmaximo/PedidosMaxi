<template>
    <div class="caja_elejir_cantidad" v-if="MostrarProducto_Cantidad">
        <h1>
            {{ ProductoActual.nombre }}
        </h1>
        <div>
            <input type="number" v-model="ProductoCantidad">
            <button @click="SumarProducto(producto)" v-if="producto.stock > ProductoCantidad">
                +
            </button>
            <button @click="ProductoCantidad--" v-if=""
                -
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const ProductoActual = ref(null)
    const ProductoCantidad = ref(1)
    const MostrarProducto_Cantidad = ref(false)
    const Confirmar = (async() =>{
        const tokenGuardado = localStorage.getItem("token");
        const respuesta = await fetch('http://localhost:8000/pedidos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenGuardado
            },
            body: JSON.stringify({
                id_producto: ProductoActual.value,
                cantidad: ProductoCantidad.value
            })
        })
        if (respuesta.ok) {
            Cancelar ()
            conslole.log ("funciono")
        }
    })
    const Cancelar = () =>{
        MostrarProducto_Cantidad.value = false
        ProductoActual.value = null
        ProductoCantidad.value = 1
    }
</script>

<style scoped>

</style>