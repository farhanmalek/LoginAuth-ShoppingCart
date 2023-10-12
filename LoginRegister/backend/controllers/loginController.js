const db = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //Import JWT

function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  let query = "SELECT * FROM user WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).send("failed to get users");
    }

    if (result.length > 0) {
      //Compare password using bcrypt if the user email exists in the database
      bcrypt.compare(password.toString(), result[0].password, (err, isMatch) => {
        if (err) return res.json({ Error: "Error hashing password" });
        if (isMatch) {
            //access values from user, in this case we only want id and name.
            const name = result[0].name;
            const id = result[0].id;
            //create our token, using the sign method include JSON payload, secret key and expiry date.
            const token = jwt.sign({name,id}, "mysecret", {expiresIn: "1d"});
            res.cookie('token',token); //Generate cookie


          return res.status(200).send("Login successful");
        } else {
          return res.status(404).send("Invalid credentials");
        }
      });
    } else {
      return res.status(404).send("User not found");
    }
  });
}

module.exports = {
  loginUser,
};
