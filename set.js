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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5ZeFBBMTBOdnFmLzgzWGRBWUdoMVJxSG1nV1g0bFN4aDFJanp3eTNYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHM2bHd4ZDBiTXV5RlkwYjdNcjdyanBkd3ByT3hmSzd6dmxWV00xV254MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1THlTUnhvZFFiUEJvbllHVmZVWElaZUNNNGFQVDJmc3FRRFRiK3duWDJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1cTIvOWRxVWpOemJEMUxhQStWNkZPR21TMFFqM0d2M3ZCOFBNMGJiY21FPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPTkZMMWRxTW1BVGE4Q0dPTkVVaGltUUt1MWhBSk14YWtMZlk4aXgyMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBLeW1LMHJ4c3FxUC94a282aDdUZlBQNVp0bzdQajZTamZTVktjRnE3Rlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NJZmEzNllkMUZRMWswOTViUkJPU0FZazh3YzE0YWxpMTljT0xwTiswRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlBFWmdZc05NNzM1Y3ViT0h2VXY4Nm9DL0lDT3FWVEYxMjBnSHhKSStTWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRFUjNwaVZ4dytTSG1YTkdKaHJQdGQ0L1h5c3hFOW1VTllsVWlCV0dWK0xLOXV3eTRkaHhtWW8vU3dRV21hL2xmVjRzY3BhNi96VTFNdGxxSmw1ekF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEzLCJhZHZTZWNyZXRLZXkiOiI2b3p3Sjhrc21xdjQ2S0tTWjBnMzY2WmMxSDlIOEZiS3ZMdGRPTmtzQ2FVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItODNLMmNBa1NNZXF2UnFSV3hDUGRRIiwicGhvbmVJZCI6IjU1NjZjNjUyLTVmMjgtNDZhZS05MTIwLTQ4MGVkMTVmNTE0NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaZWpFVUxUZzlSU3htckRXdE9uV1RYQ1NRU1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY2UydzBTVmxEL1M3eC9yaStVNFRZdHZOb00wPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1EQThOSlZKIiwibWUiOnsiaWQiOiIyNjM3Nzc3NTYxODQ6NTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNZUt1ZTRHRU8za2g3c0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzUEg4MTh0d2huSjlxNThTTlZNTE9vYUVyL2JPQS9PUmFtcUljVWltaWdrPSIsImFjY291bnRTaWduYXR1cmUiOiJMakp2QXVycElFaWZWUGkxSFBnWmc1djkrb0gwOUpHL29hSzlwU3p1dXo2YkdsTlI5SW1vTFdlTzJGdzFpNTdVQjZ2encvTU0xb2NESTJFZGdIZDdCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSW1CTy9odGZSRjRiMU1ZOTZoOSt1VE9LVENEUHBSRmIwOWxsdUNpQXV2bzVaOWpxNUdkdHBHb1JGTTBkblVaUjU1M1NSU0dwL2gzbkRyNTdWczBFQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6NTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkR4L05mTGNJWnlmYXVmRWpWVEN6cUdoSy8yemdQemtXcHFpSEZJcG9vSiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDQ3MjMxNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCcTAifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "MidKing",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263777756184",
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
