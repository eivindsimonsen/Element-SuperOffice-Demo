<template>
  <el-table :data="rows" style="width: 100%">
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="region" label="Zone" />
    <el-table-column prop="count" label="Count" />
    <el-table-column label="Date">
      <template #default="scope">
        {{ formatDate(scope.row.date1) }}
      </template>
    </el-table-column>
    <el-table-column label="Time">
      <template #default="scope">
        {{ formatTime(scope.row.date2) }}
      </template>
    </el-table-column>
    <el-table-column prop="delivery" label="Delivery" />
    <el-table-column prop="location" label="Location" />
    <el-table-column prop="type" label="Type" />
    <el-table-column prop="resource" label="Resources" />
    <el-table-column prop="desc" label="Form" />
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  rows: Array<{
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
  }>
}>()

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const formatTime = (time: string) => {
  if (!time) return ''
  const d = new Date(time)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style>
.el-table--fit {
  width: 1200px !important; /* Allow the table to adjust its width */
}

.el-table .el-table__cell {
  text-align: center !important;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow content */
  text-overflow: ellipsis; /* Add ellipsis for overflow content */
}

.cell {
  width: fit-content !important;
  text-align: left !important;
}
</style>
