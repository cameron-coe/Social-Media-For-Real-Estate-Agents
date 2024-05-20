import React, { useState } from 'react';

interface PostGroupProps {
    posts: object[];
}

function PostGroup(props: PostGroupProps) {
    const [posts, setPosts] = useState(props.posts);

    let selectedPostId = -1;

    const getNoPostMessage = () => {
        return posts.length === 0 && <p>No Posts Were Found</p>;
    }

    const handleListItemClicked = (clickedPost) => {
        const updatedPosts = posts.map(post => {
            if (post.id === clickedPost.id) {
                if (post.userLiked === false) {
                    post.userLiked = true;
                    return { ...post, likes: post.likes + 1 }; // Update likes for the clicked post
                    
                } else {
                    post.userLiked = false;
                    return { ...post, likes: post.likes - 1 }; // Update likes for the clicked post
                    
                }
            }
            return post;
        });

        setPosts(updatedPosts); // Update state with the new array of posts
    
    }
    
    return (
        <>
            <h1>This Will Be the Post Group</h1>
            <ul className="list-group">
                { getNoPostMessage() }
                { posts.map((post) => (
                    <li 
                        className={post.userLiked ? 'list-group-item active' : 'list-group-item' }
                        key={post.id} 
                        onClick={() => handleListItemClicked(post)}
                    >
                        {post.text} -- {post.likes} likes
                    </li>
                )) }

            </ul>
        </>
    );
}

export default PostGroup;
