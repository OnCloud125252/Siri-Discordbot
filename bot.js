const login_info = 'Terminal' //可修改  (Heroku/Terminal)
const version = '1.0.0' //可修改  (版本)

import * as func from './function.js'
import { key } from './auth.js';
import { Client, MessageEmbed } from 'discord.js';
import * as prefix from './prefix.js';
import request from 'request';
import cheerio from 'cheerio';
import prettyMS from 'pretty-ms';
import fs from 'fs';
const client = new Client();

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
    console.log(`User name :        ${client.user.tag}!`);
    console.log(`Login platform :   ${login_info}`);
    console.log(`Time :             ${func.TWtime()}`);
    console.log(`Version :          V ${version}`);
    console.log();
    console.log("---------------------- Log ----------------------");
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
                        const emb_ping = new MessageEmbed()
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
            }
        };


        ///Say
        if (msg.content.startsWith(prefix.say)) {
            msg.delete();
            var response = msg.content.substring(prefix.say.length);
            msg.channel.send(response);
        }


        ///Detect Scam URLs
        if (msg.content.includes("http")) {
            var link = func.findurl(msg.content);
            if (link) {msg.channel.send(func.check(link));}
        }

    } catch (error) {
        console.log('OnMessageError', error);
    }
})