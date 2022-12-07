import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { myAuth } from "../utils/firebase";

function Navbar() {
  const [user, loading] = useAuthState(myAuth);
  console.log(user);

  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" legacyBehavior>
        <button className="text-lg font-semibold">The Writer</button>
      </Link>

      <ul className="flex items-center gap-10">
        {user ? (
          <div className="flex items-center gap-6">
            <Link href={"/post"} legacyBehavior>
              <a className="text-sm text-white bg-slate-500 p-2 px-4 rounded-md hover:bg-slate-900 duration-300">
                Make A Post
              </a>
            </Link>
            <Link href={"/dashboard"} legacyBehavior>
              <img className="w-12 rounded-full cursor-pointer" src={user.photoURL} alt="profile" />
            </Link>
          </div>
        ) : (
          <Link href={"/auth/login"} legacyBehavior>
            <a className="text-sm text-white bg-slate-500 p-2 px-4 rounded-md hover:bg-slate-900 duration-300">
              Sign In
            </a>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
