require('dotenv').config();
const { Api, TelegramClient } = require('telegram');
const { StringSession } = require("telegram/sessions")
const input = require('input')
const fs = require('fs').promises;

function handleMainSelection(chatId, bot, options, Service) {
  bot.sendMessage(chatId, `Select the ${Service} you are interested in:`, {
    reply_markup: {
      inline_keyboard: options
    }
  });
}

async function handleSendResponse(chatId, bot, message, title) {
  console.log(title)
  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Continue', callback_data: `Web5 - ${title}` }]
      ]
    }
  };
  bot.sendMessage(chatId, message, options);
}


async function handleInvite(chatId, bot, title) {
  console.log(title)
  const apiId = Number(24802814);
  const apiHash = '4211728dfc00a1b605ac7132f3fb9ec5';

  let stringSession = await loadSession();
  if (!stringSession) {
    stringSession = new StringSession('');
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

    await client.start({
      phoneNumber: async () => await input.text("number ?"),
      phoneCode: async () => await input.text("Code ?"),
      onError: (err) => console.log(err),
    });

    await saveSession(client.session);
    await client.disconnect();
  }

  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
  await client.connect()
  const createChatResult = await client.invoke(
    new Api.messages.CreateChat({
      users: ["ammarsiddiqui"],
      title: title,
      type: "private"
    })
  );
  const InviteChatId = createChatResult.chats[0].id;
  const makeAdminResult = await client.invoke(
    new Api.messages.EditChatAdmin({
      chatId: InviteChatId,
      userId: "ammarsiddiqui",
      isAdmin: true,
    })
  );

  await client.invoke(new Api.messages.LeaveChat({ chatId: InviteChatId }));

  const chatInviteLink = await client.invoke(
    new Api.messages.ExportChatInvite({
      peer: new Api.InputPeerChat({ chatId: "4186288597" }),
    })
  );
  const inviteLink = chatInviteLink.link
  await client.disconnect();

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: `Join`, url: inviteLink }]
      ]
    }
  };
  bot.sendMessage(chatId, `Join our chat ${title}`, options);
}


const sessionPath = 'session.json';
async function saveSession(session) {

  await fs.writeFile(sessionPath, session.save());
}
async function loadSession() {
  try {
    const data = await fs.readFile(sessionPath, 'utf-8');
    return new StringSession(data);
  } catch (error) {
    console.log(error)
    return null;
  }
}


module.exports = {
  handleMainSelection,
  handleSendResponse,
  handleInvite

};