const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
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

//location url '/api/posts'

router.get('/:id', rejectUnauthenticated, (req, res) =>{
    // console.log('in GET single post');
    // console.log('req.params', req.params.id);
    
    //set up sql text for query
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

})

//  TESTING ROUTE FOR NEW SQL
// router.get('/:id', rejectUnauthenticated, (req, res) =>{
//     // console.log('in GET single post');
//     // console.log('req.params', req.params.id);
    
//     //set up sql text for query
//     let sqlText =`
//     SELECT count("liked_post"."post_id") as LIKES, 
//         "posts"."id", "posts"."title", "posts"."hunt_area_id", "posts"."success",
//         "posts"."picture", "posts"."species", "posts"."date_of_hunt", "hunt_area"."hunt_area", 
//         "posts"."content", "posts"."created", "posts"."land_type", "posts"."weapon_type", 
//         "posts"."user_id", "user"."username"
//     FROM "liked_post"
//     JOIN "posts"
//         ON "posts"."id" = "liked_post"."post_id"
//     JOIN "user"
//         ON "user"."id" = "posts"."user_id"
//     JOIN "hunt_area"
//         ON "hunt_area"."id" = "posts"."hunt_area_id"
//         WHERE "posts"."id" = $1
//     GROUP BY ("posts"."id", "user"."username", "hunt_area"."hunt_area")
//     ;
//     `;

//     pool.query(sqlText, [req.params.id])
//         .then(dbRes => {
//             res.send(dbRes.rows[0]);
//             // console.log(dbRes.rows);
//         })
//         .catch(err => {
//             console.error('in GET single post error', err);
//             res.sendStatus(500);
//         });

// })

        // THIS IS THE ORIGINAL ROUTE
// router.get('/', rejectUnauthenticated, (req, res) => {
//     // console.log('in /api/posts GET');
//     //get all posts from db
//     //sql text
//     let sqlText = `
//         SELECT "user"."username", "posts"."id", "posts"."title", "posts"."species",
//             "posts"."date_of_hunt", "posts"."success", "posts"."picture", "posts"."content", 
//             "posts"."created", "posts"."land_type", "hunt_area"."hunt_area", "posts"."weapon_type", "posts"."user_id" 
//         FROM "user" 
//         JOIN "posts"
//             ON "user"."id" = "posts"."user_id"
//         JOIN "hunt_area"
//             ON "posts"."hunt_area_id" = "hunt_area"."id"
//         ORDER BY "posts"."created" DESC;
//     `

//     //Pool.query from DB and send back to SAGA
//     pool.query(sqlText)
//         .then(dbRes => {
//             res.send(dbRes.rows);
//             console.log('in get post db results:', dbRes);
//         })
//         .catch(err => {
//             console.error('in /api/posts GET Error', err);
//             res.sendStatus(500);
//         });

//   // GET route code here
// });

        //NEW SQL ROUTE TESTER
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('in /api/posts GET');
    //get all posts from db
    //sql text to get required data plus like count for each post
    // console.log('in GET Posts route', req.body);
    let sqlText = `
        SELECT count("liked_post"."post_id") as LIKES, 
            "posts"."id", "posts"."title", "posts"."hunt_area_id", "posts"."success",
            "posts"."picture", "posts"."species", "posts"."date_of_hunt", "hunt_area"."hunt_area", 
            "posts"."content", "posts"."created", "posts"."land_type", "posts"."weapon_type", 
            "posts"."user_id", "user"."username"
        FROM "posts"
        LEFT JOIN "liked_post"
            ON "posts"."id" = "liked_post"."post_id"
        JOIN "user"
            ON "user"."id" = "posts"."user_id"
        JOIN "hunt_area"
            ON "hunt_area"."id" = "posts"."hunt_area_id"
        GROUP BY ("posts"."id", "user"."username", "hunt_area"."hunt_area")
        ORDER BY "posts"."created" DESC;
    `;

    //Pool.query from DB and send back to SAGA
    pool.query(sqlText)
        .then(dbRes => {
            res.send(dbRes.rows);
            console.log('response in get dbres posts', dbRes);
        })
        .catch(err => {
            console.error('in /api/posts GET Error', err);
            res.sendStatus(500);
        });

  // GET route code here
});





                //reject non users and create image file in public/images folder
                //parse the info for db query   
router.post('/', rejectUnauthenticated, upload.single('post_img'), (req, res) => {
  // POST route code here
    // console.log('req.file is:', req.file);
    // console.log('req.file.filename', req.file.filename);
    // console.log('req.body is:', req.body.title);

    let post=req.body;

    //sqlText using params to protect the DB
    let sqlText = `
    INSERT INTO "posts"
	    ("title", "species", "hunt_area_id", "date_of_hunt", "success", 
        "picture", "content", "user_id", "land_type", "weapon_type")
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

    console.log('sql params', sqlParams);
    //pool.query and send status back to saga
    pool.query(sqlText, sqlParams)
        .then(result => {
             res.sendStatus(201);
        })
        .catch(err => {
            console.error('in posts POST error:', err);
            res.sendStatus(500);
        })
});

router.delete('/', rejectUnauthenticated, (req, res) => {
    console.log('in /api/posts DELETE with payload of:', Number(req.query.user_id), req.user.id);
    //make sure the owner of the post is the one deleting it
    if(req.user.id === Number(req.query.user_id)){
        //set sql text if user matches the post owner
        let sqlText = `
            DELETE FROM "posts"
            WHERE "id" = $1;
        `;
        console.log('in delete conditional')
        //pool.query and send the post_id and the sql text
        pool.query(sqlText, [req.query.post_id])
            .then(dbres => {
                res.sendStatus(200)
            })
            .catch(err => {
                console.error('in /api/posts DELETE error', err);
                res.sendStatus(500);
            })
    }
    else{res.sendStatus(403)};
})

module.exports = router;