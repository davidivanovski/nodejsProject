const con = require('../database');

createPurchaseQuery = (purchase) => {
    const query = 'INSERT INTO purchase(userId, gameId) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        con.query(query, [purchase.userId, purchase.gameId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createPurchase = async(req, res) => {
    const purchase = req.body;
    try {
        const result = await createPurchaseQuery(purchase);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    createPurchase
}