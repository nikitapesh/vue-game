<script setup lang="ts">
type Props = {
  word: string
  correctLetters: string[]
}

const props = defineProps<Props>()

function isDisplayedLetter(letter: string): string {
  return props.correctLetters.includes(letter) ? letter : ''
}
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" :key="letter + index" class="letter">
      {{ isDisplayedLetter(letter.toLowerCase()) }}
    </span>
  </div>
</template>
