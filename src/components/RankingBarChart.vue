<template>
  <div
    class="relative flex flex-col border border-neutral-200 rounded-xl bg-white shadow-sm overflow-hidden"
  >
    <div
      class="pt-6 px-6 flex flex-col items-start pointer-events-none"
      v-if="renderChart"
    >
      <span
        class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
      >
        {{ title }}
      </span>
    </div>
    <VChart
      v-if="renderChart"
      class="w-full h-[350px] ranking-chart"
      :option="rankingOption"
      :autoresize="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { formatValue } from "../utils/format";
import { CHART_PALETTE, TEXT_COLORS } from "../utils/theme";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

const props = defineProps({
  title: {
    type: String,
    default: "Ranking de Desempenho",
  },
  data: {
    type: Array,
    default: () => [
      { name: "Loja 1", value: 450 },
      { name: "Loja 2", value: 380 },
      { name: "Loja 3", value: 520 },
      { name: "Loja 4", value: 290 },
      { name: "Loja 5", value: 410 },
    ],
  },
  barColor: {
    type: String,
    default: CHART_PALETTE[0],
  },
  isMonetary: {
    type: Boolean,
    default: false,
  },
  colorByData: {
    type: Boolean,
    default: false,
  },
});

// Removed local currencyFormatter

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const sortedData = computed(() => {
  return [...props.data].sort((a, b) => a.value - b.value);
});

const rankingOption = computed(() => ({
  color: CHART_PALETTE,
  tooltip: {},
  grid: {
    top: "10%",
    left: "5%",
    right: "15%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    splitLine: { show: false },
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    type: "category",
    data: sortedData.value.map((item) => item.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: TEXT_COLORS.secondary, fontSize: 13, margin: 15 },
  },
  series: [
    {
      type: "bar",
      colorBy: props.colorByData ? "data" : "series",
      data: sortedData.value.map((item) => item.value),
      barMaxWidth: 20,
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: props.colorByData ? undefined : props.barColor,
      },
      label: {
        show: true,
        position: "right",
        formatter: (params) => {
          return formatValue(params.value, props.isMonetary);
        },
        color: TEXT_COLORS.primary,
        fontWeight: "bold",
        fontSize: 12,
      },
      showBackground: true,
      backgroundStyle: {
        color: "rgba(243, 244, 246, 0.5)",
        borderRadius: [0, 4, 4, 0],
      },
      emphasis: {
        itemStyle: { opacity: 0.8 },
      },
    },
  ],
}));
</script>

<style scoped>
.ranking-chart {
  min-height: 350px;
}
</style>
