import React, { useState } from "react"
import PropTypes from "prop-types"



function AddBlogForm({ handleAddBlog, togglerRef }){
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")


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

        togglerRef.current.setVisibility(false)
    }

    return(
        <form
            onSubmit={handleSubmit}
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
        </form>
    )
}

AddBlogForm.propTypes = {
    handleAddBlog: PropTypes.func.isRequired,
    togglerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object })
    ]).isRequired
}

export default AddBlogForm