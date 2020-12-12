import React, { useState } from "react"



function AddBlogForm({ handleAddBlog }){
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [addBlogVisibility, setaddBlogVisibility] = useState(false)


    function showAddBlog(){
        setaddBlogVisibility(true)
    }

    function hideAddBlog(){
        setaddBlogVisibility(false)
    }

    function handleTitleChange(event){
        setTitle(event.target.value)
    }

    function handleAuthorChange(event){
        setAuthor(event.target.value)
    }

    function handleUrlChange(event){
        setUrl(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        const blogData = { author, title, url }

        handleAddBlog(blogData)
        setAuthor("")
        setTitle("")
        setUrl("")
    }

    return(
        <section>
            <button
                style={{ display: addBlogVisibility ? "none" : "" }}
                onClick={ showAddBlog }
            >
                Add new blog
            </button>
            <form
                onSubmit={handleSubmit}
                style={{ display: addBlogVisibility ? "" : "none" }}
            >
                <h2>You can add a new blog here</h2>
                <div>
                    <label htmlFor="title">Blog Title</label>
                    <input
                        type="text"
                        value={ title }
                        onChange={ handleTitleChange }
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="author">Blog Author</label>
                    <input
                        type="text"
                        value={ author }
                        onChange={ handleAuthorChange }
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="url">Blog Url</label>
                    <input
                        type="text"
                        value={ url }
                        onChange={ handleUrlChange }
                    />
                </div>
                <br />
                <div>
                    <input type="submit" value="Add Blog"/>
                </div>
                <br/>
                <div>
                    <button type="button" onClick={ hideAddBlog } >Cancel</button>
                </div>
            </form>
            <br /><br />
        </section>
    )
}

export default AddBlogForm