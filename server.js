import express from "express"
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser"
//import bcrypt from 'bcrypt'
import multer from "multer"
import path from "path"
import jwt from "jsonwebtoken"

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reactsystem"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }

})

const upload = multer({
    storage: storage
})

con.connect(function(err){
    if(err) {
        console.log("Error in Connection");
    }
    else {
        console.log("Connected");
    }
})

app.get('/getProduct', (req, res) => {
    const sql = "SELECT * FROM product";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get product error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM product where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get product error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE product set productname = ?, brandname = ?, quantity = ?, price = ? WHERE id = ?";
    con.query(sql, [req.body.productname, req.body.brandname, req.body.quantity, req.body.price, id], (err, result) => {
        if(err) return res.json({Error: "update product error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM product WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete product error in sql"});
        return res.json({Status: "Success"})
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})



app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM login where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get login error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE login set email = ?, password = ? WHERE id = ?";
    con.query(sql, [req.body.email, req.body.password, id], (err, result) => {
        if(err) return res.json({Error: "update login error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.post('/createproduct',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO product (`productname`,`brandname`,`quantity`,`price`,`image`) VALUES (?)";
        const values = [
            req.body.productname,
            req.body.brandname,
            req.body.quantity,
            req.body.price,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside singup query"});
            return res.json({Status: "Success"});
        })
    } )

app.get('/getPurchase', (req, res) => {
    const sql = "SELECT * FROM purchase";
        con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get product error in sql"});
        return res.json({Status: "Success", Result: result})
        })
    })
    app.get('/get/:id', (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM purchase where id = ?";
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Error: "Get product error in sql"});
            return res.json({Status: "Success", Result: result})
        })
    })
    
    app.post('/purchase',upload.single('image'), (req, res) => {
        const sql = "INSERT INTO purchase (`productname`,`brandname`,`quantity`,`price`,`image`) VALUES (?)";
            const values = [
                req.body.productname,
                req.body.brandname,
                req.body.quantity,
                req.body.price,
                req.file.filename
            ]
            con.query(sql, [values], (err, result) => {
                if(err) return res.json({Error: "Inside singup query"});
                return res.json({Status: "Success"});
            })
        } )
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
