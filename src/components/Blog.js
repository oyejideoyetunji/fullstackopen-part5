import React, { useState } from "react"


function Blog({ blog, user, handleDeleteBlog, handleUpdateBlog }){
    const [detailsVisibility, setDetailsVisbility] = useState(false)

    function toggleDetailsVisibility(){
        setDetailsVisbility(!detailsVisibility)
    }

    function deleteBlog(){
        handleDeleteBlog(blog)
    }

    function updateBlogLikes(){
        const newBlogData = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1
        }

        handleUpdateBlog(newBlogData)
        // FIXME: Likes update should be rendered faster
    }

    return(
        <div className="blog-card">
            <p>
                { blog.title } { blog.author }
                <button type="button" onClick={ toggleDetailsVisibility }>
                    { detailsVisibility ? "Hide" : "View" }
                </button>
            </p>
            <div style={{ display: detailsVisibility ? "" : "none" }}>
                <p> {blog.url} </p>
                <p>
                    Likes:{` ${blog.likes} `}
                    <button type="button" onClick={updateBlogLikes} >Like</button>
                </p>
                <p> {blog.user.name} </p>
                {
                    user.id === blog.user.id ?
                        <button type="button" onClick={ deleteBlog }>
                            Remove Blog
                        </button> :
                        null
                }
            </div>
        </div>
    )
}

export default Blog
