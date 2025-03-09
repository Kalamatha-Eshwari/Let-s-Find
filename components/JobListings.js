"use client";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig"; // Adjust the path if needed

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const db = getFirestore(app);
      const jobsCollection = collection(db, "jobListings");
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Jobs</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-screen-xl">
          {jobs.map((job) => (
            <div key={job.id} className="flex p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 bg-white">
              {job.imageUrl && (
                <div className="w-1/2 pr-6">
                  <img
                    src={job.imageUrl}
                    alt={job.jobTitle}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{job.jobTitle}</h3>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-600 mb-2"><strong>Skills:</strong> {job.skills}</p>
                <a
                  href={job.Apply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Apply Here
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">No job listings available.</p>
      )}
    </div>
  );
};

export default JobListings;
