import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import ImageCropper from '../ImageUpload/ImageCropper';


function NewPost(){

    //useEffect to get hunt areas

    useEffect(() => {
        dispatch({ type: 'FETCH_HUNT_AREAS' });
    }, []);

    //get huntAreas redux state
    const huntAreaList = useSelector(store=>store.huntAreasReducer);
    // console.log('huntAreaList', huntAreaList);

    
    //set up usehistory and useDispatch
    const dispatch=useDispatch();
    const history=useHistory();

    //set up form state - this local state tracks fields for the eventual post via axios
    const [postTitle, setPostTitle] = useState('');
    // const [image, setImage] = useState('');
    const [date, setDate] = useState('');
    const [species, setSpecies] = useState('');
    const [successful, setSuccessful] = useState('');
    const [huntAreaId, setHuntAreaId] = useState(null);
    const [weaponType, setWeaponType] = useState('');
    const [landType, setLandType] = useState('');
    const [story, setStory] = useState('');

    //image processing information
    const [selectedFile, setSelectedFile] = useState(null);
    const [finalFile, setFinalFile] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
   

    //todo: consolidate some data with spreaders? - STRETCH

    const submitHunt = (evt) => {
        evt.preventDefault();

        //create payload of form data to send to saga (destructured)
        let payload = {
            postTitle,
            image: finalFile,
            date,
            species,
            successful,
            huntAreaId,
            weaponType,
            landType,
            story,
        }

        // console.log('payload object:', payload);

        //dispatch payload to SAGA
        dispatch({
            type: 'ADD_POST',
            payload: payload
        });
        //alert to give post time to come from db to home page
        alert('Your post is live!');
        //send user to the home page with the list of posts
        history.push('/home');
    };

    const changeHandler = (event) => {
        console.log('in changeHandler');
        setSelectedFile({imageUrl: URL.createObjectURL(event.target.files[0])});
        // ⬇️ this is setting a url for conditional render of the preview
        //likely need to move this to the onCrop fn
        // let url= URL.createObjectURL(event.target.files[0]);
        // setImgUrl(url);

    }
    
    return(
        <>
            <h3>Create New Post</h3>

            <article>
            
            {/* add post form info */}
            <form onSubmit={submitHunt}>
                {/* Image container and input */}
                {imgUrl.length>0 ? <img  className="preview" src={imgUrl}></img>: <figure>
                    <Input type='file' name="post_img" 
                    onChange = {changeHandler}
                    //original==onChange={(evt)=>setImage(evt.target.files[0])}
                    />
                </figure>}
                {/* header with  Title Input, profile name, date*/}
                <header>
                    <Input 
                    type='Text' 
                    placeholder='Post Title' 
                    value={postTitle} 
                    onChange={(evt)=>setPostTitle(evt.target.value)} 
                    required/>
                    <p> Username </p>
                    <p> Date Posted (autofilled)</p>
                </header>

                
                {/* section with  species, success, date of the hunt*/}
                <section>

                    <InputLabel>Date of Hunt</InputLabel>
                        <Input 
                            required 
                            value={date} 
                            onChange={(evt)=>setDate(evt.target.value)} 
                            type='date'>                                
                        </Input>

                    <InputLabel>Species</InputLabel>
                    <Input 
                        type='text' 
                        value={species} 
                        onChange={(evt)=>setSpecies(evt.target.value)} 
                        placeholder='Species' 
                        required>                    
                    </Input>
                    
                    <FormControl fullWidth>
                        <InputLabel>Succesful Hunt?</InputLabel>
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

                </section>

                {/* section with location, weapon, land type  */}
                <section>
                    <FormControl fullWidth>
                        <InputLabel required id="huntarea-input-label">Hunt Area</InputLabel>
                            <Select
                                labelId="huntarea-input-label"
                                value={huntAreaId ? huntAreaId : ''}
                                label="hunt-area"
                                onChange={(evt)=>setHuntAreaId(evt.target.value)}
                            >
                                {huntAreaList.map((area)=>{
                                    return <MenuItem key={area.id} value={area.id}>{area.hunt_area}</MenuItem>
                                })}

                            </Select>
                    </FormControl>

                    <InputLabel>Weapon Used</InputLabel>
                    <Input type='text' value={weaponType} onChange={(evt)=>setWeaponType(evt.target.value)} placeholder='weapon-used'></Input>

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
                    placeholder="Tell the story..."
                    style={{ width: 500, height:200 }}
                    value={story} onChange={(evt)=>setStory(evt.target.value)}
                />

                </section>
                {/* eventually have a sweet alert for submit */}
                <button type="submit">Post</button>
                
            </form>

            </article>

            {selectedFile ? 
                <ImageCropper 
                    id={selectedFile.id} 
                    imageUrl={selectedFile.imageUrl}
                    setFinalFile={setFinalFile}
                    setSelectedFile={setSelectedFile}
                    setImgUrl={setImgUrl}
                    // setCroppedImageFor={setCroppedImageFor}
                /> : null}
        </>
    )
};
    

export default NewPost;