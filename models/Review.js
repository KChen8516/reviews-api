const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Review Schema
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: String
  },
  movieTitle: {
    type: String,
    required: true
  },
  pros: [
    {
      _id: false,
      id: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  cons: [
    {
      _id: false,
      id: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  other: [
    {
      _id: false,
      id: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ]
});

mongoose.model("reviews", ReviewSchema);
