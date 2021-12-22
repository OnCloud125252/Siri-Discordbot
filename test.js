const login_info = 'Terminal' //可修改  (Heroku/Terminal)
const version = 'Beta 1.0.0' //可修改  (版本)
const codever = 0

import * as func from './function.js'
import * as prefix from './prefix.js';
import Discord from 'discord.js-12';
import prettyMS from 'pretty-ms';
import paginationEmbed from 'discord.js-pagination';
/*
import request from 'request';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
*/
import key from './auth.js'
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
    //import key from './auth.js'
    client.login(key);
}
else if (login_info === 'Heroku') {
    client.login(process.env.DJS_TOKEN);
};
client.on('ready', () => {
    console.log("\n");
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log("::                                ::");
    console.log("::   THIS IS THE BETA VERSION !   ::");
    console.log("::                                ::");
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log("\n");
    console.log(`User name :        ${client.user.tag}!`);
    console.log(`Login platform :   ${login_info}`);
    console.log(`Time :             ${func.TWtime()}`);
    console.log(`Version :          V ${version}`);
    console.log();
    console.log(`Codever = ${codever}`);
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
        if (msg.content.startsWith(prefix.test)) {
            const cmd = msg.content.substring(prefix.test.length).split(' ');
            switch (cmd[0]) {
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
                            .addFields({ name: `Uptime :`, value: `\`${prettyMS(client.uptime)}\`\nSince \`${func.TWtime()}\`` })
                            .setFooter(`V ${version}`)
                            .setTimestamp();
                        resultMessage.channel.send(emb_botinfo);
                    }).then(deleteMessage => resultMessage.delete());
                    break;


                case 'testemb':

                    break;


                case 'test':
                    msg.channel.send('QwQ')
                    const page1 = new Discord.MessageEmbed()
                        .setColor('#ADD8E6')
                        .setTitle(`embed title 1`)
                        .setDescription(`Discription`)
                        .addFields(
                            { name: `Title`, value: `text here`, inline: true },
                        )

                    const page2 = new Discord.MessageEmbed()
                        .setColor('#ADD8E6')
                        .setTitle(`embed title 2`)
                        .setDescription(`Discription`)
                        .addFields(
                            { name: `Title`, value: `text here`, inline: true },
                        )

                    const page3 = new Discord.MessageEmbed()
                        .setColor('#ADD8E6')
                        .setTitle(`embed title 3`)
                        .setDescription(`Discription`)
                        .addFields(
                            { name: `Title`, value: `text here`, inline: true },
                        )


                    var pages = [
                        page1,
                        page2,
                        page3
                    ]

                    msg.channel.send(paginationEmbed(msg, pages))
                    break;


                case 'help':
                case 'h':

                    break;

                default:

                    break;

            }
        };


        ///Say
        if (msg.content.startsWith(prefix.say)) {
            msg.delete();
            var response = msg.content.substring(prefix.say.length);
            msg.channel.send(response);
        }


        ///Detect Scam URLs (Alpha)
        if (msg.content.includes("http")) {
            var link = func.findurl(msg.content);
            if (link) {
                msg.channel.send(func.check(link).level);
                msg.channel.send(func.check(link).reason);
            }
        }

    } catch (error) {
        console.log('OnMessageError', error);
    }
})
