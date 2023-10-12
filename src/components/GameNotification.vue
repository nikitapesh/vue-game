<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

function changeVisible() {
  isVisible.value = !isVisible.value
}

defineExpose({
  changeVisible
})
</script>

<template>
  <div class="notification-container" v-show="isVisible">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>
