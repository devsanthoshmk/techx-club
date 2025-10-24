<template>
  <div v-if="presses.length!==0" class="buzzer-container">
    <!-- Header -->
    <h2 class="buzzer-header"><p>Buzzer Presses ({{ presses.length }})</p><span @click="reset">x</span></h2>
    

    <!-- Body -->
    <transition-group name="fade-slide" tag="div" class="buzzer-body">
      <div v-for="(press, index) in presses" :key="press.id" class="buzzer-item">
        <span class="buzzer-name">{{ press.name }}</span>
        <span v-if="index > 0" class="buzzer-delay">-{{ (press.delay/1000).toFixed(2) }}s</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted,onUnmounted, watchEffect } from "vue";
import socket from "../socket/socketio";
import { useBackendKey } from "../data/backendApi";

const { backendKey } = useBackendKey();

const backendApi = backendKey.value;

const props = defineProps({
    questionNo:Number
})

const presses = ref(
  JSON.parse(localStorage.getItem('busser') || "{}")[props.questionNo] || []
);
let firstClickTime = null;
let counter = 1;

// Dummy student names
const students = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];

socket.on("connect", () => {
    console.warn("admin socket connected", socket.id);
});


socket.on("clickUpdate", (click) => {
    const temp = presses.value
    console.log(click)
    temp.push({
        id: counter++,
        name: click.name,
        delay: click.delayFromFirst
    })

    // sort here
    presses.value = temp.sort((a, b) => a.delay - b.delay);


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
    presses.value = temp.sort((a, b) => a.delay - b.delay);


});

socket.on("reset", () => {
    counter = 1
    presses.value=[]
});

const reset = async () => {
  // await fetch(backendApi + `reset`);// remove from backend
  const temp = JSON.parse(localStorage.getItem('busser') || "{}");
    console.log(props.questionNo)
    delete temp[props.questionNo];
  localStorage.setItem("busser", JSON.stringify(temp))
    presses.value = [];
};

onUnmounted(() => {
    const prevstorage = JSON.parse(localStorage.getItem('busser')||"{}")
    localStorage.setItem('busser', JSON.stringify({ ...prevstorage, [props.questionNo]: presses.value }));
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
  display: flex;
  justify-content: space-between;
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
