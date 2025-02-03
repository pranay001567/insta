const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadToWordPress(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('file', fileStream);

    try {
        const response = await axios.post(
            process.env.WORDPRESS_URL,
            form,
            {
                auth: {
                    username: process.env.WORDPRESS_USERNAME,
                    password: process.env.WORDPRESS_APP_PASSWORD
                },
                headers: form.getHeaders()
            }
        );
        return response.data.source_url;
    } catch (error) {
        console.error('WordPress Upload Error:', error.response.data);
        return null;
    }
}

module.exports = { uploadToWordPress };
