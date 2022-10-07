const AddressUseCase = require('../../usecase/address');
const mockAddressRepo = require('../mock/repository.address.mock');

let addressValues = {}
let addressUC = null;

describe('address', () => {
    beforeEach(() => {
        addressValues = {
            returnCreateAddress:true,
            returnGetAddressById:true, 
            returnGetAllAddress:true,
            returnUpdateAddress:true,
            returnDeleteAddress:true
        }
        
        addressUC = new AddressUseCase(mockAddressRepo(addressValues))
    });
    
    describe('create address', () => {
        test('seharusnya isSuccess = true dan data dalam array', async () => {
            let res = await addressUC.createAddress()

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess = false dan data = []',
        async () => {
            addressValues.returnCreateAddress = [null]
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.createAddress()
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.data).toEqual([]);
        });
    });

    describe('get address by id', () => {
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await addressUC.getAddressById(1)
            
            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            addressValues.returnGetAddressById = [null]
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );

            let res = await addressUC.getAddressById()
            
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
            
            expect(res.isSuccess).toBeFalsy()
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
            let res = await addressUC.deleteAddress(1)

            expect(res.isSuccess).toBeTruthy()
        });

        test('seharusnya isSuccess  = false dan reason = address not found', async () => { 
            addressValues.returnGetAddressById = null
            addressUC = new AddressUseCase(
                mockAddressRepo(addressValues)
            );
            let res = await addressUC.deleteAddress()
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('address not found');
        });
    });
})

