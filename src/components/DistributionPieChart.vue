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
      class="w-full h-[350px] pie-chart"
      :option="pieOption"
      :autoresize="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { formatValue } from "../utils/format";
import { CHART_PALETTE } from "../utils/theme";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent]);

const props = defineProps({
  title: {
    type: String,
    default: "Distribuição",
  },
  data: {
    type: Array,
    default: () => [
      { name: "Item A", value: 40 },
      { name: "Item B", value: 30 },
      { name: "Item C", value: 20 },
      { name: "Item D", value: 10 },
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

const pieOption = computed(() => ({
  tooltip: {},
  legend: {
    bottom: "5%",
    left: "center",
    itemWidth: 10,
    itemHeight: 10,
    icon: "circle",
    textStyle: { color: "#9ca3af", fontSize: 12 },
  },
  series: [
    {
      name: props.title,
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true,
        position: "outside",
        formatter: "{b}: {d}%",
        color: "#6b7280",
        fontSize: 12,
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10,
        lineStyle: {
          color: "#e5e7eb",
        },
      },
      emphasis: {},
      data: props.data,
    },
  ],
  color: CHART_PALETTE,
}));
</script>

<style scoped>
.pie-chart {
  min-height: 350px;
}
</style>
