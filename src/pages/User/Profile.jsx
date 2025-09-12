import React, { useState, useEffect } from "react";
import { auth, storage } from "../../firebase/setup";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/setup";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState("/default-avatar.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  // Listen for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPreview(currentUser.photoURL || "/default-avatar.png");
        setName(currentUser.displayName || "");
      } else {
        setUser(null);
        setPreview("/default-avatar.png");
        setName("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle profile image change
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove profile image
  const handleRemoveImage = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { photoURL: null });
      setPreview("/default-avatar.png");
      setSelectedFile(null);
      alert("Profile picture removed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to remove profile picture");
    }
  };

  // Save profile image
const handleSaveImage = async () => {
  if (!user || !selectedFile) return;
  setSaving(true);

  try {
    // 1️⃣ Upload image to Firebase Storage
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, selectedFile);

    // 2️⃣ Get download URL
    const photoURL = await getDownloadURL(storageRef);

    // 3️⃣ Update Firebase Auth
    await updateProfile(user, { photoURL });

    // 4️⃣ Update Firestore user document
    const userDocRef = doc(database, "Users", user.uid);
    await updateDoc(userDocRef, { profileImage: photoURL });

    setPreview(photoURL);
    setSelectedFile(null);
    alert("Profile picture updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to save profile picture");
  } finally {
    setSaving(false);
  }
};


const handleSaveName = async () => {
  if (!user) return;
  try {
    // 1️⃣ Update Firebase Auth
    await updateProfile(user, { displayName: name });

    // 2️⃣ Update Firestore user document
    const userDocRef = doc(database, "Users", user.uid);
    await updateDoc(userDocRef, { username: name });

    alert("Name updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update name");
  }
};

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 flex justify-center items-start pt-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold text-sky-900 mb-6 text-center">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover mb-3"
          />
          <div className="flex gap-2">
            <label className="cursor-pointer text-sky-600 hover:underline">
              Change
              <input type="file" className="hidden" accept="image/*" onChange={handleChangeImage} />
            </label>
            <button onClick={handleRemoveImage} className="text-red-600 hover:underline">
              Remove
            </button>
          </div>
          {selectedFile && (
            <button
              onClick={handleSaveImage}
              disabled={saving}
              className="mt-3 bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
            >
              {saving ? "Saving..." : "Save Image"}
            </button>
          )}
        </div>

        {/* Editable Name */}
        <div className="w-full mb-4">
          <label className="block text-gray-700 text-center mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-center font-medium focus:outline-none focus:ring-1 focus:ring-sky-600"
          />
          <button
            onClick={handleSaveName}
            className="mt-2 bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition w-full"
          >
            Save Name
          </button>
        </div>


      </div>
    </div>
  );
};

export default Profile;
