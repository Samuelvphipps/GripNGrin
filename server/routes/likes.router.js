const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


  //get signed in user's like list to make sure rendering happens
  // based on if they have already liked a post or if they own the post
router.get('/', rejectUnauthenticated, (req, res) => {
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

//add a like from the user to the likes db (creates a pairing in the many to many table)
router.post('/', rejectUnauthenticated, (req, res) => {


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

// delete the pairing from the table (i.e. unlike post)
router.delete('/', rejectUnauthenticated, (req,res) =>{
    // console.log('in /api/likes unlike DELETE route with params of:', req.query);
// verify it is the user unliking post and not someone else
    if(Number(req.query.user_id) === req.user.id){
        //setup query text to delete from DB
        let sqlText = `
            DELETE FROM "liked_post"
            WHERE "user_id" = $1 
            AND "post_id" = $2;
        `;

        //set up sql params with data recieved from client
        let sqlParams = [
            req.user.id,
            req.query.post_id
        ]
        //send Query to DB 
        pool.query(sqlText, sqlParams)
            .then(dbRes => res.sendStatus(200))
            .catch(err => {
                 console.error('in /api/likes delete route error:', err);
                 res.sendStatus(500);
            })
    }
    else{
        res.sendStatus(403);
    }
})

module.exports = router;
