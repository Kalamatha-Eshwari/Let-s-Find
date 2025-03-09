import { initializeApp } from "firebase/app";

// Your Firebase configuration
const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain: "my-app-b53c8.firebaseapp.com",
  projectId: "my-app-b53c8",
  storageBucket: "my-app-b53c8.appspot.com",  
  messagingSenderId: "405214012885",
  appId: "1:405214012885:web:7e8a1cb8506f673592495c",
  measurementId: "G-7BTJP94V1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("🔥 Firebase App Initialized:", app.name);






// Function to dynamically import analytics (only on client side)
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch((error) => {
    console.error("Firebase Analytics failed to load:", error);
  });
}

// Export the Firebase app
export { app, analytics };
