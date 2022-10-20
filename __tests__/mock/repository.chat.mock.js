const mockChatRepo = (
    {
        returnGetListChatById, 
    }
) => {
  const repo = {};

  repo.getListChatById = jest.fn().mockReturnValue(
    returnGetListChatById !== true ?  returnGetListChatById : [
      {
        id: 1,
        sender_id: 1,
        recipient_id: 2,
        content: 'Halo semua',
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
    ],
  );

  return repo;
};

module.exports = mockChatRepo;

