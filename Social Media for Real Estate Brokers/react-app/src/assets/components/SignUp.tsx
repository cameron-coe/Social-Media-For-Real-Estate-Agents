function SignUp() {

    const handleSubmit = (event) => {
        event.preventDefault();

        const testData = {
            username: "u",
            password: "p",
            confirmPassword: "p"
        };

        // This is where I will submit the request to the Java server
        fetch('http://localhost:8081/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ testData })
        })
        .then (response => {
            console.log("HIT!");
            console.log(response);
        })
        .catch(error => {
            console.log("Sign-up failed")
            console.error('There was a problem with your fetch operation:', error);
        });
    };

    return (
        <>
        <h1>This Will Be the Sign-up Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username"></input>
            <br/>
            <input type="text" placeholder="Password"></input>
            <br/>
            <input type="text" placeholder="Confirm Password"></input>
            <br/>
            <input type="submit" id="submit"></input>
        </form>
        </>
    )
}

export default SignUp;