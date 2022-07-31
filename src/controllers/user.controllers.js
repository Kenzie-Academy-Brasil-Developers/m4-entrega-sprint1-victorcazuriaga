import createUserService from "../services/user/createUser.service";
import listUserService from "../services/user/listUser.service";
import dbconfig from "../../dbconfig";
import retrieveUserService from "../services/user/retrieveUser.service";
import userProfileService from "../services/user/userProfile.service";
import userDeleteService from "../services/user/userDelete.service";
import userUpdateService from "../services/user/userUpdate.service";
const createUserController = async (request, response) => {
  const user = request.body;
  const newUser = await createUserService(user);
  const db = dbconfig;
  const [{ password, ...newUserDb }] = await db("users").where({ id: newUser });
  return response.status(201).json(newUserDb);
};

const listUserController = async (request, response) => {
  const isAdm = request.isAdm;
  if (isAdm === 0) {
    return response.status(401).json({ message: "Usuário não autorizado" });
  }
  const userData = await listUserService();
  return response.status(200).json(userData);
};

const retrieveUserController = (request, response) => {
  const { id } = request.params;
  const user = retrieveUserService(id);
  return response.json(user);
};
const userUpdateController = async (request, response) => {
  const userId = request.params; //uuid
  const userData = request.body;
  const isAdm = request.isAdm;

  if (isAdm) {
    const [userUpdated] = await userUpdateService(userId.id, userData);
    return response.status(200).json(userUpdated);
  }
  if (isAdm === 0 && userId.id === request.uuid) {
    const [userUpdated] = await userUpdateService(request.uuid, userData);
    return response.status(200).json(userUpdated);
  }
  return response.status(401).json({ message: "Usuário não autorizado" });
};

const userDeleteController = async (request, response) => {
  const userId = request.params; //uuid
  const isAdm = request.isAdm;

  if (isAdm) {
    const userDeleted = await userDeleteService(userId.id);
    return response
      .status(200)
      .json({ message: "Usuário Deletado com sucesso" });
  }
  if (isAdm === 0 && userId.id === request.uuid) {
    const userDeleted = await userDeleteService(request.uuid);
    return response.status(200).json(userDeleted);
  }
  return response.status(401).json({ message: "Usuário Deletado com sucesso" });
};

const userProfileController = async (request, response) => {
  const userId = request.id;
  const [{ password, ...userProfile }] = await userProfileService(userId);
  return response.status(200).json(userProfile);
};

export {
  createUserController,
  listUserController,
  userProfileController,
  userDeleteController,
  userUpdateController,
};
