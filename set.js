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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0s1cDlHeXlxM0ExVUNKelZIMkRoVlM3S25Ba2pMQ2o2UnFmd04xVUlXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERuQ2tDSnRmaHFlb2lpUzdNSGxNcHdIdm5SeDNNTk9pMCtjdURzbjFIQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Q2xPSVNCSytvOUtvSWRHWDN4MlZnTkN0WHcyY3VzVVJmbCtLZytqYmtrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQM25LV211VzRjMStVeHQ1T09oV1gydG40WWY2bndzVVM0cXlWNWRPdHpFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9IVGVEM1dLMXJpTlcwL0QxNnIwclU4Mkphc2Q5amtyR3dINE1pZEk0RXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZKSlRBaWl2b3RGMlZtRHFJTHdWKzFEZ3dEMlJZanBVYWtYZzNoUFhyeE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU09ReC9scS9kcytYeDJaNEFyRHRzcDVMMThJQjlRTk02anhOWGt6YXMzYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVgxbDdVbFZ5THgyZzhhWjhzS1lQakxlK1UvOG9MTDZEVnZJanlUVjNUND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtNVTA4ckZYOWc5eVNQSXpPZnhveFpvY05MTTJ5TnFTUnVzaU5td2ZLZ2FVUkNPZ2hOOUlYQkFDWjdkQ3JxWktDKytFZFJLQmUycm9uTlh1YW1CL0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6IjFnSWJGTlFOaFpRUmxxWlhCcnJVMUpsN0VGZVJ4QXZPeHFkcG45L3A0MVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlRnVHZrV19DUW5ldzBWRzFmWGQ4VVEiLCJwaG9uZUlkIjoiZGY5ZWM2MGItYWY5ZS00YzFhLWI5OTQtOGY3ZmFhZTBmOWRkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh3VXZPMUVXZzlTWmsxZndySEFNVS95WnZVcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzVTJRQ2tlaitDMDBXNnd2MVNQZ1d5UFJPWlE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNDRQV1M1OFoiLCJtZSI6eyJpZCI6IjI2Mzc3Nzc1NjE4NDoyMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJKb3NodWFtYW1ibzEgRWNvdW5CYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04yS3VlNEdFTjdLc2I4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNQSDgxOHR3aG5KOXE1OFNOVk1MT29hRXIvYk9BL09SYW1xSWNVaW1pZ2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikd1SXBUWnYvY3BQUUQrRFNxTjY0VTVPWXNMMjNqOElCYjFXdGphMnJCcGVRUkY1ejVDUDNyelVYUkhkdW5wUjVVNmlMTjl2SGZZbC9wQUtzYi9TV0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCeTJvM2tLdzhmMzU0L011WFlKTUpXd0Vnc2pMZEFaQWh4L0dwVm9qUmNEdHFqblRJNDVqU0pnOXVwdHJSd1JjajdNbmliNlEwZFNNNHhKRFNlNnhCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3Nzc1NjE4NDoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiRHgvTmZMY0laeWZhdWZFalZUQ3pxR2hLLzJ6Z1B6a1dwcWlIRklwb29KIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzNTQ1NzA3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURtTiJ9,
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
