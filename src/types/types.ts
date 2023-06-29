import { FetchedDataEnum, FormFieldsEnum } from '@/constants/constants';

export type FormFieldsType = Record<FormFieldsEnum, string>;

export type SelectOptionsType = {
  id: string;
  value: string;
};

export type SelectedFormFields =
  | FormFieldsEnum.CITY
  | FormFieldsEnum.DOCTOR_SPECIALITY
  | FormFieldsEnum.DOCTOR;

export type FormFilterType = Pick<
  Record<FormFieldsEnum, SelectOptionsType[]>,
  FormFieldsEnum.SEX | SelectedFormFields
>;

export type FetchedDataType = {
  [FetchedDataEnum.ID]: string;
  [FetchedDataEnum.NAME]: string;
  [FetchedDataEnum.SURNAME]: string;
  [FetchedDataEnum.DOCTOR_SPECIALITY]: string;
  [FetchedDataEnum.IS_PEDIATRICIAN]: boolean;
  [FetchedDataEnum.CITY]: string;
  [FetchedDataEnum.PARAMETERS]?: {
    [FetchedDataEnum.MIN_AGE]?: string;
    [FetchedDataEnum.MAX_AGE]?: string;
    [FetchedDataEnum.GENDER]?: string;
  };
};

export type FormFetchType = Pick<Record<FormFieldsEnum, FetchedDataType[]>, SelectedFormFields>;

export type DoctorsListType = Array<FetchedDataType & { disabled: boolean }>;
