const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContestLeaderboardSchema = new Schema({
    contest_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    flac_count: {
        type: Number,
        required: true
    },
    last_torrent_id: {
        type: Number,
        required: true
    },
    last_torrent_name: {
        type: String,
        required: true
    },
    artist_list: {
        type: String,
        required: true
    },
    artist_names: {
        type: String,
        required: true
    },
    last_upload: {
        type: Date,
        required: true
    }
});

ContestLeaderboardSchema.index({ flac_count: 1, last_upload: 1, user_id: 1 });

module.exports = ContestLeaderboard = mongoose.model('ContestLeaderboard', ContestLeaderboardSchema);
