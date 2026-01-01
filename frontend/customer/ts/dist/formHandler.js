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
    const response = yield fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  bookingForm.addEventListener("submit", (event) =>
    __awaiter(void 0, void 0, void 0, function* () {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const order = {
        name: formData.get("name"),
        email: formData.get("email"),
        meal: formData.get("meal"),
        quantity: Number(formData.get("quantity")),
        specialRequest: formData.get("specialRequest"),
      };
      try {
        const response = yield createOrder(order);
        var modalEl2 = document.getElementById("messageModal");
        var titleEl2 = document.getElementById("messageModalTitle");
        var bodyEl2 = document.getElementById("messageModalBody");
        var okBtn2 = document.getElementById("messageModalOk");
        if (modalEl2 && window.bootstrap) {
          titleEl2.textContent = "Order placed";
          bodyEl2.textContent =
            "Order placed successfully. We'll deliver it soon.";
          var header2 = modalEl2.querySelector(".modal-header");
          header2.classList.remove(
            "bg-success",
            "bg-danger",
            "bg-warning",
            "bg-info",
            "text-white"
          );
          header2.classList.add("bg-success", "text-white");
          var bsModal2 = new window.bootstrap.Modal(modalEl2);
          okBtn2.onclick = function () {
            bsModal2.hide();
            window.location.href = "index.html";
          };
          bsModal2.show();
          setTimeout(function () {
            bsModal2.hide();
            window.location.href = "index.html";
          }, 2000);
        } else {
          alert("Order placed successfully. We'll deliver it soon.");
          setTimeout(function () {
            window.location.href = "index.html";
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Order failed.");
      }
    })
  );
});
