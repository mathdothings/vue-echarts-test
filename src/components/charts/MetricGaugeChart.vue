<template>
  <div
    class="relative flex flex-col items-center border border-neutral-200 rounded-xl bg-white shadow-sm"
  >
    <div
      class="z-10 pt-6 flex flex-col items-center pointer-events-none"
      v-if="renderChart"
    >
      <span
        class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
      >
        {{ title }}
      </span>
      <div class="flex items-baseline gap-1.5">
        <span class="text-2xl font-black text-neutral-900 tracking-tight">
          {{ formattedTotal }}
        </span>
        <span class="text-sm font-semibold text-neutral-400">
          de {{ formattedGoal }}
        </span>
      </div>
    </div>
    <VChart
      v-if="renderChart"
      class="w-full aspect-video gauge-chart"
      :option="gaugeOption"
      :autoresize="true"
    />
  </div>
</template>

<script setup>
import { useNumericTween } from "../../composables/useNumericTween";
import { ref, onMounted, nextTick, computed } from "vue";
import { formatValue, formatAsIntegerPercent } from "../../utils/format";
import { GAUGE_GRADIENT, TEXT_COLORS } from "../../utils/theme";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";

const props = defineProps({
  title: {
    type: String,
    default: "Meta Mensal",
  },
  totalGoal: {
    type: Number,
    default: 100,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  isMonetary: {
    type: Boolean,
    default: true,
  },
  colorByData: {
    type: Boolean,
    default: false,
  },
});

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

// BASE VALUES derived from props using our new composable
const displayTotal = useNumericTween(() => props.currentAmount);

const formattedTotal = computed(() => {
  return formatValue(displayTotal.value, props.isMonetary);
});

const formattedGoal = computed(() => {
  return formatValue(props.totalGoal, props.isMonetary);
});

// Automatically calculates the 0-100 percentage for ECharts
const currentProgress = computed(() => {
  if (!props.totalGoal) return 0;
  return (props.currentAmount / props.totalGoal) * 100;
});

const gaugeOption = computed(() => ({
  series: [
    {
      type: "gauge",
      min: 0,
      max: 100,
      splitNumber: 4,
      progress: {
        show: true,
        width: 18,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: GAUGE_GRADIENT.start },
              { offset: 1, color: GAUGE_GRADIENT.end },
            ],
          },
        },
      },
      pointer: { show: true, width: 4, length: "70%" },
      axisLine: {
        lineStyle: {
          width: 18,
          color: [[1, "#e5e7eb"]],
        },
      },
      axisTick: { show: false },
      splitLine: {
        length: 10,
        lineStyle: { width: 2, color: "#000" },
      },
      axisLabel: {
        distance: 25,
        color: TEXT_COLORS.secondary,
        fontSize: 16,
        formatter: (value) => formatAsIntegerPercent(value),
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, "20%"],
        formatter: (value) => formatAsIntegerPercent(value),
        color: TEXT_COLORS.primary,
        fontSize: 28,
        fontWeight: "bold",
      },
      data: [
        {
          value: currentProgress.value,
        },
      ],
      emphasis: {
        itemStyle: { opacity: 0.8 },
      },
    },
  ],
}));
</script>

<style scoped>
.gauge-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>
