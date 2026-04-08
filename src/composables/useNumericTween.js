import { ref, watch } from 'vue';

/**
 * A composable that "tweens" a numeric value for a rolling counter effect.
 * 
 * @param {Ref|Function} source - The reactive source number to watch.
 * @param {number} duration - Animation duration in milliseconds (default 1000).
 * @returns {Ref} A ref containing the smoothly transitioning value.
 */
export function useNumericTween(source, duration = 1000) {
  const displayValue = ref(typeof source === 'function' ? source() : source.value || 0);

  watch(
    source,
    (newVal, oldVal) => {
      const start = oldVal || 0;
      const end = newVal;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic: f(t) = 1 - (1 - t)^3
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        displayValue.value = start + (end - start) * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    },
    { immediate: true }
  );

  return displayValue;
}
