const TelegramBot = require('node-telegram-bot-api');

const SelectOptions = require('../utils/constants');

const Messages = require('../utils/messages');
const {     
    handleMainSelection,
    handleSendResponse,
    createNewGroup,
    JoinGroup
    } = require('./handlers');

    require('dotenv').config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("polling_error", (msg) => console.log(msg));

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
        handleStart(chatId, bot); // Passing bot instance to handleStart
    }
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const user = query.from.username;
    const option = query.data;

    switch (option) {
        case 'Marketing':
            handleMainSelection(chatId, bot, SelectOptions.MARKETING_OPTIONS, "Marketing services");
            break;
        case 'Launchpad':
            handleMainSelection(chatId, bot, SelectOptions.LAUNCHPAD_OPTIONS, "Launchpad option" );
            break;
        case 'Centralised Exchange':
            handleMainSelection(chatId, bot, SelectOptions.CENTRALISED_EXCHANGE_OPTIONS, "Centralised Exchange option");
            break;
        case 'DEX':
            handleMainSelection(chatId, bot, SelectOptions.DEX_OPTIONS, "Decentralised Exchange services");
            break;
        case 'Market Maker':
            handleMainSelection(chatId, bot, SelectOptions.MARKET_MAKER_OPTIONS, "Market Maker services");
            break;
        case 'Press Release':
            handleMainSelection(chatId, bot, SelectOptions.PRESS_RELEASE_OPTIONS, "press-release services");
            break;
        case 'Audit/KYC':
            handleMainSelection(chatId, bot, SelectOptions.AUDIT_KYC_OPTIONS, "Audit KYC services");
            break;
        case 'CMC/CG':
            handleMainSelection(chatId, bot, SelectOptions.sCMC_CG_OPTIONS, "CMC & CG services");
            break;
        case 'Trending':
            handleSendResponse(chatId, bot, Messages.Trending_Message);
            break;

        case 'Telegram':
            handleSendResponse(chatId, bot, Messages.Telegram_Message);
            break;
        case 'Twitter':
            handleSendResponse(chatId, bot,Messages.Twitter_Message);
            break;
        case 'Youtube':
            handleSendResponse(chatId, bot,Messages.Youtube_Message);
            break;
        case 'Binance AMA':
            handleSendResponse(chatId, bot,Messages.BinanceAMA_Message);
            break;
        case 'Twitter AMA':
            handleSendResponse(chatId, bot, Messages.TwitterAMA_Message);
            break;
        case 'Telegram AMA':
            handleSendResponse(chatId, bot, Messages.TelegramAMA_Message);
            break; 
        case 'BSC Station':
            handleSendResponse(chatId, bot, Messages.BSC_Station_Message);
            break; 
        case 'Kommunitas':
            handleSendResponse(chatId, bot, Messages.Kommunitas_Message);
            break; 
        case 'BullPerks':
            handleSendResponse(chatId, bot, Messages.BullPerks_Message);
            break; 
        case 'Binstarter':
            handleSendResponse(chatId, bot, Messages.Binstarter_Message);
            break; 
        case 'Gempad':
            handleSendResponse(chatId, bot, Messages.Gempad_Message);
            break; 
        case 'PinkSale':
            handleSendResponse(chatId, bot, Messages.PinkSale_Message);
            break; 
        case 'Gate.io':
            handleSendResponse(chatId, bot, Messages.GateIo_Message);
            break; 
        case 'Bitget':
            handleSendResponse(chatId, bot, Messages.Bitgat_Message);
            break; 
        case 'Bybit':
            handleSendResponse(chatId, bot, Messages.Bybit_Message);
            break; 
        case 'MEXC':
            handleSendResponse(chatId, bot, Messages.MEXC_Message);
            break; 
        case 'XT.com':
            handleSendResponse(chatId, bot, Messages.XTCom_Message);
            break; 
        case 'LBnak':
            handleSendResponse(chatId, bot, Messages.LBank_Message);
            break; 
        case 'Bitmart':
            handleSendResponse(chatId, bot, Messages.Bitmart_Message);
            break; 
        case 'Conistor':
            handleSendResponse(chatId, bot, Messages.Coinstore_Message);
            break; 
        case 'Bitrue':
            handleSendResponse(chatId, bot, Messages.Bitrue_Message);
            break;
        case 'Ave.io':
            handleSendResponse(chatId, bot, Messages.AveIo_Message);
            break;   
        case 'CLS':
            handleSendResponse(chatId, bot, Messages.CLS_Message);
            break;
        case 'Gotbit':
            handleSendResponse(chatId, bot, Messages.Gotbit_Message);
            break;
        case 'BitcoinGape':
            handleSendResponse(chatId, bot, Messages.BitcoinGape_Message);
            break;
        case 'ChainWire':
            handleSendResponse(chatId, bot, Messages.ChainWire_Message);
            break;
        case 'Certik':
            handleSendResponse(chatId, bot, Messages.Certik_Message);
            break;
        case 'Hacken':
            handleSendResponse(chatId, bot, Messages.Hacken_Message);
            break;
        case 'QuillsAudit':
            handleSendResponse(chatId, bot, Messages.QuillsAudit_Message);
            break;
        case 'CoinScope':
            handleSendResponse(chatId, bot, Messages.CoinScope_Message);
            break;
        case 'SlowMist':
            handleSendResponse(chatId, bot, Messages.SlowMist_Message);
            break;
        case 'ChainSulting':
            handleSendResponse(chatId, bot, Messages.ChainSluting_Message);
            break;
        case 'CMC':
            handleSendResponse(chatId, bot, Messages.CMC_Message);
            break;    
        case 'CG':
            handleSendResponse(chatId, bot, Messages.CG_Message);
            break;
        case 'JoinGroup':
        case 'JoinGroup':
            JoinGroup(chatId, user,bot);
            break;
         
        case 'create_group':
            createNewGroup(chatId,query,user,bot);
            break;
        // Add cases for other marketing options similarly
        default:
            break;
    }
});

function handleStart(chatId, bot) {
    bot.sendMessage(chatId, 'Welcome to the bot! Please select an option:', {
        reply_markup: {
            inline_keyboard: SelectOptions.MAIN_OPTIONS
        }
    });
}

module.exports = {
    bot
};
