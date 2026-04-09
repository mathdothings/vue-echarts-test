<template>
  <div
    class="relative flex flex-col border border-neutral-200 rounded-xl bg-white shadow-sm overflow-hidden h-full"
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
      class="w-full h-full comparison-chart"
      :option="chartOption"
      :autoresize="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { formatValue } from "../../utils/format";
import { CHART_PALETTE, TEXT_COLORS } from "../../utils/theme";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  title: { type: String, default: "Desempenho Comparativo" },
  hours: { type: Array, default: () => [] },
  today: { type: Array, default: () => [] },
  reference: { type: Array, default: () => [] }, // Last week / Yesterday
  referenceLabel: { type: String, default: "Referência" },
});

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const chartOption = computed(() => ({
  color: [CHART_PALETTE[0], CHART_PALETTE[2]],
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    axisPointer: { type: "cross" },
    formatter: (params) => {
      let res = `<div class="font-bold mb-1">${params[0].name}</div>`;
      params.forEach((item) => {
        res += `<div class="flex justify-between gap-4">
                  <span class="text-neutral-500">${item.seriesName}</span>
                  <span class="font-bold">${formatValue(item.value, true)}</span>
                </div>`;
      });
      return res;
    },
  },
  legend: {
    top: 5,
    right: 20,
    textStyle: { color: TEXT_COLORS.muted },
  },
  grid: { top: 60, left: 100, right: 100, bottom: 40 },
  xAxis: {
    type: "category",
    data: props.hours,
    boundaryGap: false,
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: TEXT_COLORS.secondary },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
    axisLabel: {
      color: TEXT_COLORS.secondary,
      formatter: (val) => formatValue(val, true),
    },
  },
  series: [
    {
      name: "Hoje",
      data: props.today,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { width: 4 },
      emphasis: { focus: "series" },
    },
    {
      name: props.referenceLabel,
      data: props.reference,
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: { width: 2, type: "dashed", opacity: 0.5 },
      emphasis: { focus: "series" },
    },
  ],
}));
</script>

<style scoped>
.comparison-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>
