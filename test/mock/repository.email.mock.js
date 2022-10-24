const mockEmailRepo = (
    {
        returnSendOrderEmail, 
    }
) => {
  const repo = {};

  repo.sendOrderEmail = jest.fn().mockReturnValue(
    returnSendOrderEmail !== true ?  returnSendOrderEmail : true
  );

  return repo;
};

module.exports = mockEmailRepo;

