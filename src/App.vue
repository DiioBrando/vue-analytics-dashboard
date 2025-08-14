<script setup lang="ts">
</script>

<template>
  <div class="flex gap-2 w-full">
    <RouterLink to="/">Main</RouterLink>
    <RouterLink to="/incomes">Incomes</RouterLink>
    <RouterLink to="/orders">Orders</RouterLink>
    <RouterLink to="/sales">Sales</RouterLink>
    <RouterLink to="/stocks">Stocks</RouterLink>
  </div>
  <RouterView/>
</template>