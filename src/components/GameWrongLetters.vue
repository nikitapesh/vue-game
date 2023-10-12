<script setup lang="ts">
type Props = {
  wrongLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="wrongLetters.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(letter, index) in wrongLetters" :key="letter + index" class="letter-item">
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.letter-item:not(:last-child)::after {
  content: ', ';
}
</style>
