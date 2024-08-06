import User from "../models/UserModel.js";


export const getMembers = async (req, res) => {
  try {
      const user = await User.findOne({
          where: {
              id: req.userId
          },
          attributes: ['uuid', 'name', 'user_class', 'address', 'phone_number', 'email', 'role'] 
      });
      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await User.findOne({
      attributes: ['uuid', 'name', 'user_class', 'address', 'phone_number'],
      where: {
        uuid: req.params.id
      }
    });
    if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Membuat anggota baru
export const createMember = async (req, res) => {
  const { name, user_class, address, phone_number } = req.body;
  try {
    await User.create({
      name,
      user_class,
      address,
      phone_number
    });
    res.status(201).json({ msg: "Member Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Mengupdate anggota
export const updateMember = async (req, res) => {
  console.log("Menerima permintaan PATCH dengan ID:", req.params.id);
  const member = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
  const { name, user_class, address, phone_number } = req.body;
  try {
    await User.update({
      name,
      user_class,
      address,
      phone_number
    }, {
      where: {
        uuid: req.params.id
      }
    });
    console.log("Member berhasil diupdate");
    res.status(200).json({ msg: "Member Updated" });
  } catch (error) {
    console.log("Error saat mengupdate member:", error.message);
    res.status(400).json({ msg: error.message });
  }
};

// Menghapus anggota
export const deleteMember = async (req, res) => {
  const member = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!member) return res.status(404).json({ msg: "Member tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json({ msg: "Member Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
