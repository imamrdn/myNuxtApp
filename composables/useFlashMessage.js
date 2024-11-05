// composables/useFlashMessage.js
import { ref } from "vue";

const message = ref("");
const type = ref("");

export function useFlashMessage() {
  const setFlashMessage = (msg, msgType = "success") => {
    message.value = msg;
    type.value = msgType;

    setTimeout(() => {
      message.value = "";
      type.value = "";
    }, 5000);
  };

  return {
    message,
    type,
    setFlashMessage,
  };
}
