import { ref } from 'vue';

const visible = ref(false);

export function showSpinner() {
    visible.value = true;
}

export function hideSpinner() {
    visible.value = false;
}

export { visible };