<script setup lang="ts">
import { ref } from 'vue';
import { Check, X } from 'lucide-vue-next';

// 1. Define the Interface
interface Package {
  id: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
}

// 2. State Management
const selectedPackage = ref<Package | null>(null);

// 3. Static Data
const packages: Package[] = [
  {
    id: 1,
    name: "Pakej Asas",
    price: "RM 99",
    duration: "sebulan",
    features: [
      "Akses kepada 50+ modul pembelajaran",
      "Video pembelajaran berkualiti tinggi",
      "Kuiz interaktif",
      "Sijil penyertaan"
    ],
    notIncluded: [
      "Sesi tutorial langsung",
      "Bahan pembelajaran boleh dimuat turun"
    ]
  },
  {
    id: 2,
    name: "Pakej Premium",
    price: "RM 199",
    duration: "sebulan",
    features: [
      "Akses kepada 100+ modul pembelajaran",
      "Video pembelajaran berkualiti tinggi",
      "Kuiz interaktif & latihan praktikal",
      "2 sesi tutorial langsung sebulan",
      "Bahan pembelajaran boleh dimuat turun",
      "Sijil pencapaian",
      "Sokongan email keutamaan"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Pakej Profesional",
    price: "RM 349",
    duration: "sebulan",
    features: [
      "Akses tanpa had kepada semua modul",
      "Video pembelajaran berkualiti tinggi",
      "Kuiz interaktif & latihan praktikal",
      "Tutorial langsung tidak terhad",
      "Semua bahan boleh dimuat turun",
      "Sijil profesional terakreditasi",
      "Bimbingan peribadi 1-ke-1",
      "Sokongan 24/7"
    ]
  }
];
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-8">
    <h2 class="text-indigo-600 mb-6">Senarai Pakej</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        @click="selectedPackage = pkg"
        class="relative border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg"
        :class="[
          pkg.popular 
            ? 'border-indigo-600 shadow-lg' 
            : 'border-gray-200 hover:border-indigo-400'
        ]"
      >
        <div 
          v-if="pkg.popular" 
          class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full"
        >
          Popular
        </div>
        
        <h3 class="text-indigo-600 mb-2">{{ pkg.name }}</h3>
        <div class="mb-4">
          <span class="text-gray-900">{{ pkg.price }}</span>
          <span class="text-gray-600">/{{ pkg.duration }}</span>
        </div>
        
        <ul class="space-y-2 mb-6">
          <li 
            v-for="(feature, index) in pkg.features.slice(0, 3)" 
            :key="index" 
            class="flex items-start gap-2 text-gray-700"
          >
            <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{{ feature }}</span>
          </li>
        </ul>
        
        <button class="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Maklumat Lanjut 
        </button>
      </div>
    </div>

    <div 
      v-if="selectedPackage" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="selectedPackage = null"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-indigo-600 mb-2">{{ selectedPackage.name }}</h3>
            <div>
              <span class="text-gray-900">{{ selectedPackage.price }}</span>
              <span class="text-gray-600">/{{ selectedPackage.duration }}</span>
            </div>
          </div>
          <button
            @click="selectedPackage = null"
            class="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="mb-6">
          <h4 class="text-gray-900 mb-3">Ciri-ciri Termasuk:</h4>
          <ul class="space-y-2">
            <li 
              v-for="(feature, index) in selectedPackage.features" 
              :key="index" 
              class="flex items-start gap-2 text-gray-700"
            >
              <Check class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div v-if="selectedPackage.notIncluded" class="mb-6">
          <h4 class="text-gray-900 mb-3">Tidak Termasuk:</h4>
          <ul class="space-y-2">
            <li 
              v-for="(feature, index) in selectedPackage.notIncluded" 
              :key="index" 
              class="flex items-start gap-2 text-gray-500"
            >
              <X class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <button class="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Beli Pakej Sekarang
        </button>
      </div>
    </div>
  </section>
</template>