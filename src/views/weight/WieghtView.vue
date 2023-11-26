<script setup>
import { ref, computed } from "vue";
import { useWeightStore } from "@/stores/weightStore.js";
import Canvas from "@/components/Canvas.vue";

const weightStore = useWeightStore();

const currentWeight = computed(() => {
	return weightStore.weights?.sort((a, b) => b.date - a.date)[0] || { weight: 0 }
})

const weightInput = ref("");

</script>

<template>
  <section class="weight">
    <div class="container">
      <h1 class="weight__title">Weight Tracker</h1>
      <div class="weight__current">
          <span class="weight__current-span">{{ currentWeight.weight }}</span>
          <small>Current Weight (kg)</small>
      </div>
      <form
        action=""
        class="weight__form"
        @submit.prevent="weightStore.addWeight(weightInput)"
      >
        <input type="number" class="weight__form-input" v-model="weightInput" placeholder="Enter weight" />
        <button class="weight__form-btn">Add weight</button>
      </form>
      <div class="weight__statistics" v-if="weightStore.weights">
        <h3 class="weight__statistics-title">Last 7 days</h3>
        <Canvas />
        <ul class="weight__statistics-list">
          <li
            class="weight__statistics-item"
            v-for="item in weightStore.weights"
            :key="item.date"
          >
            <span class="weight__statistics-span">{{ item.weight }} kg</span>
            <small>{{ new Date(item.date).toLocaleDateString() }}</small>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
