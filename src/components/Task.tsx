import React from 'react'
import { api } from '~/utils/api'
import { format } from 'date-fns'
import type { Task } from '@prisma/client'

export default function Task({ task }: { task: Task }) {
  const ctx = api.useContext()

  const { mutate: toggleStatus } = api.tasks.toggleStatus.useMutation({
    onSuccess: () => {
      void ctx.tasks.get.invalidate()
    },
  })

  const { mutate: deleteTask } = api.tasks.delete.useMutation({
    onSuccess: () => {
      void ctx.tasks.get.invalidate()
    },
  })
  return (
    <div
      key={task.id}
      className={`flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-200 p-3 dark:bg-neutral-800 ${
        task.done ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col">
        <p className={`max-w-prose text-sm ${task.done ? 'line-through' : ''}`}>
          {task.task}
        </p>

        <span className="text-xs opacity-50">
          {format(task.createdAt, 'dd MMMM yyyy')}
        </span>
      </div>
      <div className="flex gap-2">
        <span
          onClick={() => toggleStatus({ isDone: !task.done, id: task.id })}
          className="cursor-pointer rounded-lg border border-neutral-700 px-2 py-1 text-sm transition-colors hover:border-teal-700 hover:bg-teal-700/10"
        >
          Done
        </span>

        <span
          onClick={() => deleteTask({ id: task.id })}
          className="cursor-pointer rounded-lg border border-neutral-700 px-2 py-1 text-sm transition-colors hover:border-pink-700 hover:bg-pink-700/10"
        >
          Delete
        </span>
      </div>
    </div>
  )
}
