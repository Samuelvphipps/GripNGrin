const express = require('express');
const pool = require('../modules/pool');
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
/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    //recieve information and test reciept


  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, upload.single('post_img'), (req, res) => {
  // POST route code here
  console.log('req.file is:', req.file);
  console.log('req.file.path', req.file.path);
  console.log('req.body is:', req.body);
});

module.exports = router;