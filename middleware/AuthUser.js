import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: "Token tidak ditemukan" });

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ msg: "Token tidak valid" });

        try {
            const dbUser = await User.findOne({ where: { uuid: user.uuid } });
            if (!dbUser) return res.status(404).json({ msg: "User tidak ditemukan" });

            req.userId = dbUser.id;  // Menambahkan userId dari database ke req

            next();
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
};

// Middleware untuk membatasi akses hanya untuk admin
export const adminOnly = async (req, res, next) => {
    const { role } = req.user;  // Mengambil role dari token

    if (role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

    next();
};
