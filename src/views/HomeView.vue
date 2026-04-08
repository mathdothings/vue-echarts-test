<script setup>
import MetricGauge from "../components/MetricGauge.vue";
import StoreBarChart from "../components/StoreBarChart.vue";
import RankingBarChart from "../components/RankingBarChart.vue";
</script>

<template>
  <main class="m-3 grid gap-3">
    <!-- Linha 1: Indicadores Rápidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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
    </div>

    <!-- Linha 2: Rankings de Performance -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <RankingBarChart 
        title="Melhores Vendedores (Vendas)" 
        :data="[
          { name: 'Ricardo Silva', value: 145 },
          { name: 'Ana Oliveira', value: 132 },
          { name: 'Beatriz Costa', value: 98 },
          { name: 'João Santos', value: 85 },
          { name: 'Mariana Lima', value: 74 }
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
          { name: 'Boné Urban', value: 120 }
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
          { name: 'Mês Anterior', data: [780, 1050, 590, 380] }
        ]"
      />
      <StoreBarChart 
        title="Faturamento Semestral (Mil R$)"
        :categories="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']"
        :stores="[
          { name: 'Vendas Diretas', data: [12, 15, 14, 18, 22, 25] },
          { name: 'E-commerce', data: [8, 9, 11, 13, 15, 14] }
        ]"
      />
    </div>

    <!-- Linha 4: Ticket Médio vs Volume -->
    <StoreBarChart 
      title="Movimentação da Loja (Visitas vs Vendas)"
      :categories="['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']"
      :stores="[
        { name: 'Visitas', data: [45, 52, 48, 65, 95, 120] },
        { name: 'Vendas Realizadas', data: [12, 14, 11, 22, 35, 48] }
      ]"
    />
  </main>
</template>
