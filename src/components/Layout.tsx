import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { selectCurrentUser } from "../redux/authSlice";
import { User as ApiUser } from "../redux/api"; 

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(selectCurrentUser) as ApiUser | null; 
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Alvin's Blog Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export { Layout };
