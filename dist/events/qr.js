"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
module.exports = {
    event: whatsapp_web_js_1.Events.QR_RECEIVED,
    execute: async (qr) => {
        qrcode.generate(qr, { small: true }, null);
    }
};
//# sourceMappingURL=qr.js.map