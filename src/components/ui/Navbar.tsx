import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { ListBulletIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const user = useUser()

  return (
    <div className="flex h-14 items-center justify-between bg-neutral-100 px-4 shadow-sm dark:bg-neutral-800">
      <div className="flex items-center gap-1">
        <ListBulletIcon className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />

        <span className="text-lg">tasks</span>
      </div>
      {!user.isSignedIn && <SignInButton />}
      {user.isSignedIn && (
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'rounded-xl',
              userButtonTrigger:
                'focus:shadow-none focus:ring focus:ring-teal-700 rounded-xl',
              userButtonPopoverCard: 'rounded-xl',
            },
          }}
        />
      )}
    </div>
  )
}
