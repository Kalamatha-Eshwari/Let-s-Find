"use client";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";

const JobPortalForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    location: "",
    skills: "",
    responsibilities: "",
    Apply: "",
    imageUrl: "", // Changed to imageUrl for URL input
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the job listing to Firestore with the image URL
      const db = getFirestore(app);
      const jobsCollectionRef = collection(db, "jobListings");
      await addDoc(jobsCollectionRef, {
        ...formData,
        createdAt: new Date(),
      });
      console.log("✅ Job added successfully");
      alert("Job posted successfully!");
    } catch (error) {
      console.error("❌ Firestore Connection Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="skills"
            placeholder="Required Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
          <textarea
            name="Apply"
            placeholder="Link to apply"
            value={formData.Apply}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>

          {/* Image URL Input */}
          <div className="w-full">
            <label className="block text-gray-700">Job Image URL (optional):</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Paste the image URL here"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPortalForm;
