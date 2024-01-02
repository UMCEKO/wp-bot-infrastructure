"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const path = require("path");
const basicFn_1 = require("./functions/basicFn");
class CustomClient extends whatsapp_web_js_1.Client {
    commands = new Map();
}
const client = new CustomClient({
    puppeteer: {
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    },
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
exports.client = client;
client.initialize().then();
//event handler
const eventsPath = path.join(__dirname, "events");
let eventFiles = ((0, basicFn_1.getAllFileAbsDirs)(eventsPath));
eventFiles = eventFiles.filter(file => file.endsWith(".ts") || file.endsWith(".js"));
for (let file of eventFiles) {
    let { event = null, execute = null } = require(file);
    if (!event || !execute) {
        console.log("Either event or execute method is missing from the event file named: " + file);
        continue;
    }
    client.on(event, execute);
    console.log(event, execute);
}
//command handler
const commandsPath = path.join(__dirname, "commands");
let commandFiles = (0, basicFn_1.getAllFileAbsDirs)(commandsPath);
commandFiles = commandFiles.filter(file => file.endsWith(".ts") || file.endsWith(".js"));
for (let file of commandFiles) {
    let data = require(file);
    if (!data.name || !data.execute) {
        console.log("Either event or execute method is missing from the command file named: " + file);
        continue;
    }
    client.commands.set(data.name, data.execute);
    console.log(data);
}
//# sourceMappingURL=index.js.map