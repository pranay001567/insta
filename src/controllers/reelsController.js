const { uploadToWordPress } = require('../services/wordpressService');
const { uploadToInstagram, checkMediaStatus, publishToInstagram } = require('../services/instagramService');
const Reel = require('../models/Reel');

async function uploadReel(req, res) {
    const filePath = req.file.path;
    const wordpressUrl = await uploadToWordPress(filePath);
    
    if (wordpressUrl) {
        const newReel = new Reel({ video_url: wordpressUrl });
        await newReel.save();
        res.json({ success: true, file_url: wordpressUrl });
    } else {
        res.status(500).json({ error: 'Failed to upload to WordPress' });
    }
}

async function scheduleReels(req, res) {
    const { caption, reels } = req.body;

    for (const reel of reels) {
        const mediaId = await uploadToInstagram(reel.video_url, caption);
        if (await checkMediaStatus(mediaId)) {
            await publishToInstagram(mediaId);
        }
    }

    res.json({ success: 'Reels scheduled successfully!' });
}

module.exports = { uploadReel, scheduleReels };

