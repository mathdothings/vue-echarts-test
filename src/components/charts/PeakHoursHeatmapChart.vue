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
      class="w-full h-full heatmap-chart"
      :option="heatmapOption"
      :autoresize="true"
    />
  </div>
</template>

<style scoped>
.heatmap-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { TEXT_COLORS } from "../../utils/theme";

use([
  CanvasRenderer,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
]);

const props = defineProps({
  title: { type: String, default: "Mapa de Calor" },
  days: {
    type: Array,
    default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  hours: {
    type: Array,
    default: () => ["08h", "10h", "12h", "14h", "16h", "18h", "20h"],
  },
  data: { type: Array, default: () => [] }, // [[dayIndex, hourIndex, value], ...]
});

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const heatmapOption = computed(() => ({
  tooltip: { position: "top" },
  grid: {
    top: 30,
    left: 80,
    right: 20,
    bottom: 40,
  },
  xAxis: {
    type: "category",
    data: props.hours,
    splitArea: { show: true },
    axisLabel: { color: TEXT_COLORS.secondary },
  },
  yAxis: {
    type: "category",
    data: props.days,
    splitArea: { show: true },
    axisLabel: { color: TEXT_COLORS.secondary },
  },
  visualMap: {
    show: false,
    min: 0,
    max: 100,
    calculable: false,
    orient: "horizontal",
    left: "center",
    top: -10,
    inRange: { color: ["#eff6ff", "#3b82f6", "#1e3a8a"] }, // Blues
  },
  series: [
    {
      name: "Detalhes",
      type: "heatmap",
      data: props.data,
      label: { show: false },
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: "rgba(0, 0, 0, 0.5)" },
      },
    },
  ],
}));
</script>
