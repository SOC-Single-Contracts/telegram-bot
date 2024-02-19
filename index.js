const express = require('express');

const { handleIncomingMessage, handleCallbackQuery } = require('./controllers/telegramController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


app.post('/incoming-message', (req, res) => {
    handleIncomingMessage(req.body);
    res.sendStatus(200);
});

app.post('/callback-query', (req, res) => {
    handleCallbackQuery(req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
