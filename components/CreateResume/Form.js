"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // or "next/router" based on your Next.js version
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userEmail = session?.user?.email; // User email from session

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data

  const db = getFirestore(app);

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    } else {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [userEmail]);

  const fetchUserProfile = async () => {
    try {
      const resumeRef = doc(db, "resumes", userEmail); // Assuming you're storing resume by email in "resumes" collection
      const resumeSnap = await getDoc(resumeRef);

      if (resumeSnap.exists()) {
        setUserProfile(resumeSnap.data()); // Store the fetched resume data
      } else {
        console.log("No resume found.");
      }
    } catch (error) {
      console.error("Error fetching user resume:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Loading your profile...
          </h2>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            No resume found.
          </h2>
          <button
            onClick={() => router.push("/upload-resume")}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/flat-lay-photo-office-desk-with-laptop-copy-space-background_1150-45598.jpg?w=360')`, backgroundSize: 'cover' }}>
      <div className="flex max-w-5xl bg-white p-10 rounded-lg shadow-xl w-full">
        {/* Left Side: Resume Content */}
        <div className="w-1/2 pr-8 space-y-6 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            {userProfile.name ? `${userProfile.name}'s Resume` : "Your Resume"}
          </h2>

          <div className="grid grid-cols-2 gap-x-8">
            <div className="font-semibold">Name:</div>
            <div>{userProfile.name}</div>

            <div className="font-semibold">Email:</div>
            <div>{userProfile.email}</div>

            <div className="font-semibold">Phone:</div>
            <div>{userProfile.phone}</div>

            <div className="font-semibold">Skills:</div>
            <div>{userProfile.skills?.join(", ")}</div>

            <div className="font-semibold">Degree:</div>
            <div>{userProfile.education?.degree}</div>

            <div className="font-semibold">University:</div>
            <div>{userProfile.education?.university}</div>

            <div className="font-semibold">Graduation Year:</div>
            <div>{userProfile.education?.year}</div>

            {/* Displaying the Google Drive Link */}
            <div className="font-semibold">Resume Drive Link:</div>
            <div>
              {userProfile.drive ? (
                <a
                  href={userProfile.drive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {userProfile.drive}
                </a>
              ) : (
                <span className="text-gray-500">No Google Drive link provided</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/98/07/2c/98072ca2a47d1b75a06a7f68b17b52b7.jpg"
            alt="Profile Image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
