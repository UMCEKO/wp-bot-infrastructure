import {Client, LocalAuth} from 'whatsapp-web.js'
import * as path from "path"
import {getAllFileAbsDirs} from "./functions/basicFn"

class CustomClient extends Client{
  commands = new Map()
}

const client = new CustomClient({
  puppeteer: {
  },
  authStrategy: new LocalAuth(),
});

client.initialize().then()

//event handler
const eventsPath = path.join(__dirname, "events")
let eventFiles = (getAllFileAbsDirs(eventsPath))
eventFiles = eventFiles.filter(file => file.endsWith(".ts") || file.endsWith(".js"))
for(let file of eventFiles){
  let {event = null, execute = null} = require(file)
  if (!event || !execute){
    console.log("Either event or execute method is missing from the event file named: " + file)
    continue
  }
  client.on(event, execute)
  console.log(event, execute)
}

//command handler
const commandsPath = path.join(__dirname, "commands")
let commandFiles = getAllFileAbsDirs(commandsPath)
commandFiles = commandFiles.filter(file => file.endsWith(".ts") || file.endsWith(".js"))

for(let file of commandFiles){
  let data: {name: string, execute:(message)=>{}} = require(file)
  if (!data.name || !data.execute){
    console.log("Either event or execute method is missing from the command file named: " + file)
    continue
  }
  client.commands.set(data.name, data.execute)
  console.log(data)
}

export {client}
