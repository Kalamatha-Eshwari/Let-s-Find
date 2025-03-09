"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
    }
  };

  // Get user first letter
  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#2C3E50] to-[#4CA1AF] shadow-lg text-white">
      {/* Left: Logo */}
      <img
        src="logon.png"
        className="w-[100px] rounded-full shadow-lg transform hover:scale-110 transition-all"
        alt="Logo"
      />

      {/* Right: Buttons & Profile Image */}
      <div className="flex items-center gap-8">
        {/* Navigation Buttons with custom hover effect */}
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/");
          }}
        >
          <span className="ml-2 hidden sm:block">Find jobs</span>
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/Display");
          }}
        >
          <span className="ml-2 hidden sm:block">Find projects</span>
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/create-project");
          }}
        >
          <span className="ml-2 hidden sm:block">Add projects</span>
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/create-post");
          }}
        >
          <span className="ml-2 hidden sm:block">Add Job</span>
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/create-resume");
          }}
        >
          <span className="ml-2 hidden sm:block">Your resume</span>
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#000042] to-[#000053] text-white rounded-full transition-all hover:bg-gradient-to-l hover:scale-110 hover:shadow-xl focus:outline-none"
          onClick={() => {
            return router.push("/profile");
          }}
        >
          <span className="ml-2 hidden sm:block">Profile</span>
        </button>

        {/* Sign In / Sign Out Button */}
        {session ? (
          <>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 bg-[#1c1c84] text-white rounded-full transition-all hover:bg-[#1a1a72] hover:scale-110 hover:shadow-xl focus:outline-none"
            >
              Sign Out
            </button>

            {/* Profile (First Letter) with Tooltip */}
            <div
              className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-[#000068] text-white text-lg font-semibold cursor-pointer transition-all hover:scale-125 hover:bg-[#000053] shadow-xl"
              title={session.user.email} // Tooltip
            >
              {getUserInitial(session.user.name)}
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-[#1c1c84] text-white rounded-full transition-all hover:bg-[#1a1a72] hover:scale-110 hover:shadow-xl focus:outline-none"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
