const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');



  //get comments associated with the individual post details view using params.id
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    // console.log('in comments GET and post id is:', req.params.id);

    //sql query text
    let sqlText =`
    SELECT "comments"."id", "comments"."content", "comments"."created", "comments"."user_id", 
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
            // console.log('dbRes comments:', dbRes.rows)
        })
        .catch(err => {
            console.error('in comments GET error:', err);
            res.sendStatus(500);
        })


});


//post a comment to the post user is currently at
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
        req.body.comment, 
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

//delete a comment user owns
router.delete('/', rejectUnauthenticated, (req, res) => {
    // console.log('in delete Router with content of:', req.query);

    //conditional to protect delete route so only the comment owner can delete
    if(Number(req.query.user_id) === req.user.id){
    //set up query text to delete the comment from the db where comment 
    //equals comment id or the children comments are 
    //related to that id
    let sqlText = `
        DELETE FROM "comments"
        WHERE "id" = $1 OR "parent_comment_id" = $1;
    `;
    //query db to delete comment/comments
    pool.query(sqlText, [req.query.comment_id])
        .then(dbRes => res.sendStatus(200))
        .catch(err => {
            console.error('in /api/comments DELETE error:', err);
            res.sendStatus(500);
        });}
    else{res.sendStatus(403)}
})


//edit comment route. This changes the content of the comment. Doesnt modify comment parent id, user, or date
router.put('/', rejectUnauthenticated, (req, res) => {
    // console.log('in /api/comments PUT with a payload of:', req.body);
    
    //conditional to protect delete route so only the comment owner can edit
    if(Number(req.body.data.user_id) === req.user.id){
    //create sql text to updste comment content in the Database
    let sqlText = `
        UPDATE "comments"
        SET "content" = $1
        WHERE "id" = $2;
    `;
    
    //query to DB to update the comment
    pool.query(sqlText, [req.body.data.comment_content, req.body.data.comment_id])
        .then(dbRes => res.sendStatus(201))
        .catch( err => {
            console.error('in /api/comments PUT route with error:', err);
            res.sendStatus(500);
        })
    }
    else{ res.sendStatus(403) };

})


module.exports = router;
