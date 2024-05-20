import SignUp from "./assets/components/SignUp";
import PostGroup from "./assets/components/PostGroup";
import Login from "./assets/components/Login";
import MakePost from "./assets/components/MakePost";

function App() {

  let loadedPosts = [
    {
        id: 1,
        userLiked: false,
        text: "I am so mad about what Red Corp did!!!",
        likes: 20
    },
    {
        id: 2,
        userLiked: false,
        text: "There was a cool bird outsied the office today",
        likes: 2
    },
    {
        id: 3,
        userLiked: false,
        text: "CUTE CAT!!!1!",
        likes: 146
    }
];

  return (
    <>
      <div><SignUp></SignUp></div>
      <br/>
      <div><Login></Login></div>
      <br/>
      <div><PostGroup posts={loadedPosts}></PostGroup></div>
      <br/>
      <div><MakePost></MakePost></div>
    </>
  )
}

export default App;