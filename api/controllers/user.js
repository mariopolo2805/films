const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { generateToken } = require("../../config/jwt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userAlredyExist = await UserModel.findOne({ email });

    if (userAlredyExist) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const user = new UserModel({ email, password });
    const result = await user.save();
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Usuario o contraseña invalidos" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ msg: "Usuario o contraseña invalidos" });
    }

    const jwt = generateToken({ id: user._id, email: user.email });
    return res.status(200).json({ jwt });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = { registerUser, loginUser }