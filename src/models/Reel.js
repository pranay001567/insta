const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
    video_url: String,
    caption: String,
    scheduled_time: Date,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Reel', reelSchema);

