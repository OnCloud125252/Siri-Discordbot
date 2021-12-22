const login_info = 'Heroku' //可修改  (Heroku/Terminal)
const version = '1.0.0' //可修改  (版本)

import * as func from './function.js'
import * as prefix from './prefix.js';
import Discord from 'discord.js-12';
import prettyMS from 'pretty-ms';
const client = new Discord.Client();

/*
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const Discord = require('discord.js-12');
const client = new Discord.Client();
const prefix = require('./prefix.js');
const auth = require('./auth.json');
const request = require('request');
const cheerio = require('cheerio');
const prettyMS = require('pretty-ms');
const fs = require('fs');
*/

////登入資訊
if (login_info === 'Terminal') {
    client.login(key);
}
else if (login_info === 'Heroku') {
    client.login(process.env.DJS_TOKEN);
};
client.on('ready', () => {
    console.log(`User name :        ${client.user.tag}`);
    console.log(`Login platform :   ${login_info}`);
    console.log(`Time :             ${func.TWtime()}`);
    console.log(`Version :          V ${version}`);
    console.log();
    console.log("---------------------- Log ----------------------");

    setInterval(function () {
        client.user.setPresence({
            status: "online",  // online, idle, dnd, invisible
            activity: {
                name: `[!] | ${client.ws.ping}ms`,
                type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING
                url: "https://www.youtube.com/watch?v=QY7iZR2paeM"
            }
        });
    }, 1000);
});


////Start
client.on('message', async msg => {
    ////Check ////
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    };

    ////
    try {
        if (msg.content.startsWith(prefix.all)) {
            const cmd = msg.content.substring(prefix.all.length).split(' ');
            switch (cmd[0]) {
                ///Ping
                case 'ping':
                    msg.channel.send('Caculating ping . . .').then(resultMessage => {
                        const ping = resultMessage.createdTimestamp - msg.createdTimestamp
                        const emb_ping = new Discord.MessageEmbed()
                            .setColor('#4169e1')
                            .setTitle('🏓 Pong !')
                            .addFields({ name: `Bot latency :`, value: `\`${ping} ms\`` })
                            .addFields({ name: `API Latency :`, value: `\`${client.ws.ping} ms\`` })
                            .setTimestamp();
                        resultMessage.delete();
                        resultMessage.channel.send(emb_ping);
                    });
                    break;


                ///Botinfo
                case 'botinfo':
                    msg.channel.send('看到這行的人可以獲得一塊餅乾 ฅ ^• ω •^ ฅ').then(resultMessage => {
                        let networkLatency = (resultMessage.createdTimestamp - msg.createdTimestamp);
                        let apiLatency = (client.ws.ping)
                        let latency = networkLatency + apiLatency;
                        let emoji
                        let emojitext
                        switch (true) {
                            case (latency < 100):
                                emoji = ":laughing:";
                                emojitext = "Very good !";
                                break;
                            case (latency < 500):
                                emoji = ":confused:";
                                emojitext = "Uh, A bit laggy ...";
                                break;
                            case (latency < 1000):
                                emoji = ":confounded:";
                                emojitext = "It looks like we have a bad network connection ...";
                                break;
                            default:
                                emoji = ":exploding_head:";
                                emojitext = "Oh my, it looks terrible !\n***Kind reminder :***\n***Check if u are under the sea !***";
                                break;
                        }
                        msg.channel.send({
                            embed: {
                                color: '#4169e1',
                                title: 'Bot info',
                                fields: [
                                    {
                                        name: `**Login Platform :**`,
                                        value: `\`${login_info}\``,
                                        inline: false
                                    },
                                    {
                                        name: `API Latency :\u200b\u200b\u200b\u200b`,
                                        value: `\`${apiLatency} ms\``,
                                        inline: true
                                    },
                                    {
                                        name: `Network latency :`,
                                        value: `\`${networkLatency} ms\``,
                                        inline: true
                                    },
                                    {
                                        name: `Rate : ${emoji}`,
                                        value: emojitext,
                                        inline: true
                                    },
                                    {
                                        name: `Uptime :`,
                                        value: `\`${prettyMS(client.uptime)}\``,
                                        inline: true
                                    },
                                    {
                                        name: `Start time :`,
                                        value: `\`${func.TWtime().time}\`\n\`${func.TWtime().gmt}\``,
                                        inline: true
                                    },
                                    {
                                        name: `\u200b`,
                                        value: `\u200b`,
                                        inline: true
                                    }
                                ],
                                footer: {
                                    text: `V ${version}`
                                }
                            }
                        }).then(deleteMessage => {
                            resultMessage.delete();
                        }).then(sendInviteLink => {
                            msg.channel.send({
                                embed: {
                                    color: "#00FF00",
                                    title: "Invite Siri to your server!",
                                    fields: [
                                        {
                                            name: `Link below :arrow_down_small:`,
                                            value: `[ฅ ^• ω •^ ฅ](https://discord.com/api/oauth2/authorize?client_id=910897168615895050&scope=bot&permissions=8)`
                                        },
                                    ],
                                }
                            });
                        });
                    });
                    break;


                //Invite bot
                case 'invitebot':
                    msg.channel.send({
                        embed: {
                            color: "#00FF00",
                            title: "Invite Siri to your server!",
                            fields: [
                                {
                                    name: `Link below :arrow_down_small:`,
                                    value: `[ฅ ^• ω •^ ฅ](https://discord.com/api/oauth2/authorize?client_id=910897168615895050&scope=bot&permissions=8)`
                                },
                            ],
                        }
                    });
                    break;
            }
        };


        ///Say
        if (msg.content.startsWith(prefix.say)) {
            msg.delete();
            var response = msg.content.substring(prefix.say.length);
            msg.channel.send(response);
        }

    } catch (error) {
        console.log('OnMessageError', error);
    }
})
