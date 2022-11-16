import PostItems from "../PostItems/PostItems";
import { useSelector } from 'react-redux';


function PostList(){

    //pull posts from the redux store
    const posts = useSelector(store => store.posts.postsReducer);

    console.log('posts in postlist', posts);

    return(
        <>
            <h2>PostList</h2>
            <ul>
                {posts.map((post) => 
                    <PostItems key={post.id} post={post}/>
                )}
            </ul>
        </>
    )
}

export default PostList;