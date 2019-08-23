const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
const mongoose = require("mongoose");

/* GET celebrities main page. */
router.get('/', (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            console.log('celebrities', celebrities);
            res.render('celebrities/index', { celebrities });
        })
        .catch(next);
});


/* GET create new celebrity*/
router.get('/new', (req, res, next) => {
    res.render('celebrities/new');
});

/* POST for the new celebrity*/
router.post('/', (req, res, next) => {
    const {
        name, occupation, catchPhrase,
    } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase,
    })
        .then((celebrity) => {
            console.log('celebrity ', celebrity);
            res.redirect('/celebrities');
        })
        .catch(next);
});

/* GET celebrity detail */
router.get('/:celebrityId', (req, res, next) => {
    const { celebrityId } = req.params;

    Celebrity.findById(celebrityId)
        .then((celebrity) => {
            res.render('celebrities/show', { celebrity });
        })
        .catch(next);
});

/*POST to edit celebrity*/
router.get('/:celebrityId/edit', (req, res, next) => {
    const { celebrityId } = req.params;
    Celebrity.findById(celebrityId)
        .then((celebrity) => {
            res.render('celebrities/edit', celebrity);
        })
        .catch(next);
});

router.post('/:celebrityId', (req, res, next) => {
    const { celebrityId } = req.params;
    const {
        name, occupation, catchPhrase, 
    } = req.body;
    Celebrity.update({_id: celebrityId}, {name: name, occupation: occupation, catchPhrase: catchPhrase})
        .then((celebrity) => {
            console.log('editing celebrity ', celebrity)
            res.redirect(`/celebrities/${celebrityId}`);
        })
        .catch(next);
});

/*POST to delete celebrity*/
router.post('/:celebrityId/delete', (req, res, next) => {
    const { celebrityId } = req.params;
    Celebrity.findByIdAndDelete(celebrityId)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(next);
});

module.exports = router;
