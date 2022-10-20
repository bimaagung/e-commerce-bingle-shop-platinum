const ChatUseCase = require('../../usecase/chat');
const mockUserRepo = require('../mock/repository.user.mock') 
const mockChatRepo = require('../mock/repository.chat.mock')  
const _ = require('lodash');

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

        chatUC = new ChatUseCase(mockChatRepo(chatValues), mockUserRepo(userValues), _);
    })

    describe('getListChatByUserId', () => { 
        test('should isSucces is true and data is valid', async () => {
            
            let res = await chatUC.getListChatByUserId(1)

            expect(res.isSuccess).toBeTruthy();

            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data[0]).toHaveProperty('user_id');
            expect(res.data[0]).toHaveProperty('name');
            expect(res.data[0]).toHaveProperty('last_chat');
            expect(res.data[0]).toHaveProperty('messages');
            expect(Array.isArray(res.data[0].messages)).toBeTruthy();
            expect(res.data[0].messages[0]).toHaveProperty('as');
            expect(res.data[0].messages[0]).toHaveProperty('content');
            expect(res.data[0].messages[0]).toHaveProperty('date');
        });
     })
});