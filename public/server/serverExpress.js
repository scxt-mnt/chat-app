import express from 'express';
import dotenv from 'dotenv';
import mysql from "mysql";
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials: true
}));
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
        
        if(result.length === 0){
            return console.log("failed to fetch")
        }

        if (result) {
            console.log(result)
            res.status(200).send({ msg: "successfully fetched account", data: result });
        }
    })
})

