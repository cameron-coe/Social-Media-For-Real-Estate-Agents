function MakePost() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // This is where I will submit the request to the Java server
    };

    return (
        <>
        <h1>This Will Be the Make Post Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Share Something"></input>
            <br/>
            <input type="submit" id="submit"></input>
        </form>
        </>
    )
}

export default MakePost;