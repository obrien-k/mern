const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topicId: mongoose.Schema.Types.ObjectId,
});

const commentSubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    page: String,
    pageId: mongoose.Schema.Types.ObjectId,
});

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quoterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    page: String,
    pageId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
const CommentSubscription = mongoose.model('CommentSubscription', commentSubscriptionSchema);
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Subscription, CommentSubscription, Notification };
