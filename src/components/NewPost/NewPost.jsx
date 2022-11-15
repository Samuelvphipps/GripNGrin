import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useState } from 'react';


function NewPost(){

    const [successful, setSuccessful] = useState('');
    const [huntArea, setHuntArea] = useState(null);
    const [landType, setLandType] = useState('');
    

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
                    <Input type='Text' placeholder='Post Title' required/>
                    <p> Username </p>
                    <p> Date (autofilled)</p>
                </header>

                
                {/* section with  species, success, date of the hunt*/}
                <section>

                    <Input type='text' placeholder='Species' required></Input>
                    
                    <FormControl fullWidth>
                        <InputLabel id="successful-input-label">Succesful Hunt?</InputLabel>
                            <Select
                                required
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
                    <Input required type='date'></Input>
                </section>

                {/* section with location, weapon, land type  */}
                <section>
                    <FormControl fullWidth>
                        <InputLabel required id="huntarea-input-label">Hunt Area</InputLabel>
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

                    <Input type='text' placeholder='weapon-used'></Input>

                    <FormControl fullWidth>
                        <InputLabel id="land-type-input-label">Land Type</InputLabel>
                            <Select
                                labelId="land-type-input-label"
                                value={landType}
                                label="land-type"
                                onChange={(evt)=>setLandType(evt.target.value)}
                            >
                                <MenuItem value={'public'}>Public</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                    </FormControl>
                </section>

                {/* section with text input and store */}
                <section>
                <TextareaAutosize
                    required
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Tell the story..."
                    style={{ width: 500, height:200 }}
                />

                </section>
                {/* eventually have a sweet alert for submit */}
                <button type="submit">Post</button>
                
            </form>

            </article>
        </>
    )
};
    

export default NewPost;