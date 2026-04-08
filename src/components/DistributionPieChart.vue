<template>
  <div class="relative flex flex-col border border-neutral-200 rounded-xl bg-white shadow-sm overflow-hidden">
    <div class="pt-6 px-6 flex flex-col items-start pointer-events-none" v-if="renderChart">
      <span class="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
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
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
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
});

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const pieOption = computed(() => ({
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: [10, 15],
    textStyle: { color: "#374151" },
    formatter: "{b}: <b>{c}</b> ({d}%)"
  },
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
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: props.data,
    },
  ],
  color: ["#3b82f6", "#10b981", "#6366f1", "#f59e0b", "#ef4444"],
}));
</script>

<style scoped>
.pie-chart {
  min-height: 350px;
}
</style>
