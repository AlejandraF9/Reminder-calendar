import Toast from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast({
  text = "Something happened",
  type = "success",
  duration = 3000,
  position = "right",
  gravity = "top",
} = {}) {
  const colors = {
    success: "linear-gradient(to right, #00b09b, #51e143ff)",
    error: "linear-gradient(to right, #ed2c59ff, #ff4b2b)",
    info: "linear-gradient(to right, #2193b0, #6dd5ed)",
    warning: "linear-gradient(to right, #f7971e, #ffaa00ff)",
  };

  Toast({
    text,
    duration,
    close: true,
    gravity,
    position,
    style: {
      background: colors[type] || colors.info,
    },
  }).showToast();
}