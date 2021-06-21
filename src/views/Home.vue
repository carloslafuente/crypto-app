<template>
  <div class="home flex justify-center mt-10">
    <px-assets-table :assets="assets" />
  </div>
</template>

<script>
import PxAssetsTable from '../components/PxAssetsTable.vue';
import api from '../services/api.js';

export default {
  name: 'Home',
  components: { PxAssetsTable },
  data() {
    return {
      assets: [],
    };
  },
  created() {
    api.getAssets().then((assets) => {
      this.assets = assets;
    });
  },
};
</script>
