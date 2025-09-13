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
- Message timestamps displayed under each chat message  
---

## Features Not Implemented

- Email + Password Authentication (since PDF says both Google + Email/Password).
- Presence (last seen / online status)
- Message status (sent / delivered / seen)
- Media upload/sharing — attempted but faced CORS policy errors with Firebase Storage

- SonarQube Setup (static code analysis not included)  
- OpenAPI (Swagger) API Documentation (not included)  


##  Known Issues
- Media upload failed due to **CORS policy errors** with Firebase Storage.  
  - I attempted to fix this by downloading and setting up the **Google Cloud SDK** and applying a CORS configuration:
    ```bash
    gsutil cors set cors.json gs://<your-storage-bucket>
    ```
  - Despite applying the rules, uploads were still blocked by the browser.  

 Because of this blocker, **media upload/sharing is not functional** in the current build.


## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whatsapp-clone.git
   cd whatsapp-clone

2. Install dependencies:

npm install

3. create src/firebase/setup.js


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

5. Deployment Notes (Firebase Hosting)

npm run build
firebase login
firebase init hosting
firebase deploy