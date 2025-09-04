import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "3214",
    database: "mychatapp"
})



const PORT = process.env.SERVER_PORT;
const SECRET = process.env.SECRET;
app.listen(PORT, () => { console.log("listening to: " + PORT); });

app.get('/accounts', (req, res) => {
    const cookie = req.cookies.token

    if (!cookie) {
        return console.log("no cookie");
    }
    if (cookie) {
        const token = jwt.verify(cookie, SECRET);
        const query = "SELECT * FROM user WHERE id != ?"
        db.query(query, [token.id], (err, result) => {

            const user = result[0]

            if (users) {
                return res.status(401).send({ msg: "failed to fetch", isLog: false })
            }

            if (user) {
                console.log(result)
                res.status(200).send({ msg: "successfully fetched account", data: result, isLog: true });
            }
        })
    }

}
)

// login

app.post('/login', (req, res) => {
    const userData = req.body.user
    const passData = req.body.pass

    if (userData && passData) {
        const query = "SELECT * FROM user WHERE name = ? AND lastName = ?"
        db.query(query, [userData, passData], (err, result) => {
            if(err) return console.log(e)

            if (result.length === 0) { return res.status(401).send({ msg: "authentication error" }) }

            const user = result[0];

            const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" })
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60
            })
            res.status(200).send({ msg: "login successfully" });

        })
    }
})

