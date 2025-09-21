<script setup>
import OptionItem from "./OptionItem.vue";

const props = defineProps({
  question: Object,
  index: Number,
  total: Number,
  selected: String
});

const emit = defineEmits(["select", "next", "prev"]);
</script>

<template>
  <section class="question-section">
    <div class="content-container">
      <h3>{{ question.category }}</h3>
      <h4>{{ index + 1 }}. {{ question.question }}</h4>

      <pre v-if="question.code"><code>{{ question.code }}</code></pre>

      <ul class="options">
        <OptionItem
          v-for="(text, key) in question.options"
          :key="key"
          :option="key"
          :text="text"
          :correct="question.ans"
          :selected="selected"
          @click="emit('select', key)"
        />
      </ul>

      <div class="nav-buttons">
        <button class="nav-button prev-button" @click="emit('prev')" :disabled="index === 0">Previous</button>
        <button class="nav-button next-button" @click="emit('next')">
          {{ index === total - 1 ? 'Finish' : 'Next' }}
        </button>
      </div>
    </div>
  </section>
</template>
