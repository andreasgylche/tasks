import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const user = useUser();

  console.log(user);

  return (
    <div className="flex h-14 items-center justify-between bg-neutral-800 px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <FiCheckSquare />
        <span className="mb-[2px] text-xl">tasks</span>
      </div>
      {!user.isSignedIn && <SignInButton />}
      {user.isSignedIn && <UserButton />}
    </div>
  );
}
