"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = require("mongoose");
const connectMongoDB = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_CONNECT_URL);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log(`Failed to connect to MongoDB Atlas\nError: ${err}`);
        process.exit(1);
    }
};
exports.connectMongoDB = connectMongoDB;
//# sourceMappingURL=db.js.map