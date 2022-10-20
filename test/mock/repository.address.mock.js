const mockAddressRepo = (
  {
    returnAddAddress,
    returnGetAddressById,
    returnGetAllAddress,
    returnUpdateAddress,
    returnDeleteAddress
  }
) => {
  const repo = {};
  
  repo.addAddress = jest.fn().mockReturnValue(
    returnAddAddress !== true ? returnAddAddress : [
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
    ]
  );
  
  repo.getAddressByID = jest.fn().mockReturnValue(
    returnGetAddressById !== true ? returnGetAddressById : 
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
  );
 
  repo.getAddressByUserID = jest.fn().mockReturnValue(
    returnGetAllAddress !== true ? returnGetAllAddress : [
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
    ]
  );

  repo.updateAddress = jest.fn().mockReturnValue(
    returnUpdateAddress !== true ? returnUpdateAddress : true
  );

  repo.deleteAddress = jest.fn().mockReturnValue(
    returnDeleteAddress !== true ? returnDeleteAddress :
    true
  );

  return repo;
};

module.exports = mockAddressRepo;