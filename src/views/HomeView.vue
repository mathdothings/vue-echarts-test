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
        title="Funil de Vendas"
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
      title="Fluxo de Clientes por Hora"
      :days="[
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ]"
      :hours="[
        '07h',
        '08h',
        '09h',
        '10h',
        '11h',
        '12h',
        '13h',
        '14h',
        '15h',
        '16h',
        '17h',
        '18h',
        '19h',
        '20h',
        '21h',
        '22h',
      ]"
      :data="[
        // Hour Index 0 (07h)
        [0, 0, 5], [0, 1, 4], [0, 2, 8], [0, 3, 6], [0, 4, 10], [0, 5, 15], [0, 6, 5],
        // Hour Index 1 (08h)
        [1, 0, 10], [1, 1, 8], [1, 2, 15], [1, 3, 12], [1, 4, 20], [1, 5, 35], [1, 6, 10],
        // Hour Index 2 (09h)
        [2, 0, 15], [2, 1, 12], [2, 2, 20], [2, 3, 18], [2, 4, 35], [2, 5, 55], [2, 6, 25],
        // Hour Index 3 (10h)
        [3, 0, 25], [3, 1, 20], [3, 2, 35], [3, 3, 30], [3, 4, 45], [3, 5, 75], [3, 6, 50],
        // Hour Index 4 (11h)
        [4, 0, 35], [4, 1, 30], [4, 2, 45], [4, 3, 40], [4, 4, 60], [4, 5, 85], [4, 6, 65],
        // Hour Index 5 (12h - Lush Rush)
        [5, 0, 60], [5, 1, 55], [5, 2, 75], [5, 3, 65], [5, 4, 90], [5, 5, 95], [5, 6, 85],
        // Hour Index 6 (13h - Lunch Rush)
        [6, 0, 55], [6, 1, 50], [6, 2, 70], [6, 3, 60], [6, 4, 85], [6, 5, 100], [6, 6, 95],
        // Hour Index 7 (14h)
        [7, 0, 40], [7, 1, 35], [7, 2, 50], [7, 3, 45], [7, 4, 65], [7, 5, 95], [7, 6, 80],
        // Hour Index 8 (15h)
        [8, 0, 35], [8, 1, 30], [8, 2, 45], [8, 3, 40], [8, 4, 60], [8, 5, 90], [8, 6, 75],
        // Hour Index 9 (16h)
        [9, 0, 45], [9, 1, 40], [9, 2, 55], [9, 3, 50], [9, 4, 75], [9, 5, 85], [9, 6, 65],
        // Hour Index 10 (17h - Evening Rush)
        [10, 0, 65], [10, 1, 60], [10, 2, 80], [10, 3, 75], [10, 4, 95], [10, 5, 95], [10, 6, 55],
        // Hour Index 11 (18h - Evening Rush)
        [11, 0, 75], [11, 1, 70], [11, 2, 85], [11, 3, 80], [11, 4, 100], [11, 5, 90], [11, 6, 45],
        // Hour Index 12 (19h)
        [12, 0, 45], [12, 1, 40], [12, 2, 55], [12, 3, 50], [12, 4, 80], [12, 5, 75], [12, 6, 35],
        // Hour Index 13 (20h)
        [13, 0, 20], [13, 1, 18], [13, 2, 25], [13, 3, 22], [13, 4, 50], [13, 5, 55], [13, 6, 20],
        // Hour Index 14 (21h)
        [14, 0, 10], [14, 1, 8], [14, 2, 12], [14, 3, 10], [14, 4, 25], [14, 5, 30], [14, 6, 10],
        // Hour Index 15 (22h)
        [15, 0, 5], [15, 1, 4], [15, 2, 6], [15, 3, 5], [15, 4, 10], [15, 5, 15], [15, 6, 5],
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
