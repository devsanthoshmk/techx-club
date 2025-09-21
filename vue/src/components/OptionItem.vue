<script setup>
import { computed } from "vue";

const props = defineProps({
  option: String,
  text: String,
  correct: String,
  selected: String
});

const isSelected = computed(() => props.option === props.selected);
const isCorrect = computed(() => isSelected.value && props.option === props.correct);
const isIncorrect = computed(() => isSelected.value && props.option !== props.correct);
</script>

<template>
  <li
    class="option"
    :class="{ selected: isSelected, correct: isCorrect, incorrect: isIncorrect }"
  >
    {{ option }}) {{ text }}
  </li>
</template>
