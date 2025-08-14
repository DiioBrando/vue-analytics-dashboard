<script setup lang="ts">
const navRoutes = [
  {
    name: 'incomes',
    path: '/incomes',

  },
  {
    path: '/orders',
    name: 'orders',

  },
  {
    path: '/sales',
    name: 'sales',
  },
  {
    path: '/stocks',
    name: 'stocks',
  },
];
</script>

<template>
  <header class="h-[80px] bg-black flex items-center">
    <nav class="mx-auto flex w-full max-w-[1200px] px-3 sm:px-5">
      <ul class="flex gap-4">
        <li v-for="route in navRoutes" :key="route.name">
          <RouterLink
              :to="route.path"
              class="px-4 py-2 rounded-md text-white hover:bg-gray-700 transition-colors duration-200"
          >
            {{ route.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>