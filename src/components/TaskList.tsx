import React from 'react'
import { api } from '~/utils/api'
import Task from '~/components/Task'
import { BigSpinner } from './ui/BigSpinner'
import SubmitTask from './SubmitTask'

export default function TaskList() {
  const { data, isLoading } = api.tasks.get.useQuery()

  return (
    <div className="w-full">
      <SubmitTask />
      <div className="flex w-full flex-col items-center gap-2">
        {isLoading && <BigSpinner />}

        {data?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
