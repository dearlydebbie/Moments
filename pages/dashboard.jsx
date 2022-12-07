import React from "react";
import { db, myAuth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Comments from "../components/Comments";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Link from "next/link";

function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(myAuth);
  const [userComments, setUserComments] = React.useState([]);

  console.log(user);

  const getUser = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    //Getting comments from cloud firestore
    const collectionRef = collection(db, "posts");
    const data = query(collectionRef, where("user", "==", user.uid));
    const unsub = onSnapshot(data, (snapshot) => {
      setUserComments(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
    return unsub;
  };

  //Deleting a post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id); //Reference to the post you want to delete by given it the id
    await deleteDoc(docRef);
  };

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div>
      <div>
        {userComments.map((comment) => {
          return (
            <Comments {...comment} key={comment.id}>
              <div className="grid gap-4">
                <button
                  onClick={() => deletePost(comment.id)}
                  className="flex items-center gap-2"
                >
                  <BsFillTrashFill color="red" /> Delete
                </button>
                <Link
                  href={{ pathname: "/post", query: comment }}
                  legacyBehavior
                >
                  <button className="flex items-center gap-2">
                    <BsFillPencilFill color="blue" /> Edit
                  </button>
                </Link>
              </div>
            </Comments>
          );
        })}
      </div>
      <button
        className="my-6 bg-blue-400 py-2 px-6 rounded-sm"
        onClick={() => myAuth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
