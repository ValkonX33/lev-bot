const { Client } = require("discord.js");
const fetch = require("node-fetch");
// const axios = require("axios");
// const Database = require("@replit/database");
const client = new Client({ intents: 14023 });
const sadWords = ["sad", "depressed", "dukh", "cry", "dard"];
const encouragements = ["Cheer up!", "You Can do it!", "YOLO", "easy dude"];

// const db = new Database();
// db.get("encouragements").then((encouragements) => {
//   if (!encouragements || encouragements.length < 1) {
//     db.set("encouragements", starterEncouragements);
//   }
// });
// function updateEncouragements(encouragingMessage) {
//   db.get("encouragements").then((encouragements) => {
//     encouragements.push([encouragingMessage]);
//     db.set("encouragements", encouragements);
//   });
// }
// function deleteEncouragements(index) {
//   db.get("encouragements").then((encouragements) => {
//     if (encouragements.length > index) {
//       encouragements.splice(index, 1);
//       db.set("encouragements", encouragements);
//     }
//   });
//}
// module.exports = class catCommand extends Commando.Command {
//   constructor(client) {
//     super(client, {
//       name: "cat",
//       group: "misc",
//       memeberName: "cat",
//       description: "random picture of cat",
//     });
//   }
//   run = async (message) => {
//     message.reply("works");
//   };
// };
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " -" + data[0]["a"];
    });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", gotMessage);

async function gotMessage(msg) {
  if (msg.author.bot) return;

  if (msg.content === "$inspire") {
    getQuote().then((quote) => msg.channel.send(quote));
  }

  if (sadWords.some((word) => msg.content.includes(word))) {
    const encouragement =
      encouragements[Math.floor(Math.random() * encouragements.length)];
    msg.reply(encouragement);
  }
  if (msg.content === "sex") {
    msg.reply("dila do");
    msg.react("🥲");
  }
  if (msg.content === "$gif") {
    let tokens = msg.content.split("");
    let keywords = "cat";
    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ");
    }
    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}& contentfilter=off`;
    let response = await fetch(url);
    let json = await response.json();
    let index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
    msg.channel.send("GIF From TENOR " + keywords);
  }


  // if (msg.content.startsWith("$new")) {
  //   encouragingMessage = msg.content.split("$new ")[1];
  //   updateEncouragements(encouragingMessage);
  //   msg.channel.send("New Encouraging message has been added.");
  // }
  // if (msg.content.startsWith("$del")) {
  //   encouragingMessage = parseInt(msg.content.split("$del ")[1]);
  //   deleteEncouragements(index);
  //   msg.channel.send(" Encouraging message has beeen deleted.");
  // }

  // if (msg.content === "cat") {
  //   await msg.reply();
  //   const { file } = await fetch("https://aws.random.cat/meow").then(
  //     (response) => response.json()
  //   );

  //   msg.reply({ files: [file] });
  //}
});
client.login("Your Token here or use an env file whatever ");
