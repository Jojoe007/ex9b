const express = require('express');
const router = express.Router();

const { MongoClient } = require("mongodb");
const client = new MongoClient('mongodb+srv://admin:GloASvqicOrgzIiV@1.agmjzg6.mongodb.net/?retryWrites=true&w=majority');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('books/index');
});

/* GET home page. */
router.get('/filter', async function (req, res) {

    const { categories, pageCount } = req.query;

    await client.connect();

    const results = await client.db("book_shop").collection("books").find({
        categories: categories, 
        pageCount: { $gte: parseInt(pageCount) }
    }).toArray();

    await client.close();
    res.status(200).send(results);
});


module.exports = router;
