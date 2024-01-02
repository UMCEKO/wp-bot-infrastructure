"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const index_1 = require("../../index");
const basicFn_1 = require("../../functions/basicFn");
module.exports = {
    event: whatsapp_web_js_1.Events.MESSAGE_CREATE,
    execute: async (message) => {
        if (message.body[0] != "/")
            return;
        let command;
        if (message.body.includes(" "))
            command = message.body.substring(1, message.body.indexOf(" "));
        else
            command = message.body.substring(1, message.body.length);
        if (!index_1.client.commands.has(command) || message.body.length < 2) {
            await message.reply("Please input a valid command.");
            return;
        }
        try {
            let execute = index_1.client.commands.get(command);
            await execute(message, (0, basicFn_1.getArgs)(message));
        }
        catch (err) {
            console.log(err);
            await message.reply("There was an error whilst executing the command, for more info, contact the developer.");
        }
    }
};
//# sourceMappingURL=commandHandler.js.map