const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//API ROUT '/api/huntAreas'


//get the hunt areas from the db for the redux store.
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('in api/huntareas GET request');

    //set SQL Text for pool.query
    let sqlText =`
        SELECT * FROM "hunt_area"
        ORDER BY "hunt_area" ASC;
    `;

    //pool.query and send to SAGA (client)
    pool.query(sqlText)
        .then((dbRes)=>{
            // console.log('huntAreas GET return from DB', dbRes.rows);
            //send db info
            res.send(dbRes.rows);
        })
        .catch(err=>{
            console.error('in GET /api/huntAreas request error:', err);
            res.sendStatus(500);
        })
  
});



module.exports = router;