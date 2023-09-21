const Joi = require("joi");
const express = require("express");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use(express.static("public"));

const registeredUsersArray = [];

function validateData(req, res, next) {
  const schema = Joi.object({
    registerUsername: Joi.string().min(6).required(),
    registerPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,10}$/)),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

function validateDataLogin(req, res, next) {
  const schema = Joi.object({
    loginUsername: Joi.string().min(6).required(),
    loginPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,10}$/)),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

function registeredUser(username, password) {
  if (!username || !password) {
    return Promise.reject("Username and password are required");
  }
  const existingUser = registeredUsersArray.find(
    (user) => user.username === username
  );
  if (existingUser) return Promise.reject("Username already registered");

  const newUser = { username, password };
  registeredUsersArray.push(newUser);

  return Promise.resolve("Successfully registered");
}

function loggedUser(username, password) {
  const alreadyLoggedUser = registeredUsersArray.find(
    (user) => user.username === username && user.loggedIn
  );

  if (alreadyLoggedUser) {
    return Promise.reject("Username already logged in");
  }

  const logInUser = registeredUsersArray.find(
    (user) => user.username === username && user.password === password
  );
  if (logInUser) {
    logInUser.loggedIn = true;
    return Promise.resolve("Successfully Logged in");
  } else {
    return Promise.reject("Login failed");
  }
}

app.post("/register", validateData, (req, res) => {
  const { registerUsername, registerPassword } = req.body;

  registeredUser(registerUsername, registerPassword)
    .then((result) => {
      console.log(`User registered: ${registerUsername}`);
      res.send(result);
    })
    .catch((error) => {
      console.error(`Register failed: ${error}`);
      res.status(400).send(error);
    });
});

app.post("/login", validateDataLogin, (req, res) => {
  const { loginUsername, loginPassword } = req.body;
  loggedUser(loginUsername, loginPassword)
    .then((result) => {
      console.log(`User logged in: ${loginUsername}`);
      res.send(result);
    })
    .catch((error) => {
      console.error(`Login failed: ${error}`);
      res.status(401).send(error);
    });
});

app.listen(port, () => {
  console.log(`Listening to register/login app on ${port}`);
});

console.log(registeredUsersArray);
