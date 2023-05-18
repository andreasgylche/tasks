import React from 'react'
import { api } from '~/utils/api'
import { format } from 'date-fns'
import type { Task } from '@prisma/client'
import TaskSpinner from './ui/TaskSpinner'

export default function Task({ task }: { task: Task }) {
  const ctx = api.useContext()

  const { mutate: toggleStatus, isLoading: isToggling } =
    api.tasks.toggleStatus.useMutation({
      onSuccess: () => {
        void ctx.tasks.get.invalidate()
      },
    })

  const { mutate: deleteTask, isLoading: isDeleting } =
    api.tasks.delete.useMutation({
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
          className="flex w-[52px] cursor-pointer items-center justify-center rounded-lg border border-neutral-700 px-2 py-1 text-sm transition-colors hover:border-emerald-700 hover:bg-emerald-700/10"
        >
          {isToggling ? <TaskSpinner /> : task.done ? 'Undo' : 'Done'}
        </span>

        <span
          onClick={() => deleteTask({ id: task.id })}
          className="flex w-[68px] cursor-pointer items-center justify-center rounded-lg border border-neutral-700 px-2 py-1 text-sm transition-colors hover:border-rose-700 hover:bg-rose-700/10"
        >
          {isDeleting ? <TaskSpinner /> : 'Delete'}
        </span>
      </div>
    </div>
  )
}
