import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"

function App(){
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        async function getBlogs(){
            const blogs = await blogService.getAll()
            if(blogs) setBlogs( blogs )
        }
        getBlogs()
    }, [])

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem("currentUser"))
        if(userData){
            blogService.setToken(userData.token)
            setUser(userData)
        }
    }, [])

    async function handleLoginSubmit(event){
        event.preventDefault()

        const userFormData = { username, password }
        try{
            const userData = await loginService.login(userFormData)
            setUsername("")
            setPassword("")
            if(userData){
                window.localStorage.setItem("currentUser", JSON.stringify(userData))
                blogService.setToken(userData.token)
                setUser(userData)
            }
        }catch(error){
            setErrorMessage("invalid username or password")
            setTimeout(() =>{
                setErrorMessage(null)
            }, 5000)
        }

    }

    if(!user) return(
        <main>
            <h1>Login to proceed</h1>
            <LoginForm
                error={errorMessage}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLoginSubmit={handleLoginSubmit}
            />
        </main>
    )

    return (
        <div>
            <h2>blogs</h2>
            {
                blogs.map(
                    blog => <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
}

export default App