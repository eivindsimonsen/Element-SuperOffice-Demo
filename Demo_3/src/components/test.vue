<template>
  <div class="container">
    <h1>Welcome to My Vue 3 Page</h1>
    <p>{{ message }}</p>
    <button @click="incrementCount">Click me: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('This is a basic Vue 3 page using the Composition API')
const count = ref(0)

const incrementCount = () => {
  count.value++
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #4a4a4a;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
