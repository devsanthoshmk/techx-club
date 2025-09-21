<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const totalQuestions = 20; // adjust as needed

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="toggleSidebar">
      ☰ Questions
    </button>

    <!-- Slide-in Sidebar -->
    <div class="sidebar" :class="{ open: isOpen }">
      <div class="sidebar-header">
        <h3>Questions</h3>
        <button class="close-btn" @click="toggleSidebar">✖</button>
      </div>

      <div class="question-list">
        <button
          v-for="n in totalQuestions"
          :key="n"
          class="question-btn"
        >
          {{ n }}
        </button>
      </div>
    </div>

    <!-- Overlay (click to close) -->
    <div v-if="isOpen" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<style scoped>
/* Toggle button */
.toggle-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1001;
  transition: 0.3s;
}
.toggle-btn:hover {
  background: #2563eb;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -40%;
  width: 35%;
  max-width: 400px;
  height: 100vh;
  background: #1e1e2f;
  color: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.3);
  transition: left 0.3s ease-in-out;
  z-index: 1002;
  display: flex;
  flex-direction: column;
}
.sidebar.open {
  left: 0;
}

/* Header */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #333;
}
.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

/* Question List */
.question-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 12px;
  overflow-y: auto;
}
.question-btn {
  background: #2d2d44;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.question-btn:hover {
  background: #3b3b55;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}
</style>
