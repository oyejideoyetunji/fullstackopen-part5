import React from "react"



function AddBlogForm(
        { title, author, url, setBlogTitle, setBlogAuthor, setBlogUrl, handleAddBlog }
    ){

    function handleTitleChange(event){
        setBlogTitle(event.target.value)
    }

    function handleAuthorChange(event) {
        setBlogAuthor(event.target.value)
    }

    function handleUrlChange(event) {
        setBlogUrl(event.target.value)
    }

    return(
        <form onSubmit={handleAddBlog}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="author"></label>
                <input
                    type="text"
                    value={author}
                    onChange={handleAuthorChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="url"></label>
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            <br />
            <div>
                <input type="submit" value="Add Blog"/>
            </div>
        </form>
    )
}

export default AddBlogForm