const express = require('express');

const { handleIncomingMessage, handleCallbackQuery } = require('./controllers/telegramController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
let userData = {};
try {
    userData = require('./userData.json');
} catch (err) {
    console.error("Error loading user data:", err);
}


app.post('/incoming-message', (req, res) => {
    handleIncomingMessage(req.body);
    res.sendStatus(200);
});

app.post('/callback-query', (req, res) => {
    handleCallbackQuery(req.body);
    res.sendStatus(200);
});

app.get('/users', (req, res, next) => {
    try {
        if (Object.keys(userData).length === 0) {
            throw new Error('No user data found');
        }
        res.status(200).json({ status: 'success', data: userData });
    } catch (error) {
        res.status(500).json({ status: 'Internal server error', error: error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
