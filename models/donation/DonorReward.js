const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonorRewardSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    icon_mouse_over_text: {
        type: String,
        default: ''
    },
    avatar_mouse_over_text: {
        type: String,
        default: ''
    },
    custom_icon: {
        type: String,
        default: ''
    },
    second_avatar: {
        type: String,
        default: ''
    },
    custom_icon_link: {
        type: String,
        default: ''
    },
    profile_info_1: {
        type: String,
        required: true
    },
    profile_info_2: {
        type: String,
        required: true
    },
    profile_info_3: {
        type: String,
        required: true
    },
    profile_info_4: {
        type: String,
        required: true
    },
    profile_info_title_1: {
        type: String,
        required: true
    },
    profile_info_title_2: {
        type: String,
        required: true
    },
    profile_info_title_3: {
        type: String,
        required: true
    },
    profile_info_title_4: {
        type: String,
        required: true
    }
});

module.exports = DonorReward = mongoose.model('DonorReward', DonorRewardSchema);
