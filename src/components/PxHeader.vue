<template>
  <header class="">
    <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
      <div class="flex items-center text-white mr-6">
        <px-icon class="mr-2" />
        <span class="font-semibold text-xl tracking-tight">
          PlatziExchange
        </span>
      </div>

      <div class="text-lg text-white">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import PxIcon from '@/components/PxIcon';

export default {
  name: 'PxHeader',
  components: { PxIcon },
};
</script>
