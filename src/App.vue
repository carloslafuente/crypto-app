<template>
  <px-header />
  <router-view />
</template>

<script>
import PxHeader from './components/PxHeader.vue';

export default {
  components: { PxHeader },
};
</script>
