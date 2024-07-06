import { useFieldArray } from "react-hook-form";
import { MATERIAL_PROPS } from "../../common/types";
import { v4 as uuidv4 } from "uuid";
import { MouseEvent, MouseEventHandler } from "react";

const Material = ({
  control,
  register,
  groupIndex,
  taskIndex,
  errors,
  watch,
}: MATERIAL_PROPS) => {
  const { fields, append, remove } = useFieldArray({
    name: `groups.${groupIndex}.task.${taskIndex}.material`,
    control,
  });

  const addMaterial: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    append({
      materialId: uuidv4(),
      name: "",
      rate: null,
      quantity: null,
      total: 0,
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
        {fields.map((item, materialIndex) => {
          const quantity = watch(
            `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.quantity`
          );
          const rate = watch(
            `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.rate`
          );

          return (
            <div key={item.id} className="material-container border-padding">
              <div className="name-remove">
                <h5>{`Material ${materialIndex + 1}`} </h5>
                <button onClick={removeMaterial(materialIndex)}>
                  Remove Material
                </button>
              </div>
              <div className="material-fields">
                <div className="material-field">
                  {" "}
                  <input
                    placeholder="Material Name"
                    {...register(
                      `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.name`,
                      { required: "Please specify material name" }
                    )}
                    defaultValue={item.name}
                  />
                  {errors?.groups?.[groupIndex]?.task?.[taskIndex]?.material?.[
                    materialIndex
                  ]?.name && (
                    <p className="error-message">
                      {
                        errors.groups[groupIndex].task[taskIndex].material[
                          materialIndex
                        ].name.message
                      }
                    </p>
                  )}
                </div>

                <div className="material-field">
                  {" "}
                  <input
                    placeholder="Quantity"
                    type="number"
                    {...register(
                      `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.quantity`,
                      {
                        required: "Please specify material quantity",
                        valueAsNumber: true,
                      }
                    )}
                    defaultValue={item.quantity || 0}
                  />
                  {errors?.groups?.[groupIndex]?.task?.[taskIndex]?.material?.[
                    materialIndex
                  ]?.quantity && (
                    <p className="error-message">
                      {
                        errors.groups[groupIndex].task[taskIndex].material[
                          materialIndex
                        ].quantity.message
                      }
                    </p>
                  )}
                </div>
                <div className="material-field">
                  {" "}
                  <input
                    placeholder="Rate"
                    type="number"
                    {...register(
                      `groups.${groupIndex}.task.${taskIndex}.material.${materialIndex}.rate`,
                      {
                        required: "Please specify material rate",
                        valueAsNumber: true,
                      }
                    )}
                    defaultValue={item.rate || 0}
                  />
                  {errors?.groups?.[groupIndex]?.task?.[taskIndex]?.material?.[
                    materialIndex
                  ]?.rate && (
                    <p className="error-message">
                      {
                        errors.groups[groupIndex].task[taskIndex].material[
                          materialIndex
                        ].rate.message
                      }
                    </p>
                  )}
                </div>

                <div>Total: {(quantity || 0) * (rate || 0)}</div>
              </div>
            </div>
          );
        })}
        <button onClick={addMaterial}>Add Material</button>
      </div>
    </>
  );
};

export default Material;
