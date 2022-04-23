const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const amenitySchema = new mongoose.Schema({
  isStore: {
    type: Boolean,
    default: false,
  },
  isToilet: {
    type: Boolean,
    default: false,
  },
  storeName: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  location: {
    type: pointSchema,
    index: "2dsphere",
  },
  owner: {
    type: ObjectId,
    ref: "User",
  },
  averagePrice: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  hasToiletPaper: {
    type: Boolean,
    default: false,
  },
  hasWesternStyle: {
    type: Boolean,
    default: false,
  }
  hasSanitaryNapkins: {
    type: Boolean,
    default: false,
  },
  hasTampons: {
    type: Boolean,
    default: false,
  },
  hasMenstrualCups: {
    type: Boolean,
    default: false,
  },
  avgRating: {
    type: Number,
    default: -1,
  },
  usersWhoRated: {
    type: [ObjectId],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Amenity", amenitySchema);
