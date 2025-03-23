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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVBuSTF6WEI1RjBiUlV2aGRIUmQwRXpnSHhyRXlYMmNQalREN3JuZ21sYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUZPUFowQzNlZjZOUHI5azBIdW5LSk9wc0FVSnhUTnFSN0dyQmFyRlZWMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TFFwU2NERVVyUTZHTldrMjZkV2ttcERXVUZSZmxhOHJEaXI2aUJhOTJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjdGIzOEF4bDJOb2taRWsxeFRoczg5YXdjRzdEU2lXSjliMGRuVlkwckJzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlLclRIR1BEaTk4UXlWclRpVG1INlI0RTErRys0bnd0WHZnaW9IQ0lkazA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpXL3RUUzE4T0hENUw1VzFKa2V5TWovWVBUUXNIeUxXYmpGem82NGNKRlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUtSMHliQ05BUUN0MW1Tekk3Rk9aQS9Zb2laL0pWSG9VVk8yRmtZbnhrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXRYM3lPNGpoT25veXdodS9xZS9xZm9KNVpTamhjZUJXZGVLN2pwSUczOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFSZXIxOEw3VTg2MGRmdTM5VXFoOVRxcUFtSVFLUkpFVTFTeitBZy9QaDRUelN3dHEwZG10SFhWU1NGYnRGRS9XV0NQbzVRV1VEMVNqNEx0dXlHSWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkwLCJhZHZTZWNyZXRLZXkiOiI2bW5mNnZja3AzVHh2dXQzVVdwWE9lTTZ3SXpTaEtJWnlnNkwyNEVwdUprPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZejNobGUxRFFLU3UyU2pqMVE2ZXJRIiwicGhvbmVJZCI6ImYwYWQzOThlLWNjMDQtNDZiZS05OWU1LTFhZjEwZDViOGViNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTkVUYlpkalIrUmZvalNodk9UWEZnV00xVlU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXgrZitvRkFra244RS9xY0pXenNBUFlLdncwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVaWlkzOEQyIiwibWUiOnsiaWQiOiIyNjM3MTY3MjkyMjI6MjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05hU2grMEJFUExQckw0R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5uc0hNbDIvbnpWd0h0bE1sYTN4d1ZPR2ZKVEV6UEovbVBDQlp0WGN6Q2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1oY2pnQW5CZkJpalA3UUMzSkN6V1FGZEFzZnBzN1QrL1RLVUFEOWhlK3AzSFZ1UytuOEJJRzFCbFAzYjV2RnIyRXZUWjdkN29HVktJaVlPRjBpY0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6ZUpxTWFkNHZhZXMraExZSG82eGVFUkV0b0hSMWp0SVpUcWsvcjA0MWVxc282US83SDh6NUVwbGVPV0lyWDJCOUhybjhBMG1jVVpjVEdkSTgrVkFodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNjcyOTIyMjoyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUWjdCekpkdjU4MWNCN1pUSld0OGNGVGhueVV4TXp5ZjVqd2dXYlYzTXdvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMzY3Mjk1fQ==,
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
