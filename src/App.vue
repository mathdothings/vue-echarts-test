<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-neutral-100 flex flex-col font-sans">
    <!-- Main Content -->
    <main class="flex-1">
      <!-- Padding bottom to clear the floater -->
      <RouterView />
    </main>

    <!-- Floating Navigation Switch -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-100">
      <nav
        class="flex p-1.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl shadow-blue-900/10"
      >
        <RouterLink
          to="/"
          class="px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
          active-class="bg-blue-500 text-white shadow-lg shadow-blue-200"
          inactive-class="text-neutral-400 hover:text-neutral-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </RouterLink>
        <RouterLink
          to="/manager"
          class="px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
          active-class="bg-blue-500 text-white shadow-lg shadow-blue-200"
          inactive-class="text-neutral-400 hover:text-neutral-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
