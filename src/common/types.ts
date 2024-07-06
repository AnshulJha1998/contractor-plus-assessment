import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

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
  rate: number | null;
  quantity: number | null;
  total: number;
};

export type GROUPED_TASKS_PROPS = {
  control: Control<FORM_VALUES, unknown>;
  register: UseFormRegister<FORM_VALUES>;
  groupIndex: number;
  errors: FieldErrors<FORM_VALUES>;
  watch: UseFormWatch<FORM_VALUES>;
};

export type MATERIAL_PROPS = {
  control: Control<FORM_VALUES, unknown>;
  register: UseFormRegister<FORM_VALUES>;
  groupIndex: number;
  taskIndex: number;
  errors: FieldErrors<FORM_VALUES>;
  watch: UseFormWatch<FORM_VALUES>;
};
