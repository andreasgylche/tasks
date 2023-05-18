import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import Head from 'next/head'

import PageLayout from '~/components/ui/Layout'
import TaskList from '~/components/TaskList'
import Welcome from '~/components/Welcome'
import { api } from '~/utils/api'

const Home: NextPage = () => {
  const tasks = api.tasks.get.useQuery()
  const incompleteTasks = tasks.data?.filter((task) => !task.done).length || 0
  const user = useUser()

  return (
    <>
      <Head>
        <title>{incompleteTasks} tasks remaining</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {!user.isSignedIn && <Welcome />}
        {user.isSignedIn && <TaskList />}
      </PageLayout>
    </>
  )
}

export default Home
