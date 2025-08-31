import express from 'express';
import dotenv from 'dotenv';
import mysql from "mysql";
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({}));
app.use(express.static("public"));


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "3214",
    database: "mychatapp"
})

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => { console.log("listening to: " + PORT); });


app.get('/accounts', (req, res) => {
    const query = "SELECT * FROM user"
    db.query(query, (err, result) => {
        if (err) return res.status(401).send("cannot fetch");
        
        if (result) {
            res.status(200).send({ msg: "successfully fetched account", data: result });
        }
    })
})

