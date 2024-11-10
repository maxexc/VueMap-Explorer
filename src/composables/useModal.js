import { ref } from "vue";

export const useModal = () => {
    const isOpen = ref(false)

    const openModal = () => {
        isOpen.value = true
    }

    const closeModal = () => {
        isOpen.value = false
    }

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen,
        openModal,
        closeModal,
        toggle,
    }
}