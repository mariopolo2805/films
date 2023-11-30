const UserModel = require("../api/models/user");
const { verifyToken } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const token = bearerToken.replace("Bearer ", "");
    const verify = verifyToken(token);

    if (verify.id) {
      const user = await UserModel.findById(verify.id);
      req.passport = null;
      req.user = user;
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
}

module.exports = { isAuth }