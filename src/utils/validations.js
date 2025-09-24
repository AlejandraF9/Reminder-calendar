import { showToast } from "./toastify";

export function validateTextarea(reminder) {
    if(!reminder || reminder.trim() === "") {
        showToast({text: "Escribe algo antes de guardar", type: "warning"});
        return false;
    }
    return true;
}