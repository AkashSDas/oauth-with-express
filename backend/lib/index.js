"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// First loading env variables a
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = require("./config/db");
(0, db_1.connectMongoDB)();
const api_1 = require("./api");
// Start the server
const port = process.env.PORT || 8000;
api_1.app.listen(port, () => console.log(`API is available on http://localhost:${port}/api`));
//# sourceMappingURL=index.js.map