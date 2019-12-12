const con = require('../database');

getAllPublisherQuery = () => {
    const query = 'SELECT * FROM publisher';
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

getAllPublisher = async(req, res) => {
    try {
        const posts = await getAllPublisherQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificPublisherQuery = (publisherId) => {
    const query = 'SELECT * FROM publisher WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [publisherId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificPublisher = async(req, res, next) => {
    const publisherId = req.params.publisherId;

    if (publisherId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const publisher = await getSpecificPublisherQuery(publisherId);
        res.status(200).send(publisher);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPublisherQuery = (publisher) => {
    const query = 'INSERT INTO publisher(name, created, franchise) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        con.query(query, [publisher.name, publisher.created, publisher.frachise], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createPublisher = async(req, res) => {
    const publisher = req.body;
    try {
        const result = await createPublisherQuery(publisher);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updatePublisherQuery = (publisherId, publisher) => {
    const query = 'UPDATE publisher SET name = ?, created = ? , franchise = ?  WHERE id = ?';
    const list = [publisher.name, publisher.created, publisher.franchise, publisherId];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema publisher so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updatePublisher = async(req, res) => {
    const userRequest = req.body;
    const publisherId = req.params.publisherId;
    try {
        const publisher = await updatePublisherQuery(publisherId, userRequest);
        res.status(201).send("Publisher has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

deletePublisherQuery = (publisherId) => {
    const query = 'DELETE FROM publisher WHERE id = ?';

    return new Promise((resolve, reject) => {
        con.query(query, [publisherId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

deletePublisher = async(req, res) => {
    const publisherId = req.params.publisherId;
    try {
        const developer = await deletePublisherQuery(publisherId);
        res.status(201).send("Publisher has been deleted!");
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getAllPublisher,
    getSpecificPublisher,
    createPublisher,
    updatePublisher,
    deletePublisher
}