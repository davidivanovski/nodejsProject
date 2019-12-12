const con = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

getAllUsersQuery = () => {
    const query = "SELECT * FROM user";
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getAllUsers = async(req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);  
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificUser = async(req, res, next) => {
    const userId = req.params.userId;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};


createUserQuery = (userRequest, passHash) => {
    const query = 'INSERT INTO user(name, surname, email, password, country) VALUES (?, ?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
        con.query(query, [userRequest.name, userRequest.surname, userRequest.email, passHash, userRequest.country], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createUser = async(req, res, next) => {
    try {
        const userRequest = req.body;
        console.log(userRequest)
        const passHash = bcrypt.hashSync(userRequest.password, 10);
        await createUserQuery(userRequest, passHash);
        res.status(201).send("User has been created!");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

updateUserQuery = (id, user) => {
    const query = 'UPDATE user SET Name = ?, Surname = ?, Email = ?, Age = ?, IsActive = ? WHERE id = ?';
    const list = [user.Name, user.Surname, user.Email, user.Age, user.IsActive, id];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema user so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateUser = async(req, res) => {
    const userRequest = req.body;
    const userId = req.params.id
    try {
        const user = await updateUserQuery(userId, userRequest);
        res.status(201).send("User has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

getUserByEmailQuery = (email) => {
    const query = "SELECT * FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                //console.log(results);
                resolve(results);
            }
          });
    });
};

loginUser = async(req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    try {
        var user = await getUserByEmailQuery(email);
        var dbUser = user[0];
        const matchPass = bcrypt.compareSync(pass, dbUser.password);

        if (matchPass) {
            const token = jwt.sign({dbUser}, 'aaaa', { expiresIn: '1h'});
            res.status(200).json(token);        
        }
        else {
            res.status(401).send("Wrong password");
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
};

deleteUserQuery = (userId) => {
    const query = 'DELETE FROM user WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

deleteUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await deleteUserQuery(userId);
        res.status(201).send("User has been deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    updateUser,
    loginUser,
    deleteUser
}