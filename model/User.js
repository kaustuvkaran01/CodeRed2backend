const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  contactNum: {
    type: Number,
    required: true,
  },
  //   amenityRated: {
  //     type: [ObjectId],
  //     ref: "Amenity",
  //   },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
