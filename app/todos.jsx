import { TodoItems } from "@/components/ServerComponent";
import React from "react";

const Todos = ({ tasks }) => {
  return (
    <section className="todosContainer">
      {tasks?.map((task) => (
        <TodoItems
          key={task._id}
          title={task.title}
          description={task.description}
          id={task._id}
          completed={task.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
