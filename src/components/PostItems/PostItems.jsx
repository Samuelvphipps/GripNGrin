//mui
import {Stack, Button, Grid} from '@mui/material';


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
        title: 'Are you sure?',
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
            'Your Post has been deleted.'
            )
            //dispatch delete request to saga
            dispatch({
                type:'DELETE_POST',
                payload: {post_id: post.id, user_id: post.user_id}
            });
        } else if (
            /* Read more about handling dismissals below */
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
                                                    <Grid item sm={4}><p className='postItemHead'>{post.username}</p></Grid>
                                                    <Grid item sm={3}><p className='postItemHead'>{moment(post.created).format("MMM Do YYYY")}</p></Grid>
                                                 
                                            </Grid>
                                        </div>
                                    
                                        <Grid container spacing={1}>
                                            
                                                <Grid item sm={7}>
                                                    <p><span className='postItemData'>Date of hunt:</span> {moment(post.date_of_hunt).format("MMM Do YYYY")}</p>
                                                    <p><span className='postItemData'>Species:</span> {post.species}</p>
                                                    <p><span className='postItemData'>Success:</span> {post.success ? <>Yes</> : <>No</>}</p>
                                                </Grid>
                                           
                                            
                                                <Grid item sm={5}>
                                                    <p><span className='postItemData'>Location:</span> {post.hunt_area}</p>
                                                    <p><span className='postItemData'>Weapon used:</span> {post.weapon_type}</p>
                                                    <p><span className='postItemData'>Land Type:</span> {post.land_type}</p>
                                                </Grid>
                                           
                                        </Grid>
                                    
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={10}>
                                <p className='postContent' onClick={pushToDetails}>{post.content.substring(0, 240) + '...'}</p>
                            </Grid>
                            <Grid item sm={1}></Grid>
                        </Grid>
                    
                    <Grid container spacing={2}>
                        <Grid item sm={2}></Grid>
                        <Grid item sm={6}>
                            <LikeButton 
                                post={post}
                                user={user}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            { user.id===post.user_id ?
                                                    <Stack spacing={2} direction="row">
                                                        <Button onClick={()=>history.push(`/post/edit/${post.id}`)} variant="text">Edit</Button>
                                                        <Button onClick={deletePost} variant="text">Delete</Button>
                                                    </Stack>
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