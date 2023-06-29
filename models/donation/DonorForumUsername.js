const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonorForumUsernameSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    prefix: {
        type: String,
        default: ''
    },
    suffix: {
        type: String,
        default: ''
    },
    use_comma: {
        type: Boolean,
        default: true
    }
});

module.exports = DonorForumUsername = mongoose.model('DonorForumUsername', DonorForumUsernameSchema);
