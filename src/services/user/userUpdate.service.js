const userUpdateService = async (id, data) => {
  const userUpdate = await db("users").where({ id: id }).update(data);
};

export default userUpdateService;
