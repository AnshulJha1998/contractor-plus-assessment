import { MouseEvent, MouseEventHandler } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { FORM_VALUES } from "./common/types";
import "./App.css";
import GroupedTasks from "./components/grouped-tasks/GroupedTasks";

export default function App() {
  const { register, handleSubmit, formState, control, watch } =
    useForm<FORM_VALUES>({
      defaultValues: {
        title: "",
        expireyDate: Date.now(),
        groups: [],
      },
    });

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "groups",
    control,
  });

  const submitBtn = (data: FORM_VALUES) => console.log(data);

  const addGroup: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({
      groupId: uuidv4(),
      task: [
        {
          taskId: uuidv4(),
          taskTitle: "",
          desc: "",
          material: [
            {
              materialId: uuidv4(),
              name: "",
              rate: null,
              quantity: null,
              total: 0,
            },
          ],
        },
      ],
    });
  };

  const removeGroup =
    (groupIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      remove(groupIndex);
    };

  return (
    <main>
      <form
        onSubmit={handleSubmit(submitBtn)}
        className="border-padding"
        noValidate
      >
        <div className="label-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: 15,
            })}
          />
        </div>

        <p>{errors.title?.message}</p>

        <div className="label-input">
          <label htmlFor="expireyDate">Expiry Date</label>
          <input
            type="date"
            id="expireyDate"
            {...register("expireyDate", {
              required: "Expiry Date is required",
            })}
          />
        </div>

        <p>{errors.expireyDate?.message}</p>

        <div className="label-input">
          <label htmlFor="group">Add Group</label>
          <button onClick={addGroup}>+</button>
        </div>

        <div className="groups">
          {fields.map((group, groupIndex) => (
            <div key={group.id || groupIndex} className="group border-padding">
              <div className="label-input">
                {" "}
                <h3>{`Group ${groupIndex + 1}`}</h3>
                <button onClick={removeGroup(groupIndex)}>Remove Group</button>
              </div>

              <GroupedTasks
                key={group.groupId}
                control={control}
                register={register}
                groupIndex={groupIndex}
                errors={errors}
                watch={watch}
              />
            </div>
          ))}
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
