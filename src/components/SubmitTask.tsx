import React, { useState } from 'react'
import { PlusSmallIcon } from '@heroicons/react/24/outline'
import { api } from '~/utils/api'
import { SmallSpinner } from './ui/SmallSpinner'

export default function SubmitTask() {
  const [task, setTask] = useState('')

  const ctx = api.useContext()

  const { mutate, isLoading: isPosting } = api.tasks.create.useMutation({
    onSuccess: () => {
      setTask('')
      void ctx.tasks.get.invalidate()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void mutate({ content: task })
  }

  return (
    <form onSubmit={handleSubmit} className="relative mb-4 flex w-full gap-2">
      <input
        type="text"
        placeholder="What are you gonna do today?"
        className="h-12 w-full rounded-xl border bg-transparent pl-12 focus:outline-none focus:ring focus:ring-neutral-300 dark:border-neutral-800 dark:focus:ring-neutral-700"
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={isPosting}
      />
      <button
        disabled={!task}
        className="absolute ml-3 mt-3 flex h-6 w-6 items-center justify-center rounded-lg bg-pink-700 dark:bg-teal-700"
      >
        {isPosting ? (
          <SmallSpinner />
        ) : (
          <PlusSmallIcon className="h-5 w-5 text-neutral-100 dark:text-neutral-900" />
        )}
      </button>
    </form>
  )
}
