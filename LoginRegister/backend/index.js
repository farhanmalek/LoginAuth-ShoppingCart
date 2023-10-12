const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); //Import JWT

//middleware
app.use(cookieParser());
//Set up cors to connect to front end.
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST", "GET"],
  credentials: true
})); 
app.use(express.json());

//register route
app.use("/register",require("./routes/register"));
app.use("/login",require("./routes/login"));
app.use("/dashboard",require("./routes/dashboard"));
app.use("/logout",require("./routes/logout"));


//create middleware that verifies the user.
 const verifyUser = (req,res,next) => {
    //read cookie
    const token = req.cookies.token; // we named the cookie, token in the server
    if(!token) {
        return res.json({Error: "Not authenticated"});
    } else {
        //verify token that we have generated
        jwt.verify(token, "mysecret", (err, decoded) => {
            if (err) return res.json({Error: "Token not correct"});
            req.name = decoded.name;
            req.id = decoded.id;
            next();

        })
    }
}

//We need to verify the token to check if the user is logged in or not.
app.get("/", verifyUser, (req,res) => {
    return res.status(200).json({name: req.name, id: req.id});
})

app.get("/logout", (req, res) => {
res.clearCookie('token');
return res.status(200).send("logged out");
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serving Base @ http://localhost:${PORT}`)
}).on ("error", (error) => {
    if (error.code === "EADDRINSUSE") {
        console.log("Port Taken")
    } else {
        console.log("Server Error", error )
    }
})