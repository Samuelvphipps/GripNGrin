
import {
    TextareaAutosize,
    Input,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Grid
} from '@mui/material'
//sweet alert import
const Swal = require('sweetalert2')

//import moment for date
import moment from 'moment';

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
    //get user information
    const user = useSelector(store => store.user);
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
   
    console.log('finalFile', finalFile)

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
        Swal.fire('Your post is live!')
        .then((result) => {
            history.push('/home');
            
          })
        // alert('Your post is live!');
        //send user to the home page with the list of posts
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

        
        <form onSubmit={submitHunt}>
            <article className='postDetailsContainer'>
                <div className='postDetailsInnerContainer'>
                    <h3 className='editPostDetailsTitle'>
                        <Input 
                        type='Text' 
                        placeholder='Post Title' 
                        style={{ width: 500, fontSize:40, height: 100}}
                        value={postTitle} 
                        onChange={(evt)=>setPostTitle(evt.target.value)} 
                        required/>
                    </h3>
                    <header className='editHeader'>
                        <Grid container spacing={1}>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={4}><p className='username editDetailsHeader'>{user.username}</p></Grid>
                            <Grid item sm={3}>
                                
                            </Grid>
                            <Grid item sm={3}><p className='postDate editDetailsHeader'>{moment().format("MMM Do YYYY")}</p></Grid>
                            <Grid item sm={1}></Grid>
                        </Grid>
                    </header>
                    <div id='editHeaderBottom'></div>
            
                        
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                        {imgUrl.length>0 ? 
                            <img  className='imgContainer' src={imgUrl}></img>: 
                            <figure>
                                <Input type='file' name="post_img" 
                                onChange = {changeHandler}
                                //original==onChange={(evt)=>setImage(evt.target.files[0])}
                                />
                            </figure>}                            
                        </Grid>
                        <Grid item sm={6}>
                                        
                            <p className='editData top'><span className='editItemDataDetails'>Date of hunt:    </span> 
                                <Input 
                                    required 
                                    value={date}
                                    inputProps={{style: {fontSize: 22}}}
                                    type='date'
                                    //on change update redux store with new value
                                    onChange={(evt)=>setDate(evt.target.value)}                                     
                                >
                                </Input>
                            </p>
                            <p className='editData'><span className='editItemDataDetails'>Species:    </span> 
                                <Input 
                                    type='text' 
                                    placeholder='Species'
                                    inputProps={{style: {fontSize: 22, height:44}}} 
                                    required
                                    value={species}
                                    //on change update redux store with new value
                                    onChange={(evt)=>setSpecies(evt.target.value)}
                                    //on change
                                ></Input>
                            </p>
                            <p className='editData'><span className='editItemDataDetails'>Success:</span>
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Succesful Hunt?</InputLabel>
                                        <Select
                                            required                                            
                                            labelId="successful-input-label"                                                
                                            label="successful-hunt"
                                            value={successful}
                                            //on change update redux store with new value    
                                            onChange={(evt)=>setSuccessful(evt.target.value)}                                          
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>

                                </FormControl></p>                        
                            <p className='editData'><span className='editItemDataDetails'>Location:</span> 
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel required id="huntarea-input-label">Hunt Area</InputLabel>
                                        <Select
                                            labelId="huntarea-input-label"
                                            //have the input be empty until the hunt area id arrives (prevents an error)
                                            value={huntAreaId ? huntAreaId : ''}
                                            //on change update redux store with new value
                                            onChange={(evt)=>setHuntAreaId(evt.target.value)}                               
                                            label="hunt-area"
                                        >
                                            {huntAreaList.map((area)=>{
                                                return <MenuItem key={area.id} value={area.id}>{area.hunt_area}</MenuItem>
                                            })}    
                                        </Select>
                                </FormControl></p>
                            <p className='editData'><span className='editItemDataDetails'>Weapon used:</span> 
                                <Input 
                                    type='text' 
                                    inputProps={{style: {fontSize: 22}}}
                                    placeholder='weapon-used'
                                    //on change update redux store with new value
                                    onChange={(evt)=>setWeaponType(evt.target.value)}
                                    value={weaponType}
                                >
                                </Input>
                            </p>
                            <p className='editData'><span className='editItemDataDetails'>Land Type:</span> 
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel id="land-type-input-label">Land Type</InputLabel>
                                    <Select
                                        labelId="land-type-input-label"
                                        value={landType}
                                        //onchange
                                        //on change update redux store with new value
                                        onChange={(evt)=>setLandType(evt.target.value)}
                                        label="land-type"
                                        // onChange={(evt)=>setLandType(evt.target.value)}
                                    >
                                        <MenuItem value={'public'}>Public</MenuItem>
                                        <MenuItem value={'private'}>Private</MenuItem>
                                    </Select>
                                </FormControl>
                            </p>                        
                        </Grid>
                    </Grid>
                    <div>
                        <p className='postContent' >
                            <textarea
                                id='editTextArea'
                                required
                                placeholder="Tell the story..."
                                value={story} 
                                onChange={(evt)=>setStory(evt.target.value)}
                            //on change update redux store with new value
                            // onChange={(evt)=>setStory(evt.target.value)}
                            />
                        </p>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item sm={8}></Grid>
                        <Grid item sm={2}>    
                        <button className='cancelBtn' onClick={()=>history.push(`/home`)}>Cancel</button>
                        </Grid>
                        <Grid item sm={2}>
                        <button type='submit' className='submitBtn'>Submit</button>
                        </Grid>
                    </Grid>
                </div>
            </article>
            {/* image cropper to open on image upload */}
            {selectedFile ? 
                <ImageCropper 
                    id={selectedFile.id} 
                    imageUrl={selectedFile.imageUrl}
                    setFinalFile={setFinalFile}
                    setSelectedFile={setSelectedFile}
                    setImgUrl={setImgUrl}
                    bool={false}
                    // setCroppedImageFor={setCroppedImageFor}
                /> : null}
        </form> 
        </>
    )
};
    

export default NewPost;


//Original format if there are issues
{/* <article> */}
            
            {/* add post form info */}
            {/* <form onSubmit={submitHunt}> */}
                {/* Image container and input */}
                {/* {imgUrl.length>0 ? <img  className="preview" src={imgUrl}></img>: <figure>
                    <Input type='file' name="post_img" 
                    onChange = {changeHandler}
                    //original==onChange={(evt)=>setImage(evt.target.files[0])}
                    />
                </figure>} */}
                {/* header with  Title Input, profile name, date*/}
                {/* <header>
                    <Input 
                    type='Text' 
                    placeholder='Post Title' 
                    value={postTitle} 
                    onChange={(evt)=>setPostTitle(evt.target.value)} 
                    required/>
                    <p> {user.username} </p>
                    <p> {moment().format("MMM Do YYYY")}</p>
                </header> */}

                
                {/* section with  species, success, date of the hunt*/}
                {/* <section>

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

                </section> */}

                {/* section with location, weapon, land type  */}
                {/* <section>
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
                </section> */}

                {/* section with text input and store */}
                {/* <section>
                <TextareaAutosize
                    required
                    placeholder="Tell the story..."
                    style={{ width: 500, height:200 }}
                    value={story} onChange={(evt)=>setStory(evt.target.value)}
                />

                </section> */}
                {/* eventually have a sweet alert for submit */}
                {/* <button type="submit">Post</button>
                <button type='submit' className='submitBtn'>Submit</button>
                <button className='cancelBtn' onClick={()=>history.push(`/home`)}>Cancel</button>
            </form> */}

            {/* </article>
            image cropper activated by change handler
            {selectedFile ? 
                <ImageCropper 
                    id={selectedFile.id} 
                    imageUrl={selectedFile.imageUrl}
                    setFinalFile={setFinalFile}
                    setSelectedFile={setSelectedFile}
                    setImgUrl={setImgUrl}
                    // setCroppedImageFor={setCroppedImageFor}
                /> : null}
        */}