<template>
  <div
    v-if="modals.length > 0"
    class="modal-waypoint-container"
  >
    <component
      :is="item.comp"
      v-for="(item, idx) in modals"
      :key="idx"
      v-bind="item.props"
      :resolve="item.resolve"
      :reject="item.reject"
    />
  </div>
</template>

<script setup lang="ts">
import { modals } from './modal';
</script>

<style scoped>
.modal-waypoint-container{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

</style>
