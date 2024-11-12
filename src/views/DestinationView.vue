<script setup lang="ts">
import CardDestinationComponent from '@/components/CardDestinationComponent.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const {fetchAllDestinations} = useDestinationStore();
fetchAllDestinations();

</script>

<template>
  <div>
    <CardDestinationComponent></CardDestinationComponent>
  </div>
</template> 


