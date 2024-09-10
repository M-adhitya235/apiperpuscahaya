import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) return res.status(401).json({ msg: "Token tidak ditemukan" });

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ msg: "Token tidak valid" });

        req.user = user;  

        try {
            // Cek apakah pengguna ada di database
            const dbUser = await User.findOne({ where: { uuid: user.uuid } });
            if (!dbUser) return res.status(404).json({ msg: "User tidak ditemukan" });

            // Menyimpan informasi pengguna dalam req
            req.userId = dbUser.uuid; // Gunakan uuid sesuai dengan model
            req.role = dbUser.role;
            next();
        } catch (error) {
            console.log("Error saat mencari user di database:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};

export const adminOnly = (req, res, next) => {
    const { role } = req;

    if (role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

    next();
};
