import React from "react";
import Image from "next/image";
import { myAuth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Comments from "../components/Comments";
import {
  arrayUnion,
  Timestamp,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = React.useState(""); //The comment of a user
  const [allMessage, setAllMessage] = React.useState([]); //All comments from under the post of a user

  //Sending a message
  const sendMessage = async () => {
    //Check if a user is logged in
    if (!myAuth.currentUser) return router.push("/auth/login");

    if (!message) {
      toast.error("Please leave a message", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id); //Getting the message the user wants to comment on via the id in the cloud firestore
    await updateDoc(docRef, {
      //Post the comment in the cloud firestore by using arrayUnion method
      comments: arrayUnion({
        message,
        profilePic: myAuth.currentUser.photoURL,
        name: myAuth.currentUser.displayName,
        timePosted: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  React.useEffect(() => {
    //Getting the comments on the post from cloud firestore
    const postComments = async () => {
      const docRef = doc(db, "posts", routeData.id); //Reference to the post
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setAllMessage(snapshot.data().comments);
      });
      return unsubscribe;
      /*const docSnap = await getDoc(docRef); // Accessing it
    setAllMessage(docSnap.data().comments); //Taking the comments array from the data
    console.log(setAllMessage) */
    };

    if (!router.isReady) return;
    postComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  // the dependency array is router.isReady because anytime you refresh the comments load immediately

  return (
    <div>
      <Comments {...routeData}></Comments>

      <div className="my-2">
        <div>
          <input
            className="px-4 py-2 w-full "
            type="text"
            value={message}
            placeholder="Send a message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-800 text-sm py-2 px-4 rounded-md my-4 text-white"
          >
            Send Message
          </button>
        </div>

        <div className="my-4">
          <h2 className="text-xl font-semibold text-blue-900 underline">
            Comments From Other People
          </h2>
          {allMessage?.map((message) => {
            return (
              <div className="my-6 border-2 border-green-700 p-4" key={message.timePosted}>
                <div className="flex items-center gap-2">
                  {/* Check from line 37 if don't get how I got the data values */}
                  <img className="rounded-full w-10" src={message.profilePic} alt="Profile Pic"  />
                  <h2>{message.name}</h2>
                </div>
                <p className="my-2">{message.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Details;
