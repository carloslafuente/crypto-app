<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in assets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
          />
        </td>
        <td>
          <b>#{{ asset.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'CoinDetail', params: { id: asset.id } }"
          >
            {{ asset.name }}
            <small class="ml-1 text-gray-500">
              {{ asset.symbol }}
            </small>
          </router-link>
        </td>
        <td>
          {{ dollarFilter(asset.priceUsd) }}
        </td>
        <td>
          {{ dollarFilter(asset.marketCapUsd) }}
        </td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-200'
          "
        >
          {{ percentFilter(asset.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @customClick="goToCoin(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percentFilter } from '@/helpers/filters.js';
import PxButton from '@/components/PxButton.vue';

export default {
  name: 'PxAssetsTable',
  components: { PxButton },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    dollarFilter,
    percentFilter,
    goToCoin(id) {
      this.$router.push({ name: 'CoinDetail', params: { id } });
    },
  },
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
