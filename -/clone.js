const shell = require('shelljs')
const repolist =
    [
        'https://gist.github.com/46a71a8ff72ffb2ebc6145caaf75b14d.git',//kamiya10/scamurl.txt
        'https://gist.github.com/e285de5ca451ec1f02c7b6bdc7e33067.git',//Anonymous-AAAA/URLs-list.txt
    ];


function clone(repolist, path) {
    shell.mkdir(path);
    repolist.forEach(repo => {
        shell.cd(path);
        shell.exec(`git clone ${repo}`)
    })
}





scamadviser(console.log, 'discord.com');

/*
const axios = require("axios").default;
const fs = require("fs");
var options = {
    method: 'GET',
    url: 'https://scamadviser1.p.rapidapi.com/v1/trust/single',
    params: { domain: 'scamadviser.com', refresh: 'false' },
    headers: {
        'x-rapidapi-host': 'scamadviser1.p.rapidapi.com',
        'x-rapidapi-key': 'b994420f5fmshf9c13d2ab8b5221p176cefjsn2a535902b0d3'
    }
};

axios.request(options).then(function (response) {
    fs.writeFile("./clone.json", JSON.stringify(response.data, null, 4), err => {
        if (err) {
            throw err;
        }
    });
}).catch(function (error) {
    console.error(error);
});
*/
