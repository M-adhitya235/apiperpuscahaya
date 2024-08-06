import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const users = await User.findAll({
      attributes: ['uuid', 'name', 'user_class', 'address', 'phone_number', 'email', 'role']
    });
    res.status(200).json({
      total: totalUsers,
      users
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id: req.userId
//             },
//             attributes: ['uuid', 'name', 'user_class', 'address', 'phone_number', 'email', 'role'] 
//         });
//         if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'user_class', 'address', 'phone_number', 'email', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    if (!response) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, user_class, address, phone_number, email, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      user_class,
      address,
      phone_number,
      email,
      password: hashPassword,
      role,  
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log("Menerima permintaan PATCH dengan ID:", req.params.id);
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, user_class, address, phone_number, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    hashPassword = await argon2.hash(password);
  }
  try {
    await User.update({
      name,
      user_class,
      address,
      phone_number,
      email,
      password: hashPassword,
      role,
    }, {
      where: {
        uuid: req.params.id
      }
    });
    console.log("User berhasil diupdate");
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log("Error saat mengupdate user:", error.message);
    res.status(400).json({ msg: error.message });
  }
};


export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
