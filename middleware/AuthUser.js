import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";
import dotenv from 'dotenv';

dotenv.config(); // Memuat variabel dari .env

export const verifyUser = async (req, res, next) => {
    console.log("Verifying user...");

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ambil token dari header Authorization
    
    if (token == null) return res.status(401).json({ msg: "Token tidak ditemukan" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ msg: "Token tidak valid" });

        // Verifikasi pengguna di database (opsional, tergantung pada kebutuhan Anda)
        const dbUser = await User.findOne({
            where: {
                uuid: user.id 
            }
        });

        if (!dbUser) return res.status(404).json({ msg: "User tidak ditemukan" });

        req.user = dbUser; // Tambahkan informasi pengguna ke objek request
        req.role = dbUser.role;
        console.log(`User verified: ${dbUser.role}`);
        next();
    });
};

export const adminOnly = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ambil token dari header Authorization
    
    if (token == null) return res.status(401).json({ msg: "Token tidak ditemukan" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ msg: "Token tidak valid" });

        // Verifikasi pengguna di database
        const dbUser = await User.findOne({
            where: {
                uuid: user.id // Gunakan ID dari token
            }
        });

        if (!dbUser) return res.status(404).json({ msg: "User tidak ditemukan" });
        if (dbUser.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

        req.user = dbUser; // Tambahkan informasi pengguna ke objek request
        next();
    });
};