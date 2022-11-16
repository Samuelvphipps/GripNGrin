const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
    // console.log('in comments POST route and req.body is:', req.user.id, req.body);

    //SQL INSERT TEXT
    sqlText =`
        INSERT INTO "comments"
            ("content", "user_id", "post_id", "parent_comment_id")
        VALUES
            ($1, $2, $3, $4); 
        `;
    //SQL INSERT PARAMS
    sqlParams =[
        req.body.content, 
        req.user.id, 
        req.body.post_id, 
        req.body.parent_comment_id
    ];

    //query to DB
    pool.query(sqlText, sqlParams)
        .then(dbRes => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.error('in /api/comments POST error', err);
            res.sendStatus(500);
        });

});

module.exports = router;
