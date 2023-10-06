"use strict";

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (e) {
    // tu staviti arrow funkciju
    e.preventDefault();

    const registerData = {
      registerUsername: document.getElementById("registerUsername").value,
      registerPassword: document.getElementById("registerPassword").value,
    };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.text();
      const registrationMessage = document.getElementById(
        "registrationMessage"
      );
      registrationMessage.textContent = `Registration successful: ${data}`; // successfully registered
      registrationMessage.style.color = "black";
    } catch (error) {
      const registrationMessage = document.getElementById(
        "registrationMessage"
      );
      registrationMessage.textContent = `Registration failed: ${error}`;
      registrationMessage.style.color = "red";
    }
  });

//   fetch("/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(registerData),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         return response.text().then((error) => {
//           throw new Error(error); // tu sad switcha između 2 errora
//         });
//       }
//       return response.text();
//     })
//     .then((data) => {
//       const registrationMessage = document.getElementById(
//         "registrationMessage"
//       );
//       registrationMessage.textContent = `Registration successful: ${data}`; // successfully registered
//       registrationMessage.style.color = "black";
//     })

//     .catch((error) => {
//       const registrationMessage = document.getElementById(
//         "registrationMessage"
//       );
//       registrationMessage.textContent = `Registration failed: ${error}`;
//       registrationMessage.style.color = "red";
//     });
// });

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const loginData = {
      loginUsername: document.getElementById("loginUsername").value,
      loginPassword: document.getElementById("loginPassword").value,
    };

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.text();
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.textContent = `Login successful: ${data}`;
      loginMessage.style.color = "black";
    } catch (error) {
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.textContent = `Login failed: ${error}`;
      loginMessage.style.color = "red";
    }
  });
