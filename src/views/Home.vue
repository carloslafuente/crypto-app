<template>
  <div class="home flex flex-col items-center mt-10">
    <pulse-loader
      :loading="loading"
      :color="'#2dc281'"
      :size="'50px'"
    ></pulse-loader>
    <px-assets-table v-if="!loading" :assets="assets"></px-assets-table>
  </div>
</template>

<script>
import PxAssetsTable from '../components/PxAssetsTable.vue';
import api from '@/services/api.js';

export default {
  name: 'Home',
  components: { PxAssetsTable },
  data() {
    return {
      assets: [],
      loading: true,
    };
  },
  created() {
    api
      .getAssets()
      .then((assets) => {
        this.assets = assets;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
