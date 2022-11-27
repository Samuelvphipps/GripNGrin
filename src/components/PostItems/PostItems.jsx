//mui
import {Stack, Button, Grid} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//sweet alert import
const Swal = require('sweetalert2')

//moment import
import moment from 'moment';

import './PostItems.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';


function PostItems({post}){

    //use History setup
    const history = useHistory();
    const dispatch = useDispatch();

    //get user information for conditional render
    const user = useSelector(store => store.user);
    // console.log('individual post information logged:', post);

    //Delete selected post information
    const deletePost = () => {
        // console.log('in deletePost with id of', post.id);
        //dispatch delete request to saga with sweet alert

        //original example of this sweet alert found @
        //https://sweetalert2.github.io/
        Swal.fire({
        title: 'Are you sure you want to delete this post?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        iconColor: 'red',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'red',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Your Post has been deleted.'
            )
            //dispatch delete request to saga on confirmation
            dispatch({
                type:'DELETE_POST',
                payload: {post_id: post.id, user_id: post.user_id}
            });
        } else if (            
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled'
            )
        }
        })        
    };
    
    const pushToDetails = () => {
        console.log('in pushtodetails fn')
        history.push(`/post/${post.id}`)
    };


    return(
        <li>
            <article className='postItem'>
                <div className='innerPostItem'>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>                            
                            <a href={post.picture}><img className='postItemImage' src={post.picture}/></a>                                
                        </Grid>
                        <Grid item sm={8}>
                                                
                            <div id='postItemTitle'>
                                <Grid container spacing={2}>
                                    
                                    <Grid item sm={3.5}><h3 className='postItemTitle'>{post.title}</h3></Grid>
                                    <Grid item sm={4}><p className='postItemHead username'>{post.username}</p></Grid>
                                    <Grid item sm={4}>
                                        <p className='postItemHead postDate'>{moment(post.created).format("MMM Do YYYY")}</p>
                                    </Grid>
                                        
                                </Grid>
                            </div>                                
                                <Grid container spacing={1}>                                    
                                    <Grid item sm={7}>              
                                            {/* on click push to the post details page of the clicked on post */}
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Date of hunt:</span>
                                            {moment(post.date_of_hunt).format("MMM Do YYYY")}
                                        </p>
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Species:</span> 
                                            {post.species}
                                        </p>                                                                                                                                        
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Success:</span> 
                                            {/* if true display yes else no */}
                                            {post.success ? <>Yes</> : <>No</>}
                                        </p>
                                    </Grid>                                                                
                                    <Grid item sm={5}>
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Location:</span> 
                                            {post.hunt_area}
                                        </p>
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Weapon used:</span> 
                                            {post.weapon_type}
                                        </p>
                                        <p className='linkToPost' onClick={pushToDetails}>
                                            <span className='postItemData'>Land Type:</span> 
                                            {post.land_type}
                                        </p>
                                    </Grid>                                    
                                </Grid>                                    
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item sm={1}></Grid>
                        <Grid item sm={10}>
                            <p className='postContent postContentItem' 
                            // on click go to the post details of this post. Only show the first 150 characters
                                onClick={pushToDetails}>{post.content.substring(0, 150) + '... '} 
                                <span className='seeMore'>See More</span>
                            </p>
                        </Grid>
                        <Grid item sm={1}></Grid>
                    </Grid>                
                <Grid id='gridBtns' container spacing={2}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={5.5}>
                        <LikeButton 
                            post={post}
                            user={user}
                            // send 0 to run conditional dispatch in like button to prevent an error
                            selectedId={0}
                        />
                    </Grid>
                    <Grid item sm={4.5}>
                        {/* if user owns this post show the edit and delete btn */}
                        { user.id===post.user_id ?
                            // <Stack spacing={2} direction="row">
                                <>
                                    <button 
                                        className='editItemBtn' 
                                        onClick={()=>history.push(`/post/edit/${post.id}`)} 
                                        type="text">
                                        Edit
                                    </button>
                                    <button 
                                    className='deleteItemBtn' 
                                    onClick={deletePost} 
                                    type="text"> 
                                        Delete 
                                    </button>
                                </>
                            // </Stack>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                </div>
            </article>
        </li>
    )
}

export default PostItems;