import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ; 

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(400).json({ msg: "Password salah" });

        // Generate JWT token
        const token = jwt.sign(
            { uuid: user.uuid, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            token,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const Me = async (req, res) => {
    const { uuid } = req.user;  // Mendapatkan UUID dari token yang sudah didecode
    try {
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: { uuid }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

export const logOut = (req, res) => {
    // Dengan JWT, logout biasanya hanya berarti menghapus token di sisi klien
    res.status(200).json({ msg: "Anda telah logout" });
};
