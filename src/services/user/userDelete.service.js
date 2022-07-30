const dbconfig = require("../../../dbconfig");

const db = dbconfig;

const userDeleteService = async (id) => {
  console.log(id);
  const userSelect = await db("users").where({ id: id }).del();
  console.log(userSelect);
  return userSelect;
};

export default userDeleteService;
