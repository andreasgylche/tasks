import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";

export default function Navbar() {
  const user = useUser();

  return (
    <div className=" flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">Tasks</h1>
      {!user.isSignedIn && <SignInButton />}
      {user.isSignedIn && <UserButton />}
    </div>
  );
}
