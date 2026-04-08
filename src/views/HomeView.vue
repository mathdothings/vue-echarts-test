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
        :data="[
          { name: 'Pix', value: 450 },
          { name: 'Crédito', value: 380 },
          { name: 'Débito', value: 210 },
          { name: 'Dinheiro', value: 120 },
        ]"
      />
    </div>

    <!-- Linha 2: Rankings de Performance -->
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
        title="Produtos Mais Vendidos"
        bar-color="#10b981"
        :data="[
          { name: 'Camiseta Básica', value: 420 },
          { name: 'Calça Jeans Slim', value: 310 },
          { name: 'Tênis Running', value: 280 },
          { name: 'Jaqueta Couro', value: 150 },
          { name: 'Boné Urban', value: 120 },
        ]"
      />
    </div>

    <!-- Linha 3: Análise de Vendas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <StoreBarChart
        title="Vendas por Categoria"
        :categories="['Masculino', 'Feminino', 'Infantil', 'Acessórios']"
        :stores="[
          { name: 'Mês Atual', data: [850, 1120, 640, 420] },
          { name: 'Mês Anterior', data: [780, 1050, 590, 380] },
        ]"
      />
      <StoreBarChart
        title="Faturamento Semestral (Mil R$)"
        :categories="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']"
        :stores="[
          { name: 'Vendas Diretas', data: [12, 15, 14, 18, 22, 25] },
          { name: 'E-commerce', data: [8, 9, 11, 13, 15, 14] },
        ]"
      />
    </div>
  </main>
</template>
