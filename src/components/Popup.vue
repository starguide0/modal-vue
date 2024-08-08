<script lang="ts" setup>
import { type ModalBaseProperties } from './modal'

const props = defineProps<ModalBaseProperties>();

const ok = () => {
    props.resolve('ok')
}

const cancel = () => {
    props.reject('cancel')
}
</script>
<template>
    Popup
    <button @click="ok">ok</button>
    <button @click="cancel">cancel</button>
</template>