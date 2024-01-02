import {Message} from "whatsapp-web.js"
import {client} from "../index";

module.exports = {
  name: "test",
  execute: async (message: Message, args: Array<string>)=>{
    console.log(args)
    console.log(...args)
    await message.reply(args.join(" "))
    client.sendMessage("905347140999@c.us","Selam")
  }
}