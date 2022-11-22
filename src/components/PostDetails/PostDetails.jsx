//mui

import {
    Button,
    Stack, 
    Grid,
    Divider
} from '@mui/material';

//css
import './PostDetails.css'
//sweet alert import
const Swal = require('sweetalert2')
//import moment
import moment from 'moment';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import LikeButton from '../LikeButton/LikeButton';
import { Link } from 'react-router-dom';

function PostDetails(){

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

    const deletePost = () => {
        // console.log('in deletePost with id of', post.id);
        

        // console.log('selected post:', post);
       
         //original example of this sweet alert found in documentation found @
        //https://sweetalert2.github.io/
        Swal.fire({
        title: 'Are you sure you want to delete this post?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Your post has been deleted.'
            )
            //dispatch delete request to saga
            dispatch({
                type:'DELETE_POST',
                payload: {post_id: post.id, user_id: post.user_id}
            });
            //after delete head home
            history.push('/home');
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled'
            )
        }
        })
        


    // console.log('post:', post);
    }

    // console.log('in single post with post of:', post);
  
    //if they change url params to a post id that doesnt exist anymore (i.e. deleted they will see 404)
    // TODO = figure out how to redirect home without causing doubleclick async problem on home page
    if(!post.id){
        return <h1>404 Page Not Found</h1>;
    }
    
    return(
        <>
        <div className='postDetailsContainer'>
            <article className='postDetailsInnerContainer'>
                <h3 className='postDetailsTitle'>{post.title}</h3>
                <Grid container spacing={1}>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={4}><p className='username detailsHeader'>{post.username}</p></Grid>
                    <Grid item sm={3}>
                        
                    </Grid>
                    <Grid item sm={3}><p className='postDate detailsHeader'>{moment(post.created).format("MMM Do YYYY")}</p></Grid>
                    <Grid item sm={1}></Grid>
                </Grid>
                <div id='editHeaderBottom'></div>
    
                
            <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <a href={post.picture}><img className='imgContainer' src={post.picture}/></a>
                    </Grid>
                    <Grid item sm={6}>
                                    
                        <p className='detailsData top'><span className='postItemDataDetails'>Date of hunt:</span> {moment(post.date_of_hunt).format("MMM Do YYYY")}</p>
                        <p className='detailsData'><span className='postItemDataDetails'>Species:</span> {post.species}</p>
                        <p className='detailsData'><span className='postItemDataDetails'>Success:</span> {post.success ? <>Yes</> : <>No</>}</p>                        
                        <p className='detailsData'><span className='postItemDataDetails'>Location:</span> {post.hunt_area}</p>
                        <p className='detailsData'><span className='postItemDataDetails'>Weapon used:</span> {post.weapon_type}</p>
                        <p className='detailsData'><span className='postItemDataDetails'>Land Type:</span> {post.land_type}</p>                        
                    </Grid>
                    
            </Grid>
            <div className='postContent' >
                <p >{post.content}</p>
            </div>
    
            <Grid container spacing={2}>
                <Grid sm={10}></Grid>
                { user.id===post.user_id ?
                    <Grid sm={2}>
                        <Stack spacing={2} direction="row">
                            <button className='editBtn' onClick={()=>history.push(`/post/edit/${post.id}`)} type="text">Edit</button>
                            <button className='deleteBtn' onClick={deletePost} type="text">Delete</button>
                        </Stack>
                    </Grid>
                    :
                    null
                }
            </Grid>
        </article>
        </div>
    <div className='postDetailsContainer'>
        <article className='postDetailsInnerContainer'>
            <CommentList post={post}/>
        </article>
    </div>
    </>
    );
};


export default PostDetails;