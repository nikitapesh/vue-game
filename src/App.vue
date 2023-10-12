<script setup lang="ts">
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { getRandomName } from '@/api/index'
import { computed, ref, watch, onMounted } from 'vue'

const word = ref('')

const letters = ref<string[]>([])
const correctLetters = computed(() =>
  letters.value.filter((letter) => word.value.toLowerCase().includes(letter))
)
const wrongLetters = computed(() =>
  letters.value.filter((letter) => !word.value.toLowerCase().includes(letter))
)
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const isLose = computed(() => wrongLetters.value.length >= 6)
const isWin = computed(() =>
  [...word.value].every((letter) => correctLetters.value.includes(letter.toLowerCase()))
)

onMounted(async () => {
  word.value = await getRandomName()
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.changeVisible('win')
  }
})

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.changeVisible('lose')
  }
})

async function playAgain(): Promise<void> {
  word.value = await getRandomName()
  letters.value = []
  popup.value?.changeVisible()
}

function isCyrillicLetter(letter: string): boolean {
  return /[а-яА-ЯёЁ]/.test(letter)
}

function toggleNotificationWithDelay(): void {
  notification.value?.changeVisible()
  setTimeout(() => notification.value?.changeVisible(), 2000)
}

function handleKeydown(event: KeyboardEvent): void {
  const key = event.key

  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    toggleNotificationWithDelay()
    return
  }

  if (isCyrillicLetter(key)) {
    letters.value.push(key)
  }
}

window.addEventListener('keydown', handleKeydown)
</script>

<template>
  <h1>Виселица</h1>
  <p>Отгадайте имя - введите букву</p>
  <div class="game-container">
    <GameFigure :wrongLettersCount="wrongLetters.length" />
    <GameWrongLetters :wrongLetters="wrongLetters" />
    <GameWord :word="word" :correctLetters="correctLetters" />
  </div>

  <GamePopup ref="popup" :word="word" @playAgain="playAgain" />
  <GameNotification ref="notification" />
</template>
