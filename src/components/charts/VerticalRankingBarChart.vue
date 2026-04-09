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
      class="w-full h-full bar-chart"
      :option="barOption"
      :autoresize="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { formatValue } from "../../utils/format";
import { CHART_PALETTE, TEXT_COLORS } from "../../utils/theme";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps({
  title: {
    type: String,
    default: "Desempenho por Unidade",
  },
  categories: {
    type: Array,
    default: () => ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  },
  stores: {
    type: Array,
    default: () => [
      { name: "Loja 1", data: [320, 302, 301, 334, 390, 330] },
      { name: "Loja 2", data: [150, 212, 201, 154, 190, 330] },
      { name: "Loja 3", data: [820, 832, 901, 934, 1290, 1330] },
    ],
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

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const barOption = computed(() => ({
  tooltip: {},
  legend: {
    data: props.stores.map((s) => s.name),
    bottom: 20,
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
    textStyle: { color: TEXT_COLORS.muted, fontSize: 12 },
  },
  xAxis: {
    type: "category",
    data: props.categories,
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisTick: { show: false },
    axisLabel: { color: TEXT_COLORS.secondary, margin: 15 },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
    axisLabel: {
      color: TEXT_COLORS.secondary,
      formatter: (value) => formatValue(value, props.isMonetary),
    },
  },
  series: props.stores.map((store) => ({
    name: store.name,
    type: "bar",
    colorBy: props.colorByData ? "series" : undefined,
    barMaxWidth: 15,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
    data: store.data,
  })),
  color: CHART_PALETTE,
  emphasis: {
    itemStyle: { opacity: 0.8 },
  },
}));
</script>

<style scoped>
.bar-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>
