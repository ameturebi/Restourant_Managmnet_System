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
    const response = yield fetch("http://localhost:3000/orders", {
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
  bookingForm.addEventListener("submit", (event) =>
    __awaiter(void 0, void 0, void 0, function* () {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const deliveryOption = formData.get("deliveryOption") || "on-site";
      const phone = formData.get("phone") || "";
      const address = formData.get("address") || "";
      if (deliveryOption === "delivery") {
        if (!address.trim()) {
          alert("Please enter an address for delivery.");
          return;
        }
        if (!phone.trim()) {
          alert("Please enter a phone number for delivery.");
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
        alert("Order placed successfully. We'll deliver it soon.");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        alert("Order failed!");
      }
    })
  );
});
