import dbconfig from "../../dbconfig";
const db = dbconfig;
const schemaCreateUserMiddleware =
  (schema) => async (request, response, next) => {
    if (request.body.email) {
      const verifyEmailAlreadyUse = (
        await db("users").where({ email: request.body.email })
      )[0];
      if (verifyEmailAlreadyUse)
        return response.status(400).json({ message: "E-mail já cadastrado" });
    }
    try {
      const validateUser = await schema.validate(request.body);
      request.body = validateUser;
      next();
    } catch (error) {
      return response.status(400).json("campos inválido");
    }
  };
export default schemaCreateUserMiddleware;
