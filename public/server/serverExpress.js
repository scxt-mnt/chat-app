import express from 'express';
import dotenv from 'dotenv';
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from "http"
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const server = http.createServer(app);
const io = new Server(server, {
        cors: {
        origin: "http://127.0.0.1:5501",
        credentials: true
    }}
);

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "3214",
    database: "mychatapp"
})



const PORT = process.env.SERVER_PORT;
const SECRET = process.env.SECRET;
server.listen(PORT, "127.0.0.1", () => { console.log("listening to: " + PORT); });

app.get('/login', (req, res) => {
    const cookie = req.cookies.token

    if(!cookie) return console.log("no data")
    if (cookie) {
        const token = jwt.verify(cookie, SECRET);
        const query = "SELECT * FROM user WHERE id != ?"
        db.query(query, [token.id], (err, result) => {
            if (!result) {
                return res.status(401).send({ msg: "failed to fetch", isLog: false })
            }

            if (result) {
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
            if (err) return console.log(err)
            const user = result[0];


            if (!user) { return res.status(401).send({ msg: "authentication error" }) }


            if (user) {
                const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" })
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60
                })
                res.status(200).send({ msg: "login successfully" });
            }
        })
    }
})

// GET details
app.get('/get-Details', (req, res) => {
    const cookie = req.cookies.token
    if (!cookie) {
        return res.status(401).send({ msg: "no token" })
    }
    if (cookie) {
        const token = jwt.verify(cookie, SECRET);
        const query = "SELECT * FROM user WHERE id = ?"
        db.query(query, [token.id], (err, result) => {
            if (err) return console.log(err);
            const user = result[0]
            if (!token) {
                return res.status(401).send({ msg: "no account fetched" })
            }
            if (user) {
                res.status(200).send({ msg: "succesfully fetched data", data: {imgLink: user.ProfileLink, name: user.name, lastName: user.lastName, id: user}  })
            }
        })
    }
})

io.on("connection", (socket) => {
    console.log("user connected " + socket.id)

    socket.on("userId", (userId) => {
        console.log(userId)
    }) 

    socket.on("message", (data) => {
        console.log("message received " + data)
        io.emit("feedback",data)
    })
})

