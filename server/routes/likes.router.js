const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // console.log('in /api/likes GET')

    //set up sql text
    sqlText=`
        SELECT * FROM "liked_post"
        WHERE "user_id" = $1;
    `;

    //pool query
    pool.query(sqlText, [req.user.id])
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(err => {
            console.error('in /api/likes GET likes error:', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {


    //check for correct user ⬇️
    if(req.body.user_id === req.user.id){
        // console.log('in /api/likes POST with payload of:', req.body);
        //set sql text for a creation of a like relationship iin the DB
        let sqlText = `
            INSERT INTO "liked_post"
                ("user_id", "post_id")
            VALUES
                ($1, $2);
        `;
        //pool.query to DB
        pool.query(sqlText, [req.user.id, req.body.post_id])
            .then(dbRes => {
                res.sendStatus(201)
            })
            .catch(err => {
                console.error('in /api/likes POST error:', err);
                res.sendStatus(500);
            })

    }  //if user isnt the the liker the update wont happen send forbidden
    else{ res.sendStatus(403)}
});

module.exports = router;
