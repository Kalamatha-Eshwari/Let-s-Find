import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Uploads a resume file to Firebase Storage and returns the download URL.
 */
export const uploadResume = async (userId, file) => {
    if (!file) return null;

    try {
        const storageRef = ref(storage, `resumes/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("❌ Resume upload failed:", error);
        return null;
    }
};

/**
 * Saves or updates a user's resume details in Firestore.
 */
export const saveResume = async (userId, resumeData) => {
    try {
        const docRef = doc(db, "resumes", userId);
        await setDoc(docRef, { ...resumeData, createdAt: new Date() }, { merge: true });
        console.log("✅ Resume saved successfully!");
    } catch (error) {
        console.error("❌ Error saving resume:", error);
    }
};

/**
 * Fetches a user's resume details from Firestore.
 */
export const getResume = async (userId) => {
    try {
        const docRef = doc(db, "resumes", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No resume found.");
            return null;
        }
    } catch (error) {
        console.error("❌ Error fetching resume:", error);
        return null;
    }
};
