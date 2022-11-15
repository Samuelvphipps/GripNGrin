import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from 'react';


function NewPost(){

    const [successful, setSuccessful] = useState('');
    const [huntArea, setHuntArea] = useState(null);
    

    console.log('succesful', successful);
    return(
        <>
            <h3>Create New Post</h3>

            <article>
            
            <form>
                {/* Image container and input */}
                <figure>
                    <Input type='file'/>
                </figure>
                {/* header with  Title Input, profile name, date*/}
                <header>
                    <Input type='Text' placeholder='Post Title'/>
                    <p> Username </p>
                    <p> Date (autofilled)</p>
                </header>

                
                {/* section with  species, success, date of the hunt*/}
                <section>

                    <Input type='text' placeholder='Species'></Input>
                    
                    <FormControl fullWidth>
                        <InputLabel id="successful-input-label">Succesful Hunt?</InputLabel>
                            <Select
                                labelId="successful-input-label"
                                value={successful}
                                label="successful-hunt"
                                onChange={(evt)=>setSuccessful(evt.target.value)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                    </FormControl>
                    <InputLabel id="demo-simple-select-label">Date of Hunt</InputLabel>
                    <Input type='date'></Input>
                </section>

                {/* section with location, weapon, land type  */}
                <section>
                    <FormControl fullWidth>
                        <InputLabel id="huntarea-input-label">Hunt Area</InputLabel>
                            <Select
                                labelId="huntarea-input-label"
                                value={huntArea ? huntArea : ''}
                                label="hunt-area"
                                onChange={(evt)=>setHuntArea(evt.target.value)}
                            >
                                <MenuItem value={131}>131</MenuItem>
                                <MenuItem value={218}>218</MenuItem>
                            </Select>
                    </FormControl>

                </section>

                {/* section with text input and store */}
                <section>


                </section>
                {/* eventually have a sweet alert for submit */}
                <button type="submit">Post</button>
                
            </form>

            </article>
        </>
    )
};
    

export default NewPost;