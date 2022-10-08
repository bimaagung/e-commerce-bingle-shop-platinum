const AddressUseCase = require('../../usecase/address');
const mockAddressRepo = require('../mock/repository.address.mock');
const mockUserRepo = require('../mock/repository.user.mock');

let addressValues = {}
let addressUC = null;

describe('address', () => {
    beforeEach(() => {
        addressValues = {
            returnAddAddress:true,
            returnGetAddressByID:true, 
            returnGetAllAddress:true,
            returnUpdateAddress:true,
            returnDeleteAddress:true
        }

        userValues = {
            returnGetUserByID:true
        }
        
        addressUC = new AddressUseCase(
            mockAddressRepo(addressValues), 
            mockUserRepo(userValues)
        )
    });
    
    describe('create address', () => {
        test('seharusnya isSuccess = true dan data dalam array', async () => {
            let res = await addressUC.addAddress(
                {
                    id: 1,
                    province: 'Banten',
                    city: 'Bumi Serpong',
                    postal_code: '15345',
                    detail: 'The Breeze BSD',
                    user_id: 2,
                    createdAt: "12-09-2022 23:30:00",
                    updatedAt: "12-09-2022 23:30:00"
                }
            )
            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess = false dan data = []',
        async () => {
            // addressValues.returnAddAddress = [null]
            userValues.returnGetUserByID = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            );

            let res = await addressUC.addAddress(
                {
                    id: 1,
                    province: 'Banten',
                    city: 'Bumi Serpong',
                    postal_code: '15345',
                    detail: 'The Breeze BSD',
                    user_id: 2,
                    createdAt: "12-09-2022 23:30:00",
                    updatedAt: "12-09-2022 23:30:00"
                }
            )
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual("user id not found");
        });
    });

    describe('get address by id', () => {
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await addressUC.getAddressByID(1)
            
            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            addressValues.returnGetAddressByID = [null]
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.getAddressByID()
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.data).toEqual([]);
        });
    });
    
    describe('get all address', () => {
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await addressUC.getAllAddress()

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            addressValues.returnGetAllAddress = [null]
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.getAllAddress()
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.data).toEqual([]);
        });
    });
    
    describe('update address', () => {
        test('seharusnya isSuccess  = true', async () => { 
            let res = await addressUC.updateAddress(1, {province: 'test'})

            expect(res.isSuccess).toBeTruthy()
        });

        test('seharusnya isSuccess  = false dan reason = address not found', async () => { 
            addressValues.returnGetAddressByID = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );
            let res = await addressUC.updateAddress(1, {province: 'test'})
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual('address id not found');
        });
    });

    describe('delete address', ()=>{
        test('seharusnya isSuccess  = true', async () => { 
            let res = await addressUC.deleteAddress(1)

            expect(res.isSuccess).toBeTruthy()
        });

        test('seharusnya isSuccess  = false dan reason = address not found', async () => { 
            addressValues.returnGetAddressByID = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );
            let res = await addressUC.deleteAddress()
            
            expect(res.isSuccess).toBeTruthy(),
            expect(res.reason).toEqual('address id not found');
        });
    });
})

