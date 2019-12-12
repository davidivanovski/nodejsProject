const con = require('../database');


getAllGamesQuery = () => {
    const query = 'SELECT * FROM game';
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

getAllGames = async(req, res) => {
    try {
        const posts = await getAllGamesQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificGameQuery = (gameId) => {
    const query = 'SELECT * FROM game WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [gameId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0])
            }
          });
    });
};

getSpecificGame = async(req, res, next) => {
    const gameId = req.params.gameId;

    if (gameId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const publisher = await getSpecificGameQuery(gameId);
        res.status(200).send(publisher);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createGameQuery = (game) => {
    const query = 'insert into game (name, releasedOn, developerId, publisherId) VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {
        con.query(query, [game.name, game.releasedOn, game.developerId, game.publisherId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createGame = async(req, res) => {
    const game = req.body;
    try {
        const result = await createGameQuery(game);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateGameQuery = (gameId, game) => {
    const query = 'UPDATE game SET name = ?, releasedOn = ? , developerId = ?, publisherId = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [game.name, game.releasedOn, game.developerId, game.publisherId, gameId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema game so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateGame = async(req, res) => {
    const userRequest = req.body;
    const gameId = req.params.gameId;
    try {
        const game = await updateGameQuery(gameId, userRequest);
        res.status(201).send("Game has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

deleteGameQuery = (gameId) => {
    const query = 'DELETE FROM game WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [gameId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

deleteGame = async(req, res) => {
    const gameId = req.params.gameId;
    try {
        const game = await deleteGameQuery(gameId);
        res.status(201).send("Game has been deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getAllGames,
    getSpecificGame,
    createGame,
    updateGame,
    deleteGame
}