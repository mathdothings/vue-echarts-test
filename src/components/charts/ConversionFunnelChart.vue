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
      class="w-full h-[350px] funnel-chart"
      :option="funnelOption"
      :autoresize="true"
    />
  </div>
</template>

<style scoped>
.funnel-chart {
  height: clamp(300px, 30vh, 600px);
}
</style>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { FunnelChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { CHART_PALETTE, TEXT_COLORS } from "../../utils/theme";

use([CanvasRenderer, FunnelChart, TooltipComponent, LegendComponent]);

const props = defineProps({
  title: { type: String, default: "Funil de Conversão" },
  data: { type: Array, default: () => [] }, // [{ name: 'A', value: 100 }, ...]
});

const renderChart = ref(false);

onMounted(async () => {
  await nextTick();
  renderChart.value = true;
});

const funnelOption = computed(() => ({
  color: CHART_PALETTE,
  tooltip: { trigger: "item", formatter: "{b}: <b>{c}</b>" },
  legend: {
    bottom: "5%",
    left: "center",
    textStyle: { color: TEXT_COLORS.muted },
  },
  series: [
    {
      name: props.title,
      type: "funnel",
      left: "10%",
      top: 60,
      bottom: 80,
      width: "65%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 2,
      label: {
        show: true,
        position: "right",
        formatter: "{b}: {c}",
        color: TEXT_COLORS.secondary,
      },
      labelLine: {
        show: true,
        length: 20,
        lineStyle: {
          color: "#e5e7eb",
        },
      },
      itemStyle: { borderColor: "#fff", borderWidth: 2 },
      emphasis: { opacity: 0.8 },
      data: props.data,
    },
  ],
}));
</script>
