const mockAddressRepo = (
  {
    returnAddAddress,
    returnGetAddressById,
    returnGetAllAddress,
    returnUpdateAddress,
    returnDeleteAddress,
    returnGetMainAddress
  }
) => {
  const repo = {};
  const address = {
    id: 1,
    province: 'Banten',
    city: 'Bumi Serpong',
    postal_code: '15345',
    detail: 'The Breeze BSD',
    user_id: 2,
    main_address: true,
    createdAt: "12-09-2022 23:30:00",
    updatedAt: "12-09-2022 23:30:00"
  }

  repo.addAddress = jest.fn().mockReturnValue(
    returnAddAddress !== true ? returnAddAddress : address
  );
  
  repo.getAddressByID = jest.fn().mockReturnValue(
    returnGetAddressById !== true ? returnGetAddressById : address
  );
 
  repo.getAddressByUserID = jest.fn().mockReturnValue(
    returnGetAllAddress !== true ? returnGetAllAddress : [address]
  );

  repo.updateAddress = jest.fn().mockReturnValue(
    returnUpdateAddress !== true ? returnUpdateAddress : true
  );

  repo.deleteAddress = jest.fn().mockReturnValue(
    returnDeleteAddress !== true ? returnDeleteAddress :
    true
  );

   repo.getMainAddress = jest.fn().mockReturnValue(
    returnGetMainAddress !== true ? returnGetMainAddress : address
    
  );

  return repo;
};

module.exports = mockAddressRepo;