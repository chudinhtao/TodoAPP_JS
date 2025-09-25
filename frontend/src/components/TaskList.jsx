import React from "react";
import TaskEmpty from "./TaskEmpty";
import TaskCard from "./TaskCard";

function TaskList({ listTask: list, handleChange, filter }) {
  if (!list || list.length == 0) {
    return <TaskEmpty filter={filter} />;
  }
  return (
    <div>
      {list.map((item, index) => {
        return (
          <TaskCard
            key={index}
            task={item}
            index={index}
            handleChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
