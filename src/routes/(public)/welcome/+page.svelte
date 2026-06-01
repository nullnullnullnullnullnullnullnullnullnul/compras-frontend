<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="flex flex-col h-full">
  <!-- Top green section with logo -->
  <div class="flex-1 bg-primary flex items-center justify-center">
    <img src="/white-cart.png" alt="La Góndola" class="w-70 h-70" />
  </div>

  <!-- Bottom white section -->
  <div class="bg-white rounded-t-3xl px-8 pt-10 pb-12 flex flex-col gap-4 shadow-lg">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">Bienvenido a La Góndola</h1>

    <p class="text-sm text-center text-gray-500 mb-4">
      Lea nuestra <span class="text-primary font-medium">Política de Privacidad</span>. 
      Pulse "Aceptar y continuar" para aceptar los 
      <span class="text-primary font-medium">Términos de Servicio</span>.
    </p>

    <button
      onclick={() => goto('/login')}
      class="text-primary font-semibold text-lg text-center py-2"
    >
      Aceptar y continuar
    </button>
  </div>
</div>