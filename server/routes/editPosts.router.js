const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    // console.log('in /api/editPosts/id GET route with id of:', req.params);
    //set sql text to get post info from db
    let sqlText =`
        SELECT "posts"."id", "posts"."title", "posts"."hunt_area_id", "posts"."success",
            "posts"."picture", "posts"."species", "posts"."date_of_hunt", "hunt_area"."hunt_area", 
            "posts"."content", "posts"."created", "posts"."land_type", "posts"."weapon_type", 
            "posts"."user_id", "user"."username" FROM "posts"
        JOIN "user"
            ON "posts"."user_id" = "user"."id"
        JOIN "hunt_area"
            ON "hunt_area"."id" = "posts"."hunt_area_id"
        WHERE "posts"."id" = $1;
    `;

    pool.query(sqlText, [req.params.id])
    .then(dbRes => {
        res.send(dbRes.rows[0]);
        // console.log(dbRes.rows);
    })
    .catch(err => {
        console.error('in GET single post error', err);
        res.sendStatus(500);
    });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
