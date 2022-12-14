//mui
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Input from '@mui/material/Input';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import{
    Button,
    Stack,
    Input,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextareaAutosize,
    Grid
} from '@mui/material';

import './EditPost.css';

//sweet alert import
const Swal = require('sweetalert2')
//moment
import moment from 'moment';


//date formatter

import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import ImageCropper from '../ImageUpload/ImageCropper';


function EditPost(){

    //setup useParams and useDispatch
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //useSelecter to get singlepost from redux and user from redux
    const editPost = useSelector(store => store.editPost.editPostReducer);
    //get huntarea list
    const huntAreaList = useSelector(store=>store.huntAreasReducer);
    // console.log('selected post is:', selectedPost);

    //image processing information
    //chosen file
    const [selectedFile, setSelectedFile] = useState(null);
    //output of the cropper
    const [finalFile, setFinalFile] = useState(null);
    //image url created in cropper for conditional render
    const [imgUrl, setImgUrl] = useState(null);
    


    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️

        //TODO fetch edit comment

        dispatch({
            type: 'FETCH_EDIT_POST',
            payload: params.id
        });

        if(finalFile != null){
            dispatch({
                type: 'UPDATE_EDIT_POST',
                payload: {picture: finalFile}
            })
        }
        
        //fetch huntareas
        dispatch({ type: 'FETCH_HUNT_AREAS' });
    
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);


    //if they change url params to a post id that doesnt exist anymore (i.e. deleted they will see 404)
    // TODO = figure out how to redirect home without causing doubleclick async problem on home page
    if(!editPost.id){
        return <h1>404 Page Not Found</h1>;
    }
    
    const submitEditPost = (evt) => {
        //prevent default
        evt.preventDefault();
        console.log('in sbmitEditPost fn');


        //send post to saga for axios put request
        dispatch({
            type: 'EDIT_POST',
            payload: editPost
        });

        Swal.fire('Your edited post is live!')
        .then((result) => {
            history.push(`/post/${params.id}`);
          })

    }
        //dispatch the new cropped image
        // const dispatchNewFile = (file) => {
        //     console.log('file is', file)

        // }

        //on change activate cropper
        const changeHandler = (event) => {
            console.log('in changeHandler');
            //setSelected file in useState, activates the conditional render of the imageCropper
            setSelectedFile({imageUrl: URL.createObjectURL(event.target.files[0])});

        }


            /*
            In this return the values are pulled from the editPost info pulled from redux. On change they update redux with new data. This keeps redux state
            in synce with form prior to the axios.put.
            On submital of the form the submit edit post dispatches the info the SAGA where the conditional axios request takes place depending
            on the presence of an image
            */ 
    return(
        <>
            
            
            <form onSubmit={submitEditPost}>
                <article className='postDetailsContainer'>
                    <div className='postDetailsInnerContainer'>
                        <h3 className='editPostDetailsTitle'>
                            <Input type='Text' 
                                multiline={true}
                                value={editPost.title}
                                style={{ width: 500, fontSize:40, height: 100}}
                                
                                //add in dispatch fn
                                //on change update redux store with new value
                                onChange={(evt) => dispatch({
                                    type: 'UPDATE_EDIT_POST',
                                    payload: {title: evt.target.value}
                                })}
                                placeholder='Post Title' 
                                required
                            />
                        </h3>
                        <header className='editHeader'>
                            <Grid container spacing={1}>
                                <Grid item sm={1}></Grid>
                                <Grid item sm={4}><p className='username editDetailsHeader'>{editPost.username}</p></Grid>
                                <Grid item sm={3}></Grid>
                                <Grid item sm={3}>
                                    <p className='postDate editDetailsHeader'>
                                        {moment(editPost.created).format("MMM Do YYYY")
                                    }</p>
                                </Grid>
                                <Grid item sm={1}></Grid>
                            </Grid>
                        </header>
                        <div id='editHeaderBottom'></div>                                            
                        <Grid container spacing={4}>
                            <Grid item sm={6}>
                                {/* img preview. If new image show image in the imgContainer instead of original image */}
                            { finalFile ? <img className='imgContainer' src={imgUrl}/> :
                                    <img className='imgContainer' src={editPost.picture}/>
                                
                                }
                                <div className='editImageInput'>
                                    <input 
                                        className='inputBtn'
                                        type='file' 
                                        // call changeHandler fn for the image cropper activity
                                        onChange={changeHandler}
                                        // onChange={(evt) => dispatch({
                                        //     type: 'UPDATE_EDIT_POST',
                                        //     payload: {picture: evt.target.files[0]}
                                        // })}
                                        name="post_img"/>
                                </div>
                            </Grid>
                            <Grid item sm={6}>
                                            
                                <p className='editData top'><span className='editItemDataDetails'>Date of hunt:    </span> 
                                    <Input 
                                        required 
                                        value={format(parseISO(editPost.date_of_hunt), 'yyyy-MM-dd')}
                                        inputProps={{style: {fontSize: 22}}}
                                        type='date'
                                        //on change update redux store with new value
                                        onChange={(evt) => dispatch({
                                            type: 'UPDATE_EDIT_POST',
                                            payload: {date_of_hunt: evt.target.value}
                                        })}
                                    >
                                    </Input>
                                </p>
                                <p className='editData'><span className='editItemDataDetails'>Species:    </span> 
                                    <Input 
                                        type='text' 
                                        placeholder='Species'
                                        inputProps={{style: {fontSize: 22, height:44}}} 
                                        required
                                        value={editPost.species}
                                        //on change update redux store with new value
                                        onChange={(evt) => dispatch({
                                            type: 'UPDATE_EDIT_POST',
                                            payload: {species: evt.target.value}
                                        })}
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
                                                value={editPost.success}
                                                //on change update redux store with new value    
                                                onChange={(evt) => dispatch({
                                                    type: 'UPDATE_EDIT_POST',
                                                    payload: {success: evt.target.value}
                                                })}                                          
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
                                                value={editPost.hunt_area_id ? editPost.hunt_area_id : ''}
                                                //on change update redux store with new value
                                                onChange={(evt) => dispatch({
                                                    type: 'UPDATE_EDIT_POST',
                                                    payload: {hunt_area_id: evt.target.value}
                                                })}                               
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
                                        onChange={(evt) => dispatch({
                                            type: 'UPDATE_EDIT_POST',
                                            payload: {weapon_type: evt.target.value}
                                        })}
                                        value={editPost.weapon_type}
                                    >
                                    </Input>
                                </p>
                                <p className='editData'><span className='editItemDataDetails'>Land Type:</span> 
                                    <FormControl style={{minWidth: 120}}>
                                        <InputLabel id="land-type-input-label">Land Type</InputLabel>
                                        <Select
                                            labelId="land-type-input-label"
                                            value={editPost.land_type}
                                            //onchange
                                            //on change update redux store with new value
                                            onChange={(evt) => dispatch({
                                                type: 'UPDATE_EDIT_POST',
                                                payload: {land_type: evt.target.value}
                                            })}
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
                                    value={editPost.content} 
                                    onChange={(evt) => dispatch({
                                        type: 'UPDATE_EDIT_POST',
                                        payload: {content: evt.target.value}
                                    })}
                                //on change update redux store with new value
                                // onChange={(evt)=>setStory(evt.target.value)}
                                />
                            </p>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item sm={8}></Grid>
                            <Grid item sm={2}>                     
                                       {/* if user cancels edit, return to post details view (no new changes made)  */}
                                <button 
                                    className='cancelBtn' 
                                    onClick={()=>history.push(`/post/${params.id}`)}
                                >
                                        Cancel
                                </button>                                
                            </Grid>
                            <Grid item sm={2}>
                                <button type='submit' className='submitBtn'>Submit</button>                                
                            </Grid>
                        </Grid>
                    </div>
                </article>
                {/* image cropper to open on image upload */}
                
            </form>  
            {/* image cropper component called on the upload of a new file */}
            {selectedFile ? 
                <ImageCropper 
                //pass props needed for the image cropper
                    id={selectedFile.id} 
                    imageUrl={selectedFile.imageUrl}
                    setFinalFile={setFinalFile}
                    setSelectedFile={setSelectedFile}
                    setImgUrl={setImgUrl}
                    bool={true}
                    // setCroppedImageFor={setCroppedImageFor}
                /> : null}
        </>
    );
};


export default EditPost;




//OLD FORMAT
{/* <form onSubmit={submitEditPost}>
        <div className='postBox'>
            <div>
                <div className="imgContainer">
                    { finalFile ? <img className='imgContainer' src={imgUrl}/> :
                        <img className='imgContainer' src={editPost.picture}/>
                    
                    }
                    
                    <Input type='file' 
                    onChange={changeHandler}
                    // onChange={(evt) => dispatch({
                    //     type: 'UPDATE_EDIT_POST',
                    //     payload: {picture: evt.target.files[0]}
                    // })}
                    name="post_img"/>
                </div>
            </div>
            <div className='bodyBox'>
                <div>
                    <div className='titleRow'>
                        <h3>
                            <Input type='Text' 
                                value={editPost.title}
                                //add in dispatch fn
                                //on change update redux store with new value
                                onChange={(evt) => dispatch({
                                    type: 'UPDATE_EDIT_POST',
                                    payload: {title: evt.target.value}
                                })}
                                placeholder='Post Title' 
                                required
                            />
                        </h3>
                        <p>{editPost.username}</p>
                        <p>{editPost.created}</p>
                    </div>
                </div>
                <div className='dataContainer'>
                    <div>
                        <p>Date of hunt: </p>
                         
                            <Input 
                                required 
                                value={format(parseISO(editPost.date_of_hunt), 'yyyy-MM-dd')}
                                type='date'
                                //on change update redux store with new value
                                onChange={(evt) => dispatch({
                                    type: 'UPDATE_EDIT_POST',
                                    payload: {date_of_hunt: evt.target.value}
                                })}
                            >
                            </Input>
                            
                        <p>Species: </p>
                            <Input 
                                type='text' 
                                placeholder='Species' 
                                required
                                value={editPost.species}
                                //on change update redux store with new value
                                onChange={(evt) => dispatch({
                                    type: 'UPDATE_EDIT_POST',
                                    payload: {species: evt.target.value}
                                })}
                                //on change
                            ></Input>                            
                        <p>Success:</p> 
                            <FormControl fullWidth>
                                <InputLabel>Succesful Hunt?</InputLabel>
                                    <Select
                                        required
                                        labelId="successful-input-label"                                                
                                        label="successful-hunt"
                                        value={editPost.success}
                                        //on change update redux store with new value    
                                        onChange={(evt) => dispatch({
                                            type: 'UPDATE_EDIT_POST',
                                            payload: {success: evt.target.value}
                                        })}                                          
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                            </FormControl>
                    </div>
                    <div>
                        <p>Location:</p>
                            <FormControl fullWidth>
                                <InputLabel required id="huntarea-input-label">Hunt Area</InputLabel>
                                    <Select
                                        labelId="huntarea-input-label"
                                        //have the input be empty until the hunt area id arrives (prevents an error)
                                        value={editPost.hunt_area_id ? editPost.hunt_area_id : ''}
                                        //on change update redux store with new value
                                        onChange={(evt) => dispatch({
                                            type: 'UPDATE_EDIT_POST',
                                            payload: {hunt_area_id: evt.target.value}
                                        })}                               
                                        label="hunt-area"
                                    >
                                        {huntAreaList.map((area)=>{
                                            return <MenuItem key={area.id} value={area.id}>{area.hunt_area}</MenuItem>
                                        })}

                                    </Select>
                            </FormControl>
                        <p>Weapon used:</p>
                        <Input 
                            type='text' 
                            placeholder='weapon-used'
                            //on change update redux store with new value
                            onChange={(evt) => dispatch({
                                type: 'UPDATE_EDIT_POST',
                                payload: {weapon_type: evt.target.value}
                            })}
                            value={editPost.weapon_type}
                        >
                        </Input>
                        <p>Land Type:</p>
                        <FormControl fullWidth>
                        <InputLabel id="land-type-input-label">Land Type</InputLabel>
                            <Select
                                labelId="land-type-input-label"
                                value={editPost.land_type}
                                //onchange
                                //on change update redux store with new value
                                onChange={(evt) => dispatch({
                                    type: 'UPDATE_EDIT_POST',
                                    payload: {land_type: evt.target.value}
                                })}
                                label="land-type"
                                // onChange={(evt)=>setLandType(evt.target.value)}
                            >
                                <MenuItem value={'public'}>Public</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                    </FormControl>
                    </div>
                </div>
            </div>
        </div>
        <div>
        <TextareaAutosize
                    required
                    placeholder="Tell the story..."
                    style={{ width: 500, height:200 }}
                    value={editPost.content} 
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_POST',
                        payload: {content: evt.target.value}
                    })}
                    //on change update redux store with new value
                    // onChange={(evt)=>setStory(evt.target.value)}
                />
        </div>
        <Button type='submit'>Submit</Button>


    </form> */}