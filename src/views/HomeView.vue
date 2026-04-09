<script setup>
import MetricGauge from "../components/MetricGauge.vue";
import StoreBarChart from "../components/StoreBarChart.vue";
import RankingBarChart from "../components/RankingBarChart.vue";
import DistributionPieChart from "../components/DistributionPieChart.vue";
</script>

<template>
  <main class="m-3 grid gap-3">
    <!-- Linha 1: Indicadores e Distribuição -->
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

    <!-- Linha 2: Performance de Vendedores (Unidades vs Valor) -->
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
        bar-color="#3b82f6"
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

    <!-- Linha 3: Produtos Mais Vendidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <RankingBarChart
        title="Produtos Mais Vendidos (Qtd)"
        bar-color="#10b981"
        :data="[
          { name: 'Camiseta Básica', value: 420 },
          { name: 'Calça Jeans Slim', value: 310 },
          { name: 'Tênis Running', value: 280 },
          { name: 'Jaqueta Couro', value: 150 },
          { name: 'Boné Urban', value: 120 },
        ]"
      />
      <StoreBarChart
        title="Vendas por Categoria"
        :categories="['Masculino', 'Feminino', 'Infantil', 'Acessórios']"
        :stores="[
          { name: 'Mês Atual', data: [850, 1120, 640, 420] },
          { name: 'Mês Anterior', data: [780, 1050, 590, 380] },
        ]"
        :color-by-data="false"
      />
    </div>

    <!-- Linha 4: Faturamento Semestral -->
    <div class="grid grid-cols-1">
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
          {
            name: 'Loja Sul',
            data: [15000, 17000, 16000, 19000, 23000, 26000],
          },
        ]"
      />
    </div>
  </main>
</template>
