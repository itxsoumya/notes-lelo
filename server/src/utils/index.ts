import axios from "axios";

import FormData from 'form-data'

export const uploadToFileServerAndReturnBackUrl = async (fileStringInBase64: string, title: string) => {

    const token = process.env.DISCORD_TOKEN;


    const channelId = process.env.DISCORD_CHANNEL_ID;

    const filename = title.trim() + '.pdf';
    const fileBuffer = Buffer.from(fileStringInBase64, 'base64url');
    const formData = new FormData();
    formData.append('file', fileBuffer, {
        filename: filename,
    });

    try {

        const res = await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                'Authorization': `Bot ${token}`,
            },
        });

        const fileLink = res.data.attachments[0].url
        return fileLink;
    } catch (err) {
        console.log(err);
        throw new Error('some error whiling sending file to store server')
    }

}