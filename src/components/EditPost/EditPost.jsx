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
    const user = useSelector(store => store.user);
    // console.log('selected post is:', selectedPost);

    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️
        dispatch({
            type: 'FETCH_SELECTED_POST',
            payload: params.id
        });

        dispatch({
            type: 'FETCH_COMMENTS',
            payload: params.id
        })
            
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);

    const [postTitle, setPostTitle] = useState(post.title);
    const [species, setSpecies] = useState(post.species);
    const [successful, setSuccessful] = useState(post.success);
    const [huntAreaId, setHuntAreaId] = useState(post.hunt_area);
    const [weaponType, setWeaponType] = useState(post.weapon_type);
    const [landType, setLandType] = useState(post.land_type);
    const [story, setStory] = useState(post.content);

    console.log('in single post with post of:', post);


        //todo: consolidate some data with spreaders - STRETCH

    const submitHunt = (evt) => {
        evt.preventDefault();

        //create payload of form data to send to saga (destructured)
        let payload = {
            postTitle,
            image,
            date: post.date_of_hunt,
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
            type: 'EDIT_POST',
            payload: payload
        });
        history.push('/home');
    };

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
                </div>
            </div>
            <div className='bodyBox'>
                <div>
                    <div className='titleRow'>
                        <h3><Input type='Text' placeholder='Post Title' value={postTitle} onChange={(evt)=>setPostTitle(evt.target.value)} required/></h3>
                        <p>{post.username}</p>
                        <p>{post.created}</p>
                    </div>
                </div>
                <div className='dataContainer'>
                    <div>
                        <p>Date of hunt: {post.date_of_hunt}</p>
                        <p>Species: {post.species}</p>
                        <p>Success: {post.success ? <>Yes</> : <>No</>}</p>
                    </div>
                    <div>
                        <p>Location: {post.hunt_area}</p>
                        <p>Weapon used: {post.weapon_type}</p>
                        <p>Land Type: {post.land_type}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className='postContent' >{post.content}</p>
        </div>
        <button>LIKE!</button>
    </form>
    <CommentList post={post}/>
    </>
    );
};


export default EditPost;