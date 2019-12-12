const con = require('../database');

getAllGenresQuery = () => {
    const query = 'SELECT * FROM genre';
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

getAllGenres = async(req, res) => {
    try {
        const posts = await getAllGenresQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificGenreQuery = (genreId) => {
    const query = 'SELECT * FROM genre WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [genreId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificGenre = async(req, res, next) => {
    const genreId = req.params.id;

    if (genreId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const genre = await getSpecificGenreQuery(genreId);
        res.status(200).send(genre);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createGenreQuery = (genre) => {
    const query = 'INSERT INTO genre(name) VALUES (?)';
    return new Promise((resolve, reject) => {
        con.query(query, [genre.name], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createGenre = async(req, res) => {
    const genre = req.body;
    try {
        const result = await createGenreQuery(genre);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateGenreQuery = (genreId, genre) => {
    const query = 'UPDATE genre SET name = ? WHERE id = ?';
    const list = [genre.name,genreId];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema genre so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateGenre = async(req, res) => {
    const userRequest = req.body;
    const genreId = req.params.genreId;
    try {
        const user = await updateGenreQuery(genreId, userRequest);
        res.status(201).send("Genre has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

deleteGenreQuery = (genreId) => {
    const query = 'DELETE FROM genre WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [genreId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

deleteGenre = async(req, res) => {
    const genreId = req.params.genreId;
    try {
        const genre = await deleteGenreQuery(genreId);
        res.status(201).send("Genre has been deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getAllGenres,
    getSpecificGenre,
    createGenre,
    updateGenre,
    deleteGenre
}