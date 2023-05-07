import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

import { api } from "~/utils/api";
import { Spinner } from "~/components/ui/Spinner";

const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.tasks.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>
          {!user.isSignedIn && <SignInButton />}
          {user.isSignedIn && <UserButton />}
        </div>
        <div>
          {isLoading && <Spinner />}
          {data?.map((task) => (
            <div key={task.id}>
              {task.title} - {task.done ? "Done" : "Not done"}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
