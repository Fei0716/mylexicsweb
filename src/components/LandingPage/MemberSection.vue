<script setup lang="ts">
import { Mail, Award } from 'lucide-vue-next';

// 1. Define Interface
interface Member {
  id: number;
  name: string;
  position: string;
  qualification: string;
  experience: string;
  specialty: string;
  email: string;
  image: string;
}

// 2. Static Data
const members: Member[] = [
  {
    id: 1,
    name: "Dr. Siti Aminah binti Ahmad",
    position: "Pengarah & Pengasas",
    qualification: "PhD dalam Linguistik",
    experience: "15 tahun pengalaman mengajar",
    specialty: "Pakar dalam pembelajaran bahasa untuk kanak-kanak",
    email: "siti.aminah@mylexics.com",
    image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjM1OTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "Cik Nur Aisyah binti Hassan",
    position: "Ketua Pengajar",
    qualification: "Master dalam Pendidikan Bahasa",
    experience: "10 tahun pengalaman mengajar",
    specialty: "Kepakaran dalam kaedah pembelajaran interaktif",
    email: "nur.aisyah@mylexics.com",
    image: "https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDE2MzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Encik Muhammad Hafiz bin Abdullah",
    position: "Pengajar Kanan",
    qualification: "Master dalam Linguistik Gunaan",
    experience: "12 tahun pengalaman mengajar",
    specialty: "Pakar dalam pembelajaran bahasa untuk dewasa",
    email: "m.hafiz@mylexics.com",
    image: "https://images.unsplash.com/photo-1758270704587-43339a801396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvciJTIwZWR1Y2F0b3J8ZW58MXx8fHwxNzY0MjIxNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

// 3. Simple Fallback Logic (Optional replacement for ImageWithFallback)
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  // Set a placeholder image if the original fails
  target.src = 'https://via.placeholder.com/400x400?text=No+Image';
};
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-8">
    <h2 class="text-indigo-600 mb-6">Senarai Ahli</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="member in members"
        :key="member.id"
        class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-square overflow-hidden bg-gray-100">
          <img
            :src="member.image"
            :alt="member.name"
            @error="handleImageError"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-6">
          <h3 class="text-indigo-600 mb-1">{{ member.name }}</h3>
          <p class="text-indigo-500 mb-4">{{ member.position }}</p>
          
          <div class="space-y-2 text-gray-700">
            <div class="flex items-start gap-2">
              <Award class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <p>{{ member.qualification }}</p>
                <p class="text-gray-600">{{ member.experience }}</p>
              </div>
            </div>
            
            <p class="text-gray-600">{{ member.specialty }}</p>
            
            <div class="flex items-center gap-2 pt-2">
              <Mail class="w-4 h-4 text-indigo-500" />
              <a
                :href="`mailto:${member.email}`"
                class="text-indigo-600 hover:underline"
              >
                {{ member.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>