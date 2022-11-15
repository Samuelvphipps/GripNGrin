const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//import multer for file reciept
const multer  = require('multer');

//set storage location and naming convention
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

router.get('/', rejectUnauthenticated, (req, res) => {
    //recieve information and test reciept


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
	    ("title", "species", "hunt_area_id", "date_of_hunt", "success", "picture", "content", "user_id", "land_type")
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);
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
        post.land_type
    ];

    console.log('sql params', sqlParams);
    //pool.query
});

module.exports = router;