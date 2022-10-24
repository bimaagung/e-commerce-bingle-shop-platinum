const AddressUseCase = require('../../usecase/address');
const mockAddressRepo = require('../mock/repository.address.mock');
const mockUserRepo = require('../mock/repository.user.mock');

let addressValues = {}
let addressUC = null;

describe('address', () => {
    beforeEach(() => {
        addressValues = {
            returnAddAddress:true,
            returnGetAddressById:true, 
            returnGetAllAddress:true,
            returnUpdateAddress:true,
            returnDeleteAddress:true,
            returnGetMainAddress: true,
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
            expect(typeof res.data === 'object').toBeTruthy();
        });

        test('seharusnya isSuccess = false dan data = []',
        async () => {
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
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("user id not found");
        });
    });

    describe('get address by id', () => {
        test('seharusnya isSuccess  = true ', async () => { 
            let res = await addressUC.getAddressByID()
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)
        });

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            addressValues.returnGetAddressById = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.getAddressByID()
            expect(res.isSuccess = false).toBeFalsy()
            expect(res.reason).toEqual("address not found")
        });
    });
    
    describe('get all address', () => {
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await addressUC.getAddressByUserID()

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            addressValues.returnGetAllAddress = []
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.getAddressByUserID()
            
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
            addressValues.returnGetAddressById = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );
            let res = await addressUC.updateAddress(1, {province: 'test'})
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('address not found');
        });
    });

    describe('delete address', ()=>{
        test('seharusnya isSuccess  = true', async () => { 
            addressValues.returnGetAddressById =  {
                id: 1,
                province: 'Banten',
                city: 'Bumi Serpong',
                postal_code: '15345',
                detail: 'The Breeze BSD',
                user_id: 2,
                main_address: false,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00"
            }

            addressUC = new AddressUseCase(
            mockAddressRepo(addressValues), 
            mockUserRepo(userValues)
        )
            let res = await addressUC.deleteAddress(1)

            expect(res.isSuccess).toBeTruthy()
        });

        test('seharusnya isSuccess  = false dan reason = address not found', async () => { 
            addressValues.returnGetAddressById = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );
            let res = await addressUC.deleteAddress()
            
            expect(res.isSuccess).toBeFalsy(),
            expect(res.reason).toEqual('address not found');
        });
    });

     describe('change address main', ()=>{
        test('seharusnya isSuccess  = true', async () => { 
            let res = await addressUC.changeMainAddress(1,1)

            expect(res.isSuccess).toBeTruthy()
            expect(res.status).toEqual(200)
        });

        test('seharusnya isSuccess  = false dan reason = address not found', async () => { 
            addressValues.returnGetAddressById = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues), 
                mockUserRepo(userValues)
            )
            let res = await addressUC.changeMainAddress(1,1)
            
            expect(res.isSuccess).toBeFalsy(),
            expect(res.reason).toEqual('address not found');
        });

        test('seharusnya isSuccess  = false dan reason = customer not have address', async () => { 
            addressValues.returnGetMainAddress = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues), 
                mockUserRepo(userValues)
            )
            let res = await addressUC.changeMainAddress(1,1)
            
            expect(res.isSuccess).toBeFalsy(),
            expect(res.reason).toEqual('customer not have address');
        });
    });
})

