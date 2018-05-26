const zerozero = require('../crawler');
const logger = require('../../../logging');
const baseUris = require('../base_uris');
var format = require("string-template");
const footballTeam = require('../../../models/football_team');

const processTeamInfo = function (err, res, done){
    const acronym = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    const avatar = res.$("#page_header .logo img").attr("src") ?
        'https://www.zerozero.pt/' + res.$("#page_header .logo img").attr("src") :
        '';

    const name = res.$("#page_header .factsheet .name").html() ?
        res.$("#page_header .factsheet .name").html():
        '';

    const fullName = res.$("#entity_bio .bio")[0] ?
        res.$("#entity_bio .bio")[0].children[1].data:
        '';

    const team = new footballTeam({
        acronym: acronym,
        avatar: avatar,
        name: name,
        full_name: fullName,
        external_ids: {
            zerozero: res.options.zerozeroId,
        }
    });

    team.save(function (err, team) {
        if (err) {
            logger.error(err);
            done();
        }
        else {
            zerozero.queue({
                uri:format(baseUris.TEAM_MATCHES, { id_team: team.external_ids.zerozero }),
                callback: getAllTeamGames,
                team: team
            });
            done();
        }
    });
}

const getAllTeamGames = function (err, res, done){
    console.log(res.$("#team_games table tr").length);
}

module.exports = {
    processTeamInfo: processTeamInfo,
    getAllTeamGames: getAllTeamGames
}