import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import AddBlogForm from "./components/AddBlogForm"
import StatusDisplay from "./components/StatusDisplay"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"



function App(){
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
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
            if(blogs) setBlogs( blogs )
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
                    state: "success",
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
            if(newBlog)
            console.log(newBlog, newBlog.user)
                setBlogs(blogs.concat(newBlog))
                setStatus({
                    state: "success",
                    message: `A new blog ${newBlog.title}, By ${newBlog.user.name} was added`
                })
                setTimeout(() => {
                    setStatus(null)
                }, 7000)
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

    function logOut(){
        window.localStorage.removeItem("currentUser")
        blogService.setToken(null)
        setUser(null)
    }

    if(!user) return(
        <main>
            <h1>Login to proceed</h1>
            <StatusDisplay status={status} />
            <LoginForm handleLogin={ handleLogin } />
        </main>
    )

    return (
        <main>
            <StatusDisplay status={ status } />
            <h1>Blogs</h1>
            <p>
                {user.name.toUpperCase()} logged in
                <button onClick={logOut}> Logout </button>
            </p>
            <AddBlogForm handleAddBlog={ handleAddBlog } />
            {
                blogs.map(
                    blog => <Blog key={blog.id} blog={blog} />
                )
            }
        </main>
    )
}

export default App