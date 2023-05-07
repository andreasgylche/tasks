import React from "react";

export default function SubmitTask() {
  return (
    <div className="flex w-full gap-2 p-4">
      <input
        type="text"
        placeholder="Add task"
        className="h-10 w-full rounded bg-neutral-800 px-2 outline-none placeholder:text-base placeholder:text-neutral-100/50"
      />
      <button className="h-10 w-10 bg-neutral-800 px-2">+</button>
    </div>
  );
}
