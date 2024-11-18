<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'
</script>

<template>
  <IModal>
    <div>Are youb really want delete marker?</div>
    <div>
      <IButton>Cancel</IButton>
      <IButton>Confirm</IButton>
    </div>
  </IModal>
</template>
