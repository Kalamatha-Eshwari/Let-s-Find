import { getFirestore, doc, setDoc, getDoc, collection } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

// Function to check and create collection
export const createProject = async (docId, data) => {
    try {
        const docRef = doc(db, "Projects", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // Create the document if it doesn't exist
            await setDoc(docRef, data);
            console.log("Project added successfully!");
        } else {
            console.log("Project already exists!");
        }
    } catch (error) {
        console.error("Error creating project:", error);
    }
};
