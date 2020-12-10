import React from "react"



function LoginForm({username, password, setUsername, setPassword, handleLoginSubmit, error}){

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    return(
        <form onSubmit={handleLoginSubmit}>
            {
                error &&
                <p className="error-wrp">{error}</p>
            }
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