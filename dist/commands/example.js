"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
module.exports = {
    name: "test",
    execute: async (message, args) => {
        console.log(args);
        console.log(...args);
        await message.reply(args.join(" "));
        index_1.client.sendMessage("905347140999@c.us", "Selam");
    }
};
//# sourceMappingURL=example.js.map