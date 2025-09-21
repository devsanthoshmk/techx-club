<script setup>
const props = defineProps({
  score: Number
});
</script>

<template>
  <div class="score-panel">
    <div class="score">Score: {{ score }}</div>
  </div>
</template>
