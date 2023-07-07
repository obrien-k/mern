const mongoose = require("mongoose");
const { Schema } = mongoose;

const inviteSchema = new Schema({
  Inviter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  InviteKey: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Expires: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  Reason: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

inviteSchema.index({ Expires: 1 });

module.exports = Invite = mongoose.model("Invite", inviteSchema);
