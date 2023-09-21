"use strict";

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    // tu staviti arrow funkcij
    e.preventDefault();

    const registerData = {
      registerUsername: document.getElementById("registerUsername").value,
      registerPassword: document.getElementById("registerPassword").value,
    };

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((error) => {
            throw new Error(error); //
          });
        }
        return response.text();
      })
      .then((data) => {
        const registrationMessage = document.getElementById(
          "registrationMessage"
        );
        registrationMessage.textContent = `Registration successful: ${data}`;
        registrationMessage.style.color = "black";
      })

      .catch((error) => {
        const registrationMessage = document.getElementById(
          "registrationMessage"
        );
        registrationMessage.textContent = `Registration failed: ${error}`;
        registrationMessage.style.color = "red";
      });
  });

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const loginData = {
    loginUsername: document.getElementById("loginUsername").value,
    loginPassword: document.getElementById("loginPassword").value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((error) => {
          throw new Error(error);
        });
      }
      return response.text();
    })
    .then((data) => {
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.textContent = `Login successful: ${data}`;
      loginMessage.style.color = "black";
    })
    .catch((error) => {
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.textContent = `Login failed: ${error}`;
      loginMessage.style.color = "red";
    });
});
