<script setup lang="ts">
import { ref } from 'vue'
import Popup from './Popup.vue'
import { modalPush } from './modal';

defineProps<{ msg: string }>()

const count = ref(0);

const openModal = ()=>{
  modalPush({comp: Popup})?.then(console.log).catch(console.error);
}
</script>

<template>
  <button @click="openModal">open modal</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
