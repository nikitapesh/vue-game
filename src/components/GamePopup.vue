<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  word: string
}

defineProps<Props>()

type Status = 'win' | 'lose'
const gameStatus = ref<Status | null>(null)
const isVisible = ref(false)

function changeVisible(status: Status | null = null) {
  gameStatus.value = status
  isVisible.value = !isVisible.value
}

defineExpose({
  changeVisible
})

const emit = defineEmits<{
  (event: 'playAgain'): void
}>()
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ word }}</h3>
      </template>
      <button @click="emit('playAgain')">Сыграть еще раз</button>
    </div>
  </div>
</template>
