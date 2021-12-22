//import shell from "shelljs";
import fs from "fs";
import path from 'path';
import axios from 'axios';


///Clone github repositories
/*Example*\
const repolist =
    [
        'https://gist.github.com/46a71a8ff72ffb2ebc6145caaf75b14d.git',//kamiya10/scamurl.txt
        'https://gist.github.com/e285de5ca451ec1f02c7b6bdc7e33067.git',//Anonymous-AAAA/URLs-list.txt
    ];

clone(repolist, '../folder');

/*Output*\
$Type: Array, String
\*/
/*Not supported*\
export function clone(repolist, path) {
    shell.mkdir(path);
    repolist.forEach(repo => {
        shell.cd(path);
        shell.exec(`git clone ${repo}`)
    })
}
\*Not supported*/


///Scamadviser API
/*Example*\
scamadviser(console.log, 'example.com');

/*Output*\
$Type: String
@Type: 
└>
\*/
/*Need to improve*\
export function scamadviser(method, domain) {
    var options = {
        method: 'GET',
        url: 'https://scamadviser1.p.rapidapi.com/v1/trust/single',
        params: { domain: domain, refresh: 'false' },
        headers: {
            'x-rapidapi-host': 'scamadviser1.p.rapidapi.com',
            'x-rapidapi-key': 'b994420f5fmshf9c13d2ab8b5221p176cefjsn2a535902b0d3'
        }
    };
    axios.request(options).then(response => {
        method(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
\*Need to improve*/


///Get time (GMT+8)
/*Example*\
console.log(TWtime().full);

/*Output*\
@Type: String
└>full => Timestring with gmt timezone  EX: 2021/01/01 下午12:00:00 (GMT+8)
└>time => Timestring  EX: 2021/01/01 下午12:00:00
└>gmt => (GMT+8)
└>timeZone => Asia/Taipei
\*/
export function TWtime() {
    let dateObject_TW = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    let TimeString = `${dateObject_TW}`;
    return {
        full: TimeString + ' (GMT+8)',
        time: TimeString,
        gmt: '(GMT+8)',
        timeZone: 'Asia/Taipei'
    }
};


///Get time (GMT+0)
/*Example*\
console.log(Wtime().full);

/*Output*\
@Type: String
└>full => Timestring with gmt timezone  EX: 2021/01/01 下午12:00:00 (GMT+0)
└>time => Timestring  EX: 2021/01/01 下午12:00:00
└>gmt => (GMT+0)
└>timeZone => Europe/London
\*/
export function Wtime() {
    let dateObject_W = new Date().toLocaleString('zh-TW', { timeZone: 'Europe/London' });
    let WTimeString = `${dateObject_W}`;
    return {
        full: WTimeString + ' (GMT+0)',
        time: WTimeString,
        gmt: '(GMT+0)',
        timeZone: 'Europe/London'
    }
};


///Get random number
/*Example*\
console.log(getRandom(2));

/*Output*\
$Type: Number
@Type: Number
└>Random number from 0 to (x-1)
\*/
export function getRandom(x) {
    return Math.floor(Math.random() * x);
};


///Find the URL
/*Example*\
const text = 'Find me at http://www.example.com and also at http://stackoverflow.com';
console.log(isurl(text));

/*Output*\
$Type: String
@Type: Array
└>URL in the text
\*/
export function findurl(text) {
    const urlRegex = /(https?:\/\/[^\s?(),]+)/g;
    return text.match(urlRegex);
};


///Download discord images
/*Example*\
downloadDCimage('https://cdn.discordapp.com/attachments/911456540253380619/916769291033001984/1592057336885.jpg');

/*Output*\
$Type: String
@Type: Stream
└>Image stream
\*/
export async function downloadImage(url) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}


///Measure the similarity
/*Example*\
similar("abcd", "abcc", 3)

/*Output*\
$Type: String, String, Number
@Type: Number
└>The similarity of two strings
\*/
export function similar(s, t, f) {
    if (!s || !t) {
        return 0
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    f = f || 3
    var min = function (a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = ((1 - d[n][m] / l) * 100)
    return res.toFixed(f)
}

///Check if the link is scam
/*Example*\
var link = [
    'http://cliscqrd/some/path/goes/here',
    'https://bit/123',
    'https://bit.ly/123',
    'https://discord.com',
    "https://store.steampowered.com",
    "http://steam",
    'https://google.com'
];
console.log(check(link));

/*Output*\
$Type: Array
@Type: Array
└>return an array with level
└>1 for ok
└>2 for short URL
└>3 for warning
└>4 for dangerous
└>5 for unknown
\*/
export function check(links) {
    /*return an array with level
    1 for ok
    2 for short URL
    3 for warning
    4 for dangerous
    */
    var level = [];
    var reason = [];
    var hostname = [];

    const shortURL = [
        "bit.ly",
        "x.co",
        "goo.gl",
        "snurl.com",
        "esy.es",
        "ow.ly",
        "tr.im",
        "is.gd",
        "bit.do",
        "us.to",
        "chilp.it",
        "t.co",
        "tinyurl.com",
        "reurl.cc"
    ];
    const trusted = [
        "discord.com",
        "discord.gg",
        "store.steampowered.com",
        "google.com",
        "support.discord.com"
    ];
    const filter = [
        "discord",
        "free",
        "nitro",
        "discordnitro",
        "nitrodiscord",
        "freenitro",
        "nitrofree",
        "steam",
        "community",
        "steamcommunity",
        "communitysteam"
    ];

    links.forEach(url => {
        var d = new URL(url).hostname;
        hostname.push((d.indexOf(".") != -1 && !shortURL.includes(d) && !trusted.includes(d)) ? d.substring(d.indexOf("."), 0) : d)
    });

    hostname.forEach(d => {
        function warning(x) {
            var warn = false
            var value = []
            filter.forEach(ele => {
                if (similar(ele, x, 1) >= 50.0) {
                    //console.log(similar(ele, x, 1))
                    value.push(similar(ele, x, 1));
                    warn = true;
                }
            })
            return {
                warn: warn,
                value: value
            };
        }
        if (trusted.includes(d)) { //OK
            level.push(1);
            reason.push(1);
        }
        else if (shortURL.includes(d)) { //Short URL
            level.push(2);
            reason.push(2);
        }
        else if (warning(d).warn) { //Warning
            level.push(3);
            reason.push(warning(d).value);
            //Reason
        }
        /**\
        else if (API) { //Dangerous
            level.push(4);
        }
        \**/
        else { //Unknown
            level.push(5);
            reason.push(5);
        }
    });
    return {
        level: level,
        reason: reason
    };
}