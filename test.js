var unirest = require("unirest");


var languages = ["Python", "JavaScript", "Java", "C", "C++", "PHP", "R", "Swift", "Ruby", "C#"]
var cities = ["Charlotte, NC", "San Francisco, CA", "Seattle, WA"]
let totalhits = new Map();
function callApi(lang, city) {
    var req = unirest("GET", "https://indeed-com.p.rapidapi.com/search/jobs");
    return new Promise(resolve => {
        req.query({
            "sort": "relevance",
            "location": cities[city],
            "offset": "0",
            "query": languages[lang],
            "country": "us",
            "radius": "100"
        });

        req.headers({
            "x-rapidapi-host": "indeed-com.p.rapidapi.com",
            "x-rapidapi-key": "",
            "useQueryString": true
        });


        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            console.log(res.body.totalResults)

            resolve(res.body.totalResults);

        });


    });
}
async function asyncCall() {
    for (city in cities) {
        for (lang in languages) {

            console.log('calling' + languages[lang]);
            const result = await callApi(lang, city);
            totalhits.set(languages[lang], result)
            console.log(result);
        }
        // expected output: "resolved"
        console.log(totalhits)
    }
}
asyncCall();


