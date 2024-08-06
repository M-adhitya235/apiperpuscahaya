import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
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

// (async () => {
//     try {
//         await db.sync();
//         console.log('Database synchronized!');
//     } catch (error) {
//         console.error('Unable to synchronize the database:', error);
//     }
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store, 
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(UserRoute);
app.use(BookRoute);
app.use(AuthRoute);
app.use(MemberRoute);


// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server berjalan...');
});
