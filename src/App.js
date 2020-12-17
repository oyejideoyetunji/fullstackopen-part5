import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import AddBlogForm from "./components/AddBlogForm"
import StatusDisplay from "./components/StatusDisplay"
import Toggler from "./components/Toggler"
import blogService from "./services/blog"
import loginService from "./services/login"
import "./App.css"



function App(){
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogFormTogglerRef = useRef(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem("currentUser"))
        if (userData) {
            blogService.setToken(userData.token)
            setUser(userData)
        }
    }, [])

    useEffect(() => {
        async function getBlogs(){
            const blogs = await blogService.getAll()
            if (blogs) setBlogs(blogs.sort((bloga, blogb) => blogb.likes - bloga.likes))
        }
        getBlogs()
    }, [])

    async function handleLogin(userFormData){
        try{
            const userData = await loginService.login(userFormData)
            if(userData){
                window.localStorage.setItem("currentUser", JSON.stringify(userData))
                blogService.setToken(userData.token)
                setUser(userData)
                setStatus({
                    state:   "success",
                    message: "You logged in successfuly"
                })
                setTimeout(() => {
                    setStatus(null)
                }, 5000)
            }
        }catch(error){
            setStatus({
                state:   "error",
                message: "invalid username or password"
            })
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }

    }

    async function handleAddBlog(blogData){
        try{
            const newBlog = await blogService.create(blogData)
            if(newBlog){
                setBlogs(blogs.concat(newBlog).sort((bloga, blogb) => blogb.likes - bloga.likes))
                setStatus({
                    state:   "success",
                    message: `A new blog ${newBlog.title}, By ${newBlog.user.name} was added`
                })
                setTimeout(() => {
                    setStatus(null)
                }, 7000)
            }
        }catch(error){
            setStatus({
                state:   "error",
                message: error.response.data.message
            })
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }

    async function handleUpdateBlog(newBlogData){
        try{
            const updatedBlog = await blogService.update(newBlogData.id, newBlogData)
            const updatedBlogs = blogs.map(blog => {
                return blog.id === updatedBlog.id ? updatedBlog : blog
            })

            setBlogs(updatedBlogs.sort((bloga, blogb) => blogb.likes - bloga.likes))
        }catch(error){
            return null
        }
    }

    async function handleDeleteBlog(blogToDelete){
        const shouldDelete = window.confirm(`Delete blog ${blogToDelete.title} ?`)
        if (!shouldDelete) return null

        try{
            await blogService.deleteBlog(blogToDelete.id)
            const newBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
            setBlogs(newBlogs.sort((bloga, blogb) => blogb.likes - bloga.likes))
            setStatus({
                state:   "success",
                message: `Blog ${blogToDelete.title} deleted successfully`
            })
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }catch(error){
            setStatus({
                state: "error",
                message: "An error occured while trying to delete the blog please try again"
            })
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }

    function logOut(){
        window.localStorage.removeItem("currentUser")
        blogService.setToken(null)
        setUser(null)
    }

    if(!user) return(
        <main>
            <h1>Login to proceed</h1>
            <StatusDisplay status={ status } />
            <LoginForm handleLogin={ handleLogin } />
        </main>
    )

    return (
        <main>
            <StatusDisplay status={ status } />
            <h1>Blogs List</h1>
            <p>
                { user.name.toUpperCase() } logged in
                <button onClick={logOut}> Logout </button>
            </p>
            <Toggler ref={blogFormTogglerRef} buttonLabel="Add new blog">
                <AddBlogForm
                    handleAddBlog={handleAddBlog}
                    togglerRef={blogFormTogglerRef}
                />
            </Toggler>
            {
                blogs.map(
                    blog => <Blog
                        blog={blog}
                        user={user}
                        key={blog.id}
                        handleDeleteBlog={handleDeleteBlog}
                        handleUpdateBlog={handleUpdateBlog}
                    />
                )
            }
        </main>
    )
}

export default App