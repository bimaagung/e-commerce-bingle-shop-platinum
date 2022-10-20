const mockChatRepo = (
    {
        returnGetListChatById, 
    }
) => {
  const repo = {};

  repo.getListChatById = jest.fn().mockReturnValue(
    returnGetListChatById !== true ?  returnGetListChatById : [
      {
        id: 2,
        sender_id: 2,
        recipient_id: 1,
        content: 'Yes, What happens',
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      },
      {
        id: 1,
        sender_id: 1,
        recipient_id: 2,
        content: 'Hello',
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      },
    ],
  );

  return repo;
};

module.exports = mockChatRepo;

