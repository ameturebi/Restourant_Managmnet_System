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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const wowjs_1 = __importDefault(require("wowjs"));
// Initialize WOW.js
new wowjs_1.default().init();
// Handle form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      // Call the login API
      const response = yield fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Hide login form and show orders section
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("orderSection").style.display = "block";
      } else {
        alert("Invalid username or password");
      }
    });
  });
// Fetch orders when the button is clicked
document.getElementById("fetchOrders").addEventListener("click", function () {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch("/api/orders");
    if (response.ok) {
      const orders = yield response.json();
      const tbody = document.querySelector("tbody");
      if (tbody) {
        tbody.innerHTML = "";
        orders.forEach((order) => {
          const row = `<tr>
                                <td>${order.id}</td>
                                <td>${order.item}</td>
                                <td>${order.quantity}</td>
                             </tr>`;
          tbody.innerHTML += row;
        });
      }
    } else {
      alert("Failed to fetch orders");
    }
  });
});
