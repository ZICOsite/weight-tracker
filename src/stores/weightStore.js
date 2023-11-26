import { defineStore } from "pinia";

export const useWeightStore = defineStore("weight", {
  state: () => ({
    weights: [],
    weightInput: "",
  }),
  actions: {
    addWeight(val) {
      this.weightInput = val;

      const objWeight = {
        weight: this.weightInput,
        date: new Date().getTime(),
      };

      this.weights.push(objWeight);
    },
  },
});
