const dbconfig = require("../../../dbconfig");

const db = dbconfig;

const userDeleteService = async (id) => {
  const userDelete = await db("users").where({ id: id }).del();
  return userDelete;
};

export default userDeleteService;
