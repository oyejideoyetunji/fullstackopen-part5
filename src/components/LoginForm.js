import React, { useState } from "react"



function LoginForm({ handleLogin }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()

        const userFormData = { username, password }
        handleLogin(userFormData)
        setUsername("")
        setPassword("")
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <br /><br />
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <br />
            <div>
                <input
                    type="submit"
                    value="Login"
                />
            </div>
        </form>
    )
}

export default LoginForm