const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  if (process.env.NODE_ENV === "dev") {
    dotenv.config({
      path: "./dev.env",
    });
  } else {
    dotenv.config({
      path: "./config.env",
    });
  }
}

const app = require("./app");

// Start the server
const port = process.env.PORT || 3020;
app.listen(port, () => {
  console.info(`Application is running on port ${port}`);
});
