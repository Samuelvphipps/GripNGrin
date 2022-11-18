//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';



import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';

function EditPost(){

    //setup useParams and useDispatch
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //useSelecter to get singlepost from redux and user from redux
    const post = useSelector(store => store.posts.selectedPostReducer);
    const huntAreaList = useSelector(store=>store.huntAreasReducer);
    const user = useSelector(store => store.user);
    // console.log('selected post is:', selectedPost);

    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️
        dispatch({
            type: 'FETCH_SELECTED_POST',
            payload: params.id
        });
        //TODO fetch edit comment

        dispatch({
            type: 'FETCH_EDIT_POST',
            payload: params.id
        });
        
        //fetch huntareas
        dispatch({ type: 'FETCH_HUNT_AREAS' });
    
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);


    // console.log('in single post with post of:', post);


        //todo: consolidate some data with spreaders - STRETCH


    //if they change url params to a post id that doesnt exist anymore (i.e. deleted they will see 404)
    // TODO = figure out how to redirect home without causing doubleclick async problem on home page
    if(!post.id){
        return <h1>404 Page Not Found</h1>;
    }
    
    return(
        <>
        <form >
        <div className='postBox'>
            <div>
                <div className="imgContainer">
                    <img src={post.picture}/>
                    <Input type='file' name="post_img"/>
                </div>
            </div>
            <div className='bodyBox'>
                <div>
                    <div className='titleRow'>
                        <h3><Input type='Text' placeholder='Post Title' required/></h3>
                        <p>{post.username}</p>
                        <p>{post.created}</p>
                    </div>
                </div>
                <div className='dataContainer'>
                    <div>
                        <p>Date of hunt: </p>
                            <Input required type='date'></Input>
                            
                        <p>Species: </p>
                            <Input type='text' placeholder='Species' required></Input>                            
                        <p>Success:</p> 
                            <FormControl fullWidth>
                                <InputLabel>Succesful Hunt?</InputLabel>
                                    <Select
                                        required
                                        labelId="successful-input-label"                                                
                                        label="successful-hunt"
                                        value={''}                                                
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
                                        value={''}
                                        label="hunt-area"
                                    >
                                        {huntAreaList.map((area)=>{
                                            return <MenuItem key={area.id} value={area.id}>{area.hunt_area}</MenuItem>
                                        })}

                                    </Select>
                            </FormControl>
                        <p>Weapon used:</p>
                        <Input type='text' placeholder='weapon-used'></Input>
                        <p>Land Type:</p>
                        <FormControl fullWidth>
                        <InputLabel id="land-type-input-label">Land Type</InputLabel>
                            <Select
                                labelId="land-type-input-label"
                                value={''}
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
                    // value={story} onChange={(evt)=>setStory(evt.target.value)}
                />
        </div>
    </form>
    <CommentList post={post}/>
    </>
    );
};


export default EditPost;