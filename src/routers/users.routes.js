import { Router } from "express";
import createSessionController from "../controllers/session.controller";
import {
  createUserController,
  listUserController,
  userDeleteController,
  userProfileController,
  userUpdateController,
} from "../controllers/user.controllers";
import userSchema from "../database/schemas/user.schema";
import adminValidatedMiddleware from "../middlewares/adminValidated.middleware";
import authenticationMiddleware from "../middlewares/authetication.middleware";
import schemaCreateUserMiddleware from "../middlewares/schemaCreateUser.middleware";
import userExistMiddleware from "../middlewares/userExists.middleware";

const userRouter = Router();

userRouter.post(
  "/users",
  schemaCreateUserMiddleware(userSchema),
  createUserController
);
userRouter.post("/login", createSessionController);
userRouter.get("/users", authenticationMiddleware, listUserController);
userRouter.get(
  "/users/profile",
  authenticationMiddleware,
  userExistMiddleware,
  userProfileController
);
userRouter.patch(
  "/users/:id",
  userExistMiddleware,
  authenticationMiddleware,
  adminValidatedMiddleware,
  userUpdateController
);
userRouter.delete(
  "/users/:id",
  userExistMiddleware,
  authenticationMiddleware,
  adminValidatedMiddleware,
  userDeleteController
);

export default userRouter;
