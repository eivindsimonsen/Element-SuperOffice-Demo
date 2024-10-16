<script lang="ts" setup>
import { ref } from 'vue'
import Form from './components/Form.vue'
import Table from './components/Table.vue'

// Reactive array to store rows
const rows = ref([])

// Function to add a new row
const addRow = (formData) => {
  rows.value.push(formData)
}
</script>

<template>
  <div>
    <Form @submit="addRow" />
    <Table :rows="rows" />
  </div>
</template>


<style scoped>

</style>
