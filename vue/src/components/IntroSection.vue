<script setup>
const props = defineProps({
  score: Number,
  total: Number
});

const emit = defineEmits(["restart"]);
</script>

<template>
    <section id="intro" class="intro-section">
      <div class="parallax-layer bg-layer">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);"></div>
      </div>
      <div class="parallax-layer mid-layer">
        <div class="floating" style="font-size: 15rem; color: rgba(255, 255, 255, 0.1);">⚛️</div>
      </div>
      <div class="parallax-layer front-layer">
        <div class="content-container animate-fade-in">
          <h1>TechX quiz</h1>
          <p>Welcome to the TechX quiz Challenge! Test your knowledge across various technical domains and problem-solving skills.</p>
          <p>This quiz consists of 10 challenging questions covering programming, web development, algorithms, and more.</p>
          <button class="start-button" id="startButton">Start Quiz</button>
        </div>
      </div>
    </section>
</template>
