<script setup>
import { reactive } from 'vue';
import { Phone, Mail, MapPin, Clock } from 'lucide-vue-next';

// Reactive state for the form
const form = reactive({
  name: '',
  email: '',
  message: ''
});

// Submit handler
const handleSubmit = () => {
  // Add your API logic here
  console.log('Form submitted:', form);
  alert('Mesej anda telah dihantar!');
};
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-8">
    <h2 class="text-indigo-600 mb-6">Hubungi Kami</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <Phone class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-gray-900 mb-1">Nombor Telefon</h3>
            <a href="tel:+60123456789" class="text-indigo-600 hover:underline">
              +60 12-345 6789
            </a>
            <p class="text-gray-600">Talian Utama</p>
            <a href="tel:+60198765432" class="text-indigo-600 hover:underline">
              +60 19-876 5432
            </a>
            <p class="text-gray-600">Talian Alternatif</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <Mail class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-gray-900 mb-1">Emel</h3>
            <a href="mailto:info@mylexics.com" class="text-indigo-600 hover:underline">
              info@mylexics.com
            </a>
            <p class="text-gray-600">Pertanyaan Am</p>
            <a href="mailto:support@mylexics.com" class="text-indigo-600 hover:underline">
              support@mylexics.com
            </a>
            <p class="text-gray-600">Sokongan Teknikal</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <MapPin class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-gray-900 mb-1">Alamat Pejabat</h3>
            <p class="text-gray-700">
              No. 123, Jalan Pendidikan,
              <br />
              Taman Ilmu, 50000 Kuala Lumpur,
              <br />
              Malaysia
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <Clock class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-gray-900 mb-1">Waktu Operasi</h3>
            <p class="text-gray-700">
              Isnin - Jumaat: 9:00 pagi - 6:00 petang
              <br />
              Sabtu: 9:00 pagi - 1:00 petang
              <br />
              Ahad & Cuti Umum: Tutup
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t border-gray-200">
      <h3 class="text-gray-900 mb-4">Hantar Mesej</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="contact-name" class="block text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              id="contact-name"
              v-model="form.name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nama penuh anda"
            />
          </div>
          <div>
            <label for="contact-email" class="block text-gray-700 mb-2">
              Emel
            </label>
            <input
              type="email"
              id="contact-email"
              v-model="form.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="emel@contoh.com"
            />
          </div>
        </div>
        
        <div>
          <label for="contact-message" class="block text-gray-700 mb-2">
            Mesej
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tulis mesej anda di sini..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          class="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Hantar Mesej
        </button>
      </form>
    </div>
  </section>
</template>