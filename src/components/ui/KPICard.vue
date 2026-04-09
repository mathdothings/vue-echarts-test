<template>
  <div
    class="p-5 border border-neutral-200 rounded-2xl bg-white shadow-sm flex flex-col justify-between"
  >
    <div class="flex justify-between items-start">
      <span
        class="text-sm font-semibold text-neutral-500 uppercase tracking-tight"
      >
        {{ label }}
      </span>
      <div
        :class="[
          'px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1',
          trend >= 0
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-rose-50 text-rose-600',
        ]"
      >
        <svg
          v-if="trend >= 0"
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
        {{ Math.abs(trend) }}%
      </div>
    </div>

    <div class="mt-4">
      <h3 class="text-3xl font-black text-neutral-900 tracking-tight">
        {{ formattedValue }}
      </h3>
      <p class="text-xs text-neutral-400 mt-1">{{ trendLabel }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatValue } from "../../utils/format";
import { useNumericTween } from "../../composables/useNumericTween";

const props = defineProps({
  label: String,
  value: Number,
  trend: Number, // Percentage integer
  isMonetary: { type: Boolean, default: false },
  trendLabel: { type: String, default: "vs. dia anterior" },
});

const displayValue = useNumericTween(() => props.value);

const formattedValue = computed(() => {
  return formatValue(displayValue.value, props.isMonetary);
});
</script>
