<script setup>
import {BookOpen} from 'lucide-vue-next'
import LoginSection from '../components/LandingPage/LoginSection.vue'
import PackageSection from '../components/LandingPage/PackageSection.vue'
import MemberSection from '../components/LandingPage/MemberSection.vue'
import ContactSection from '../components/LandingPage/ContactSection.vue'
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div class="flex items-center gap-3">
                <BookOpen class="w-8 h-8 text-indigo-600" />
                <h1 class="text-indigo-600">MyLexics</h1>
            </div>
            </div>
        </header>
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-indigo-600 mb-4">Maklumat MyLexics</h2>
            <p class="text-gray-700">
              MyLexics ditubuhkan pada <span class="text-indigo-600">15 Januari 2020</span>. 
              Kami adalah platform pembelajaran bahasa yang komprehensif, bertujuan untuk membantu 
              pelajar meningkatkan kemahiran berbahasa mereka melalui kaedah pembelajaran yang 
              inovatif dan interaktif. Dengan pasukan pengajar yang berpengalaman, kami komited 
              untuk memberikan pengalaman pembelajaran yang berkualiti tinggi.
            </p>
          </section>

          <LoginSection />
        </div>

        <PackageSection />

        <MemberSection />

        <ContactSection />
      </main>

      <footer class="bg-white mt-12 border-t">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p class="text-center text-gray-600">
            © 2024 MyLexics. Hak Cipta Terpelihara.
          </p>
        </div>
      </footer>
    </div>
</template>

<style scoped>

</style>