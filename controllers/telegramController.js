const TelegramService = require('../services/telegramService');

function handleIncomingMessage(msg) {
    TelegramService.handleIncomingMessage(msg);
}

function handleCallbackQuery(query) {
    TelegramService.handleCallbackQuery(query);
}

module.exports = {
    handleIncomingMessage,
    handleCallbackQuery
};
