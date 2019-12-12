const con = require('../database');

getAllDevelopersQuery = () => {
    const query = 'SELECT * FROM developer';
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

getAllDevelopers = async(req, res) => {
    try {
        const posts = await getAllDevelopersQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificDeveloperQuery = (developerId) => {
    const query = 'SELECT * FROM developer WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [developerId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificDeveloper = async(req, res, next) => {
    const developerId = req.params.id;

    if (developerId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const developer = await getSpecificDeveloperQuery(developerId);
        res.status(200).send(developer);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createDeveloperQuery = (developer) => {
    const query = 'INSERT INTO developer(name, last_release) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        con.query(query, [developer.name, developer.last_release], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createDeveloper = async(req, res) => {
    const developer = req.body;
    try {
        const result = await createDeveloperQuery(developer);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateDeveloperQuery = (developerId, developer) => {
    const query = 'UPDATE developer SET name = ?, last_release = ? WHERE id = ?';
    const list = [developer.name, developer.last_release, developerId];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema developer so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateDeveloper = async(req, res) => {
    const userRequest = req.body;
    const developerId = req.params.developerId;
    try {
        const user = await updateDeveloperQuery(developerId, userRequest);
        res.status(201).send("Developer has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

deleteDeveloperQuery = (developerId) => {
    const query = 'DELETE FROM developer WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [developerId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

deleteDeveloper = async(req, res) => {
    const developerId = req.params.developerId;
    try {
        const developer = await deleteDeveloperQuery(developerId);
        res.status(201).send("Developer has been deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getAllDevelopers,
    getSpecificDeveloper,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
}