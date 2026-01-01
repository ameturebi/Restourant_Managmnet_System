"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
function createOrder(order) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    return response.json();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");

  // showMessage helper
  function showMessage(type, title, message, autoClose, autoCloseMs, onClose) {
    var modalEl = document.getElementById("messageModal");
    var titleEl = document.getElementById("messageModalTitle");
    var bodyEl = document.getElementById("messageModalBody");
    var okBtn = document.getElementById("messageModalOk");
    if (modalEl && window.bootstrap) {
      titleEl.textContent = title;
      bodyEl.textContent = message;
      var header = modalEl.querySelector(".modal-header");
      header.classList.remove(
        "bg-success",
        "bg-danger",
        "bg-warning",
        "bg-info",
        "text-white"
      );
      if (type === "success") header.classList.add("bg-success", "text-white");
      if (type === "error") header.classList.add("bg-danger", "text-white");
      if (type === "warning") header.classList.add("bg-warning");
      if (type === "info") header.classList.add("bg-info");
      var bsModal = new window.bootstrap.Modal(modalEl);
      okBtn.onclick = function () {
        bsModal.hide();
        if (onClose) onClose();
      };
      bsModal.show();
      if (autoClose) {
        setTimeout(function () {
          bsModal.hide();
          if (onClose) onClose();
        }, autoCloseMs || 2000);
      }
    } else {
      alert(message);
      if (onClose) onClose();
    }
  }
  bookingForm.addEventListener("submit", (event) =>
    __awaiter(void 0, void 0, void 0, function* () {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const deliveryOption = formData.get("deliveryOption") || "on-site";
      const phone = formData.get("phone") || "";
      const address = formData.get("address") || "";
      if (deliveryOption === "delivery") {
        if (!address.trim()) {
          showMessage(
            "warning",
            "Missing info",
            "Please enter an address for delivery."
          );
          return;
        }
        if (!phone.trim()) {
          showMessage(
            "warning",
            "Missing info",
            "Please enter a phone number for delivery."
          );
          return;
        }
      }
      const order = {
        name: formData.get("name"),
        email: formData.get("email"),
        meal: formData.get("meal"),
        quantity: Number(formData.get("quantity")),
        deliveryOption: deliveryOption,
        phone: phone,
        address: address,
        specialRequest: formData.get("specialRequest"),
      };
      try {
        const response = yield createOrder(order);
        showMessage(
          "success",
          "Order placed",
          "Order placed successfully. We'll deliver it soon.",
          true,
          2000,
          function () {
            window.location.href = "index.html";
          }
        );
      } catch (error) {
        console.error("Error:", error);
        showMessage("error", "Error", "Order failed!");
      }
    })
  );
});
