import './PostItems.css';


function PostItems({post}){


    return(
        <li>
            <article >
                <div className='postBox'>
                    <div>
                        <div className="imgContainer">
                            <img src={post.picture}/>
                        </div>
                    </div>
                    <div className='bodyBox'>
                        <div>
                            <div className='titleRow'>
                                <h3>{post.title}</h3>
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
                    <p>{post.content}</p>
                </div>
                <button>LIKE!</button>
            </article>
        </li>
    )
}

export default PostItems;