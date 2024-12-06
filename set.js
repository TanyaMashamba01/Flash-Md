const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU1xakptQmE1VkYrbzRwVDI1SWpXR25wQWhHUGZ5WHlNWGNmV3ZueG1uRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic21iU2czcEpnN1I5KzZlbjBWcEVpTVFOTlBwbktDWHBWSExpY3NZUGlTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpR0pwU0JzSnZBLzlPeXFLdU1oOHBqNDJRekY2RnQvVDBiSmlHSGFMU2tFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3VDZqaXVKamFadEN4Yy80aVRpLzhXT1V0UGZJN2l6REdvUW1ZMzlBRkM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQVUU1VHl2VTZ3RzIvalVJUzk4alZtREpYcmFwcXBkbHliRnBNb0Z4Rms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImE0aEp6Y3FxbElqZEVkNVlEYVQvNDQxeVpvNHpvdHBSSHM3Mi95c0FpUUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0JSWGZqWkQ0YmJtUEhqVE05RGVnMkw1Z0g0V3E3bHNjYk1KRU1JZ2dWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid09aOEhYTU9PNWhVVHFnMUp0MXEvZUdtU2FUTnBieGhmM3JCMG16d2VCZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFJZ203dVFhUFRwUXExWjVNSTZBMTBnUHp2Yi9qd3daUCtJY3NQL2gwR0lDNDBFMDNrNUp5OXNXS0NaQm1QRUxidDZlUzdXVmdERE1rd1JZQkpJWkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IkFGeUo1WnZ5cUlLUWFEd0l5L1ZndkVyRlA2bkZvNlFiYWhXTitRcjNLL2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjVUcDhxd09KVEltVEowLVp4cmMxM2ciLCJwaG9uZUlkIjoiMzgxN2RkN2UtMTYyNS00MjljLWJmODgtNDdmMjQ2ODIyZmMxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVGOWpvS0hwdkFablhFVFNsRDB2KzJHRHQ5Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3NjBEOHlUTksyS25lbWZmV1NsMWEzMjZKbkk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ1NBNUczMUoiLCJtZSI6eyJpZCI6IjI2Mzc3Nzc1NjE4NDo1MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJKb3NodWFtYW1ibzEgRWNvdW5CYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01lS3VlNEdFTGE0emJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNQSDgxOHR3aG5KOXE1OFNOVk1MT29hRXIvYk9BL09SYW1xSWNVaW1pZ2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNrbWxjMzd4SE5RVk0xTVFRM2tDcjhwWUZzR0FjR1NKQXRFS1h6RmhnOFFHd005WGJsdjdSTmU1R0k5bXkyWG5ycEtUbExtZEhIWGk4L0JsNU9taUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3dzQvbms5bDRqYWFEWU45K2xRcXBFK3B3ZWNUeG1OTS9pb2Vwa0F1eUVXb1FVeldIU2pXRkNTaW4zWnlScEMvSDBlWitBUlZBcG84dG0ybXBiNFpEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3Nzc1NjE4NDo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiRHgvTmZMY0laeWZhdWZFalZUQ3pxR2hLLzJ6Z1B6a1dwcWlIRklwb29KIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNTE2MzU1fQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "MidKing",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263716729222",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Zimbabwe',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
