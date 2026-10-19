<template>
    <div class="cuerpo">

        <!-- Confirmacion -->
        <!-- Eliminar Usuario -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="PopUp_Delete" 
                @click.self="Cerrar_PopUp_Delete"
                class="fondo"
                >
                    <div class="popup">

                        <!-- Encabezado -->
                        <h1>
                            ¿Desear Eliminar/Reactivar el Usuario {{ Datos_Upgrade.nombre }}?
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
        <!-- Actualizar Usuario -->
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
                                Actualizar Usuario {{ Datos_Upgrade.nombre }}
                            </h1>

                            <!-- Datos de Usuario -->
                            <h2 class="mt-4 mb-2 font-bold text-center text-green-900">
                                Roles Asignados
                            </h2>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6 px-4">
                                <button v-for="rol in Datos_Rol" 
                                :key="rol.id"
                                @click="Datos_Roles(rol.id)"
                                type="button"
                                class="py-2 px-1 rounded-lg font-bold text-sm 
                                transition-all duration-200 shadow-sm border-2"
                                :class="Datos_Upgrade.id_rol && Datos_Upgrade.id_rol.includes(rol.id) 
                                ? 'bg-green-600 text-white border-green-700 shadow-inner scale-95' 
                                : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'"
                                >
                                    {{ rol.nombre }}
                                </button>
                            </div>

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

                <!-- Barra de Filtros de Usuarios y Formulario de Nuevo Usuario -->
                <div @click.stop 
                :class="['bar', (Mostrar_Filtro || Mostrar_Nuevo) 
                ? 'translate-x-0 opacity-100 visible sm:w-72 lg:w-80' 
                : '-translate-x-full opacity-0 invisible sm:opacity-100 sm:visible sm:w-fit sm:translate-x-0']"
                >

                    <!-- Boton de Filtros -->
                    <div class="hidden sm:block">
                        <h1 @click="Mostrar_Filtro = !Mostrar_Filtro ; Mostrar_Nuevo = false"
                        class="botonfil"
                        >
                            ᯤ
                        </h1>
                    </div>

                    <!-- Barra de Filtros -->
                    <transition name="slide">
                        <div v-if="Mostrar_Filtro"
                        class="flex flex-col lg:self-center"
                        >

                            <!-- Orden de Usuarios-->
                            <div class="flex flex-col md:px-4 md:pb-4 p-2 !pt-0">
                                <h1 class="!mt-0">
                                    Ordenar
                                </h1>
                                <select v-model="Orden" 
                                placeholder=""
                                >
                                    <option value="" disabled>
                                        Orden...
                                    </option>
                                    <option value="1">
                                        Usuario A-Z
                                    </option>
                                    <option value="2">
                                        Usuario Z-A
                                    </option>
                                    <option value="3">
                                        Mayor Relevancia
                                    </option>
                                    <option value="4">
                                        Menor Relevancia
                                    </option>
                                    <option value="5">
                                        Usuarios Antiguos
                                    </option>
                                    <option value="6">
                                        Usuarios Recientes
                                    </option>
                                </select>
                            </div>

                            <!-- Filtro Usuario Activo/Desactivo -->
                            <div class="flex flex-col">
                                <h1>
                                    ¿El Usuario esta Activo?
                                </h1>
                                <label>
                                    <input :value="2"
                                    type="radio" 
                                    v-model="Filtro_Estatus"
                                    > 
                                        Todos los Usuarios
                                </label>
                                <label>
                                    <input :value="1"
                                    type="radio"
                                    v-model="Filtro_Estatus"
                                    > 
                                        Usuario Activo
                                </label>
                                <label>
                                    <input :value="0"
                                    type="radio" 
                                    v-model="Filtro_Estatus"
                                    > 
                                        Usuario Eliminado
                                </label>
                            </div>

                            <!-- Botones -->
                            <div class="botones">
                                <button @click="Filtro_Aplicar" 
                                class="botoncon"
                                >
                                    Aplicar Filtros
                                </button>
                                <button @click="Filtro_Limpiar" 
                                v-if="Mostrar_Limpiar_Filtro === true"
                                class="botont" 
                                >
                                    🗑️ Limpiar Filtro
                                </button>
                                <button @click="Mostrar_Filtro = false" 
                                class="botonc sm:hidden"
                                >
                                    Cerrar
                                </button>
                            </div>

                        </div>
                    </transition>

                    <!-- Boton de Registrar Nuevo Usuario -->
                    <div>
                        <h1 @click="Mostrar_Nuevo = !Mostrar_Nuevo ; Mostrar_Filtro = false"
                        class="botonnew"
                        >
                            +
                        </h1>
                    </div>

                    <!-- Barra de Nuevo Usuario -->
                    <transition name="slide">
                        <div v-if="Mostrar_Nuevo"
                        class="flex flex-col lg:self-center"
                        >
                            <h1>
                                Nuevo Usuario
                            </h1>
                            <form @submit.prevent="Backend_Post">

                                <!-- Datos de Usuario -->
                                <h2>
                                    Nombre
                                </h2>
                                <input placeholder="Nombre"
                                type="text" 
                                v-model="Datos_New.nombre" 
                                maxlength="50"
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
                                maxlength="30"
                                >
                                <h2>
                                    Roles
                                </h2>
                                <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6 px-4">
                                    <button v-for="rol in Datos_Rol" 
                                    :key="'nuevo-' + rol.id"
                                    @click.prevent="Datos_New.id_rol.includes(rol.id) 
                                    ? Datos_New.id_rol.splice(Datos_New.id_rol.indexOf(rol.id), 1) 
                                    : Datos_New.id_rol.push(rol.id)"
                                    type="button"
                                    class="py-2 px-1 rounded-lg 
                                    font-bold text-sm 
                                    transition-all duration-200 
                                    shadow-sm border-2"
                                    :class="Datos_New.id_rol.includes(rol.id) 
                                    ? 'bg-green-600 text-white border-green-700 shadow-inner scale-95' 
                                    : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'"
                                    >
                                        {{ rol.nombre }}
                                    </button>
                                </div>

                                <!-- Botones -->
                                <div class="botones">
                                    <button :disabled="Verificar_Boton" type="submit" class="botoncon">
                                        Crear
                                    </button>
                                    <button @click="Mostrar_Nuevo = false" type="button" class="botonc sm:hidden">
                                        Cancelar
                                    </button>
                                </div>

                            </form>
                        </div>
                    </transition>

                </div>

                <!-- Tabla de Usuarios -->
                <div class="start !px-5">

                    <!-- Gif Cargando -->
                    <div v-if="Backend_Espera" 
                    class="flex flex-col 
                    items-center justify-center 
                    w-full h-[60vh]"
                    >
                        <img src="../assets/loading.gif" 
                        alt="Cargando usuarios..." 
                        class="w-32 h-32 object-contain mb-4"
                        >
                        <h2 class="text-green-800 font-bold text-xl animate-pulse">
                            Cargando usuarios, un momento...
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
                            class="botoncon !flex-none !w-auto px-8 shadow-lg shadow-green-900/20"
                            >
                                🔄 Recargar Página
                            </button>
                        </div>
                    </div>

                    <!-- Usuarios -->
                    <div v-else>
                        <div class="px-5 w-full">

                            <!-- Mostrar Boton Filtro en Celular -->
                            <button @click="Mostrar_Filtro = true"
                            class="sm:hidden 
                            w-full mb-4 py-3 
                            bg-white text-green-800 
                            font-black text-lg 
                            border-2 border-green-200 
                            rounded-xl flex items-center 
                            justify-center gap-2 
                            shadow-sm transition-all 
                            active:scale-95 active:bg-green-50"
                            >
                                ᯤ Abrir Filtros
                            </button>

                            <div class="flex flex-row items-stretch w-full gap-3 mb-5">
                                <!-- Barra de Busqueda -->
                                <input @input="Backend_Get"
                                type="text" 
                                v-model="Busqueda" 
                                placeholder="Busqueda..."
                                class="busqueda !mb-0"
                                maxlength="50"
                                >

                                <!-- Vista en Lista/Carta -->
                                <button @click="Formato_Items = !Formato_Items"
                                title="Alternar Vista"
                                class="botonvista"
                                >
                                    <span v-if="!Formato_Items" class="text-xl">
                                       「 」
                                    </span>
                                    <span v-else class="text-xl">
                                        ☰
                                    </span>
                                </button>

                            </div>

                            <!-- Encabezado -->
                            <h1 class="titulo-config">
                                Usuarios
                            </h1>

                            <!-- Tabla de Usuarios -->
                            <div v-if="Usuarios.length > 0"
                            :class="Formato_Items 
                            ? 'flex flex-col gap-4 w-full' 
                            :'grid grid-cols-4 gap-6'"
                            >
                                <div v-for= "i in Usuarios" 
                                :key="i.id" 
                                @click="Abrir_PopUp_Upgrade(i)"
                                :class="Formato_Items 
                                ? 'tarjeta-premium z-10 relative bg-white !mb-6 !w-full !m-0 hover:!shadow-lg' 
                                : 'carta relative'"
                                >

                                    <!-- Datos de Clientes -->
                                    <div class="tarjeta-info">
                                        <div class="tarjeta-titulo">
                                            👤{{ i.nombre }}
                                                <span :class="Estatus_Color(i.activo, i.id_rol)">
                                                    {{ Estatus_Texto(i.id_rol) }}
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
                            </div>

                            <!-- Tabla Vacia -->
                            <div v-else class="flex flex-col items-center justify-center p-8">
                                <h2 class="text-xl font-bold text-gray-700 text-center">
                                {   { Pagina === 0 ? 'No se encontraron usuarios 😔' : 'Ya no hay más usuarios para mostrar 🏁' }}
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
                                    <span v-if="Usuarios.length > 0">
                                        Mostrando {{ Pagina + 1 }} - {{ Pagina + Usuarios.length }}
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
        backend_url, 
        Cerrar_Sesion, 
        Sesion_Expirada, 
        Iniciado, 
        PopUp_Upgrade,
        PopUp_Delete
    } from './Estatus'
    
    // ----- Variables Vue ----- //

    // Habilitar Boton //
    const Verificar_Boton = computed(() =>{
        // Nuevo Usuario
        if (Mostrar_Nuevo.value) {
            const Datos_New_Faltantes = 
                Datos_New.value.nombre === ""||
                Datos_New.value.email === ""||
                Datos_New.value.dni === ""||
                Datos_New.value.contrasena === ""||
                Datos_New.value.id_rol.length === 0
            return Datos_New_Faltantes
        }
        // Actualizar Usuario
        if (PopUp_Upgrade.value) {
            const Datos_Upgrade_Faltantes = 
                Datos_Upgrade.value.id_rol.length === 0
            return Datos_Upgrade_Faltantes
        }
        return false
    })
    
    // ----- Variables Complejas ----- //

    // Almacen para Nuevo Usuario //
    const Datos_New = ref ({
        nombre: "",
        email: "",
        dni: "",
        contrasena: "",
        id_rol: []
    })
    // Almacen para Roles //
    const Datos_Rol = ref ([
        { id: 1, nombre: "Administrador"},
        { id: 2, nombre: "Editor de Productor General"},
        { id: 3, nombre: "Gestor de Pedidos General"},
        { id: 4, nombre: "Gestor de Precios"},
        { id: 5, nombre: "Gestor de Stock"},
        { id: 6, nombre: "Rider"},
        { id: 7, nombre: "Editor de Clientes"}
    ])
    // Almacen para Actualizar Usuario //
    const Datos_Upgrade = ref ({
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
        id_rol: []
    })
    
    // ----- Variables Booleanas ----- //
    
    const Paginas_Max = ref (false)
    const Formato_Items = ref (true)
    const Backend_Error = ref (false)
    const Mostrar_Nuevo = ref (false)
    const Backend_Espera = ref (true)
    const Mostrar_Filtro = ref (false)
    const Bloqueo_Peticion = ref (false)
    const Mostrar_Limpiar_Filtro = ref (false)
    
    // ----- Variables Vacias ----- //
    
    const Orden = ref ("")
    const Busqueda = ref ("")
    const Usuarios =  ref ([])
    const Datos_Delete = ref ("")
    
    // ----- Variables Simples ----- //
	
    const Pagina = ref (0)
    const Paginas_Items = ref (24)
    const Filtro_Estatus = ref (2)
    
    // ----- Funciones Vue ----- //

    // Primera Carga de Datos de la Pagina //
    onMounted (() => {
        Backend_Cargar()
    })
    // Carga de Datos de la Pagina //
    const Backend_Cargar = (async() => {
        if (Bloqueo_Peticion.value) return
        Bloqueo_Peticion.value = true
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        })
        Backend_Espera.value = true
        Backend_Error.value = false
        // Tiempo de Espera para el Backend
        const Tiempo_Espera = setTimeout(() => {
            if (Backend_Espera.value) {
                Backend_Espera.value = false
                Backend_Error.value = true
                console.warn("Se agotó el tiempo de espera de la petición.")
        }}, 15000)
        // Leer Usuarios
        try {
            await Backend_Get()
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
        if (direccion === 'next') {
            Pagina.value += Paginas_Items.value
        } else if (direccion === 'back') {
            Pagina.value -= Paginas_Items.value
            if (Pagina.value < 0) Pagina.value = 0
        }
        try {
            await BusquedaProducto()
        } catch (error) {
            console.error(error)
            Backend_Error.value = true
        } finally {
            Backend_Espera.value = false
            Bloqueo_Peticion.value = false
    }}
    
    // ----- Funciones Frontend ----- //

    // Abrir Pop up para Desactivar Usuario //
    const Abrir_PopUp_Delete = (usuario_fila) => {
        Datos_Delete.value = usuario_fila.id
		PopUp_Delete.value = true
		document.body.style.overflow = "hidden"
	}
    // Abrir Pop up para Actualizar Usuario //
	const Abrir_PopUp_Upgrade = (usuario_fila) => {
        Datos_Upgrade.value.id = usuario_fila.id
        Datos_Upgrade.value.nombre = usuario_fila.nombre
        Datos_Upgrade.value.email = usuario_fila.email
        Datos_Upgrade.value.id_rol = usuario_fila.id_rol ? [...usuario_fila.id_rol] : []
		PopUp_Upgrade.value = true
		document.body.style.overflow = "hidden"
	}
    // Cerrar Pop up para Desactivar Usuario //
	const Cerrar_PopUp_Delete = () => {
		PopUp_Delete.value = false
		document.body.style.overflow = "auto"
	}
    // Cerrar Pop up para Actualizar Usuario //
	const Cerrar_PopUp_Upgrade = () => {
		PopUp_Upgrade.value = false
		document.body.style.overflow = "auto"
	}
    // Sumar/Quitar Rol //
    const Datos_Roles = (id_rol) => {
        if (!Datos_Upgrade.value.id_rol) {
            Datos_Upgrade.value.id_rol = []
        }
        const index = Datos_Upgrade.value.id_rol.indexOf(id_rol)
        if (index > -1) {
            Datos_Upgrade.value.id_rol.splice(index, 1)
        } else {
            Datos_Upgrade.value.id_rol.push(id_rol)
    }}
    // Establecer Color de Insignia de Estatus y Rol //
    const Estatus_Color = (id_estatus, array_roles) => {
        if (id_estatus === true || id_estatus === 1) {
            if (!Array.isArray(array_roles) || array_roles.length === 0) {
                return "badge-activo !bg-gray-200 !text-gray-800"
            }
            if (array_roles.length > 1) {
                if (array_roles.includes(1)) return "badge-activo"
                return "badge-activo !bg-indigo-100 !text-indigo-800"
            }
            const Rol_Id = array_roles[0]
            if (Rol_Id === 1) return "badge-activo"
            if (Rol_Id === 2) return "badge-activo !bg-blue-100 !text-blue-800"
            if (Rol_Id === 3) return "badge-activo !bg-yellow-100 !text-yellow-800"
            if (Rol_Id === 4) return "badge-activo !bg-orange-100 !text-orange-800"
            if (Rol_Id === 5) return "badge-activo !bg-stone-100 !text-stone-800"
            if (Rol_Id === 6) return "badge-activo !bg-pink-100 !text-pink-800"
            if (Rol_Id === 7) return "badge-activo !bg-purple-100 !text-purple-800"
            return "badge-activo"
        }
        else {
            return "badge-inactivo"
    }}
    // Establecer Texto de Insignia de Rol //
    const Estatus_Texto = (array_roles) => {
        if (!Array.isArray(array_roles) || array_roles.length === 0) {
            return "Sin Rol Asignado"
        }
        if (array_roles.length > 1) {
            if (array_roles.includes(1)) return "Admin +"
            return "Multirrol"
        }
        const Rol_Id = array_roles[0]
        if (Rol_Id === 1) return "Administrador"
        if (Rol_Id === 2) return "Editor de Productos Gral."
        if (Rol_Id === 3) return "Gestor de Pedidos"
        if (Rol_Id === 4) return "Gestor de Precios"
        if (Rol_Id === 5) return "Gestor de Stock"
        if (Rol_Id === 6) return "Rider"
        if (Rol_Id === 7) return "Editor de Clientes"
        return "Desconocido"
    }
    // Aplicar Filtros //
    const Filtro_Aplicar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Backend_Get()
    }
    // Limpiar Filtros, Orden y Busqueda //
    const Filtro_Limpiar = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        Pagina.value = 0
        Filtro_Estatus.value = 2
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

    // Desactivar Datos del Usuario //
    const Backend_Delete = async() => {
        const DeleteBackend = await fetch(`${backend_url}/usuarios/id/${Datos_Delete.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        Datos_Delete.value = ""
        if (DeleteBackend.status === 401) {
            await Cerrar_Sesion()
            alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
            Sesion_Expirada.value = true
            Iniciado.value = false
            return
        }
        Backend_Get()
        Cerrar_PopUp_Delete()
    }
    // Leer Datos de los Usuarios //
    const Backend_Get = async() => {
        let url = new URL (`${backend_url}/usuarios/`)
		url.searchParams.append('skip', Pagina.value)
        url.searchParams.append('limit', Paginas_Items.value + 1)
        // Establecer Busqueda
        if (Busqueda.value !== "") {
            url.searchParams.append('busqueda_usuario', Busqueda.value)
        }
        // Establecer Orden
        if (Orden.value !== "") {
            url.searchParams.append('orden', Orden.value)
            Mostrar_Limpiar_Filtro.value = true
        }
        // Establecer Filtro de Estatus
        if (Filtro_Estatus.value === 1) {
            url.searchParams.append('bool_activo', 'true')
            Mostrar_Limpiar_Filtro.value = true
        }
        if (Filtro_Estatus.value === 0) {
            url.searchParams.append('bool_activo', 'false')
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
                Usuarios.value = datos.slice(0, Paginas_Items.value)
            } else {
                Paginas_Max.value = false
                Usuarios.value = datos
        }} else {
            Usuarios.value = []
            Paginas_Max.value = false
    }}
    // Subir Datos de Nuevo Usuario //
    const Backend_Post = async() => {
        try {
            const PostBackend = await fetch(`${backend_url}/usuarios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Datos_New.value),
                credentials: 'include'
            })
            if (PostBackend.status === 401) {
                await Cerrar_Sesion()
                alert("Tu sesión expiró por inactividad. Por favor, vuelve a iniciar sesión.")
                Sesion_Expirada.value = true
                Iniciado.value = false
                return
            }
            if (PostBackend.ok) {
                Datos_New.value = {
                    nombre: "",
                    email: "",
                    dni: "",
                    contrasena: "",
                    id_rol: []
                }
                Mostrar_Nuevo.value = false
                Backend_Get()
            } else {
                const Datos_Error = await PostBackend.json()
                alert(Datos_Error.detail || "Error al crear el usuario. Revisa los datos.")
        }} catch (error) {
            console.error("Fallo en la comunicación con el servidor:", error)
    }}
    // Actualizar Datos del Usuario //
    const Backend_Put = async() => {
        const Dato_Upgrade = {} 
        if (Datos_Upgrade.value.nombre !== "") {
            Dato_Upgrade.nombre = Datos_Upgrade.value.nombre
        }
        if (Datos_Upgrade.value.email !== "") {
            Dato_Upgrade.email = Datos_Upgrade.value.email
        }
        if (Datos_Upgrade.value.contrasena !== "") {
            Dato_Upgrade.contrasena = Datos_Upgrade.value.contrasena
        }
        if (Datos_Upgrade.value.id_rol.length > 0) {
            Dato_Upgrade.id_rol = Datos_Upgrade.value.id_rol
        }
        const PutBackend = await fetch(`${backend_url}/usuarios/id/${Datos_Upgrade.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Dato_Upgrade),
            credentials: 'include'
        })
        if (PutBackend.status === 401) {
            await Cerrar_Sesion()
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
            id_rol: []
        }
        Backend_Get()
        Cerrar_PopUp_Upgrade()
    }

</script>