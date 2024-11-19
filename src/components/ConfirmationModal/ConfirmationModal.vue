<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'
</script>

<template>
  <IModal>
    <div>Do you really want to delete the marker?</div>
    <div>
      <IButton>Cancel</IButton>
      <IButton>Confirm</IButton>
    </div>
  </IModal>
</template>
