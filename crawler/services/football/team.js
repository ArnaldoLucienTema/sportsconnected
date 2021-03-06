"use strict";

const TeamSeason = require("../../models/football_team_season");
const Team = require("../../models/football_team");

exports.updateByZeroZeroId = function(zerozeroId, userInfo, cb) {
  const query = { "external_ids.zerozero": zerozeroId };

  Team.findOneAndUpdate(
    query,
    userInfo,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.updateCurrentSeasons = function(seasons, cb) {
  let operations = [];

  seasons.forEach(function(season) {
    let team_season = season._doc;

    operations.push({
      updateOne: {
        filter: {
          _id: team_season.team_id
        },
        update: {
          $set: {
            current_season: team_season._id
          }
        }
      }
    });
  });

  Team.bulkWrite(operations, {}, cb);
};

exports.addMedia = function(id, media, cb) {
  /*
    * This is not yet implemented because the DB structure is not well done.
    *
    * We should have something like this "media" field in the document
    * And then add here like this
    *
    * let update = {
        $addToSet: {
            "media": {

            }
        }
    };

    But, for now, we'll not do anything, we'll just insert the media in the user's current season object.
    * */

  Team.findOne({ _id: id }, (err, userInfo) => {
    let teamSeasonId = userInfo.current_season._id;

    TeamSeason.addMedia(media, teamSeasonId, (err, teamSeason) => {
      if (err) {
        cb(err);
      }
      cb(teamSeason);
    });
  });
};
