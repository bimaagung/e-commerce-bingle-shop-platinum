const _ = require('lodash');

class ChatUC {
  constructor(chatRepository, userRepository) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
  }

  async getListChatByUserId(userId) {
    let result = {
      isSuccess: true,
      reason: null,
      data: [],
    };

    const arrayIdContact = [];
    const listChat = [];

    const chats = await this.chatRepository.getListChatById(userId);

    if (chats === null) {
      result.isSuccess = true;
      result.reason = 'chat is empty';
      return result;
    }

    chats.forEach((row) => {
      arrayIdContact.push(row.sender_id);
      arrayIdContact.push(row.recipient_id);
    });

    // short uniq
    const allUniqContact = _.uniq(arrayIdContact);

    // remove self user id
    const uniqContact = _.remove(allUniqContact, (n) => n !== userId);

    // filter by contact
    for (let x = 0; x < uniqContact.length; x += 1) {
      let id = uniqContact[x];

      const getContact = chats.filter((i) => i.sender_id === id || i.recipient_id === id);

      // get name by user
      const { name } = await this.userRepository.getUserByID(id);

      let messages = [];

      // detail chat
      getContact.forEach((row) => {
        const messageDetail = {
          as: row.sender_id === userId ? 'sender' : 'recipient',
          content: row.content,
          time: row.createdAt,
        };

        messages.push(messageDetail);
      });

      const resultChat = {
        user_id: id,
        name,
        last_chat: getContact[0].createdAt,
        messages,

      };

      listChat.push(resultChat);
    }

    result.data = listChat;
    return result;
  }
}

module.exports = ChatUC;
