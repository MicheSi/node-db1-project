const express = require('express');

const db = require('../data/dbConfig');
const dbQuery = require('../data/queries');

const router = express.Router();

// get all accounts
router.get('/', (req, res) => {
    const {limit, sortby, sortdir} = req.query;
    dbQuery.getAll({limit, sortby, sortdir})
    // .limit(5).orderBy('budget', 'desc')
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
    getById(id)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

// add new account

router.post('/', (req, res) => {
    const newAccount = req.body;
    db('accounts').insert(newAccount, 'id')
    .then(ids => {
        return getById(ids[0]).then(added => {
            res.status(201).json(added)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

// update account
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    db('accounts')
    .where({id})
    .update(updates)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

// delete account
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts')
    .where({id})
    .del()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
    })
})

module.exports = router;

function getById(id) {
    return db('accounts')
      .where({id})
      .first();
  }
  