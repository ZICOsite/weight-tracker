<script setup>
import { ref, shallowRef, watch, nextTick } from "vue";
import Chart from 'chart.js/auto';
import { useWeightStore } from "@/stores/weightStore";

const weightStore = useWeightStore();

const canvas = ref(null);

const weightChart = shallowRef(null);

watch(
  weightStore.weights,
  (newWeights) => {
    const weights = [...newWeights];

    if (weightChart.value) {
      weightChart.value.data.labels = weights
        .sort((a, b) => a.date - b.date)
        .map((weight) => new Date(weight.date).toLocaleDateString())
        .slice(-7);

      weightChart.value.data.datasets[0].data = weights
        .sort((a, b) => a.date - b.date)
        .map((weight) => weight.weight)
        .slice(-7);

      weightChart.value.update();
      return;
    }

    nextTick(() => {
      weightChart.value = new Chart(canvas.value.getContext("2d"), {
        type: "line",
        data: {
          labels: weights
            .sort((a, b) => a.date - b.date)
            .map((weight) => new Date(weight.date).toLocaleDateString()),
          datasets: [
            {
              label: "Weight",
              data: weights
                .sort((a, b) => a.date - b.date)
                .map((weight) => weight.weight),
              backgroundColor: "rgba(66, 184, 131, 0.3)",
              borderColor: "rgba(66, 184, 131)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
  },
  { deep: true }
);
</script>

<template>
    <div class="graphic">
        <canvas ref="canvas" class="canvas"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.graphic {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}
</style>
