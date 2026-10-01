<template>
    <div class="cuerpo">
        <!-- Notificación -->
        <!-- Copiado Exitoso -->
        <Teleport to="body">
            <transition name="slide">
                <div v-if="MostrarNotificacion" 
                class="notificacion !bg-blue-300 !text-white"
                >
                    <span class="text-xl drop-shadow-sm">
                        ✅ 
                    </span>
                    <span>
                        {{ TextoNotificacion }}
                    </span>
                </div>
            </transition>
        </Teleport>

        <!-- Pagina -->
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="start !px-5">
                    <!-- Titulo -->
                    <h1 class="titulo-config">
                        Centro de Ayuda
                    </h1>
                    <!-- Contactos -->
                    <div class="mb-2 lg:mb-5">
                        <!-- Correo Electronico -->
                        <div @click="CopiarAlPortapapeles('maxgiesenow@gmail.com', 'E-Mail')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <h1>
                                        Correo Electronico
                                    </h1>
                                </div>
                                <div class="flex flex-col">
                                    <h2>
                                    <span class="hidden lg:inline 2xl:inline">
                                        E-Mail: 
                                    </span>
                                        maxgiesenow@gmail.com
                                    </h2>
                                </div>
                            </div>
                            <div class="flex flex-col ml-auto text-right items-end">
                                <h2>
                                    Contactate con nuestros asesores vía E-Mail
                                </h2>
                            </div>
                        </div>
                        <!-- Whatsapp -->
                        <div @click="CopiarAlPortapapeles('+54 351 250-0570', 'WhatsApp')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <h1>
                                        Whatsapp
                                    </h1>
                                </div>
                                <div class="flex flex-col">
                                    <h2>
                                    <span class="hidden lg:inline 2xl:inline">
                                        Nro: 
                                    </span>
                                        +54 351 250-0570
                                    </h2>
                                </div>
                            </div>
                            <div class="flex flex-col ml-auto text-right items-end">
                                <h2>
                                    Contactate con nuestros asesores vía Whatsapp
                                </h2>
                            </div>
                        </div>
                        <!-- Telefono -->
                        <div @click="CopiarAlPortapapeles('+54 351 250-0570', 'Teléfono')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <div class="flex flex-col">
                                <div class="flex flex-row">
                                    <h1>
                                        Telefono
                                    </h1>
                                </div>
                                <div class="flex flex-col">
                                    <h2>
                                    <span class="hidden lg:inline 2xl:inline">
                                        Nro: 
                                    </span>
                                        +54 351 250-0570
                                    </h2>
                                </div>
                            </div>
                            <div class="flex flex-col ml-auto text-right items-end">
                                <h2>
                                    Contactate con nuestros asesores vía Telefono Celular
                                </h2>
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
    import { ref } from 'vue'
    // ----- Variables Booleanas ----- //
    const MostrarNotificacion = ref(false)
    // ----- Variables Vacias ----- //
    const TextoNotificacion = ref("")
    // ----- Funciones Vue ----- //
    // Copiar en Portapapeles //
    const CopiarAlPortapapeles = async (texto, tipo) => {
        // Mostrar Notificacion
        try {
            await navigator.clipboard.writeText(texto)
            TextoNotificacion.value = `¡${tipo} copiado al portapapeles!`
            MostrarNotificacion.value = true
            setTimeout(() => {
                MostrarNotificacion.value = false
            }, 2500)
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error)
            alert("Tu navegador no soporta la función de copiar automáticamente.")
        }
        // Copiar Numero de WhatsApp
        if (tipo === 'WhatsApp') {
            window.open('https://wa.me/5493512500570', '_blank')
        } 
        // Copiar Numero de Telefono
        else if (tipo === 'Teléfono') {
            window.open('tel:+543512500570', '_self')
        } 
        // Copiar Email de Contacto
        else if (tipo === 'E-Mail') {
            window.open('mailto:maxgiesenow@gmail.com', '_self')
        }
    }
</script>