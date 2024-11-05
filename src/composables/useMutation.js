import { hideSpinner, showSpinner } from "@/utils/spinnerControl"
import { ref } from "vue"

export const useMutation = ({ mutationFn, onSuccess, onError }) => {
    const data = ref()
    const isLoading = ref(false)
    const error = ref(null)

    const mutation = async (...args) => {
        isLoading.value = true;
        showSpinner();
        try {
            data.value = await mutationFn(...args)
            error.value = null
            onSuccess?.(data)
        } catch (e) {
            error.value = e.response?.data?.message || "Oops! Please adjust your request."
            console.error("Error:", e)
            onError?.(error)
        } finally {
            isLoading.value = false;
            hideSpinner();
        }
    }

    return {
        data,
        isLoading,
        error,
        mutation
    }
}
