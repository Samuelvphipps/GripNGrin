//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
            swalWithBootstrapButtons.fire(
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
            swalWithBootstrapButtons.fire(
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
        <article >
        <div className='postBox'>
            <div>
                <div className="imgContainer">
                    <a href={post.picture}><img src={post.picture}/></a>
                </div>
            </div>
            <div className='bodyBox'>
                <div>
                    <div className='titleRow'>
                        <h3>{post.title}</h3>
                        <p>{post.username}</p>
                        <p>{moment(post.created).format("MMM Do YYYY")}</p>
                        { user.id===post.user_id ?
                                <Stack spacing={2} direction="row">
                                    <Button onClick={()=>history.push(`/post/edit/${post.id}`)} variant="text">Edit</Button>
                                    <Button onClick={deletePost} variant="text">Delete</Button>
                                </Stack>
                                :
                                null
                            }
                    </div>
                </div>
                <div className='dataContainer'>
                    <div>
                        <p>Date of hunt: {moment(post.date_of_hunt).format("MMM Do YYYY")}</p>
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
        <LikeButton 
            post={post}
            user={user}
            selectedId={params.id}
        />

    </article>
    <CommentList post={post}/>
    </>
    );
};


export default PostDetails;