const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('in comments GET and post id is:', req.params.id);

    //sql query text
    let sqlText =`
    SELECT "comments"."id", "comments"."content", "comments"."created", 
	    "comments"."parent_comment_id", "comments"."post_id", "user"."username" FROM "comments"
    JOIN "user"
	    ON "user"."id" = "comments"."user_id"
    WHERE "post_id" = $1
    ORDER BY "created";
    `;
    
    //sql query
    pool.query(sqlText, [req.params.id])
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(err => {
            console.error('in comments GET error:', err);
            res.sendStatus(500);
        })


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