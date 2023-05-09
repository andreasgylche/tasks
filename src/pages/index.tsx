import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import { Spinner } from "~/components/ui/Spinner";
import SubmitTask from "~/components/SubmitTask";
import PageLayout from "~/components/ui/Layout";

const Home: NextPage = () => {
  const { data, isLoading } = api.tasks.get.useQuery();

  console.log(data);
  const ctx = api.useContext();

  const { mutate: toggleStatus } = api.tasks.toggleStatus.useMutation({
    onSuccess: () => {
      void ctx.tasks.get.invalidate();
    },
  });

  const { mutate: deleteTask } = api.tasks.delete.useMutation({
    onSuccess: () => {
      void ctx.tasks.get.invalidate();
    },
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <SubmitTask />
        {isLoading && <Spinner />}
        {data?.map((task) => (
          <div key={task.id} className="flex gap-2">
            <span onClick={() => deleteTask({ id: task.id })}>❌</span>
            <span
              onClick={() => toggleStatus({ isDone: !task.done, id: task.id })}
            >
              ✅
            </span>
            <p>{task.task}</p>
            <span>{task.done ? "Done" : "Not done"}</span>
            <span>{task.createdAt.toString()}</span>
          </div>
        ))}
      </PageLayout>
    </>
  );
};

export default Home;
