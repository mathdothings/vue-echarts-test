<script setup>
import { ref, computed } from "vue";
import KPICard from "../components/ui/KPICard.vue";
import ComparisonTrendChart from "../components/charts/ComparisonTrendChart.vue";
import DistributionPieChart from "../components/charts/DistributionPieChart.vue";
import HorizontalRankingBarChart from "../components/charts/HorizontalRankingBarChart.vue";
import MetricGaugeChart from "../components/charts/MetricGaugeChart.vue";

// 1. Define Store List
const stores = [
  { id: "matriz", name: "Loja Matriz", city: "São Paulo" },
  { id: "centro", name: "Loja Centro", city: "Rio de Janeiro" },
  { id: "shopping", name: "Loja Shopping", city: "Curitiba" },
  { id: "norte", name: "Loja Norte", city: "Recife" },
  { id: "sul", name: "Loja Sul", city: "Porto Alegre" },
];

const selectedStoreId = ref("matriz");
const showStorePicker = ref(false);

const currentStore = computed(() =>
  stores.find((s) => s.id === selectedStoreId.value),
);

// 2. Mock Data for each store context
const storesData = {
  matriz: {
    kpis: { sales: 12450.5, ticket: 312.5, trans: 40, news: 12, trend: 15 },
    todaySales: [300, 800, 1500, 1200, 950, 2200, 800],
    refSales: [250, 750, 1300, 1100, 900, 1900, 750],
    categories: [
      { name: "Premium", value: 5000 },
      { name: "Casual", value: 4500 },
      { name: "Acessórios", value: 2950 },
    ],
    sellers: [
      { name: "Ricardo", value: 4500 },
      { name: "Ana", value: 3800 },
      { name: "Beatriz", value: 4150 },
    ],
    goal: 15000,
  },
  centro: {
    kpis: { sales: 4250.5, ticket: 212.52, trans: 20, news: 5, trend: 12 },
    todaySales: [150, 420, 850, 640, 520, 1100, 350],
    refSales: [120, 380, 750, 600, 480, 950, 400],
    categories: [
      { name: "Masculino", value: 1850 },
      { name: "Feminino", value: 1420 },
      { name: "Acessórios", value: 980 },
    ],
    sellers: [
      { name: "Ricardo", value: 1450 },
      { name: "Ana", value: 1120 },
      { name: "Beatriz", value: 980 },
      { name: "João", value: 700 },
    ],
    goal: 5000,
  },
  shopping: {
    kpis: { sales: 25800.0, ticket: 450.0, trans: 57, news: 22, trend: 18 },
    todaySales: [800, 1200, 3500, 2800, 4200, 5500, 2500],
    refSales: [700, 1100, 3100, 2500, 3800, 4900, 2200],
    categories: [
      { name: "Feminino", value: 12000 },
      { name: "Infantil", value: 8500 },
      { name: "Calçados", value: 5300 },
    ],
    sellers: [
      { name: "Ana", value: 8500 },
      { name: "Marcos", value: 7200 },
      { name: "Elena", value: 6800 },
      { name: "Julia", value: 3300 },
    ],
    goal: 30000,
  },
  norte: {
    kpis: { sales: 3100.0, ticket: 155.0, trans: 20, news: 2, trend: -5 },
    todaySales: [100, 250, 400, 800, 600, 500, 250],
    refSales: [150, 300, 450, 850, 650, 550, 300],
    categories: [
      { name: "Verão", value: 2100 },
      { name: "Moda Praia", value: 1000 },
    ],
    sellers: [
      { name: "João", value: 1600 },
      { name: "Maria", value: 1500 },
    ],
    goal: 4000,
  },
  sul: {
    kpis: { sales: 8900.0, ticket: 296.0, trans: 30, news: 8, trend: 5 },
    todaySales: [200, 500, 1200, 1400, 1800, 2500, 1300],
    refSales: [180, 450, 1100, 1300, 1700, 2300, 1200],
    categories: [
      { name: "Inverno", value: 6500 },
      { name: "Acessórios", value: 2400 },
    ],
    sellers: [
      { name: "Pedro", value: 4500 },
      { name: "Carla", value: 4400 },
    ],
    goal: 10000,
  },
};

const activeData = computed(() => storesData[selectedStoreId.value]);

const selectStore = (id) => {
  selectedStoreId.value = id;
  showStorePicker.value = false;
};
</script>

<template>
  <main class="m-3 grid gap-4 relative">
    <!-- Row 1: Top KPIs (Contextual) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Vendas Hoje"
        :value="activeData.kpis.sales"
        :trend="activeData.kpis.trend"
        :is-monetary="true"
      />
      <KPICard
        label="Ticket Médio"
        :value="activeData.kpis.ticket"
        :trend="-2"
        :is-monetary="true"
      />
      <KPICard
        label="Transações"
        :value="activeData.kpis.trans"
        :trend="8"
        :is-monetary="false"
      />
      <KPICard
        label="Novos Clientes"
        :value="activeData.kpis.news"
        :trend="25"
        :is-monetary="false"
      />
    </div>

    <!-- Section 2: Main Performance Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <ComparisonTrendChart
          title="Faturamento por Hora"
          :hours="['08h', '10h', '12h', '14h', '16h', '18h', '20h']"
          :today="activeData.todaySales"
          :reference="activeData.refSales"
          reference-label="Semana Passada"
        />
      </div>

      <MetricGaugeChart
        title="Progresso da Meta Diária"
        :current-amount="activeData.kpis.sales"
        :total-goal="activeData.goal"
        :is-monetary="true"
      />
    </div>

    <!-- Section 3: Operational Efficiency -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <HorizontalRankingBarChart
        title="Desempenho da Equipe"
        :is-monetary="true"
        :data="activeData.sellers"
      />

      <DistributionPieChart
        title="Vendas por Categoria"
        :is-monetary="true"
        :data="activeData.categories"
      />
    </div>

    <!-- FLOATING STORE IDENTITY & PICKER -->
    <div class="fixed top-24 right-8 z-200 flex flex-col items-end gap-3">
      <!-- Status Card -->
      <div
        class="bg-white/80 backdrop-blur-md border border-white/50 p-4 py-3 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col items-end min-w-[180px]"
      >
        <span
          class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1"
          >Unidade Ativa</span
        >
        <h3 class="text-lg font-black text-neutral-800 leading-tight">
          {{ currentStore.name }}
        </h3>
        <p class="text-xs font-semibold text-neutral-400">
          {{ currentStore.city }}
        </p>
      </div>

      <!-- Action Button -->
      <button
        @click="showStorePicker = !showStorePicker"
        class="group flex items-center gap-3 bg-white border border-neutral-200 p-2 pl-4 rounded-2xl shadow-xl hover:border-blue-400 transition-all duration-300 ring-4 ring-blue-500/5"
      >
        <span
          class="text-sm font-bold text-neutral-600 group-hover:text-blue-500 transition-colors"
          >Mudar Unidade</span
        >
        <div
          class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      </button>

      <!-- Dropdown Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0 scale-95"
        enter-to-class="translate-y-0 opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100 scale-100"
        leave-to-class="translate-y-2 opacity-0 scale-95"
      >
        <div
          v-if="showStorePicker"
          class="absolute top-16 right-0 w-64 bg-white border border-neutral-200 rounded-2xl shadow-2xl p-2 core-glass"
        >
          <button
            v-for="store in stores"
            :key="store.id"
            @click="selectStore(store.id)"
            class="w-full flex flex-col items-start px-4 py-3 rounded-xl transition-all hover:bg-neutral-50"
            :class="
              selectedStoreId === store.id
                ? 'bg-blue-50 border border-blue-100'
                : ''
            "
          >
            <span
              :class="[
                'text-sm font-bold',
                selectedStoreId === store.id
                  ? 'text-blue-600'
                  : 'text-neutral-700',
              ]"
            >
              {{ store.name }}
            </span>
            <span class="text-xs text-neutral-400">{{ store.city }}</span>
          </button>
        </div>
      </transition>
    </div>
  </main>
</template>
