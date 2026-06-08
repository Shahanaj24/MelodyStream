const {ImageKit} = require('@imagekit/nodejs');
require('dotenv').config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

    async function uploadFile(file){
        const result = await imagekit.files.upload({

            file,
            fileName:"music_"+Date.now(),
            folder:"yt-spotify/music"

        })

        return result;
    }


module.exports = { uploadFile };