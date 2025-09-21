<script setup>
const props = defineProps({
  score: Number,
  total: Number
});
const emit = defineEmits(["restart"]);
</script>

<template>
  <section class="summary-section">
    <div class="content-container animate-fade-in">
      <h1>Quiz Completed!</h1>
      <h3>Your Score: {{ score }}/{{ total }}</h3>
      <p>Thank you for participating in our National Science Day Quiz!</p>
      <button class="start-button" @click="emit('restart')">Restart Quiz</button>
    </div>
  </section>
</template>
