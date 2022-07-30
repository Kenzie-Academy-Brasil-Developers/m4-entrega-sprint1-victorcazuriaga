import dbconfig from "../../../dbconfig";

const db = dbconfig;

const userProfileService = async (id) => {
  const userProfile = await db("users").where({ id: id });
  return userProfile;
};

export default userProfileService;
