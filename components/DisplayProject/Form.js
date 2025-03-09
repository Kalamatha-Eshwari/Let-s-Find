"use client";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore(app);
        const projectsCollectionRef = collection(db, "projects");
        const querySnapshot = await getDocs(projectsCollectionRef);

        const projectsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Projects</h2>
        <p className="text-gray-600">Explore the amazing projects uploaded by users</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">{project.title}</h3>
            <p className="text-gray-700 mt-2">{project.techStack}</p>
            <p className="text-gray-600 mt-1">Difficulty: {project.difficultyLevel}</p>
            <div className="mt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub Repo
              </a>
              {project.demoUrl && (
                <span className="ml-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Live Demo
                  </a>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
