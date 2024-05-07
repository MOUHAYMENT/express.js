// app.js
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 11 && hour <= 17) {
    next();
    console.log("ok");
  } else {
    console.log("ok 2");

    return res.send(
      "Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17)."
    );
  }
};
app.use(checkWorkingHours);

app.use(express.static("public"));

app.get("/", checkWorkingHours, (req, res) => {
  const homePath = path.resolve("index.html");
  const data = fs.readFileSync(homePath, "utf-8");
  res.send(data);
});
app.get("/contact", (req, res) => {
  const contactPath = path.resolve("contact.html");
  const data = fs.readFileSync(contactPath, "utf-8");
  res.send(data);
});
app.get("/services", (req, res) => {
  const servicesPath = path.resolve("services.html");
  const data = fs.readFileSync(servicesPath, "utf-8");
  res.send(data);
});
const port = 3000; // You can change the port if you'd like

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
