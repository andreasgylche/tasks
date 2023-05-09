import { type PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function PageLayout(props: PropsWithChildren<{}>) {
  return (
    <main className="">
      <Navbar />
      <div className="flex flex-col items-center p-4 md:mx-auto md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
}
