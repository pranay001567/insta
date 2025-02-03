const axios = require('axios');

async function uploadToInstagram(videoUrl, caption) {
    const response = await axios.post(
        `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media`,
        {
            media_type: 'REELS',
            video_url: videoUrl,
            caption: caption,
            access_token: process.env.INSTAGRAM_ACCESS_TOKEN
        }
    );
    return response.data.id;
}

async function checkMediaStatus(mediaId) {
    const response = await axios.get(
        `https://graph.facebook.com/v19.0/${mediaId}?fields=status_code&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );
    return response.data.status_code === 'FINISHED';
}

async function publishToInstagram(mediaId) {
    const response = await axios.post(
        `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media_publish`,
        {
            creation_id: mediaId,
            access_token: process.env.INSTAGRAM_ACCESS_TOKEN
        }
    );
    return response.data.id;
}

module.exports = { uploadToInstagram, checkMediaStatus, publishToInstagram };

