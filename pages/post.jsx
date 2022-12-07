import React from "react";
import { myAuth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function Post() {
  const [user, loading] = useAuthState(myAuth);
  const route = useRouter();
  const routeData = route.query;
  console.log(routeData);

  const [form, setForm] = React.useState({
    comment: "",
  });

  //submitting the form
  const formSubmit = async (e) => {
    e.preventDefault();

    if (!form.comment) {
      toast.error("Empty field", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (form.comment.length > 300) {
      toast.error("You have reached the limit", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (form?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", form.id); // post i want to get from the database
      const updatedPost = { ...form, timestamp: serverTimestamp() }; //updated post
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //Make a comment in the form that sends it to the firebase database
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...form,
        timestamp: serverTimestamp(),
        user: user.uid,
        profilePic: user.photoURL,
        name: user.displayName,
      });
      //After the post is added to the firebase database, clear the form field and go the home page
      setForm({ comment: "" });
      return route.push("/");
    }
  };

  const handleChange = (e) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    //Checks if the comment has an id which means it has been stored in cloud firestore
    if (routeData.id) {
      setForm({ comment: routeData.comment, id: routeData.id });
    }
  };

  React.useState(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-10 p-12 shadow-lg  mx-auto">
      <form onSubmit={formSubmit}>
        <h1 className="text-2xl font-bold underline">
          {form.hasOwnProperty("id") ? "Edit your post" : "Start A New Post"}
        </h1>
        <div className="py-3">
          <h3>Content</h3>
          <textarea
            name="comment"
            onChange={handleChange}
            value={form.comment}
            className="bg-neutral-500 h-48 w-full text-white outline-none p-2 rounded-lg"
          ></textarea>
          <p
            className={`text-sm ${
              form.comment.length > 300 ? "text-red-700" : "text-indigo-800"
            }`}
          >
            {form.comment.length}/300
          </p>
          <button className="w-full bg-gray-900 text-white rounded-sm py-1 px-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;