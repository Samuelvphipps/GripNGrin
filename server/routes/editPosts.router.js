const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//import multer for file reciept
const multer  = require('multer');

//set storage location and naming convention for image
const storage = multer.diskStorage({
    destination: './public/images', 
    filename: function (req, file, cb) {
        //names file profile_pic-(userid#).jpg
        //path.extname(file.originalname)
        cb(null, 'post-image' + Date.now() + '.jpg');
    }
});

//declares upload variable, ie the above storage variable becomes where Multer sends file with new name
const upload = multer({
    storage: storage,
});
/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
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

//if there is an image file: ⬇️
router.put('/image', rejectUnauthenticated, upload.single('post_img'), (req, res) => {
  // POST route code here
    console.log('in /image put route with values: file:', req.file, 'body"', req.body);
    let post=req.body;
    //SQL

let sqlText = `
    INSERT INTO "posts"
	    "title" = $1
        "species" = $2
        "hunt_area_id" = $3 
        "date_of_hunt" = $4
        "success" = $5
        "picture" = $6
        "content" = $7
        "user_id" = $8
        "land_type" = $9
        "weapon_type" = $10
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    //sql params
    let sqlParams=[
        post.title,
        post.species,
        Number(post.hunt_area_id),
        post.date_of_hunt,
        post.success,
        'http://localhost:3000/images/'+req.file.filename,
        post.content,
        req.user.id,
        post.land_type,
        post.weaponType
    ];

});

router.put('/noImage', rejectUnauthenticated, (req, res) => {
    // POST route code here
  });

module.exports = router;
