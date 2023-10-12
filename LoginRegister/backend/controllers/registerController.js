const db = require("../database/database");
const bcrypt = require("bcrypt");
const salt = 10; // number of characters added to password


function registerUser(req, res) {
  const selectQuery = "SELECT * FROM user WHERE email = ?";
  const email = req.body.email;
  //First check if user already exists
  db.query(selectQuery, email, (err, result) => {
    if (err) {
      return res.status(500).send("Error connecting to database");
    }

    if (result.length > 0) {
      return res.status(409).send("This email is already registered");
    }
    //User is new so insert into DB, first hash the password
    const insertQuery = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.status(500).send("Error hashing password");
      const values = [
         req.body.name,
         email,
         hash
      ]
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.log(err, "error inserting user");
          return res.status(500).send("Error inserting user");
        } else {
          return res.status(200).send("User Successfully Added");
        }
      });
  
    })

  });
}

module.exports = {
  registerUser
};
