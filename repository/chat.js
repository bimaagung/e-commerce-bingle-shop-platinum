const { Op } = require('sequelize');
const { Chat } = require('../models');

class ChatRepository {
  constructor() {
    this.ChatRepository = Chat;
  }

  async getListChatById(userId) {
    const chats = await this.ChatRepository.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId },
          { recipient_id: userId },
        ],
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    return chats;
  }

  async addChat(chatData) {
    let chat = null;

    try {
      chat = await this.ChatRepository.create(chatData);
    } catch (error) {
      console.log(error);
      return null;
    }

    return chat;
  }
}

module.exports = ChatRepository;
