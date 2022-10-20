const {Chat} = require("../models")
const Op = require ('sequelize').Op

class chatRepository {
    constructor() {
        this.Model = Chat
    }
    
    async getChatByRecipientId(recipient_id){
        let result = []
        try {
            result = await this.Model.findAll({
                where: {
                    [Op.or]: [{recipient_id: recipient_id}, {sender_id: recipient_id}]
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            })

        }catch (e) {
            console.error(e)
            return[]
        }
        return result
    }

    async insertMessage(message_data){
        let results = null

        try {
            results = await this.Model.create(message_data)
        } catch (e) {
            console.error(e)
            return null
        }
        return results

    }

}

module.exports = chatRepository