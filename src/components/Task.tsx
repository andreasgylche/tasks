import React from 'react'
import { api } from '~/utils/api'
import { format } from 'date-fns'
import { Task } from '@prisma/client'

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
    <div key={task.id} className="flex gap-2">
      <span onClick={() => deleteTask({ id: task.id })}>❌</span>
      <span onClick={() => toggleStatus({ isDone: !task.done, id: task.id })}>
        ✅
      </span>
      <p>{task.task}</p>
      <span>{task.done ? 'Done' : 'Not done'}</span>
      <span>{format(task.createdAt, 'dd MMMM yyyy')}</span>
    </div>
  )
}
