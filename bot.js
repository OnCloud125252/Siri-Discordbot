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
                            .setDescription('\u200B')
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
                        const ping = (resultMessage.createdTimestamp - msg.createdTimestamp)
                        const emb_botinfo = new Discord.MessageEmbed()
                            .setColor('#4169e1')
                            .setTitle(`Bot info`)
                            .addFields({ name: `**Login Platform :**`, value: `\`${login_info}\`` })
                            .addFields({ name: `Bot latency :`, value: `\`${ping} ms\`` })
                            .addFields({ name: `API Latency :`, value: `\`${client.ws.ping} ms\`` })
                            .setFooter(`V ${version}\nUptime : ${prettyMS(client.uptime)}`)
                            .setTimestamp();
                        resultMessage.delete();
                        resultMessage.channel.send(emb_botinfo);
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
