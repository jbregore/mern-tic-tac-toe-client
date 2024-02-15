import Navbar from "@/components/navbar/Navbar";
import ProfileCard from "@/components/profile/ProfileCard";
import React from "react";

const Profile = () => {
  return (
    <main className="min-h-screen pt-32">
      <Navbar activeLink="profile" />

      <ProfileCard />
    </main>
  );
};

export default Profile;
