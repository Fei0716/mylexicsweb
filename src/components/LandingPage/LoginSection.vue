<script setup>
import { ref } from 'vue';
import { LogIn, RefreshCw } from 'lucide-vue-next';
import router from '../../router'
// State definition
const username = ref("");
const password = ref("");

// Login handler
const handleLogin = () => {
  //we just redirect the user to the app for testing purposes
  router.push({name: 'LamanUtama'});
};

// Reset handler
const handleReset = () => {
  // logic here
  alert("Pautan reset kata laluan telah dihantar ke emel anda.");
};
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-8">
    <h2 class="text-indigo-600 mb-6">Log Masuk</h2>
    
    <form @submit.prevent="handleLogin" class="max-w-md space-y-4">
      
      <div>
        <label for="username" class="block text-gray-700 mb-2">
          Masukkan Kata Nama
        </label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Kata nama anda"
        />
      </div>

      <div>
        <label for="password" class="block text-gray-700 mb-2">
          Masukkan Kata Laluan
        </label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Kata laluan anda"
        />
      </div>

      <button
        type="submit" 
        class="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <LogIn class="w-5 h-5" />
        Daftar Masuk
      </button>

      <button
        type="button"
        @click="handleReset"
        class="w-full cursor-pointer text-indigo-600 hover:text-indigo-700 py-2 flex items-center justify-center gap-2"
      >
        <RefreshCw class="w-4 h-4" />
        Reset Kata Laluan
      </button>
    </form>
  </section>
</template>