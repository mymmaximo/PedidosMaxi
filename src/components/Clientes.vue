<template>
    <div class="cuerpo">

        <!-- Confirmacion -->
        <!-- Desactivar Cliente -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Delete" 
                @click.self="Cerrar_PopUp_Delete"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                            ¿Desear Eliminar/Reactivar el Cliente {{ Datos_Upgrade.nombre }}?
                        </h1>

                        <!-- Botones -->
                        <div class="botones">
                            <button @click="Backend_Delete()"
                            class="botoncon"
                            >
                                Si Confirmo
                            </button>
                            <button @click="Cerrar_PopUp_Delete"
                            class="botonc"
                            >
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </transition>
        </Teleport>

        <!-- Formulario -->
        <!-- Actualizar Cliente -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Upgrade"
                @click.self="Cerrar_PopUp_Upgrade"
                class="fondo"
                >
                    <div class="popup">
                        <form @submit.prevent="Backend_Put">

                            <!-- Encabezado -->
                            <h1>
                                    Actualizar Cliente {{ Datos_Upgrade.nombre }}
                            </h1>

                            <!-- Datos de Cliente -->
                            <h2>
                                Nombre
                            </h2>
                            <input placeholder="Nombre"
                            type="text" 
                            v-model="Datos_Upgrade.nombre" 
                            maxlength="20"
                            >
                            <h2>
                                E-mail
                            </h2>
                            <input placeholder="Email@email.com"
                            type="text" 
                            v-model="Datos_Upgrade.email" 
                            maxlength="50"
                            >

                            <!-- Botones -->
                            <div class="botones">
                                <button :disabled="Verificar_Boton"
                                type="submit" 
                                class="botoncon"
                                >
                                    Actualizar
                                </button>
                                <button @click="Cerrar_PopUp_Upgrade" 
                                class="botonc"
                                >
                                    Cancelar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
        
        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">

                <!-- Mostrar Fondo en Celular -->
                <Teleport to="body">
                    <transition name="fade">
                        <div v-if="(Mostrar_Filtro || Mostrar_Nuevo)" 
                        @click="Mostrar_Filtro = false; Mostrar_Nuevo = false"
                        class="fixed inset-0 
                        bg-black/40 backdrop-blur-sm 
                        z-[35] sm:hidden cursor-pointer"
                        >
                        </div>
                    </transition>
                </Teleport>

                <!-- Barra de Filtros y Formulario de Nuevo Cliente -->
                <div :class="['bar', (Mostrar_Filtro || Mostrar_Nuevo) 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >

                    <!-- Barra de Filtros -->
                    <div class="hidden sm:block">

                        <!-- Boton de Filtros -->
                        <h1 @click="Mostrar_Filtro = !Mostrar_Filtro ; Mostrar_Nuevo = false"
                        class="botonfil"
                        >
                            ᯤ
                        </h1>

                        <!-- Filtro -->
                        <transition name="slide">
                            <div v-if="Mostrar_Filtro"
                            class="flex flex-col lg:self-center"
                            >

                                <!-- Orden de Clientes -->
                                <div class="flex flex-col md:p-4 p-2">
                                    <h1>
                                        Ordenar
                                    </h1>
                                    <select placeholder=""
                                    v-model="Orden" 
                                    >
                                        <option value="" disabled>
                                            Orden...
                                        </option> 
                                        <option value="1">
                                            Nombre A-Z
                                        </option>
                                        <option value="2">
                                            Nombre Z-A
                                        </option>
                                        <option value="3">
                                            Clientes Antiguos
                                        </option>
                                        <option value="4">
                                            Clientes Recientes
                                        </option>
                                    </select>
                                </div>

                                <!-- Filtro Realizo el Pedido/Tiene Direcciones Cargadas -->
                                <div class="flex flex-col md:p-4 p-2">
                                    <h1>
                                        ¿Realizo un Pedido?
                                    </h1>
                                    <div class="flex flex-col">
                                        <label>
                                            <input :value="2" 
                                            type="radio"
                                            v-model="Filtro_Direccion"
                                            >
                                                Todos los Clientes
                                        </label>
                                        <label>
                                            <input :value="1"
                                            type="radio" 
                                            v-model="Filtro_Direccion"
                                            > 
                                                Realizo uno o mas Pedidos
                                        </label>
                                        <label>
                                            <input :value="0"
                                            type="radio"
                                            v-model="Filtro_Direccion"
                                            > 
                                                No Realizo Pedidos
                                        </label>
                                    </div>
                                </div>

                                <!-- Filtro Cliente Activo/Desactivo -->
                                <div class="flex flex-col p-2">
                                    <h1>
                                        ¿El Cliente esta Activo?
                                    </h1>
                                    <div class="flex flex-col">
                                        <label>
                                            <input :value="2"
                                            type="radio" 
                                            v-model="Filtro_Estatus"
                                            > 
                                                Todos los Clientes
                                        </label>
                                        <label>
                                            <input :value="1"
                                            type="radio" 
                                            v-model="Filtro_Estatus"
                                            > 
                                                Cliente Activo
                                        </label>
                                        <label>
                                            <input :value="0"
                                            type="radio"
                                            v-model="Filtro_Estatus"
                                            > 
                                                Cliente Eliminado
                                        </label>
                                    </div>
                                </div>

                                <!-- Filtro Direcciones -->
                                <div class="flex flex-col p-2">
                                    <div v-if="Filtro_Direccion === 1">

                                        <!-- Filtro Ciudad -->
                                        <h2>
                                            Ciudad del Cliente
                                        </h2>
                                        <select v-model="Filtro_Ciudad" 
                                        class="sel"
                                        >
                                            <option value="" disabled>
                                                Selecciona una Ciudad...
                                            </option>
                                            <option v-for="i in Datos_Ciudad" 
                                            :key="i.ciudad" 
                                            :value="i.ciudad"
                                            >
                                                {{ i.ciudad }}
                                            </option>
                                        </select>

                                        <!-- Filtro Provincia -->
                                        <h2>
                                            Provincia del Cliente
                                        </h2>
                                        <select v-model="Filtro_Provincia" 
                                        class="sel"
                                        >
                                            <option value="" disabled>
                                                Selecciona una Provincia...
                                            </option>
                                            <option v-for="i in Datos_Provincia" 
                                            :key="i.provincia" 
                                            :value="i.provincia"
                                            >
                                                {{ i.provincia }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Botones -->
                                <div class="botones">
                                    <button @click="Filtro_Aplicar" 
                                    class="botoncon"
                                    >
                                        Filtrar
                                    </button>
                                    <button @click="Filtro_Limpiar" 
                                    v-if="Mostrar_Limpiar_Filtro === true"
                                    class="botont" 
                                    >
                                        🗑️ Limpiar Filtro
                                    </button>
                                </div>

                            </div>
                        </transition>

                    </div>

                    <!-- Barra de Registro -->
                    <div>

                        <!-- Boton de Registro -->
                        <h1 @click="Mostrar_Nuevo = !Mostrar_Nuevo ; Mostrar_Filtro = false"
                        class="botonnew"
                        >
                            +
                        </h1>

                        <!-- Registro -->
                        <transition name="slide">
                            <div v-if="Mostrar_Nuevo"
                            class="flex flex-col lg:self-center"
                            >

                                <!-- Encabezado -->
                                <h1>
                                    Nuevo Cliente
                                </h1>

                                <!-- Formulario de Cliente -->
                                <form @submit.prevent="Backend_Post">
                                    <h2>
                                        Nombre
                                    </h2>
                                    <input placeholder="Nombre"
                                    type="text" 
                                    v-model="Datos_New.nombre" 
                                    maxlength="20"
                                    >
                                    <h2>
                                        E-Mail
                                    </h2>
                                    <input placeholder="E-Mail"
                                    type="text" 
                                    v-model="Datos_New.email" 
                                    maxlength="50"
                                    >
                                    <h2>
                                        Documento
                                    </h2>
                                    <input placeholder="Documento"
                                    type="text"
                                    v-model="Datos_New.dni"
                                    maxlength="8"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                    >
                                    <h2>
                                        Contraseña
                                    </h2>
                                    <input placeholder="Contraseña"
                                    type="text"
                                    v-model="Datos_New.contrasena"
                                    maxlength="20"
                                    >

                                    <!-- Botones -->
                                    <div class="botones">
                                        <button :disabled="Verificar_Boton"
                                        type="submit" 
                                        class="botoncon"
                                        >
                                            Crear Cliente
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </transition>
 
                    </div>

                </div>

                <!-- Tabla de Clientes -->
                <div class="start !px-5">

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando clientes..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                            Cargando clientes, un momento...
                        </h2>
                    </div>

                    <!-- Error Cargando -->
                    <div v-else-if="Backend_Error" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh] gap-4"
                    >
                        <h1 class="text-3xl font-bold text-red-600 text-center">
                            ¡Ups! La conexión tardó demasiado 🔌
                        </h1>
                        <h2 class="text-xl text-gray-700 text-center px-4">
                            El servidor no responde o tu conexión es inestable.
                        </h2>
                        <div class="mt-6 flex justify-center">
                            <button @click="Backend_Cargar()" 
                            class="botoncon 
                            !flex-none !w-auto 
                            px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Recargar Página
                            </button>
                        </div>
                    </div>

                    <!-- Clientes -->
                    <div v-else>

                        <!-- Mostrar Boton Filtro en Celular -->
                        <button @click="Mostrar_Filtro = true"
                        class="sm:hidden w-full mb-4 py-3 
                        bg-white text-green-800 font-black text-lg 
                        border-2 border-green-200 rounded-xl 
                        flex items-center justify-center gap-2 
                        shadow-sm transition-all 
                        active:scale-95 active:bg-green-50"
                        >
                            ᯤ Abrir Filtros
                        </button>

                        <!-- Barra de Busqueda -->
						<div class="flex flex-row items-stretch w-full gap-3 mb-5">-
							<input @input="Backend_Get"
							type="text" 
							v-model="Busqueda" 
							placeholder="Busqueda..."
							class="busqueda !mb-0"
							maxlength="50"
							>
						</div>

                        <!-- Encabezado -->
                        <h1 class="titulo-config">
                            Clientes
                        </h1>

                        <!-- Tabla de Clientes -->
                        <div>
                            <div v-if="Clientes.length > 0">
                                <div v-for= "i in Clientes"
                                :key="i.id"
                                class="mb-6 relative"
                                >

                                    <!-- Boton al Tocar Tarjeta de Cliente -->
                                    <!-- Si Tiene Direcciones las Muestra, Sino Desactiva Cliente -->
                                    <div @click= "Click_Items(i)"
                                    class="tarjeta-premium z-10 relative bg-white"
                                    >

                                        <!-- Datos de Clientes -->
                                        <div class="tarjeta-info">
                                            <div class="tarjeta-titulo">
                                                👤 {{ i.nombre }}
                                                <span :class="Estatus_Color(i.activo)">
                                                    {{ Estatus_Texto(i.activo) }}
                                                </span>
                                            </div>
                                            <p class="tarjeta-dato">
                                                📧 E-Mail: 
                                                <span class="tarjeta-valor">
                                                    {{ i.email }}
                                                </span>
                                            </p>
                                            <p class="tarjeta-dato">
                                                🪪 DNI: 
                                                <span class="tarjeta-valor">
                                                    {{ i.dni }}
                                                </span>
                                            </p>
                                            <p class="tarjeta-dato mb-1">
                                                📅 Creado el: 
                                                <span class="tarjeta-valor">
                                                    {{ Formato_Fecha(i.created_at) }}
                                                </span>
                                            </p>
                                        </div>

                                        <!-- Botones -->
                                        <div class="tarjeta-acciones">
                                            <button @click.stop="Abrir_PopUp_Delete(i)" 
                                            v-if="i.activo" 
                                            class="btn-chico-rojo"
                                            >
                                                ❌ Eliminar
                                            </button>
                                            <button v-else @click.stop="Abrir_PopUp_Delete(i)"
                                            class="btn-chico-verde"
                                            >
                                                🕊️ Reactivar
                                            </button>
                                            <button @click.stop="Abrir_PopUp_Upgrade(i)" 
                                            class="btn-chico-gris">
                                                ✏️ Editar
                                            </button>
                                        </div>

                                    </div>

                                    <!-- Direcciones -->
                                    <div v-if="i.direcciones.length === 0" 
                                    class="text-center text-xs 
                                    text-gray-400 font-medium my-3 italic"
                                    >
                                        Sin direcciones adjuntas
                                    </div>
                                    <div v-else-if="Mostrar_Direccion !== i.id" 
                                    @click.stop="Cambio_Direccion(i.id)"
                                    class="relative !z-[40]
                                    w-full mt-3 py-2 px-4 
                                    bg-green-50 hover:bg-green-100 
                                    text-green-700 border 
                                    border-green-200 rounded-xl 
                                    text-xs font-bold flex 
                                    items-center justify-center 
                                    gap-2 cursor-pointer 
                                    transition-all shadow-sm 
                                    active:scale-95"
                                    >
                                        Ver {{ i.direcciones.length }} Dirección(es) ⬇️
                                    </div>
                                    <div v-else @click.stop="Cambio_Direccion(i.id)"
                                    class="w-full mt-3 py-2 px-4 
                                    bg-gray-100 hover:bg-gray-200 text-gray-700 
                                    border border-gray-200 rounded-b-xl rounded-t-none 
                                    text-xs font-bold flex items-center 
                                    justify-center gap-2 
                                    cursor-pointer transition-all 
                                    shadow-inner active:scale-95 
                                    z-10 relative border-t-0 -mt-1" 
                                    >
                                        Ocultar Direcciones ⬆️
                                    </div>
                                    <transition name="slide">
                                        <div v-if="Mostrar_Direccion === i.id && i.direcciones.length > 0" 
                                        class="panel-desplegable 
                                        relative z-0 mt-2 
                                        bg-gray-50/50 rounded-xl 
                                        border border-gray-100 p-2"
                                        >
                                            <h3 class="text-lg font-bold 
                                            text-gray-800 
                                            mb-3 pb-2 
                                            border-b border-gray-200"
                                            >
                                                📍 Direcciones Registradas
                                            </h3>
                                            <div class="flex flex-col gap-3">
                                                <div v-for="e in i.direcciones" 
                                                :key="e.id" 
                                                class="flex flex-col 
                                                sm:flex-row
                                                justify-between 
                                                sm:items-center 
                                                bg-white p-4 shadow-sm gap-2
                                                rounded-xl border border-gray-200"
                                                >
                                                    <p class="tarjeta-dato">
                                                        🗺️ Calle: 
                                                        <span class="tarjeta-valor font-bold">
                                                            {{ e.calle }} 
                                                            {{ e.numero }}
                                                        </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                        🏘️ Barrio: 
                                                        <span class="tarjeta-valor">
                                                            {{ e.barrio }}
                                                        </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                        🏙️ Ciudad: 
                                                        <span class="tarjeta-valor">
                                                            {{ e.ciudad }}
                                                        </span>
                                                    </p>
                                                    <p class="tarjeta-dato">
                                                        📍 Prov: 
                                                        <span class="tarjeta-valor">
                                                            {{ e.provincia }}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>

                                </div>

                            </div>  

                            <!-- Tabla Vacia -->
                            <div v-else 
                            class="flex flex-col 
                            items-center justify-center p-8"
                            >
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                    {{ Pagina === 0 ? 'No se encontraron clientes 😔' : 'Ya no hay más clientes para mostrar 🏁' }}
                                </h2>
                                <h3 v-if="Pagina === 0" 
                                class="text-gray-500 text-center mt-2"
                                >
                                    Prueba buscando con otro término
                                </h3>
                            </div>

                            <!-- Mostrando Paginas -->
                            <div class="flex justify-center p-3">
                                <button @click="Cambiar_Pagina('back')" 
                                :disabled="Pagina === 0 || Backend_Espera"
                                class="botona"
                                >
                                    ❮
                                </button>
                                <h2 class="self-center font-bold px-6 text-green-800 text-center">
                                    <span v-if="Clientes.length > 0">
                                        Mostrando {{ Pagina + 1 }} - {{ Pagina + Clientes.length }}
                                    </span>
                                    <span v-else>
                                        Fin de la lista
                                    </span>
                                </h2>
                                <button @click="Cambiar_Pagina('next')" 
                                :disabled="!Paginas_Max || Backend_Espera"
                                class="botona"
                                >
                                    ❯
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

    // ----- Imports ----- //

    import { 
        onMounted, 
        ref, 
        computed 
    } from 'vue'
    import { 
        Cerrar_Sesion,
        PopUp_Upgrade,
        PopUp_Delete,
        backend_url,
        Sesion_Expirada,
        Iniciado
    } from './Estatus'
    
    // ----- Variables Vue ----- //

    // Habilitar Boton //
    const Verificar_Boton = computed(() =>{
        // Nuevo Cliente
        if (Mostrar_Nuevo.value) {
            const Datos_New_Faltantes = 
                Datos_New.value.nombre === ""||
                Datos_New.value.email === ""||
                !Datos_New.value.email.includes("@") ||
                Datos_New.value.dni === ""||
                Datos_New.value.contrasena === ""
            return Datos_New_Faltantes
        }
        // Actualizar Cliente
        if (PopUp_Upgrade.value) {
            const Datos_Upgrade_Faltantes = 
                Datos_Upgrade.value.nombre === ""||
                Datos_Upgrade.value.email === ""
            return Datos_Upgrade_Faltantes
    }})

    // ----- Variables Complejas ----- //

    // Almacen para Nuevo Cliente //
    const Datos_New = ref ({
        nombre: "",
        email: "",
        dni: "",
        contrasena: ""
    })
    // Almacen para Actualizar Cliente //
    const Datos_Upgrade = ref ({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
    })

    // ----- Variables Booleanas ----- //

    const Paginas_Max = ref (false)
    const Mostrar_Nuevo = ref (false)
    const Backend_Error = ref (false)
    const Backend_Espera = ref (true)
    const Mostrar_Filtro = ref (false)
    const Bloqueo_Peticion = ref (false)
    const Mostrar_Limpiar_Filtro = ref (false)

    // ----- Variables Vacias ----- //

    const Orden = ref ("")
    const Busqueda = ref ("")
    const Clientes =  ref ([])
    const Datos_Delete = ref ("")
    const Datos_Ciudad = ref ("")
    const Filtro_Ciudad = ref ("")
    const Datos_Provincia = ref ("")
    const Filtro_Provincia = ref ("")
    const Mostrar_Direccion = ref (null)

    // ----- Variables Simples ----- //

	const Pagina = ref (0)
    const Paginas_Items = ref (24)
    const Filtro_Estatus = ref (2)
    const Filtro_Direccion = ref (2)

    // ----- Funciones Vue ----- //
    
    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
        }}, 15000)
        // Leer Clientes y Direcciones
        try {
            await Backend_Get()
            const respuesta_ciudad = await fetch(`${backend_url}/direccion/ciudad/`)
            const ciudad = await respuesta_ciudad.json()
            Datos_Ciudad.value = ciudad
            const respuesta_provincia = await fetch(`${backend_url}/direccion/provincia/`)
            const provincia = await respuesta_provincia.json()
            Datos_Provincia.value = provincia
            clearTimeout(Tiempo_Espera)
        } catch (error) {
            console.error("Error cargando la pagina:", error)
            clearTimeout(Tiempo_Espera)
            Backend_Error.value = true
            Backend_Espera.value = false
        } finally {
            if (!Backend_Error.value) {
                Backend_Espera.value = false
            }
            Bloqueo_Peticion.value = false
    }})
    // Cambiar Pagina //
    const Cambiar_Pagina = async (direccion) => {
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Backend_Espera.value = true
        Backend_Error.value = false
        // Establecer Valor de Items de Pagina
        if (direccion === 'next') {
            Pagina.value += Paginas_Items.value
        } else if (direccion === 'back') {
            Pagina.value -= Paginas_Items.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await Backend_Get()
        } catch (error) {
            console.error(error)
            Backend_Error.value = true
        } finally {
            Backend_Espera.value = false
            Bloqueo_Peticion.value = false
    }}

    // ----- Funciones Frontend ----- //

    // Abrir Pop up para Borrar Cliente //
	const Abrir_PopUp_Delete = (cliente_fila) => {
        Datos_Delete.value = cliente_fila.id
        Datos_Upgrade.value.nombre = cliente_fila.nombre
		PopUp_Delete.value = true
		document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Actualizar Cliente //
	const Abrir_PopUp_Upgrade = (cliente_fila) => {
        Datos_Upgrade.value.id = cliente_fila.id
        Datos_Upgrade.value.nombre = cliente_fila.nombre
        Datos_Upgrade.value.email = cliente_fila.email
		PopUp_Upgrade.value = true
		document.body.style.overflow = "hidden"
	}
    // Mostrar Direcciones //
    const Cambio_Direccion = (id) => {
        if (Mostrar_Direccion.value === id) {
            Mostrar_Direccion.value = null
        }
        else {
            Mostrar_Direccion.value = id
    }}
    // Cerrar Pop up de Borrar Cliente //
	const Cerrar_PopUp_Delete = () => {
		PopUp_Delete.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up de Actualizar Cliente //
	const Cerrar_PopUp_Upgrade = () => {
		PopUp_Upgrade.value = false
		document.body.style.overflow = "auto"
	}
    // Establecer Accion al Tocar el Tab //
    const Click_Items = (cliente) => {
        if (!cliente.direcciones || cliente.direcciones.length === 0) {
            Abrir_PopUp_Delete(cliente)
        } else {
            Cambio_Direccion(cliente.id)
    }}
    // Establecer Color de Insignia de Estatus //
    const Estatus_Color = (id_estatus) => {
        if (id_estatus === true || id_estatus === 1) {
            return "badge-activo"
        }
        else {
            return "badge-inactivo"
    }}
    // Establecer Texto de Insignia de Estatus //
	const Estatus_Texto = (id_estatus) => {
		if (id_estatus === 1 || id_estatus === true) {
            return "✅ Activo"
        }
		else if (id_estatus === 2 || id_estatus === 0 || id_estatus === false) {
            return "❌ Inactivo"
        }
        return "Indefinido"
	}
    // Aplicar Filtros //
    const Filtro_Aplicar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Backend_Get()
        Filtro_Ciudad.value = ""
        Filtro_Provincia.value = ""
    }
    // Limpiar Filtros, Orden y Busqueda //
    const Filtro_Limpiar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Filtro_Direccion.value = 2
        Filtro_Estatus.value = 2
        Filtro_Ciudad.value = ""
        Filtro_Provincia.value = ""
        Orden.value = ""
        Backend_Get()
        Mostrar_Limpiar_Filtro.value = false
    }
    // Leer Fecha con Formato DD/MM/YYYY //
	const Formato_Fecha = (fechai) => {
		if (fechai) {
			return new Date(fechai).toLocaleDateString('es-ES')
		}
		else {
			return "Pendiente"
	}}

    // ----- Funciones Backend ----- //
    
    // Desactivar Cliente //
    const Backend_Delete = async() => {
        const DeleteBackend = await fetch(`${backend_url}/clientes/id/${Datos_Delete.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        })
        Datos_Delete.value = ""
        if (DeleteBackend.status === 401) {
            Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Backend_Get()
        Cerrar_PopUp_Delete()
    }
    // Leer Datos de los Clientes //
    const Backend_Get = async() => {
        let url = new URL (`${backend_url}/cliente/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', Paginas_Items.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_cliente', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro Realizo el Pedido/Tiene Direcciones Cargadas
        if (Filtro_Direccion.value === 1) {
            url.searchParams.append('bool_direccion', 'true')
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Direccion.value === 0) {
            url.searchParams.append('bool_direccion', 'false')
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro Activo/Desactivo
        if (Filtro_Estatus.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Estatus.value === 0) {
            url.searchParams.append('bool_activo', 'false')
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro Direcciones
        if (Filtro_Ciudad.value !== "") {
            url.searchParams.append('Filtro_Ciudad', Filtro_Ciudad.value)
            Mostrar_Limpiar_Filtro.value = true            
        }
        if (Filtro_Provincia.value !== "") {
            url.searchParams.append('Filtro_Provincia', Filtro_Provincia.value)
            Mostrar_Limpiar_Filtro.value = true            
        }
        const GetBackend = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const datos = await GetBackend.json()
        if (Array.isArray(datos)) {
            if (datos.length > Paginas_Items.value) {
                Paginas_Max.value = true
                Clientes.value = datos.slice(0, Paginas_Items.value)
            } else {
                Paginas_Max.value = false
                Clientes.value = datos
        }} else {
            Clientes.value = []
            Paginas_Max.value = false
    }}
    // Registrando Cliente //
    const Backend_Post = async() => {
        const PostBackend = await fetch(`${backend_url}/clientes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Datos_New.value),
            credentials: 'include'
        })
        if (PostBackend.status === 401) {
            Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Datos_New.value = {
            nombre: "",
            email: "",
            dni: "",
            contrasena: ""
        }
        Backend_Get()
    }
    // Actualizar Datos del Cliente //
    const Backend_Put = async() => {
        const Dato_Upgrade = {} 
        // Establecer Datos del Cliente
        if (Datos_Upgrade.value.nombre !== "") {
            Dato_Upgrade.nombre = Datos_Upgrade.value.nombre
        }
        if (Datos_Upgrade.value.email !== "") {
            Dato_Upgrade.email = Datos_Upgrade.value.email
        }
        if (Datos_Upgrade.value.contrasena !== "") {
            Dato_Upgrade.contrasena = Datos_Upgrade.value.contrasena
        }
        // Enviar Datos Actualizados al Backend
        const PutBackend = await fetch(`${backend_url}/clientes/id/${Datos_Upgrade.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Dato_Upgrade),
            credentials: 'include'
        })
        if (PutBackend.status === 401) {
            Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Datos_Upgrade.value = {
            id: "",
            nombre: "",
            email: "",
            contrasena: "",
        }
        Backend_Get()
        Cerrar_PopUp_Upgrade()
    }

</script>