const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    topicId: mongoose.Schema.Types.ObjectId,
});

const commentSubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    page: String,
    pageId: mongoose.Schema.Types.ObjectId,
});

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    quoterId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    page: String,
    pageId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('subscription', subscriptionSchema);
const CommentSubscription = mongoose.model('commentSubscription', commentSubscriptionSchema);
const Notification = mongoose.model('notification', notificationSchema);

module.exports = { Subscription, CommentSubscription, Notification };
