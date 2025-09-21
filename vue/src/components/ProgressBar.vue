<script setup>
const props = defineProps({
  progress: Number
});
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>
