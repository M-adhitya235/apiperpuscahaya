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
const SequelizeStoreInstance = SequelizeStore(session.Store);

const store = new SequelizeStoreInstance({
    db: db
});

// Sinkronisasi tabel sesi sebelum menggunakan rute
store.sync();

// Sinkronisasi model lain seperti Users
db.sync({ alter: true }) // Gunakan `alter: true` untuk memperbarui tabel sesuai dengan model
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Jika menggunakan proxy seperti Vercel
app.set('trust proxy', 1);

app.use(cors({
    credentials: true,
    origin: 'https://perpustakaancahayasmpn1bpp.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());
app.use(UserRoute);
app.use(BookRoute);
app.use(AuthRoute);
app.use(MemberRoute);

// Middleware untuk error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server berjalan pada port', process.env.APP_PORT);
});
