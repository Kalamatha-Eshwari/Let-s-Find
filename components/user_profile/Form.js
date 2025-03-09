"use client";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    degree: "",
    university: "",
    year: "",
    drive: "", // Added drive field for Google Drive link
  });

  const db = getFirestore(app);

  useEffect(() => {
    if (userEmail) fetchResume();
  }, [userEmail]);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const resumeRef = doc(db, "resumes", userEmail);
      const resumeSnap = await getDoc(resumeRef);

      if (resumeSnap.exists()) {
        const docData = resumeSnap.data();
        setFormData({
          name: docData.name || "",
          email: docData.email || "",
          phone: docData.phone || "",
          skills: docData.skills ? docData.skills.join(", ") : "",
          degree: docData.education?.degree || "",
          university: docData.education?.university || "",
          year: docData.education?.year || "",
          drive: docData.drive || "", // Populate the drive link if available
        });
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) return alert("Please log in to save your resume.");

    try {
      await setDoc(doc(db, "resumes", userEmail), {
        ...formData,
        skills: formData.skills.split(", "),
        education: {
          degree: formData.degree,
          university: formData.university,
          year: formData.year,
        },
      });
      alert("Resume updated successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Profile & Resume
        </h2>
        <div className="flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeeaCTTyrL9HZdW2bmrlr-edN1fFhNxjLyfmyMUdoP34H8HPocRASP6rWVVo_wdwnebU&usqp=CAU"
            alt="User Profile"
            className="w-24 h-24 rounded-full border border-gray-300"
          />
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              disabled
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="year"
              placeholder="Graduation Year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            {/* Added input field for Google Drive link */}
            <input
              type="text"
              name="drive"
              placeholder="Resume Drive Link"
              value={formData.drive}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Update Resume
            </button>
          </form>
        )}
        <button
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
