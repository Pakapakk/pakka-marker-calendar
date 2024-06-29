<template>
  <div class="calendar-wrapper">
    <div class="calendar-container">
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
        </div>
        <VCalendar expanded borderless />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isDark = ref(false);
</script>

<style>
.calendar-wrapper {
  padding-top: 30px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100vw;
  height: 100vh;
}

.calendar-container {
  width: 500px;
  height: 300px;
  justify-content: center;
  align-items: center;
}
</style>
