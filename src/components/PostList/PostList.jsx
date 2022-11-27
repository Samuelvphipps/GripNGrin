import PostItems from "../PostItems/PostItems";
import { useSelector } from 'react-redux';


function PostList(){

    //pull all posts from the redux store
    const posts = useSelector(store => store.posts.postsReducer);
    // console.log('posts is now (in postlist):', posts);

    // console.log('posts in postlist', posts);

    return(
        <>
            <ul>
                {/* map through posts array to render each post individually */}
                {posts.map((post) => 
                    <PostItems key={post.id} post={post}/>
                )}
            </ul>
        </>
    )
}

export default PostList;