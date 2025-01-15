"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.Mongoose_uri);
            console.log("Connected to MongoDB");
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error("Error connecting to MongoDB", error);
            process.exit(1);
        }
    });
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
    }
    else {
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
    }
    else {
        process.exit(1);
    }
});
