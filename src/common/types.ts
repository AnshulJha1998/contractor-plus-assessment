import { Control, UseFormRegister } from "react-hook-form";

export type FORM_VALUES = {
  title: string;
  expireyDate: number;
  groups: GROUP[];
};

export type GROUP = {
  groupId: string;
  task: TASK[];
};

export type TASK = {
  taskId: string;
  taskTitle: string;
  desc: string;
  material: MATERIAL[];
};

export type MATERIAL = {
  materialId: string;
  name: string;
  rate: string;
  quantity: string;
  total: string;
};

export type GROUPED_TASKS = {
  control: Control<FORM_VALUES, unknown>;
  register: UseFormRegister<FORM_VALUES>;
  groupIndex: number;
};

export type MaterialProps = {
  control: Control<FORM_VALUES, unknown>;
  register: UseFormRegister<FORM_VALUES>;
  groupIndex: number;
  taskIndex: number;
};
