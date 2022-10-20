const ChatUseCase = require('../../usecase/chat');
const mockUserRepo = require('../mock/repository.user.mock') 
const mockChatRepo = require('../mock/repository.chat.mock')  

let chatValues, userValues = {}
let chatUC = null

describe('chat', () => {
    beforeEach(() => {
        chatValues = {
            returnGetListChatById: true
        },
        userValues = {
            returnGetUserByID: true
        },

        chatUC = new ChatUseCase(mockChatRepo(chatValues), mockUserRepo(userValues));
    })

    describe('getListChatByUserId', () => { 
        test('should isSucces is true and data is valid', async () => {
            let res = await chatUC.getListChatByUserId(1)

            expect(res.isSuccess).toBeTruthy();

            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('user_id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('active');
            expect(res.data).toHaveProperty('messages');
            expect(Array.isArray(res.data.messages)).toBeTruthy();
            expect(res.data.message[0]).toHaveProperty('date');
            expect(res.data.message[0]).toHaveProperty('details');
            expect(Array.isArray(res.data.message[0].details)).toBeTruthy();
            expect(res.data.message[0].details[0]).toHaveProperty('id');
            expect(res.data.message[0].details[0]).toHaveProperty('user_id');
            expect(res.data.message[0].details[0]).toHaveProperty('content');
            expect(res.data.message[0].details[0]).toHaveProperty('time');
        });
     })
});