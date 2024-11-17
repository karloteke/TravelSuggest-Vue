<script setup lang="ts">
import CardSuggestionComponent from '@/components/CardSuggestionComponent.vue';
import { useSuggestionStore } from '@/stores/suggestionStore';

const {fetchAllSuggestions} = useSuggestionStore();
fetchAllSuggestions();

</script>

<template>
  <div>
    <CardSuggestionComponent></CardSuggestionComponent>
  </div>
</template> 

