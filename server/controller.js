let matches = [];
let id = 0;
let unirest = require('unirest');
let key = require('./key');

module.exports = {
    displayMatches: (req, res) => {
        res.status(200).send(matches);
    },

    getPercentage: (req, res) => {
        unirest.get(`https://love-calculator.p.mashape.com/getPercentage?fname=${req.params.fName}&sname=${req.params.sName}`)
            .header("X-Mashape-Key", key.key)
            .header("Accept", "application/json")
            .end(function (result) {
                res.status(200).send(result.body)
            });
    },

    matchMaker: (req, res) => {
        matches.push({
            fName: req.body.fName,
            sName: req.body.sName,
            percentage: req.body.percentage,
            gif: req.body.gif,
            id: id
        })
        id++;
        res.status(200).send(matches);
    },

    matchEditor: (req, res) => {
        const { fName, sName, percentage, gif } = req.body;
        const idLookUp = req.params.id;
        const indexOfMatch = matches.findIndex(match => match.id == idLookUp);
        let match = matches[indexOfMatch];

        matches[indexOfMatch] = {
            id: match.id,
            fName: fName || match.fName,
            sName: sName || match.sName,
            percentage: percentage,
            gif: gif
        };
        res.status(200).send(matches);
    },

    matchDeleter: (req, res) => {
        const idLookUp = req.params.id;
        const indexOfMatch = matches.findIndex(match => match.id == idLookUp);

        matches.splice(indexOfMatch, 1);
        res.status(200).send(matches);
    },

    deleteAll: (req, res) => {
        matches.splice(0, matches.length);
        res.status(200).send(matches);
    }
}