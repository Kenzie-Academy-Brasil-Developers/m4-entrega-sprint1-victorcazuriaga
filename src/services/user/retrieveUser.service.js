const dbconfig = require("../../../dbconfig");

const db = dbconfig;

const retrieveUserService = async (userId) => {
  const userDb = (await db("users").where({ id: userId }))[0];
};

export default retrieveUserService;
