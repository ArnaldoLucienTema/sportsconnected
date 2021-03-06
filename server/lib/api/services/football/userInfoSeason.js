"use strict";

const UserInfoSeason = require("./../../../models/football_user_info_season");

exports.addMedia = function(id, media, cb) {
  let update = {
    $addToSet: {
      media: media
    }
  };
  UserInfoSeason.findOneAndUpdate(
    { _id: id },
    update,
    { setDefaultsOnInsert: true },
    cb
  );
};

exports.createNew = function(user_info_id, season_id, personal_info, team, cb) {
  const user_info_season = {
    user_info_id: user_info_id,
    season_id: season_id,
    personal_info: personal_info,
    team: team
  };

  UserInfoSeason.create({ user_info_season }, cb);
};

exports.addCompetitionToUserInfo = function(id, competition_season, cb) {
  let query = {
    _id: id,
    "stats.id": { $ne: competition_season._id }
  };

  let update = {
    $addToSet: {
      stats: {
        id: competition_season._id,
        competition_id: competition_season.competition_id,
        season_id: competition_season.season_id,
        name: competition_season.name,
        avatar: competition_season.avatar
      }
    }
  };

  UserInfoSeason.findOneAndUpdate(
    query,
    update,
    { setDefaultsOnInsert: true },
    cb
  );
};

exports.updateUserInfoSeason = async (id, personal_info, team) => {
  const update = {};

  if (team) update.team = team;
  if (personal_info) update.personal_info = personal_info;

  return await UserInfoSeason.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { setDefaultsOnInsert: true }
  );
};

exports.getMatchUserInfosByZeroZeroId = function(
  season_id,
  homeTeam,
  awayTeam,
  cb
) {
  let query = [
    {
      $facet: {
        home_team: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: homeTeam.main_lineup }
            }
          }
        ],
        home_team_reserves: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: homeTeam.reserves }
            }
          }
        ],
        home_team_staff: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: homeTeam.staff }
            }
          }
        ],
        away_team: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: awayTeam.main_lineup }
            }
          }
        ],
        away_team_reserves: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: awayTeam.reserves }
            }
          }
        ],
        away_team_staff: [
          {
            $match: {
              season_id: season_id,
              "external_ids.zerozero": { $in: awayTeam.staff }
            }
          }
        ]
      }
    }
  ];

  UserInfoSeason.aggregate(query, cb);
};

exports.updateByZeroZeroId = function(
  zerozero_id,
  season_id,
  user_info_season,
  cb
) {
  const query = {
    "external_ids.zerozero": zerozero_id,
    season_id: season_id
  };

  UserInfoSeason.findOneAndUpdate(
    query,
    user_info_season,
    { upsert: true, new: true, setDefaultsOnInsert: true },
    cb
  );
};

exports.updateUserInfosStats = function(match, nestedMatch, cb) {
  const home_goals = match.home_team.goals.length;
  const away_goals = match.away_team.goals.length;

  let operations = [];

  match.home_team.main_lineup.forEach(function(player) {
    operations.push({
      updateOne: {
        filter: {
          _id: player.id,
          "stats.id": match.competition_season.id,
          "matches.id": { $ne: match._id }
        },
        update: {
          $inc: {
            "stats.$.goals": player.goals.length,
            "stats.$.assists": player.assists.length,
            "stats.$.minutes_played": player.minutes_played,
            "stats.$.games": 1,
            "stats.$.wins": home_goals > away_goals ? 1 : 0,
            "stats.$.draws": home_goals === away_goals ? 1 : 0,
            "stats.$.losses": home_goals < away_goals ? 1 : 0,
            "stats.$.yellow_cards": player.yellow_cards.length,
            "stats.$.red_cards": player.red_cards.length
          },
          $push: {
            matches: nestedMatch
          }
        }
      }
    });
  });

  match.away_team.main_lineup.forEach(function(player) {
    operations.push({
      updateOne: {
        filter: {
          _id: player.id,
          "stats.id": match.competition_season.id,
          "matches.id": { $ne: match._id }
        },
        update: {
          $inc: {
            "stats.$.goals": player.goals.length,
            "stats.$.assists": player.assists.length,
            "stats.$.minutes_played": player.minutes_played,
            "stats.$.games": 1,
            "stats.$.wins": home_goals < away_goals ? 1 : 0,
            "stats.$.draws": home_goals === away_goals ? 1 : 0,
            "stats.$.losses": home_goals > away_goals ? 1 : 0,
            "stats.$.yellow_cards": player.yellow_cards.length,
            "stats.$.red_cards": player.red_cards.length
          },
          $push: {
            matches: nestedMatch
          }
        }
      }
    });
  });

  match.home_team.reserves.forEach(function(player) {
    operations.push({
      updateOne: {
        filter: {
          _id: player.id,
          "stats.id": match.competition_season.id,
          "matches.id": { $ne: match._id }
        },
        update: {
          $inc: {
            "stats.$.goals": player.goals.length,
            "stats.$.assists": player.assists.length,
            "stats.$.minutes_played": player.minutes_played,
            "stats.$.games": 1,
            "stats.$.wins": home_goals > away_goals ? 1 : 0,
            "stats.$.draws": home_goals === away_goals ? 1 : 0,
            "stats.$.losses": home_goals < away_goals ? 1 : 0,
            "stats.$.yellow_cards": player.yellow_cards.length,
            "stats.$.red_cards": player.red_cards.length
          },
          $push: {
            matches: nestedMatch
          }
        }
      }
    });
  });

  match.away_team.reserves.forEach(function(player) {
    operations.push({
      updateOne: {
        filter: {
          _id: player.id,
          "stats.id": match.competition_season.id,
          "matches.id": { $ne: match._id }
        },
        update: {
          $inc: {
            "stats.$.goals": player.goals.length,
            "stats.$.assists": player.assists.length,
            "stats.$.minutes_played": player.minutes_played,
            "stats.$.games": 1,
            "stats.$.wins": home_goals < away_goals ? 1 : 0,
            "stats.$.draws": home_goals === away_goals ? 1 : 0,
            "stats.$.losses": home_goals > away_goals ? 1 : 0,
            "stats.$.yellow_cards": player.yellow_cards.length,
            "stats.$.red_cards": player.red_cards.length
          },
          $push: {
            matches: nestedMatch
          }
        }
      }
    });
  });

  UserInfoSeason.bulkWrite(operations, {}, cb);
};

exports.getByTeamSeasonId = function(id, cb) {
  const query = {
    "team.id": id
  };

  UserInfoSeason.find(query, cb);
};
