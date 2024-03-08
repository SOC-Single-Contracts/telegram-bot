const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const SelectOptions = require('../utils/constants');

const Messages = require('../utils/messages');
const {
    handleMainSelection,
    handleSendResponse,
    handleInvite

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
    const option = query.data;

    switch (option) {
        case 'smart_contracts':
            handleSendResponse(chatId, bot, Messages.SMART_CONTRACTS_DEVELOPMENT, "Smart Contracts Development");
            break;
        case 'Web5 - Smart Contracts Development':
            handleInvite(chatId, bot, "Web5 - Smart Contracts Development");
            break;
        case 'custom_blockchain':
            handleSendResponse(chatId, bot, Messages.CUSTOM_BLOCKCHAIN_DEVELOPMENT, "Custom Blockchain Development");
            break;
        case 'Web5 - Custom Blockchain Development':
            handleInvite(chatId, bot, "Web5 - Custom Blockchain Development");
            break;
        case 'crypto_wallet':
            handleSendResponse(chatId, bot, Messages.CRYPTO_WALLET_DEVELOPMENT, "Crypto Wallet Development");
            break;
        case 'Web5 - Crypto Wallet Development':
            handleInvite(chatId, bot, "Web5 - Crypto Wallet Development");
            break;
        case 'dapps_dexs':
            handleSendResponse(chatId, bot, Messages.DAPPS_DEX_DEVELOPMENT, "DApps and DEXs Development");
            break;
        case 'Web5 - DApps and DEXs Development':
            handleInvite(chatId, bot, "Web5 - DApps and DEXs Development");
            break;
        case 'nfts_marketplaces':
            handleSendResponse(chatId, bot, Messages.NFTS_MARKETPLACES, "NFT Development Solutions");
            break;
        case 'Web5 - NFT Development Solutions':
            handleInvite(chatId, bot, "Web5 - NFT Development Solutions");
            break;
        case 'daos_stakings':
            handleMainSelection(chatId, bot, Messages.DAO_STAKING_LIQUIDITY, "DAO, Staking & Bridging Solutions");
            break;
        case 'Web5 - DAO, Staking & Bridging Solutions':
            handleInvite(chatId, bot, "Web5 - DAO, Staking & Bridging Solutions");
            break;
        case 'defis_cefis':
            handleSendResponse(chatId, bot, Messages.DEFIS_CEFIS, "DAO, Staking & Bridging Solutions");
            break;
        case 'Web5 - DAO, Staking & Bridging Solutions':

            handleInvite(chatId, bot, "Web5 - DAO, Staking & Bridging Solutions");
            break;
        case 'web_mobile_design':
            handleSendResponse(chatId, bot, Messages.WEB_MOBILE_DESIGN, "Custom Web & Mobile Solutions");
            break;
        case 'Web5 - Custom Web & Mobile Solutions':
            handleInvite(chatId, bot, "Web5 - Custom Web & Mobile Solutions");
            break;
        case 'full_time_resources':
            handleSendResponse(chatId, bot, Messages.FULL_TIME_RESOURCES, "Full-time Resources.");
            break;
        case 'Web5 - Full-time Resources.':
            handleInvite(chatId, bot, "Web5 - Full-time Resources.");
            break;
        case 'crypto_marketing':
            handleSendResponse(chatId, bot, Messages.CRYPTO_MARKETING, "Complete Crypto Marketing Solutions");
            break;
        case 'Web5 - Complete Crypto Marketing Solutions':
            handleInvite(chatId, bot, "Web5 - DAO, Staking & Bridging Solutions");
            break;


        default:
            break;
    }
});

function handleStart(chatId, bot) {
    bot.sendMessage(chatId, 'This is Web5 Solutions 🦅 BOT and I am here to assist you to take care of your development needs! 🤑 We provide the following services, Please select any to get more information:', {
        reply_markup: {
            inline_keyboard: SelectOptions.MAIN_OPTIONS
        }
    });
}

module.exports = {
    bot
};
