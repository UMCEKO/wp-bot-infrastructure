// import {Message} from "whatsapp-web.js"
// import {client} from "../index";
// import * as fs from "fs";
// import * as path from "path";
//
// module.exports = {
//   name: "test",
//   execute: async (message: Message, args: Array<string>)=>{
//     if (!message.hasQuotedMsg) return
//     let targetMessage = await message.getQuotedMessage()
//     let contacts = JSON.stringify(targetMessage.vCards, null, 2)
//     let contactsUnparsedArr: string[] = contacts.match(/waid=[0-9]*/g)
//     let contactsParsedArr = contactsUnparsedArr.map(value => value.replaceAll("waid=", "") + "@c.us")
//     fs.writeFileSync(path.join(__dirname, "../../group1.json"), JSON.stringify(contactsParsedArr, null, 2))
//   }
// }
//

import { Message } from "whatsapp-web.js";
import {client} from "../index";
import * as fs from "fs";
import * as path from "path";

module.exports = {
  name: "test",
  execute: async (message: Message, args: Array<string>) => {
    if (!message.hasQuotedMsg) return;

    let targetMessage = await message.getQuotedMessage();
    let contacts = JSON.stringify(targetMessage.vCards, null, 2);
    let contactsUnparsedArr: string[] = contacts.match(/waid=[0-9]*/g);
    let contactsParsedArr = contactsUnparsedArr.map(value => value.replaceAll("waid=", "") + "@c.us");

    // Dosyadan mevcut verileri oku
    let existingData: string[] = [];
    try {
      const existingDataPath = path.join(__dirname, "../../group3.json");
      if (fs.existsSync(existingDataPath)) {
        const existingDataContent = fs.readFileSync(existingDataPath, "utf-8");
        existingData = JSON.parse(existingDataContent);
      }
    } catch (error) {
      console.error("Dosya okuma hatası:", error.message);
    }

    // Yeni verileri ekle ve dosyayı güncelle
    let combinedData = [...existingData, ...contactsParsedArr];
    fs.writeFileSync(path.join(__dirname, "../../group3.json"), JSON.stringify(combinedData, null, 2));
  }
};
