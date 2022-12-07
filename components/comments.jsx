import React from "react";
import { myAuth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function Comments({ children, comment, profilePic, name }) {
  const [user, loading] = useAuthState(myAuth);
  const route = useRouter();


  return (
    <div className='bg-green-800 text-white shadow-lg rounded-lg p-8 border-r-4 my-4'>
      <div className="flex items-center gap-3">
        <img className="rounded-full w-10 " src={profilePic} alt="" />
        <h2>{name}</h2>
      </div>
      <div className="py-5">
        {comment}
      </div>
      {children}
    </div>
  );
}

export default Comments;
