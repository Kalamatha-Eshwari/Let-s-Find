"use client";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";

const ProjectUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    techStack: "",
    difficultyLevel: "",
    githubUrl: "",
    demoUrl: "",
    resources: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore(app);
      const projectsCollectionRef = collection(db, "projects");
      await addDoc(projectsCollectionRef, { ...formData, createdAt: new Date() });
      console.log("✅ Project added successfully");
      alert("Project posted successfully!");
    } catch (error) {
      console.error("❌ Firestore Connection Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Upload a Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma-separated)"
            value={formData.techStack}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="difficultyLevel"
            placeholder="Difficulty Level (Beginner/Intermediate/Advanced)"
            value={formData.difficultyLevel}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="url"
            name="githubUrl"
            placeholder="GitHub URL"
            value={formData.githubUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="url"
            name="demoUrl"
            placeholder="Demo URL"
            value={formData.demoUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="resources"
            placeholder="Resources (optional)"
            value={formData.resources}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Project Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
