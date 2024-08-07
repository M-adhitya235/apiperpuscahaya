import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    console.log("Verifying user...");
    console.log(`Session userId: ${req.session.userId}`);
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        
        req.userId = user.id;
        req.role = user.role;
        console.log(`User verified: ${user.role}`);
        next();
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};


export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}
