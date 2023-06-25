import { FormFieldsEnum } from '@/constants/constants';

export type FormFieldsType = Record<FormFieldsEnum, string>;

export type SelectOptionsType = {
  id: string;
  value: string;
};
