import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { api } from "~/utils/api";

export default function SubmitTask() {
  const [task, setTask] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.tasks.create.useMutation({
    onSuccess: () => {
      setTask("");
      void ctx.tasks.get.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void mutate({ content: task });
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full gap-2 p-4">
      <input
        type="text"
        placeholder="What are you gonna do today?"
        className="h-12 w-full rounded-xl border border-neutral-800 bg-transparent pl-12 focus:outline-none focus:ring focus:ring-neutral-700"
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={isPosting}
      />
      <button className="absolute ml-3 mt-3 flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700">
        <HiPlusSm color="#171717" size={20} />
      </button>
    </form>
  );
}
