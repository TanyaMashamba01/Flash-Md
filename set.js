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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZCVWMrOStCRHZlSFBycFdsOS9UalRMVTMrOWFRUmVqVTRaTUU0QjFGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0d5N0JVRzBGbVdrU3hyNC9JNHlQL1NnR3RHaGpaSkltMUhwWEpUeXZYST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTGdkY3Z0RGt5cGI4V1dvV0E1b29CZ0hxMVZQRkJxWURmVDBRTjZEcEZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWQjlyUHlYOTZ0b0hzR25OdXZVN29TUm5Zc1Buc1JNcnFNYlJlVWRMdVI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBOdFpBUmZMTEVuVUFsUWZVQWVZYWlEbjFqRStodEtMd2IzNHlDMmFWVTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA1Y2RXTjVlZldaVlFPanN0dTJFMzA1eUJlRFpuOWZqQ3Nzdkc1d09zZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUhvcVZKcHZzWFQ0d3J3RkxMcHZWdjdPUlRPalBlQUloNDhhSVRnTnJuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnUyNUZkQnBYUnFZUTl5aGgyajMyQmxBSnkzSnd5bFBld1d0OEcrb1FTND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJnM29IYUJYMUY0TUpRUnpkYk1ObGorck14TWEwcnhKTUpZZzE4ZDAwL2I0V2FKUzRNQldybEtBQmM3LzEwWHRrRnhBT1JxOU04QzFxR0pRUi9pMkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5Ijoick5FVVZKTEZHanFqMVZ4NnJlZU1KaGZCSTl3M2FIbVZ1VlR4WURKTmFsVT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiU0hmMzBOamdTVG05WjZsbE1LX3p6QSIsInBob25lSWQiOiJlMGM4OGMwYy0yMTNlLTRjZWYtOWZkYi02MzJmZWZiMDQzYzkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUsyZ0hObHVzQ21RSDVJMFVwY25yaHIyMTg0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im16eHhPanM1aUhXVFdXMjU4d3R1TWorNUNvYz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI5M0VIWkFaRCIsIm1lIjp7ImlkIjoiMjYzNzc3NzU2MTg0OjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm9zaHVhbWFtYm8xIEVjb3VuQmFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOaUt1ZTRHRU5LYmhMOEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzUEg4MTh0d2huSjlxNThTTlZNTE9vYUVyL2JPQS9PUmFtcUljVWltaWdrPSIsImFjY291bnRTaWduYXR1cmUiOiJHVGU5K0srV1V6MmhZb3kwUlVCaXdIb1hRUUcyUzl4WmpWVThEM3RYeXhuM2pLNDBYM1o4clo1RlRUUDBNY29EVytWY2tuUnhnZWNrZU1FZ0s4NmZCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWWc5R3F6ZkR5T3EzUmpWelNqaGdFVFdBYTFjR0ppTkE4M3NIRnVqdXN1cjFKbVQxL1BYeU5wcjRjY3VHWFNzYWtFZWRGcU9CQnVVN2d5SnM5WTZMQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3Nzc3NTYxODQ6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiRHgvTmZMY0laeWZhdWZFalZUQ3pxR2hLLzJ6Z1B6a1dwcWlIRklwb29KIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyODAyMzk5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZmZiJ9,
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "MidKing01",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263777756184",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://b.top4top.io/p_3291qwfqu0.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Gweru',
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
