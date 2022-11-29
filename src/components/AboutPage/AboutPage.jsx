import React from 'react';
import {Grid} from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
        <header><h1 className='pageHeader'> About Grip 'N Grin</h1></header>
        <Grid container spacing={2}>
            <Grid item sm={3}>
                {/* applebees advertisement */}
                <a href='https://www.applebees.com/en'><img className='applebees' src='http://localhost:3000/images/AppleBees.png'></img></a>
            </Grid>

            <Grid item sm={8}>
                <div className="postDetailsContainer">
                  <div className='postDetailsInnerContainer aboutContent'>
                    
                    <h3>Overview</h3>
                    <p> This app was  conceived while I was looking through old blogs about hunting in a new area
                        while preparing for a hunt next fall. 
                    There is no easily available information about different hunting in different areas. 
                    This is an early attempt to solve that. While there are many improvements still needed I like how it has turned out so far. 
                    My next step would be to incorporate some type of mapping/search feature that takes hunting areas and converts them to counties, areas, regions and species types. 
                    This will make the information gathering even better for the user.
                    </p>

                    <h3>Next Steps</h3>
                    <p>Integrate a map based search feature to narrow down the feed for more targetted research</p>
                    
                    <h3>Biggest Challenge</h3>
                    <p>Creating image upload routes dependent on whether user wants to replace picture or not replace picture and incorporating image cropping into that process.</p>
        
                    <h3>Technology used:</h3>
                    <ul>
                        <li>Multer</li>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>React Easy Crop</li>
                        <li>SweetAlert2</li>
                        <li>Moment.js</li>
                        <li>And many others...</li>
                    </ul>
            
                    <p> A big thank you to Edan, Prime Digital Academy, my wonderfully supportive cohort mates, and especially my wife Julia for all the support.</p>
            
            
                  </div>
                </div>
            </Grid>
            <Grid item sm={1}></Grid>
        </Grid>
    </>
  );
}

export default AboutPage;
