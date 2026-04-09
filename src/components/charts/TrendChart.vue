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
      class="w-full h-[350px] trend-chart"
      :option="lineOption"
      :autoresize="true"
    />
  </div>
</template>

<style scoped>
.trend-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { formatValue } from "../../utils/format";
import { CHART_PALETTE, TEXT_COLORS } from "../../utils/theme";

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent]);

const props = defineProps({
  title: { type: String, default: "Tendência" },
  categories: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  isMonetary: { type: Boolean, default: false },
});

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const lineOption = computed(() => ({
  color: [CHART_PALETTE[0]],
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    formatter: (params) => {
      const item = params[0];
      return `${item.name}<br/><b>${formatValue(item.value, props.isMonetary)}</b>`;
    },
  },
  grid: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: props.categories,
    boundaryGap: false,
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: TEXT_COLORS.secondary },
  },
  yAxis: {
    type: "value",
    splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
    axisLabel: {
      color: TEXT_COLORS.secondary,
      formatter: (val) => formatValue(val, props.isMonetary),
    },
  },
  series: [
    {
      data: props.data,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { width: 3 },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: CHART_PALETTE[0] + "44" },
            { offset: 1, color: CHART_PALETTE[0] + "00" },
          ],
        },
      },
    },
  ],
}));
</script>
