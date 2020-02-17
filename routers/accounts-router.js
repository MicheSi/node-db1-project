const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get all accounts
router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

// get account by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts').where({id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

// add new account

// update account

// delete account

module.exports = router;