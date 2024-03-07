const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const SelectOptions = require('../utils/constants');

const Messages = require('../utils/messages');
const {
    handleMainSelection,
    handleSendResponse,

} = require('./handlers');

require('dotenv').config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("polling_error", (msg) => console.log(msg));
let userData = {};
try {
    userData = require('../userData.json');
} catch (err) {
    console.error("Error loading user data:", err);
}
bot.on('message', (msg) => {
    const { id, username, first_name, last_name } = msg.from;
    if (!userData[id]) {
        userData[id] = {
            id: id,
            username: username,
            first_name: first_name,
            last_name: last_name
        };
        fs.writeFile('./userData.json', JSON.stringify(userData), (err) => {
            if (err) {
                console.error("Error writing user data:", err);
            } else {
                console.log("User data saved successfully.");
            }
        });
    }
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        handleStart(chatId, bot);
    }
});
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const user = query.from.username;
    const option = query.data;

    switch (option) {
        case 'Blockchain':
            handleMainSelection(chatId, bot, SelectOptions.BLOCKCHAIN_DEVELOPMENT, "Blockchain service");
            break;
        case 'MERN':
            handleMainSelection(chatId, bot, SelectOptions.MERN_OPTIONS, "MERN stack service");
            break;
        case 'Marketing':
            handleMainSelection(chatId, bot, SelectOptions.DIGITAL_MARKETING, "Digital Marketing service");
            break;
        case 'Software Development':
            handleMainSelection(chatId, bot, SelectOptions.CUSTOM_SOFTWARE_DEVELOPMENT, "Custom Software Development service");
            break;

        case 'Web Application Development':
            handleSendResponse(chatId, bot, Messages.MERN_Web_Message, "Web Application Development");
            break;
        case 'Mobile App Development':
            handleSendResponse(chatId, bot, Messages.MERN_Mobile_Message, "Mobile App Development");
            break;
        case 'API Development':
            handleSendResponse(chatId, bot, Messages.MERN_API_Message, "API Development");
            break;
        case 'UI/UX Design':
            handleSendResponse(chatId, bot, Messages.MERN_UI_UX_Message, "UI/UX Design");
            break;

        case 'DEX':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_DEX, "DEX");
            break;
        case 'Private/Public Blockchain':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_Private_Public_Blockchain, "Private/Public Blockchain");
            break;
        case 'DApps':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_DApps, "DApps");
            break;
        case 'CEX':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_CEX, "CEX");
            break;
        case 'DeFi':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_DeFi, "DeFi");
            break;
        case 'CeFi':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_CeFi, "CeFi");
            break;
        case 'Crypto Wallet':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_Crypto, "Crypto Wallet");
            break;
        case 'Bridge':
            handleSendResponse(chatId, bot, Messages.BLOCKCHAIN_DEVELOPMENT_Bridge, "Bridge");
            break;

        case 'SEO':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_SEO, "SEO");
            break;
        case 'SEM':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_SEM, "SEM");
            break;
        case 'SMM':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_SMM, "SMM");
            break;
        case 'PPC':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_PPC, "PPC");
            break;
        case 'Email Marketing':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_Email_Marketing, "Email Marketing");
            break;
        case 'Affiliate Marketing':
            handleSendResponse(chatId, bot, Messages.DIGITAL_MARKETING_Affiliate_Marketing, "Affiliate Marketing");


        // Cases for custom software development
        case 'Custom Software Development':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_Software_Development, "Software Development");
            break;
        case 'Custom Web Development':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_Custom_Web_Development, "Custom Web Development");
            break;
        case 'Ecommerce Solutions':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_Ecommerce_Solutions, "Ecommerce Solutions");
            break;
        case 'API Development':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_API_Development, "API Development");
            break;
        case 'Database Design & Optimization':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_Database_Design_Optimization, "Database Design & Optimization");
            break;
        case 'DevOps & Deployment':
            handleSendResponse(chatId, bot, Messages.CUSTOM_SOFTWARE_DEVELOPMENT_DevOps_Deployment, "DevOps & Deployment");
            break;
        default:
            break;
    }
});

function handleStart(chatId, bot) {
    bot.sendMessage(chatId, 'How can i assist you today?', {
        reply_markup: {
            inline_keyboard: SelectOptions.MAIN_OPTIONS
        }
    });
}

module.exports = {
    bot
};
