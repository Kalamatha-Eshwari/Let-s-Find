import JobListings from "../components/JobListings";

export default function Home() {
  return (
    <div className="pt-10"> {/* Top padding added here */}
      <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-[#FF6347] to-[#00BFFF] text-transparent bg-clip-text">
        Welcome to Job Portal
      </h1>
      <p className="text-lg text-center text-gray-500 mt-4">
        Find your next career opportunity or post your job today.
      </p>
      <JobListings />
    </div>
  );
}
