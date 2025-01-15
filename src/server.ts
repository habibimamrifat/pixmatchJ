import app from "./app";
import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.Mongoose_uri as string);
    console.log("Connected to MongoDB");

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}


main().catch((error) => {
  console.error("Unhandled promise rejection", error);
  process.exit(1);
});

// Handle unexpected promise rejections globally
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  // Optionally shut down the server gracefully
  if (server) {
    server.close(() => {
      console.log("Server closed due to unhandled promise rejection.");
      process.exit(1); // Exit with failure code
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions globally
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);

  // Optionally shut down the server gracefully
  if (server) {
    server.close(() => {
      console.log("Server closed due to uncaught exception.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});