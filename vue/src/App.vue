
<template>
  <div class="parallax-container">
    <QuestionSelect @change="changeQuestion" />
    <ProgressBar :progress="((currentQuestion + 1) / questions.length) * 100" />
    <!-- <ScorePanel :score="score" /> -->

    <IntroSection v-if="!started && !finished" @click="startQuiz" />

    <QuestionSection
      v-else-if="started && !finished"
      :question="questions[currentQuestion]"
      :index="currentQuestion"
      :total="questions.length"
      :selected="answers[currentQuestion]"
      @select="selectAnswer"
      @next="nextQuestion"
      @prev="prevQuestion"
    />

    <SummarySection
      v-else
      :score="score"
      :total="questions.length"
      @restart="startQuiz"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProgressBar from "./components/ProgressBar.vue";
import ScorePanel from "./components/ScorePanel.vue";
import IntroSection from "./components/IntroSection.vue";
import QuestionSection from "./components/QuestionSection.vue";
import SummarySection from "./components/SummarySection.vue";
import QuestionSelect from "./components/QuestionSelect.vue";

import { questions } from "./data/questions";

const currentQuestion = ref(0);
const answers = ref(Array(questions.length).fill(null));
const score = computed(() =>
  answers.value.filter((ans, i) => ans === questions[i].ans).length
);  

const started = ref(false);
const finished = ref(false);

function startQuiz() {
  started.value = true;
  finished.value = false;
  currentQuestion.value = 0;
  answers.value = Array(questions.length).fill(null);
}  

function nextQuestion() {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
  } else {
    finished.value = true;
  }  
}  

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }  
}  

function selectAnswer(option) {
  answers.value[currentQuestion.value] = option;
}  

function changeQuestion(no) {
  currentQuestion.value=no
}

// Create particles for background decoration
function createParticles() {
  const container = document.body;
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    // Random color - science theme colors
    const colors = ['#3a86ff', '#ff006e', '#8338ec', '#ffbe0b', '#fb5607'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Animation
    particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}
onMounted(() => {

  createParticles();
})
</script>
<style>
</style>
