<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useFetchApi } from './composables/FetchApi'

const { phrases, error, fetchApi } = useFetchApi()

onBeforeMount(() => {
  fetchApi()
})

const active = ref<boolean>(false)

function gerarFrase(): void {
  fetchApi()
}

function copyToClipboard(): void {
  navigator.clipboard.writeText(phrases.value.frase)
  active.value = true
  setTimeout(() => {
    active.value = false
  }, 1000)
}
</script>

<template>
  <main class="flex flex-col items-center mt-24 mx-8 space-y-10">
    <header class="text-center w-fit">
      <h1 class="text-2xl font-bold mb-4"><span>👀</span> Foi de generator!</h1>
      <h3 class="max-w-xl italic">
        Cansado de procurar por essas frases na vasta internet? Aqui está um
        <span class="font-semibold">gerador</span> pra resolver seus problemas
        jovem moderno.
      </h3>
    </header>
    <div class="card border-2 p-6 shadow-lg">
      <p v-if="!error" data-test="phrase">{{ phrases.frase }}</p>
      <p v-else>Bad request!</p>
    </div>
    <div class="flex gap-4 items-center h-16">
      <button
        @click="copyToClipboard()"
        :disabled="active"
        class="p-4 cursor-pointer bg-sky-600 text-white font-bold rounded-md h-full hover:bg-sky-500 active:scale-90 transition-all ease-out disabled:bg-slate-300"
      >
        COPIAR 📋
      </button>
      <button
        @click="gerarFrase"
        class="bg-slate-600 text-white font-bold p-5 rounded-md h-full hover:bg-slate-500 active:scale-90 transition-all ease-out"
      >
        🔄 GERAR
      </button>
    </div>
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <p v-if="active">Copiado!</p>
    </transition>
    <div>
      <p>
        Autores:
        <a href="https://github.com/leonardonicola" target="_blank"
          >@leonardonicola</a
        >,
        <a href="https://github.com/mferreiradb" target="_blank"
          >@mferreiradb</a
        >
      </p>
    </div>
  </main>
</template>
