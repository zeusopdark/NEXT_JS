import React, { Suspense } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Todos from "./todos";
import AddToDoForm from "./addTodoForm";
const FetchTodo = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache", //SSR server side rendering evertime it will be load data will not be catched
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      return [];
    }
    return data.tasks;
  } catch (err) {}
};
const Page = async () => {
  const token = cookies().get("token")?.value;
  // console.log(token);
  if (!token) return redirect("/login");
  const tasks = await FetchTodo(token);
  // console.log(tasks);
  return (
    <div className="container">
      <AddToDoForm />
      <Suspense fallback={<div>loading ...</div>}>
        <Todos tasks={tasks} />
      </Suspense>
    </div>
  );
};

export default Page;
