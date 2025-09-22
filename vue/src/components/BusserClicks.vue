<template>
  <div v-if="presses.length!==0" class="buzzer-container">
    <!-- Header -->
    <h2 class="buzzer-header">Buzzer Presses ({{ presses.length }})</h2>

    <!-- Body -->
    <transition-group name="fade-slide" tag="div" class="buzzer-body">
      <div v-for="(press, index) in presses" :key="press.id" class="buzzer-item">
        <span class="buzzer-name">{{ press.name }}</span>
        <span v-if="index > 0" class="buzzer-delay">+{{ press.delay }}s</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import socket from "../socket/socketio";

const presses = ref([]);
let firstClickTime = null;
let counter = 1;

// Dummy student names
const students = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];

socket.on("connect", () => {
    console.warn("admin socket connected", socket.id);
});

socket.on("init", (data) => {
    console.log(data)
    (data.clicks || []).forEach((data) => {
        presses.value = [];
        counter = 1
        presses.value.push({
            id: counter++,
            name: data.name,
            delay: (data.delayFromFirstMs / 1000).toFixed(2)
        })
    })
});

socket.on("clickUpdate", (click) => {
    const temp = presses.value
    temp.push({
        id: counter++,
        name: click.name,
        delay: (click.delayFromFirstMs / 1000).toFixed(2)
    })

    // sort here
    presses.value = temp

});

socket.on("firstPress", (click) => {
    // firstEl.innerText = `First pressed by ${click.name} at ${new Date(click.clientTs).toLocaleString()}`;
    // renderClick(click);
    const temp = presses.value
    temp.push({
        id: counter++,
        name: click.name,
        delay: 0
    })

    // sort here
    process.value=temp

});

socket.on("reset", () => {
    counter = 1
    presses.value=[]
});

onMounted(() => {
  // Simulate buzzer presses every 3 seconds
//   setInterval(() => {
//     const now = Date.now();
//     if (!firstClickTime) firstClickTime = now;

//     presses.value.push({
//       id: counter++,
//       name: students[Math.floor(Math.random() * students.length)],
//       delay: ((now - firstClickTime) / 1000).toFixed(2),
//     });
//   }, 3000);
});
</script>

<style scoped>
.buzzer-container {
    height: 70%;
    overflow-y: scroll;
    margin-left: 15px;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.1);
  font-family: "Inter", sans-serif;
  color: #fff;
}

.buzzer-header {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #facc15; /* Yellow theme */
  margin-bottom: 16px;
}

.buzzer-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buzzer-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: #2a2a2a;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.3);
}

.buzzer-name {
  color: #fff;
}

.buzzer-delay {
  color: #9ca3af;
  font-size: 14px;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
