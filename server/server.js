import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express();
app.use (cors());
app.use(express.json());

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyecto1",
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/usuario', (req, res) => {
    const sql = "INSERT INTO usuarios (`nombre`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.nombre,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [values], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM usuario WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE usuario SET `Name`=?, `Email`=? WHERE id=?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM usuario WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})
const verifyJWT = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token) {
        return res.json("we need token please")
    } else {
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if(err) {
                res.json("Not Authnticated")
            } else {
                req.userId = decoded.id;
            next();            }
        })
    }
}
app.get('/checkauth', verifyJWT, (req, res) => {
    return res.json("Authenticated");

})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err ,data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            const id = data[0].id;
            const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: 300});
            return res.json({Login: true , token, data});
        }else {
            return res.json("Failed");
        }
     })
})

app.listen(8081, ()=>{
    console.log("Listening");
})