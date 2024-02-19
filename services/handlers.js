require('dotenv').config();
const {Api, TelegramClient } = require('telegram');
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

function handleSendResponse(chatId, bot, message) {
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    // [{ text: 'Create Group', callback_data: 'create_group' }],
                    [{ text: 'Contact Us', callback_data: 'JoinGroup'}]
                ]
            }
        };
        bot.sendMessage(chatId, message, options);
}

async function JoinGroup(chatId, user,bot) {
    // const client = initializeClient()
    try{
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
        // const createChatResult = await client.invoke(
        //     new Api.messages.CreateChat({
        //       users: ["ammarsiddiqui"],
        //       title: "My title",
        //     })
        //   );
        //   const InviteChatId = createChatResult.chats[0].id;
        const InviteChatId = "4165753639"
        //   const makeAdminResult = await client.invoke(
        //     new Api.messages.EditChatAdmin({
        //       chatId: InviteChatId,
        //       userId: "ammarsiddiqui",
        //       isAdmin: true,
        //     })
        //   );

          const chatInviteLink = await client.invoke(
            new Api.messages.ExportChatInvite({
              peer: new Api.InputPeerChat({ chatId: InviteChatId}),
            })
          );
         const inviteLink = chatInviteLink.link
          await client.disconnect();
            
          if (inviteLink) {
            
            const keyboard = [{ text: `Join our Group ${inviteLink}`, callback_data: 'Marketing' }];
            
            await bot.sendMessage(chatId, 'Click the button below to join our group:', {
                reply_markup: {
                    inline_keyboard: [keyboard]
                }
            });
        } else {
            await bot.sendMessage(fromId, 'Sorry, an invite link is not available at this time. Please try again later.');
        }
        // bot.sendMessage(chatId, inviteLink );
    
    }catch(error){
        console.log(error)
    }
  
}


async function createNewGroup(chatId,user, bot) {
    try {
    const client = initializeClient()
    await client.connect();
  
      const result = await client.invoke(
        new Api.messages.CreateChat({
          users: [user],
          title: "My very normal title",
        })
      );
  
      await client.disconnect();
    } catch (error) {
      console.error('Error connecting:', error);
    }
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
    createNewGroup,
    JoinGroup
};