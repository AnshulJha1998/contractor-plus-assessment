import { useFieldArray } from "react-hook-form";
import { MaterialProps } from "../../common/types";
import { v4 as uuidv4 } from "uuid";
import { MouseEvent, MouseEventHandler } from "react";

const Material = ({
  control,
  register,
  groupIndex,
  taskIndex,
}: MaterialProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `groups.${groupIndex}.task.${taskIndex}.material`,
    control,
  });

  const addMaterial: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({
      materialId: uuidv4(),
      name: "",
      rate: "",
      quantity: "",
      total: "",
    });
  };

  const removeMaterial =
    (materialIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      remove(materialIndex);
    };

  return (
    <>
      <div>
        {fields.map((item, materialIndex) => (
          <div key={item.id} className="material-container border-padding">
            <div className="name-remove">
              <h5>{`Material ${materialIndex + 1}`} </h5>
              <button onClick={removeMaterial(materialIndex)}>
                Remove Material
              </button>
            </div>
            <div className="material-fields">
              {" "}
              <input
                placeholder="Material Name"
                {...register(
                  `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.name`,
                  { required: true }
                )}
                defaultValue={item.name}
              />
              <input
                placeholder="Quantity"
                {...register(
                  `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.quantity`,
                  { required: true }
                )}
                defaultValue={item.quantity}
              />
              <input
                placeholder="Rate"
                {...register(
                  `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.rate`,
                  { required: true }
                )}
                defaultValue={item.rate}
              />
              <input
                placeholder="Total"
                {...register(
                  `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.total`,
                  { required: true }
                )}
                defaultValue={item.total}
              />
            </div>
          </div>
        ))}
        <button onClick={addMaterial}>Add Material</button>
      </div>
    </>
  );
};

export default Material;
