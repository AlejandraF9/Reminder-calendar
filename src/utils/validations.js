import { showToast } from "./toastify";

export function validateTextarea(reminder) {
    if(!reminder || reminder.trim() === "") {
        showToast({text: "Escribe tu recordatorio", type: "warning"});
        return false;
    }
    return true;
}