<script setup>
import MetricGauge from "../components/charts/MetricGaugeChart.vue";
import StoreBarChart from "../components/charts/VerticalRankingBarChart.vue";
import RankingBarChart from "../components/charts/HorizontalRankingBarChart.vue";
import DistributionPieChart from "../components/charts/DistributionPieChart.vue";
import TrendChart from "../components/charts/TrendChart.vue";
import ConversionFunnelChart from "../components/charts/ConversionFunnelChart.vue";
import PeakHoursHeatmap from "../components/charts/PeakHoursHeatmapChart.vue";
</script>

<template>
  <main class="m-3 grid gap-3">
    <!-- Row 1: Key Indicators & Distribution -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <MetricGauge
        title="Faturamento Mensal"
        :total-goal="15000"
        :current-amount="11250"
        :is-monetary="true"
      />
      <MetricGauge
        title="Novos Clientes (Meta)"
        :total-goal="80"
        :current-amount="54"
        :is-monetary="false"
      />
      <DistributionPieChart
        title="Meios de Pagamento"
        :is-monetary="true"
        :data="[
          { name: 'Pix', value: 4500 },
          { name: 'Crédito', value: 3800 },
          { name: 'Débito', value: 2100 },
          { name: 'Dinheiro', value: 1200 },
        ]"
      />
    </div>

    <!-- Row 2: Strategy (Trends & Conversion) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div class="lg:col-span-2">
        <TrendChart
          title="Evolução de Vendas Diária"
          :is-monetary="true"
          :categories="[
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
          ]"
          :data="[
            420, 380, 510, 640, 590, 820, 950, 410, 390, 480, 520, 610, 740,
            890, 1100,
          ]"
        />
      </div>
      <ConversionFunnelChart
        title="Funil de Vendas (Loja Centro)"
        :data="[
          { value: 100, name: 'Visitas' },
          { value: 60, name: 'Atendimento' },
          { value: 40, name: 'Provador' },
          { value: 18, name: 'Compra' },
        ]"
      />
    </div>

    <!-- Row 3: Operations (Peak Hours) -->
    <PeakHoursHeatmap
      title="Mapa de Calor: Fluxo de Clientes"
      :days="[
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ]"
      :hours="['08h', '10h', '12h', '14h', '16h', '18h', '20h']"
      :data="[
        [0, 0, 15],
        [0, 1, 20],
        [0, 2, 45],
        [0, 3, 30],
        [0, 4, 35],
        [0, 5, 50],
        [0, 6, 25],
        [4, 0, 20],
        [4, 1, 35],
        [4, 2, 80],
        [4, 3, 55],
        [4, 4, 60],
        [4, 5, 95],
        [4, 6, 40],
        [5, 0, 40],
        [5, 1, 65],
        [5, 2, 90],
        [5, 3, 85],
        [5, 4, 95],
        [5, 5, 100],
        [5, 6, 70],
      ]"
    />

    <!-- Row 4: Performance Rankings -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <RankingBarChart
        title="Melhores Vendedores (Unidades)"
        :data="[
          { name: 'Ricardo Silva', value: 145 },
          { name: 'Ana Oliveira', value: 132 },
          { name: 'Beatriz Costa', value: 98 },
          { name: 'João Santos', value: 85 },
          { name: 'Mariana Lima', value: 74 },
        ]"
      />
      <RankingBarChart
        title="Melhores Vendedores (Valor Gerado)"
        :is-monetary="true"
        :data="[
          { name: 'Ricardo Silva', value: 22450 },
          { name: 'Ana Oliveira', value: 21800 },
          { name: 'Beatriz Costa', value: 18200 },
          { name: 'João Santos', value: 14400 },
          { name: 'Mariana Lima', value: 12900 },
        ]"
      />
    </div>

    <!-- Row 5: Store Comparison -->
    <StoreBarChart
      title="Faturamento Semestral por Unidade"
      :is-monetary="true"
      :color-by-data="true"
      :categories="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']"
      :stores="[
        {
          name: 'Loja Matriz',
          data: [25000, 28000, 26000, 31000, 35000, 38000],
        },
        {
          name: 'Loja Centro',
          data: [18000, 21000, 19000, 24000, 28000, 31000],
        },
        {
          name: 'Loja Shopping',
          data: [32000, 35000, 33000, 38000, 42000, 45000],
        },
        {
          name: 'Loja Norte',
          data: [12000, 14000, 13000, 16000, 19000, 21000],
        },
        { name: 'Loja Sul', data: [15000, 17000, 16000, 19000, 23000, 26000] },
      ]"
    />
  </main>
</template>
