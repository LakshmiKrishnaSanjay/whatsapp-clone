# WhatsApp-like Chat Application (React + Firebase)

## Overview
This is a minimal **WhatsApp-like one-to-one chat application** built with **React (frontend)** and **Firebase (backend-as-a-service)**.  
It supports authentication, user profiles, contact search, and real-time chat.  
---

##  Features Implemented
- Google Sign-in Authentication  
- Editable user profile (name)  
- Contacts / Users list with search  
- One-to-one chats with real-time updates  
---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whatsapp-clone.git
   cd whatsapp-clone

2. Install dependencies:

npm install

3. src/firebase/setup.js


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "******",
  authDomain: "******",
  projectId: "******",
  storageBucket: "******",
  messagingSenderId: "******",
  appId: "******",
  measurementId: "******F"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app)
export const storage = getStorage(app);
export const database = getFirestore(app)
export default app;

4. Run 

npm run dev