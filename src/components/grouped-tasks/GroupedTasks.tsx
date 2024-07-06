import { MouseEvent, MouseEventHandler } from "react";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { GROUPED_TASKS } from "../../common/types";
import Material from "../material/Material";

export default function GroupedTasks({
  control,
  register,
  groupIndex,
}: GROUPED_TASKS) {
  const { fields, append, remove } = useFieldArray({
    name: `groups.${groupIndex}.task`,
    control,
  });

  const addTask: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({
      taskId: uuidv4(),
      taskTitle: "",
      desc: "",
      material: [
        {
          materialId: uuidv4(),
          name: "",
          rate: "",
          quantity: "",
          total: "",
        },
      ],
    });
  };

  const removeTask =
    (taskIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      remove(taskIndex);
    };

  return (
    <>
      {fields.map((task, taskIndex) => (
        <div
          key={task.id || taskIndex}
          className="tasks-material-contianer border-padding"
        >
          <div className="task-field">
            <div className="name-remove">
              {" "}
              <h4>{`Task ${taskIndex + 1}`}</h4>{" "}
              {fields.length > 1 ? (
                <button onClick={removeTask(taskIndex)}>Remove Task</button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="task-inputs">
              {" "}
              <input
                placeholder="Task Title"
                {...register(
                  `groups.${groupIndex}.task.${taskIndex}.taskTitle`,
                  {
                    required: true,
                  }
                )}
                defaultValue={task.taskTitle}
              />
              <textarea
                placeholder="Task Desc"
                {...register(`groups.${groupIndex}.task.${taskIndex}.desc`, {
                  required: true,
                })}
                defaultValue={task.desc}
              />
            </div>
          </div>

          <Material
            control={control}
            register={register}
            groupIndex={groupIndex}
            taskIndex={taskIndex}
          />
        </div>
      ))}
      <button onClick={addTask}>Add Task</button>
    </>
  );
}
