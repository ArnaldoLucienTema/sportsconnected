const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES = require("../constants/values.js").footballUserTypes;

/**
 *
 * Admitting that only football users can receive recommendation now.
 *
 * */

const FootballRecommendationSchema = new Schema({
  _id: String,
  user_type: { type: String, enum: USER_TYPES },
  author: {
    author_type: String,
    name: String,
    relationship: String,
    id: String, // There's no Schema reference because it can be any type of user
    avatar: String,
    team: {
      id: { type: Schema.Types.ObjectId, ref: "football_team" },
      acronym: String,
      avatar: String,
      name: String
    }
  },
  text: String
});

module.exports = mongoose.model(
  "football_recommendation",
  FootballRecommendationSchema
);
