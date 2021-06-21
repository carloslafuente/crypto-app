<template>
  <div class="flex flex-col items-center mt-10 md:px-20">
    <pulse-loader
      :loading="loading"
      :color="'#2dc281'"
      :size="'50px'"
    ></pulse-loader>
    <template v-if="!loading">
      <div class="flex flex-col md:flex-row justify-around items-center w-full">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">
              {{ asset.symbol }}
            </small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>
                {{ asset.rank }}
              </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>
                {{ dollarFilter(asset.priceUsd) }}
              </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>
                {{ dollarFilter(max) }}
              </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>
                {{ dollarFilter(avg) }}
              </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>
                {{ percentFilter(asset.changePercent24Hr) }}
              </span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="
          history.map((history) => [
            history.date,
            parseFloat(history.priceUsd).toFixed(2),
          ])
        "
      ></line-chart>

      <div class="flex flex-col items-center w-full mb-10">
        <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
        <table class="w-full">
          <tr
            v-for="market in markets"
            :key="`${market.exchangeId}-${market.priceUsd}`"
            class="border-b"
          >
            <td>
              <b>{{ market.exchangeId }}</b>
            </td>
            <td>{{ dollarFilter(market.priceUsd) }}</td>
            <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
            <td>
              <px-button
                :loading="market.loading || false"
                v-if="!market.url"
                @customClick="getExchange(market)"
              >
                <span>Obtener Link</span>
              </px-button>
              <a v-else class="hover:underline text-green-600" target="_blanck">
                {{ market.url }}
              </a>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/services/api';
import { dollarFilter, percentFilter } from '@/helpers/filters';
import PxButton from '@/components/PxButton.vue';

export default {
  name: 'CoinDeail',
  components: { PxButton },
  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      loading: true,
    };
  },
  created() {
    this.getCoin();
  },
  computed: {
    min() {
      return Math.min(
        ...this.history.map((history) =>
          parseFloat(history.priceUsd).toFixed(2)
        )
      );
    },
    max() {
      return Math.max(
        ...this.history.map((history) =>
          parseFloat(history.priceUsd).toFixed(2)
        )
      );
    },
    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      );
    },
  },
  methods: {
    getCoin() {
      const id = this.$route.params.id;
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getExchange(exchange) {
      exchange.loading = true;
      return api.getExchange(exchange.exchangeId).then((res) => {
        exchange.url = res.exchangeUrl;
        exchange.loading = false;
      });
    },
    dollarFilter,
    percentFilter,
  },
};
</script>
