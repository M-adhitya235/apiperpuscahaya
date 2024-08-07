import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import BookRoute from "./routes/BookRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(cors({
    credentials: true,
    origin: 'https://perpustakaancahayasmpn1bpp.vercel.app' 
}));

app.use(express.json());
app.use(UserRoute);
app.use(BookRoute);
app.use(AuthRoute);
app.use(MemberRoute);

// Menyinkronkan tabel sesi
store.sync();

// Menambahkan middleware untuk error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server berjalan pada port', process.env.APP_PORT);
});


// (async () => {
//     try {
//         await db.sync();
//         console.log('Database synchronized!');
//     } catch (error) {
//         console.error('Unable to synchronize the database:', error);
//     }
// })();