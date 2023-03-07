const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");
const  { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, generateProfilePicture, reSize}= require('./myfunc.js');
const senderJid = '6288224135175@s.whatsapp.net';
const recipientJid = '6289519318271@s.whatsapp.net';
const contactNumber = '6289519318271';
const contactName = 'Sangrama';
let setting = require("./key.json");

module.exports = sansekai = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const isOwner = setting.ownerNumber == m.sender ? true : ["6289519318271@s.whatsapp.net"].includes(m.sender) ? true : false;
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }
        if (setting.autoAI) {
        if (budy) {
            try {
            if (setting.keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Mohon Isi Api Di config.js')
            const configuration = new Configuration({
              apiKey: setting.keyopenai, 
            });
            const openai = new OpenAIApi(configuration);
            
            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: budy,
              temperature: 0.3,
              max_tokens: 3000,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            });
            m.reply(`${response.data.choices[0].text}\n\n`)
            } catch(err) {
                console.log(err)
                m.reply('Eror 404.')
            }
        }
    }
    if (setting.autoSimi) {
    try{
let anu = await fetchJson(`https://saipulanuar.ga/api/f/simi?text=${budy}`)
reply(anu.result)
} catch (err) {
console.log(err)
m.reply('Maaf, sepertinya ada yang error')
}
}


    if (isCmd2) {
      switch (command) {
        case "help":
        case "menu":
          m.reply(`*xʏᴜɢᴀʀ ʙᴏᴛ ᴀɪ ʙᴇᴛᴀ*
            
*(Beri Bot Jeda 5-10 Detik)*
 ${prefix}img <text> (beri jeda 15dtk)
 ${prefix}openai <text>
 ${prefix}brainly <soal>
 ${prefix}creator
 ${prefix}runtime
*Contoh penggunaan bot ketik "Apa Kabar" Jika Bot Merespon tandanya Bot sedang dalam mode auto atau menjawab otomatis (openainya udh on berarti) selanjutnya tidak usah menggunakan .openai, langsung saja ke pertanyaanya.*`)
          break;
          case 'autoai':{
    if (!isOwner) return reply('Only Owner')
    if (!q) return reply(`Contoh\n${prefix+command} 1\n1 = Nyala\n0 = Mati`)
    if (q == 1){
        setting.autoAI = true
        m.reply('*AI Berhasil Diaktifkan*')
        }
    if (q == 0){
        setting.autoAI = false
        m.reply('*AI Berhasil Dimatikan*')
        }
    }
        break;
        case 'chatbot':{
    if (!isOwner) return reply('Only Owner')
    if (!q) return reply(`Contoh\n${prefix+command} 1\n1 = Nyala\n0 = Mati`)
    if (q == 1){
        setting.autoSimi = true
        m.reply('*Chatbot Berhasil Diaktifkan*')
        }
    if (q == 0){
        setting.autoSimi = false
        m.reply('*Chatbot Berhasil Dimatikan*')
        }
    }
    break;
    case 'brainly':{
  
					if (args.length < 1) return m.reply('Pertanyaan apa')
		  let brainly = require("brainly-scraper")

let res = await brainly(text)
let answer = res.data.map((v, i) => `_*PERTANYAAN KE ${i + 1}*_\n${v.pertanyaan}\n${v.jawaban.map((v,i) => `*JAWABAN KE ${i + 1}*\n${v.text}`).join('\n')}`).join('\n\n•------------•\n\n')
m.reply(answer)
}
        break;
        case 'runtime' : {
 m.reply(` BOT AKTIF SELAMA : ${runtime(process.uptime())} `)}
 break;
            case "ai": case "openai": 
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: text,
              temperature: 0, // Higher values means the model will take more risks.
              max_tokens: 2048, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
              top_p: 1, // alternative to sampling with temperature, called nucleus sampling
              frequency_penalty: 0.3, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
              presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });
            m.reply(`${response.data.choices[0].text}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
          break;
        case "img": case "ai-img": case "image": case "images":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            client.sendImage(from, response.data.data[0].url, text, mek);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
          break;
          case "creator":
          m.reply("wa.me/6289519318271\nWebsite : https://sangrama.github.io")
    break;
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
