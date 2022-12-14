const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const uploadImage= require('../Util/s3Upload');
const fs = require('fs');
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
        cb(null, 'post-image' + Date.now() + '.png');
    }
});

//declares upload variable, ie the above storage variable becomes where Multer sends file with new name
const upload = multer({
    storage: storage,
});

//Get post to be edited to go to redux store for user changes to values
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in /api/editPosts/id GET route with id of:', req.params);
    //set sql text to get post info from db and send to the editpost reducer
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
        //send the result to the SAGA for a redux store
        res.send(dbRes.rows[0]);
        // console.log(dbRes.rows);
    })
    .catch(err => {
        console.error('in GET single post error', err);
        res.sendStatus(500);
    });

});


//See route under this one for explanation on splitting edit route based on image
//if there is an image file this is the route for the put request: ??????
router.put('/image', rejectUnauthenticated, upload.single('post_img'), async (req, res) => {
  // POST route code here
    // console.log('in /image put route with values: file:', req.file, 'body"', req.body);
    let post=req.body;
    //PROTECT THE ROUTE FROM OTHER USERS
     if(Number(req.body.user_id)===req.user.id){
        const filePath = await uploadImage(req.file);

        //after image in S3 bucket delete the file
        fs.unlink(req.file.path,()=>{
            console.log('file deleted');
        });
    //SQL
        // console.log('inside SQL area on the PUT')
        //all values assigned  param so the user cant sql insert
        let sqlText = `
            UPDATE "posts"
            SET
                "title" = $1,
                "species" = $2,
                "hunt_area_id" = $3,
                "date_of_hunt" = $4,
                "success" = $5,
                "picture" = $6,
                "content" = $7,
                "user_id" = $8,
                "land_type" = $9,
                "weapon_type" = $10
            WHERE "id" = $11;
            `;

        //sql params from user to put to the DB
        let sqlParams=[
            post.title,
            post.species,
            Number(post.hunt_area_id),
            post.date_of_hunt,
            post.success,
            filePath,
            // 'http://localhost:3000/images/'+req.file.filename,
            post.content,
            req.user.id,
            post.land_type,
            post.weapon_type,
            post.id
        ];
        //Query to DB
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.error('in /api/editPosts/image RTE error', err);
                res.sendStatus(500);
            })


    } else {res.sendStatus(403)}

});

//this is the edit post route for updates with no new image
//created this because the info needs a different format if a file is included
//this way made more sense than a massive conditional which would be another
//way to do it.
//if no image is sent this is the route for the put request to edit the post
router.put('/noImage', rejectUnauthenticated, (req, res) => {
    // POST route code here
    // console.log('in the no image post edit PUT route', req.body)
    let post=req.body.data;
    //PROTECT THE ROUTE FROM OTHER USERS
    // console.log('user id', post.user_id, req.user.id)
     if(post.user_id===req.user.id){
    //SQL to update the post @ the database
        // console.log('inside SQL area on the PUT')
        let sqlText = `
            UPDATE "posts"
            SET
                "title" = $1,
                "species" = $2,
                "hunt_area_id" = $3,
                "date_of_hunt" = $4,
                "success" = $5,
                "content" = $6,
                "user_id" = $7,
                "land_type" = $8,
                "weapon_type" = $9
            WHERE "id" = $10;
            `;

        //sql params
        let sqlParams=[
            post.title,
            post.species,
            Number(post.hunt_area_id),
            post.date_of_hunt,
            post.success,
            post.content,
            req.user.id,
            post.land_type,
            post.weapon_type,
            post.id
        ];
        //Query to DB
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.error('in /api/editPosts/image RTE error', err);
                res.sendStatus(500);
            })


    } else {res.sendStatus(403)}
  });

module.exports = router;
