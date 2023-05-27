import jwt from "jsonwebtoken";

const SECRET_KEY = "abcdj$223";

export const createToken = (user) => {
  try {
    const token = jwt.sign(user, SECRET_KEY);
    return token;
  } catch (err) {
    return err;
  }
};

export const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  } catch (err) {
    return err;
  }
};
