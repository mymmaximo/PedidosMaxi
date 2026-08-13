<template>
    <div class="cuerpo">
        <!-- Notificación de Copiado Exitoso -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="MostrarNotificacion" 
                class="fixed top-4 right-4 
                bg-blue-300 text-white 
                px-6 py-3 rounded-xl shadow-lg 
                z-[100] font-bold"
                >
                ✅ {{ TextoNotificacion }}
                </div>
            </transition>
        </Teleport>
        <div class="pagina">
            <div class="flex w-full flex-col sm:flex-row">
                <div class="start !px-5">
                    <h1 class="titulo-config">
                    Centro de Ayuda
                    </h1>
                    <div class="mb-2 lg:mb-5">
                        <div @click="CopiarAlPortapapeles('maxgiesenow@gmail.com', 'E-Mail')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <!-- Correo Electronico -->
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
                        <div @click="CopiarAlPortapapeles('+54 351 250-0570', 'WhatsApp')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <!-- Whatsapp -->
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
                        <div @click="CopiarAlPortapapeles('+54 351 250-0570', 'Teléfono')"
                        class="tab cursor-pointer !mb-10"
                        >
                            <!-- Telefono -->
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
    const CopiarAlPortapapeles = async (texto, tipo) => {
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
        if (tipo === 'WhatsApp') {
            window.open('https://wa.me/5493512500570', '_blank')
        } 
        else if (tipo === 'Teléfono') {
            window.open('tel:+543512500570', '_self')
        } 
        else if (tipo === 'E-Mail') {
            window.open('mailto:maxgiesenow@gmail.com', '_self')
        }
    }
</script>