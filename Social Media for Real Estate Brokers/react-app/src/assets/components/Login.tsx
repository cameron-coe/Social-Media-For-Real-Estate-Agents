function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // This is where I will submit the request to the Java server
    };

    return (
        <>
        <h1>This Will Be the Login Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username"></input>
            <br/>
            <input type="text" placeholder="Password"></input>
            <br/>
            <input type="submit" id="submit"></input>
        </form>
        </>
    )
}

export default Login;