class ChatUC {
  constructor(chatRepository, userRepository, _) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
    this._ = _;
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
    const allUniqContact = this._.uniq(arrayIdContact);

    // remove self user id
    const uniqContact = this._.remove(allUniqContact, (n) => n !== userId);

    // filter by contact chat
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
          date: row.createdAt,
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

  async addChat(chatData) {
    const chat = await this.chatRepository.addChat(chatData);

    if (chat === null) {
      return null;
    }

    return {
      ...chat.get(),
      is_sender: true,
    };
  }
}

module.exports = ChatUC;
