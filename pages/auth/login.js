import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase, myAuth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"


function Login() {
  const provider = new GoogleAuthProvider();
  const app = initFirebase();
  const route = useRouter();
  const [user, loading] = useAuthState(myAuth)
  console.log(app)

  /*const googleProvider = new GoogleAuthProvider()
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
    } catch {

    }
  }*/

const auth = getAuth();
const signIn = async () => {
  const result = await signInWithPopup(auth, provider);
  route.push("/")
}  



React.useEffect(() => {
  if(user) {
    route.push("/")
  } else {
    console.log("There is no user")
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div className="shadow-xl mt-32 p-10 border-2 rounded-lg text-center bg-black text-white">
      
      <div className="py-4 mx-auto grid gap-3">
        <h3 className="text-xl">Sign In</h3>
        <button onClick={signIn} className="flex items-center text-center mx-auto text-xl text-black bg-gray-300 p-2 px-4 rounded-md hover:bg-gray-900 duration-300 hover:text-white">
          <FcGoogle />
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
