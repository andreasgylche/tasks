import React from 'react'
import { api } from '~/utils/api'
import Task from '~/components/Task'
import { BigSpinner } from './ui/BigSpinner'
import SubmitTask from './SubmitTask'

export default function TaskList() {
  const { data, isLoading } = api.tasks.get.useQuery()

  const completedTasks = data?.filter((task) => task.done).length
  const totalTasks = data?.length

  return (
    <div className="w-full">
      <SubmitTask />
      {!data || data.length === 0 ? (
        <div className="w-full text-center opacity-50">
          <span>You have no tasks.</span>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-2">
          <div className="mb-2 flex w-full justify-between text-sm opacity-50">
            <span>{totalTasks} total tasks</span>
            <span>
              {completedTasks} out of {totalTasks} done
            </span>
          </div>
          {isLoading && <BigSpinner />}
          {data?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
