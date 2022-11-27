import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
        <header><h1 className='pageHeader'> About Grip 'N Grin</h1></header>
        <div className="postDetailsContainer">
          <div className='postDetailsInnerContainer aboutContent'>
            
            <p> This app was  conceived while I was looking through old blogs about hunting in Idaho
                while preparing for a hunt next fall. 
            There is no easily available information about different hunting in different areas. 
            This is an early attempt to solve that. While there are many improvements still needed I like how it has turned out so far. 
            My next step would be to incorporate some type of search feature that takes hunting areas and converts them to counties, areas, regions and species types. 
            This will make the information gathering even better for the user.
            </p>
            <p>I used many technologies creating this app, including:</p>
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
    </>
  );
}

export default AboutPage;
