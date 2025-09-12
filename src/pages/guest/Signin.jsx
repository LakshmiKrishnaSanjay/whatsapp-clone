import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth"; 
import { auth, database, googleProvider } from "../../firebase/setup"; 
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to add user to Firestore
  const addUser = async () => {
    try {
      if (!auth.currentUser) return;

      await setDoc(doc(database, "Users", auth.currentUser.uid), {
        id: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        profileImage: auth.currentUser.photoURL,
      });

      console.log("User added successfully");
    } catch (err) {
      console.error("Error adding user: ", err);
    }
  };

  // Google Sign In function
  const googleSignIn = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      await addUser();
      const user = result.user;

      console.log("User Info:", user);
      alert(`Welcome ${user.displayName}`);

      // Redirect to homepage
      navigate("/homepage");
    } catch (err) {
      console.error("Sign-In Failed:", err);

      // Handle popup blocked case
      if (err.code === "auth/popup-blocked") {
        alert("Popup was blocked by your browser. Please allow popups for this site.");
      } else {
        alert("Sign-In Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300">
      <div className="bg-green-500 p-12 md:p-16 rounded-3xl shadow-lg text-center w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-white">
          Welcome to WhatsApp Clone
        </h1>
        <p className="text-white mb-8">Sign in to continue</p>

        <button
          onClick={googleSignIn}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 py-3 px-4 rounded-lg shadow hover:shadow-lg transition mb-4 disabled:opacity-50"
        >
          <img src="google.jpg" alt="Google Logo" className="w-6 h-6" />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <p className="text-white mt-6 text-sm">
          By signing in, you agree to our{" "}
          <span className="underline">Terms</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
