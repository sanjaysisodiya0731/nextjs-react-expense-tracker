import toast from "react-hot-toast";

// ✅ Success Message
export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    duration: 2000, // 2 seconds
  });
};

// ❌ Error Message
export const showError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    duration: 2000,
  });
};

// ⚠️ Warning Message
export const showWarning = (message: string) => {
  toast(message, {
    icon: "⚠️",
    position: "top-right",
    duration: 2000,
    style: {
      background: "#facc15", // yellow
      color: "#000",
    },
  });
};
