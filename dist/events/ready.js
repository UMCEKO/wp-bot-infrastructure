"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
module.exports = {
    event: whatsapp_web_js_1.Events.READY,
    execute: async () => {
        console.log('Client is ready!');
    }
};
//# sourceMappingURL=ready.js.map