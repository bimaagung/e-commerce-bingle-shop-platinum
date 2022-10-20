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
}

module.exports = ChatRepository;
